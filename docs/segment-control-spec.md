# Segment Control — спецификация для разработки

**Один компонент — одна спека.** Android-style сегментированный контрол (M3-паттерн), адаптированный под палитру и типографику Larixon Mobile DS.

Привязка к **docs/COLOR-PALETTE.md**, **docs/TYPOGRAPHY.md**, **docs/DESIGN-TOKENS.md**. Все цвета, размеры, радиусы и текстовые стили — только через семантические токены.

Figma: страница **🟢 Segment Control**, набор **Segmented control** (`888:7950`), 10 вариантов в COMPONENT_SET + 5 building blocks (`.=Building Blocks/Label only`, `Classic Label only`, `Icon only`, `Icon and label`, `Classic Icon and label`).

iOS Apple-native Segment Control упразднён — замещён `Tabs` (Radix-стиль).

---

## Обзор

Segment Control — горизонтальный набор взаимоисключающих опций (как radio-group, но визуально как полоса капсул). Один сегмент всегда выбран, выбор меняется кликом.

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Type** | Fixed, Scrollable |
| **Style** | Primary, Secondary |
| **Configuration** | Label-only, Icon-only, Label & Icon |

Итого **10 вариантов** (Icon-only существует только с Style=Primary, поскольку Secondary без подписи не несёт смысла; см. матрицу ниже).

| Configuration | Primary | Secondary |
|---|---|---|
| **Label-only** | ✅ | ✅ |
| **Icon-only** | ✅ | — |
| **Label & Icon** | ✅ | ✅ |

× 2 (Fixed/Scrollable) = 10.

### Type: Fixed vs Scrollable

- **Fixed.** Все сегменты делят ширину контейнера поровну (`FILL`). Используется когда сегментов 2–4 и они помещаются без переноса.
- **Scrollable.** Сегменты по контенту (`HUG`), контейнер скроллится горизонтально. Используется когда сегментов 5+ или подписи длинные.

### Style: Primary vs Secondary

- **Primary.** Активный сегмент подчёркивается линией (indicator снизу) на нейтральном фоне. Применяется как **главная навигация** внутри страницы (фильтры верхнего уровня, переключение режимов отображения).
- **Secondary.** Активный сегмент закрашивается «капсулой» с заливкой `Background/Tertiary`. Применяется как **вторичный** контрол (вложенный фильтр, переключатель внутри карточки).

---

## Структура слоёв

```
Segmented control (HORIZONTAL, FILL width)
└── Segment[] (HUG | FILL — зависит от Type)
    ├── Content (HORIZONTAL/VERTICAL — зависит от Configuration)
    │   ├── Icon       (24, optional — Icon-only / Label & Icon)
    │   └── Label      (TEXT, optional — Label-only / Label & Icon)
    └── Indicator      (только Style=Primary, активный сегмент)
```

### Configuration → внутренняя раскладка

| Configuration | Layout | Что внутри |
|---|---|---|
| **Label-only** | — | Только `Label` |
| **Icon-only** | — | Только `Icon` 24 × 24 |
| **Label & Icon** | VERTICAL stack, gap = `spacing/1` (4) | `Icon` сверху + `Caption sm` подпись снизу — компактная капсула 65 px высотой |

**Важно про «Label & Icon»:** в M3-паттерне иконка сверху, подпись снизу (это и даёт высоту 65 px против 49 px у label-only). Если нужно «иконка слева от подписи» — использовать `Tabs` или ChipsGroup, не Segment.

---

## Размеры

| Параметр | Label-only / Icon-only | Label & Icon |
|---|---|---|
| **Высота сегмента** | 48 (`control-height/md`) | 64 |
| **Padding H** | `spacing/4` (16) | `spacing/4` (16) |
| **Padding V** | 0 (центрирование по высоте) | `spacing/2` (8) |
| **Gap** между Icon и Label | — | `spacing/1` (4) |
| **Icon size** | `size/sm` (24) | `size/sm` (24) |
| **Container border** | `border/1` (1) | `border/1` (1) |

В Figma высота капсулы Label & Icon — 65 px (включая ободок), внутреннее содержимое 64 px по факту.

---

## Радиусы

