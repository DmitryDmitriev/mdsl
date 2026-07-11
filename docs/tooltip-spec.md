# Tooltip / Coach Mark — спецификация для разработки

**Один компонент — одна спека.** Унифицированный **`Tooltip`** покрывает две функции всплывающего пузыря с хвостиком: **Tooltip** (короткая подсказка) и **Coach Mark** (онбординг-выноска с заголовком, счётчиком шагов и кнопками). Часть **PB-1580** (Tooltip / Coach Mark / Popover / Slider).

Привязка к **docs/DESIGN-TOKENS.md** и **docs/COLOR-PALETTE.md**. Все размеры, радиусы и цвета — через существующие токены.

Figma: страница **🟢 Tooltip (unified)** — набор **`Tooltip`** (COMPONENT_SET `10897:486`) + building-block **`.=Tooltip Bubble`** (COMPONENT_SET `10896:179`).

---

## Обзор

Всплывающий пузырь с **хвостиком** (указателем на элемент-якорь). Одна структура обслуживает оба кейса — разница только в трактовке (цвет) и наполнении:

- **Tooltip** — короткая текстовая подсказка. Тёмный (инверсный) пузырь, только `Body`. Хвостик указывает на триггер.
- **Coach Mark** — обучающая выноска в онбординге. Синий пузырь, `Title` + `Body` + счётчик шагов + кнопки «Пропустить / Далее».

Обе функции объединены **осознанно** (решение дизайна 2026-07-08): идентичная геометрия (пузырь + хвостик + hug под контент + выравнивание хвостика), различие сведено к оси `Type` (цвет) и булевым (наполнение).

### Оси набора `Tooltip`

| Свойство | Значения |
|---|---|
| **Type** | Tooltip, Coach Mark |
| **Placement** | Top, Bottom, Left, Right |
| **Tail align** | Start, Center, End |

Итого **24 варианта** (2 × 4 × 3).

- **Type** — задаёт цвет пузыря и хвостика (Tooltip = инверсный тёмный, Coach Mark = синий) + цвет текста.
- **Placement** — сторона, с которой торчит хвостик (= противоположна якорю: пузырь снизу → хвостик Top).
- **Tail align** — позиция хвостика вдоль стороны: `Start` / `Center` / `End`. Для Top/Bottom — лево/центр/право, для Left/Right — верх/центр/низ. Позволяет указать на якорь, не двигая сам пузырь.

### Наполнение — булевы (на вложенном пузыре)

| Свойство | Что переключает |
|---|---|
| **Title#** | Заголовок |
| **Counter#** (`Step#`) | Счётчик шагов «1 / 3» |
| **Actions#** | Кнопки «Пропустить / Далее» |

- **Tooltip-рецепт:** все булевы `off` → остаётся только `Body`. Пузырь сжимается под текст.
- **Coach Mark-рецепт:** все булевы `on` → `Title` + `Body` + счётчик + кнопки.

---

## Building-block `.=Tooltip Bubble`

Единый источник контента (COMPONENT_SET `10896:179`, ось `Type`). Пузырь **hug под контент**: короткий текст → узкий пузырь, длинный — растёт до `maxWidth 280` и переносится. Каждый из 24 вариантов набора `Tooltip` содержит **инстанс** нужного варианта пузыря + хвостик в цвет.

```
Tooltip (COMPONENT_SET, Type × Placement × Tail align) — auto-layout, hug, tail-align через counterAxisAlignItems
├── ⟶ .=Tooltip Bubble (instance, Type=Tooltip|Coach Mark) — контент, hug под контент
└── Tail (VECTOR, залитый в цвет Type) — позиционируется counterAxisAlignItems (Start/Center/End)

.=Tooltip Bubble (COMPONENT, Type) — VERTICAL auto-layout, hug, gap spacing/3, padding spacing/4
├── Title (TEXT, auto-width, maxWidth 280)          — булев Title#
├── Body  (TEXT, auto-width, maxWidth 280)
└── Footer (FRAME, HORIZONTAL, STRETCH, space-between)
    ├── «1 / 3» (TEXT)                               — булев Counter# (Step#)
    └── Actions (FRAME) [Button «Пропустить» Ghost, Button «Далее» Primary]  — булев Actions#
```

