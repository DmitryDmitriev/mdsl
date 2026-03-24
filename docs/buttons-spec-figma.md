# Кнопки (Button) — спека для Figma

**Один компонент — одна спека.** Это единственный файл спецификации компонента «Кнопка»; не создавать отдельные файлы-описания для него.

Спека привязана к **дизайн-системе** и токенам из **docs/DESIGN-TOKENS.md**. В макетах и компонентах используются только **Semantic**-токены; Core — для построения семантики. Иконки — только из Figma Assets, размеры **16**, **24**, **32** px (см. docs/DESIGN-TOKENS.md).

---

## Размеры кнопок и референсы

В дизайн-системе заданы три высоты контролов: **height/sm**, **height/md**, **height/lg**. Четвёртый размер (32px) — компактный вариант; при необходимости ввести **height/xs** → spacing/8.

| Размер кнопки | Semantic (height) | Core референс | Значение |
|---------------|-------------------|---------------|----------|
| lg            | height/lg         | spacing/14    | 56 px    |
| md            | height/md         | spacing/12    | 48 px    |
| sm            | height/sm         | spacing/10    | 40 px    |
| xs (compact)  | —                 | spacing/8     | 32 px    |

---

## Токены по категориям

### Радиус (Semantic: radius)

Скругления кнопок и контролов задаются через **radius/control-*** (по размеру кнопки). Рекомендуемые референсы на Core:

| Размер кнопки | Semantic | Core | Значение |
|---------------|----------|------|----------|
| lg, md, sm | **radius/control-lg** | radius/3 | 12 px |
| xs | **radius/control-md** | radius/2 | 8 px |

В Figma (Semantic): **control-lg** → **radius/3** (12 px) для высот 56 / 48 / 40; **control-md** → **radius/2** (8 px) для высоты 32 (**xs**). Токен **control-sm** (4 px) в кнопках не используется.

### Отступы — space (padding, gap)

Внутренние отступы и зазор между иконкой и текстом берутся из шкалы **spacing**. В UI должны использоваться семантические переменные; ниже — рекомендуемые референсы (при отсутствии отдельных токенов для кнопок можно временно использовать Core в Figma, затем вынести в Semantic).

**Padding horizontal (отступ от края до текста/иконки):**

| Размер кнопки | Рекомендуемый Semantic   | Core      | Значение |
|---------------|--------------------------|-----------|----------|
| lg            | space/button-padding-x-lg | spacing/6 | 24 px   |
| md            | space/button-padding-x-md | spacing/5 | 20 px   |
| sm            | space/button-padding-x-sm | spacing/4 | 16 px   |
| xs            | space/button-padding-x-xs | spacing/3 | 12 px   |

**Gap (между иконкой и текстом):**

| Размер кнопки | Рекомендуемый Semantic | Core      | Значение |
|---------------|-------------------------|-----------|----------|
| lg            | space/button-gap-lg     | spacing/3 | 12 px   |
| md            | space/button-gap-md     | spacing/2 | 8 px    |
| sm            | space/button-gap-sm     | spacing/2 | 8 px    |
| xs            | space/button-gap-xs     | spacing/1 | 4 px    |

*Отступ от края кнопки до иконки* = тот же, что и padding horizontal (иконка внутри зоны padding).

### Высота (Semantic: height)

| Размер кнопки | Токен     | Значение |
|---------------|-----------|----------|
| lg            | height/lg | 56 px   |
| md            | height/md | 48 px   |
| sm            | height/sm | 40 px   |
| xs            | (height/xs или spacing/8) | 32 px |

Текстовые кнопки: высота фрейма = **height/lg** | **height/md** | **height/sm**. Иконные (квадратные): размер стороны = тот же токен.

### Иконки (размер)

Шкала иконок может быть привязана к **spacing** или к отдельной шкале icon/size. Пока — референс на Core:

| Размер кнопки | Рекомендуемый Semantic | Core / значение | px   |
|---------------|-------------------------|------------------|------|
| lg            | 24 px | Figma Assets (docs/DESIGN-TOKENS.md) |
| md, sm        | 24 px | Figma Assets |
| xs            | 16 px | Figma Assets |

В компонентах допускаются только размеры иконок **16**, **24**, **32** px (источник — Figma Assets).

### Обводка (вариант Outline)

Толщина обводки зависит от **размера кнопки** (как в UI-Kit-Mobile, Figma): на компактной **xs** тонкая линия, на **sm и выше** — более заметная.

| Размер | Толщина | Semantic (толщина) | Core |
|--------|---------|--------------------|------|
| **xs** (32 px) | **1 px** | **border/default** | border/1 |
| **sm, md, lg** | **2 px** | **border/emphasis** | border/2 |

- **Цвет** в состоянии Default: **Border/Default** (семантика `semantic.border.default` в коде).
- **Цвет** в состоянии Disabled: **Border/Disabled** (`semantic.border.disabled`). Толщина **та же**, что и в Default для данного размера.

