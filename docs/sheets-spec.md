# Спецификация компонента Sheets

Sheets (шит) — выезжающая панель поверх контента (bottom sheet или top sheet). Использует только семантические токены дизайн-системы. Спецификация: **docs/DESIGN-TOKENS.md**, **docs/COLOR-PALETTE.md**.

---

## 1. Семантика и варианты

| Вариант | Роль | Описание |
|---------|------|----------|
| **anchor** | Позиция | `bottom` — панель выезжает снизу (по умолчанию); `top` — сверху |
| **size** | Высота панели | `full` — на весь экран; `half` — 50% высоты вьюпорта; `auto` — по контенту (с max-height) |
| **withHandle** | Индикатор перетаскивания | Показывать «ручку» (полоску) сверху панели для жеста drag |
| **withHeader** | Заголовок | Фиксированный хедер с заголовком и опциональной кнопкой закрытия |

---

## 2. Токены

### 2.1 Подложка (backdrop)

| Параметр | Токен / значение |
|----------|------------------|
| Фон | semantic.background.overlay |
| Поведение | Клик по подложке закрывает шит (опционально, настраивается) |

### 2.2 Панель (panel)

| Параметр | Токен / значение |
|----------|------------------|
| Фон | semantic.surface.primary |
| Ширина | **360 px** (минимальная; при более широком экране растягивается или остаётся 360 — в зависимости от платформы) |
| Скругление (сторона открытия) | radius.overlay (**16 px**) — верхние углы для bottom, нижние для top; устанавливается **на корне** панели, `clipsContent: true` |
| Скругление (противоположная сторона) | 0 (прижата к краю экрана) |
| Толщина бордера (опционально) | border/default (1 px) |
| Цвет бордера | semantic.border.default (только со стороны, не прижатой к краю) |

### 2.3 Ручка (handle)

| Параметр | Токен / значение |
|----------|------------------|
| Ширина | **36 px** (off-scale — индустриальный конвенциональный размер для bottom-sheet handle, ближайший токен `spacing/9` отсутствует) |
| Высота | 4 px (spacing/1) |
| Радиус | radius.pill |
| Фон | **`Text&Icon/Secondary`** |
| Отступ сверху | stack-sm (16 px) |
| Отступ снизу (до контента/хедера) | stack-sm (16 px) |
| Выравнивание | По центру по горизонтали |

### 2.4 Хедер (при withHeader)

| Параметр | Токен / значение |
|----------|------------------|
| Padding horizontal | space → spacing/4 (16 px) |
| Padding vertical | spacing/3 (12 px) |
| Gap между заголовком и кнопкой закрытия | spacing/2 (8 px) |
| Разделитель под хедером | divider/default (1 px), color semantic.border.default |
| Текст заголовка | **`Heading/H3 Medium`** (20/28 w500) + `Text&Icon/Primary`. Bold (700) и Semi-Bold не используются в Larixon Mobile DS — см. `TYPOGRAPHY.md` §2 |
| Иконка закрытия | 24×24 px, `Text&Icon/Secondary` |

#### Header — ось `Alignment` (Top / Center)

Header в Figma имеет дополнительную ось `Alignment=Top|Center` (4 варианта: `Leading=Yes/No × Alignment=Top/Center`). `Alignment=Top` — заголовок прижат к верху Header (когда снизу идёт многострочное описание); `Alignment=Center` — заголовок вертикально центрирован (когда описания нет). Не зашит в верхнеуровневые `Sheets`-варианты — задаётся на инстансе Header.

**Component properties Header** (`4535:6998`):

| Property | Тип | Default | Назначение |
|---|---|---|---|
| `Handler#4535:25` | BOOLEAN | true | Визуальный handle сверху (drag affordance) |
| **`Leading slot#4535:26`** *(переименовано с `Leading` 2026-06-01)* | BOOLEAN | true | Видимость leading-слота (back-arrow / custom). Раньше имя `Leading` конфликтовало с variant axis `Leading=Yes/No` (publish flagged как conflict). |
| `Trailing#4535:27` | BOOLEAN | true | Видимость trailing-слота |
| `Discription#4535:28` | BOOLEAN | true | Видимость description-строки (исторический typo, оставлен) |
| `Header#4535:29` | BOOLEAN | true | Видимость title-строки |
| `Leading` | VARIANT | No | Структурная ось layout'а (с/без leading) |
| `Alignment` | VARIANT | Top | Top/Center layout |

