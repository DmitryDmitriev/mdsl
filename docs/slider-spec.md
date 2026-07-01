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

Итого **2 варианта**. Baseline-ширина в библиотеке — 320, в проде **FILL** (растягивается по контейнеру).

**Scope Phase 1 — только состояние по умолчанию (enabled).** Состояния `Disabled` / `Dragging` (увеличение ручки + тень) и value-tooltip над ручкой — бэклог (см. §Дальнейшее).

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
| Thumb | border | 2 | `border/2` |

Ширина Track/Active и позиция ручек — рантайм-геометрия (зависит от значения и ширины контейнера), не токенизируются.

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

---

## Поведение

- **Single:** `Active` = от левого края дорожки до центра `Thumb`. Значение = позиция ручки.
- **Range:** `Active` = между `Thumb Min` и `Thumb Max`. Ручки не пересекаются; при сближении min ≤ max.
- Перетаскивание ручки меняет значение; шаг (step) и границы (min/max) — параметры рантайма.

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

- **State=Disabled** — приглушённые дорожка/ручка (`Text&Icon/Tertiary`-класс), без ripple/drag.
- **State=Dragging** — увеличение ручки + `Elevation/Floating` (по паттерну Material).
- **Value tooltip** — всплывающее значение над ручкой при перетаскивании (переиспользовать `Tooltip` из PB-1580).
- **Ticks / step-marks** — засечки для дискретных шкал.

---

## Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — size/spacing/radius/border шкалы
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика
- [pb-1580-discovery.md](./pb-1580-discovery.md) — контекст PB-1580 (Slider = референс Web DS)

---

## История

**2026-07-01 — Slider собран (PB-1580) + токен-аудит.**

Набор `Slider` (`10786:20`): Type=Single (`10786:11`) / Range (`10786:15`). Геометрия токенизирована: track height → `spacing/1`, radius → `radius/pill/pill`, thumb → `size/xs`. Цвета: Track `Background/Tertiary`, Active + Thumb `Accent/Primary`, ободок ручки `Background/Primary`.

Токен-аудит закрыл 2 пробела: (1) `strokeWeight` ручки был сырым `2` → привязан к `border/2`; (2) корневой фрейм был залит сырым `#ffffff` → сделан прозрачным (инлайн-контрол наследует поверхность; белый фон ломал Dark).

Slider → ✅ готов к разработке (Phase 1 — enabled-состояние).
