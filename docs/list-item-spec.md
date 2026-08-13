# List Item — спецификация компонента

Элемент списка — основной строительный блок для экранов с перечислениями. Использует только семантические токены из **docs/DESIGN-TOKENS.md**, **docs/COLOR-PALETTE.md**, **docs/TYPOGRAPHY.md**.

**Figma:** страница **🟢 List Item**, набор **List item** (COMPONENT_SET).

---

## 1. Обзор

List Item — контейнер строки списка с опциональными слотами: Left Side, Content, Right Side. Поддерживает одно- и многострочный контент.

---

## 2. Варианты (variants)

| Свойство | Значения | Описание |
|----------|----------|----------|
| **Type** | `1 str` | Однострочный элемент (min-height **56 px**) |
| **Type** | `2+ str` | Многострочный элемент |
| **State** | `Default` | Активный, тапается |
| **State** | `Disabled` | Недоступное действие — визуально приглушено + non-tappable. См. §«Disabled state» |

Итого **4 варианта** (2 Type × 2 State).

**Touch target.** Для `1 str` минимальная высота строки — **56 px**, что превышает требование WCAG AA (44 × 44 pt) с запасом. Для `2+ str` высота растёт по контенту, нижняя граница не меньше `1 str`.

---

## 3. Структура слоёв

```
List Item (COMPONENT)
  ├── .=Left Side (instance, опционально)
  │   └── [Type=2+ str] обёрнут wrap-фреймом с paddingTop=spacing/1 (4 px) — align-top
  ├── .=Content (instance)
  └── .=Right Side (instance, опционально)
      └── [Type=2+ str] обёрнут wrap-фреймом с paddingTop=spacing/1 (4 px) — align-top
```

**Wrap-фреймы для `Type=2+ str`.** В многострочном варианте Left/Right слоты обёрнуты в дополнительные фреймы (`6054:3837`, `6054:3844`) с `paddingTop = spacing/1` (4 px). Это даёт визуальный align-top: икон-слоты прижимаются к верхней строке заголовка, а не центрируются по всему многострочному блоку. Для `1 str` обёрток нет — центрирование по высоте строки.

### Building blocks (вне аудита)

Слоты собираются из вспомогательных компонентов:

| Слот | Доступные типы |
|------|----------------|
| **Left Side** (10 типов) | Icon, Image, Video, Avatar, Icon button, Radio, Checkbox, Switch, **Brand**, **Checkbox + Brand** |
| **Right Side** | control-типы (Icon, Checkbox, Radio, Switch, Icon button, Accordion) + модификаторы `text` / `badge` + тип «Trailing text only» — см. ниже |
| **Content** (2 типа) | Основной (Title + Subtitle), с Overline |

#### Геометрия слотов и модификаторы (reconciliation LIOS-2525, 2026-08-12)

**Left Side — геометрия:**

| Тип | Размер | Радиус | Особенности |
|---|---|---|---|
| **Icon** | **40 × 40** (иконка 24 в боксе, padding 8, центр) | — | 40-бокс, чтобы тайтлы выстраивались в одну колонку со строками Checkbox / Radio / Switch |
| **Image** | 56 × 56 | 4 | **без full-frame скрима** (plain-фото — чистое); bool `selected` → маркер 20 pt: круг `Accent/Primary` + галка **`Text&Icon/Inverted W-B`** (не White applied — §checkbox-spec 4) |
| **Video** | 114 × 64 | 4 | **без full-frame скрима**; play-кнопка по центру = круг **`Background/Overlay`** ⌀32 + треугольник **`Text&Icon/White applied`** (self-contained, §11) |

