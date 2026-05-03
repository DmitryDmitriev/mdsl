# Цветовая палитра — спецификация и правила использования

При работе с цветами в UI (код, превью, дизайн) используйте только семантические токены из этой спецификации. Семантические привязки фиксируются здесь и не меняются без обсуждения с командой.

> **Текущий статус палитры:** идёт миграция с устаревшей структуры на новую. В файле палитры Figma часть токенов ещё имеет суффикс `New` (например, `Background New/Primary`). Целевые имена — без суффикса. Подробности — §4 «Миграция».

---

## 1. Базовые палитры (примитивные токены)

### 1.1 Alpha Black
Основа: `#0A0A0A`. Шкала по светлоте: имя 5–90, проценты 95% (самый тёмный) — 10% (самый светлый).

Шаги: `5, 10, 20, 30, 40, 50, 60, 80, 90`.

### 1.2 Alpha White
Основа: `#FFFFFF`. Шкала по светлоте: имя 5–90, проценты 95% (самый светлый) — 10% (самый тёмный).

Шаги: `5, 10, 20, 30, 40, 50, 60, 80, 90`.

### 1.3 White
| Токен    | Hex     | Примечание   |
|----------|---------|--------------|
| Main     | #FFFFFF | непрозрачный |
| White 80 | #FFFFFF | 80% opacity  |
| White 60 | #FFFFFF | 60% opacity  |
| White 40 | #FFFFFF | 40% opacity  |

### 1.4 Zinc (50–950)
50 `#FAFAFA` → 100 `#F4F4F5` → 200 `#E4E4E7` → 300 `#D4D4D8` → 400 `#A1A1AA` → 500 `#71717A` → 600 `#52525B` → 700 `#3F3F46` → 800 `#27272A` → 900 `#18181B` → 950 `#09090B`.

### 1.5 Neutral (50–950) — reserved
Серый градиент: 50 `#FAFAFA` → 100 `#F5F5F5` → 200 `#E5E5E5` → 300 `#D4D4D4` → 400 `#A3A3A3` → 500 `#737373` → 600 `#525252` → 700 `#404040` → 800 `#262626` → 900 `#171717` → 950 `#0A0A0A`.

**Статус:** палитра зарезервирована, в семантике не используется. Все нейтральные роли — на Zinc (§1.4). В реализацию (Figma library) не добавлять.

### 1.6 Цветные шкалы (50–950)
- **Red:** 50 `#FEF2F2` → 400 `#F87171` → 500 `#EF4444` → 600 `#DC2626` → 800 `#991B1B`
- **Blue:** 50 `#EFF6FF` → 100 `#DBEAFE` → 400 `#60A5FA` → 500 `#3B82F6` → 800 `#1E40AF`
- **Green:** 50 `#F0FDF4` → 100 `#DCFCE7` → 400 `#4ADE80` → 500 `#22C55E` → 600 `#16A34A` → 800 `#166534`
- **Amber:** 400 `#FBBF24` → 500 `#F59E0B`
- **Orange:** 50 `#FFF7ED` → 500 `#F97316` → 800 `#9A3412`

Полные шкалы — стандартные shade-ступени.

### 1.7 Brand
| Бренд    | Light    | Dark      |
|----------|----------|-----------|
| Bazaraki | #136938  | #77C98D   |
| Somon    | #0093D3  | #8BCEFF   |
| PinTT    | #990099  | #FFAAF3   |
| Unegui   | #E60803  | #F22418   |

**Inverted-пары:** для каждого бренда дополнительная пара, где Primary и Secondary меняются местами.

**Использование:** Brand-цвета **не применяются в системе кнопок и акцентов**. Используются только для брендовых элементов (логотипы, специальные брендовые баннеры, illustrations).

---

## 2. Семантические привязки

### 2.1 Background
Базовые поверхности: фоны экранов и контейнеров.

| Роль             | Light          | Dark           |
|------------------|----------------|----------------|
| Primary          | White/Main     | Zinc/950       |
| Secondary        | Zinc/100       | Zinc/900       |
| Tertiary         | Zinc/200       | Zinc/600       |
| Inverted Primary | Zinc/900       | Zinc/50        |
| Overlay          | alpha Black/40 | alpha Black/30 |
| on Photo         | alpha Black/40 | alpha White/50 |
| **Disabled**     | Zinc/100       | Zinc/800       |

**Disabled** — единственный фон для всех disabled-controls (кнопки, чипы, плашки и т.п.). См. §3.4.

### 2.2 Background / Tinted
Цветные подложки для атомарных color-coded элементов: chat bubble, badge, chip с tinted-фоном, soft-кнопки.

