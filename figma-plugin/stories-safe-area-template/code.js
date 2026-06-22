// Stories Safe-Area Template — Figma Plugin (main thread)
// Строит нативные фреймы Story-канваса под разные пропорции экрана.
// Модель: база авторинга 360×800 (9:20, мин. ширина Android). Зелёная safe-зона
// ОДИНАКОВАЯ во всех пропорциях — это «общий знаменатель», видимый на любом экране
// (вплоть до 16:9). Высокие экраны лишь добавляют место снизу (светлая «extra»-зона).
// Принцип: фон рисуется на весь кадр (терпит срез), тексты/лого — только в зелёной зоне.

figma.showUI(__html__, { width: 340, height: 360, themeColors: true });

const BASE_W = 360;            // ширина авторинга (dp)
const CHROME_TOP = 120;        // верхний chrome: статус-бар + прогресс + close + место под header
const CHROME_BOTTOM = 96;      // нижний chrome: реплай / CTA + home indicator
const SIDE = 20;               // боковое поле (padding 16 + запас под срез ~9 на 21:9)
const SAFE_X = SIDE;
const SAFE_Y = CHROME_TOP;
const SAFE_W = BASE_W - 2 * SIDE;               // 320
const GUARANTEED_H = 640 - CHROME_TOP - CHROME_BOTTOM; // 424 — высота, видимая даже на 16:9
const GAP = 80;

// Пропорции (от самой «низкой» к самой «высокой»). h/w задаёт высоту кадра.
const RATIOS = [
  { label: "16:9",   w: 9, h: 16,   note: "старые / бюджет — низ" },
  { label: "18:9",   w: 9, h: 18,   note: "2:1" },
  { label: "19.5:9", w: 9, h: 19.5, note: "iPhone X–15" },
  { label: "20:9",   w: 9, h: 20,   note: "БАЗА · Android", base: true },
  { label: "21:9",   w: 9, h: 21,   note: "высокие Android" },
];

const C = {
  media:     { r: 0.914, g: 0.914, b: 0.925 },
  chrome:    { r: 0.706, g: 0.698, b: 0.663 },
  green:     { r: 0.114, g: 0.620, b: 0.459 },
  greenDark: { r: 0.059, g: 0.431, b: 0.337 },
  textDark:  { r: 0.267, g: 0.267, b: 0.255 },
  textMute:  { r: 0.373, g: 0.369, b: 0.353 },
  danger:    { r: 0.600, g: 0.235, b: 0.114 },
  heading:   { r: 0.106, g: 0.106, b: 0.110 },
};

let FONT = { family: "Inter", style: "Regular" };
let FONT_M = { family: "Inter", style: "Medium" };

async function loadFonts() {
  try {
    await figma.loadFontAsync(FONT);
    await figma.loadFontAsync(FONT_M);
  } catch (e) {
    FONT = { family: "Roboto", style: "Regular" };
    FONT_M = { family: "Roboto", style: "Medium" };
    await figma.loadFontAsync(FONT);
    await figma.loadFontAsync(FONT_M);
  }
}

function rect(parent, x, y, w, h, color, opacity, corner, stroke, dash) {
  const r = figma.createRectangle();
  r.resize(w, h);
  r.x = x; r.y = y;
  r.fills = color ? [{ type: "SOLID", color, opacity: opacity == null ? 1 : opacity }] : [];
  if (corner) r.cornerRadius = corner;
  if (stroke) {
    r.strokes = [{ type: "SOLID", color: stroke }];
    r.strokeWeight = 2;
    r.strokeAlign = "INSIDE";
    if (dash) r.dashPattern = dash;
  }
  if (parent) parent.appendChild(r);
  return r;
}

function text(parent, x, y, str, size, font, color, width, align) {
  const t = figma.createText();
  t.fontName = font;
  t.fontSize = size;
  t.characters = str;
  t.fills = [{ type: "SOLID", color }];
  if (width) {
    t.textAutoResize = "HEIGHT";
    t.resize(width, t.height);
    t.textAlignHorizontal = align || "CENTER";
  }
  t.x = x; t.y = y;
  if (parent) parent.appendChild(t);
  return t;
}