В Figma на корневом контейнере и индивидуальных сегментах `cornerRadius = 0`. Сегменты — плоские, со сплошным нижним indicator-line для Primary и заливкой для Secondary. Вертикальные сепараторы между сегментами рисуются через `border-left`.

| Элемент | Радиус |
|---|---|
| Контейнер (внешний) | 0 |
| Сегмент | 0 |
| Indicator (Primary) | 0 (прямоугольник 2 × ширина текста) |
| Капсула (Secondary, активный) | 0 (плоский прямоугольник с заливкой `Background/Tertiary`) |

> **Без скруглений по дизайн-решению.** Если в продукте понадобится capsule-вариант (M3 default), добавлять отдельным variant'ом или паттерном, не модифицируя текущий компонент.

---

## Цвета по состояниям

По **docs/COLOR-PALETTE.md**.

### Контейнер

| Элемент | Токен | Light | Dark |
|---|---|---|---|
| Background (бар + все табы) | `Surface/Surface Primary` | #ffffff | Zinc/800 |
| Border | `Border/Default` | Zinc/200 | Zinc/700 |

**Почему `Surface/Surface Primary`, а не `Background/Primary`.** Segment Control — это **elevated surface**: в продакшене он часто sticky (примагничен к верху экрана / низу TopAppBar), а под ним скроллится контент. В Light оба токена = `#ffffff` — визуально без разницы. В **Dark** разница критична: `Surface/Surface Primary` = Zinc/800, `Background/Primary` = Zinc/950 — это 2 шага elevation, что даёт визуальный контраст между баром и скроллящимся за ним содержимым. Без Surface бар в dark mode сливался бы со screen background.

Все 90 fills внутри SET (root + tab N + building-block instances) — на `Surface/Surface Primary` единообразно. Это сохраняет elevation-контекст: каждый сегмент наследует поверхность бара, выбранный сегмент отличается indicator-line / акцентной заливкой, а не сменой surface-уровня.

### Сегмент (Primary)

| State | Label / Icon | Indicator | Background |
|---|---|---|---|
| **Default** | `Text&Icon/Secondary` | hidden | `transparent` |
| **Active** | `Accent/Primary` | `Accent/Primary` (line 2 px снизу) | `transparent` |

### Сегмент (Secondary)

| State | Label / Icon | Background |
|---|---|---|
| **Default** | `Text&Icon/Secondary` | `transparent` |
| **Active** | `Accent/Primary` | `Background/Tertiary` |

**Disabled-state — не зашит в variant-матрицу.** В Figma COMPONENT_SET оси `State` нет (Default ↔ Active передаётся не через variant, а через override иконки/индикатора). Disabled-режим рендерится **на стороне продукта** через родительский контейнер: `aria-disabled="true"` + `pointer-events: none` + `opacity: 0.4`. На самом сегменте отдельных Disabled-токенов не существует — это упрощает variant matrix и согласуется с тем, что Segment Control обычно либо весь активен, либо весь disabled (групповой контрол).

**Замечание про hover/pressed.** Pressed/Hover-состояний нет (см. project_larixon_mds.md §«Ключевые архитектурные решения» п.5). Если вернёмся к overlay-токену — добавим в обе Style.

---

## Типографика

После миграции 2026-05-07 все building blocks привязаны к canonical стилям из **docs/TYPOGRAPHY.md**.

| Configuration | Стиль | Размер | Когда |
|---|---|---|---|
| **Label-only / Classic Label only** | `Base/Body 2 Medium` | 14/20 | Подпись на сегменте без иконки |
| **Label & Icon — нижняя подпись** | `Caption/caption-sm Medium` | 10/12 | Подпись под иконкой в компактной капсуле (building blocks `Icon and label` и `Classic Icon and label`) |

**Никаких raw-значений.** Если в задаче не хватает существующего типографического стиля — поднимать в TYPOGRAPHY.md, не вводить локальный hardcode.

---

## Иконки

- Только префикс `ic_*` из **Larixon Assets** (`16 / setting`, `32 / info_fill` и legacy без префикса — не использовать).
- Размер внутри сегмента — 24 × 24 (`size/sm`).
- Цвет иконки управляется **через override fill** на ноде Union (см. `project_icons_assembly.md`) и привязан к токену `Text&Icon/*` соответствующему состоянию (см. таблицу выше).

