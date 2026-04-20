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
| **Elevation** | No, Yes |

Итого **6 вариантов** = 3 × 2.

Boolean-свойства (с дефолтными значениями):

| Свойство | Default | Почему |
|---|---|---|
| **Leading** | on | Кнопка назад/меню — основа навигационного паттерна |
| **Subtitle** | **off** | Вторая строка — по запросу (Content=Title, Avatar) |
| **Trailing 1** | on | Одно правое действие есть почти всегда |
| **Trailing 2** | **off** | Второе действие — по запросу |
| **Trailing 3** | **off** | Третье действие — редкий кейс |

---

## Структура слоёв

```
Top App Bar v2 (COMPONENT) — HORIZONTAL, height = 56, padding = 4, gap = 4
├── Leading (INSTANCE of ButtonIcon Ghost 40 × 40, Form = Square, optional)
│     default icon: ic_arrow_back_long
├── Content (FILL) — зависит от variant Content:
│   ├── Title   → VERTICAL: Headline (H3 Medium 20/28) + Subtitle (caption-md 12/16)
│   ├── Search  → HORIZONTAL: INSTANCE Search v2 (Type=Filled, Size=sm, State=Default)
│   └── Avatar  → HORIZONTAL: Avatar v2 Photo L (40) + VERTICAL stack (Headline + Subtitle), gap = 8
│     Content.paddingLeft = 12  (4 root + 12 = 16 от края при Leading off)
└── Trailing (HORIZONTAL, HUG, gap = 0)
    ├── Trailing 1 (INSTANCE .=Trailing Slot, optional)
    ├── Trailing 2 (INSTANCE .=Trailing Slot, optional)
    └── Trailing 3 (INSTANCE .=Trailing Slot, optional)
```

**Важное проектное решение:** Leading 40 × 40, Trailing 48 × 48 — асимметрия по размерам сознательная: лидирующая кнопка визуально компактнее (40), правые действия — шире (48) для удобного попадания в частые действия.

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
| Padding (все стороны) | 4 | `spacing/1` |
| Gap между слотами | 4 | `spacing/1` |
| Content paddingLeft (Title / Search / Avatar) | 12 | `spacing/3` |
| Content gap (Avatar: avatar ↔ text) | 8 | `spacing/2` |
| Leading button | 40 × 40 | `size/lg` (внутри ButtonIcon) |
| Trailing button | 48 × 48 | `size/xl` (внутри ButtonIcon) |
| Avatar (Content=Avatar) | 40 × 40 | `size/lg` |

Отступ заголовка от левого края при скрытом Leading: 4 (root) + 12 (content) = **16 px** — согласовано с Material Design edge padding.

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
| **Padding (all sides)** | `spacing/1` (4) |
| **Gap (slots)** | `spacing/1` (4) |
| **Content paddingLeft** | `spacing/3` (12) |
| **Avatar gap** | `spacing/2` (8) |
| **Leading size** | `size/lg` (40) |
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

- **Tap-зоны:** Leading 40 × 40, Trailing 48 × 48 — оба слота соответствуют WCAG/HIG (≥ 44 pt) при учёте внешнего padding-бокса; Trailing 48 проходит напрямую.
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
