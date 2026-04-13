import type { Meta, StoryObj } from '@storybook/react';
import { controlHeight, size } from '@/tokens/spacing';

const meta: Meta = {
  title: 'Токены/Размеры',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**size/** — универсальные размеры для бейджей, аватаров, иконок (без touch target). **control-height/** — высота кнопок и инпутов с гарантией touch target ≥32px. Спецификация: docs/DESIGN-TOKENS.md',
      },
    },
  },
};

export default meta;

/** Универсальные размеры (size/*) — для бейджей, аватаров, иконок, thumbnails. */
export const UniversalSizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
      {[
        { token: 'size/2xs', value: size['2xs'], label: '2xs (16px)' },
        { token: 'size/xs', value: size.xs, label: 'xs (20px)' },
        { token: 'size/sm', value: size.sm, label: 'sm (24px)' },
        { token: 'size/md', value: size.md, label: 'md (32px)' },
        { token: 'size/lg', value: size.lg, label: 'lg (40px)' },
        { token: 'size/xl', value: size.xl, label: 'xl (48px)' },
        { token: 'size/2xl', value: size['2xl'], label: '2xl (56px)' },
      ].map(({ token, value, label }) => (
        <div key={token} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: value,
              height: value,
              background: 'var(--accent-link)',
              color: '#fff',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
            }}
          >
            {value}
          </div>
          <div style={{ marginTop: 8, fontFamily: 'monospace', fontSize: 11 }}>{token}</div>
        </div>
      ))}
    </div>
  ),
};

/** Высота контролов (control-height/*) — для кнопок и инпутов с touch target. */
export const ControlHeights: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
      {[
        { token: 'control-height/xs', value: controlHeight.xs, label: 'xs (32px)' },
        { token: 'control-height/sm', value: controlHeight.sm, label: 'sm (40px)' },
        { token: 'control-height/md', value: controlHeight.md, label: 'md (48px)' },
        { token: 'control-height/lg', value: controlHeight.lg, label: 'lg (56px)' },
      ].map(({ token, value, label }) => (
        <div key={token} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 120,
              height: value,
              background: 'var(--accent-active)',
              color: '#fff',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
            }}
          >
            {label}
          </div>
          <div style={{ marginTop: 8, fontFamily: 'monospace', fontSize: 11 }}>{token}</div>
        </div>
      ))}
    </div>
  ),
};