- **hug + tail-align:** пузырь всегда самый широкий элемент варианта → задаёт ширину фрейма; выравнивание фрейма по кросс-оси (`counterAxisAlignItems`) двигает только узкий хвостик под контент. Так хвостик встаёт точно под пузырём в позиции Start/Center/End.
- **Хвостик** — залитый вектор (16×8 для Top/Bottom, 8×16 для Left/Right), цвет = цвет заливки пузыря (обводки нет). Смыкается с пузырём без шва.

---

## Размеры и радиусы

| Элемент | Параметр | Значение | Токен |
|---|---|---|---|
| Пузырь | padding | 16 | `spacing/4` |
| Пузырь | gap (заголовок/body/footer) | 12 | `spacing/3` |
| Пузырь | radius | 12 | `radius/surface/surface` |
| Пузырь | max-width | 280 | — (ограничение контента, не токен) |
| Хвостик | размер | 16×8 / 8×16 | — (геометрия указателя) |
| Тень | drop-shadow | Elevation | (см. elevation-spec) |

Ширина пузыря — **hug под контент** (рантайм), не токенизируется.

---

## Цвета

По **docs/COLOR-PALETTE.md**.

| Type | Заливка пузыря + хвостика | Текст |
|---|---|---|
| **Tooltip** | `Background/Inverted Primary` (инверсный тёмный) | `Text&Icon/Inverted W-B` (белый/чёрный — инверсия по теме) |
| **Coach Mark** | `Accent/Link` (бренд-синий, Blue/500 Light / Blue/400 Dark) | `Text&Icon/White applied` (белый) |

- **Tooltip** — инверсный пузырь, как классическая подсказка; инверсия работает в обеих темах (Light: тёмный фон/белый текст, Dark: светлый фон/тёмный текст).
- **Coach Mark** — насыщенный синий, attention-grabbing для онбординга. Хвостик всегда в цвет заливки.
- **Кнопки** (только Coach Mark): «Далее» = Button `Type=Primary`, «Пропустить» = Button `Type=Ghost`.

> **⚠️ a11y — контраст синего в Dark.** Белый текст на `Accent/Link` в Light (Blue/500) даёт контраст ≈ 3.7:1 (проходит для крупного/UI, не для мелкого body по AA); в Dark (Blue/400) — хуже. Компромисс принят дизайном (2026-07-08). Кандидат на более тёмный синий фон в Dark — см. §Бэклог.

---

## Поведение

- Пузырь позиционируется относительно якоря; `Placement` = сторона хвостика (противоположна пузырю). `Tail align` наводит хвостик на якорь без сдвига пузыря.
- **Tooltip** — по тапу/лонг-тапу или фокусу; авто-скрытие по тайм-ауту / тапу вне.
- **Coach Mark** — шаги онбординга; «Далее» листает, «Пропустить» закрывает тур; счётчик отражает прогресс. **Затемнения (scrim) нет** — подсветку якоря ставит продукт (2026-07-08).
- Пузырь сжимается под контент; длинный текст переносится на `maxWidth 280`.

---

## Доступность (a11y)

- **Роль:** Tooltip — `role="tooltip"` + `aria-describedby` на триггере. Coach Mark — модальная выноска: фокус внутри, `aria-label` на шаге, кнопки — обычные `button`.
- **Клавиатура:** Tooltip показывается по focus триггера, прячется по Esc/blur. Coach Mark — Tab по кнопкам, Esc = «Пропустить».
- **Контраст:** Tooltip (инверс) проходит в обеих темах. Coach Mark — см. предупреждение выше по синему.
- **Хвостик** декоративен (`aria-hidden`).

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fill / text) | **100%** |
| 🔲 Tokens (radius / spacing) | **100%** |
| **Overall** | **100%** |

Правила аудита: исключены hug-ширина (рантайм), `maxWidth 280` (ограничение контента) и геометрия хвостика-указателя (16×8). Все стилевые свойства пузыря (радиус, padding, gap, заливка, текст) привязаны к переменным.

---

## Синхронизация с кодом

