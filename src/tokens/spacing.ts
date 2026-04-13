/**
 * Токены отступов, размеров и высот.
 * Спецификация: docs/DESIGN-TOKENS.md, docs/button-spec.md
 *
 * Core: spacing/N = 4×N px.
 * Semantic: size/* — универсальные размеры, controlHeight/* — высота контролов с touch target.
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

/**
 * Универсальная шкала размеров для не-контролов: бейджи, аватары, иконки, thumbnails.
 * Используйте size/* когда touch target не требуется.
 */
export const size = {
  '2xs': spacing[4],  // 16 — микро-бейдж, индикатор
  xs: spacing[5],     // 20 — каунтер, маленький бейдж
  sm: spacing[6],     // 24 — бейдж в списке, мини-аватар
  md: spacing[8],     // 32 — аватар sm, иконка lg
  lg: spacing[10],    // 40 — аватар md
  xl: spacing[12],    // 48 — аватар lg
  '2xl': spacing[14], // 56 — большой аватар
} as const;

/**
 * Высота интерактивных контролов (кнопки, инпуты) с гарантией touch target ≥32px.
 * Для не-контролов (бейджи, аватары) используйте size/*.
 */
export const controlHeight = {
  xs: spacing[8],  // 32 — compact
  sm: spacing[10], // 40
  md: spacing[12], // 48
  lg: spacing[14], // 56
} as const;

/** @deprecated Используйте controlHeight. Алиас для обратной совместимости. */
export const height = controlHeight;

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
 * Outline-кнопка: xs — default, sm/md/lg — emphasis (docs/button-spec.md).
 */
export const borderWidth = {
  default: 1,
  emphasis: 2,
} as const;