### 2.5 Контент (body)

| Параметр | Токен / значение |
|----------|------------------|
| Padding | stack-md (24 px) по вертикали, spacing/4 (16 px) по горизонтали |
| Вертикальный gap между блоками контента | stack-sm (16 px) или stack-md (24 px) по смыслу |
| Цвет текста | semantic.text.primary / text.secondary по контексту |

### 2.6 Размеры панели (size)

| size | Поведение |
|------|-----------|
| full | height: 100% (или 100dvh); скругление только у верхних углов (bottom sheet) |
| half | height: 50dvh (или 50%); скругление как у full |
| auto | min-height по контенту; max-height: 90dvh; overflow-y: auto; скругление как у full |

---

## 3. Состояния

- **Закрыт** — панель скрыта (вне экрана или opacity: 0, pointer-events: none).
- **Открыт** — панель видима, подложка затемнена.
- **Перетаскивание** (опционально) — при свайпе по ручке или панели панель следует за жестом; по отпусканию — открыто/закрыто по порогу.

Анимация: открытие/закрытие по трансформации (translateY) или высоте, длительность 200–300 ms, easing ease-out / cubic-bezier.

---

## 4. Доступность

- **role="dialog"** и **aria-modal="true"** для панели.
- **aria-labelledby** на заголовок при withHeader.
- Фокус при открытии — в первый фокусируемый элемент внутри панели или на кнопку закрытия.
- Trap focus внутри панели; при закрытии — возврат фокуса на триггер.
- Закрытие по Escape.

---

## 5. API компонента (рекомендуемое)

- **open** (boolean) — открыт / закрыт.
- **onClose** (function) — вызывается при запросе закрытия (клик по backdrop, Escape, кнопка закрытия).
- **anchor** ('bottom' | 'top') — сторона появления.
- **size** ('full' | 'half' | 'auto') — размер панели.
- **withHandle** (boolean) — показывать ручку.
- **withHeader** (boolean) — показывать хедер.
- **title** (string, optional) — заголовок хедера.
- **children** — контент панели.
- **closeOnBackdropClick** (boolean, default true) — закрывать по клику на подложку.

---

## 6. Сводная таблица токенов

| Параметр | Токен / значение |
|----------|------------------|
| Backdrop fill | semantic.background.overlay |
| Panel fill | semantic.surface.primary |
| Panel radius (открытый край) | radius.overlay (16 px) |
| Handle width | **36 px** |
| Handle height | 4 px (spacing/1) |
| Handle fill | **`Text&Icon/Secondary`** |
| Handle radius | radius.pill |
| Handle margin top/bottom | stack-sm (16 px) |
| Header padding H | spacing/4 (16 px) |
| Header padding V | spacing/3 (12 px) |
| Header gap | spacing/2 (8 px) |
| Divider | divider/default, semantic.border.default |
| Body padding vertical | stack-md (24 px) |
| Body padding horizontal | spacing/4 (16 px) |
| Title typography | `Heading/H3 Medium` (20/28 w500), `Text&Icon/Primary` |
| Close icon | 24×24, `Text&Icon/Secondary` |

---

## 7. Ссылки

- Токены: **docs/DESIGN-TOKENS.md**
- Цвета: **docs/COLOR-PALETTE.md**
- Типографика: **docs/TYPOGRAPHY.md**
- Спека диалога (связанный паттерн): **docs/dialog-spec.md**

---

## 8. История решений

**2026-04-23 — согласование по аудиту модалок.** По итогам скана продуктового файла (25 bottom sheet в макетах, 0 — инстансы DS-компонента, зоопарк радиусов 8/12/16) приняты:
- Радиус фиксирован на **16 px** по всей системе (`radius.overlay`) — устанавливается **на корне** панели с `clipsContent: true` (раньше скругление жило на Header-инстансе, что ломалось при подмене хедера)
- Ширина панели = **360 px** минимум
- `withHandle` — булева опция (не обязателен, но сохранён как паттерн для свайп-закрытия)
- `withHeader` — булева опция

