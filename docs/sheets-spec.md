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
| **Выравнивание заголовка** | заголовок выровнен по сетке **16** (левый край = `padding horizontal`). Внутренний фрейм `Text` имеет `pL=4` при `Leading=Yes` (компенсация под back-стрелку + gap) и **`pL=0` при `Leading=No`** (заголовок к 16). ⚠️ До 2026-09-20 `Leading=No` имел `pL=12` — заголовок уезжал на 28 (баг, чинился на инстансах). Исправлено в мастере. |

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
| Padding вертикальный (на слоте) | **`pT = section/padding-default` (16), `pB = 0`** (асимметрия, см. §2.5.2). Это **padding**-семейство, не `stack/*` (стек — только про gap между детьми). |
| Padding горизонтальный (на слоте) | **0 — слот нейтральный.** Горизонтальный инсет 16 задаёт **сам контент**, не слот (см. §2.5.1) |
| Вертикальный gap между блоками контента (`itemSpacing`) | `stack/gap-2xloose` (24) между разными сущностями; `stack/gap-loose` (12) внутри группы. Вот тут `stack/*` семантически верно — это gap стопки. |
| Цвет текста | semantic.text.primary / text.secondary по контексту |

#### 2.5.1 Как наполнять content slot (правило для дизайнера и сборщика экрана)

Слот **не** задаёт горизонтальный отступ — иначе full-bleed-контент (List Item) получает двойной инсет (32) и клип по правому краю. Горизонтальный инсет 16 — ответственность **контента**:

| Тип контента в слоте | Как класть | Гориз. инсет |
|---|---|---|
| **List Item, медиа, Divider, full-width-строки** | **как есть, full-bleed** (свои 16 уже внутри List Item) | не добавлять. ⚠️ full-bleed = строка на всю ширину (360), но **собственный 16-паддинг List Item НЕ обнулять** — иначе контент уезжает влево (чекбокс на 8 вместо 16). Мастер List Item имеет `pL/pR=16`, не стрипать на инстансе |
| **Текст, Textarea, кнопки, отдельные контролы** | обернуть в 16-инсет-фрейм (paddingLeft/Right = spacing/4) | 16 обёрткой |

Дефолтный контент слота — 16-инсет-фрейм (обычный текст из коробки padded; списки дизайнер кладёт full-bleed, заменяя дефолт). Вертикальный `pT=16` живёт на слоте и на full-bleed по горизонтали не влияет.

**Пример.** `Report`-шторка: список чекбоксов — full-bleed; Textarea «комментарий» + Submit — в 16-обёртке. `Translate`-шторка: пояснительный текст — в 16-обёртке.

#### 2.5.2 Вертикальные отступы слота — асимметрия `16 / 0` (канон 2026-09-20)

Слот НЕ симметричен по вертикали. Правило:

| Край | Значение | Кто владеет зазором |
|---|---|---|
| **Верх (`pT`)** | **16 или 0 — по типу первого блока** (см. таблицу ниже) | слот или сам контент |
| **Низ (`pB`)** | **0** | **сосед снизу**, не слот: при `button=true` — Button area (свой `pT`); при `button=false` — по типу контента (см. таблицу низа) |

**Мастер `4584:1115` держит дефолт `pT=16 / pB=0`.** Значение `pT` докручивает сборщик под первый блок (правки на инстансе, ре-паблиша не требуют).

**Верх слота — по типу первого блока** (вертикальный аналог full-bleed §2.5.1: List-строка сама несёт свой вертикальный отступ, слот не должен добавлять поверх):

| Первый блок в слоте | slot `pT` | почему |
|---|---|---|
| **Текст / контрол** (label, Textarea, Chips, Switch…) | **16** (`section/padding-default`) | у контента нет своего вертикального инсета — 16 держит слот |
| **List / Menu-строка** (`List item`, `Context Menu item`, radio/checkbox-row) | **0** | строка — фиксированной высоты с центрированным контентом, т.е. **сама несёт ~14–16 внутреннего инсета**; слот `pT=16` поверх даёт визуальные ~30 («задвоение конструкцией») |

**Почему не `24/24` (старый канон):** симметричные 24 задваивались снизу с `pT` у Button area (контент→кнопка = 44, «дыра») и сверху с `pB=8` Header'а. А `pT=16` над List-строкой задваивался с её внутренним инсетом (~30 до текста). Оба задвоения — та же болезнь: **два паддинга подряд, один из которых уже внутри компонента.**

**Почему `pT`-токен из padding-семейства, а не `stack/*`:** это padding контейнера, а не gap между элементами стопки. `stack/*` живёт только на `itemSpacing` слота (gap между блоками контента). Путать семейства нельзя.

