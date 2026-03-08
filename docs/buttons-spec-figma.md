# Спеки кнопок для Figma (по блокам размеров)

Спека привязана к **дизайн-системе** и токенам из **docs/DESIGN-TOKENS.md**. В макетах и компонентах используются только **Semantic**-токены; Core — для построения семантики.

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

| Размер кнопки | Semantic       | Core     | Значение |
|---------------|----------------|----------|----------|
| lg, md, sm    | radius/control-lg, control-md, control-sm | radius/3 | 12 px |
| xs            | radius/control-sm (минимальный контрол)   | radius/2 | 8 px  |

В Figma: для кнопок 56, 48, 40 — переменная **radius/control-lg** (или control-md, control-sm) → **radius/3** (12px). Для 32px — **radius/control-sm** → **radius/2** (8px).

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
| lg            | icon/size-lg (или spacing/6) | spacing/6  | 24 px |
| md            | icon/size-md (или spacing/5) | spacing/5  | 20 px |
| sm            | icon/size-sm (или spacing/5) | spacing/5  | 20 px |
| xs            | icon/size-xs (или spacing/4) | spacing/4  | 16 px |

*Примечание:* для md в пикселях ранее было 22px; по шкале spacing ближайшее — 20px (spacing/5). При введении отдельной шкалы icon можно задать 22px для md.

### Обводка (Outline)

Толщина обводки: **1 px**. При появлении в дизайн-системе токенов обводки — привязать к ним (например **border/width-thin** → 1px).

### Типографика

По **docs/TYPOGRAPHY.md**: шрифт **Inter**, начертание кнопок — **Medium (500)**. Стили текста привязаны к размеру кнопки:

| Размер кнопки | Стиль (TYPOGRAPHY.md) | Font size | Line height | Weight |
|---------------|------------------------|------------|-------------|--------|
| lg            | Body 1                 | 16 px      | 24 px       | 500    |
| md, sm        | Body 2                 | 14 px      | 20 px       | 500    |
| xs            | Caption Medium         | 12 px      | 16 px       | 500    |

В Figma: создать текстовые стили **Button / lg** (Body 1, Medium), **Button / md**, **Button / sm** (Body 2, Medium), **Button / xs** (Caption Medium). Цвет текста — по **docs/COLOR-PALETTE.md** (Accent, Text & Icon).

### Цвета (Semantic)

По **docs/COLOR-PALETTE.md**: кнопки используют **Accent** и **Text & Icon**.

| Вариант кнопки | Fill | Border | Text / Icon | Disabled |
|----------------|------|--------|-------------|----------|
| Primary | Accent/Primary (Zinc/900 light, Zinc/200 dark) | — | Text & Icon / Inverted W-B (White на тёмном) | fill приглушённый, Text & Icon / Tertiary |
| Secondary | Accent/Secondary (Zinc/100 light, Zinc/800 dark) | — | Accent/Primary или Text & Icon / Primary | Text & Icon / Tertiary |
| Outline | прозрачный | Border/Default или Accent/Primary | Accent/Primary или Text & Icon / Primary | Border/Disabled, Text & Icon / Tertiary |
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
| Border width (Outline)| 1 px     | border/width-thin (при наличии) |
| Типографика | Body 1: 16 px / 24 px, Medium | docs/TYPOGRAPHY.md |
| Иконка (если есть)    | 24×24 px | icon/size-lg → spacing/6 |
| Отступ иконка ↔ текст | 12 px    | space/button-gap-lg → spacing/3 |

### Иконные кнопки (только иконка)

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 56×56 px | height/lg |
| Border radius | 12 px | radius/control-lg → radius/3 |
| Icon size  | 24×24 px | icon/size-lg → spacing/6 |

---

## Блок 2: Размер md (48 px)

**Height:** height/md (spacing/12) = 48 px  
**Radius:** radius/control-md → radius/3 = 12 px

### Текстовые кнопки

