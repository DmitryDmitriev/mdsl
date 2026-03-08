import type { Meta, StoryObj } from '@storybook/react';
import { height } from '@/tokens/spacing';

const meta: Meta = {
  title: 'Токены/Высота контролов',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Минимальная высота кнопок и однострочных инпутов. height/sm = 40px, height/md = 48px, height/lg = 56px, height/xs = 32px (compact). Спецификация: docs/DESIGN-TOKENS.md, docs/buttons-spec-figma.md',
      },
    },
  },
};

export default meta;

/** Высота контролов по размерам. */
export const ControlHeights: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
      {[
        { token: 'height/xs', value: height.xs, label: 'xs (32px)' },
        { token: 'height/sm', value: height.sm, label: 'sm (40px)' },
        { token: 'height/md', value: height.md, label: 'md (48px)' },
        { token: 'height/lg', value: height.lg, label: 'lg (56px)' },
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
          <div style={{ marginTop: 8, fontFamily: 'monospace', fontSize: 12 }}>{token}</div>
        </div>
      ))}
    </div>
  ),
};
