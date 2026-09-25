# Slider — спецификация для разработки

**Один компонент — одна спека.** «Slider» — контрол выбора значения (`Single`) или диапазона (`Range`) вдоль дорожки. Часть PB-1580 (Tooltip / Coach Mark / Popover / Slider).

Привязка к **docs/DESIGN-TOKENS.md** и **docs/COLOR-PALETTE.md**. Все размеры, радиусы и цвета — только через **существующие** токены. Компонентно-специфичных токенов нет.

Figma: страница **🟢 Slider**, набор **Slider** (COMPONENT_SET `10786:20`).

---

## Обзор

Slider — горизонтальный контрол на всю ширину контейнера. Дорожка (`Track`) показывает весь диапазон, активная часть (`Active`) — выбранное значение, круглые ручки (`Thumb`) перетаскиваются.

- **Single** — одна ручка; активная часть заливается от начала дорожки до ручки. Кейс: одиночное значение (громкость, радиус поиска).
- **Range** — две ручки (`Thumb Min` / `Thumb Max`); активная часть — между ними. Кейс: диапазон цены «от–до».

Компонент содержит только дорожку и ручки. Подписи значений / min–max лейблы / поле ввода диапазона — композиция на стороне продукта (не входят в компонент).

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Type** | Single, Range |
| **State** | Default, Dragging, Disabled |

Итого **6 вариантов** (2 Type × 3 State). Baseline-ширина в библиотеке — 320, в проде **FILL** (растягивается по контейнеру).

- **Default** — обычное enabled-состояние (Phase 1).
- **Dragging** — активная ручка в момент перетаскивания: увеличена, с halo и тенью (§Размеры, §Поведение).
- **Disabled** — контрол недоступен: приглушённые токены, без ripple/drag (§Цвета).

Value-tooltip над ручкой при перетаскивании — переиспользование компонента `Tooltip` (не вариант Slider; §Поведение → Value tooltip).

---

## Структура слоёв

```
Slider (COMPONENT) — фикс. высота 24 (тач-зона), fill transparent
├── Track  (RECTANGLE, FILL width, h 4)          — вся дорожка
├── Active (RECTANGLE, h 4)                        — выбранная часть (Single: от начала; Range: между ручками)
├── Thumb        (ELLIPSE 20×20)                   — Type=Single
└── Thumb Min / Thumb Max (ELLIPSE 20×20 каждая)   — Type=Range
```

Дорожка и активная часть выровнены по вертикальному центру тач-зоны; ручки центрированы на дорожке.

---

## Размеры и радиусы

| Элемент | Параметр | Значение | Токен |
|---|---|---|---|
| Root (тач-зона) | height | 24 | — (высота контейнера; тач-зона, не токенизируется) |
| Track / Active | height | 4 | `spacing/1` |
| Track / Active | radius | pill | `radius/pill/pill` |
| Thumb | width / height | 20 × 20 | `size/xs` |
| Thumb (Dragging) | width / height | **24 × 24** | `size/sm` |
| Thumb | border | 2 | `border/2` |
| Halo (Dragging) | ⌀ | **44** | — (тач-зона; = мин. интерактивная область ручки 44) |

Ширина Track/Active и позиция ручек — рантайм-геометрия (зависит от значения и ширины контейнера), не токенизируются.

**Halo (Dragging).** На время перетаскивания вокруг активной ручки — полупрозрачное кольцо-state-layer ⌀44: `Accent/Primary` с opacity **≈16 % Light / ≈20 % Dark**. Отдельный токен не заводим (opacity поверх `Accent/Primary`); ⌀44 совпадает с минимальной интерактивной тач-зоной ручки (§Доступность). Halo — единственный тема-независимый признак драга: в Dark тени не рисуются (см. §Поведение → Dragging).

---

## Цвета

По **docs/COLOR-PALETTE.md**.

| Элемент | Роль | Токен |
|---|---|---|
| **Track** (неактивная дорожка) | fill | `Background/Tertiary` |
| **Active** (выбранная часть) | fill | `Accent/Primary` |
| **Thumb** | fill | `Accent/Primary` |
| **Thumb** | border (обводка-ободок) | `Background/Primary` |