```tsx
<Tooltip
  type="tooltip"           // "tooltip" | "coachMark"
  placement="top"          // "top" | "bottom" | "left" | "right"
  tailAlign="center"       // "start" | "center" | "end"
  title="Фильтр по цене"   // Coach Mark
  body="Двигайте ползунки, чтобы задать диапазон цены."
  step={{ current: 1, total: 3 }}   // счётчик
  actions={[{label:'Пропустить'}, {label:'Далее', primary:true}]}
/>
```

CSS-переменные (из существующих токенов):
```css
--tooltip-radius:  var(--radius-surface-surface); /* 12 */
--tooltip-pad:     var(--spacing-4);              /* 16 */
--tooltip-gap:     var(--spacing-3);              /* 12 */
--tooltip-maxw:    280px;
/* tooltip:   bg + tail = Background/Inverted Primary; text = Text&Icon/Inverted W-B */
/* coachMark: bg + tail = Accent/Link;                text = Text&Icon/White applied */
```

---

## Дальнейшее (бэклог)

- **On-color кнопка** — для Coach Mark кнопка «Далее» на цветном фоне по-хорошему требует on-color/inverse варианта Button (белая заливка + тёмный текст). В компоненте Button такого Type нет (Primary/Secondary/Ghost/Outline/Negative/Soft Negative/Ghost Negative) — **зависимость от Button-компонента**, не от Tooltip. Пока — Primary (чёрная, читается на синем).
- **Dark-тема синего** — белый на `Accent/Link` (Blue/400) в Dark слабоват; кандидат на более тёмный синий фон Coach Mark в Dark.
- **Дефолты булевых** — общие для обоих Type (сейчас `on`, корректно превьюит Coach Mark; Tooltip отключает). Per-variant defaults в Figma невозможны.
- **Анимация** — появление/скрытие (fade + scale от якоря), morph при листании Coach Mark — на стороне кода.

---

## Депрекация

Заменяет два старых компонента (2026-07-08):

- **`⛔ Tooltip (deprecated)`** (`10737:1042`) — фикс-ширина, текст вылезал за пузырь, хвостик приклеен к центру рамки (не под контент).
- **`⛔ Coach Mark (deprecated)`** (`10797:10`) + **`⛔ Coach Mark / Caret (deprecated)`** (`10796:18`) — полый хвостик (stroke вместо заливки), не выровнен, без hug.

Переименованы в `⛔ … (deprecated)` (не удалены) на период миграции. Удалить после перевода продуктовых макетов на унифицированный `Tooltip`.

---

## Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — spacing/radius шкалы
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра, инверсные и синие роли
- [elevation-spec.md](./elevation-spec.md) — тень пузыря
- [button-spec.md](./button-spec.md) — кнопки Coach Mark (+ бэклог on-color)
- [pb-1580-discovery.md](./pb-1580-discovery.md) — контекст PB-1580
- [popover-spec.md](./popover-spec.md) / [context-menu-spec.md](./context-menu-spec.md) — соседние оверлеи

---

## История

**2026-07-08 — Tooltip и Coach Mark объединены в один компонент (PB-1580).**

Набор `Tooltip` (`10897:486`): Type (Tooltip/Coach Mark) × Placement (Top/Bottom/Left/Right) × Tail align (Start/Center/End) = 24 варианта. Контент — единый building-block `.=Tooltip Bubble` (`10896:179`, Type-set) с булевыми Title/Counter/Actions.

Ключевые решения дизайна:
- **Объединение** Tooltip + Coach Mark (общая геометрия пузырь+хвостик).
- **hug под контент + выравнивание хвостика** (`counterAxisAlignItems`) — чинит главный баг старых версий (текст вылезал, хвостик не под контентом).
- **Цвет:** Tooltip = `Background/Inverted Primary` (чёрный), Coach Mark = `Accent/Link` (синий); текст белый.
- **Без scrim** — подсветку якоря ставит продукт.
- Хвостик залит в цвет заливки, обводка снята.
- Токен-аудит: радиус → `radius/surface/surface`, padding → `spacing/4`, gap → `spacing/3` (были сырые).

Старые `Tooltip` / `Coach Mark` / `Coach Mark / Caret` помечены `⛔ … (deprecated)`.

Tooltip / Coach Mark → ✅ готов к разработке (структура + цвет; on-color кнопка и dark-синий — в бэклоге).
