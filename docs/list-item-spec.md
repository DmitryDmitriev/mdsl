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

Итого **2 варианта**.

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
