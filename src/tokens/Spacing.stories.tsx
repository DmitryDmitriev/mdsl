import type { Meta, StoryObj } from '@storybook/react';
import { spacing, stack, buttonPaddingX, buttonGap } from '@/tokens/spacing';

const meta: Meta = {
  title: 'Токены/Отступы (Spacing)',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core: spacing/N = 4×N px. В UI используйте семантические токены: space (внутри компонентов), stack (между блоками), buttonPaddingX/buttonGap для кнопок. Спецификация: docs/DESIGN-TOKENS.md',
      },
    },
  },
};

export default meta;

/** Core spacing: 4×N px. Индексы 0,1,2,3,4,5,6,8,10,12,14,16. Не подставлять в экраны вручную. */
export const CoreSpacing: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(Object.entries(spacing) as [string, number][]).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: value,
              height: 24,
              minWidth: value,
              background: 'var(--accent-link)',
              borderRadius: 4,
            }}
          />
          <span style={{ fontFamily: 'monospace', fontSize: 14 }}>
            spacing/{key} = {value} px
          </span>
        </div>
      ))}
    </div>
  ),
};

/** Stack — вертикальные отступы между секциями. */
export const Stack: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {([
        { token: 'stack-sm', value: stack.sm },
        { token: 'stack-md', value: stack.md },
        { token: 'stack-lg', value: stack.lg },
        { token: 'stack-xl', value: stack.xl },
        { token: 'stack-2xl', value: stack['2xl'] },
      ] as const).map(({ token, value }) => (
        <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              height: value,
              width: 120,
              background: 'var(--bg-tertiary)',
              borderRadius: 4,
            }}
          />
          <span style={{ fontFamily: 'monospace', fontSize: 14 }}>
            {token} = {value} px
          </span>
        </div>
      ))}
    </div>
  ),
};

/** Горизонтальный padding кнопок по размерам. */
export const ButtonPaddingX: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(Object.entries(buttonPaddingX) as [string, number][]).map(([size, value]) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              height: 40,
              paddingLeft: value,
              paddingRight: value,
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-secondary)',
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            Button {size}
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
            buttonPaddingX.{size} = {value} px
          </span>
        </div>
      ))}
    </div>
  ),
};

/** Gap между иконкой и текстом в кнопке. */
export const ButtonGap: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(Object.entries(buttonGap) as [string, number][]).map(([size, value]) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              height: 40,
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              gap: value,
              background: 'var(--bg-secondary)',
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            <span style={{ width: 20, height: 20, background: 'var(--accent-active)', borderRadius: 4 }} />
            Text
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
            buttonGap.{size} = {value} px
          </span>
        </div>
      ))}
    </div>
  ),
};