---

## Аудит покрытия токенами

| Component | Color | Token | Type | Overall |
|---|---|---|---|---|
| Header | **100%** | 75% | **100%** | 91% |
| HandleContainer | **100%** | 90% | — | 95% |
| **Среднее (после миграции 2026-05-12)** | **100%** | ~85% | — | **~93%** |

Что осталось вне canonical:
- **Background/Overlay × 8** на декоративных backdrop-rectangles внутри `Bottom Sheet` mockup'а (приведено к canonical 2026-06-01, см. §«История миграций»). Визуально: dark scrim rgba(29,32,35) с opacity 60% Light / 80% Dark.
- Декоративные размеры (логотип-фоны `e-mongolia_img`, `Img`) — это design-time mockup-ассеты, не токенизируемые контролы.

Building blocks `.=Leading` и `.=Trailing` исключены из аудита.

---

## Архитектура building blocks

Sheets — **не единый COMPONENT_SET** с axes `anchor × size × withHandle × withHeader`, а набор переиспользуемых building blocks (как у Tabs):

| Block | SET id | Назначение |
|---|---|---|
| `.=Leading` | `4339:2628` | Лидирующий слот в Header (back-arrow / close / custom) |
| `.=Trailing` | `4339:2640` | Трейлинг-слот в Header (text-action / icon-button / close) |
| `.=Title` | `4335:2777` | Текстовый заголовок |
| `.=Description` | `4348:2644` | Описание (опционально) |
| `Header` | `4535:6998` | Композиция Leading + Title/Description + Trailing. 4 варианта: `Leading=Yes/No × Alignment=Top/Center` |
| `HandleContainer` | `4558:690` | Контейнер ручки. 2 варианта: `Type=Handler` (выезжающий с handle 36×4) / `Type=без handle` |
| `Bottom Sheet` | `4584:1115` | Композиция-преview корневой панели (HandleContainer + Header + контент). 360×585 (демонстрационный) |

**Anchor=top / size=full/half/auto в Figma не реализованы** — эти axes описаны в §1 спеки на API-уровне (продуктовый код управляет позицией/высотой через props компонента), но в Figma представлен только `Bottom Sheet`-вариант. Top sheets — редкий паттерн, добавлять отдельный mockup-вариант не планируется до явной потребности.

В продуктовых файлах дизайнер собирает Sheet вручную: `HandleContainer` + `Header` (опционально) + контентный фрейм + размещение в context `bottom: 0` или через canvas-композицию.

---

## История миграций

**2026-06-01 (вечер) — Background/Overlay подключён к canonical.**

Открытый foundation-таск закрыт. 8 backdrop-rectangles в Sheet variantах (`Rectangle 5130`) переключены с `Background Old/Overlay` → canonical `Background/Overlay` (key `40117fd02aa33ec865cfa29ab8e4be8f15186995`). Визуально не изменилось (Old и canonical имеют одинаковое значение rgba(29,32,35) с opacity 60% Light / 80% Dark). Sheets теперь полностью на canonical-палитре, Old-токенов в DS-scope не осталось.

В Dialog'е те же 3 backdrop'а (`Test`, `Test-2`, `Test-3`) также переключены — см. dialog-spec.md.

**2026-06-01 — Header property `Leading` переименован → `Leading slot`.**

Figma publish-валидация flag'ила `Header` (`4535:6998`) как `Conflicting property names`: BOOLEAN `Leading#4535:26` и VARIANT axis `Leading=Yes/No` имели одинаковый display-name `Leading`. В property panel инстанса невозможно различить — оба показывались как «Leading».

Fix: BOOLEAN переименован на `Leading slot` (key стал `Leading slot#4535:26`, suffix `#4535:26` сохранён — это значит instance-overrides не сбросились). Variant axis `Leading` не тронут.

