# Спецификация компонента Badge

Бейдж — компактный индикатор статуса или категории. Использует только семантические токены дизайн-системы.

Размеры **2xs / xs / sm / md / lg / xl**, формы **Pill / Rounded**, заливка **Filled / Outline**. Семантика вариантов: **good**, **info**, **warning**, **negative**, **neutral** (см. §1). Типографика: **2xs / xs** — caption-sm (10/12); **sm / md** — caption-md (12/16); **lg / xl** — Body 2 Medium (14/20). Иконки: **2xs / xs** — 12 px; **sm / md** — 16 px; **lg / xl** — 24 px.

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
| **neutral** | `Background/Tinted/Neutral` | `Text&Icon/on Tinted/Neutral`   | **Технические бейджи (Low reliability, Beta, New, Draft) — нейтральная плашка без семантической окраски** |

**Удалённые варианты:** `question`, `answer`, `admin` исключены из Badge (2026-05-06). Канонические токены `Background/Tinted/Question` и `/Admin` также удалены из палитры (2026-05-07) — нейтральная роль закрыта токеном `Background/Tinted/Neutral`. Чат-баблы используют отдельную легаси-группу `Decor/Bubble Old/*` (Question/Admin/Other) — см. `chat-bubble-spec.md`.

---

## 2. Токены

### Цвет

Зависит от `Fill`:

| Layer | `Fill=Filled` | `Fill=Outline` |
|---|---|---|
| Background | `Background/Tinted/{variant}` | прозрачный (`fills = []`) |
| Border | — (нет) | 1px solid `Border/{semantic}` (см. mapping ниже), stroke align **INSIDE** |
| Text | `Text&Icon/on Tinted/{variant}` | **`Text&Icon/Primary`** (нейтральный) |
| Icon | `Text&Icon/on Tinted/{variant}` | `Text&Icon/on Tinted/{variant}` (остаётся цветной) |

**Outline pattern — гибридная схема (от 2026-05-26):** border + icon несут semantic-цвет, текст нейтральный. Это даёт чистый «лёгкий» outline-look (Material 3 / Atlassian secondary lozenge style), сохраняя redundant цветовой сигнал через иконку — страховка от color-blindness и компенсация слабого 1px-border на малых размерах.

**Border mapping для Outline** — переиспользует существующие `Border/*` токены (см. COLOR-PALETTE.md §2.4):

| Variant | Border token | Light | Dark |
|---|---|---|---|
| `good` | `Border/Positive` | Green/600 | Green/400 |
| `info` | `Border/Focus` | Blue/500 | Blue/400 |
| `warning` | `Border/Warning` | Amber/400 | Amber/400 |
| `negative` | `Border/Negative` | Red/600 | Red/400 |
| `neutral` | `Border/Default` | Zinc/200 | Zinc/500 |

**Почему `Border/*` а не `Text&Icon/on Tinted/*`:** border средней насыщенности (Color/400-600) даёт читаемый контур, который не конкурирует с текстом. В dark mode mid-tone границы остаются различимы между типами; tinted text shade (Color/50) в dark делал бы все outline почти-белыми.

**Семантическое переиспользование:** `Border/Positive` / `Negative` / `Warning` / `Focus` / `Default` изначально под input states (active/error/focus). Visual-семантика совпадает с outline-badge'ами (border средней насыщенности под цвет состояния). Новые `Border/Tinted/*` токены **не вводились**.

**Stroke align INSIDE** — визуальные границы Outline-бейджа не растут на 2px относительно Filled. Размеры (§3) идентичны.

- **Не использовать** `Accent/{variant}` (Green/600 и т.п.) для текста на tinted-фоне — контраст на грани WCAG AA, а семантика `Accent/*` принадлежит активным интерактивным элементам, не статичным бейджам.

### Отступы (spacing)
- **2xs**: padding `spacing/1` (4 px) по всем сторонам.
- **xs**: padding `spacing/1` (4 px) по всем сторонам.
- **sm**: padding `spacing/1` (4 px) по всем сторонам.
- **md**: padding `spacing/2` (8 px) по всем сторонам.
- **lg**: padding vertical `spacing/3` (12 px), horizontal `spacing/2` (8 px).
- **xl**: padding vertical `spacing/4` (16 px), horizontal `spacing/3` (12 px).

> Все отступы привязаны к токенам `spacing/*` в Figma.

### Радиус (radius)
- **pill**: `radius/pill/pill` (капсула) — по умолчанию.
- **rounded**: размер-зависимый:
  - **2xs / xs**: `radius/1` (4 px) — на низких бейджах 8 px смотрится почти как Pill, теряется визуальное различие.
  - **sm / md / lg / xl**: `radius/2` (8 px).

