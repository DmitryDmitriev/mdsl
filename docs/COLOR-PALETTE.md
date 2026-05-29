# Цветовая палитра — спецификация и правила использования

При работе с цветами в UI (код, превью, дизайн) используйте только семантические токены из этой спецификации. Семантические привязки фиксируются здесь и не меняются без обсуждения с командой.

> **Текущий статус палитры (с 2026-05-05):** идёт миграция компонентов на новую структуру. В файле палитры Figma две параллельные группы:
> - **Канонические имена без суффикса** (`Background/Primary`, `Text&Icon/Primary`, `Decor/Bubble Old/...`-нет) — это **новые** токены из этой спецификации. Используем их во всех новых и мигрируемых компонентах.
> - **С суффиксом `Old`** (`Background Old/Primary`, `Text Old/Primary`, `Decor/Bubble Old/Info`...) — устаревшие токены, остаются ради совместимости с немигрированными компонентами. Будут удалены после завершения Round 6 миграции (см. §4).
>
> Если в Figma виден токен с `Old` — компонент ещё не мигрирован. Если без префикса — уже на канонической палитре.

---

## 1. Базовые палитры (примитивные токены)

### 1.1 Alpha Black
Основа: `#0A0A0A`. Шкала по светлоте: имя 5–90, проценты 95% (самый тёмный) — 10% (самый светлый).

Шаги: `5, 10, 20, 30, 40, 50, 60, 80, 90`.

**Формула:** `opacity(%) = 100 − N`. То есть `alpha Black/5` = 95% (самый плотный), `alpha Black/90` = 10% (самый прозрачный).

### 1.2 Alpha White
Основа: `#FFFFFF`. Шкала по светлоте: имя 5–90, проценты 95% (самый светлый) — 10% (самый тёмный).

Шаги: `5, 10, 20, 30, 40, 50, 60, 80, 90`.

**Формула:** `opacity(%) = 100 − N`. То есть `alpha White/5` = 95% (самый плотный белый), `alpha White/90` = 10% (самый прозрачный).

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

**Semantic primitives** (используются в `good/info/warning/negative` ролях):

- **Red:** 50 `#FEF2F2` → 400 `#F87171` → 500 `#EF4444` → 600 `#DC2626` → 800 `#991B1B`
- **Blue:** 50 `#EFF6FF` → 100 `#DBEAFE` → 400 `#60A5FA` → 500 `#3B82F6` → 800 `#1E40AF`
- **Green:** 50 `#F0FDF4` → 100 `#DCFCE7` → 400 `#4ADE80` → 500 `#22C55E` → 600 `#16A34A` → 800 `#166534`
- **Amber:** 400 `#FBBF24` → 500 `#F59E0B` → **700 `#B45309`** (используется в `Outline/Warning` light — см. §2.11)
- **Orange:** 50 `#FFF7ED` → 500 `#F97316` → 800 `#9A3412`

**Decor primitives** (используются в `Decor/*` ролях — см. §2.10):

| Color | 50 | 100 | 400 | 500 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|
| **Purple** | `#FAF5FF` | `#F3E8FF` | `#C084FC` | `#A855F7` | `#7E22CE` | `#6B21A8` | `#581C87` |
| **Pink**   | `#FDF2F8` | `#FCE7F3` | `#F472B6` | `#EC4899` | `#BE185D` | `#9D174D` | `#831843` |
| **Cyan**   | `#ECFEFF` | `#CFFAFE` | `#22D3EE` | `#06B6D4` | `#0E7490` | `#155E75` | `#164E63` |
| **Teal**   | `#F0FDFA` | `#CCFBF1` | `#2DD4BF` | `#14B8A6` | `#0F766E` | `#115E59` | `#134E4A` |
| **Indigo** | `#EEF2FF` | `#E0E7FF` | `#818CF8` | `#6366F1` | `#4F46E5` | `#3730A3` | `#312E81` |

Источник: Tailwind CSS v3 palette (de-facto industry baseline). При появлении brand-aesthetic требований — пересматриваем точечно.

Полные шкалы (`50/100/200/300/400/500/600/700/800/900/950`) заведены в Figma `App Color Palette` (collection «Base Color», single Light mode) — 2026-05-25.

Orange уже имеет полную шкалу в палитре (введён до 2026-05-25) — добавлений не требовалось.

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