> **Скрим на фото-слотах — по §11 [composition-rules](./composition-rules.md#11).** Full-frame скрим на тумбнейл **не кладём**: он нужен только под белым контентом, а `Background/on-photo` в Dark переворачивается в white 50 % (белый контент пропадает — `on-photo` это photo-tint, не scrim). Контраст обеспечивают **сами оверлей-элементы**: play-кнопка = `Background/Overlay` + `White applied`; selected-маркер = `Accent/Primary` + `Inverted W-B` (как галка Checkbox, т.к. `Accent/Primary` инвертируется по теме). Решение reconciliation LIOS-2525 §F1/F3 (2026-08-13).
| **Avatar** | 40 | round | фото / инициалы |
| **Brand / Checkbox+Brand** | 40 (logo 32) | — | см. под-секции ниже |

**Accordion** (Right Side) — это **ButtonIcon Ghost 32** с иконкой `16 / ic_expand_more`; развёрнутое состояние = **поворот глифа на 180°** (отдельного `ic_expand_less` нет).

**Right Side — `text` и `badge` это модификаторы, а не плоские типы.** Булевы `text` / `badge` применимы поверх control-типов (Icon, Checkbox, Radio, Switch, Icon button), плюс отдельный тип **«Trailing text only»**. Порядок элементов в ряду: **текст → бейдж → контрол**, gap **8** (`spacing/2`).

**Цвет trailing text — по роли:**
- `Text&Icon/Primary` — когда текст единственный элемент слота («Trailing text only» = «значение»);
- `Text&Icon/Secondary` — когда рядом есть бейдж или контрол (текст становится подписью).

#### Composite Type=Checkbox + Brand

Для multiselect-списков, где каждой строке нужен и чекбокс выбора, и брендированный маркер (логотип марки авто, категории, и т.п.).

| Параметр | Значение | Токен |
|---|---|---|
| Размер | 84 × 40 | — |
| Layout | HORIZONTAL | — |
| paddingLeft | 8 | `spacing/2` |
| paddingRight | 0 | — |
| itemSpacing (gap чекбокс ↔ logo wrap) | 12 | `row/gap-loose` |
| Состав | [Checkbox 24] + gap + [Logo wrap 40] | — |
| primaryAxisAlignItems | MIN | — |
| counterAxisAlignItems | CENTER | — |

**Структура Logo wrap (40 × 40):**

| Параметр | Значение | Токен |
|---|---|---|
| Layout | HORIZONTAL, FIXED × FIXED | — |
| padding (all) | 4 | `spacing/1` |
| primaryAxisAlignItems | CENTER | — |
| counterAxisAlignItems | CENTER | — |
| fills | transparent | — |
| Содержимое | Logo instance 32 × 32 (INSTANCE_SWAP) | — |

Inline auto-layout frame без отдельного компонента-обёртки. Логотип — instance компонента `Logo` (32 × 32) из коллекции Larixon Assets / Car. Размер обёртки фиксирован (40 × 40 как у других Left Side variant'ов с иконкой), внутри логотип центрирован.

**INSTANCE_SWAP `Logo` — на уровне Left Side set** (`5912:6666`, key `Logo#9867:0`). Property с 15 preferred values (популярные авто-бренды). Свойство автоматически экспонируется через nested instance в `List item` (`6054:3813`) и `.=List item` (`5912:3783`) — designer может менять логотип прямо из panel'и List Item без захода во внутреннюю обёртку.

**Зачем paddingLeft=8 и не CENTER:** чтобы чекбокс этого варианта попал на ту же абсолютную X-координату, что чекбокс варианта `Type=Checkbox` (где он центрирован в 40-px слоте → x=8). При использовании в смешанном списке (некоторые row с брендом, некоторые без) — чекбоксы выровнены в одну колонку.

**⚠️ Gotcha (учитывать при имплементации):** в Figma при смене Type вариант'а Left Side инстанса (например, из `Checkbox` → `Checkbox + Brand`) — Figma НЕ автоматически меняет gap/padding/sizing-mode инстанса на дефолты нового variant'а. Нужно вручную:
- Поставить `layoutSizingHorizontal = HUG`
- При необходимости explicit'но обновить itemSpacing и padding

Это известный bug инстанс-override'ов. В коде проблемы нет — там значения берутся из variant'а напрямую.

**Особенно важно для `Checkbox + Brand`:** мастер вариант 84×40 (checkbox 24 + gap 12 + logo wrap 40 = 76, плюс padding 8 → 84). Если инстанс остался с `lsH=FIXED, width=40` (legacy override от Type=Avatar), logo wrap **отрезается** справа — кажется что логотип «не виден». Лечение: выделить Left Side инстанс → правая панель → переключить `Fill container` (W) на **`Hug contents`**.

**Batch fix для product-файлов** (если уже накопилось много инстансов с legacy-override): найти все `List Item / Left Side` с `Type=Checkbox + Brand` и `lsH=FIXED`, поставить им HUG. На PB-800 (multiselect марок авто) этим способом исправлено 60 инстансов одним проходом — без этого все 60 показывали только чекбокс без логотипа.

#### Type=Brand (standalone логотип)

Логотип/бренд-маркер **без** чекбокса — для строк с крупным полноцветным медиа-маркером: логотипы марок авто (Cars-экран постинга, PB-1581), банков, платёжных методов (Visa / MC / Apple Pay), партнёров, флаги валют, крупные категорийные иконки. Standalone-сиблинг композита `Checkbox + Brand` (тот же логотип, минус чекбокс).

| Параметр | Значение | Токен |
|---|---|---|
| Размер | 40 × 40 (HUG) | — |
| Обёртка (Logo wrap) | 40 × 40, fills transparent, `padding=spacing/1` (4) | — |
| Содержимое | `Logo` instance 32 × 32 (INSTANCE_SWAP) | — |
| Выравнивание | flush к левому краю слота (`paddingLeft=0`), как Avatar / Image | — |

**Переиспользует тот же `Logo#9867:0` INSTANCE_SWAP**, что и `Checkbox + Brand` (15 пресетов авто-брендов; swap'ается на любой 32-image). Собран клоном `Checkbox + Brand` минус чекбокс — проводка свойства `Logo` сохранена. Node в наборе Left Side `5912:6666`.

**Имя «Brand».** Выбрано для консистентности с `Checkbox + Brand`. Контент swap'а гибкий (логотип / флаг / платёж / категория) — имя описывает роль слота (бренд-маркер), не ограничивает содержимое. Альтернативы (`Logo`, `Media`) отклонены: `Logo` разъехался бы с composite-именем, `Media` путается с `Image`/`Video`.

**Когда что (leading media):**
- **Icon** (24, монохромный glyph на `Text&Icon`) — системные иконки.
- **Brand** (40 / 32, полноцветный image) — логотипы, бренды, платёжные методы, флаги.
- **Avatar** (40, round) — фото / инициалы пользователя.
- **Image** (56) — фото-тумбнейл; **Video** — видео-превью.

**Code-side (Compose):** добавить leading-вариант Brand (40-box + 32 logo-slot, transparent wrap) — отдельный таск, см. tracker `tasks/PB-1581`.

---

## 3a. Disabled state

Использовать для строк, которые **временно недоступны** — действие, уже выполненное (например, «Respond to the review» после того как ответ дан), фича, недоступная по подписке, sold-out brand в multiselect и т.п.

**Визуальные изменения в `State=Disabled`:**

| Элемент | Изменение | Mechanism |
|---|---|---|
| Content (Overline / Label text / Supporting text) | fill → `Text&Icon/Tertiary` | Per-variant fill binding на TEXT nodes в master'е variant'а |
| Left Side instance | `opacity: 0.4` | Per-variant opacity на инстансе |
| Right Side instance | `opacity: 0.4` | Per-variant opacity на инстансе |
| Background / Border | без изменений | — |

**Почему opacity для Left/Right Side, а не fill binding:** Left Side имеет 10 типов (Icon, Image, Video, Avatar, Icon button, Radio, Checkbox, Switch, Brand, Checkbox+Brand), Right Side — 8 типов. Перебивать fills во всех типах генерически невозможно без добавления State axis в наборы `List Item / Left Side` (`5912:6666`) и `List Item / Right Side` (`5912:6691`). Opacity 0.4 — универсальный shortcut: приглушает всё содержимое одной командой, независимо от type variant'а.

> ⚠️ **Phase 1 ограничение:** opacity не различает Dark/Light mode. На светлой теме 40% от Primary даёт визуально близкое к Tertiary. На тёмной — может оказаться слишком тускло (Primary в Dark уже не такой яркий, 40% от него — низкая контрастность). Если в Dark mode disabled state читается плохо — Phase 2: пробрасывать State в Left/Right Side наборы и красить через fill-токены.

**Поведение в коде:**

- **Non-tappable** — `onClick` игнорируется, `pointerEvents: none` (web), `isUserInteractionEnabled = false` (iOS), `enabled = false` (Android).
- **Visual-only** disabled тоже валиден — например, для «coming soon»-кейсов, где tap открывает explanation toast/dialog «недоступно потому что …». В этом случае разработка переопределяет `pointerEvents` на стороне consumer'а, оставляя визуальное состояние Disabled. Master не предписывает поведение жёстко.

**Use case (зафиксированный):**

В Sellers / Reviews — на каждом отзыве доступны 2 действия в шторке: «Respond to the review» / «Appeal the review». Если ответ уже дан, action item «Respond» переходит в `State=Disabled` (нельзя ответить второй раз) и non-tappable. Action «Appeal» остаётся активным.

---

## 4. Таблица токенов

### Размеры и отступы

| Параметр | Значение | Токен | Примечание |
|----------|----------|-------|------------|
| Width (variant root) | iOS: 320 px, Android: 360 px | `Platform/Width` | FIXED |
| itemSpacing | 16 px | `spacing/4` | Gap между Left / Content / Right |
| paddingTop | 8 px | `spacing/2` | |
| paddingBottom | 8 px | `spacing/2` | |
| paddingLeft | 16 px | `spacing/4` | |
| paddingRight | 16 px | `spacing/4` | |
| Wrap padding (Left/Right, `Type=2+ str`) | 4 px (top) | `spacing/1` | Align-top для многострочного контента — см. §3 |
| Gap внутри Right Side слота | 8 px | `spacing/2` | между text / badge / control |

### Content slot

| Content | Состав | Когда брать |
|---------|--------|-------------|
| **Основной** | Title + опц. Subtitle | Стандартная строка списка |
| **С Overline** | Overline + Title + опц. Subtitle | Когда нужна категория/контекст над заголовком (статус, дата, группа) |

Размеры внутренние (line-height текста) — задаются стилями из `docs/TYPOGRAPHY.md`, вне табличной части.

### Цвета

По **docs/COLOR-PALETTE.md**. Все цвета привязаны к семантическим токенам — покрытие **100%**.

**Уточнения (LIOS-2525):**
- **Overline** в `State=Default` — `Text&Icon/Secondary` (канон ранее называл цвет только для `Disabled`).
- **Фон строки** — прозрачный: красит контейнер / состояние, сам List Item фон не держит.
- **Trailing text** — цвет по роли (Primary / Secondary), см. §3 «Геометрия слотов и модификаторы».

### Типографика

По **docs/TYPOGRAPHY.md**. Все текстовые стили привязаны к токенам — покрытие **100%**.

| Слой | Стиль | Значение |
|---|---|---|
| Overline | `Caption/caption-md Medium` | 12 / 16, w500 |
| **Заголовок** (`Label text`) | **`Base/Body 1`** | **16 / 24, w400 (regular)** |
| Supporting text | `Base/Body 2` (secondary) | 14 / 20 |
| Trailing text (Right Side) | `Base/Body 2 Medium` | 14 / 20, w500 |

> **⚠️ Заголовок = `Body 1` (16/24, regular), НЕ `Body Dense Medium`.** Стиль `Base/Body Dense Medium` (16/20, w500), который может всплыть в token-аудите, принадлежит **инициалам аватара** (`Left Side > Avatar > AB`), а не заголовку строки. Не путать: заголовок живёт в слое `List Item / Content > Label text`. Подтверждено 2026-07-13.

---

## 5. Аудит покрытия токенами

| Категория | Покрытие |
|-----------|----------|
| Color | **100%** |
| Token | **100%** |
| Type (текст) | **100%** |
| Overall | **100%** |

---

## 6. Синхронизация с кодом

**Web (React):**
```tsx
<ListItem
  type="single-line"
  leftSlot={<Avatar size="m" />}
  rightSlot={<Icon name="chevron-right" />}
>
  <ListItemContent title="Title" />
</ListItem>

<ListItem
  type="multi-line"
  leftSlot={<Checkbox />}
  rightSlot={<Badge size="xs" variant="info">3</Badge>}
>
  <ListItemContent title="Title" subtitle="Subtitle" overline="Overline" />
</ListItem>
```

**iOS (SwiftUI):**
```swift
ListItemView(type: .singleLine) {
    AvatarView(size: .m)
} content: {
    ListItemContent(title: "Title")
} trailing: {
    Image(systemName: "chevron.right")
}
```

**Android (Compose):**
```kotlin
ListItem(
    headlineContent = { Text("Title") },
    supportingContent = { Text("Subtitle") },
    leadingContent = { Avatar(size = AvatarSize.M) },
    trailingContent = { Badge(size = BadgeSize.XS, variant = Info) { Text("3") } },
)
```

---

## 7. Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
- [TYPOGRAPHY.md](./TYPOGRAPHY.md) — текстовые стили
- [divider-spec.md](./divider-spec.md) — разделитель между элементами списка
- [radio-spec.md](./radio-spec.md) — Radio как building block
- [checkbox-spec.md](./checkbox-spec.md) — Checkbox как building block
- [switch-spec.md](./switch-spec.md) — Switch как building block
- [badge-spec.md](./badge-spec.md) — Badge как building block
- [avatar-spec.md](./avatar-spec.md) — Avatar как building block
- [composition-rules.md](./composition-rules.md) — правила композиции экрана со списками

---

## 8. История миграций

**2026-08-13 — reconciliation LIOS-2525, раунд 2 (QA + фото-слоты в Dark).**
- **F1 (фикс канона):** §3 «оверлей `Background/on-photo`» на Image/Video было **ошибкой** — противоречит [composition-rules §11](./composition-rules.md#11) (on-photo = photo-tint, не scrim; в Dark он white 50 %) и [checkbox-spec §4](./checkbox-spec.md) (галка на `Accent/Primary` = `Inverted W-B`, не White applied). Переписано: **без full-frame скрима**; контраст несут сами оверлей-элементы (play = `Background/Overlay` + `White applied`; selected-маркер = `Accent/Primary` + `Inverted W-B`).
- **F3 (блокер, решено):** вуаль на **невыбранном/plain** фото **не нужна** — скрим только под белым контентом (§11). Plain Image/Video = чистое фото.
- **E (QA-дефекты Dark, закрыты dev по канону):** тумбнейл-скрим → `Background/Overlay` (не on-photo); selected-галка → `Inverted W-B`. Оба — существующие правила (§11, checkbox-spec §4), совпали с Android (LAA-3723).
- **F2 (отдельный тикет):** значения токенов `Overlay`/`on-photo` разъехались Figma↔канон↔iOS↔Android — свести отдельно (не в скоупе List Item).
- Figma-мастер: play-кнопка перепривязана на токены (`Background/Overlay` + `White applied`), убран on-photo с тумбнейлов, selected-галка → `Inverted W-B`.

**2026-08-12 — reconciliation с iOS-имплементацией (LIOS-2525).** По итогам dev-сверки внесены правки канона:
- §3 — **Right Side** переписан как control-типы + модификаторы `text` / `badge` + «Trailing text only»; добавлена **геометрия Left Side** (Icon 24 в **40-боксе**, Image 56 r4 + overlay + `selected`-маркер, Video 114×64 r4 + overlay + **play**); **Accordion** = ButtonIcon Ghost 32 + `ic_expand_more`, раскрытие = поворот 180°.
- §4 — **gap 8** внутри Right Side слота; **Trailing text = `Base/Body 2 Medium`** (14/500/20 — решение A1: Figma прав, Confluence Q9/Body 1 отменён, Android синкнуть); цвет **Overline в Default = Secondary**; фон строки прозрачный; цвет trailing по роли (Primary один / Secondary с бейджем-контролом).
- Figma-мастер обновлён: Video play-кнопка (`5912:6675`), Icon 40-бокс (`5912:6667`). Disabled opacity 0.4 — Phase 1 как есть, Phase 2 = токены per-slot для dark-контраста.

**2026-06-01 (вечер 4) — добавлен `State = Default / Disabled` variant axis.**

Use case: в Sellers / Reviews шторка действий («Respond to the review» / «Appeal the review»). Когда ответ уже дан, action item «Respond» должен переходить в недоступное состояние — визуально приглушённое + non-tappable.

Реализация — Phase 1 на уровне ListItem set:
- Set 6054:3813 расширен с 2 до **4 вариантов** (Type=1 str / 2+ str × State=Default / Disabled). Существующие 2 variant'а переименованы с `Type=N`, на `Type=N, State=Default`. Добавлены 2 новых variant'а — клоны c name `Type=N, State=Disabled`. Figma auto-detect добавил `State` ось.
- В Disabled-вариантах: text fills (Overline, Label text, Supporting text) → `Text&Icon/Tertiary`; Left Side instance + Right Side instance → `opacity: 0.4`.
- Не пробрасываю State в наборы `List Item / Left Side` и `List Item / Right Side` — это Phase 2, появится когда столкнёмся с кейсом, где disabled-state внутреннего Checkbox/Switch/Radio критичен (текущий use case — иконка + текст, opacity-shortcut работает).

Подробности — §3a «Disabled state» спеки.

**2026-06-01 (вечер) — рефактор Type=Checkbox + Brand: убран атом Brand Mark, логотип inline.**

Brand Mark существовал как отдельный атом-обёртка (40 × 40 transparent frame + Logo 32 × 32 внутри с INSTANCE_SWAP). По факту это padding-обёртка без собственной логики — auto-layout frame с тем же padding делает то же самое без лишней сущности в DS.

Что изменилось:
- В variant'е Type=Checkbox + Brand (`9264:18`) Brand Mark instance `9264:25` заменён на inline `Logo wrap` (FRAME 40 × 40, padding 4 на 4, layoutMode=HORIZONTAL, centering CENTER/CENTER).
- Внутри Logo wrap — Logo instance 32 × 32 с INSTANCE_SWAP.
- INSTANCE_SWAP property `Logo` перенесена с уровня Brand Mark на уровень `List Item / Left Side` set (`5912:6666`, key `Logo#9867:0`). 15 preferred values сохранены.
- Атом Brand Mark (`9264:13`) и `brand/Placeholder` (`9264:11`) удалены из master-файла. Страница `🟢 Brand Mark` оставлена, на ней — demo-фрейм Search-Suggest 360 (не связан с компонентом).
- `brand-mark-spec.md` удалён.

**Почему так лучше:**
1. Минус одна сущность в DS (Brand Mark атом был обёрткой ради обёртки).
2. INSTANCE_SWAP теперь на Left Side set — designer меняет логотип прямо из panel'и List Item (раньше нужно было войти в Brand Mark override).
3. Структура иерархии короче: было `list-item → left-side → brand-mark → logo → asset`, стало `list-item → left-side → logo → asset`.

Consumer-impact: только master `9264:18`. Всего 1 инстанс Brand Mark существовал во всём UI-Kit-Mobile (именно в этом master). PB-800 (60 multiselect-инстансов марок авто) использует **List Item**, не Brand Mark — там после publish'а свапнутся автоматически.

**2026-05-20 — добавлен composite Type=Checkbox + Brand.**

- §3 «Building blocks»: Left Side получил 9-й тип `Checkbox + Brand` для multiselect-списков с брендированными маркерами
- Добавлена под-секция «Composite Type=Checkbox + Brand» с размерами и токенами
- Зафиксирован gotcha с override'ами Figma при смене Type variant'а
- Введён новый атом Brand Mark (40 × 40 transparent + Logo 32 × 32), на котором строится composite. _**2026-06-01:** атом удалён, логотип переведён inline — см. запись выше._
- Контекст: задача PB-876 (multiselect марок авто), но паттерн универсальный для любых брендированных списков

---



**2026-05-12 — аудит готовности (component-spec-check).**

Figma уже на актуальных значениях; правки только в тексте спеки — синхронизация трёх spacing-параметров с реальным состоянием компонента:

- §4 `paddingLeft/Right`: 4 px → **16 px** (`spacing/1` → `spacing/4`). Убрана устаревшая записка про «исходно 2 px, bumped до 4 px» — это старая история, не актуальна.
- §4 `paddingTop/Bottom`: 4 px → **8 px** (`spacing/1` → `spacing/2`).
- §4 `itemSpacing`: 8 px → **16 px** (`spacing/2` → `spacing/4`).
- §3 «Структура слоёв»: добавлено описание wrap-фреймов (`6054:3837`, `6054:3844`) с `paddingTop = spacing/1` (4 px) для align-top в `Type=2+ str`.
- §2 «Варианты»: добавлено упоминание min-height = 56 px для `1 str` (WCAG AA touch target с запасом).
- §4: добавлена под-таблица «Content slot» — фиксирует вариант «с Overline» (упоминался в §3, но без описания).

List Item → ✅ готов к разработке.
