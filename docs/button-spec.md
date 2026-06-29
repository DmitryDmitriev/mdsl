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

### Высота (Semantic: control-height)

| Размер кнопки | Токен              | Значение |
|---------------|--------------------|----------|
| lg            | control-height/lg  | 56 px   |
| md            | control-height/md  | 48 px   |
| sm            | control-height/sm  | 40 px   |
| xs            | control-height/xs  | 32 px   |

**Текстовые и иконные кнопки используют одну и ту же шкалу `control-height/*`** (интерактивный контрол, touch target ≥32 px). У иконной кнопки квадратный фрейм — `width` и `height` биндятся к одному и тому же `control-height/{size}`. Шкала `size/*` для кнопок **не используется** — она для информационных элементов (Avatar, Badge), см. `DESIGN-TOKENS.md` §«Когда `size/*` vs `control-height/*`».

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
| **Ghost Negative** | прозрачный | — | `Text&Icon/Negative` (≡ `Accent/Negative` — оба Red/600 Light / Red/400 Dark) |

**Когда какой вариант:**
- **Negative** (filled) — редкие сильные деструктивные действия: «Удалить аккаунт», «Заблокировать пользователя». Громкий визуал.
- **Soft Negative** — частые деструктивные: «Удалить объявление», «Снять с публикации». Мягче, не пугает.
- **Ghost Negative** — inline-действия внутри других контейнеров (в строке списка, в меню), без визуального утяжеления.

**Outline-Negative в системе не делаем** — на мобиле тонкая красная обводка читается хуже, чем tinted-фон Soft Negative. Если нужен «не filled, но заметный» — используем Soft Negative.

#### Overlay-вариант (только ButtonIcon, поверх медиа)

`Type=Overlay` — контрол, размещаемый **поверх произвольного фото/видео** (delete/edit в фото-галерее постинга, ♡ favorite на карточке объявления, close/⋯ в Stories, тулбар lightbox, камера на cover/avatar). Обычные fill'ы (`Background/Primary` и т.п.) **не гарантируют контраст** с непредсказуемым по яркости медиа-контентом — Overlay решает это скримом.

| Вариант | Fill | Border | Icon | Disabled |
|---------|------|--------|------|----------|
| **Overlay** | `Background/Overlay` (скрим: alpha Black/40 Light, alpha Black/30 Dark) | — | `Text&Icon/White applied` (White/Main в **обеих** темах, theme-invariant) | **не делаем** |