| Параметр              | Значение | Токен |
|-----------------------|----------|--------|
| Height                | 48 px    | height/md |
| Padding horizontal    | 20 px    | space/button-padding-x-md → spacing/5 |
| Border radius         | 12 px    | radius/control-md → radius/3 |
| Типографика | Body 2: 14 px / 20 px, Medium | docs/TYPOGRAPHY.md |
| Иконка (если есть)    | 20×20 px | icon/size-md → spacing/5 |
| Отступ иконка ↔ текст | 8 px     | space/button-gap-md → spacing/2 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 48×48 px | height/md |
| Border radius | 12 px | radius/control-md → radius/3 |
| Icon size  | 20×20 px | icon/size-md → spacing/5 |

---

## Блок 3: Размер sm (40 px)

**Height:** height/sm (spacing/10) = 40 px  
**Radius:** radius/control-sm → radius/3 = 12 px

### Текстовые кнопки

| Параметр              | Значение | Токен |
|-----------------------|----------|--------|
| Height                | 40 px    | height/sm |
| Padding horizontal    | 16 px    | space/button-padding-x-sm → spacing/4 |
| Border radius         | 12 px    | radius/control-sm → radius/3 |
| Типографика | Body 2: 14 px / 20 px, Medium | docs/TYPOGRAPHY.md |
| Иконка (если есть)    | 20×20 px | icon/size-sm → spacing/5 |
| Отступ иконка ↔ текст | 8 px     | space/button-gap-sm → spacing/2 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 40×40 px | height/sm |
| Border radius | 12 px | radius/control-sm → radius/3 |
| Icon size  | 20×20 px | icon/size-sm → spacing/5 |

---

## Блок 4: Размер xs — compact (32 px)

**Height:** 32 px (spacing/8); в семантике при расширении — height/xs  
**Radius:** radius/control-sm → radius/2 = 8 px

### Текстовые кнопки

| Параметр              | Значение | Токен |
|-----------------------|----------|--------|
| Height                | 32 px    | spacing/8 (или height/xs) |
| Padding horizontal    | 12 px    | space/button-padding-x-xs → spacing/3 |
| Border radius         | 8 px     | radius/control-sm → radius/2 |
| Типографика | Caption Medium: 12 px / 16 px, Medium | docs/TYPOGRAPHY.md |
| Иконка (если есть)    | 16×16 px | icon/size-xs → spacing/4 |
| Отступ иконка ↔ текст | 4 px     | space/button-gap-xs → spacing/1 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 32×32 px | spacing/8 |
| Border radius | 8 px  | radius/control-sm → radius/2 |
| Icon size  | 16×16 px | icon/size-xs → spacing/4 |

---

## Сводная таблица по блокам

| Блок | Height | Size icon | Radius | Padding X | Gap | Типографика | Icon size |
|------|--------|-----------|--------|-----------|-----|-------------|-----------|
| lg   | 56 (height/lg) | 56×56 | 12 (radius/3) | 24 (spacing/6) | 12 (spacing/3) | Body 1, 16/24, Medium | 24 (spacing/6) |
| md   | 48 (height/md) | 48×48 | 12 (radius/3) | 20 (spacing/5) | 8 (spacing/2) | Body 2, 14/20, Medium | 20 (spacing/5) |
| sm   | 40 (height/sm) | 40×40 | 12 (radius/3) | 16 (spacing/4) | 8 (spacing/2) | Body 2, 14/20, Medium | 20 (spacing/5) |
| xs   | 32 (spacing/8) | 32×32 | 8 (radius/2)  | 12 (spacing/3) | 4 (spacing/1) | Caption Medium, 12/16, Medium | 16 (spacing/4) |

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
- **height/lg**, **height/md**, **height/sm** → `56.dp`, `48.dp`, `40.dp`; 32 → `32.dp` (spacing/8)

Семантические имена в коде должны совпадать с таблицей (например `ControlHeight.Large`, `ControlRadius.Large`).