| Роль     | Light     | Dark       | Где используется |
|----------|-----------|------------|---|
| Good     | Green/50  | Green/900  | Badge, soft-кнопки, информационные плашки в карточках |
| Info     | Blue/50   | Blue/900   | Badge, soft-кнопки, информационные плашки в карточках |
| Warning  | Orange/50 | Orange/900 | Badge, soft-кнопки, информационные плашки в карточках |
| Negative | Red/50    | Red/900    | Badge, Soft Negative кнопки, информационные плашки в карточках |
| Neutral  | Zinc/100  | Zinc/800   | Badge (технические бейджи: Low reliability, Beta, New, Draft), Alert Type=Tech |

Канонические Tinted ограничены пятёркой `Good / Info / Warning / Negative / Neutral`. Чат-баблы используют отдельную легаси-группу `Decor/Bubble Old/Question` (Zinc/100 / Zinc/800) и `/Admin` (Green/100 / Green/700) — см. `chat-bubble-spec.md`. Это сделано намеренно: чат — единственная зона, где нужен дополнительный нейтральный shade и слегка «admin-зелёный», отличный от Good. В системных компонентах (Alert, Badge, Chip) — только пять канонических Tinted.

**Принцип симметрии Light ↔ Dark.** В Light плашка — пастельный 50-shade («edge of white с намёком оттенка»). В Dark — глубокий 900-shade («edge of black с намёком оттенка»). Это даёт сопоставимую визуальную массу: в обеих темах плашка читается как мягкий информационный фон, а не как «alert/warning». Раньше Dark был привязан к 800-shade — плашки выглядели слишком насыщенно (см. историю 2026-05-07). Контраст текста `Text&Icon/on Tinted/*` (Color/50) на 900-shade плашке — 8.7–9.5:1 (WCAG AA с большим запасом). Для Neutral оставлено Zinc/800 — это нейтральная роль без хроматической нагрузки, она совпадает с `Background/Tertiary` намеренно.

**Не применять** в структурных компонентах (Alert, Notification, Card, Dialog) для текста — там фон может быть tinted, но текст всегда `Text&Icon/Primary`/`Secondary`. См. §3.3.

**Neutral / Disabled / Secondary** — три семантические роли (`Background/Tinted/Neutral`, `Background/Disabled`, `Background/Secondary`) сознательно разделяют значение `Zinc/100` (Light) / `Zinc/800` (Dark). Все три претендуют на «самый светлый нейтральный тинт» — на shade-шкале для них нет другой адекватной ступени. В реальных компонентах они не пересекаются: Neutral — в бейджах и Tech-алёртах, Disabled — в выключенных контролах, Secondary — в общих фонах. Если возникнет сценарий с визуальным конфликтом — пересматриваем точечно.

### 2.3 Surface
Поверхности **над базовым уровнем**: модалки, шторки, выезжающие панели.