async function build() {
  await loadFonts();

  const created = [];
  const baseY = 0;

  // Заголовок над рядом
  const heading = text(
    null, 0, baseY - 132,
    "Stories — safe-зона креатива по пропорциям экрана",
    22, FONT_M, C.heading, 1600, "LEFT"
  );
  created.push(heading);
  const sub = text(
    null, 0, baseY - 96,
    "Фон рисуется на весь кадр (терпит срез). Тексты и логотипы — ТОЛЬКО в зелёной зоне: она одинакова во всех пропорциях и видна даже на 16:9. " +
    "Высокие экраны добавляют место снизу (светлая зона — не гарантировано на низких).",
    14, FONT, C.textMute, 1600, "LEFT"
  );
  created.push(sub);

  let x = 0;
  for (const rt of RATIOS) {
    const H = Math.round(BASE_W * rt.h / rt.w);

    const frame = figma.createFrame();
    frame.resize(BASE_W, H);
    frame.name = "Story · " + rt.label + " · " + BASE_W + "×" + H + (rt.base ? " · БАЗА" : "");
    frame.x = x; frame.y = baseY;
    frame.clipsContent = true;
    frame.fills = [{ type: "SOLID", color: C.media }];
    frame.cornerRadius = 8;

    // chrome-полосы
    rect(frame, 0, 0, BASE_W, CHROME_TOP, C.chrome, 0.35);
    rect(frame, 0, H - CHROME_BOTTOM, BASE_W, CHROME_BOTTOM, C.chrome, 0.35);

    // extra-зона (видна на этом экране, но НЕ гарантирована на 16:9)
    const extraTop = SAFE_Y + GUARANTEED_H;
    const extraBottom = H - CHROME_BOTTOM;
    if (extraBottom > extraTop + 1) {
      rect(frame, SAFE_X, extraTop, SAFE_W, extraBottom - extraTop, C.green, 0.06);
    }

    // гарантированная safe-зона (одинаковая во всех фреймах)
    rect(frame, SAFE_X, SAFE_Y, SAFE_W, GUARANTEED_H, C.green, 0.12, 0, C.greenDark, [8, 5]);

    // подписи внутри
    text(frame, SAFE_X, 44, "верх · status / progress / close", 9, FONT, C.danger, SAFE_W);
    text(frame, SAFE_X, H - CHROME_BOTTOM + 20, "низ · реплай / CTA + жесты", 9, FONT, C.danger, SAFE_W);
    if (rt.base) {
      text(frame, SAFE_X, SAFE_Y + 150, "РИСУЙ ТЕКСТ\nЗДЕСЬ", 18, FONT_M, C.greenDark, SAFE_W);
      text(frame, SAFE_X, SAFE_Y + 210, SAFE_W + " × " + GUARANTEED_H, 11, FONT, C.greenDark, SAFE_W);
    } else {
      text(frame, SAFE_X, SAFE_Y + GUARANTEED_H / 2 - 10, "safe", 13, FONT_M, C.greenDark, SAFE_W);
    }
    if (extraBottom > extraTop + 24) {
      text(frame, SAFE_X, extraTop + (extraBottom - extraTop) / 2 - 8, "extra", 9, FONT, C.textMute, SAFE_W);
    }

    // заголовок над кадром
    const title = text(null, x, baseY - 48, rt.label + " · " + BASE_W + "×" + H, 14, FONT_M, C.heading, BASE_W, "LEFT");
    const noteT = text(null, x, baseY - 26, rt.note, 11, FONT, rt.base ? C.greenDark : C.textMute, BASE_W, "LEFT");

    created.push(frame, title, noteT);
    x += BASE_W + GAP;
  }

  // Легенда справа
  const lx = x + 20;
  const legend = [];
  legend.push(text(null, lx, baseY, "Как это читать", 16, FONT_M, C.heading, 360, "LEFT"));
  legend.push(text(null, lx, baseY + 34,
    "• Зелёная зона " + SAFE_W + "×" + GUARANTEED_H + " — одинаковая во всех пропорциях. " +
    "Это и есть «как адаптировать»: положил текст/лого сюда — видно на любом телефоне.",
    13, FONT, C.textMute, 360, "LEFT"));
  legend.push(text(null, lx, baseY + 120,
    "• Серые полосы — chrome приложения (status / progress / close сверху; реплай + жесты снизу). Текст не класть.",
    13, FONT, C.textMute, 360, "LEFT"));
  legend.push(text(null, lx, baseY + 196,
    "• Светлая зелёная зона снизу — бонус-место на высоких экранах. На 16:9 срежется, критичное туда не ставить.",
    13, FONT, C.textMute, 360, "LEFT"));
  legend.push(text(null, lx, baseY + 272,
    "• Фон — на весь кадр до краёв. Экспорт креатива ×3 (1080-ширина).",
    13, FONT, C.textMute, 360, "LEFT"));
  for (const l of legend) created.push(l);

  figma.currentPage.selection = created;
  figma.viewport.scrollAndZoomIntoView(created);
  figma.notify("Шаблон Stories собран: " + RATIOS.length + " пропорций");
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "build") {
    try {
      await build();
    } catch (e) {
      figma.notify("Ошибка: " + (e && e.message ? e.message : e), { error: true });
      console.error(e);
    }
  } else if (msg.type === "close") {
    figma.closePlugin();
  }
};