**Низ у `button=false`-шторок — по типу контента** (слот держит `pB=0`, низ — ответственность контента, симметрично горизонтали §2.5.1):

| Контент без кнопки | Низ держит | Значение |
|---|---|---|
| **Меню** (`List item` / `Context Menu item`) | safe-area | 12 — пункты до кромки, стандартный паттерн |
| **Текст / инфо** (пояснение, описание) | **контент-обёртка** (`inset-16` → `paddingBottom`) | **32** (`section/padding-spacious`) — иначе текст «прилипает» к safe-area |

Пример: `Translate message` `56698:42101` — большой пояснительный текст без кнопки; `inset-16` несёт `pB=32` (текст → 44 до кромки). Меню `56698:6529`/`6566`/`42083` — без нижнего инсета, до safe-area.

⚠️ Низ button=false-шторки НЕ решается паддингом слота (слот один на все типы) — только инсетом контента. Правки на стороне композиции, ре-паблиша не требуют.

#### 2.5.3 Памятка: как собрать шторку из своего контента

Один принцип на всё: **слот нейтрален, инсеты — на контенте. Не задваивай padding — если компонент уже несёт свой отступ (List-строка, full-bleed), слот НЕ добавляет поверх.**

Пошагово, когда кладёшь контент в `content slot`:

1. **Горизонт (всегда):** слот `pL/pR = 0`. `List item` / медиа / `Divider` кладёшь full-bleed (их 16 уже внутри — не обнулять). Текст / `Textarea` / кнопки / отдельные контролы — в 16-обёртку (`paddingLeft/Right = spacing/4`). (§2.5.1)

2. **Верх (`pT` слота) — смотри, ЧТО идёт первым:**
   - первый блок — **текст/контрол** → `pT = 16`;
   - первый блок — **List / Menu-строка** → `pT = 0` (строка сама держит отступ). (§2.5.2)

3. **Низ (`pB` слота) — смотри, есть ли кнопка:**
   - **есть Button area** (`button=true`) → `pB = 0` (нижний зазор даёт кнопочный блок);
   - **нет кнопки + меню** (List/Context Menu) → `pB = 0` (пункты до safe-area, норма);
   - **нет кнопки + текст/инфо** → `pB = 0` на слоте, а нижний воздух `32` вешаешь на **контент-обёртку** (`inset-16 → paddingBottom`), иначе текст прилипает к кромке. (§2.5.2)

4. **Между блоками:** `itemSpacing` слота — `stack/gap-2xloose` (24) между разными сущностями, `stack/gap-loose` (12) внутри одной группы. Тут `stack/*` уместен (это gap стопки). (См. `screen-assembly-spec §3`.)

**Проверка себя одним вопросом:** «этот отступ уже есть внутри компонента, который я кладу?» Если да — слот/обёртка его НЕ дублирует. Симптом задвоения — визуально ~30 там, где по цифрам 16.

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
| Panel fill | **`Surface/Surface Primary`** — на **root** компонента Bottom Sheet, не на отдельных кусках. Заливает Header, content slot, Button area, paddingBottom safe-area — одним монолитом. Header сохраняет собственный fill для standalone-использования вне Sheet'а (визуально дублирует root, без видимой разницы). |
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
| Body padding vertical (на слоте) | **`pT = section/padding-default` (16), `pB = 0`** — асимметрия (§2.5.2). Верх держит слот (Header даёт мало), низ — сосед снизу (Button area / safe-area). Padding-семейство, не `stack/*`. |
| Body padding horizontal (на слоте) | **0 — слот нейтральный.** Гориз. инсет 16 задаёт контент, не слот (§2.5.1: full-bleed List Item vs 16-обёртка для текста/контролов) |
| **Bottom safe-area** (root `paddingBottom`) | **spacing/3 (12 px)** — постоянный buffer между контентом / кнопкой и нижней кромкой панели. На iOS закрывается зоной Home Indicator; на Android даёт breathing room. Действует независимо от наличия Buttons Stack. |
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
| `Bottom Sheet` | `4584:1115` | Композиция корневой панели: Header + content slot + Button area (FRAME с дефолтным Buttons Stack) + 12 px safe-area. 360×597 (с button=true). BOOLEAN property `button` (default `true`) управляет видимостью Button area — при `false` фрейм истинно схлопывается в 0, без orphan-плашек. |

