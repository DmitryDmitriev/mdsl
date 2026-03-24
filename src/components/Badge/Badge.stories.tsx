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
      options: ['xs', 'sm', 'md'],
      description: 'Размер: xs (32 px), sm (40 px), md (48 px) — по семантическим высотам, xs < sm < md.',
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
      description: 'Форма: pill (капсула) или rounded (скруглённый прямоугольник).',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Бейдж по спецификации docs/badge-spec.md. Варианты из semantic.decor (Good, Info, Warning, Negative, Question, Answer, Admin). Размеры привязаны к семантическим высотам: xs = 32 px (height.xs), sm = 40 px (height.sm), md = 48 px (height.md); прогрессия xs < sm < md. Формы pill/rounded. Контент: только текст или текст + иконка слева (gap 4 px). Токены: spacing, radius, height, semantic.decor.',
      },
    },
  },
};

export default meta;

export const Question: StoryObj<typeof Badge> = {
  args: {
    children: 'Нейтральный',
    variant: 'question',
    size: 'md',
  },
};

export const Good: StoryObj<typeof Badge> = {
  args: {
    children: 'Подтверждено',
    variant: 'good',
    size: 'md',
  },
};

export const Info: StoryObj<typeof Badge> = {
  args: {
    children: 'Информация',
    variant: 'info',
    size: 'md',
  },
};

export const Warning: StoryObj<typeof Badge> = {
  args: {
    children: 'Внимание',
    variant: 'warning',
    size: 'md',
  },
};

export const Negative: StoryObj<typeof Badge> = {
  args: {
    children: 'Отклонено',
    variant: 'negative',
    size: 'md',
  },
};

export const Answer: StoryObj<typeof Badge> = {
  args: {
    children: 'Ответ',
    variant: 'answer',
    size: 'md',
  },
};

export const Admin: StoryObj<typeof Badge> = {
  args: {
    children: 'Админ',
    variant: 'admin',
    size: 'md',
  },
};

export const Xs: StoryObj<typeof Badge> = {
  args: {
    children: 'Плотный интерфейс',
    variant: 'question',
    size: 'xs',
  },
  parameters: {
    docs: {
      description: 'Размер xs — для мест с высокой плотностью информации. Область применения будет уточнена.',
    },
  },
};

export const Sizes: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Badge size="xs" variant="info">xs</Badge>
      <Badge size="sm" variant="info">sm</Badge>
      <Badge size="md" variant="info">md</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Размеры xs (32 px), sm (40 px), md (48 px). Соответствуют height.xs, height.sm, height.md.',
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

const IconPlaceholder = ({ size = 16 }: { size?: number }) => (
  <span
    style={{
      width: size,
      height: size,
      background: 'currentColor',
      borderRadius: 2,
      display: 'inline-block',
      opacity: 0.8,
    }}
  />
);

export const WithIcon: StoryObj<typeof Badge> = {
  args: {
    children: 'С иконкой',
    variant: 'info',
    size: 'md',
    icon: <IconPlaceholder size={16} />,
  },
  parameters: {
    docs: {
      description: 'Иконка слева от текста, gap = spacing/1. Размеры иконок по размеру бейджа: xs → 16 px, sm → 24 px, md → 32 px.',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Badge size="xs" shape="pill" variant="info">xs pill</Badge>
        <Badge size="xs" shape="rounded" variant="info">xs rounded</Badge>
        <Badge size="sm" shape="pill" variant="info">sm pill</Badge>
        <Badge size="sm" shape="rounded" variant="info">sm rounded</Badge>
        <Badge size="md" shape="pill" variant="info">md pill</Badge>
        <Badge size="md" shape="rounded" variant="info">md rounded</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Комбинации размеров (xs, sm, md) и форм.',
    },
  },
};
