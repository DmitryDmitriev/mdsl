/**
 * Токены скруглений.
 * Спецификация: docs/DESIGN-TOKENS.md
 *
 * Core: radius/N = 4×N px. В UI — семантика: control-*, surface, overlay, pill.
 */

const base = 4;

/** Core radius: 4×N px, N=0..5; full=999 */
export const radiusCore = {
  0: 0,
  1: base * 1,   // 4
  2: base * 2,   // 8
  3: base * 3,   // 12
  4: base * 4,   // 16
  5: base * 5,   // 20
  full: 999,
} as const;

/**
 * Семантика как в Figma (Semantic): control-sm/md/lg → Core radius/1, /2, /3;
 * surface → radius/3; overlay → radius/4. Кнопки: xs → control-md (8), sm/md/lg → control-lg (12).
 */
export const radius = {
  controlSm: radiusCore[1], // 4 — мелкие контролы
  controlMd: radiusCore[2], // 8 — кнопка xs, rounded badge, мелкие hit-targets
  controlLg: radiusCore[3], // 12 — кнопки sm/md/lg, surface
  surface: radiusCore[3], // 12 — карточки, панели
  overlay: radiusCore[4], // 16 — модалки, bottom sheet (открытый край)
  pill: radiusCore.full,
} as const;