**Anchor=top / size=full/half/auto в Figma не реализованы** — эти axes описаны в §1 спеки на API-уровне (продуктовый код управляет позицией/высотой через props компонента), но в Figma представлен только `Bottom Sheet`-вариант. Top sheets — редкий паттерн, добавлять отдельный mockup-вариант не планируется до явной потребности.

В продуктовых файлах дизайнер собирает Sheet вручную: `HandleContainer` + `Header` (опционально) + контентный фрейм + размещение в context `bottom: 0` или через canvas-композицию.

---

## История миграций

**2026-09-20 — фикс горизонтальных паддингов (Figma-дрейф от §6, из аудита hub).**

- Симптом: контент прижат к левому краю, заголовок Header не совпадал с телом. Аудит указывал на инстанс в файле-потребителе (`PI3XrUDuoGyK4aXkqyzYoB`, `56693:7078`) — но там компонент **remote** (импорт), редактировать нельзя. Реальный редактируемый мастер — **`4584:1115` в UI-Kit (`PI2N65…`, тот же ключ `f6e53e6…`)**; дефект подтверждён в нём.
- Фикс в мастере:
  - **content slot** (SLOT, `4584:1115` → child): было `0/0/0/0` → стало **`16/16` (spacing/4) H, `24/24` (stack-md) V** — по §2.5 / §6.
  - **Header-мастер** `4535:6998` (все 4 варианта `Leading × Alignment`): H было `4/4` → стало **`16/16`** (§2.4 / §6). Инстанс Header внутри Bottom Sheet паддинг не оверрайдил — потому чинилось в мастере Header, а не в Bottom Sheet. Внутренний title-ряд имеет `pL=0` (двойного паддинга нет) — заголовок теперь на 16px, выровнен с телом.
- Значения §6 не менялись — спека была канон, дрейфил Figma. Проверено численно + рендером мастера.
- ⏳ **Остаётся под вопросом:** Header **vertical** в Figma = `4/8`, а §2.4/§6 пишут `spacing/3 (12)`. Не трогал (репорт был только про H; вертикаль завязана на отступы handle-контейнера внутри Header). Нужно решение: привести Figma к 12 или спеку к 4/8.
- Требуется **re-publish UI-Kit-Mobile** (вручную).

**2026-09-20 — верх слота по типу первого блока (List-строка → `pT=0`) + памятка сборщику.** List/Menu-строка сама несёт вертикальный инсет (фикс. высота с центр. контентом ~14–16); slot `pT=16` поверх давал визуальные ~30 («задвоение конструкцией»), хотя по цифрам верно. Правило: первый блок текст/контрол → `pT=16`, List/Menu → `pT=0`. Прогнано по 10 list-leading шторкам в `PI3XrU` (Report ×2, Жалоба ×4, меню/Действия). §2.5.2 + новая памятка §2.5.3 + `screen-assembly §6.1`. Compose-side, ре-паблиша не требует. Кейсы: `56698:6566`, `56693:42636`.

**2026-09-20 — канон вертикали слота: `24/24` → `16/0` (асимметрия).** Мастер Bottom Sheet (`4584:1115`) content slot: `pT 24→16`, `pB 24→0`. Причина — симметричные 24 задваивались снизу с Button area (контент→кнопка 44, «дыра») и сверху с Header `pB=8`. Основание — аудит всех 16 DS-шторок в `PI3XrU`: «Действия» в Отзывах дизайнер уже держал на `pB=0`. Верх остаётся на слоте (Header даёт мало), низ — на соседе (Button area / safe-area 12 для меню). §2.5.2. Требует ре-паблиша UI-Kit.

**2026-09-20 — фикс выравнивания заголовка Header (Leading=No).** Мастер Header (`4535:6998`): внутренний фрейм `Text` при `Leading=No` имел `pL=12` (оба Alignment) — заголовок уезжал на 28 вместо 16, не совпадал с телом. Приведено к `pL=0` (Leading=Yes `pL=4` не тронут). Косячило на всех headerless-шторках. Требует ре-паблиша UI-Kit. Кейс: `Report scam` `56696:6398` в `PI3XrU`. См. §2.4.

**2026-09-20 (корректировка) — content slot H откатан 16 → 0; горизонт. инсет вынесен в правило наполнения (§2.5.1).**

- Причина: единый гориз. паддинг на слоте ломает full-bleed-контент — у List Item двойной инсет (32) + клип правого чекбокса (кейс `56693:42636`, Report BS). Слот не может служить и списку (full-bleed), и тексту (инсет 16) одновременно.
- Итог модели: **слот нейтрален по горизонтали (0)**, вертикаль 24 остаётся; горизонт. инсет 16 — ответственность контента (List Item full-bleed; текст/контролы в 16-обёртке). Header H `16` НЕ откатан (это chrome, верно).
- Это **правило использования слота**, не значение компонента — продублировано в `screen-assembly-spec.md` для сборщика (`ds-build`).
- Исходный кейс `Translate BS` (`56698:42073`): текст должен лежать в 16-обёртке на стороне композиции — не паддингом компонента.

