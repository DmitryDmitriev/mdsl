# Спецификация компонента Badge

Бейдж — компактный индикатор статуса или категории. Использует только семантические токены дизайн-системы.

Размеры **2xs / xs / sm / md / lg / xl**, формы **Pill / Rounded**, заливка **Filled / Outline / Contrast**. Семантика вариантов: **good**, **info**, **warning**, **negative**, **neutral** (см. §1). Типографика: **2xs / xs** — caption-sm (10/12); **sm / md** — caption-md (12/16); **lg / xl** — Body 2 Medium (14/20). Иконки: **2xs / xs** — 12 px; **sm / md** — 16 px; **lg / xl** — 24 px.

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
| Border | 1px solid **`Outline/{variant}`** | 1px solid **`Outline/{variant}`**, stroke align **INSIDE** |
| Text | `Text&Icon/on Tinted/{variant}` | **`Outline/{variant}`** |
| Icon (Union fill) | `Text&Icon/on Tinted/{variant}` | **`Outline/{variant}`** |
| Icon (container) | — | прозрачный (`fills = []`) |

**Outline pattern — monochromatic (от 2026-05-26):** border, text, icon — **одним токеном** `Outline/{variant}` (см. COLOR-PALETTE.md §2.11). Это даёт согласованный «monoцветный» outline-look, как в Adobe Spectrum / Carbon / Tailwind UI.

**Token `Outline/{variant}` значения:**

| Variant | Light (Color/700) | Dark (Color/400) |
|---|---|---|
| `good` | Green/700 | Green/400 |
| `info` | Blue/700 | Blue/400 |
| `warning` | **Amber**/700 | **Amber**/400 |
| `negative` | Red/700 | Red/400 |
| `neutral` | Zinc/700 | Zinc/400 |

> ⚠️ **Warning живёт на двух hue — historical drift, не дизайн-замысел.** Filled-Warning сидит на Orange (Orange/50–900 фон + Orange/800–50 текст), Outline-Warning и Accent-Warning — на Amber (Amber/700/400). Получилось при введении `Outline/*` token (2026-05-26, commit `249a0ef`) — взяли Amber/700 как Tailwind-default, не сверившись с tinted-палитрой. План гармонизации к Amber-шкале (Orange освобождается под Decor) — в COLOR-PALETTE.md §2.11. До тикета на гармонизацию обе hue валидны. Зафиксировано 2026-05-29.

**Почему отдельный `Outline/*` токен, а не переиспользование существующих:**
- В Light нужен Color/700 для контраста текста ≥4.5:1 (WCAG AA). Существующий `Text&Icon/on Tinted/*` даёт Color/700 — подошёл бы.
- В Dark нужен Color/400 для visible distinction между типами (Color/50 от `Text&Icon/on Tinted/*` в dark делал бы все outline-бейджи почти-белыми, нет различимости).
- Ни один existing token не покрывает обе моды одновременно (Color/700 light + Color/400 dark) — поэтому введён новый `Outline/*` (см. COLOR-PALETTE.md §2.11).

**Иконка — особенность binding'а:** Container иконки-инстанса (`16 / ic_check`, `24 / ic_*` и т.п.) имеет `fills = []` (прозрачный). Цвет иконки задаётся через **inner Union** (BOOLEAN_OPERATION) — её `fills` биндятся к `Outline/{variant}`. Если поставить fill на сам инстанс — весь 16×16/24×24 квадрат закрасится solid'ом, чекмарк исчезнет.

**Stroke align INSIDE** — визуальные границы Outline-бейджа не растут на 2px относительно Filled. Размеры (§3) идентичны.

- **Не использовать** `Accent/{variant}` (Green/600 и т.п.) для текста на tinted-фоне — контраст на грани WCAG AA, а семантика `Accent/*` принадлежит активным интерактивным элементам, не статичным бейджам.

### Fill=Contrast — контрастная форма (ратифицировано 2026-08-31)

Третья заливка (в дополнение к Filled/Outline): **сплошной сильный фон + held on-color текст**. Для акцентных/emphasis-лейблов («High reliability», премиум-метки), где tinted-пастель недостаточно заметна. Геометрия (размеры/радиусы/паддинги) — идентична Filled.