| Роль     | Light     | Dark       |
|----------|-----------|------------|
| Good     | Green/50  | Green/800  |
| Info     | Blue/50   | Blue/800   |
| Warning  | Orange/50 | Orange/800 |
| Negative | Red/50    | Red/800    |
| Question | Zinc/100  | Zinc/800   |
| Admin    | Green/100 | Green/700  |

**Admin vs Good в Dark:** значения BG специально разнесены по шкале (Good → Green/800, Admin → Green/700) — иначе в Dark они визуально схлопывались бы в один зелёный.

**Не применять** в структурных компонентах (Alert, Notification, Card, Dialog) для текста — там фон может быть tinted, но текст всегда `Text&Icon/Primary`/`Secondary`. См. §3.3.

**Question / Disabled / Secondary** — три семантические роли (`Background/Tinted/Question`, `Background/Disabled`, `Background/Secondary`) сознательно разделяют значение `Zinc/100` (Light) / `Zinc/800` (Dark). Все три претендуют на «самый светлый нейтральный тинт» — на shade-шкале для них нет другой адекватной ступени. В реальных компонентах они не пересекаются: Question — в чат-бабблах, Disabled — в выключенных контролах, Secondary — в общих фонах. Если возникнет сценарий с визуальным конфликтом — пересматриваем точечно.

### 2.3 Surface
Поверхности **над базовым уровнем**: модалки, шторки, выезжающие панели.

| Роль              | Light                | Dark                  |
|-------------------|----------------------|-----------------------|
| Surface Primary   | Background Primary   | Background Secondary  |
| Surface Secondary | Background Primary   | Background Tertiary   |

В Light обе роли = Background Primary: разделение от фона делается через border (или shadow в редких случаях).
В Dark разделение делается через **осветление поверхности** относительно фона — тени не используются.

### 2.4 Border
| Роль         | Light          | Dark        |
|--------------|----------------|-------------|
| Default      | Zinc/200       | Zinc/500    |
| Disabled     | Zinc/100       | Zinc/700    |
| Active       | Accent/Primary | Zinc/200    |
| **Negative** | Accent/Negative| Red/400     |
| **Positive** | Accent/Positive| Green/400   |
| **Warning**  | Accent/Warning | Amber/400   |
| **Focus**    | Accent/Link    | Blue/400    |

**Active** — для статичных выделенных контейнеров (выбранная карточка/таб).
**Focus** — отдельная роль для accessibility focus-ring; контрастный синий не сливается с Active.
**Negative/Positive/Warning** — для инпутов и других компонентов в соответствующих состояниях.

### 2.5 Accent
Используется в кнопках, ссылках, активных и выделенных состояниях, а также как источник цвета для семантических ролей в Border, Text&Icon.

| Роль      | Light     | Dark       |
|-----------|-----------|------------|
| Primary   | Zinc/900  | Zinc/200   |
| Secondary | Zinc/200  | Zinc/800   |
| Link      | Blue/500  | Blue/400   |
| Negative  | Red/600   | Red/400    |
| Positive  | Green/600 | Green/400  |
| Warning   | Amber/400 | Amber/400  |

**Primary не брендовый.** В системе намеренно используется нейтральный Zinc/900 (почти-чёрный) вместо брендового цвета — для упрощения поддержки и кросс-бренд переиспользования.

### 2.6 Button
Группа фоновых цветов для filled/tinted-кнопок. Текст и бордер кнопок берутся из `Text&Icon` и `Border` напрямую.

| Тип кнопки      | Background                 | Text/Icon                       |
|-----------------|----------------------------|---------------------------------|
| Primary         | Accent/Primary             | Text&Icon/Inverted W-B          |
| Secondary       | Accent/Secondary           | Text&Icon/Primary               |
| Negative        | Accent/Negative            | Text&Icon/Inverted W-B          |
| Soft Negative   | Background/Tinted/Negative | Text&Icon/onTinted/negative     |

**Outline и Ghost** не имеют собственных Background-токенов — фон прозрачный:

| Тип кнопки      | Background  | Border         | Text/Icon         |
|-----------------|-------------|----------------|-------------------|
| Outline         | прозрачный  | Border/Default | Text&Icon/Primary |
| Ghost           | прозрачный  | —              | Text&Icon/Primary |
| Ghost Negative  | прозрачный  | —              | Accent/Negative   |

**Disabled state — два разных правила в зависимости от типа кнопки:**

**Filled-кнопки (Primary, Secondary, Negative, Soft Negative):**
- BG → `Background/Disabled`
- Text/Icon → `Text&Icon/Disabled`