**2026-06-01 (вечер 3) — Bottom Sheet: root fill = Surface/Surface Primary (фон на компонент целиком, не на куски).**

После предыдущей правки (FRAME+BOOLEAN + 12 px safe-area) визуально оставалась проблема: фон шторки был зашит на отдельных кусках (Header — свой fill, Buttons Stack — своя плашка, content slot — designer ставит), а корневой `Bottom Sheet` (4584:1115) имел `fills: []`. Пустые зоны между кусками (включая 12 px safe-area внизу) рендерились прозрачно, создавая ощущение «дырки» — особенно когда `button=false` и контент короткий, 12 px полоска не «принадлежала» шторке.

Правка: на root `Bottom Sheet` привязан fill **`Surface/Surface Primary`** (тот же токен, что у Header'а — по правилу для sticky-контейнеров, см. [COLOR-PALETTE.md §3.2](https://gitlab.com/larixon-mobile/mdsl/-/blob/main/docs/COLOR-PALETTE.md#32-surface)).

Header сохраняет собственный fill — нужен для standalone-использования Header'а вне Sheet'а (например, в Top sheet или в нестандартной композиции). Визуально дублирует root, разницы нет; убирать не стал, чтобы не ломать standalone-кейсы.

**2026-06-01 (вечер 2) — Bottom Sheet: button slot перестроен из SLOT в FRAME + BOOLEAN, добавлена нижняя safe-area 12 px.**

**Проблема.** При сборке Sheet'а в продуктовом файле без bottom-кнопок designer наблюдал «дырку снизу» — пустой `button slot` (Figma SLOT-тип) в edit-view рендерил orphan-плашку «Add instances» в зарезервированной позиции (88 px высотой), оторванную от Sheet body. При публикации SLOT иногда схлопывался, иногда — нет. Параллельно: когда стек кнопок отсутствует, контент (List Item'ы, текст) упирался в нижнюю кромку панели — не было safe-area buffer'а.

**Что изменилось в master `4584:1115`.**

1. **`button slot` (SLOT, `4628:26291`) → `Button area` (FRAME, `9887:40`).** Внутри фрейма — дефолтный инстанс Buttons Stack Type=One. Существующая BOOLEAN property `button#5964:0` (default `true`) теперь bound к `Button area.visible`. Когда designer ставит `button=false`, фрейм истинно схлопывается в 0 — Figma корректно перерасчитывает высоту HUG-родителя, никаких orphan-плашек. Когда `button=true` — отображается дефолтный Buttons Stack; на инстансе можно swap'нуть на любой из 5 вариантов BS (Type=One / Two Horizontal / Two Horizontal Reverse / Two Vertical / Three Vertical) через стандартный nested-instance pick.

2. **Удалена dead SLOT-property `button slot#4585:2`** — больше не нужна, SLOT'а нет.

3. **`paddingBottom = 12` (`spacing/3`) на root Bottom Sheet'а.** Постоянный safe-area buffer между контентом / Buttons Stack и нижней кромкой панели. Действует независимо от `button` boolean'а. На iOS попадает в зону Home Indicator; на Android даёт визуальный breathing room.

**Trade-off.** SLOT-механика давала designer'у возможность подложить любой контент в button-зону (теоретически — не только Buttons Stack). На практике в нашем DS туда всегда кладут BS. Новая FRAME-механика проще: дефолт уже стоит, видимостью управляет boolean, swap variant'а Buttons Stack — через стандартный nested swap. Если когда-нибудь понадобится класть в bottom-зону что-то отличное от Buttons Stack — добавим INSTANCE_SWAP property на сам фрейм.

**Consumer-impact.**
- В продуктовых файлах: все существующие инстансы Sheet с `button=true` продолжают показывать Buttons Stack (теперь — из дефолта фрейма, а не из drop'нутого в SLOT). Если в slot был кастомный override — он сбросится на дефолтный BS. Sweep по продуктовым файлам после publish'а: проверить инстансы Sheet, в которых button slot был заполнен НЕ-BS контентом (вероятность близка к нулю, но проверить).
- Инстансы с `button=false` — без изменений (фрейм скрыт, контент имеет 12 px safe-area).
- API/код: ничего не меняется, `button` BOOLEAN остался тем же ключом (`button#5964:0`).

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