Ободок ручки (`Background/Primary`, 2px) отделяет ручку от активной дорожки того же цвета (`Accent/Primary`) — ручка «врезается» в дорожку с чистым зазором. Root прозрачный: слайдер инлайн-контрол и наследует поверхность экрана (не красит собственный фон — иначе ломается Dark / небелые поверхности).

### State = Disabled

По образцу **Switch Disabled** (switch-spec §Цвета) — смена токенов, НЕ общая прозрачность.

| Элемент | Токен | Light | Dark |
|---|---|---|---|
| **Track** (неактивная дорожка) | `Background/Secondary` | #F4F4F5 | #18181B |
| **Active** (выбранная часть) | `Text&Icon/Tertiary` | #D4D4D8 | #71717A |
| **Thumb** fill | `Text&Icon/Tertiary` | #D4D4D8 | #71717A |
| **Thumb** border (2px) | `Background/Primary` | #FFFFFF | #09090B |

- Ободок `Background/Primary` **сохраняется**: Active и Thumb в Disabled одного цвета (`Text&Icon/Tertiary`) — ободок отделяет ручку от дорожки, как в enabled.
- Приглушение — **сменой токенов**, не blanket-`opacity` (opacity-приём — только Phase-1-костыль List Item, не канон для контролов).
- Без ripple / drag / halo / tooltip.

---

## Поведение

- **Single:** `Active` = от левого края дорожки до центра `Thumb`. Значение = позиция ручки.
- **Range:** `Active` = между `Thumb Min` и `Thumb Max`. Ручки не пересекаются; при сближении min ≤ max.
- Перетаскивание ручки меняет значение; шаг (step) и границы (min/max) — параметры рантайма.

### Dragging (перетаскивание активной ручки)

- Активная ручка увеличивается **20 → 24** (`size/sm`); ободок без изменений (2px `Background/Primary`). Вторая ручка Range не меняется.
- Вокруг активной ручки — **halo** ⌀44 (§Размеры). Halo появляется на время удержания, исчезает при отпускании.
- В **Light** дополнительно тень `Elevation/Floating` на ручке. В **Dark** тени не применяются (elevation-spec) — признак драга несут **halo + увеличение + value-tooltip** (тема-независимо).
- После отпускания ручка возвращается к 20, halo/тень убираются.
- Анимация (увеличение/halo) — как state-layer: `duration/fast` (100) + `easing/standard` (motion-spec §3, строка «Slider — ручка (Dragging)»). При Reduce Motion — мгновенно.

### Value tooltip (значение над ручкой)

Переиспользуется компонент `Tooltip` (`11122:21`, tooltip-spec) — не вариант Slider.

- **Когда:** только при перетаскивании; прячется сразу после отпускания (без задержки). При простом тапе без движения — не показывается.
- **Что:** значение **активной** ручки (той, что тянут). Для Range — значение активной ручки, НЕ весь диапазон (диапазон читается двумя ручками; полный «5 000 – 250 000 €» в пузыре громоздок). При совпадении/сближении ручек — один пузырь для активной.
- **Формат:** задаёт продукт (напр. цена через `PriceFormatter`); по умолчанию — число с разделителями по локали.
- **Одна строка с обрезкой** («…»), НЕ перенос: значение цены в две строки выглядит странно (slider-специфичный оверрайд дефолтного переноса Tooltip `maxWidth 240`, см. tooltip-spec).
- **Позиция:** по центру активной ручки, отступ **8** (`spacing/2`) от верхнего края **увеличенной (24)** ручки; у края экрана — clamp в safe area; если сверху нет места — снизу (tooltip-spec §Позиционирование).
- **Анимация:** появление `base` (200) / `standard`, закрытие `fast` (100) / `accelerate` (motion-spec §3, строка Tooltip); Reduce Motion — мгновенно.
- **Дубль с подписями «от–до»:** если продукт показывает подписи значений под слайдером — tooltip дублирует. Решение — **на стороне продукта** (у компонента есть параметр выключения tooltip); компонент сам не детектит.

