import type { Meta, StoryObj } from '@storybook/react';
import { primitive, semantic } from '@/tokens/colors';

/** Относительная яркость 0–1 (0 = чёрный). */
function luminance(hex: string): number {
  const m = hex.replace(/^#/, '').match(/.{2}/g);
  if (!m) return 0;
  const [r, g, b] = m.map((x) => parseInt(x, 16) / 255);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** Нужен белый бордер, если цвет совпадает с поверхностью или оба тёмные. */
function needsWhiteBorder(color: string, surfaceColor: string | undefined): boolean {
  if (!surfaceColor) return false;
  if (color === surfaceColor) return true;
  const lColor = luminance(color);
  const lSurface = luminance(surfaceColor);
  return lSurface < 0.2 && lColor < 0.25;
}

const meta: Meta = {
  title: 'Токены/Цвета',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Цветовая палитра: примитивные токены (для справки) и семантические роли. В UI используйте только семантические токены. Спецификация: docs/COLOR-PALETTE.md',
      },
    },
  },
};

export default meta;

/** Примитивная палитра Neutral (50–950). Не использовать напрямую в экранах. */
export const PrimitiveNeutral: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {(Object.entries(primitive.neutral) as [string, string][]).map(([key, value]) => (
        <div
          key={key}
          style={{
            width: 80,
            height: 48,
            background: value,
            borderRadius: 8,
            border: key === '50' || key === '100' ? '1px solid rgba(0,0,0,0.08)' : 'none',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 4,
            fontSize: 10,
            color: parseInt(key, 10) >= 500 ? '#fff' : '#000',
          }}
        >
          {key}
        </div>
      ))}
    </div>
  ),
};

/** Примитивная палитра Zinc (50–950). */
export const PrimitiveZinc: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {(Object.entries(primitive.zinc) as [string, string][]).map(([key, value]) => (
        <div
          key={key}
          style={{
            width: 80,
            height: 48,
            background: value,
            borderRadius: 8,
            border: key === '50' || key === '100' ? '1px solid rgba(0,0,0,0.08)' : 'none',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 4,
            fontSize: 10,
            color: parseInt(key, 10) >= 500 ? '#fff' : '#000',
          }}
        >
          {key}
        </div>
      ))}
    </div>
  ),
};

/** Брендовые цвета (Primary / Secondary). Bazaraki пока не использовать в UI. */
export const BrandColors: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(Object.entries(primitive.brand) as [keyof typeof primitive.brand, typeof primitive.brand.bazaraki][]).map(
        ([name, { primary, secondary }]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{name === 'bazaraki' ? `${name} (пока не использовать)` : name}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div
                style={{
                  width: 80,
                  height: 48,
                  background: primary,
                  borderRadius: 8,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                }}
              >
                Primary
              </div>
              <div
                style={{
                  width: 80,
                  height: 48,
                  background: secondary,
                  borderRadius: 8,
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                }}
              >
                Secondary
              </div>
            </div>
          </div>
        )
      )}
    </div>
  ),
};

/** Семантические роли: Background. Используйте эти токены в макетах и коде. */
export const SemanticBackground: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { name: 'Background Primary', value: semantic.background.primary, text: semantic.text.primary },
        { name: 'Background Secondary', value: semantic.background.secondary, text: semantic.text.primary },
        { name: 'Background Tertiary', value: semantic.background.tertiary, text: semantic.text.primary },
        { name: 'Inverted Primary', value: semantic.background.invertedPrimary, text: semantic.text.inverted },
      ].map(({ name, value, text }) => (
        <div
          key={name}
          style={{
            padding: 16,
            background: value,
            color: text,
            borderRadius: 8,
            fontFamily: 'var(--font-family)',
          }}
        >
          {name}
        </div>
      ))}
    </div>
  ),
};

