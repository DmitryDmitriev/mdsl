// DS Audit Scanner — Figma Plugin (main thread)
// Правила в figma_audit_rules.md. Источник логики — DSL/scripts/figma-audit-scanner.js.

figma.showUI(__html__, { width: 420, height: 560, themeColors: true });

const ICON_NAME_RE = /^(ic_|icon$|\d+\s*\/\s*ic_)/i;
const SYSTEM_NAMES = /(status\s*bar|tab\s*bar|keyboard)/i;
const DEPRECATED_RE = /(\[deprecated\]|deprecated|⚠️)/i;

// Имена наших библиотек (matched через includes, регистр не учитывается строго).
// Source-of-truth по реальным имена остаётся в Figma → Assets → Libraries.
// При расхождении: запустить плагин с консолью, посмотреть тёплый-warm log
// `[ds-audit] library names found: ...` и подправить здесь.
const ALLOWED_LIBRARY_NAMES = [
  "ui-kit-mobile",
  "ui kit mobile",
  "app color palette",
  "color palette",
  "larixon assets",
  "assets",
];

// Пробрасываем set ключей нашей библиотеки. Заполняется на старте через
// figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync.
let KNOWN_LIBRARY_VAR_KEYS = new Set();
let LIBRARY_PREFETCH_DONE = false;
let LIBRARY_PREFETCH_ERROR = null;
// Сводка по библиотекам для UI: { libraryName, allowed, collections, vars }
let LIBRARY_PREFETCH_SUMMARY = [];

async function prefetchLibraryAssets() {
  // perlib aggregator { libraryName → { collections, vars, allowed } }
  const perLib = {};
  try {
    const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
    for (const c of cols) {
      const libName = c.libraryName || "?";
      const libNameLower = libName.toLowerCase();
      const isAllowed = ALLOWED_LIBRARY_NAMES.some(name => libNameLower.includes(name));
      if (!perLib[libName]) perLib[libName] = { libraryName: libName, allowed: isAllowed, collections: 0, vars: 0 };
      perLib[libName].collections++;
      if (!isAllowed) continue;
      try {
        const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key);
        for (const v of vars) KNOWN_LIBRARY_VAR_KEYS.add(v.key);
        perLib[libName].vars += vars.length;
      } catch (e) {
        // skip individual collection failures
      }
    }
  } catch (e) {
    LIBRARY_PREFETCH_ERROR = String(e && e.message || e);
  }
  LIBRARY_PREFETCH_SUMMARY = Object.values(perLib).sort((a, b) => Number(b.allowed) - Number(a.allowed));
  LIBRARY_PREFETCH_DONE = true;
}

function isIcon(n) {
  if (n.type === "VECTOR" || n.type === "BOOLEAN_OPERATION") return true;
  if (ICON_NAME_RE.test(n.name)) return true;
  if (n.type === "INSTANCE") {
    const sz = [16, 24, 32];
    if (sz.includes(n.width) && sz.includes(n.height)) return true;
  }
  return false;
}
function isFixedSize(node, axis) {
  const m = axis === "H" ? node.layoutSizingHorizontal : node.layoutSizingVertical;
  return m === "FIXED";
}
function bound(node, field) {
  const r = node.boundVariables && node.boundVariables[field];
  if (!r) return false;
  return Array.isArray(r) ? r.length > 0 : true;
}

// === Foreign-library binding detection ===
// Variable считается «нашей» если:
//   - локальная (variable.remote === false), ИЛИ
//   - remote и её key есть в KNOWN_LIBRARY_VAR_KEYS (предзаполнено allowed library names)
// Если variable remote и key не в наборе → foreign-binding.
async function checkVariableIsOurs(variableId) {
  try {
    const v = await figma.variables.getVariableByIdAsync(variableId);
    if (!v) return { ours: false, reason: "variable not resolved" };
    if (v.remote === false) return { ours: true, varName: v.name };
    if (KNOWN_LIBRARY_VAR_KEYS.has(v.key)) return { ours: true, varName: v.name };
    return { ours: false, varName: v.name, reason: "foreign library" };
  } catch (e) {
    return { ours: false, reason: String(e && e.message || e) };
  }
}

// Text-style: проверяем remote-флаг и пытаемся резолвить — если remote и стиль резолвится,
// считаем что библиотека подключена; library-name validation сложнее (нет enum API),
// поэтому ограничиваемся бинарной проверкой «remote ok».
async function checkTextStyleIsOurs(styleId) {
  try {
    const s = await figma.getStyleByIdAsync(styleId);
    if (!s) return { ours: false, reason: "style not resolved" };
    // Локальные стили — всегда наши
    if (s.remote === false) return { ours: true, styleName: s.name };
    // remote — без enum API библиотек принимаем, ограничение задокументировано
    return { ours: true, styleName: s.name, remote: true };
  } catch (e) {
    return { ours: false, reason: String(e && e.message || e) };
  }
}