Consumer-impact: при обращении к property по полному key-string'у — старое значение `Leading#4535:26` нужно заменить на `Leading slot#4535:26`. Если consumer обращается по позиции или через property panel в Figma — изменений не требуется.

**2026-06-01 — handle 40 → 36 (drift sync с Android).**

См. `dialog-spec.md` миграция 2026-06-01 для контекста drift-сверки. В Figma master handle (HandleBar в `HandleContainer/Type=Handler`) был 36×4 на `Text&Icon/Secondary` — спека ошибалась на 40 px / Tertiary. Спека исправлена под Figma source-of-truth: §2.3, §6 «Сводная таблица токенов», §«Building blocks».

**2026-05-12 — аудит готовности (component-spec-check), 130 правок Figma + sync спеки.**

Sheets был самым недомигрированным organism — смесь Old-палитры (130 fills × 13 разных Old-токенов) + нестандартный shadow `primary-listing` + structural typos. После прохода покрытие токенами выросло с 53% до ~93%.

**Figma — Pass 1 (Old palette sweep, 122 правки):**

| Old-токен | → Canonical | Кол-во |
|---|---|---|
| `Text Old/Primary` | `Text&Icon/Primary` | 14 |
| `Icon Old/Primary` | `Text&Icon/Primary` | 12 |
| `Surface Old/Surface Primary` | `Surface/Surface Primary` | 12 |
| `Text Old/Secondary` | `Text&Icon/Secondary` | 7 |
| `Icon Old/Secondary` | `Text&Icon/Secondary` | 5 |
| `Background Old/Primary` | `Background/Primary` | 3 |
| `Icon Old/Inverted W-B` | `Text&Icon/Inverted W-B` | 3 |
| `Accent Old/Graphite` | `Accent/Primary` (одинаковое hex #18181B) | 2 |
| `Background Old/Secondary` | `Background/Secondary` | 2 |
| `Accent Old/Link` | `Accent/Link` | 1 |
| `Text Old/White applied` | `Text&Icon/Inverted W-B` | 1 |
| `Decor/Bubble Old/Info` | `Background/Tinted/Info` | 1 |

**Figma — Pass 2 (effects, 3 правки):**
- 3 ноды с подключённым shadow-style `primary-listing` (`0 3px 8px rgba(0,0,0,0.12)`) — стиль удалён (sheet идёт поверх backdrop overlay, тень избыточна; canonical `Elevation/Floating` тоже не нужен).

**Figma — Pass 3 (structural, 2 правки):**
- `.=Discription` → **`.=Description`** на main COMPONENT `4348:2644` (typo fix). Instance-имена обновились автоматически.
- `HandleContainer / Type=Handler` (`4334:2660`) — width 375 → **360 px** (= `Platform/Width`). Раньше overflow на 15 px.

**Спека:**
- §2.4 «Хедер» — типографика заголовка: «16–18 px, weight 600» → **`Heading/H3 Medium`** (20/28 w500) + `Text&Icon/Primary`. Закрыт material-наследие. Добавлен подраздел «Header — ось `Alignment` Top/Center» с описанием 4 вариантов.
- §6 «Сводная таблица» — Title typography обновлена под актуальные токены.
- §«Аудит покрытия токенами» — обновлены цифры (53% → ~93%) и список оставшихся off-token bindings.
- Добавлен §«Архитектура building blocks» — зафиксировано, что Sheets — набор building blocks, а не единый SET с axes. Anchor=top / size=full/half/auto существуют только на API-уровне (props продуктового компонента), Figma представлена только Bottom Sheet.

**Открытое (Foundation, cross-cutting):**

- ~~**`Background/Overlay`** не подключён в UI-Kit-Mobile.~~ **Закрыто 2026-06-01.** Canonical `Background/Overlay` из App Color Palette теперь активно используется в Sheets (8 backdrop-фактов) и Dialog (3 backdrop'а). Old-токен `Background Old/Overlay` больше не используется в DS — только в Анализ-странице и Sand Box (не DS), там оставлен как есть.
- **Anchor=top mockup** — добавить вариант при появлении продуктового кейса. Сейчас не делаем (редкий паттерн).

Sheets → ✅ готов к разработке.
