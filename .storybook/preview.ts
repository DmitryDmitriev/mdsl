import type { Preview } from '@storybook/react';
import '../src/tokens/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Введение',
          'Токены',
          ['Цвета', 'Отступы (Spacing)', 'Радиусы', 'Высота контролов'],
          'Компоненты',
          ['Button', 'Badge', 'Avatar', 'Sheets'],
        ],
      },
    },
  },
};

export default preview;