---

## Сводная таблица токенов

| Параметр | Label-only | Icon-only | Label & Icon |
|---|---|---|---|
| Height | `control-height/md` (48) | `control-height/md` (48) | 64 (раскладка iconLabel) |
| Padding H | `spacing/4` (16) | `spacing/4` (16) | `spacing/4` (16) |
| Padding V | — | — | `spacing/2` (8) |
| Gap (icon→label) | — | — | `spacing/1` (4) |
| Icon size | — | `size/sm` (24) | `size/sm` (24) |
| Border width | `border/1` (1) | `border/1` (1) | `border/1` (1) |
| Label style | `Base/Body 2 Medium` (14/20) | — | `Caption/caption-sm Medium` (10/12) |

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fills / strokes) | **100%** (после фикса 12 hardcode `#49454f` 2026-05-06) |
| 🔤 Typography | **100%** (после миграции 2026-05-07) |
| 🔲 Tokens (sizes / spacing) | **100%** |
| **Overall** | **100%** |

Hardcoded в Segmented control = 0 (артефакты Figma editor / icon library / decorative SVG не учитываются — см. `migration-baseline.md`).

---

## Доступность (a11y)

- **Tap-зоны.** Сегменты Label-only / Icon-only — 48 px (`control-height/md`), что соответствует WCAG/HIG (≥ 44 pt). Label & Icon — 64 px, с запасом.
- **Семантика.** `role="tablist"` на контейнере (если используется как навигация) или `role="radiogroup"` (если как фильтр), `role="tab"` / `role="radio"` на сегментах. Активный — `aria-selected="true"` / `aria-checked="true"`.
- **Клавиатура.** ←/→ — переключение между сегментами, Tab — выход из группы. На активном — Enter/Space.
- **Контраст.** `Text&Icon/Secondary` на `Background/Primary` — WCAG AA (≥ 4.5:1) проверен в палитре.
- **Disabled.** Управляется на родителе: `aria-disabled="true"` + `pointer-events: none` + `opacity: 0.4`. На самом сегменте отдельных Disabled-вариантов нет.

---

## Синхронизация с кодом

**Web (React):**
```tsx
<SegmentControl
  type="fixed"            // "fixed" | "scrollable"
  style="primary"         // "primary" | "secondary"
  value={selected}
  onChange={setSelected}
>
  <SegmentControl.Item value="all" label="All" icon={<IconAll />} />
  <SegmentControl.Item value="new" label="New" icon={<IconNew />} />
  <SegmentControl.Item value="popular" label="Popular" />
</SegmentControl>
```

CSS-переменные (из существующих токенов):
```css
--segment-height-md:        var(--control-height-md);   /* 48 */
--segment-height-icon-label: 64;                        /* off-scale, design constant */
--segment-padding-h:        var(--spacing-4);           /* 16 */
--segment-padding-v:        var(--spacing-2);           /* 8  (icon-label only) */
--segment-gap:              var(--spacing-1);           /* 4  (icon→label) */
--segment-icon:             var(--size-sm);             /* 24 */
--segment-border:           var(--border-1);            /* 1  */
--segment-radius:           var(--radius-control-md);   /* по шкале */
```

---

## Когда использовать что

| Кейс | Компонент |
|---|---|
| Главная навигация по вкладкам страницы (3+ раздела, скроллится) | **Tabs** |
| 2–4 взаимоисключающих режима в шапке экрана | **Segment Control** Primary, Fixed |
| Фильтр внутри карточки или sheet (вложенный) | **Segment Control** Secondary, Fixed |
| Длинный список фильтров с горизонтальным скроллом | **Segment Control** Scrollable либо **Chips** Filter |
| Переключатель «список / плитка» | **Segment Control** Primary, Icon-only |
| Toggle ВКЛ/ВЫКЛ | **Switch**, не Segment |

---

## Миграция со старого M3 Segmented control

Компонент собран как копия M3-паттерна в Figma. Изменения за время Larixon DS:

