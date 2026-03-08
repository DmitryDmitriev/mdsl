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

/** Семантические радиусы для контролов и поверхностей */
export const radius = {
  controlSm: radiusCore[2],  // 8
  controlMd: radiusCore[3],  // 12
  controlLg: radiusCore[3],  // 12
  surface: radiusCore[4],    // 16
  overlay: radiusCore[5],    // 20
  pill: radiusCore.full,
} as const;
