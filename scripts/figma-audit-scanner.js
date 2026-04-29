/**
 * Figma Audit Scanner
 * ===================
 * Считает покрытие токенами для COMPONENT_SET'ов по правилам figma_audit_rules.md.
 *
 * Запуск через MCP use_figma (Figma plugin context):
 *   - Скопировать содержимое функции `auditComponents` в use_figma
 *   - Передать массив id COMPONENT_SET (или null — тогда сканит текущую страницу)
 *
 * Возвращает: [{ name, color, token, type, overall, problems[] }]
 *
 * Правила исключения (figma_audit_rules.md):
 *   1. Свойства корневого COMPONENT_SET — не считаем
 *   2. Width/height корневого COMPONENT-варианта — служебное превью
 *   3. Иконки: VECTOR, BOOLEAN_OPERATION, имена ic_*, icon, "24 / ic_*"
 *   4. Элементы вне COMPONENT_SET (только дети SET'а)
 *   5. HUG/FILL размеры — не нужен токен
 *   6. Вертикальный padding при FIXED height + center align — вычисляемое
 *   7. Инстансы иконок из библиотеки (16/24/32 px) — контракт библиотеки
 *   8. Building blocks (.= префикс) — не считаем как самостоятельные
 *   9. Системные (Status Bar, Tab Bar, Keyboard) — не считаем
 */

