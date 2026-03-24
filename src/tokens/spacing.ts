/**
 * Токены отступов и высот.
 * Спецификация: docs/DESIGN-TOKENS.md, docs/buttons-spec-figma.md
 *
 * Core: spacing/N = 4×N px. В UI используйте семантические токены (space, stack, height).
 */

const base = 4;

/** Core spacing: 4×N px. Индексы: 0,1,2,3,4,5,6,8,10,12,14,16 */
export const spacing = {
  0: 0,
  1: base * 1,   // 4
  2: base * 2,   // 8
  3: base * 3,   // 12
  4: base * 4,   // 16
  5: base * 5,   // 20
  6: base * 6,   // 24
  8: base * 8,   // 32
  10: base * 10, // 40
  12: base * 12, // 48
  14: base * 14, // 56
  16: base * 16, // 64
} as const;

/** Вертикальные отступы между блоками (stack) */
export const stack = {
  sm: spacing[4],   // 16
  md: spacing[6],   // 24
  lg: spacing[8],   // 32
  xl: spacing[12],  // 48
  '2xl': spacing[16], // 64
} as const;

/** Высота контролов (кнопки, инпуты) */
export const height = {
  sm: spacing[10], // 40
  md: spacing[12], // 48
  lg: spacing[14], // 56
  xs: spacing[8],  // 32 (compact)
} as const;

/** Padding кнопок по горизонтали */
export const buttonPaddingX = {
  lg: spacing[6],
  md: spacing[5],
  sm: spacing[4],
  xs: spacing[3],
} as const;

/** Gap между иконкой и текстом в кнопке */
export const buttonGap = {
  lg: spacing[3],
  md: spacing[2],
  sm: spacing[2],
  xs: spacing[1],
} as const;

/**
 * Толщина линии (px). Семантика: border/default → 1, border/emphasis → 2 (docs/DESIGN-TOKENS.md).
 * Outline-кнопка: xs — default, sm/md/lg — emphasis (docs/buttons-spec-figma.md).
 */
export const borderWidth = {
  default: 1,
  emphasis: 2,
} as const;
