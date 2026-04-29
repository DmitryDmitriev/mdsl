// DS Audit Scanner — Figma Plugin (main thread)
// Правила в figma_audit_rules.md. Источник логики — DSL/scripts/figma-audit-scanner.js.

figma.showUI(__html__, { width: 420, height: 560, themeColors: true });

const ICON_NAME_RE = /^(ic_|icon$|\d+\s*\/\s*ic_)/i;
const SYSTEM_NAMES = /(status\s*bar|tab\s*bar|keyboard)/i;
const DEPRECATED_RE = /(\[deprecated\]|deprecated|⚠️)/i;

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

function auditOne(root) {
  const stats = {
    color: { total: 0, bound: 0 },
    token: { total: 0, bound: 0 },
    type:  { total: 0, bound: 0 },
    problems: []
  };

  function checkPaints(node, field) {
    const paints = node[field];
    if (!paints || paints === figma.mixed) return;
    for (let i = 0; i < paints.length; i++) {
      if (paints[i].type !== "SOLID") continue;
      stats.color.total++;
      const ref = node.boundVariables && node.boundVariables[field] && node.boundVariables[field][i];
      if (ref) stats.color.bound++;
      else stats.problems.push(`${node.name}: ${field}[${i}] no token`);
    }
  }
  function checkSize(node) {
    if (node.parent && node.parent.type === "COMPONENT_SET") return;
    if (isIcon(node)) return;
    // TEXT — размер определяется контентом (textAutoResize), не токеном
    if (node.type === "TEXT") return;
    if (isFixedSize(node, "H")) {
      stats.token.total++;
      bound(node, "width") ? stats.token.bound++ : stats.problems.push(`${node.name}: width ${node.width} no token`);
    }
    if (isFixedSize(node, "V")) {
      stats.token.total++;
      bound(node, "height") ? stats.token.bound++ : stats.problems.push(`${node.name}: height ${node.height} no token`);
    }
  }
  function checkAutoLayout(node) {
    if (!node.layoutMode || node.layoutMode === "NONE") return;
    // itemSpacing: skip if frame has 0 or 1 visible children (gap doesn't apply)
    const visibleKids = ("children" in node) ? node.children.filter(c => c.visible !== false).length : 0;
    if (typeof node.itemSpacing === "number" && node.itemSpacing !== 0 && node.primaryAxisAlignItems !== "SPACE_BETWEEN" && visibleKids >= 2) {
      stats.token.total++;
      bound(node, "itemSpacing") ? stats.token.bound++ : stats.problems.push(`${node.name}: itemSpacing ${node.itemSpacing} no token`);
    }
    const heightFixedCenter = isFixedSize(node, "V") && node.counterAxisAlignItems === "CENTER";
    const fields = [
      ["paddingLeft", true], ["paddingRight", true],
      ["paddingTop", !heightFixedCenter], ["paddingBottom", !heightFixedCenter]
    ];
    for (const [f, doCheck] of fields) {
      if (!doCheck || node[f] === 0) continue;
      stats.token.total++;
      bound(node, f) ? stats.token.bound++ : stats.problems.push(`${node.name}: ${f} ${node[f]} no token`);
    }
  }
  function checkRadius(node) {
    if (typeof node.cornerRadius === "number" && node.cornerRadius !== 0) {
      stats.token.total++;
      (bound(node, "topLeftRadius") || bound(node, "cornerRadius")) ? stats.token.bound++
        : stats.problems.push(`${node.name}: radius ${node.cornerRadius} no token`);
    } else if (node.cornerRadius === figma.mixed) {
      for (const f of ["topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius"]) {
        if (node[f] === 0) continue;
        stats.token.total++;
        bound(node, f) ? stats.token.bound++ : stats.problems.push(`${node.name}: ${f} ${node[f]} no token`);
      }
    }
  }
  function checkStrokeWeight(node) {
    if (!node.strokes || !node.strokes.length) return;
    if (typeof node.strokeWeight !== "number" || node.strokeWeight === 0) return;
    stats.token.total++;
    bound(node, "strokeWeight") ? stats.token.bound++ : stats.problems.push(`${node.name}: strokeWeight ${node.strokeWeight} no token`);
  }
  function checkText(node) {
    if (node.type !== "TEXT") return;
    stats.type.total++;
    (node.textStyleId && node.textStyleId !== "") ? stats.type.bound++
      : stats.problems.push(`${node.name}: text style not bound`);
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
  return {
    id: root.id,
    name: root.name,
    color: pct(stats.color.bound, stats.color.total),
    token: pct(stats.token.bound, stats.token.total),
    type:  pct(stats.type.bound, stats.type.total),
    overall: pct(boundAll, totalAll),
    counts: stats,
    problems: stats.problems.slice(0, 30)
  };
}

async function collectTargets(scope) {
  let nodes = [];
  if (scope === "selection") {
    nodes = figma.currentPage.selection.filter(n => n.type === "COMPONENT_SET");
  } else if (scope === "page") {
    await figma.currentPage.loadAsync();
    nodes = figma.currentPage.findAllWithCriteria({ types: ["COMPONENT_SET"] });
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
    const targets = await collectTargets(msg.scope || "page");
    figma.ui.postMessage({ type: "progress", total: targets.length });
    const results = [];
    for (let i = 0; i < targets.length; i++) {
      const r = auditOne(targets[i]);
      results.push(r);
      figma.ui.postMessage({ type: "progress", current: i + 1, total: targets.length, name: targets[i].name });
    }
    results.sort((a, b) => a.overall - b.overall);
    figma.ui.postMessage({ type: "report", results });
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