**Ключевой принцип — held.** Белый/чёрный текст на цвете держит контраст в обеих темах **только на held-фоне** (theme-invariant). Адаптивный `Accent/*` в Dark светлеет и ломает пару (белый на Blue/400 = 2.5:1). Поэтому хроматические фоны Contrast — новые held-токены `Background/{hue} applied` (см. [COLOR-PALETTE §2.12](./COLOR-PALETTE.md)). Шейды подобраны под WCAG AA (white-контраст ≥4.5, кроме Warning — см. ниже).

| Variant | Background (held) | Значение | Text / Icon | Контраст текста |
|---|---|---|---|---|
| **info** | `Background/Blue applied` | Blue/600 `#2563EB` | `Text&Icon/White applied` | 5.17 ✓ AA |
| **good** | `Background/Green applied` | Green/700 `#15803D` | `Text&Icon/White applied` | 5.02 ✓ AA |
| **negative** | `Background/Red applied` | Red/600 `#DC2626` | `Text&Icon/White applied` | 4.83 ✓ AA |
| **warning** | `Background/Amber applied` | Amber/400 `#FBBF24` | **`Text&Icon/Black applied`** | 12.6 ✓ AAA (чёрный) |
| **neutral** | `Accent/Primary` *(adaptive)* | Zinc/900 L ↔ Zinc/200 D | `Text&Icon/Inverted W-B` *(adaptive)* | ≥17 ✓ AAA |

**Два намеренных исключения:**
- **Warning — светлый янтарь `Amber/400` + ЧЁРНЫЙ текст**, не тёмный янтарь + белый. Белый на янтаре не достигает AA ни на одном шейде без ухода в коричневый (Amber/700+), где теряется «warning»-идентичность. Жёлтый+чёрный — каноничный высококонтрастный warning.
- **Neutral — единственный adaptive** (не held): held-тёмный (Zinc/800) в Dark не отделяется от тёмного фона `Background/Primary` (Zinc/950). `Accent/Primary` даёт тёмный чип в Light / светлый в Dark — отделяется в обеих темах; пара с `Text&Icon/Inverted W-B` (матч, как у Checkbox-галки). Held-нейтрала не заводим.

**Иконка** — цвет привязан к тому же on-color токену, что и текст (White applied / Black applied / Inverted W-B), так что глиф и подпись всегда одного цвета. Технически цвет несёт **SOLID-fill самого инстанса иконки** (`ic_check` и т.п.) с `visible:false`: прозрачный-но-привязанный fill красит глиф, не бокс. ⚠️ **`visible` держать `false`** — при `visible:true` заливается весь 24×24 бокс сплошным цветом (баг «квадрат вместо галочки», ловил при сборке 2026-08-31; inner Union инстанса при этом недоступен на traversal — красить надо через fill инстанса). Border у Contrast — нет.

> **Публикация — закрыто (2026-08-31):** три held-токена (`Background/Green/Red/Amber applied`, `2367:10/11/12`) опубликованы в `App Color Palette`, импортированы в UI-Kit и **привязаны ко всем 60 фонам Contrast** (Info→`Blue applied`, Good→`Green applied`, Negative→`Red applied`, Warning→`Amber applied`, Neutral→`Accent/Primary`). Held-литералов не осталось. Пере-публикация UI-Kit-Mobile — вручную.

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
- **Типографика каунтера** (исключение на микро-размерах):
  - **2xs / xs:** `caption-md` (12/16) — **на ступень крупнее**, чем label (`caption-sm` 10/12). На 16-/20-px бейдже число при 10pt теряет читаемость; при 12pt разборчиво.
  - **sm / md / lg / xl:** совпадает с типографикой текста бейджа.
- **Цвет каунтера**: наследует цвет текста бейджа.
- **Пример**: «High reliability **25**» — где 25 — каунтер.

> Исключение по 2xs/xs зафиксировано после reconciliation 2026-05-29 (Figma + iOS-реализация уже делали так; спека приведена к ним). Решение принято ради читаемости числа в микро-бейджах.

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

