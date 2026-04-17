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
| **State** | Default, Focused, Filled, Error, Disabled, ReadOnly |

Итого **36 вариантов** = 2 × 3 × 6.

Boolean-свойства: **Label** (on), **Helper** (on), **Left Icon** (on), **Right Icon** (on), **Suffix** (off).

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

## Границы (Outline)

| Состояние | Токен | Core | Значение |
|---|---|---|---|
| Default, Filled, Disabled, ReadOnly | `border/default` | — | 1 px |
| Focused, Error | `border/emphasis` | — | 2 px |

Для Type=Filled обводка отсутствует.

---

## Цвета по состояниям

По **docs/COLOR-PALETTE.md**. Все значения привязаны к семантическим токенам.

| State | Filled BG | Outline Stroke | Input Text | Label | Supporting | Icon |
|---|---|---|---|---|---|---|
| **Default** | `Background/Secondary` | `Border/Default` | `Text/Secondary` (placeholder) | `Text/Secondary` | `Text/Tertiary` | `Icon/Secondary` |
| **Focused** | `Background/Secondary` | `Border/Active` | `Text/Primary` | `Accent/Graphite` | `Text/Tertiary` | `Icon/Primary` |
| **Filled** | `Background/Secondary` | `Border/Default` | `Text/Primary` | `Text/Secondary` | `Text/Tertiary` | `Icon/Secondary` |
| **Error** | `Background/Secondary` | `Accent/Negative` | `Text/Primary` | `Accent/Negative` | `Accent/Negative` | `Accent/Negative` |
| **Disabled** | `Background/Tertiary` | `Border/Disabled` | `Text/Tertiary` | `Text/Tertiary` | `Text/Tertiary` | `Icon/Tertiary` |
| **ReadOnly** | `Background/Tertiary` | `Border/Default` | `Text/Primary` | `Text/Secondary` | `Text/Tertiary` | `Icon/Secondary` |

**Примечание:** placeholder в Default использует `Text/Secondary` (не `Tertiary`) — чтобы визуально отличать от Disabled, где текст — `Text/Tertiary`.

---

## Input v2 Stacked — лейбл внутри поля

Вариант с внутренним лейблом сверху и значением снизу, внутри одного поля фиксированной высоты.

### Варианты

| Свойство | Значения |
|---|---|
| **Type** | Filled, Outline |
| **State** | Default, Focused, Filled, Error, Disabled, ReadOnly |

Итого **12 вариантов**. Size — только **lg (56)**.

Boolean-свойства: **Helper** (off), **Left Icon** (on), **Right Icon** (on), **Suffix** (off).

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
- **Контраст:** placeholder `Text/Secondary` на `Background/Secondary` — проверить WCAG AA на реальных устройствах.

---

## Синхронизация с кодом

**Web (React):**
```tsx
<Input
  type="filled"            // "filled" | "outline"
  size="lg"                // "lg" | "md" | "sm"
  state="default"          // "default" | "focused" | "filled" | "error" | "disabled" | "readonly"
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
