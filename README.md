# DSL Design System

Дизайн-система: токены (цвета, отступы, радиусы, высоты) и компоненты. **Спеки для разработки** — в папке `docs/` (оглавление: **docs/README.md**).

## Storybook

Storybook собран так, чтобы было понятно **дизайнерам**, **менеджерам** и **разработчикам**, как использовать компоненты и токены.

### Запуск

```bash
npm install
npm run storybook
```

Откроется http://localhost:6006.

### Сборка статики

```bash
npm run build-storybook
```

Результат в папке `storybook-static/` (можно раздавать как статический сайт).

### Что внутри Storybook

| Раздел | Для кого | Содержание |
|--------|----------|------------|
| **Введение** | Все | Обзор системы, для кого какой раздел, правила использования. |
| **Токены → Цвета** | Дизайн, разработка | Примитивные палитры (Neutral, Zinc, бренды) и семантика (Background, Accent, Text, Decor). |
| **Токены → Отступы** | Дизайн, разработка | Core spacing, stack, padding и gap кнопок. |
| **Токены → Радиусы** | Дизайн, разработка | Core radius и семантика (control-*, surface, overlay, pill). |
| **Токены → Высота контролов** | Дизайн, разработка | height/xs, sm, md, lg для кнопок и инпутов. |
| **Компоненты → Button** | Все | Размеры, варианты (Primary, Secondary, Outline, Ghost), с иконкой, только иконка, disabled. |

В каждой стори есть описание и при необходимости — код и ссылки на `docs/COLOR-PALETTE.md`, `docs/DESIGN-TOKENS.md`, `docs/button-spec.md`.

## Структура проекта

- `docs/` — спеки для разработки: см. **docs/README.md** (токены, типографика, цвета, компоненты).
- `src/tokens/` — токены в коде (TypeScript + CSS-переменные в `global.css`).
- `src/components/` — компоненты (например, Button) и их сториз.
- `.storybook/` — конфигурация Storybook.

## Использование токенов в коде

- **CSS:** в проекте подключён `src/tokens/global.css` — используйте переменные `var(--spacing-4)`, `var(--text-primary)`, `var(--height-md)` и т.д.
- **TS/React:** импорт из `@/tokens` и `@/tokens/colors` (например `height`, `semantic`, `radius`).
