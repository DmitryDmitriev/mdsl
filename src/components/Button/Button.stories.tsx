import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Компоненты/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Размер кнопки. Соответствует height/xs, height/sm, height/md, height/lg.',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Вариант: Primary, Secondary, Outline, Ghost.',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние отключения.',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция иконки относительно текста.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Кнопка по спецификации docs/button-spec.md. Размеры: xs (32px), sm (40px), md (48px), lg (56px). Варианты: Primary, Secondary, Outline, Ghost. Outline: толщина border 1px (xs) / 2px (sm–lg). Токены: @/tokens — height, buttonPaddingX, buttonGap, radius, borderWidth, semantic colors.',
      },
    },
  },
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Primary',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'md',
  },
};

export const Outline: StoryObj<typeof Button> = {
  args: {
    children: 'Outline',
    variant: 'outline',
    size: 'md',
  },
};

export const Ghost: StoryObj<typeof Button> = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    size: 'md',
  },
};

export const Disabled: StoryObj<typeof Button> = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    disabled: true,
    size: 'md',
  },
};

export const Sizes: StoryObj<typeof Button> = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <Button size="xs">xs (32px)</Button>
      <Button size="sm">sm (40px)</Button>
      <Button size="md">md (48px)</Button>
      <Button size="lg">lg (56px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Все размеры: xs, sm, md, lg. Высота привязана к height/xs, height/sm, height/md, height/lg.',
    },
  },
};

const IconPlaceholder = ({ size = 20 }: { size?: number }) => (
  <span
    style={{
      width: size,
      height: size,
      background: 'currentColor',
      borderRadius: 4,
      display: 'inline-block',
      opacity: 0.9,
    }}
  />
);

export const WithIconLeft: StoryObj<typeof Button> = {
  args: {
    children: 'С иконкой',
    variant: 'primary',
    size: 'md',
    icon: <IconPlaceholder />,
    iconPosition: 'left',
  },
};

export const WithIconRight: StoryObj<typeof Button> = {
  args: {
    children: 'Далее',
    variant: 'primary',
    size: 'md',
    icon: <IconPlaceholder />,
    iconPosition: 'right',
  },
};

export const IconOnly: StoryObj<typeof Button> = {
  args: {
    variant: 'secondary',
    size: 'md',
    icon: <IconPlaceholder size={20} />,
    'aria-label': 'Icon button',
  },
};

export const AllVariants: StoryObj<typeof Button> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary" disabled>Primary disabled</Button>
        <Button variant="secondary" disabled>Secondary disabled</Button>
        <Button variant="outline" disabled>Outline disabled</Button>
        <Button variant="ghost" disabled>Ghost disabled</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Все варианты в состояниях Default и Disabled.',
    },
  },
};