**Outline в Disabled:**
- BG **остаётся прозрачным** (не заливать `Background/Disabled` — это ломает семантику Outline'а)
- Border → `Border/Disabled`
- Text/Icon → `Text&Icon/Disabled`

**Ghost / Ghost Negative в Disabled:**
- BG **остаётся прозрачным**
- Text/Icon → `Text&Icon/Disabled`

### 2.7 Text & Icon
Объединённая группа для цветов текста и иконок. Семантически в подавляющем большинстве случаев иконки и текст в одной роли используют одинаковый цвет — поэтому одна группа.

| Роль          | Light            | Dark            |
|---------------|------------------|-----------------|
| Primary       | Zinc/950         | Zinc/50         |
| Secondary     | Zinc/500         | Zinc/400        |
| Tertiary      | Zinc/300         | Zinc/500        |
| **Disabled**  | Zinc/300         | Zinc/600        |
| Inverted W-B  | White/Main       | Zinc/950        |
| Inverted B-W  | Zinc/950         | White/Main      |
| White applied | White/Main       | White/Main      |
| Black applied | Zinc/950         | Zinc/950        |
| Positive      | Accent/Positive  | Green/400       |
| Negative      | Accent/Negative  | Red/400         |
| Warning       | Accent/Warning   | Amber/400       |
| Link          | Accent/Link      | Blue/400        |

**Tertiary vs Disabled:**
- **Tertiary** — *вспомогательный текст 3-го уровня* (placeholders, captions с минимальным весом). Активный, читаемый.
- **Disabled** — *выключенный control*. Применяется на disabled-кнопках, инпутах, чипах вместе с `Background/Disabled`.

Численно совпадают в Light (Zinc/300), но семантически — разные роли. В Dark разные значения (Zinc/500 vs Zinc/600).

### 2.8 Text & Icon / on Tinted
Парные цвета текста и иконок **только** для размещения на `Background/Tinted/*` поверхностях.

| Роль     | Light       | Dark         |
|----------|-------------|--------------|
| Good     | Green/800   | Green/50     |
| Info     | Blue/800    | Blue/50      |
| Warning  | Orange/800  | Orange/50    |
| Negative | Red/800     | Red/50       |
| Question | Zinc/800    | Zinc/100     |
| Admin    | Green/800   | Green/100    |

**Применение:** только в **атомарных color-coded элементах** — Chat Bubble, Badge, Chip с tinted-фоном, Soft-кнопки. Текст в той же цветовой семье усиливает идентичность элемента.

**НЕ применять** в структурных компонентах (Alert, Notification, Snackbar, Card, Dialog) — там фон может быть tinted, но текст всегда `Text&Icon/Primary` / `Secondary`. Иерархия задаётся весом и размером, не цветом текста.

### 2.9 Brand Color
Семантика бренда: обычная и Inverted (см. §1.7). В UI использовать семантические имена `Brand/Somon`, `Brand/PinTT`, `Brand/Unegui`, `Brand/Bazaraki`.

**Структура каждой brand-роли:**
- `Brand/<name>` — основной brand-цвет, Light/Dark значения по таблице §1.7.
- `Brand/<name> Inverted` — пара со swap'нутыми Light↔Dark значениями. Использовать когда нужен контрастный brand-цвет на цветной плашке (например, лого на брендовом фоне).

**Где допустимы brand-цвета:**
- ✅ Логотипы, splash-экраны, фирменные баннеры, иллюстрации.
- ✅ Брендированные элементы конкретного флейвора (например, `Brand/Bazaraki` в bz-сборке для splash и логотипа).
- ❌ В системных компонентах (кнопки, ссылки, accent-семантика). Для positive-фидбека — `Accent/Positive` (Green/600), не брендовый зелёный.

---

## 3. Правила применения

### 3.1 Источники правды
В макетах и коде используйте **только семантические роли** (Background, Surface, Border, Accent, Button, Text&Icon, Brand). Прямые ссылки на базовые палитры (Zinc/500, Red/400 и т.д.) — только при определении семантики, не в экранах/компонентах.

### 3.2 Surface
Только для элементов **выше базового уровня**: модалки, шторки, оверлеи, всплывающие панели. На основных экранах используется Background, не Surface.

### 3.3 Tinted-поверхности
`Background/Tinted/*` + `Text&Icon/on Tinted/*` — это **парный набор** для атомарных color-coded элементов:
- ✅ Chat Bubble, Badge, Chip с tinted-фоном
- ✅ Soft-кнопки (Soft Negative)

В **структурных компонентах** (Alert, Notification, Card, Dialog) фон может быть `Background/Tinted/*`, но текст и заголовок — обычные `Text&Icon/Primary` / `Secondary`. Иерархия задаётся типографикой (вес, размер), не цветом.

### 3.4 Disabled vs Tertiary
- **Disabled** — для **выключенных** controls. Background = `Background/Disabled`, Text = `Text&Icon/Disabled`, Border = `Border/Disabled`. Все три применяются вместе.
- **Tertiary** — для **вспомогательного текста** (placeholders, минорные подписи). Не использовать как замену Disabled.

### 3.5 Брендовые цвета
- В **системных** компонентах (кнопки, ссылки, accent-семантика) брендовые цвета **не используются** — для positive/negative/warning и accent'ов берутся `Accent/*`.
- Бренд-цвета **легитимны** в брендовых элементах: логотипы, splash-экраны, фирменные баннеры, иллюстрации, лендинги. Для конкретного флейвора (bz/somon/pinTT/unegui) — соответствующий `Brand/*` остаётся доступным, ничем не «закрыт».
- Если возникает потребность в брендовом фоне у конкретной кнопки (например, WhatsApp-зелёный) — это локальный override через Swap Instance, не системный паттерн.

### 3.6 Тёмная тема
- Основной фон — `Background/Primary` (Zinc/950, почти-OLED).
- Карточки и поверхности **выше базового уровня** разделяются за счёт **осветления** (Surface светлее Background), не теней.
- Контраст и читаемость для каждой пары bg/text должны проверяться отдельно при появлении новых компонентов.

### 3.7 Семантика, не визуал
Имена ролей описывают **смысл**, не цвет:
- `Accent/Primary` ≠ «чёрный». Это «основной CTA-цвет», который сейчас Zinc/900.
- `Background/Tinted/Good` ≠ «зелёный». Это «положительная подложка».

При смене реализации (например, ввод тёмного бренда) семантика остаётся, меняются только базовые значения.

---

## 4. Миграция (текущий этап)

Палитра в процессе перехода со старой структуры на новую. В файле Figma `App Color Palette` параллельно существуют два набора:

- **Старые токены** (без суффикса) — `Background/*`, `Text/*`, `Decor/Bubble/*`, `Accent/*` со старыми значениями. Используются в тех компонентах, которые ещё не мигрировали.
- **Новые токены** (с суффиксом `New`) — `Background New/*`, `Text&Icon New/*`, `Border New/*`, `Accent New/*`, `Button New/*` со значениями из этой спецификации.

### Карта миграции

| Старое | Новое |
|---|---|
| `Background/Primary`/`/Secondary`/`/Tertiary`/`/Inverted Primary`/`/Overlay`/`/on Photo` | `Background New/*` (то же) |
| (нет) | `Background New/Disabled` |
| `Decor/Bubble/Good`/`/Info`/`/Warning`/`/Negative`/`/Question`/`/Admin` | `Background New/Tinted/*` (соответственно) |
| `Decor/Bubble/Tech` | удалён |
| `Decor/Bubble/Answer` | удалён |
| `Surface/*` | `Surface New/*` |
| `Border/Default`/`/Disabled`/`/Active` | `Border New/*` (то же) |
| (нет) | `Border New/Negative`/`/Positive`/`/Warning`/`/Focus` |
| `Accent/Active` (=Brand/Bazaraki) | удалить, заменять на `Accent New/Positive` (= Green/600) |
| `Accent/Graphite` | `Accent New/Primary` |
| `Accent/Secondary Btn` | `Accent New/Secondary` |
| `Accent/Link`/`/Negative`/`/Positive`/`/Warning` | `Accent New/*` (то же) |
| `Text/*` (вся группа) | `Text&Icon New/*` |
| `Icon/*` (вся группа) | объединено в `Text&Icon New/*` |
| `Decor/Bubble/Text/*` | `Text&Icon New/on Tinted/*` |
| (нет) | `Text&Icon New/Disabled` |
| (нет) | `Button New/Primary`/`/Secondary`/`/Negative`/`/Soft Negative` |

### Финальный rename

После того как все компоненты переедут на New-токены, в палитре будет выполнен финальный rename:
1. Старые токены удаляются.
2. У всех New-токенов снимается суффикс: `Background New/Primary` → `Background/Primary` и т.д.
3. Опечатка `Tertiery` → `Tertiary` исправляется.

**После финального rename имена в палитре будут совпадать с этой спецификацией.**

### Что мигрировано к настоящему моменту

- ✅ Alert (компонент-сет, 15 вариантов) — пилот.
- ⏳ Остальные компоненты (Button, Snackbar, Badge, Notification, Chat Bubble, Input, Avatar, Tabs, ListItem, Top App Bar, и др.) — в очереди.

---

## 5. Ссылки

- Отступы, радиусы, высоты: **docs/DESIGN-TOKENS.md**
- Типографика: **docs/TYPOGRAPHY.md**
