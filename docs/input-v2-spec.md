# Input v2 — спецификация для разработки

**Один компонент — одна спека.** Компонент «Input v2» — поле ввода с внешним лейблом. В состав входят также смежные компоненты **Input v2 Stacked** (лейбл внутри поля) и **Input Leading** (лидирующий слот).

Привязка к **docs/DESIGN-TOKENS.md**. Все цвета, размеры и радиусы — только через **существующие** токены системы. Компонентно-специфичные токены не используются.

Figma: страница **🟢 Input v2**, наборы **Input v2**, **Input v2 Stacked**, **Input Leading** (COMPONENT_SET).

---

## Обзор

Input v2 — поле ввода с внешним лейблом сверху и опциональным supporting-текстом снизу. Внутри поля поддерживаются левая/правая иконки и суффикс.

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Type** | Filled, Outline |
| **Size** | lg (56), md (48), sm (40) |
| **State** | Default, Focused, Editing, Filled, Error, Disabled, ReadOnly |

Итого **42 варианта** = 2 × 3 × 7.

**Focused / Editing — два состояния активного ввода** (добавлено 2026-07-01):
- **Focused** («начало ввода») — поле в фокусе, **пустое**: серый плейсхолдер (`Text&Icon/Secondary`) + **каретка перед плейсхолдером**.
- **Editing** («исправление введённых данных») — поле в фокусе, **со значением**: значение `Text&Icon/Primary` + **каретка после текста**.

Оба состояния несут focus-обводку (см. §Границы). Различие — наличие значения и позиция каретки.

Boolean-свойства (с дефолтными значениями):

| Свойство | Default | Почему |
|---|---|---|
| **Label** | on | Лейбл над полем — основа паттерна внешнего лейбла |
| **Helper** | on | Supporting-текст чаще нужен (подсказка или валидация) |
| **Left Icon** | **off** | Иконка — исключение, а не правило (search, email — явно включаются) |
| **Right Icon** | **off** | Действия (×, 👁, ›) включаются только когда нужно |
| **Suffix** | off | Используется редко — для единиц измерения и валюты |

---

## Структура слоёв

```
Input v2 (COMPONENT) — VERTICAL, HUG, gap = spacing/1 (4)
├── Label (TEXT, optional) — Base/Body 2 Medium (14/20)
├── Field (HORIZONTAL, FIXED height, center align)
│   ├── Left Icon  (24×24, optional)
│   ├── Content    (FILL) → Input Text
│   ├── Suffix     (TEXT, optional)
│   └── Right Icon (24×24, optional)
└── Supporting Text (TEXT, optional) — Caption/caption-md (12/16)
```

**Важное проектное решение:** вертикальный padding внутри Field **не токенизирован** — высота фиксирована, содержимое выровнено по центру.

---

## Размеры

| Size | Height | Token | Padding H | Token | Gap | Token | Input font |
|---|---|---|---|---|---|---|---|
| **lg** | 56 | `control-height/lg` | 16 | `spacing/4` | 8 | `spacing/2` | Base/Body 1 (16/24) |
| **md** | 48 | `control-height/md` | 12 | `spacing/3` | 8 | `spacing/2` | Base/Body 2 (14/20) |
| **sm** | 40 | `control-height/sm` | 12 | `spacing/3` | 4 | `spacing/1` | Base/Body 2 (14/20) |

Иконки внутри поля — **24 × 24** (`size/sm`).

---

## Радиусы

Для всех размеров используется единый радиус, согласованный с Button lg/md/sm.

| Элемент | Токен | Core | Значение |
|---|---|---|---|
| Field | `radius/control-lg` | `radius/lg` | 12 |

---

## Границы

| Состояние | Outline: толщина | Filled: обводка |
|---|---|---|
| Default, Filled, Disabled, ReadOnly | `border/default` (1 px) | нет |
| Focused, Editing, Error | `border/emphasis` (2 px) | **есть** (2 px) |

**Filled — обводка в активных/ошибочных состояниях (изменено 2026-07-01).** Раньше у Type=Filled обводки не было ни в одном состоянии — из-за этого Filled Focused визуально не отличался от Filled Default (одинаковый фон `Background/Secondary`, разница только в цвете текста). Теперь Filled получает **2px обводку** в `Focused`, `Editing` и `Error` — так же, как Outline. В остальных состояниях (Default / Filled / Disabled / ReadOnly) Filled остаётся без обводки.

Цвет обводки (для обоих Type) — см. таблицу цветов ниже: Focused/Editing → `Border/Active`, Error → `Accent/Negative`.

---

## Цвета по состояниям

По **docs/COLOR-PALETTE.md**. Все значения привязаны к семантическим токенам.