| Роль              | Light                | Dark                  |
|-------------------|----------------------|-----------------------|
| Surface Primary   | Background Primary   | **Zinc/800** (#27272A) |
| Surface Secondary | Background Primary   | Background Tertiary   |

В Light обе роли = Background Primary: разделение от фона делается через border (или shadow в редких случаях).

В Dark разделение делается через **осветление поверхности** относительно фона — **тени в Dark не видны и не используются**. `Surface Primary` Dark = Zinc/800 (#27272A) — на одну ступень светлее `Background/Primary` (Zinc/950, #09090B) и `Background/Secondary` (Zinc/900, #18181B). Это даёт визуальный elevation cue без тени. Привязка идёт напрямую на raw Zinc/800, не через Background/* — иначе поверхность сольётся с фоном (см. историю 2026-05-11).

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
| Soft Negative   | Background/Tinted/Negative | `Text&Icon/on Tinted/Negative`  |

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
| Neutral  | Zinc/800    | Zinc/50      |

**Применение:** только в **атомарных color-coded элементах** — Chat Bubble, Badge, Chip с tinted-фоном, Soft-кнопки. Текст в той же цветовой семье усиливает идентичность элемента.

**НЕ применять** в структурных компонентах (Alert, Notification, Snackbar, Card, Dialog) — там фон может быть tinted, но текст всегда `Text&Icon/Primary` / `Secondary`. Иерархия задаётся весом и размером, не цветом текста.

### 2.11 Outline

Monochromatic-токен для outline-вариантов компонентов (Badge Outline, в будущем Chips Outline и т.п.). Используется одновременно для **border + text + icon** одного элемента — даёт единый visual-тон.

| Роль | Light | Dark |
|------|-------|------|
| `Outline/Good`     | Green/700 | Green/400 |
| `Outline/Info`     | Blue/700  | Blue/400  |
| `Outline/Warning`  | Amber/700 | Amber/400 |
| `Outline/Negative` | Red/700   | Red/400   |
| `Outline/Neutral`  | Zinc/700  | Zinc/400  |

**Зачем отдельный token, не переиспользование existing:**

| Token | Light | Dark | Подходит для outline? |
|---|---|---|---|
| `Text&Icon/on Tinted/*` | Color/700 ✓ | Color/50 ❌ | В Dark всё «почти-белое», теряется различимость типов |
| `Border/{semantic}` | Color/600 ⚠️ | Color/400 ✓ | В Light текст FAILS WCAG AA (3.5:1 < 4.5:1) для good/info/warning/neutral |
| **`Outline/*` (новый)** | Color/700 ✓ | Color/400 ✓ | Light passes AA, Dark visibly distinct |

**Контраст в Light** (Color/700 на Surface/Primary white):
- Good (Green/700 #15803D) → 5.1:1 ✓ AA
- Info (Blue/700 #1D4ED8) → 7.8:1 ✓ AAA
- Warning (Amber/700 #B45309) → 4.6:1 ✓ AA
- Negative (Red/700 #B91C1C) → 6.2:1 ✓ AAA
- Neutral (Zinc/700 #3F3F46) → 11.2:1 ✓ AAA

**Применение:** на сегодня — Badge с `Fill=Outline` (см. badge-spec.md §2). По мере добавления outline-вариантов в другие компоненты (Chips, Tag и т.п.) — переиспользуют тот же token.

> ⚠️ **Warning живёт на двух hue (Orange + Amber) — historical drift, не дизайн-замысел.**
>
> Filled (`Background/Tinted/Warning` + `Text&Icon/on Tinted/Warning`) сидит на **Orange**-шкале (Orange/50/800/900). Outline (`Outline/Warning`) и Accent (`Accent/Warning`) — на **Amber**-шкале (Amber/700/400).
>
> Как получилось: при введении `Outline/*` token 2026-05-26 (commit `249a0ef`) для Warning взяли Amber/700 как Tailwind-default «warning outline», без сверки с Filled-палитрой, которая исторически на Orange. WCAG прошёл — никто не заметил несоответствия до dev-reconciliation 2026-05-29.
>
> **Визуально не конфликтует** (см. preview-frame в UI-Kit-Mobile: filled = тёплый peach, outline = янтарный — читаются как «warning»). Но семантически это **drift**, а не принцип.
>
> **План гармонизации (бэклог, не сделано):** привести Warning к **Amber**-шкале целиком (Filled тоже на Amber/50/800/900, нужно добавить эти shade'ы в §1.6). Причина выбора в пользу Amber: (1) Orange уже занят `Decor/Orange` (§1.6) для marketing-меток — оставлять Warning на Orange = смешивать semantic и decor роли; (2) Amber семантически ближе к «warning» в индустрии (Material 3, Tailwind, iOS systemYellow). Затронет: Badge Filled-Warning, Alert/Dialog warning, Snackbar warning. Требует отдельного тикета с design review + миграции Figma variables + iOS/Android sync.
>
> До гармонизации — обе hue валидны, **не править инстансы вручную в продуктовых файлах**. Зафиксировано 2026-05-29.

**Не путать с `Border/*`** (§2.4): `Border/*` — для input states (active, error, focus). `Outline/*` — для monochromatic outline-элементов, где одним цветом красится и border, и текст, и иконка.

### 2.10 Decor — статус «в тестах»

Decor-примитивы (Purple/Pink/Cyan/Teal/Indigo + дополнения Orange — см. §1.6) введены, но **семантическая обвязка ещё не зафиксирована**. То есть нет канонических токенов уровня `Background/Decor/*` / `Text&Icon/on Decor/*` и нет жёсткого правила «когда decor, когда semantic».

**Причина:** ситуативные кейсы (VIP, Hot, Most viewed, Sale и т.п.) сейчас в фазе экспериментов в продуктовых задачах. До того как mapping `decor color ↔ semantic role` устаканится в реальных паттернах, преждевременно кодифицировать его в spec'е — иначе получим жёсткую привязку, которую потом тяжело отвязать.

**Как пользоваться сейчас:**
- В Figma — через primitives (`Purple/700`, `Cyan/50` и т.п.) напрямую.
- В коде — ссылаться на хексы или primitives без semantic-роли.
- Контраст текста на плашке проверять руками (типичная пара — `*/50` фон + `*/700` текст в Light; `*/900` фон + `*/50` текст в Dark — даёт 6:1+).

**Что будет потом:** когда применение decor стабилизируется (одни и те же цвета используются для одних и тех же ролей в нескольких независимых задачах) — заведём semantic Decor tokens отдельным апдейтом палитры.

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

**Background vs Surface — sticky-контейнеры (Segment Control, Top App Bar, FAB Bar, Snackbar, Tab Bar).**

В Light оба токена = `#ffffff` — визуально неотличимы, но в Dark разница критична:

| Токен | Light | Dark | Когда применять |
|---|---|---|---|
| `Background/Primary` | #ffffff | Zinc/950 | **Inline** — бар в обычном потоке, контент не скроллится под ним |
| `Surface/Surface Primary` | #ffffff | Zinc/800 | **Sticky / Floating** — контент скроллится под баром (sticky-header, sticky-bottom-tab, floating snackbar) |

**Правило по умолчанию:** все sticky-классы компонентов (Segment Control, Top App Bar, FAB Bar, Snackbar, Tab Bar) в библиотеке Figma собраны на **`Background/Primary`** — это inline-кейс, наиболее частый. Variant axis `Elevation` **не вводим** — это переусложнение ради редкого случая.

**Когда используется sticky-сценарий** (контент скроллится под баром) — дизайнер на инстансе вручную делает override fill на `Surface/Surface Primary` через панель Inspect. Это даёт 2 шага elevation в Dark (Zinc/800 над Zinc/950) и визуально отделяет бар от скроллящегося контента.

Альтернатива override-у на каждом инстансе — обернуть продуктовый sticky-узел в общий «Surface Container» wrapper (паттерн на стороне продуктовых файлов), который задаёт Surface для всех вложенных детей.

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

### 3.8 Decor vs Semantic — обсуждается

Decor-примитивы введены, но правило «когда decor, когда semantic» **ещё не зафиксировано** — см. §2.10. Сейчас в фазе тестов.

Текущая мысль (которая может ещё меняться):
- **Semantic** — функциональный смысл (состояние системы).
- **Decor** — категоризация/маркетинг (VIP, Hot, New и т.п.).
- **Brand** — отдельный слой, не смешивается с Decor.

Конкретные mapping'и («VIP = Decor/Purple» и т.п.) — пока эмпирически в продуктовых задачах. Когда устаканится — закрепим в §3.

---

## 4. Миграция (текущий этап)

В файле Figma `App Color Palette` параллельно существуют два набора:

- **Канонические токены без суффикса** — `Background/*`, `Text&Icon/*`, `Border/*`, `Accent/*`, `Button/*`, `Surface/*` — со значениями из этой спецификации. Используем во всех новых и мигрируемых компонентах.
- **`Old`-токены** — `Background Old/*`, `Text Old/*`, `Icon Old/*`, `Border Old/*`, `Accent Old/*`, `Surface Old/*`, `Decor/Bubble Old/*` — устаревшие. Привязаны к немигрированным компонентам, удалятся после завершения Round 6.

**2026-05-05** — выполнен rename в палитре: `* New/*` → `*/*` (canonical), старые группы получили суффикс `Old`. IDs переменных не менялись, биндинги в компонентах живы.

### Карта миграции (для рефакторинга компонентов)

| Old | Canonical |
|---|---|
| `Background Old/Primary`/`/Secondary`/`/Tertiary`/`/Inverted Primary`/`/Overlay`/`/on Photo` | `Background/*` (то же) |
| (нет) | `Background/Disabled` |
| `Decor/Bubble Old/Good`/`/Info`/`/Warning`/`/Negative` | `Background/Tinted/*` (соответственно) |
| `Decor/Bubble Old/Question`/`/Admin` | **остаются** в палитре — единственное легаси-наследство, изолированное за чат-сценарием (см. `chat-bubble-spec.md`) |
| `Decor/Bubble Old/Tech` | удалён |
| `Decor/Bubble Old/Answer` | удалён |
| `Surface Old/*` | `Surface/*` |
| `Border Old/Default`/`/Disabled`/`/Active` | `Border/*` (то же) |
| (нет) | `Border/Negative`/`/Positive`/`/Warning`/`/Focus` |
| `Accent Old/Active` (=Brand/Bazaraki) | удалить, заменять на `Accent/Positive` (= Green/600) |
| `Accent Old/Graphite` | `Accent/Primary` |
| `Accent Old/Secondary Btn` | `Accent/Secondary` |
| `Accent Old/Link`/`/Negative`/`/Positive`/`/Warning` | `Accent/*` (то же) |
| `Text Old/*` (вся группа) | `Text&Icon/*` |
| `Icon Old/*` (вся группа) | объединено в `Text&Icon/*` |
| `Decor/Bubble Old/Text/*` | `Text&Icon/on Tinted/*` |
| (нет) | `Text&Icon/Disabled` |
| (нет) | `Button/Primary`/`/Secondary`/`/Negative`/`/Soft Negative` |

### Что осталось до завершения миграции

1. ✅ Опечатка `Tertiery` → `Tertiary` исправлена 2026-05-06 (`Text&Icon/Tertiary`, `Text Old/Tertiary`).
2. ✅ **2026-05-11 — внутренние aliases палитры через `Old` ликвидированы.** Round 6 чистил bindings компонентов; внутри палитры canonical-токены продолжали указывать на canonical через цепочку `Old`. Перепривязаны напрямую:
   - `Surface/Surface Primary` Dark → `Zinc/800` (раньше через `Background Old/Secondary` → Greyscale/Gray 100 = #2C3135 legacy).
   - `Border/Active` Light → `Accent/Primary` (раньше через `Accent Old/Graphite`).
   - `Text&Icon/Positive` Light → `Accent/Positive` (раньше через `Accent Old/Positive`).
   - `Text&Icon/Negative` Light → `Accent/Negative` (раньше через `Accent Old/Negative`).
   - `Text&Icon/Warning` Light → `Accent/Warning` (раньше через `Accent Old/Warning`).
   - `Text&Icon/Link` Light → `Accent/Link` (раньше через `Accent Old/Link`).
3. ✅ **2026-05-11 — Home Indicator (62:15579) поймали при аудите** — был пропущен в Round 6, остался на `Icon Old/Primary` (#1d2023 legacy). Перепривязан на `Text&Icon/Primary`. См. `docs/home-indicator-spec.md` §7.
4. ✅ **2026-05-11 — Disabled-токены подключены к компонентам**. Button (60 var.) и ButtonIcon (64 var.) переведены: `Background/Secondary` → `Background/Disabled`, `Text&Icon/Tertiary` → `Text&Icon/Disabled` для State=Disabled. См. `docs/button-spec.md` §«История миграций».
5. ✅ **2026-05-11 — Outline border синхронизирован**. В Button + ButtonIcon Outline+Default переведены с `Accent/Primary` на canonical `Border/Default` (по спеке §2.4 / §2.6).
6. ⏳ После валидации продукта на canonical-палитре — удалить группы `* Old/*` из палитры.

**Состояние семейств токенов (на 2026-05-11):**
- `Background/Disabled`, `Text&Icon/Disabled` — в палитре, подключены к Button + ButtonIcon Disabled.
- `Border/Negative`, `/Positive`, `/Warning`, `/Focus` — в палитре, используются на инпутах в Error / Focus state (см. `input-v2-spec.md`).
- `Button/Primary`, `/Secondary`, `/Negative`, `/Soft Negative` — alias-токены в палитре. Компоненты Button подключены напрямую к `Accent/*` и `Background/Tinted/*` (то же значение через alias). При желании можно перепривязать на Button/* для семантической ясности — на визуал не влияет.

**Deprecated компоненты** (`⚠️ DEPRECATED / Text Field`, `Search`, `Top app bar`, `[deprecated] Notification`, `[deprecated] Basic dialog`, `.=List item_OLD`, `.=Txt Field`, `.=Left Icon Input`, `[deprecated] img_container`) — **остаются** в файле UI-Kit-Mobile. Удаление сломает существующие продуктовые файлы, где они используются как инстансы. Они помечены явно (⚠️ префикс / [deprecated] / суффикс _OLD), новые задачи их не используют. Со временем продуктовые файлы будут чиститься естественно.

### Что мигрировано (Round 6, 2026-05-06 → 2026-05-11)

Все 26+ компонентов файла UI-Kit-Mobile переведены на canonical-палитру. Детали и burn-down — в `migration-baseline.md`.

**2026-05-11 — Home Indicator пойман и мигрирован** в рамках аудита component-spec-check. Был единственным компонентом, пропущенным в Round 6 (использовал `Icon Old/Primary` #1d2023). Перепривязан на `Text&Icon/Primary`. Этим Round 6 закрыт окончательно.

---

## 5. Ссылки

- Отступы, радиусы, высоты: **docs/DESIGN-TOKENS.md**
- Типографика: **docs/TYPOGRAPHY.md**