Варианты **Primary**, **Ghost** и заливка **Secondary** не используют эту шкалу для внешнего контура (см. таблицу цветов ниже); **Secondary** сохраняет обводку **1 px** (`border/default`) по периметру заливки.

### Типографика

По **docs/TYPOGRAPHY.md**: шрифт **Inter**, начертание кнопок — **Medium (500)**. Стили текста привязаны к размеру кнопки:

| Размер кнопки | Стиль (TYPOGRAPHY.md) | Токен | Font size | Line height | Weight |
|---------------|------------------------|-------|------------|-------------|--------|
| lg            | Body 1                 | —     | 16 px      | 24 px       | 500    |
| md, sm        | Body 2                 | —     | 14 px      | 20 px       | 500    |
| xs            | Caption Medium          | caption-md | 12 px   | 16 px       | 500    |

В Figma: создать текстовые стили **Button / lg** (Body 1, Medium), **Button / md**, **Button / sm** (Body 2, Medium), **Button / xs** (typography/caption-md). Цвет текста — по **docs/COLOR-PALETTE.md** (Accent, Text & Icon).

### Цвета (Semantic)

По **docs/COLOR-PALETTE.md**: кнопки используют **Accent** и **Text & Icon**.

| Вариант кнопки | Fill | Border | Text / Icon | Disabled |
|----------------|------|--------|-------------|----------|
| Primary | Accent/Primary (Zinc/900 light, Zinc/200 dark) | — | Text & Icon / Inverted W-B (White на тёмном) | fill приглушённый, Text & Icon / Tertiary |
| Secondary | Accent/Secondary (Zinc/100 light, Zinc/800 dark) | — | Accent/Primary или Text & Icon / Primary | Text & Icon / Tertiary |
| Outline | прозрачный | Border/Default (цвет), толщина по размеру (см. § «Обводка») | Accent/Primary или Text & Icon / Primary | Border/Disabled (та же толщина), Text & Icon / Tertiary |
| Ghost | прозрачный | — | Accent/Primary или Text & Icon / Primary | Text & Icon / Tertiary |

Иконка в кнопке — тот же цвет, что и текст.

---

## Блок 1: Размер lg (56 px)

**Height:** height/lg (spacing/14) = 56 px  
**Radius:** radius/control-lg → radius/3 = 12 px

### Текстовые кнопки (с текстом или текст + иконка)

| Параметр              | Значение | Токен |
|-----------------------|----------|--------|
| Height                | 56 px    | height/lg |
| Padding horizontal    | 24 px    | space/button-padding-x-lg → spacing/6 |
| Border radius         | 12 px    | radius/control-lg → radius/3 |
| Border width (Outline)| 2 px     | border/emphasis → border/2 |
| Типографика | Body 1: 16 px / 24 px, Medium | docs/TYPOGRAPHY.md |
| Иконка (если есть)    | 24×24 px | Figma Assets, 24 px |
| Отступ иконка ↔ текст | 12 px    | space/button-gap-lg → spacing/3 |

### Иконные кнопки (только иконка)

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 56×56 px | height/lg |
| Border radius | 12 px | radius/control-lg → radius/3 |
| Icon size  | 24×24 px | Figma Assets, 24 px |

---

## Блок 2: Размер md (48 px)

**Height:** height/md (spacing/12) = 48 px  
**Radius:** radius/control-lg → radius/3 = 12 px

### Текстовые кнопки

| Параметр              | Значение | Токен |
|-----------------------|----------|--------|
| Height                | 48 px    | height/md |
| Padding horizontal    | 20 px    | space/button-padding-x-md → spacing/5 |
| Border radius         | 12 px    | radius/control-lg → radius/3 |
| Border width (Outline)| 2 px     | border/emphasis → border/2 |
| Типографика | Body 2: 14 px / 20 px, Medium | docs/TYPOGRAPHY.md |
| Иконка (если есть)    | 24×24 px | Figma Assets, 24 px |
| Отступ иконка ↔ текст | 8 px     | space/button-gap-md → spacing/2 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 48×48 px | height/md |
| Border radius | 12 px | radius/control-lg → radius/3 |
| Icon size  | 24×24 px | Figma Assets, 24 px |

---

## Блок 3: Размер sm (40 px)

**Height:** height/sm (spacing/10) = 40 px  
**Radius:** radius/control-lg → radius/3 = 12 px

### Текстовые кнопки

| Параметр              | Значение | Токен |
|-----------------------|----------|--------|
| Height                | 40 px    | height/sm |
| Padding horizontal    | 16 px    | space/button-padding-x-sm → spacing/4 |
| Border radius         | 12 px    | radius/control-lg → radius/3 |
| Border width (Outline)| 2 px     | border/emphasis → border/2 |
| Типографика | Body 2: 14 px / 20 px, Medium | docs/TYPOGRAPHY.md |
| Иконка (если есть)    | 24×24 px | Figma Assets, 24 px |
| Отступ иконка ↔ текст | 8 px     | space/button-gap-sm → spacing/2 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 40×40 px | height/sm |
| Border radius | 12 px | radius/control-lg → radius/3 |
| Icon size  | 24×24 px | Figma Assets, 24 px |