| State | Filled BG | Обводка (Outline + Filled active) | Input Text | Label | Supporting | Icon | Каретка |
|---|---|---|---|---|---|---|---|
| **Default** | `Background/Secondary` | Outline: `Border/Default` · Filled: нет | `Text&Icon/Secondary` (placeholder) | `Text&Icon/Secondary` | `Text&Icon/Tertiary` | `Text&Icon/Secondary` | — |
| **Focused** | `Background/Secondary` | `Border/Active` (2px, оба Type) | `Text&Icon/Secondary` (placeholder) | `Accent/Primary` | `Text&Icon/Tertiary` | `Text&Icon/Primary` | `Text&Icon/Primary`, **перед плейсхолдером** |
| **Editing** | `Background/Secondary` | `Border/Active` (2px, оба Type) | `Text&Icon/Primary` (значение) | `Accent/Primary` | `Text&Icon/Tertiary` | `Text&Icon/Primary` | `Text&Icon/Primary`, **после значения** |
| **Filled** | `Background/Secondary` | Outline: `Border/Default` · Filled: нет | `Text&Icon/Primary` | `Text&Icon/Secondary` | `Text&Icon/Tertiary` | `Text&Icon/Secondary` | — |
| **Error** | `Background/Secondary` | `Accent/Negative` (2px, оба Type) | `Text&Icon/Primary` | `Accent/Negative` | `Accent/Negative` | `Accent/Negative` | — |
| **Disabled** | `Background/Tertiary` | Outline: `Border/Disabled` · Filled: нет | `Text&Icon/Tertiary` | `Text&Icon/Tertiary` | `Text&Icon/Tertiary` | `Text&Icon/Tertiary` | — |
| **ReadOnly** | `Background/Tertiary` | Outline: `Border/Default` · Filled: нет | `Text&Icon/Primary` | `Text&Icon/Secondary` | `Text&Icon/Tertiary` | `Text&Icon/Secondary` | — |

**Примечания:**
- placeholder в Default/Focused использует `Text&Icon/Secondary` (не `Tertiary`) — чтобы визуально отличать от Disabled, где текст — `Text&Icon/Tertiary`.
- `Focused` показывает **пустое** поле (placeholder + каретка перед ним) — это «начало ввода». Поле в фокусе **со значением** — это отдельное состояние `Editing` (каретка после значения).

### Каретка (курсор)

Элемент `Caret` — вертикальная полоса, обозначающая позицию ввода.

| Параметр | Значение |
|---|---|
| Цвет (fill) | `Text&Icon/Primary` |
| Ширина | 2 px |
| Высота | ~ line-height шрифта поля (lg ≈ 20, md/sm ≈ 18) — привязана к типографике, не к spacing-шкале |
| Скругление | 1 px (пилюля) |
| Позиция | `Focused` — перед плейсхолдером (первый элемент строки); `Editing` — после значения (последний элемент) |

Каретка живёт внутри горизонтальной строки `Content` (Input v2) либо строки `Value` внутри вертикального `Content` (Stacked): `[Caret, Input Text]` для Focused, `[Input Text, Caret]` для Editing.

---

## Input v2 Stacked — лейбл внутри поля

Вариант с внутренним лейблом сверху и значением снизу, внутри одного поля фиксированной высоты.

### Варианты

| Свойство | Значения |
|---|---|
| **Type** | Filled, Outline |
| **State** | Default, Focused, Editing, Filled, Error, Disabled, ReadOnly |

Итого **14 вариантов**. Size — только **lg (56)**.

Границы, каретка и состояния Focused/Editing — идентичны Input v2 (см. выше). В Stacked каретка живёт в горизонтальной строке `Value` внутри вертикального `Content` (`[Label]` сверху, `[Caret, Input Text]` / `[Input Text, Caret]` снизу).

Boolean-свойства (с дефолтными значениями):

| Свойство | Default | Почему |
|---|---|---|
| **Helper** | off | Stacked-поле чаще всего компактное, helper — по запросу |
| **Left Icon** | **on** | Паттерн Stacked предполагает визуальный якорь (иконка/лого/аватар) |
| **Right Icon** | **on** *(было `off` до 2026-06-01)* | Действие справа (×, ›, share). Default flipped в `true` 2026-06-01 при привязке к 12 `24/ic_close` инстансам внутри Field — раньше property была декларирована, но не bind'илась (Figma помечал unused). После привязки сохранил визуал by-default. Property key неизменный: `Right Icon#6346:26`. |
| **Suffix** | off | Редко используется — для единиц измерения |

Label внутри поля — всегда виден, не имеет Boolean-свойства (часть структуры).

### Структура