- **Почему отдельный `Type`, а не fill-override:** контраст-гарантия — это связка «скрим + theme-invariant белая иконка», а не один цвет. Зашита в вариант, чтобы продукт не собирал её вручную (иначе — silent неправильные fill'ы, как было обнаружено в PB-1581).
- **Почему нет Disabled:** disabled-фон `Background/Disabled` (Zinc/100) над фото невидим; overlay-контролы — всегда активные триггеры. Зеркалит логику «destructive icon-only не делаем».
- **`Text&Icon/White applied` ≠ `Inverted W-B`:** White applied белый в обеих темах (медиа не знает о теме), Inverted W-B флипается на тёмный в Dark. Для контента поверх фото — только White applied.
- **`Background/on Photo` НЕ использовать** для overlay-контролов: в Dark-теме = alpha White/50 (белый скрим), на нём белая иконка пропадает. `on Photo` — это photo-tint, а не control-scrim. См. COLOR-PALETTE.md §2.1.
- **Ограничение скрима:** полупрозрачный Black/40 не даёт WCAG-гарантии над чисто-белым участком фото — врождённое свойство любого scrim-подхода (так же в iOS/Material). При проблеме на ярких фото — escape hatch — theme-invariant фикс-токен.
- **Иконка** в библиотеке демо-плейсхолдер (`ic_arrow_back`/`ic_more`) — на продукте свапается через Instance Swap под кейс (close/delete/edit/favorite).

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

### Двухстрочные кнопки (Label + Subtitle) — **только Size lg**

Применение: главный CTA, где смысл строится из **действия + результата** — Apply-фильтра со счётчиком, кнопка покупки со скрытой ценой, подтверждение операции с суммой и т.п.

**Доступно только для Size lg.** На md/sm/xs не разрешено — стек двух строк не помещается в высоту, теряется читаемость.

**Доступно только для Type:** Primary, Secondary, Outline (CTA-типы). На Ghost / Negative / Soft Negative / Ghost Negative — не делаем (вспомогательные/destructive не требуют составного содержимого).

#### Размеры

| Параметр | Значение | Токен |
|---|---|---|
| Height | 56 px | height/lg |
| Padding horizontal | 24 px | space/button-padding-x-lg → spacing/6 |
| Padding vertical | 8 / 8 px | spacing/2 |
| Border radius | 12 px | radius/control-lg → radius/3 |
| Vertical gap label ↔ subtitle | 0 px | — (line-heights дают воздух) |
| Иконка (если есть) | 24×24 px | — |
| Отступ иконка ↔ текстовый блок | 12 px | space/button-gap-lg → spacing/3 |

**Высота не меняется — остаётся 56 px.** Линии-height label + subtitle ровно укладываются в `8 + 24 + 16 + 8 = 56`.

#### Типографика

| Слой | Стиль | Назначение |
|---|---|---|
| Label (верх) | `Body 1 Medium` — 16 / 24 | Основное действие («Применить») |
| Subtitle (низ) | `Caption md` — 12 / 16 | Результат / контекст («4 762 объявления») |

Subtitle — **не альтернатива длинному названию действия.** Если действие требует 2 слов («Очистить корзину») — оставлять однострочно с правильной формулировкой, а не дробить.

#### Цвета (по Type)

| Type | Label | Subtitle |
|---|---|---|
| Primary | Text&Icon/Inverted W-B | Text&Icon/Inverted W-B (та же, full opacity) |
| Secondary | Text&Icon/Primary | Text&Icon/Primary (та же) |
| Outline | Text&Icon/Primary | Text&Icon/Primary (та же) |

Иерархия строится **размером шрифта** (16 vs 12), а не цветом. Subtitle с пониженной opacity / Secondary-цветом не делать — на цветных подложках Primary subtitle станет нечитаемым.

#### Поведение

- **Subtitle опционален.** Boolean property `Subtitle` в компоненте: `false` (default) — обычная однострочная кнопка; `true` — добавляет subtitle.
- **Label обрезается ellipsis при overflow**, subtitle — тоже на 1 строку с ellipsis. Никаких переносов на 2+ строки в subtitle.
- **Иконка размещается слева от текстового блока (обе строки).** Не делать отдельную иконку у subtitle.
- **Disabled state** — оба текста принимают Text&Icon/Disabled, фон/обводка по правилам кнопки.
- **Pressed / hover** — без особых отличий, ripple на всю поверхность.

#### Когда **не** использовать

| Сценарий | Почему | Что использовать |
|---|---|---|
| Title + опциональный hint вне CTA-контекста | Subtitle ≠ helper-text | List Item с overline / supporting |
| Длинное название действия | Subtitle должен быть результатом, не уточнением | Однострочная кнопка + правильная формулировка |
| Текст помощи под кнопкой | Это не часть кнопки | Helper-text как отдельный TEXT-узел |
| Стек двух равнозначных значений (цена + старая цена) | Кнопка не место для прайс-сравнений | Strikethrough-pattern в карточке |

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

1. **Text — нейтральные:** Primary, Secondary, Outline, Ghost (Default + Disabled); опция «только текст» или «текст + иконка». Form: `Square` | `Rounded`.
2. **Text — destructive:** Negative, Soft Negative, Ghost Negative (**только Default** — Disabled у destructive не делаем, см. §«Цвета — Negative-варианты»); опция «только текст» или «текст + иконка».
   - **Negative, Soft Negative** — Form: `Square` | `Rounded`.
   - **Ghost Negative** — Form: только `Square`. Rounded не делаем (ghost-фон без обводки + rounded-форма теряют визуальный контур, на фоне списка превращаются в неотличимый «красный текст»).
3. **Icon — нейтральные:** Icon Primary, Secondary, Outline, Ghost (Default + Disabled). Form: `Square` | `Rounded`. Итого 4 × 4 × 2 × 2 = **64 варианта**.
4. **Icon — destructive: не делаем.** В UI деструктивные действия без текстовой подписи опасны (пользователь не понимает, что произойдёт). Если в продуктовом экране нужен destructive icon-only — это локальный override через Swap Instance на `Ghost` + ручная подмена цвета на `Text&Icon/Negative`, не системный паттерн.
5. **Icon — Overlay (поверх медиа):** Icon Overlay — контрол поверх произвольного фото/видео. **Только `Disabled=No`** (см. §«Цвета — Overlay»). Form: `Square` | `Rounded`, Size: 32 / 40 / 48 / 56. Итого 4 × 2 = **8 вариантов**.

Всего в COMPONENT_SET `ButtonIcon` — **72 варианта** (64 нейтральных + 8 Overlay).

Иконки для демо: lg/md — Phone; sm — Primary/Secondary: Phone, Outline/Ghost: Menu; xs — Menu. Для Negative-вариантов в text-Button — Trash / Delete.

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
| FAB Bar | 100% | 89% | 100% | 91% |

Все основные кнопки полностью на токенах. У FAB Bar остались SiglButton itemSpacing и Tab Bar Buttons width — компенсация iOS UI Kit, см. fab-bar-spec.md.

> **Buttons Stack** вынесен в отдельную спеку — см. [buttons-stack-spec.md](./buttons-stack-spec.md) §5 «Аудит покрытия токенами».

---

## История миграций

**2026-05-11 — аудит готовности к разработке (component-spec-check).**

Спека внутренне непротиворечива — все правки на стороне Figma:

- **Типографика Size=48 (md) и Size=40 (sm)** — 30 text-вариантов переведены с `Base/Body 1 Medium` (16/24) на **`Base/Body 2 Medium`** (14/20). Body 1 Medium оставлен только для Size=56 (lg) и Size=32 — Caption MD Medium (12/16).
- **Outline / State=Default border** — 6 вариантов перепривязаны с `Accent/Primary` на **`Border/Default`** (семантика бордера, не accent-токен).
- **State=Disabled / Fill** (Primary, Secondary) — 12 вариантов перепривязаны с `Background/Secondary` на **`Background/Disabled`**.
- **State=Disabled / Text+Icon** (Primary, Secondary, Outline, Ghost) — 22 варианта перепривязаны с `Text&Icon/Tertiary` на **`Text&Icon/Disabled`**.
- **Soft Negative / Text+Icon** — 6 вариантов перепривязаны с `Text&Icon/Negative` (Red/600) на **`Text&Icon/on Tinted/Negative`** (Red/800 / Red/50). Red/600 на пастельном Red/50 фоне давал контраст на грани WCAG AA — по той же логике, что в badge-spec §2.
- **Ghost Negative / Text+Icon** — оставлено на `Text&Icon/Negative`. По COLOR-PALETTE.md (после миграции 2026-05-11) `Text&Icon/Negative` ≡ `Accent/Negative` в обеих темах (Red/600 Light, Red/400 Dark). Спека §«Цвета — Деструктив» дополнена уточнением.

Итого 76 правок. Button → ✅ готов к разработке.

**2026-05-11 — аудит ButtonIcon (4603:900), 156 правок:**

- **Height + Width**: все 64 варианта перепривязаны с `size/md|lg|xl|2xl` (информационная шкала) на **`control-height/xs|sm|md|lg`** (интерактивная). ButtonIcon — интерактивный контрол, должен быть на той же шкале, что текстовая Button.
- **Variant Type "56" → "Secondary"**: 4 ноды (Size=56) переименованы. Раньше variant property давала кривой enum `Primary | Secondary | 56 | Outline | Ghost` — теперь чисто `Primary | Secondary | Outline | Ghost`.
- **Variant Form "Round" → "Rounded"**: 32 ноды переименованы. Унификация с text-Button (там Form = `Square | Rounded`).
- **Outline + Default border** (8 вариантов): `Accent/Primary` → **`Border/Default`**.
- **Primary/Secondary + Disabled fill** (16 вариантов): `Background/Secondary` → **`Background/Disabled`**.
- **All + Disabled icon-fill** (32 варианта): `Text&Icon/Tertiary` → **`Text&Icon/Disabled`**.
- **Negative-варианты для ButtonIcon — зафиксировано «не делаем»** (см. §«Варианты», пункт 4). Деструктив icon-only опасен без подписи; для локальных случаев — Swap Instance на Ghost с ручным цветом.

Спека §«Высота» уточнена: токены `control-height/*` (раньше `height/*`), §«Варианты» уточнена: явные Form-значения, фиксация по Negative.

ButtonIcon → ✅ готов к разработке.

**2026-05-15 — добавлен Subtitle для Size lg (2-line CTA).**

Расширение Button для двухстрочных CTA-кнопок («Применить · 4 762 объявления», «Получить · бесплатно»). Высота не меняется — остаётся 56 px (math: `8 + 24 (Body 1 Medium LH) + 16 (Caption md LH) + 8 = 56`).

- **Новая BOOLEAN property `Subtitle`** (default false) на компоненте `Button` в UI-Kit-Mobile (key `Subtitle#9069:0`).
- **6 variants получили subtitle layer:** Size=56 × Form=Square × (Primary/Secondary/Outline) × (Default/Disabled). Rounded и другие Type-ы (Ghost/Negative/Soft Negative/Ghost Negative) — не делаем (см. §«Двухстрочные кнопки», подсекция «Когда не использовать»).
- **Padding vertical 16 → 8** на этих 6 variants — освобождает место для второй строки без увеличения высоты.
- **Label-text обёрнут в `Label Block`** (VERTICAL auto-layout) внутри каждой 56-Square variants. Subtitle visibility привязана к новой boolean через `componentPropertyReferences`.
- **Цвета** — оба текста одинаковые (Inverted W-B для Primary, Text&Icon/Primary для Secondary/Outline, Text&Icon/Disabled для Disabled). Иерархия строится размером (16 vs 12), не цветом.

Спека §«Блок 1: Размер lg (56 px)» расширена секцией «Двухстрочные кнопки (Label + Subtitle) — только Size lg» — типографика, цвета, поведение, ограничения «когда не использовать».

Button → ✅ обновлён, требуется Publish library из UI-Kit-Mobile (`PI2N65xbeJPTc5oWhOP7Bl`).

**2026-05-15 (вечер) — аудит Subtitle + чистка spec inconsistencies.**

После добавления Subtitle прошёл audit через `component-spec-check`. Прошло 13 из 14 параметров, 1 расхождение + 2 застарелые spec-inconsistency:

- **Subtitle text style** — 6 variants. `Inter Regular 12/16` был задан числами hardcoded → привязан к `Caption/caption-md` (key `95d808f2a7842023303a4f10690f5f105aaed814`). Теперь Foundation-token controls font properties.
- **§«Варианты» п.2 fix:** строка про destructive — убрано «(Default + Disabled)», добавлена явная формулировка «только Default — Disabled у destructive не делаем». Спека стала самосогласована: §«Цвета — Negative-варианты» уже описывала это правило, а §«Варианты» противоречила.
- **§«Варианты» п.2 fix:** Ghost Negative — Form `только Square` (не `Square | Rounded`). Зафиксировано: rounded-form у ghost-фона без обводки на списке превращается в неотличимый красный текст. Поэтому в Figma и не делаем — спека приведена в соответствие с реальностью.

Button audit coverage → 100% по этим 6 variants. ✅

**2026-06-29 — ButtonIcon `Type=Overlay` (контролы поверх медиа). DS-gap из PB-1581.**

При ребилде фото-галереи постинга (X delete / pencil edit поверх произвольных фото) обнаружен gap: ни один `Type` не гарантировал контраст с непредсказуемым медиа-контентом → overlay-контролы собирались бы с silent неправильными fill'ами (`Background/Primary` и т.п.).

**Анализ премисы:** изначально запрашивалось семейство токенов `Decor/Overlay/*` + вариант. Проверка палитры показала — токены **уже есть**, заводить ничего не нужно: скрим = `Background/Overlay`, белый foreground = `Text&Icon/White applied` (theme-invariant). Gap был только в компоненте. `Decor/*` отвергнут как namespace (это декоративные hue, а не функциональная контраст-роль).

- **+8 вариантов** в `ButtonIcon` (4603:900): `Type=Overlay` × Size (32/40/48/56) × Form (Square/Rounded), `Disabled=No`. Сет 64 → 72 варианта.
- Fill `Background/Overlay`, icon `Text&Icon/White applied`. Собраны клоном `Type=Primary, Disabled=No` + перепривязка fill'ов.
- **Disabled опущен** осознанно (disabled-фон над фото невидим; overlay = всегда активный триггер).
- Правило зафиксировано в `composition-rules.md §11` + нота про `Background/on Photo` в `COLOR-PALETTE.md §2.1`. Скилл `ds-build` пропатчен.

ButtonIcon → ✅ обновлён, требуется Publish library из UI-Kit-Mobile.
