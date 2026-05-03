# Кнопки (Button) — спецификация для разработки

**Один компонент — одна спека.** Единственный файл спецификации компонента «Кнопка».

Привязка к **docs/DESIGN-TOKENS.md**. В UI используются только **семантические** токены; Core — для построения семантики. Иконки в кнопках — размеры **16**, **24** или **32** px (см. **docs/DESIGN-TOKENS.md**, раздел «Иконки»).

Реализация в репозитории: **src/components/Button/Button.tsx**, токены **@/tokens** (`height`, `buttonPaddingX`, `buttonGap`, `radius`, `borderWidth`, **semantic** из **@/tokens/colors**).

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

**control-sm** (4 px) в кнопках не используется.

### Отступы — space (padding, gap)

Внутренние отступы и зазор между иконкой и текстом — шкала **spacing**; в коде — `buttonPaddingX`, `buttonGap` (**src/tokens/spacing.ts**).

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

| Размер кнопки | Размер иконки |
|---------------|---------------|
| lg            | 24 px         |
| md, sm        | 24 px         |
| xs            | 16 px         |

Допустимые размеры иконок в компонентах — **16**, **24**, **32** px (**docs/DESIGN-TOKENS.md**).

### Обводка (вариант Outline)

Толщина обводки зависит от **размера кнопки**: на **xs** — тонкая линия, на **sm и выше** — более заметная.

| Размер | Толщина | Semantic (толщина) | Core |
|--------|---------|--------------------|------|
| **xs** (32 px) | **1 px** | **border/default** | border/1 |
| **sm, md, lg** | **2 px** | **border/emphasis** | border/2 |

- **Цвет** в состоянии Default: **Border/Default** (семантика `semantic.border.default` в коде).
- **Цвет** в состоянии Disabled: **Border/Disabled** (`semantic.border.disabled`). Толщина **та же**, что и в Default для данного размера.

Варианты **Primary**, **Secondary**, **Ghost** не имеют внешней обводки. Шкала «Обводка» применяется только к **Outline** (и **Outline Negative**, см. § Negative-варианты).

### Типографика

По **docs/TYPOGRAPHY.md**: шрифт **Inter**, начертание кнопок — **Medium (500)**. Стили текста привязаны к размеру кнопки:

| Размер кнопки | Стиль (TYPOGRAPHY.md) | Токен | Font size | Line height | Weight |
|---------------|------------------------|-------|------------|-------------|--------|
| lg            | Body 1                 | —     | 16 px      | 24 px       | 500    |
| md, sm        | Body 2                 | —     | 14 px      | 20 px       | 500    |
| xs            | Caption Medium          | caption-md | 12 px   | 16 px       | 500    |

Цвет текста — по **docs/COLOR-PALETTE.md** (Accent, Text & Icon).

### Цвета (Semantic)

По **docs/COLOR-PALETTE.md**: кнопки используют **Button**, **Accent**, **Text & Icon**, **Border**.

#### Нейтральные варианты

| Вариант | Fill | Border | Text / Icon | Disabled |
|---------|------|--------|-------------|----------|
| Primary | `Button/Primary` (= Accent/Primary) | — | `Text&Icon/Inverted W-B` | Fill `Background/Disabled`, Text `Text&Icon/Disabled` |
| Secondary | `Button/Secondary` (= Accent/Secondary) | — | `Text&Icon/Primary` | Fill `Background/Disabled`, Text `Text&Icon/Disabled` |
| Outline | прозрачный | `Border/Default`, толщина по размеру (см. § «Обводка») | `Text&Icon/Primary` | BG **остаётся прозрачным**; Border `Border/Disabled` (та же толщина); Text `Text&Icon/Disabled` |
| Ghost | прозрачный | — | `Text&Icon/Primary` | BG **остаётся прозрачным**; Text `Text&Icon/Disabled` |

#### Negative-варианты (destructive actions)

Применяются для деструктивных действий: «Удалить», «Снять с публикации», «Заблокировать».

| Вариант | Fill | Border | Text / Icon |
|---------|------|--------|-------------|
| **Negative** | `Button/Negative` (= Accent/Negative, Red/600 / Red/400) | — | `Text&Icon/Inverted W-B` |
| **Soft Negative** | `Button/Soft Negative` (= Background/Tinted/Negative, Red/50 / Red/800) | — | `Text&Icon/onTinted/negative` (Red/800 / Red/50) |
| **Ghost Negative** | прозрачный | — | `Accent/Negative` (Red/600 / Red/400) |