async function auditComponents(componentSetIds) {
  const ICON_NAME_RE = /^(ic_|icon$|\d+\s*\/\s*ic_)/i;
  const SYSTEM_NAMES = /(status\s*bar|tab\s*bar|keyboard)/i;
  const DEPRECATED_RE = /(\[deprecated\]|deprecated|⚠️)/i;

  const targets = componentSetIds && componentSetIds.length
    ? (await Promise.all(componentSetIds.map(id => figma.getNodeByIdAsync(id)))).filter(Boolean)
    : figma.currentPage.findAll(n => n.type === "COMPONENT_SET");

  const results = [];

  for (const root of targets) {
    if (root.type !== "COMPONENT_SET") continue;
    if (root.name.startsWith(".=")) continue;          // building block
    if (SYSTEM_NAMES.test(root.name)) continue;        // system component
    if (DEPRECATED_RE.test(root.name)) continue;       // deprecated

    const stats = {
      color: { total: 0, bound: 0 },
      token: { total: 0, bound: 0 }, // size/spacing/radius/border
      type:  { total: 0, bound: 0 }, // text styles
      problems: []
    };

    function isIcon(n) {
      if (n.type === "VECTOR" || n.type === "BOOLEAN_OPERATION") return true;
      if (ICON_NAME_RE.test(n.name)) return true;
      // INSTANCE с фиксированным размером 16/24/32 — иконка из библиотеки
      if (n.type === "INSTANCE") {
        const sz = [16, 24, 32];
        if (sz.includes(n.width) && sz.includes(n.height)) return true;
      }
      return false;
    }

    function isFixedSize(node, axis) {
      const mode = axis === "H" ? node.layoutSizingHorizontal : node.layoutSizingVertical;
      return mode === "FIXED";
    }

    function bound(node, field) {
      const refs = node.boundVariables && node.boundVariables[field];
      if (!refs) return false;
      return Array.isArray(refs) ? refs.length > 0 : true;
    }

    function checkPaints(node, field /* fills|strokes */) {
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
      // Корневой COMPONENT внутри SET — пропускаем width/height (правило 2)
      if (node.parent && node.parent.type === "COMPONENT_SET") {
        // НО: если родитель SET'а имеет FIXED sizing — учитываем (правило 2 исключение)
        // Здесь упрощённо — пропускаем всегда
        return;
      }
      if (isIcon(node)) return; // правила 3, 7
      // TEXT-узлы — размер определяется контентом (textAutoResize), не токеном
      if (node.type === "TEXT") return;
      // Width
      if (isFixedSize(node, "H")) {
        stats.token.total++;
        if (bound(node, "width")) stats.token.bound++;
        else stats.problems.push(`${node.name}: width ${node.width} no token`);
      }
      // Height
      if (isFixedSize(node, "V")) {
        stats.token.total++;
        if (bound(node, "height")) stats.token.bound++;
        else stats.problems.push(`${node.name}: height ${node.height} no token`);
      }
    }

    function checkAutoLayout(node) {
      if (node.layoutMode === "NONE" || !node.layoutMode) return;
      // itemSpacing: skip if frame has 0 or 1 visible children (gap doesn't apply)
      const visibleKids = ("children" in node) ? node.children.filter(c => c.visible !== false).length : 0;
      if (typeof node.itemSpacing === "number" && node.itemSpacing !== 0 && node.primaryAxisAlignItems !== "SPACE_BETWEEN" && visibleKids >= 2) {
        stats.token.total++;
        if (bound(node, "itemSpacing")) stats.token.bound++;
        else stats.problems.push(`${node.name}: itemSpacing ${node.itemSpacing} no token`);
      }
      // paddings (горизонтальные всегда; вертикальные — только если высота не FIXED+center)
      const heightFixedCenter = isFixedSize(node, "V") && node.counterAxisAlignItems === "CENTER";
      const checks = [
        ["paddingLeft", true],
        ["paddingRight", true],
        ["paddingTop", !heightFixedCenter],
        ["paddingBottom", !heightFixedCenter]
      ];
      for (const [field, doCheck] of checks) {
        if (!doCheck) continue;
        if (node[field] === 0) continue;
        stats.token.total++;
        if (bound(node, field)) stats.token.bound++;
        else stats.problems.push(`${node.name}: ${field} ${node[field]} no token`);
      }
    }

    function checkRadius(node) {
      if (typeof node.cornerRadius === "number" && node.cornerRadius !== 0) {
        stats.token.total++;
        if (bound(node, "topLeftRadius") || bound(node, "cornerRadius")) stats.token.bound++;
        else stats.problems.push(`${node.name}: radius ${node.cornerRadius} no token`);
      } else if (node.cornerRadius === figma.mixed) {
        for (const f of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) {
          if (node[f] === 0) continue;
          stats.token.total++;
          if (bound(node, f)) stats.token.bound++;
          else stats.problems.push(`${node.name}: ${f} ${node[f]} no token`);
        }
      }
    }

    function checkStrokeWeight(node) {
      if (!node.strokes || !node.strokes.length) return;
      if (typeof node.strokeWeight !== "number" || node.strokeWeight === 0) return;
      stats.token.total++;
      if (bound(node, "strokeWeight")) stats.token.bound++;
      else stats.problems.push(`${node.name}: strokeWeight ${node.strokeWeight} no token`);
    }

    function checkText(node) {
      if (node.type !== "TEXT") return;
      stats.type.total++;
      if (node.textStyleId && node.textStyleId !== "") stats.type.bound++;
      else stats.problems.push(`${node.name}: text style not bound`);
    }

    function walk(node, depth) {
      // depth 0 = COMPONENT_SET (root) — пропускаем свойства, идём в детей
      // depth 1 = COMPONENT (variant root) — пропускаем размеры (правило 2), но fills/radius/al считаем
      const isVariantRoot = depth === 1;
      const isSetRoot = depth === 0;

      if (!isSetRoot) {
        if (isIcon(node)) return; // не углубляемся в иконки

        if ("fills" in node) checkPaints(node, "fills");
        if ("strokes" in node) checkPaints(node, "strokes");
        if ("strokeWeight" in node) checkStrokeWeight(node);
        if ("cornerRadius" in node) checkRadius(node);
        if ("layoutMode" in node) checkAutoLayout(node);
        if (!isVariantRoot && "width" in node) checkSize(node);
        if (node.type === "TEXT") checkText(node);
      }

      // Don't descend into INSTANCE — its internals belong to its main component
      if (node.type === "INSTANCE") return;
      if ("children" in node) {
        for (const c of node.children) walk(c, depth + 1);
      }
    }

    walk(root, 0);

    const pct = (b, t) => t === 0 ? 100 : Math.round((b / t) * 100);
    const color = pct(stats.color.bound, stats.color.total);
    const token = pct(stats.token.bound, stats.token.total);
    const type  = pct(stats.type.bound, stats.type.total);
    const totalAll = stats.color.total + stats.token.total + stats.type.total;
    const boundAll = stats.color.bound + stats.token.bound + stats.type.bound;
    const overall = pct(boundAll, totalAll);

    results.push({
      id: root.id,
      name: root.name,
      color, token, type, overall,
      counts: stats,
      problems: stats.problems.slice(0, 20) // top-20 проблем
    });
  }

  // Отсортировать по overall возрастанию — снизу самые проблемные
  results.sort((a, b) => a.overall - b.overall);
  return results;
}

// Пример вызова через use_figma:
// const report = await auditComponents(null); // вся текущая страница
// console.log(JSON.stringify(report, null, 2));