| Что было | Что стало | Когда |
|---|---|---|
| 12 hardcoded `#49454f` (Material 3 dark gray) | `Text&Icon/Primary` (canonical) | 2026-05-06 |
| Текстовые стили raw 14/16, 14/14, 10/12, 10/10 | `Base/Body 2 Medium` 14/20 + `Caption sm` 10/12 | 2026-05-07 |
| Микс fills `Surface/Surface Primary` (selected) + `Background/Primary` (unselected) — неконсистентно | **`Surface/Surface Primary`** единообразно на всех 90 fills (root + Tab + Building Blocks) — обеспечивает elevation-контраст в Dark theme (Zinc/800 над Zinc/950) | 2026-05-12 |
| 6 text nodes на `M3/title/small` (Material 3 library) | **`Base/Body 2 Medium`** (canonical Larixon) | 2026-05-12 |
| Подпись под иконкой (Label & Icon) — `Base/Body 2 Medium` 14/20 в building blocks `Icon and label` и `Classic Icon and label` | **`Caption/caption-sm Medium`** 10/12 — компактная нижняя подпись по M3 паттерну | 2026-05-12 |
| iOS Segment Control (Apple-native) | заменён на **Tabs** | до DS-консолидации |

API-breaking изменений не было — варианты сохранены, можно swap'ать инстансы в продуктовых файлах без пересборки.

---

## История миграций

**2026-05-12 — аудит готовности (component-spec-check), 48 правок в Figma.**

- **90 fills** унифицированы на `Surface/Surface Primary` (root + Tab + Building Blocks). Оригинальный SET имел неконсистентный микс: selected-табы на `Surface/Surface Primary`, unselected — на `Background/Primary`. В Light оба токена = #ffffff, визуально неотличимо, но в Dark `Surface/Surface Primary` = **Zinc/800** vs `Background/Primary` = Zinc/950 — это 2 шага elevation. Segment Control часто sticky над скроллящимся контентом, поэтому всему компоненту нужна elevated surface для контраста с background-слоем под ним. Промежуточная попытка унификации на `Background/Primary` была откатана после ревью — Surface правильнее.
- **6 text nodes** на корнях Tab 4/5 / Tab 4/5 / Tab 4/5 (Label & Icon, Primary + Secondary) переведены с `M3/title/small` на `Base/Body 2 Medium` — устранена смесь из двух библиотек typography (M3 + canonical Larixon).
- **6 Label texts** в COMPONENT_SET'ах building-block'ов (`888:8068` — `.=Building Blocks/Icon and label`, `888:8244` — `.=Building Blocks/Classic Icon and label`) переведены с `Base/Body 2 Medium` (14/20) на **`Caption/caption-sm Medium`** (10/12). Изменения автоматически пропагировались на все instance'ы внутри Segment Control вариантов — спека и Figma теперь согласованы.

### Спека

- §«Радиусы» — конкретизирована: `cornerRadius = 0` на всех элементах. Удалены неконкретные формулировки «по согласованию с шкалой radius».
- §«Цвета по состояниям» — убран Disabled из таблиц состояний сегмента (нет такой оси в Figma SET). Добавлено пояснение: Disabled рендерится на стороне продукта через родительский контейнер (`aria-disabled` + `opacity: 0.4`), не зашит в компонент.
- §«Типографика» — удалена строка про несуществующий «Icon and label (расширенный)» вариант с Body 2 Medium; зафиксировано, что под-иконковая подпись использует `Caption/caption-sm Medium`.
- §«A11y → Disabled» — синхронизировано с новой Disabled-моделью.
- §«Миграция со старого M3» — добавлены 3 строки про правки 2026-05-12.

Segment Control → ✅ готов к разработке.

---

## Связанные документы

- [tabs-spec.md](./tabs-spec.md) — родственный паттерн (Radix-стиль), используется когда нужна именно навигация по контенту
- [chips-spec.md](./chips-spec.md) — Filter Chip как альтернатива Scrollable Segment
- [TYPOGRAPHY.md](./TYPOGRAPHY.md) §4–5.1 — стили `Base/Body 2 Medium` и `Caption sm`
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — токены `Accent/Primary`, `Background/Tertiary`, `Text&Icon/*`
- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы spacing, size, control-height, border, radius