### Типографика
- **2xs**: typography/caption-sm — 10 px / 12 px, weight 500.
- **xs**: typography/caption-sm — 10 px / 12 px, weight 500.
- **sm**: typography/caption-md — 12 px / 16 px, weight 500.
- **md**: typography/caption-md — 12 px / 16 px, weight 500.
- **lg**: Body 2 Medium — 14 px / 20 px, weight 500.
- **xl**: Body 2 Medium — 14 px / 20 px, weight 500.
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

Высота бейджа **фиксирована**. Прогрессия 2xs < xs < sm < md < lg < xl.

| Размер | Высота | Padding X | Padding Y | Font  | Иконка | Область применения |
|--------|--------|-----------|-----------|-------|--------|---------------------|
| 2xs    | 16 px | spacing/1 (4) | spacing/1 (4) | caption-sm (10/12) | 12×12 px | Микро-индикаторы, dot-каунтеры. |
| xs     | 20 px | spacing/1 (4) | spacing/1 (4) | caption-sm (10/12) | 12×12 px | Каунтеры в trailing list items. |
| **sm** | **24 px** | **spacing/1 (4)** | **spacing/1 (4)** | **caption-md (12/16)** | **16×16 px** | **Компактный бейдж среднего размера, для inline-плашек в плотных строках.** |
| md     | 32 px | spacing/2 (8) | spacing/2 (8) | caption-md (12/16) | 16×16 px | Компактный бейдж. |
| lg     | 40 px | spacing/2 (8) | spacing/3 (12) | Body 2 Medium (14/20) | 24×24 px | Стандартный бейдж. |
| xl     | 48 px | spacing/3 (12) | spacing/4 (16) | Body 2 Medium (14/20) | 24×24 px | Крупный бейдж. |

**История.** До 2026-05-11 шкала была 2xs / xs / sm / md / lg (5 размеров) с шагом xs→sm = 20→32 (+12). Это создавало пустоту между «мини» (≤20) и «среднеформатными» (32+) бейджами. Введён новый **sm = 24 px** — закрывает пробел. Старые `sm/md/lg` повышены до `md/lg/xl`. Структурно: иконка и текст совпадают с теперешним md (16×16 + 12/16 caption-md), отличие только в padding (4 вместо 8) и итоговой высоте.

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
  - **sm / md**: 16×16 px
  - **lg / xl**: 24×24 px
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
Для отображения количества в trailing-слоте списков используйте размер **xs** (20 px), **sm** (24 px) или **md** (32 px):
- Только число: `<Badge size="xs" variant="neutral">12</Badge>`
- С текстом, компактно: `<Badge size="sm" variant="info">New 5</Badge>`
- С текстом, средне: `<Badge size="md" variant="info">New 5</Badge>`

### 6.2 Микро-индикаторы
Для notification dots и мини-каунтеров используйте размер **2xs** (16 px):
- Точка: пустой бейдж с минимальной шириной
- Число: `<Badge size="2xs" variant="negative">3</Badge>`

---

## 7. Figma

Компонент в Figma: [Badge](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=4523-14)

### Варианты (120 шт.)
- **Type**: Good, Info, Warning, Negative, Neutral
- **Size**: 2xs, xs, sm, md, lg, xl
- **Shape**: Pill, Rounded
- **Fill**: Filled, Outline

Bindings: см. §2 «Цвет» — Filled на `Background/Tinted/*`, Outline через stroke на `Text&Icon/on Tinted/*` без заливки. Текст и иконка — всегда `Text&Icon/on Tinted/{Type}`. Покрытие токенами 100% (color/text/spacing/radius/border).

### Когда Filled, когда Outline (guidance для дизайнеров)

| Сценарий | Filled | Outline |
|---|---|---|
| Бейдж на нейтральной поверхности (Card, List) | ✅ | OK |
| Бейдж на цветной картинке / image-фоне (ad card) | ⚠️ сливается | ✅ |
| Несколько бейджей в ряд (visual rhythm) | primary | secondary |
| Counter / notification dot | ✅ | ⚠️ слабее заметен |
| Dark mode на ярком фоне | ⚠️ | ✅ |

**Решающее правило:** если непонятно — выбрать `Filled` (исторический дефолт).

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
| height | `size/2xs`, `size/xs`, `size/sm`, `size/md`, `size/lg`, `size/xl` |
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
| Color | **100%** (на canonical-токенах после миграции 2026-05-05) |
| Token | **100%** (после фиксов 2026-05-11: Rounded sm/md/lg/xl → `radius/2`, Size=sm height → `size/sm`) |
| Type | **100%** |
| **Overall** | **100%** |

