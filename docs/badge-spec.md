# Спецификация компонента Badge

Бейдж — компактный индикатор статуса или категории. Использует только семантические токены дизайн-системы.

Размеры **2xs / xs / sm / md / lg**, формы **Pill / Rounded**. Семантика вариантов: **good**, **info**, **warning**, **negative** (см. §1). Типографика: **2xs / xs** — caption-sm (10/12); **sm** — caption-md (12/16); **md / lg** — Body 2 Medium (14/20). Иконки: **2xs / xs** — 12 px; **sm** — 16 px; **md / lg** — 24 px.

Контент: **[Icon?] [Text] [Counter?]** — иконка слева, опциональный каунтер справа.

---

## 1. Семантика (варианты)

Цвета бейджа — атомарного color-coded элемента — задаются парным набором `Background/Tinted/*` (фон) + `Text&Icon/on Tinted/*` (текст и иконка), согласно `COLOR-PALETTE.md` §3.3.

| Вариант   | Фон                          | Текст / иконка                  | Использование             |
|-----------|------------------------------|----------------------------------|----------------------------|
| good      | `Background/Tinted/Good`     | `Text&Icon/on Tinted/Good`      | Успех, подтверждение       |
| info      | `Background/Tinted/Info`     | `Text&Icon/on Tinted/Info`      | Информация, подсказка      |
| warning   | `Background/Tinted/Warning`  | `Text&Icon/on Tinted/Warning`   | Внимание, предупреждение   |
| negative  | `Background/Tinted/Negative` | `Text&Icon/on Tinted/Negative`  | Ошибка, отклонено          |

**Нейтральный/default бейдж** (Beta, New, Prerelease — без семантической окраски) в Badge не предусмотрен. Если кейс появится — рассмотрим отдельно (новые токены вводить не планируем; вероятный путь — `Surface/Secondary` + `Text&Icon/Secondary`, без tinted-плашки).

**Удалённые варианты:** `question`, `answer`, `admin` исключены из Badge. Существующие токены `Background/Tinted/Question` и `Background/Tinted/Admin` остаются в палитре — они зарезервированы за **чат-бабблами**. `Answer` как отдельный shade в палитре не реализован и не нужен (для answer-бабла в чате используется существующий tinted-токен — выбор делается в чат-спеке).

---

## 2. Токены

### Цвет
- **Фон**: `Background/Tinted/{variant}`.
- **Текст и иконка**: `Text&Icon/on Tinted/{variant}` (тёмный shade — обеспечивает 6:1+ контраст на пастельной плашке).
- **Не использовать** `Accent/{variant}` (Green/600 и т.п.) для текста на tinted-фоне — контраст на грани WCAG AA, а семантика `Accent/*` принадлежит активным интерактивным элементам, не статичным бейджам.

### Отступы (spacing)
- **2xs**: padding `spacing/1` (4 px) по всем сторонам.
- **xs**: padding `spacing/1` (4 px) по всем сторонам.
- **sm**: padding `spacing/2` (8 px) по всем сторонам.
- **md**: padding vertical `spacing/3` (12 px), horizontal `spacing/2` (8 px).
- **lg**: padding vertical `spacing/4` (16 px), horizontal `spacing/3` (12 px).

> Все отступы привязаны к токенам `spacing/*` в Figma.

### Радиус (radius)
- **pill**: `radius.pill` (капсула) — по умолчанию.
- **rounded**: `radius.controlMd` (8 px) — альтернатива для коротких бейджей (Semantic: control-md → radius/2).

### Типографика
- **2xs**: typography/caption-sm — 10 px / 12 px, weight 500.
- **xs**: typography/caption-sm — 10 px / 12 px, weight 500.
- **sm**: typography/caption-md — 12 px / 16 px, weight 500 (docs/TYPOGRAPHY.md).
- **md**: Body 2 Medium — 14 px / 20 px, weight 500.
- **lg**: Body 2 Medium — 14 px / 20 px, weight 500.
- Font-weight: 500.

---

## 3. Размеры

### Почему `size/*`, а не `control-height/*`

В дизайн-системе есть две шкалы для высот:

| Шкала | Назначение | Минимум | Примеры |
|-------|------------|---------|---------|
| `control-height/*` | Интерактивные контролы | 32 px | Кнопки, инпуты, селекты |
| `size/*` | Информационные элементы | 16 px | Бейджи, аватары, иконки |

**Бейдж — не контрол, а информационный индикатор.** Пользователь не нажимает на сам бейдж, поэтому touch target (≥32 px) не требуется. Это позволяет делать компактные бейджи 16–24 px для плотных интерфейсов.

Если бейдж должен быть интерактивным, оберните его в `<button>` или `<a>` с `control-height/*` — но сам бейдж внутри остаётся на `size/*`.

### Таблица размеров

