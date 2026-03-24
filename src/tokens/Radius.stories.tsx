import type { Meta, StoryObj } from '@storybook/react';
import { radiusCore, radius } from '@/tokens/radius';

const meta: Meta = {
  title: 'Токены/Радиусы',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core: radius/N = 4×N px; radius/full = 999px. В UI используйте семантические: control-sm/md/lg, surface, overlay, pill. Спецификация: docs/DESIGN-TOKENS.md',
      },
    },
  },
};

export default meta;

/** Core radius. Не подставлять в экраны вручную. */
export const CoreRadius: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
      {(Object.entries(radiusCore) as [string, number][]).map(([key, value]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: 'var(--accent-link)',
              borderRadius: key === 'full' ? 999 : value,
              marginBottom: 8,
            }}
          />
          <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
            radius/{key} = {key === 'full' ? '999px' : `${value}px`}
          </span>
        </div>
      ))}
    </div>
  ),
};

/** Семантические радиусы для контролов и поверхностей. */
export const SemanticRadius: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[
        { name: 'control-sm (мелкие контролы, 4)', value: radius.controlSm },
        { name: 'control-md (кнопка xs, бейдж rounded, 8)', value: radius.controlMd },
        { name: 'control-lg (кнопки sm/md/lg, 12)', value: radius.controlLg },
        { name: 'surface (карточки, панели, 12)', value: radius.surface },
        { name: 'overlay (модалки, шит, 16)', value: radius.overlay },
        { name: 'pill (капсулы)', value: radius.pill },
      ].map(({ name, value }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 80,
              height: 40,
              background: 'var(--bg-secondary)',
              borderRadius: value,
              border: '1px solid var(--border-default)',
            }}
          />
          <span style={{ fontSize: 14 }}>
            {name} — {value}px
          </span>
        </div>
      ))}
    </div>
  ),
};
