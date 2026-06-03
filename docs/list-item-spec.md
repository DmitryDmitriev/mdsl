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
| **Left Side** (9 типов) | Icon, Image, Video, Avatar, Icon button, Radio, Checkbox, Switch, **Checkbox + Brand** |
| **Right Side** (8 типов) | Icon, Trailing text, Checkbox, Radio, Switch, Icon button, Accordion, Badge |
| **Content** (2 типа) | Основной (Title + Subtitle), с Overline |

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

**Почему opacity для Left/Right Side, а не fill binding:** Left Side имеет 9 типов (Icon, Avatar, Image, Video, Avatar, Icon button, Radio, Checkbox, Switch, Checkbox+Brand), Right Side — 8 типов. Перебивать fills во всех типах генерически невозможно без добавления State axis в наборы `List Item / Left Side` (`5912:6666`) и `List Item / Right Side` (`5912:6691`). Opacity 0.4 — универсальный shortcut: приглушает всё содержимое одной командой, независимо от type variant'а.

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

### Content slot

| Content | Состав | Когда брать |
|---------|--------|-------------|
| **Основной** | Title + опц. Subtitle | Стандартная строка списка |
| **С Overline** | Overline + Title + опц. Subtitle | Когда нужна категория/контекст над заголовком (статус, дата, группа) |

Размеры внутренние (line-height текста) — задаются стилями из `docs/TYPOGRAPHY.md`, вне табличной части.

### Цвета

По **docs/COLOR-PALETTE.md**. Все цвета привязаны к семантическим токенам — покрытие **100%**.

### Типографика

По **docs/TYPOGRAPHY.md**. Все текстовые стили привязаны к токенам — покрытие **100%**.

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