**Когда какой вариант:**
- **Negative** (filled) — редкие сильные деструктивные действия: «Удалить аккаунт», «Заблокировать пользователя». Громкий визуал.
- **Soft Negative** — частые деструктивные: «Удалить объявление», «Снять с публикации». Мягче, не пугает.
- **Ghost Negative** — inline-действия внутри других контейнеров (в строке списка, в меню), без визуального утяжеления.

**Outline-Negative в системе не делаем** — на мобиле тонкая красная обводка читается хуже, чем tinted-фон Soft Negative. Если нужен «не filled, но заметный» — используем Soft Negative.

**Размеры, отступы, типографика, обводка** — те же, что у нейтральных вариантов соответствующего типа: Negative ≡ Primary, Soft Negative ≡ Secondary, Ghost Negative ≡ Ghost.

Иконка в кнопке — тот же цвет, что и текст.

**Disabled-state у Negative-вариантов отсутствует** как отдельная вариация — визуально и семантически выключенная destructive-кнопка идентична выключенной нейтральной (серый фон, серый текст). Для disabled destructive-действия используется `Type=Primary/Secondary/Ghost State=Disabled` (визуальный результат — нейтральный disabled). Это сознательное упрощение: «выключенный» статус не несёт семантики действия.

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
| Иконка (если есть)    | 24×24 px | |
| Отступ иконка ↔ текст | 12 px    | space/button-gap-lg → spacing/3 |

### Иконные кнопки (только иконка)

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 56×56 px | height/lg |
| Border radius | 12 px | radius/control-lg → radius/3 |
| Icon size  | 24×24 px | |

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
| Иконка (если есть)    | 24×24 px | |
| Отступ иконка ↔ текст | 8 px     | space/button-gap-md → spacing/2 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 48×48 px | height/md |
| Border radius | 12 px | radius/control-lg → radius/3 |
| Icon size  | 24×24 px | |

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
| Иконка (если есть)    | 24×24 px | |
| Отступ иконка ↔ текст | 8 px     | space/button-gap-sm → spacing/2 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 40×40 px | height/sm |
| Border radius | 12 px | radius/control-lg → radius/3 |
| Icon size  | 24×24 px | |

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
| Иконка (если есть)    | 16×16 px | |
| Отступ иконка ↔ текст | 4 px     | space/button-gap-xs → spacing/1 |

### Иконные кнопки

| Параметр   | Значение | Токен |
|------------|----------|--------|
| Size       | 32×32 px | spacing/8 |
| Border radius | 8 px  | radius/control-md → radius/2 |
| Icon size  | 16×16 px | |

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

1. **Text — нейтральные:** Primary, Secondary, Outline, Ghost (Default + Disabled); опция «только текст» или «текст + иконка».
2. **Text — destructive:** Negative, Soft Negative, Ghost Negative (Default + Disabled); опция «только текст» или «текст + иконка».
3. **Icon — нейтральные:** Icon Primary, Secondary, Outline, Ghost (Default + Disabled).
4. **Icon — destructive:** Icon Negative, Soft Negative, Ghost Negative (Default + Disabled).

Иконки для демо: lg/md — Phone; sm — Primary/Secondary: Phone, Outline/Ghost: Menu; xs — Menu. Для Negative-вариантов — Trash / Delete.

---

## Синхронизация с кодом

**Web (этот репозиторий):** значения в **px** в `Button.tsx` и **@/tokens**; Outline: `borderWidth.default` (1) для **xs**, `borderWidth.emphasis` (2) для **sm / md / lg** — см. **docs/DESIGN-TOKENS.md**.

**Android (Compose):** те же числа в **dp**: spacing/N → `N * 4.dp`, radius/3 и radius/2 → `12.dp`, `8.dp`, border → `1.dp` / `2.dp`, высоты → `32/40/48/56.dp`.

---

## Аудит покрытия токенами

| Component | Color | Token | Type | Overall |
|---|---|---|---|---|
| Button | 100% | 100% | 100% | 100% |
| ButtonIcon | 100% | 100% | — | 100% |
| Buttons Stack | 100% | 100% | 100% | 100% |
| FAB Bar | 100% | 89% | 100% | 91% |

Все основные кнопки полностью на токенах. У FAB Bar остались SiglButton itemSpacing и Tab Bar Buttons width — компенсация iOS UI Kit, см. fab-bar-spec.md.
