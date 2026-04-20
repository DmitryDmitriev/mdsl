# Top App Bar v2 — спецификация для разработки

**Один компонент — одна спека.** Компонент «Top App Bar v2» — верхняя панель приложения с левым слотом (back/menu), центральным контентом (заголовок, поиск или аватар) и до трёх правых действий.

Привязка к **docs/DESIGN-TOKENS.md**. Все цвета, размеры и радиусы — только через **существующие** токены системы. Компонентно-специфичные токены не используются.

Figma: страница **🟢 Topapp Bar**, набор **Top App Bar v2** (COMPONENT_SET).

Старый Top App Bar помечен как deprecated 2026-04-20 (переименован в **⚠️ DEPRECATED / Top app bar**).

---

## Обзор

Top App Bar v2 — единая панель шапки приложения высотой 56 px. Содержит опциональный лидирующий слот, центральный контент (один из трёх режимов) и до трёх правых действий. Поддерживает поднятие (shadow) над скроллируемым содержимым.

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Content** | Title, Search, Avatar |
| **Leading** | Yes, No |
| **Trailing** | Icons, None |
| **Elevation** | No, Yes |

Итого **24 варианта** = 3 × 2 × 2 × 2.

Leading и Trailing — variant axes (а не Boolean), потому что при их отсутствии нужен другой `root.padding` для соответствия Material Design edge padding 16 px:

| Leading | paddingLeft | Trailing | paddingRight |
|---|---|---|---|
| Yes | 4 (иконка в 16 от края) | Icons | 4 (иконка в 16 от края) |
| No | 16 (контент в 16 от края) | None | 16 (контент в 16 от края) |

Boolean-свойства (с дефолтными значениями):

| Свойство | Default | Почему |
|---|---|---|
| **Subtitle** | **off** | Вторая строка — по запросу (Content=Title, Avatar) |
| **Trailing 1** | on | Одно правое действие есть почти всегда (при Trailing=Icons) |
| **Trailing 2** | **off** | Второе действие — по запросу |
| **Trailing 3** | **off** | Третье действие — редкий кейс |

Boolean Trailing 1/2/3 действуют **только при Trailing=Icons**.

---

## Структура слоёв

```
Top App Bar v2 (COMPONENT) — HORIZONTAL, height = 56, gap = 4

Leading=Yes / Trailing=Icons: root.padding = 4 (иконка видима в 16 от края)
Leading=No  / Trailing=None:  root.padding = 16 (контент в 16 от края)
Padding left и padding right независимы — меняются по соответствующему variant.

├── Leading (INSTANCE of ButtonIcon Ghost 48 × 48, только в Leading=Yes)
│     default icon: ic_arrow_back_long. 48 px tap-zone.
├── Content (FILL, paddingLeft = 0) — зависит от variant Content:
│   ├── Title   → VERTICAL: Headline (H3 Medium 20/28) + Subtitle (caption-md 12/16)
│   ├── Search  → HORIZONTAL: INSTANCE Search v2 (Type=Filled, Size=sm, State=Default)
│   └── Avatar  → HORIZONTAL: Avatar v2 Photo L (40) + VERTICAL stack, gap = 8

В Leading=Yes gap от правой грани иконки до контента = 16 px (12 внутренний padding
Leading + 4 root.itemSpacing). Соответствует Material "16dp after navigation icon".
├── Trailing 1 (INSTANCE .=Trailing Slot, только при Trailing=Icons, boolean)
├── Trailing 2 (INSTANCE .=Trailing Slot, только при Trailing=Icons, boolean)
└── Trailing 3 (INSTANCE .=Trailing Slot, только при Trailing=Icons, boolean)
```

**Проектное решение 1:** Leading и Trailing оба 48 × 48 — симметричные tap-зоны по Material Design. Внутри каждой — иконка 24 × 24 с padding 12.

**Проектное решение 2:** Trailing 1/2/3 — sibling-slots в корне (не во вложенном `Trailing` frame). Когда все трое скрыты, они корректно коллапсируют, и Content (Search/Title) занимает всё свободное пространство. Вложенный `Trailing` frame использовать нельзя — HUG-фреймы в Figma не коллапсируют при hidden children.

### .=Trailing Slot — вспомогательный компонент

Отдельный COMPONENT_SET **.=Trailing Slot** с двумя вариантами:

| Type | Содержимое | Размер |
|---|---|---|
| **Icon** | ButtonIcon Ghost, Form = Square | 48 × 48 |
| **Text** | Button Ghost 48, текст «Action» | HUG width, 48 h |

Переключение — через variant property или Swap Instance (например, на «Save», «Done»).

---

## Размеры

| Элемент | Значение | Токен |
|---|---|---|
| Bar height | 56 | `control-height/lg` |
| Bar width | FILL | — |
| Padding top / bottom | 4 | `spacing/1` |
| Padding left (Leading=Yes) | 4 | `spacing/1` |
| Padding left (Leading=No) | 16 | `spacing/4` |
| Padding right (Trailing=Icons) | 4 | `spacing/1` |
| Padding right (Trailing=None) | 16 | `spacing/4` |
| Gap между слотами | 4 | `spacing/1` |
| Content paddingLeft | 0 | `spacing/0` |
| Content gap (Avatar: avatar ↔ text) | 8 | `spacing/2` |
| Leading button | 48 × 48 | `size/xl` (внутри ButtonIcon) |
| Trailing button | 48 × 48 | `size/xl` (внутри ButtonIcon) |
| Avatar (Content=Avatar) | 40 × 40 | `size/lg` |

