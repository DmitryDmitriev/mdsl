import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Компоненты/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Размер: xs (32px), sm (40px), md (48px), lg (56px). Токены height/xs..height/lg.',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', undefined],
      description: 'Индикатор статуса (online, offline, away).',
    },
    showBorder: {
      control: 'boolean',
      description: 'Показывать обводку (border/default).',
    },
    name: {
      control: 'text',
      description: 'Имя для инициалов при отсутствии изображения.',
    },
    src: {
      control: 'text',
      description: 'URL изображения.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Аватар по спецификации docs/avatar-spec.md. Размеры: xs (32), sm (40), md (48), lg (56). Варианты: с изображением, fallback по инициалам, опциональный статус. Токены: height, radius.pill, semantic.background.secondary, semantic.text.primary, semantic.border.default.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Avatar> = {
  args: {
    name: 'Иван Петров',
    size: 'md',
  },
};

export const WithImage: StoryObj<typeof Avatar> = {
  args: {
    src: 'https://i.pravatar.cc/96?img=12',
    alt: 'Пользователь',
    name: 'Иван Петров',
    size: 'md',
  },
};

export const FallbackInitials: StoryObj<typeof Avatar> = {
  args: {
    name: 'Мария Сидорова',
    size: 'md',
  },
  parameters: {
    docs: {
      description: 'При отсутствии src показываются инициалы на фоне bg-secondary, текст — text-primary.',
    },
  },
};

export const SingleWordName: StoryObj<typeof Avatar> = {
  args: {
    name: 'Алексей',
    size: 'md',
  },
  parameters: {
    docs: {
      description: 'Одно слово — берутся первые две буквы.',
    },
  },
};

export const Sizes: StoryObj<typeof Avatar> = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
      <Avatar name="Иван Петров" size="xs" />
      <Avatar name="Иван Петров" size="sm" />
      <Avatar name="Иван Петров" size="md" />
      <Avatar name="Иван Петров" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: 'Размеры xs (32px), sm (40px), md (48px), lg (56px). Токены height/xs..height/lg.',
    },
  },
};

export const WithBorder: StoryObj<typeof Avatar> = {
  args: {
    name: 'Иван Петров',
    size: 'md',
    showBorder: true,
  },
};

export const StatusOnline: StoryObj<typeof Avatar> = {
  args: {
    name: 'Иван Петров',
    size: 'md',
    status: 'online',
  },
};

export const StatusOffline: StoryObj<typeof Avatar> = {
  args: {
    name: 'Иван Петров',
    size: 'md',
    status: 'offline',
  },
};

export const StatusAway: StoryObj<typeof Avatar> = {
  args: {
    name: 'Иван Петров',
    size: 'md',
    status: 'away',
  },
};

export const ImageWithStatus: StoryObj<typeof Avatar> = {
  args: {
    src: 'https://i.pravatar.cc/96?img=33',
    alt: 'Пользователь',
    name: 'Анна Козлова',
    size: 'md',
    status: 'online',
    showBorder: true,
  },
};

export const ImageLoadError: StoryObj<typeof Avatar> = {
  args: {
    src: 'https://invalid-url.example/avatar.png',
    name: 'Иван Петров',
    size: 'md',
  },
  parameters: {
    docs: {
      description: 'При ошибке загрузки изображения показывается fallback с инициалами.',
    },
  },
};

export const AllVariants: StoryObj<typeof Avatar> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, color: 'var(--text-secondary)' }}>Размеры</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <Avatar name="ИП" size="xs" />
          <Avatar name="ИП" size="sm" />
          <Avatar name="ИП" size="md" />
          <Avatar name="ИП" size="lg" />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, color: 'var(--text-secondary)' }}>С картинкой и с fallback</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar src="https://i.pravatar.cc/96?img=1" alt="User" name="User One" size="md" />
          <Avatar name="Мария Сидорова" size="md" />
          <Avatar name="Алексей" size="md" />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, color: 'var(--text-secondary)' }}>Статусы</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar name="Online" size="md" status="online" />
          <Avatar name="Offline" size="md" status="offline" />
          <Avatar name="Away" size="md" status="away" />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, color: 'var(--text-secondary)' }}>С обводкой</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar name="Иван Петров" size="md" showBorder />
          <Avatar src="https://i.pravatar.cc/96?img=5" alt="User" name="User" size="md" showBorder status="online" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: 'Сводка всех вариантов: размеры, изображение/fallback, статусы, обводка.',
    },
  },
};