Высота бейджа **фиксирована** и привязана к шкале **size/**. Прогрессия 2xs < xs < sm < md < lg.

| Размер | Высота | Padding X | Padding Y | Font  | Иконка | Область применения |
|--------|--------|-----------|-----------|-------|--------|---------------------|
| 2xs    | 16 px (`size/2xs`) | spacing/1 (4) | spacing/1 (4) | caption-sm (10/12) | 12×12 px | Микро-индикаторы, dot-каунтеры. |
| xs     | 20 px (`size/xs`) | spacing/1 (4) | spacing/1 (4) | caption-sm (10/12) | 12×12 px | Каунтеры в trailing list items. |
| sm     | 32 px (`size/md`) | spacing/2 (8) | spacing/2 (8) | caption-md (12/16) | 16×16 px | Компактный бейдж. |
| md     | 40 px (`size/lg`) | spacing/2 (8) | spacing/3 (12) | Body 2 Medium (14/20) | 24×24 px | Стандартный бейдж. |
| lg     | 48 px (`size/xl`) | spacing/3 (12) | spacing/4 (16) | Body 2 Medium (14/20) | 24×24 px | Крупный бейдж. |

---

## 4. Состояния

- **Default** — обычное отображение.
- Бейдж не интерактивен по умолчанию; при необходимости интерактивность задаётся обёрткой (кнопка/ссылка).

---

## 5. Контент и варианты отображения

Структура бейджа: **[Icon?] [Text] [Counter?]**

### 5.1 Только текст
Бейдж с одной текстовой подписью. Padding и типографика по размеру (см. п. 3).

### 5.2 Текст + иконка
- **Расположение**: иконка слева от текста.
- **Зазор**: между иконкой и текстом — `spacing/1` (4 px).
- **Размеры иконки** по размеру бейджа:
  - **2xs / xs**: 12×12 px
  - **sm**: 16×16 px
  - **md / lg**: 24×24 px
- **Цвет иконки**: наследует цвет текста бейджа (`Text&Icon/on Tinted/{variant}`).
- **Порядок в разметке**: [иконка] → [gap] → [текст].

### 5.3 Текст + каунтер
- **Расположение**: каунтер справа от текста.
- **Зазор**: `spacing/1` (4 px).
- **Типографика каунтера**: совпадает с типографикой текста бейджа.
- **Цвет каунтера**: наследует цвет текста бейджа.
- **Пример**: «High reliability **25**» — где 25 — каунтер.

### 5.4 Иконка + текст + каунтер
Полная структура: [Icon] → [gap] → [Text] → [gap] → [Counter]. Все зазоры — `spacing/1` (4 px).

---

## 6. Использование маленьких размеров

### 6.1 Каунтеры в trailing list items
Для отображения количества в trailing-слоте списков используйте размер **xs** (20 px) или **sm** (32 px):
- Только число: `<Badge size="xs" variant="question">12</Badge>`
- С текстом: `<Badge size="sm" variant="info">New 5</Badge>`

### 6.2 Микро-индикаторы
Для notification dots и мини-каунтеров используйте размер **2xs** (16 px):
- Точка: пустой бейдж с минимальной шириной
- Число: `<Badge size="2xs" variant="negative">3</Badge>`

---

## 7. Figma

Компонент в Figma: [Badge](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=4523-14)

### Варианты (40 шт.)
- **Type**: Good, Info, Warning, Negative
- **Size**: 2xs, xs, sm, md, lg
- **Shape**: Pill, Rounded

Bindings: фон — `Background/Tinted/{Type}`, текст и иконка — `Text&Icon/on Tinted/{Type}`. Покрытие токенами 100% (color/text/spacing/radius).

### Boolean properties
- **Icon** (default `true`) — показать левую иконку
- **Label** (default `true`) — показать текстовый лейбл («Low reliability» в дефолте, заменяется через override)
- **Counter** (default `false`) — показать правый счётчик-число

Комбинации задают разные кейсы:

| Конфиг | Icon | Label | Counter | Результат |
|---|---|---|---|---|
| **Status** (default) | ✓ | ✓ | — | `✓ Low reliability` |
| **Status + count** | ✓ | ✓ | ✓ | `✓ 3 unread items` |
| **Counter only** | — | — | ✓ | `8` (компактный счётчик, для Tabs / Notifications) |
| **Label only** | — | ✓ | — | `Beta` (текстовый ярлык) |
| **Icon only** | ✓ | — | — | только иконка-ярлык (statusbar-стиль) |

### Привязка токенов
| Property | Токен |
|----------|-------|
| height | `size/2xs`, `size/xs`, `size/md`, `size/lg`, `size/xl` |
| paddingLeft/Right | `spacing/1`, `spacing/2`, `spacing/3` |
| paddingTop/Bottom | `spacing/1`, `spacing/2`, `spacing/3`, `spacing/4` |

---

## 8. Ссылки

- Цвета: **docs/COLOR-PALETTE.md**
- Токены: **docs/DESIGN-TOKENS.md**
- Типографика: **docs/TYPOGRAPHY.md**
- Шкала size: **src/tokens/spacing.ts** → `size`

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Color | 100% (на New-токенах после миграции 2026-05-05) |
| Token | 60% |
| Type | 100% |
| **Overall** | **73%** |

Что осталось: text gap ×40, counter paddingLeft ×40 — внутренние spacing на текстовых фреймах. Все цвета и типографика на токенах.

---

## История миграций

**2026-05-05 — миграция Old → New (после апрува палитры разработкой).**

- Все 40 вариантов переведены с `Decor/Bubble/*` + `Accent/*` + `Text/*` на `Background/Tinted/*` + `Text&Icon/on Tinted/*`.
- **Type=Good** перепривязан с `Background/Tinted/Admin` (Green/100) на `Background/Tinted/Good` (Green/50) — восстановлена семантика.
- **Type=Default** удалён (10 вариантов). Нейтральный/default бейдж — open.
- **Type=Info** добавлен (10 новых вариантов, склонированы из Good с привязкой на Info-shade).
- **Type=Error → Negative** (рефактор имени для согласованности со спекой и палитрой).
- Финальная матрица: 4 type × 5 size × 2 shape = 40.
