import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Компоненты/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['good', 'info', 'warning', 'negative', 'question', 'answer', 'admin'],
      description: 'Семантический вариант (decor: good, info, warning, negative, question, answer, admin).',
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs-s', 'xs', 'sm', 'md'],
      description: 'Размер: 2xs (16px), xs-s (20px), xs (32px), sm (40px), md (48px).',
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
      description: 'Форма: pill (капсула) или rounded (скруглённый прямоугольник).',
    },
    counter: {
      control: 'text',
      description: 'Каунтер справа от текста (число или строка).',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Бейдж по спецификации docs/badge-spec.md. Варианты из semantic.decor. Размеры: 2xs (16px), xs-s (20px), xs (24px), sm (32px), md (40px). Контент: [Icon?] [Text] [Counter?]. Токены: spacing, radius, size, semantic.decor.',
      },
    },
  },
};

export default meta;

export const Question: StoryObj<typeof Badge> = {
  args: {
    children: 'Нейтральный',
    variant: 'question',
    size: 'sm',
  },
};

export const Good: StoryObj<typeof Badge> = {
  args: {
    children: 'Подтверждено',
    variant: 'good',
    size: 'sm',
  },
};

export const Info: StoryObj<typeof Badge> = {
  args: {
    children: 'Информация',
    variant: 'info',
    size: 'sm',
  },
};

export const Warning: StoryObj<typeof Badge> = {
  args: {
    children: 'Внимание',
    variant: 'warning',
    size: 'sm',
  },
};

export const Negative: StoryObj<typeof Badge> = {
  args: {
    children: 'Отклонено',
    variant: 'negative',
    size: 'sm',
  },
};

export const Answer: StoryObj<typeof Badge> = {
  args: {
    children: 'Ответ',
    variant: 'answer',
    size: 'sm',
  },
};

export const Admin: StoryObj<typeof Badge> = {
  args: {
    children: 'Админ',
    variant: 'admin',
    size: 'sm',
  },
};

export const Sizes: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Badge size="2xs" variant="info">2xs</Badge>
      <Badge size="xs-s" variant="info">xs-s</Badge>
      <Badge size="xs" variant="info">xs</Badge>
      <Badge size="sm" variant="info">sm</Badge>
      <Badge size="md" variant="info">md</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Все размеры: 2xs (16px), xs-s (20px), xs (24px), sm (32px), md (40px).',
    },
  },
};

export const SmallSizesForListItems: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#666' }}>Каунтеры для trailing:</span>
        <Badge size="xs-s" variant="question">12</Badge>
        <Badge size="xs-s" variant="info">New</Badge>
        <Badge size="xs-s" variant="negative">3</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#666' }}>Компактные бейджи:</span>
        <Badge size="xs" variant="good">Active</Badge>
        <Badge size="xs" variant="warning">Pending</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#666' }}>Микро-индикаторы:</span>
        <Badge size="2xs" variant="negative">3</Badge>
        <Badge size="2xs" variant="info">!</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Маленькие размеры для использования в list items и trailing-слотах.',
    },
  },
};

export const Shapes: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Badge shape="pill" variant="good">pill</Badge>
      <Badge shape="rounded" variant="good">rounded</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Форма pill (radius.pill) и rounded (radius.controlMd, 8 px).',
    },
  },
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '100%', height: '100%' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const WithIcon: StoryObj<typeof Badge> = {
  args: {
    children: 'С иконкой',
    variant: 'good',
    size: 'sm',
    icon: <CheckIcon />,
  },
  parameters: {
    docs: {
      description: 'Иконка слева от текста, gap = spacing/1. Размеры иконок: 2xs/xs-s → 12px, xs → 16px, sm/md → 24px.',
    },
  },
};

export const WithCounter: StoryObj<typeof Badge> = {
  args: {
    children: 'High reliability',
    variant: 'good',
    size: 'sm',
    counter: '25',
  },
  parameters: {
    docs: {
      description: 'Каунтер справа от текста. Используется для отображения количества.',
    },
  },
};

export const WithIconAndCounter: StoryObj<typeof Badge> = {
  args: {
    children: 'Active',
    variant: 'info',
    size: 'sm',
    icon: <CheckIcon />,
    counter: '12',
  },
  parameters: {
    docs: {
      description: 'Полная структура: [Icon] [Text] [Counter].',
    },
  },
};

export const CounterVariants: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Badge size="sm" variant="good" counter="5">Messages</Badge>
        <Badge size="sm" variant="info" counter="12">Notifications</Badge>
        <Badge size="sm" variant="warning" counter="3">Warnings</Badge>
        <Badge size="sm" variant="negative" counter="1">Errors</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Badge size="xs-s" variant="question" counter="99+">Items</Badge>
        <Badge size="xs" variant="info" counter="NEW">Updates</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Различные варианты использования каунтера.',
    },
  },
};

export const AllVariants: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Badge variant="good">good</Badge>
      <Badge variant="info">info</Badge>
      <Badge variant="warning">warning</Badge>
      <Badge variant="negative">negative</Badge>
      <Badge variant="question">question</Badge>
      <Badge variant="answer">answer</Badge>
      <Badge variant="admin">admin</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Все семантические варианты (semantic.decor).',
    },
  },
};

export const AllSizesAndShapes: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Badge size="2xs" shape="pill" variant="info">2xs</Badge>
        <Badge size="xs-s" shape="pill" variant="info">xs-s</Badge>
        <Badge size="xs" shape="pill" variant="info">xs</Badge>
        <Badge size="sm" shape="pill" variant="info">sm</Badge>
        <Badge size="md" shape="pill" variant="info">md</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Badge size="2xs" shape="rounded" variant="info">2xs</Badge>
        <Badge size="xs-s" shape="rounded" variant="info">xs-s</Badge>
        <Badge size="xs" shape="rounded" variant="info">xs</Badge>
        <Badge size="sm" shape="rounded" variant="info">sm</Badge>
        <Badge size="md" shape="rounded" variant="info">md</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Все комбинации размеров и форм.',
    },
  },
};
