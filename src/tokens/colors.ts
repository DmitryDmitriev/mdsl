/**
 * Цветовые токены дизайн-системы.
 * Спецификация: docs/COLOR-PALETTE.md
 *
 * В UI используйте только семантические токены (background.*, text.*, accent.* и т.д.).
 * Примитивные палитры (neutral, zinc, red и т.п.) — только для построения семантики.
 */

export const primitive = {
  white: {
    main: '#FFFFFF',
    '80': 'rgba(255,255,255,0.8)',
    '60': 'rgba(255,255,255,0.6)',
    '40': 'rgba(255,255,255,0.4)',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  zinc: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },
  red: { 500: '#EF4444', 600: '#DC2626', 400: '#F87171' },
  blue: { 500: '#3B82F6', 400: '#60A5FA', 50: '#EFF6FF', 800: '#1E40AF' },
  green: { 500: '#22C55E', 600: '#16A34A', 400: '#4ADE80', 50: '#F0FDF4', 800: '#166534', 100: '#DCFCE7' },
  amber: { 400: '#FBBF24', 500: '#F59E0B' },
  orange: { 500: '#F97316', 50: '#FFF7ED', 800: '#9A3412' },
  brand: {
    /** Пока не использовать в UI */
    bazaraki: { primary: '#136938', secondary: '#77C98D' },
    somon: { primary: '#0093D3', secondary: '#8BCEFF' },
    pinTT: { primary: '#990099', secondary: '#FFAAF3' },
    unegui: { primary: '#E60803', secondary: '#F22418' },
  },
} as const;

/** Семантические цвета (светлая тема по умолчанию) */
export const semantic = {
  background: {
    primary: primitive.white.main,
    secondary: primitive.zinc[100],
    tertiary: primitive.zinc[200],
    overlay: 'rgba(10,10,10,0.4)',
    invertedPrimary: primitive.zinc[900],
  },
  surface: {
    primary: primitive.white.main,
    secondary: primitive.zinc[100],
  },
  border: {
    default: primitive.zinc[200],
    disabled: primitive.zinc[100],
    active: primitive.zinc[900],
  },
  accent: {
    link: primitive.blue[500],
    linkDark: primitive.blue[400],
    positive: primitive.green[600],
    positiveDark: primitive.green[400],
    warning: primitive.amber[400],
    negative: primitive.red[600],
    negativeDark: primitive.red[400],
    secondary: primitive.zinc[100],
    secondaryDark: primitive.zinc[800],
    primary: primitive.zinc[900],
    primaryDark: primitive.zinc[200],
  },
  text: {
    primary: primitive.zinc[950],
    secondary: primitive.zinc[400],
    tertiary: primitive.zinc[300],
    inverted: primitive.white.main,
    positive: '#74DF8B',
    negative: '#FFA080',
    warning: primitive.amber[400],
    link: primitive.blue[500],
  },
  decor: {
    good: { bg: primitive.green[50], text: primitive.green[800] },
    info: { bg: primitive.blue[50], text: primitive.blue[800] },
    warning: { bg: primitive.orange[50], text: primitive.orange[800] },
    negative: { bg: '#FEF2F2', text: primitive.red[600] },
    question: { bg: primitive.zinc[100], text: primitive.zinc[800] },
    answer: { bg: primitive.blue[100], text: primitive.blue[800] },
    admin: { bg: primitive.green[100], text: primitive.green[800] },
  },
} as const;
