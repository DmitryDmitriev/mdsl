import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Sheets } from './Sheets';

const meta: Meta<typeof Sheets> = {
  title: 'Компоненты/Sheets',
  component: Sheets,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Открыта ли панель' },
    anchor: {
      control: 'select',
      options: ['bottom', 'top'],
      description: 'Сторона появления: bottom или top',
    },
    size: {
      control: 'select',
      options: ['full', 'half', 'auto'],
      description: 'Размер панели: full (100%), half (50%), auto (по контенту)',
    },
    withHandle: { control: 'boolean', description: 'Показывать ручку сверху' },
    withHeader: { control: 'boolean', description: 'Показывать хедер с заголовком' },
    closeOnBackdropClick: { control: 'boolean', description: 'Закрывать по клику на подложку' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sheets (шит) — выезжающая панель поверх контента (bottom/top sheet). Спецификация: docs/sheets-spec.md. Токены: semantic.background.overlay, semantic.surface.primary, radius.overlay, stack, spacing.',
      },
    },
  },
};

export default meta;

type SheetsWithTriggerProps = Omit<ComponentProps<typeof Sheets>, 'open' | 'onClose'> & { defaultOpen?: boolean };

function SheetsWithTrigger({ defaultOpen = false, ...props }: SheetsWithTriggerProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ padding: 24 }}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: '1px solid #e4e4e7',
          background: '#fff',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Открыть Sheets
      </button>
      <Sheets open={open} onClose={() => setOpen(false)} {...props}>
        {props.children ?? (
          <p style={{ margin: 0 }}>
            Контент панели. Закройте по клику на подложку, по Escape или по кнопке в хедере.
          </p>
        )}
      </Sheets>
    </div>
  );
}

export const Default: StoryObj<typeof Sheets> = {
  render: () => <SheetsWithTrigger defaultOpen withHandle withHeader title="Заголовок" />,
  parameters: {
    docs: { description: { story: 'Панель снизу, с ручкой и хедером. Size auto.' } },
  },
};

export const BottomAuto: StoryObj<typeof Sheets> = {
  render: () => (
    <SheetsWithTrigger
      defaultOpen
      anchor="bottom"
      size="auto"
      withHandle
      withHeader
      title="Краткий контент"
    >
      <p style={{ margin: 0 }}>Высота панели подстраивается под контент (max 90dvh).</p>
    </SheetsWithTrigger>
  ),
  parameters: {
    docs: { description: { story: 'anchor=bottom, size=auto. Высота по контенту.' } },
  },
};

export const BottomHalf: StoryObj<typeof Sheets> = {
  render: () => (
    <SheetsWithTrigger
      defaultOpen
      anchor="bottom"
      size="half"
      withHandle
      withHeader
      title="Половина экрана"
    >
      <p style={{ margin: 0 }}>Панель занимает 50% высоты экрана.</p>
    </SheetsWithTrigger>
  ),
  parameters: {
    docs: { description: { story: 'anchor=bottom, size=half (50% высоты).' } },
  },
};

export const BottomFull: StoryObj<typeof Sheets> = {
  render: () => (
    <SheetsWithTrigger
      defaultOpen
      anchor="bottom"
      size="full"
      withHandle
      withHeader
      title="На весь экран"
    >
      <p style={{ margin: 0 }}>Панель на всю высоту (100%).</p>
    </SheetsWithTrigger>
  ),
  parameters: {
    docs: { description: { story: 'anchor=bottom, size=full.' } },
  },
};

export const TopSheet: StoryObj<typeof Sheets> = {
  render: () => (
    <SheetsWithTrigger
      defaultOpen
      anchor="top"
      size="auto"
      withHandle
      withHeader
      title="Панель сверху"
    >
      <p style={{ margin: 0 }}>Выезжает сверху. Скругление нижних углов (radius.overlay).</p>
    </SheetsWithTrigger>
  ),
  parameters: {
    docs: { description: { story: 'anchor=top. Панель выезжает сверху.' } },
  },
};

export const WithoutHandle: StoryObj<typeof Sheets> = {
  render: () => (
    <SheetsWithTrigger defaultOpen withHandle={false} withHeader title="Без ручки">
      <p style={{ margin: 0 }}>Ручка (handle) скрыта.</p>
    </SheetsWithTrigger>
  ),
  parameters: {
    docs: { description: { story: 'withHandle=false.' } },
  },
};

export const WithoutHeader: StoryObj<typeof Sheets> = {
  render: () => (
    <SheetsWithTrigger defaultOpen withHandle withHeader={false} title="">
      <p style={{ margin: 0 }}>Только ручка и контент, без хедера.</p>
    </SheetsWithTrigger>
  ),
  parameters: {
    docs: { description: { story: 'withHeader=false. Нет заголовка и кнопки закрытия в хедере.' } },
  },
};

export const LongContent: StoryObj<typeof Sheets> = {
  render: () => (
    <SheetsWithTrigger defaultOpen size="auto" withHandle withHeader title="Прокручиваемый контент">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ margin: 0 }}>
            Строка контента {i + 1}. При size=auto область контента прокручивается (overflow-y: auto).
          </p>
        ))}
      </div>
    </SheetsWithTrigger>
  ),
  parameters: {
    docs: { description: { story: 'Длинный контент — прокрутка внутри панели.' } },
  },
};