### Варианты (183 шт.)
- **Type**: Good, Info, Warning, Negative, Neutral, **Overlay** (последний — для лейблов поверх медиа, см. §7.1)
- **Size**: 2xs, xs, sm, md, lg, xl (Overlay — только xs / sm / md)
- **Shape**: Pill, Rounded (Overlay — только Pill)
- **Fill**: Filled, Outline, **Contrast** (Overlay — только Filled-эквивалент; Contrast — 5 type × 6 size × 2 shape = 60 вариантов, см. §2 «Fill=Contrast»)

Раскладка: Filled 63 (вкл. Overlay ×3) + Outline 60 + Contrast 60 = **183**.

Bindings: см. §2 «Цвет» — Filled на `Background/Tinted/*`, Outline через stroke на `Outline/*` без заливки, Contrast на held `Background/{hue} applied` + on-color (White/Black applied, Neutral — Accent/Primary + Inverted W-B). Текст и иконка Filled — всегда `Text&Icon/on Tinted/{Type}` (кроме Overlay — `Text&Icon/White applied`). Покрытие токенами 100% (color/text/spacing/radius/border).

### 7.1. Type=Overlay — лейблы поверх медиа (+3 варианта)

Бейдж, размещаемый **поверх произвольного фото/видео** — информационный лейбл, для которого статусные цвета неуместны, а контраст не гарантирован: «Main photo» / «Главное фото», счётчик фото «1/8», теги «VIDEO» / «360°», длительность видео.

| Свойство | Значение |
|---|---|
| Fill (root) | `Background/Overlay` (скрим: alpha Black/40 Light, Black/30 Dark) |
| Текст / иконка | `Text&Icon/White applied` (White/Main в обеих темах, theme-invariant) |
| Border | нет (бортик Filled-бейджа снят — скрим самодостаточен) |
| Shape | Pill (капсула) |
| Size | xs (20) / sm (24) / md (32) |
| Icon / Label / Counter | те же boolean (§7), что у остальных Type |

- **Почему это Badge, а не новый «Tag»:** overlay-лейбл — информационный индикатор (как `Neutral`: Beta / New / Draft), не категоризация и не интерактив. Отдельный Tag дублировал бы Badge и Chips.
- **Почему отдельный Type, а не override на Neutral:** связка «скрим + theme-invariant белый» зашита в вариант, чтобы продукт не собирал её вручную (иначе — silent неправильный fill; DS-gap PB-1581).
- **Заменяет прежний совет «на картинке → Outline»** (см. §«Когда Filled/Outline»): Outline (цветная обводка + цветной текст) над непредсказуемым фото контраст тоже не гарантирует.
- Связка тождественна `ButtonIcon Type=Overlay` (контролы поверх медиа) — единый overlay-паттерн. См. composition-rules §11.

### Когда Filled, когда Outline (guidance для дизайнеров)

| Сценарий | Filled | Outline |
|---|---|---|
| Бейдж на нейтральной поверхности (Card, List) | ✅ | OK |
| Бейдж на цветной картинке / image-фоне (ad card) | используй **`Type=Overlay`** (§7.1) | Outline тоже не гарантирует контраст |
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

**2026-08-31 — `Fill=Contrast` — третья заливка (+60 вариантов). Матрица 123 → 183.**

- Запрос: нужна контрастная форма бейджа — сплошной сильный фон + held on-color текст (референс — акцентная метка «High reliability»), где tinted-пастель Filled недостаточно заметна.
- **Решение по объёму:** полный семантический набор — все 5 type (info/good/warning/negative/neutral) × 6 size × 2 shape = **60 вариантов**. Геометрия идентична Filled.
- **held, не adaptive** (сознательный выбор): белый/чёрный текст на цвете держит контраст в обеих темах только на theme-invariant фоне. Заведены 3 новых held-токена `Background/Green/Red/Amber applied` + переиспользован `Background/Blue applied`; on-color — `Text&Icon/White applied` (info/good/negative), `Black applied` (warning) — см. §2 «Fill=Contrast».
- **2 намеренных исключения:** warning = светлый `Amber/400` + **чёрный** текст (белый на янтаре не берёт AA); neutral = единственный **adaptive** (`Accent/Primary` + `Text&Icon/Inverted W-B`) — held-тёмный в Dark не отделялся бы от фона.
- **Сборка:** клон 60 Filled-вариантов → перепривязка фона (held), текста и **иконки**. Иконка красится через fill инстанса `ic_check` с `visible:false` (см. §2, gotcha «квадрат вместо галочки»). `componentPropertyReferences` (Icon/Label/Counter toggles) восстановлены после клона.
- **Публикация:** 3 held-фон-токена (`2367:10/11/12`) опубликованы в `App Color Palette`, импортированы и привязаны ко всем 60 фонам Contrast (held-литералов не осталось). Пере-публикация UI-Kit-Mobile — вручную.
- WCAG: white-контраст ≥4.5 на info/good/negative; warning черный 12.6 AAA; neutral ≥17 AAA. Покрытие токенами 100%.