---

## Доступность (a11y)

- **Тач-зона:** визуальная ручка 20 px; интерактивная область ручки должна быть **≥ 44 px** (расширяется прозрачным hit-area в коде — не отражено в геометрии Figma).
- **Клавиатура:** стрелки ← → меняют значение на step; Home/End — к границам. Для Range — Tab между ручками.
- **Screen reader:** `role="slider"`, `aria-valuemin/valuemax/valuenow`; для Range — две ноды slider с отдельными value.
- **Контраст:** `Accent/Primary` (Zinc/900 Light) на `Background/Tertiary` — ≥ 3:1 (не-текстовый UI-компонент, WCAG 1.4.11 пройдено).

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fills / strokes) | **100%** |
| 🔲 Tokens (radius / size / spacing / border) | **100%** |
| **Overall** | **100%** |

Правила аудита: исключены FILL-ширина и рантайм-позиции (значение-зависимые), высота тач-зоны контейнера (24). Все стилевые свойства (высота дорожки, радиус, размер ручки, толщина обводки, цвета) привязаны к переменным.

---

## Синхронизация с кодом

```tsx
<Slider
  type="single"        // "single" | "range"
  min={0} max={100} step={1}
  value={40}                    // single
  // value={[20, 70]}           // range
/>
```

CSS-переменные (из существующих токенов):
```css
--slider-track-height: var(--spacing-1);       /* 4  */
--slider-track-radius: var(--radius-pill-pill); /* pill */
--slider-thumb-size:   var(--size-xs);          /* 20 */
--slider-thumb-border: var(--border-2);         /* 2  */
/* fills: track = Background/Tertiary; active + thumb = Accent/Primary; thumb border = Background/Primary */
```

---

## Дальнейшее (бэклог)

- **Ticks / step-marks** — засечки для дискретных шкал.

_Реализовано в Phase 2 (2026-09-25, LIOS-2792): State=Disabled, State=Dragging (увеличение + halo + тень), Value tooltip — см. §Варианты / §Размеры / §Цвета / §Поведение._

---

## Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — size/spacing/radius/border шкалы
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика
- [pb-1580-discovery.md](./pb-1580-discovery.md) — контекст PB-1580 (Slider = референс Web DS)

---

## История

**2026-09-25 — Phase 2 (LIOS-2792): State=Disabled/Dragging + Value tooltip.** Сверка с iOS (MR !1418). Добавлена ось **State = Default / Dragging / Disabled** (× Type). Решения: Disabled — по образцу Switch (Track `Background/Secondary`, Active+Thumb `Text&Icon/Tertiary`, ободок сохранён), смена токенов, не opacity. Dragging — ручка 20→24 (`size/sm`), **halo** ⌀44 (`Accent/Primary` ~16/20 %), тень `Elevation/Floating` (только Light; в Dark признак драга несут halo+увеличение+tooltip). Value tooltip — `Tooltip` `11122:21`: только при drag, значение активной ручки, одна строка с обрезкой, offset 8 от ручки-24; дубль с подписями «от–до» решает продукт. Анимация — motion §3 (state-layer `fast`/`standard`; tooltip `base`/`fast`). Ticks остаются в бэклоге.

**2026-07-01 — Slider собран (PB-1580) + токен-аудит.**

Набор `Slider` (`10786:20`): Type=Single (`10786:11`) / Range (`10786:15`). Геометрия токенизирована: track height → `spacing/1`, radius → `radius/pill/pill`, thumb → `size/xs`. Цвета: Track `Background/Tertiary`, Active + Thumb `Accent/Primary`, ободок ручки `Background/Primary`.

Токен-аудит закрыл 2 пробела: (1) `strokeWeight` ручки был сырым `2` → привязан к `border/2`; (2) корневой фрейм был залит сырым `#ffffff` → сделан прозрачным (инлайн-контрол наследует поверхность; белый фон ломал Dark).

Slider → ✅ готов к разработке (Phase 1 — enabled-состояние).