---

## Блок 4: Размер xs — compact (32 px)

**Height:** 32 px (spacing/8); в семантике при расширении — height/xs  
**Radius:** radius/control-md → radius/2 = 8 px

### Текстовые кнопки

| Параметр              | Значение | Токен |
|-----------------------|----------|--------|
| Height                | 32 px    | spacing/8 (или height/xs) |
| Padding horizontal    | 12 px    | space/button-padding-x-xs → spacing/3 |
| Border radius         | 8 px     | radius/control-md → radius/2 |
| Border width (Outline)| 1 px     | border/default → border/1 |
| Типографика | typography/caption-md: 12 px / 16 px, Medium | docs/TYPOGRAPHY.md |
| Иконка (если есть)    | 16×16 px | Figma Assets, 16 px |
| Отступ иконка ↔ текст | 4 px     | space/button-gap-xs → spacing/1 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 32×32 px | spacing/8 |
| Border radius | 8 px  | radius/control-md → radius/2 |
| Icon size  | 16×16 px | Figma Assets, 16 px |

---

## Сводная таблица по блокам

| Блок | Height | Size icon | Radius | Outline border | Padding X | Gap | Типографика | Icon size |
|------|--------|-----------|--------|----------------|-----------|-----|-------------|-----------|
| lg   | 56 (height/lg) | 56×56 | 12 (radius/3) | 2 px (border/emphasis) | 24 (spacing/6) | 12 (spacing/3) | Body 1, 16/24, Medium | 24 px |
| md   | 48 (height/md) | 48×48 | 12 (radius/3) | 2 px (border/emphasis) | 20 (spacing/5) | 8 (spacing/2) | Body 2, 14/20, Medium | 24 px |
| sm   | 40 (height/sm) | 40×40 | 12 (radius/3) | 2 px (border/emphasis) | 16 (spacing/4) | 8 (spacing/2) | Body 2, 14/20, Medium | 24 px |
| xs   | 32 (height/xs) | 32×32 | 8 (radius/2)  | 1 px (border/default) | 12 (spacing/3) | 4 (spacing/1) | typography/caption-md, 12/16, Medium | 16 px |

---

## Варианты (variants) в каждом блоке

Для каждого размера (lg, md, sm, xs):

1. **Text:** Primary, Secondary, Outline, Ghost (Default + Disabled); опция «только текст» или «текст + иконка».
2. **Icon:** Icon Primary, Secondary, Outline, Ghost (Default + Disabled).

Иконки для демо: lg/md — Phone; sm — Primary/Secondary: Phone, Outline/Ghost: Menu; xs — Menu.

---

## Синхронизация с кодом (Compose)

По docs/DESIGN-TOKENS.md:

- **spacing/N** → `N * 4.dp`
- **radius/3**, **radius/2** → `12.dp`, `8.dp`
- **border/1**, **border/2** → `1.dp`, `2.dp` (Outline: xs → 1, sm/md/lg → 2)
- **height/lg**, **height/md**, **height/sm** → `56.dp`, `48.dp`, `40.dp`; 32 → `32.dp` (spacing/8)

Семантические имена в коде должны совпадать с таблицей (например `ControlHeight.Large`, `ControlRadius.Large`).

---

## Для копирования в Figma

Краткий блок для описания компонента, комментариев или документации в Figma. Источники: эта спека, **docs/TYPOGRAPHY.md**, **docs/COLOR-PALETTE.md**.

**Общее:** Шрифт Inter. Состояния: Default, Disabled. Варианты: Primary, Secondary, Outline, Ghost (текстовые и иконные). Цвета: Accent + Text & Icon (COLOR-PALETTE). **Outline:** толщина **1 px** (border/default) на **xs**, **2 px** (border/emphasis) на **sm / md / lg**; цвет Border/Default и Border/Disabled.

**Текстовые стили в Figma (создать один раз):**

| Имя стиля   | Шрифт | Size | Line height | Weight |
|-------------|--------|------|-------------|--------|
| Button / lg | Inter  | 16   | 24          | Medium (500) |
| Button / md | Inter  | 14   | 20          | Medium (500) |
| Button / sm | Inter  | 14   | 20          | Medium (500) |
| Button / xs | Inter  | 12   | 16          | Medium (500) |

**Переменные (рекомендуемые в Figma):** Height: lg 56, md 48, sm 40, xs 32. Spacing: 4, 8, 12, 16, 20, 24 (spacing/1…6). Radius: 8 (radius/2), 12 (radius/3). Цвета: Accent/Primary, Accent/Secondary, Text & Icon (Primary, Tertiary, Inverted W-B), Border (Default, Disabled).