В обоих случаях (Leading=Yes и Leading=No) контент визуально отступает на **16 px** от края / иконки — Material Design edge & icon padding.

---

## Радиусы

Собственных радиусов у Top App Bar нет — контейнер прямоугольный. Радиусы наследуются внутренними инстансами (ButtonIcon, Search v2, Avatar v2).

---

## Границы

Контейнер без обводки. Для визуального разделения со скроллируемым содержимым используется `Elevation = Yes`.

---

## Цвета по состояниям

По **docs/COLOR-PALETTE.md**. Все значения привязаны к семантическим токенам.

| Элемент | Токен |
|---|---|
| Bar background | `Background/Primary` |
| Headline | `Text/Primary` |
| Subtitle | `Text/Secondary` |
| Shadow (Elevation = Yes) | drop shadow `rgba(0,0,0,0.08)`, offset y = 2, radius = 8, spread = 0 |

Цвета Leading / Trailing кнопок наследуются от ButtonIcon Ghost. Цвета Search — от Search v2.

### Типографика

| Элемент | Стиль |
|---|---|
| Headline (Title, Avatar) | `Heading/H3 Medium` (20/28) |
| Subtitle | `Caption/caption-md` (12/16) |

---

## Сводная таблица токенов

| Параметр | Top App Bar v2 |
|---|---|
| **Height** | `control-height/lg` (56) |
| **Padding top / bottom** | `spacing/1` (4) |
| **Padding left (Leading=Yes)** | `spacing/1` (4) |
| **Padding left (Leading=No)** | `spacing/4` (16) |
| **Padding right (Trailing=Icons)** | `spacing/1` (4) |
| **Padding right (Trailing=None)** | `spacing/4` (16) |
| **Gap (slots)** | `spacing/1` (4) |
| **Content paddingLeft** | `spacing/0` (0) |
| **Avatar gap (avatar ↔ text)** | `spacing/2` (8) |
| **Leading size** | `size/xl` (48) |
| **Trailing size** | `size/xl` (48) |
| **Background** | `Background/Primary` |
| **Headline color** | `Text/Primary` |
| **Subtitle color** | `Text/Secondary` |

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fills / strokes) | **100%** |
| 🔤 Typography | **100%** |
| 🔲 Tokens (общее) | **100%** |
| **Overall** | **100%** |

Правила аудита: исключены HUG/FILL размеры, инстансы иконок и вложенных компонентов (ButtonIcon, Search v2, Avatar v2), корневые COMPONENT_SET-обёртки.

---

## Доступность (a11y)

- **Tap-зоны:** Leading и Trailing — 48 × 48. Оба слота проходят WCAG / HIG (≥ 44 pt) с запасом.
- **Клавиатура:** Tab — навигация Leading → Trailing 1 → Trailing 2 → Trailing 3; Esc — назад.
- **Screen reader:** `aria-label` для каждой кнопки; Headline — роль `heading` (h1 или контекстный уровень) для корректной структуры страницы.
- **Контраст:** Headline `Text/Primary` и Subtitle `Text/Secondary` на `Background/Primary` — проверить WCAG AA на реальных устройствах.

---

## Синхронизация с кодом

**Web (React):**
```tsx
<TopAppBar
  content="title"          // "title" | "search" | "avatar"
  elevation={false}
  leadingIcon={<Icon name="arrow_back" onClick={back} />}
  title="Settings"
  subtitle="Optional"
  trailing1={<IconButton icon="chat" />}
  trailing2={<IconButton icon="share" />}
  trailing3={<IconButton icon="favorite" />}
/>

// Avatar variant
<TopAppBar
  content="avatar"
  avatar={<Avatar src="..." />}
  title="Zubaydullo"
  subtitle="Installation and repairs"
  trailing1={<IconButton icon="kebab" />}
/>

// Search variant
<TopAppBar
  content="search"
  leadingIcon={<Icon name="arrow_back" onClick={back} />}
  searchValue={query}
  onSearchChange={setQuery}
  trailing1={<IconButton icon="map" />}
/>

// Текстовое действие справа (миграция с small + text btn)
<TopAppBar
  content="title"
  title="Edit"
  trailing1={<Button variant="ghost" size="48">Save</Button>}
/>
```

**Карта миграции** (старый Top App Bar → Top App Bar v2):

| Старый вариант | Новый вариант |
|---|---|
| `small` | `Content = Title`, `Leading = true` |
| `Title` | `Content = Title`, `Leading = false` |
| `search + back` | `Content = Search`, `Leading = true` |
| `search + btn` | `Content = Search`, Leading через Swap Instance → button |
| `search` | `Content = Search`, `Leading = false` |
| `small + text btn` | `Content = Title`, `Trailing 1` Type = Text |

---

## Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
- [button-spec.md](./button-spec.md) — ButtonIcon используется в Leading / Trailing
- [search-spec.md](./search-spec.md) — Search v2 используется в Content = Search
- [input-v2-spec.md](./input-v2-spec.md) — согласованный архитектурный паттерн спецификации