**2026-06-29 — `Type=Overlay` (лейблы поверх медиа, +3 варианта). DS-gap из PB-1581.**

- Контекст: фото-ячейка постинга («Main photo» + edit/close поверх фото). Контролы закрыты `ButtonIcon Type=Overlay`; для текст-лейбла «Main photo» / счётчика / тегов нужен бейдж с контраст-гарантией над произвольным фото.
- **Premise-check:** рассматривали отдельный компонент «Tag» — отвергнут (overlay-лейбл = информационный бейдж как Neutral; Tag дублировал бы Badge+Chips). Прежний совет «на картинке → Outline» тоже не гарантирует контраст.
- **+3 варианта** (`4523:14`): `Type=Overlay` × Size xs/sm/md × Shape=Pill × Fill=Filled. Матрица 120 → **123**. Fill `Background/Overlay`, текст/иконка `Text&Icon/White applied`, бортик снят. Собраны клоном `Type=Neutral` + перепривязка.
- Осознанные омиссии: Overlay только Pill + только Filled-эквивалент + xs/sm/md (как Ghost Negative — Square-only).
- §7.1 добавлена; §«Когда Filled/Outline» обновлена. composition-rules §11 + скилл `ds-build` (Regression #7) синхронизированы. Тождественно `ButtonIcon Type=Overlay`.

**2026-06-09 — Filled-бейджи получают бортик Outline/{variant} (QA-reconciliation LIOS-2510).**

- §2 «Цвет»: Border у `Fill=Filled` исправлен с «— (нет)» на `1px solid Outline/{variant}`. Figma-инстанс содержит цветной бортик у всех Filled-вариантов; канон расходился.
- Код уже приведён (ветка `feature/LAA-3524-design-system`, коммит `e5c30e50d`).

**2026-05-25 — добавлен `Fill` axis (Filled / Outline).**

- Добавлен новый variant axis `Fill` с двумя значениями. Матрица: 5 × 6 × 2 × 2 = **120 вариантов** (было 60).
- Outline собран как `fills = []` + 1px stroke (align INSIDE).
- **Итерация 1** (откатана в тот же день): border привязан к `Text&Icon/on Tinted/{Type}` — visual-coherent, но в Dark mode все outline-бейджи сливались в почти-белые контуры (tinted-text shade в Dark = Color/50), а в Light border равнялся тексту — слишком сильно.
- **Итерация 2** (откатана 2026-05-26): border переведён на `Border/*` токены — фикс по dark-mode и Light. Text и Icon оставались на `Text&Icon/on Tinted/*`.
- **Итерация 3** (откатана 2026-05-26): text переведён на `Text&Icon/Primary`, icon остался цветным. Гибрид border+icon=semantic / text=neutral. Архитектурно чисто, но визуально дизайнер ожидал monochromatic, как в Adobe Spectrum / Carbon / Tailwind UI (text=border=icon одного цвета).
- **Итерация 4 (текущая, 2026-05-26):** введён новый token `Outline/{variant}` в палитре (см. COLOR-PALETTE.md §2.11) = Color/700 light + Color/400 dark. Border + text + icon (через inner Union) — все привязаны к этому одному токену. Monochromatic outline-look. WCAG AA в light (Color/700 ≥4.5:1), visible distinction в dark (Color/400 mid-tone). Открыт gotcha: иконку нужно биндить через inner Union, не через container — иначе solid square вместо checkmark.
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