// === Namespace-mismatch detection для spacing-токенов ===
// Контекст узла определяется по walk up parents:
//   - chip/* → нода или предок содержит "chip" в name
//   - cta/*  → предок Buttons Stack / CTA wrapper
//   - screen/* → нода-предок depth ≤ 2 от PAGE (top-level screen root + 1-й слой)
//   - section/* → дефолт для всего остального
function detectContext(node) {
  let cur = node;
  let depth = 0;
  while (cur && cur.type !== "PAGE") {
    const name = (cur.name || "").toLowerCase();
    if (/\bchip\b/.test(name)) return "chip";
    if (/buttons?\s*stack|^cta\b/.test(name)) return "cta";
    cur = cur.parent;
    depth++;
  }
  // Достигли PAGE. Depth = сколько FRAME/COMPONENT/INSTANCE прошли.
  // Screen-level: depth ≤ 2 (например, PAGE → ScreenFrame → SomeBlock — это ещё screen)
  if (depth <= 2) return "screen";
  return "section";
}

function nsFromVarName(name) {
  // Возвращает namespace из имени переменной (screen / section / chip / cta / row / stack /
  // list / spacing). Только для spacing-семейств.
  const m = String(name || "").match(/^([a-z]+)\//i);
  return m ? m[1].toLowerCase() : null;
}

function namespaceExpected(actual, context) {
  // actual — namespace из имени var. Возвращает null если ОК,
  // иначе ожидаемый namespace.
  if (!actual) return null;
  // Контекстно-зависимые namespace'ы
  if (actual === "screen" && context !== "screen") return "section";
  if (actual === "chip" && context !== "chip") return context;
  if (actual === "cta" && context !== "cta") return context;
  // section/row/stack/list/spacing — контекстно-нейтральны
  return null;
}

function auditOne(root, ctx) {
  const stats = {
    color: { total: 0, bound: 0 },
    token: { total: 0, bound: 0 },
    type:  { total: 0, bound: 0 },
    problems: [],
    foreignBindings: [],      // { node, field, varName, reason }
    namespaceMismatches: []   // { node, field, varName, expected, context }
  };

  function noteForeignVar(node, field, info) {
    stats.foreignBindings.push({
      nodeId: node.id,
      nodeName: node.name,
      field: field,
      varName: info.varName || null,
      reason: info.reason || "foreign"
    });
  }

  function noteNamespaceMismatch(node, field, varName, expected, context) {
    stats.namespaceMismatches.push({
      nodeId: node.id,
      nodeName: node.name,
      field: field,
      varName: varName,
      expected: expected,
      context: context
    });
  }

  async function validateBoundVar(node, field, ref) {
    const r = await checkVariableIsOurs(ref.id);
    if (!r.ours) {
      noteForeignVar(node, field, r);
    }
    // Namespace mismatch — только для spacing-полей и нашей же variable
    if (r.ours && r.varName && isSpacingField(field)) {
      const ns = nsFromVarName(r.varName);
      const context = detectContext(node);
      const expected = namespaceExpected(ns, context);
      if (expected) {
        noteNamespaceMismatch(node, field, r.varName, expected, context);
      }
    }
  }

  function isSpacingField(field) {
    return field === "itemSpacing" ||
           field === "paddingLeft" || field === "paddingRight" ||
           field === "paddingTop" || field === "paddingBottom" ||
           field === "width" || field === "height";
  }

  // Pending async проверки — накапливаем, дожидаемся в конце.
  const pending = [];

  function checkPaints(node, field) {
    const paints = node[field];
    if (!paints || paints === figma.mixed) return;
    for (let i = 0; i < paints.length; i++) {
      if (paints[i].type !== "SOLID") continue;
      stats.color.total++;
      const ref = node.boundVariables && node.boundVariables[field] && node.boundVariables[field][i];
      if (ref) {
        stats.color.bound++;
        pending.push(validateBoundVar(node, `${field}[${i}]`, ref));
      } else {
        stats.problems.push(`${node.name}: ${field}[${i}] no token`);
      }
    }
  }
  function checkSize(node) {
    if (node.parent && node.parent.type === "COMPONENT_SET") return;
    if (isIcon(node)) return;
    // TEXT — размер определяется контентом (textAutoResize), не токеном
    if (node.type === "TEXT") return;
    if (isFixedSize(node, "H")) {
      stats.token.total++;
      if (bound(node, "width")) {
        stats.token.bound++;
        const ref = node.boundVariables.width;
        pending.push(validateBoundVar(node, "width", ref));
      } else {
        stats.problems.push(`${node.name}: width ${node.width} no token`);
      }
    }
    if (isFixedSize(node, "V")) {
      stats.token.total++;
      if (bound(node, "height")) {
        stats.token.bound++;
        const ref = node.boundVariables.height;
        pending.push(validateBoundVar(node, "height", ref));
      } else {
        stats.problems.push(`${node.name}: height ${node.height} no token`);
      }
    }
  }
  function checkAutoLayout(node) {
    if (!node.layoutMode || node.layoutMode === "NONE") return;
    // itemSpacing: skip if frame has 0 or 1 visible children (gap doesn't apply)
    const visibleKids = ("children" in node) ? node.children.filter(c => c.visible !== false).length : 0;
    if (typeof node.itemSpacing === "number" && node.itemSpacing !== 0 && node.primaryAxisAlignItems !== "SPACE_BETWEEN" && visibleKids >= 2) {
      stats.token.total++;
      if (bound(node, "itemSpacing")) {
        stats.token.bound++;
        pending.push(validateBoundVar(node, "itemSpacing", node.boundVariables.itemSpacing));
      } else {
        stats.problems.push(`${node.name}: itemSpacing ${node.itemSpacing} no token`);
      }
    }
    const heightFixedCenter = isFixedSize(node, "V") && node.counterAxisAlignItems === "CENTER";
    const fields = [
      ["paddingLeft", true], ["paddingRight", true],
      ["paddingTop", !heightFixedCenter], ["paddingBottom", !heightFixedCenter]
    ];
    for (const [f, doCheck] of fields) {
      if (!doCheck || node[f] === 0) continue;
      stats.token.total++;
      if (bound(node, f)) {
        stats.token.bound++;
        pending.push(validateBoundVar(node, f, node.boundVariables[f]));
      } else {
        stats.problems.push(`${node.name}: ${f} ${node[f]} no token`);
      }
    }
  }
  function checkRadius(node) {
    if (typeof node.cornerRadius === "number" && node.cornerRadius !== 0) {
      stats.token.total++;
      if (bound(node, "topLeftRadius") || bound(node, "cornerRadius")) {
        stats.token.bound++;
        const ref = (node.boundVariables.cornerRadius) || (node.boundVariables.topLeftRadius);
        if (ref) pending.push(validateBoundVar(node, "cornerRadius", ref));
      } else {
        stats.problems.push(`${node.name}: radius ${node.cornerRadius} no token`);
      }
    } else if (node.cornerRadius === figma.mixed) {
      for (const f of ["topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius"]) {
        if (node[f] === 0) continue;
        stats.token.total++;
        if (bound(node, f)) {
          stats.token.bound++;
          pending.push(validateBoundVar(node, f, node.boundVariables[f]));
        } else {
          stats.problems.push(`${node.name}: ${f} ${node[f]} no token`);
        }
      }
    }
  }
  function checkStrokeWeight(node) {
    if (!node.strokes || !node.strokes.length) return;
    if (typeof node.strokeWeight !== "number" || node.strokeWeight === 0) return;
    stats.token.total++;
    if (bound(node, "strokeWeight")) {
      stats.token.bound++;
      pending.push(validateBoundVar(node, "strokeWeight", node.boundVariables.strokeWeight));
    } else {
      stats.problems.push(`${node.name}: strokeWeight ${node.strokeWeight} no token`);
    }
  }
  function checkText(node) {
    if (node.type !== "TEXT") return;
    stats.type.total++;
    if (node.textStyleId && node.textStyleId !== "") {
      stats.type.bound++;
      pending.push((async () => {
        const r = await checkTextStyleIsOurs(node.textStyleId);
        if (!r.ours) noteForeignVar(node, "textStyleId", r);
      })());
    } else {
      stats.problems.push(`${node.name}: text style not bound`);
    }
  }

  function walk(node, depth) {
    const isSetRoot = depth === 0;
    const isVariantRoot = depth === 1;
    if (!isSetRoot) {
      if (isIcon(node)) return;
      if ("fills" in node) checkPaints(node, "fills");
      if ("strokes" in node) checkPaints(node, "strokes");
      if ("strokeWeight" in node) checkStrokeWeight(node);
      if ("cornerRadius" in node) checkRadius(node);
      if ("layoutMode" in node) checkAutoLayout(node);
      if (!isVariantRoot && "width" in node) checkSize(node);
      if (node.type === "TEXT") checkText(node);
    }
    // Don't descend into INSTANCE — its internals belong to its main component, audited separately
    if (node.type === "INSTANCE") return;
    if ("children" in node) for (const c of node.children) walk(c, depth + 1);
  }
  walk(root, 0);

  const pct = (b, t) => t === 0 ? 100 : Math.round((b / t) * 100);
  const totalAll = stats.color.total + stats.token.total + stats.type.total;
  const boundAll = stats.color.bound + stats.token.bound + stats.type.bound;

  // Возвращаем pending — caller дождётся
  return {
    pending: Promise.all(pending),
    result: {
      id: root.id,
      name: root.name,
      color: pct(stats.color.bound, stats.color.total),
      token: pct(stats.token.bound, stats.token.total),
      type:  pct(stats.type.bound, stats.type.total),
      overall: pct(boundAll, totalAll),
      counts: stats,
      problems: stats.problems.slice(0, 30),
      foreignBindings: stats.foreignBindings,
      namespaceMismatches: stats.namespaceMismatches
    }
  };
}

async function collectTargets(scope) {
  let nodes = [];
  if (scope === "selection") {
    nodes = figma.currentPage.selection.filter(n =>
      n.type === "COMPONENT_SET" || n.type === "FRAME" || n.type === "COMPONENT"
    );
  } else if (scope === "page") {
    await figma.currentPage.loadAsync();
    // На странице — все COMPONENT_SET'ы (master DS). Если их нет, fallback на top-level FRAME'ы
    // (use case: продуктовые экраны без COMPONENT_SET).
    nodes = figma.currentPage.findAllWithCriteria({ types: ["COMPONENT_SET"] });
    if (nodes.length === 0) {
      // Top-level FRAMEs на странице — продуктовые экраны
      nodes = figma.currentPage.children.filter(c => c.type === "FRAME");
    }
  } else if (scope === "document") {
    await figma.loadAllPagesAsync();
    nodes = figma.root.findAllWithCriteria({ types: ["COMPONENT_SET"] });
  }
  return nodes.filter(n =>
    !n.name.startsWith(".=") &&
    !SYSTEM_NAMES.test(n.name) &&
    !DEPRECATED_RE.test(n.name)
  );
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "run") {
    // Lazy prefetch на первом запуске
    if (!LIBRARY_PREFETCH_DONE) {
      figma.ui.postMessage({ type: "progress", phase: "prefetch" });
      await prefetchLibraryAssets();
      figma.ui.postMessage({
        type: "prefetch-done",
        knownVarCount: KNOWN_LIBRARY_VAR_KEYS.size,
        summary: LIBRARY_PREFETCH_SUMMARY,
        error: LIBRARY_PREFETCH_ERROR
      });
    }

    const targets = await collectTargets(msg.scope || "page");
    figma.ui.postMessage({ type: "progress", total: targets.length });
    const results = [];
    for (let i = 0; i < targets.length; i++) {
      const { pending, result } = auditOne(targets[i], { knownVars: KNOWN_LIBRARY_VAR_KEYS });
      await pending;
      results.push(result);
      figma.ui.postMessage({ type: "progress", current: i + 1, total: targets.length, name: targets[i].name });
    }
    results.sort((a, b) => a.overall - b.overall);

    // Build aggregated JSON output по 3 категориям
    const categories = {
      "not-bound": [],
      "foreign-binding": [],
      "namespace-mismatch": []
    };
    for (const r of results) {
      for (const p of r.problems) {
        categories["not-bound"].push({ componentId: r.id, componentName: r.name, issue: p });
      }
      for (const f of r.foreignBindings) {
        categories["foreign-binding"].push({
          componentId: r.id,
          componentName: r.name,
          nodeId: f.nodeId,
          nodeName: f.nodeName,
          field: f.field,
          varName: f.varName,
          reason: f.reason
        });
      }
      for (const m of r.namespaceMismatches) {
        categories["namespace-mismatch"].push({
          componentId: r.id,
          componentName: r.name,
          nodeId: m.nodeId,
          nodeName: m.nodeName,
          field: m.field,
          varName: m.varName,
          expected: m.expected,
          context: m.context
        });
      }
    }

    figma.ui.postMessage({ type: "report", results, categories });
  }
  if (msg.type === "focus" && msg.id) {
    const node = await figma.getNodeByIdAsync(msg.id);
    if (!node) return;
    // Найти родительскую PAGE и переключиться на неё, иначе selection бросит ошибку
    let p = node.parent;
    while (p && p.type !== "PAGE") p = p.parent;
    if (p && p.id !== figma.currentPage.id) {
      await figma.setCurrentPageAsync(p);
    }
    figma.currentPage.selection = [node];
    figma.viewport.scrollAndZoomIntoView([node]);
  }
  if (msg.type === "close") figma.closePlugin();
};