```
Input v2 Stacked (COMPONENT) — VERTICAL, HUG
├── Field (HORIZONTAL, height = 56, padding = 0 12 0 12, gap = 4)
│   ├── Leading (INSTANCE of Input Leading)
│   ├── Content (VERTICAL, FILL, center vertically, padLeft = 4)
│   │   ├── Label      (TEXT) — Caption/caption-md Medium (12/16)
│   │   └── Input Text (TEXT) — Base/Body 1 (16/24)
│   ├── Suffix     (TEXT, optional)
│   └── Right Icon (24 × 24, optional)
└── Supporting Text (TEXT, optional, off by default)
```

### Размеры

| Параметр | Значение | Токен |
|---|---|---|
| Height | 56 | `control-height/lg` |
| Padding H | 12 | `spacing/3` |
| Gap | 4 | `spacing/1` |
| Radius | 12 | `radius/control-lg` |

Цвета и границы — идентичны Input v2 (см. таблицу выше).

---

## Input Leading — сопутствующий компонент

Отдельный набор **Input Leading** (COMPONENT_SET), используется как вложенный инстанс в Input v2 Stacked. Позволяет через variant или swap подставить иконку / логотип / аватар.

| Type | Size | Token | Default content |
|---|---|---|---|
| **Icon 24** | 24 × 24 | `size/sm` | `ic_call` (из библиотеки иконок) |
| **Icon 32** | 32 × 32 | `size/md` | `ic_BMW` (логотип-иконка) |
| **Avatar 40** | 40 × 40 | `size/lg` | Avatar v2, буквенный |

Замена содержимого — через variant `Type` или Swap Instance на любую иконку/аватар из библиотеки.

---

## Сводная таблица токенов

| Параметр | Input v2 lg | Input v2 md | Input v2 sm | Stacked |
|---|---|---|---|---|
| **Height** | `control-height/lg` (56) | `control-height/md` (48) | `control-height/sm` (40) | `control-height/lg` (56) |
| **Padding H** | `spacing/4` (16) | `spacing/3` (12) | `spacing/3` (12) | `spacing/3` (12) |
| **Gap** | `spacing/2` (8) | `spacing/2` (8) | `spacing/1` (4) | `spacing/1` (4) |
| **Radius** | `radius/control-lg` (12) | `radius/control-lg` (12) | `radius/control-lg` (12) | `radius/control-lg` (12) |
| **Root gap** | `spacing/1` (4) | `spacing/1` (4) | `spacing/1` (4) | `spacing/1` (4) |
| **Border default / emphasis** | `border/default` / `border/emphasis` | — | — | — |
| **Icon size** | `size/sm` (24) | `size/sm` (24) | `size/sm` (24) | `size/sm` (24) |

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fills / strokes) | **100%** |
| 🔤 Typography | **100%** |
| 🔲 Tokens (общее) | **100%** |
| **Overall** | **100%** |

Правила аудита: исключены HUG/FILL размеры, инстансы иконок из библиотеки, вычисляемые вертикальные padding при фиксированной высоте с center align, корневые COMPONENT_SET-обёртки.

---

## Доступность (a11y)

- **Tap-зоны:** lg — 56, md — 48, sm — 40. lg/md соответствуют WCAG/HIG (≥ 44 pt); **sm = 40** — ниже рекомендованных 44 pt, использовать в плотных layout либо оборачивать в контейнер 44 pt.
- **Клавиатура:** Tab — навигация, Enter — submit, Esc — сброс фокуса/очистка.
- **Screen reader:** `aria-label` из Label, `aria-describedby` для Supporting, `aria-invalid` для State=Error.
- **Контраст:** placeholder `Text&Icon/Secondary` на `Background/Secondary` — проверить WCAG AA на реальных устройствах.

---

## Синхронизация с кодом

**Web (React):**
```tsx
<Input
  type="filled"            // "filled" | "outline"
  size="lg"                // "lg" | "md" | "sm"
  state="default"          // "default" | "focused" | "editing" | "filled" | "error" | "disabled" | "readonly"
  label="Email"
  placeholder="your@email.com"
  supporting="We'll never share your email"
  leftIcon={<Icon name="email" />}
  rightIcon={<Icon name="close" onClick={clear} />}
/>

<StackedInput
  type="filled"
  label="Body type"
  value="SUV"
  leading={<Icon name="call" size={24} />}
  // или leading={<Logo brand="BMW" size={32} />}
  // или leading={<Avatar initials="AB" size={40} />}
  rightIcon={<Icon name="close" onClick={clear} />}
/>
```

CSS-переменные (из существующих токенов):
```css
--input-height-lg:       var(--control-height-lg);   /* 56 */
--input-height-md:       var(--control-height-md);   /* 48 */
--input-height-sm:       var(--control-height-sm);   /* 40 */
--input-radius:          var(--radius-control-lg);   /* 12 */
--input-padding-h-lg:    var(--spacing-4);           /* 16 */
--input-padding-h-md:    var(--spacing-3);           /* 12 */
--input-padding-h-sm:    var(--spacing-3);           /* 12 */
--input-gap-lg:          var(--spacing-2);           /* 8  */
--input-gap-md:          var(--spacing-2);           /* 8  */
--input-gap-sm:          var(--spacing-1);           /* 4  */
--input-border-default:  var(--border-default);      /* 1  */
--input-border-emphasis: var(--border-emphasis);     /* 2  */
```