---

## История миграций

**2026-05-25 — добавлен `Fill` axis (Filled / Outline).**

- Добавлен новый variant axis `Fill` с двумя значениями. Матрица: 5 × 6 × 2 × 2 = **120 вариантов** (было 60).
- Outline собран как `fills = []` + 1px stroke (align INSIDE).
- **Итерация 1** (откатана в тот же день): border привязан к `Text&Icon/on Tinted/{Type}` — visual-coherent, но в Dark mode все outline-бейджи сливались в почти-белые контуры (tinted-text shade в Dark = Color/50), а в Light border равнялся тексту — слишком сильно.
- **Итерация 2** (откатана 2026-05-26): border переведён на `Border/*` токены — фикс по dark-mode и Light. Text и Icon оставались на `Text&Icon/on Tinted/*`.
- **Итерация 3 (текущая, 2026-05-26):** text переведён на `Text&Icon/Primary` (нейтральный). Icon остаётся на `Text&Icon/on Tinted/{type}` — гибрид: border + icon несут semantic-цвет, текст чистый. Современный outline-pattern (Material 3 / Atlassian secondary lozenge). См. §2 «Цвет».
- Use case: бейджи поверх цветных изображений (карточки объявлений), визуальная иерархия «primary + secondary метки», dark mode на ярких фонах. См. §7 «Когда Filled, когда Outline».
- Покрытие токенами: **100%**.
- Proposal: [proposals/badge-outline-variant.md](./proposals/badge-outline-variant.md) (RATIFIED).

---



**2026-05-05 — миграция Old → New (после апрува палитры разработкой).**

- Все 40 вариантов переведены с `Decor/Bubble/*` + `Accent/*` + `Text/*` на `Background/Tinted/*` + `Text&Icon/on Tinted/*`.
- **Type=Good** перепривязан с `Background/Tinted/Admin` (Green/100) на `Background/Tinted/Good` (Green/50) — восстановлена семантика.
- **Type=Default** удалён (10 вариантов). Нейтральный/default бейдж — open.
- **Type=Info** добавлен (10 новых вариантов, склонированы из Good с привязкой на Info-shade).
- **Type=Error → Negative** (рефактор имени для согласованности со спекой и палитрой).
- Финальная матрица: 4 type × 5 size × 2 shape = 40.

**2026-05-06 — добавлен Type=Neutral (технические бейджи).**

Появился use-case «Low reliability» — технические бейджи, нейтральная плашка без semantic-окраски (Good/Info/Warning/Negative не подходят).

- В палитре заведены 2 новых токена: `Background/Tinted/Neutral` (alias на Zinc/100 Light, Zinc/800 Dark) и `Text&Icon/on Tinted/Neutral` (alias на Zinc/800 Light, Zinc/50 Dark).
- В Badge добавлены 10 вариантов `Type=Neutral` (5 size × 2 shape), склонированы из Good с привязкой на новые токены.
- **Border/Neutral и Accent/Neutral не вводились** — нет реальных кейсов: Badge без бордеров, `Accent/Primary` (Zinc/950) уже играет роль нейтрального акцента в outline-кнопках/ссылках.
- Изначально Neutral дублировал значениями старый `Question` (Zinc/100 / Zinc/800). После 2026-05-07 канонический Question удалён из палитры — Neutral остался единственной нейтральной ролью для color-coded элементов, чат-баблы перешли на легаси `Decor/Bubble Old/*`.

Финальная матрица: 5 type × 5 size × 2 shape = **50 вариантов**.

---

**2026-05-11 — добавлен Size=xl + чистка radius / height bindings.**

- Введён новый размер **xl = 48 px** (cascade rename: старые `sm/md/lg` → `md/lg/xl`, новый `sm = 24 px` закрывает разрыв 20 → 32). 10 новых вариантов (5 type × 2 shape), финальная матрица: **5 × 6 × 2 = 60**.
- **Radius для Shape=Rounded** (sm/md/lg/xl, 20 вариантов) перепривязан с `radius/control/control-md` (8 px, control-токен) на **`radius/2`** (8 px, статичная шкала). Значение то же, но Badge — не интерактив (§3), control-токен здесь неуместен.
- **Height для Size=sm** (10 вариантов, оба shape) — раньше HUG content, теперь явный binding на `size/sm` (24 px). Фиксированная высота требуется §3 спеки.
- Покрытие токенами: 73% → **100%**.