/** Семантические роли: Accent (кнопки, ссылки, активные состояния). Light и Dark темы. */
const accentRoles: { name: string; light: string; lightLabel: string; dark: string; darkLabel: string }[] = [
  { name: 'Link', light: semantic.accent.link, lightLabel: 'Blue/500', dark: semantic.accent.linkDark, darkLabel: 'Blue/400' },
  { name: 'Positive', light: semantic.accent.positive, lightLabel: 'Green/600', dark: semantic.accent.positiveDark, darkLabel: 'Green/400' },
  { name: 'Warning', light: semantic.accent.warning, lightLabel: 'Amber/400', dark: semantic.accent.warning, darkLabel: 'Amber/400' },
  { name: 'Negative', light: semantic.accent.negative, lightLabel: 'Red/600', dark: semantic.accent.negativeDark, darkLabel: 'Red/400' },
  { name: 'Secondary', light: semantic.accent.secondary, lightLabel: 'Zinc/100', dark: semantic.accent.secondaryDark, darkLabel: 'Zinc/800' },
  { name: 'Primary', light: semantic.accent.primary, lightLabel: 'Zinc/900', dark: semantic.accent.primaryDark, darkLabel: 'Zinc/200' },
];

function AccentSwatch({
  value,
  label,
  textDark,
  surfaceColor,
}: {
  value: string;
  label: string;
  textDark?: boolean;
  surfaceColor?: string;
}) {
  const whiteBorder = needsWhiteBorder(value, surfaceColor);
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        background: value,
        color: textDark ? '#000' : '#fff',
        borderRadius: 6,
        minWidth: 100,
        fontSize: 12,
        border: whiteBorder ? '1px solid #fff' : undefined,
        fontFamily: 'var(--font-family)',
      }}
    >
      <span style={{ width: 16, height: 16, background: 'rgba(0,0,0,0.15)', borderRadius: 4 }} />
      {label}
    </div>
  );
}

const darkSurface = semantic.background.invertedPrimary;

export const SemanticAccent: StoryObj = {
  render: () => (
    <div style={{ overflowX: 'auto', fontFamily: 'var(--font-family)' }}>
      <table style={{ borderCollapse: 'collapse', minWidth: 360, fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Name</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Light</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Dark</th>
          </tr>
        </thead>
        <tbody>
          {accentRoles.map(({ name, light, lightLabel, dark, darkLabel }) => (
            <tr key={name} style={{ borderBottom: '1px solid #f4f4f5' }}>
              <td style={{ padding: '8px 12px', verticalAlign: 'middle' }}>{name}</td>
              <td style={{ padding: '8px 12px' }}>
                <AccentSwatch value={light} label={lightLabel} textDark={light === semantic.accent.secondary} />
              </td>
              <td style={{ padding: '8px 12px', background: darkSurface }}>
                <AccentSwatch
                  value={dark}
                  label={darkLabel}
                  textDark={dark === semantic.accent.primaryDark}
                  surfaceColor={darkSurface}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

/** Семантические роли: Text & Icon. */
export const SemanticText: StoryObj = {
  render: () => (
    <div style={{ padding: 24, background: semantic.background.primary, borderRadius: 8 }}>
      <div style={{ color: semantic.text.primary, marginBottom: 8 }}>Text Primary</div>
      <div style={{ color: semantic.text.secondary, marginBottom: 8 }}>Text Secondary</div>
      <div style={{ color: semantic.text.tertiary, marginBottom: 8 }}>Text Tertiary</div>
      <div style={{ color: semantic.text.link, marginBottom: 8 }}>Text Link</div>
      <div style={{ color: semantic.text.positive }}>Text Positive</div>
      <div style={{ color: semantic.text.negative }}>Text Negative</div>
    </div>
  ),
};

/** Decor / Bubble: бейджи и подложки. */
export const SemanticDecor: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {(Object.entries(semantic.decor) as [string, { bg: string; text: string }][]).map(([key, { bg, text }]) => (
        <div
          key={key}
          style={{
            padding: '8px 12px',
            background: bg,
            color: text,
            borderRadius: 8,
            fontSize: 12,
          }}
        >
          {key}
        </div>
      ))}
    </div>
  ),
};