---

## Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
- [button-spec.md](./button-spec.md) — согласованная система радиусов и размеров
- [switch-spec.md](./switch-spec.md) — размерные токены

Input Leading — сопутствующий компонент, отдельной спеки не имеет.

---

## История миграций

**2026-07-01 — Filled focus/error обводка + каретка + состояние Editing (по фидбеку дизайна при ребилде).**

Триггер: при ребилде выяснилось, что **Filled в фокусе визуально не читается** — у Type=Filled не было обводки, Filled Focused = Filled Default по рамке (одинаковый `Background/Secondary`).

Изменения в Figma (наборы `Input v2` 6316:335 и `Input v2 Stacked` 6346:304):
1. **Filled Focused → 2px `Border/Active`**, **Filled Error → 2px `Accent/Negative`** (зеркало Outline-штрихов). Все размеры lg/md/sm + Stacked.
2. **Focused переосмыслен как «Начало ввода»**: значение заменено на серый плейсхолдер (`Text&Icon/Secondary`) + добавлена **каретка `Text&Icon/Primary` перед плейсхолдером**. Content переведён в HORIZONTAL (Stacked — строка `Value`).
3. **Новое состояние `Editing`** («Исправление»): фокус-обводка + значение `Text&Icon/Primary` + **каретка после текста**. +6 вариантов в Input v2 (2 Type × 3 Size), +2 в Stacked. Итого **36→42** и **12→14**.

Каретка — презентационный примитив (ширина 2, высота ~ line-height, fill `Text&Icon/Primary`, radius 1); высота не токенизируется (привязана к типографике поля). Цвет каретки согласован с дизайном: курсор = цвет вводимого текста; плейсхолдер остаётся серым.

**2026-06-01 — Input v2 Stacked: `Right Icon` property подключена.**

Symptom: Figma publish-валидация flag'ила `Input v2 Stacked` как Invalid asset с `Unused properties` для `Right Icon#6346:26`. Symptom — property декларирована (default false), но не bind'ится ни к одному узлу. Реально 12 `24/ic_close` инстансов (по одному в каждом variantе Filled/Outline × Default/Focused/Filled/Error/Disabled/ReadOnly) присутствовали в Field, но без `componentPropertyReferences`.

Fix:
- 12 `24/ic_close` инстансов получили `componentPropertyReferences.visible = "Right Icon#6346:26"`.
- Default property изменён `false → true` — иконки в master были visible, без флипа default'а binding бы их скрыл на всех фрешн-инстансах (breaking).
- Property key неизменный (`Right Icon#6346:26`).

Эффект: toggle `Right Icon` на инстансе теперь физически переключает видимость close-иконки. Existing consumer-инстансы продолжают показывать иконку (default=true).

**2026-05-12 — аудит готовности (component-spec-check), 100% соответствие, 0 правок.**

Самый чистый компонент за сессию аудитов. Проверено ~50 параметров (10 представительных вариантов × ~5 параметров): структура (36 Input v2 + 12 Stacked + 3 Input Leading), высоты (`control-height/lg|md|sm`), padding-H (`spacing/4` для lg, `spacing/3` для md/sm/Stacked), gap внутри Field, root gap, radius (`radius/control/control-lg`), border (`border/default` / `border/emphasis`), fills (`Background/Secondary` Filled, transparent Outline + token strokes), text styles (Body 1 / Body 2 / Body 2 Medium / Caption md / Caption md Medium), иконки (`size/sm` 24×24), Input Leading sizes (`size/sm/md/lg` 24/32/40). Состояния (Default / Focused / Filled / Error / Disabled / ReadOnly) корректно используют canonical цветовую модель.

**Hardcoded значений:** 0. **Missing states:** 0. **M3-leftover'ов:** 0.

**Foundation-observation (не блокирующее):** `Accent/Primary` в Focused-Label резолвится в Zinc/950 (#09090B Light, Zinc/200 Dark), а не в «брендовый красный». Это **established canonical** Larixon DS — Accent это основной CTA-цвет (тёмный), бренд-цвета живут в `Brand Color/*` и применяются только в брендовых элементах (логотипы, splash, иллюстрации). См. `COLOR-PALETTE.md §3.5` «Брендовые цвета» и §3.7 «Семантика, не визуал». Использование `Accent/Primary` в Input v2 корректно — это «акцент системного компонента», не Brand.

Input v2 → ✅ готов к разработке.
