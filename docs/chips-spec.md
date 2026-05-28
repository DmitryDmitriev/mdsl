# Chips -- спецификация для разработки

**Один компонент -- одна спека.** Компонент «Chips» -- pill-элемент для фильтров, тегов и быстрых действий.

Привязка к **docs/DESIGN-TOKENS.md**. Все цвета, размеры и радиусы -- только через **существующие** токены системы. Компонентно-специфичные токены не используются.

Figma: страница **🟢 Chips**, набор **Chips** (COMPONENT_SET).

---

## Обзор

Chips -- это компактные элементы в форме «таблетки» (pill), которые используются для фильтрации, выбора тегов или быстрых действий. Состоят из контейнера с опциональными иконкой и текстом.

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Fill** | **Filled** (default), **Outline** |
| **Active** | Yes, No |
| **Icon** | Left, Right, No, Icon Only |
| **Type** | Text+Icon, Text, Icon |
| **Size** | 32 (compact), 40 (standard), **48 (large)** |
| **Shape** | **Pill** (default), **Rounded** |

Итого **96 вариантов** (с учётом валидных комбинаций Icon × Type) — для каждой комбинации: 2 Fill × 2 Active × 3 Size × 2 Shape.

---

## Структура слоёв

```
Chips (COMPONENT) <- Контейнер (pill)
  ├── Icon (INSTANCE, 16px) <- опционально, слева или справа
  └── Label (TEXT) <- опционально
```

Контейнер -- pill-форма (`radius/pill/pill = 999`). Ширина -- HUG (адаптируется под контент). Высота -- FIXED (задана токеном). Вертикальное выравнивание содержимого -- center.

**Важное проектное решение:** вертикальный padding **не токенизирован** -- высота фиксирована через токен + center align, вертикальное пространство вычисляется автоматически.

---

## Размеры

Все размеры привязаны к существующим токенам `size/*` и `spacing/*` из шкалы дизайн-системы. Компонентно-специфичные токены не создавались.

### Почему `size/*`, а не `control-height/*`

Chips — двойственный элемент: используются и как **статичные теги** (метки «Promo», «Новое» на карточке), и как **интерактивные фильтр-чипы** (нажимаются для применения фильтра). Шкала `control-height/*` (32–56) семантически закрывает только интерактив, `size/*` (16–48) — оба случая.

Для интерактивного использования touch target обеспечивается **не визуальной высотой чипа**, а:
- hit-slop / extended hit area в коде (на mobile chip с visual height 32 имеет таппаемую область 44+ через padding слот);
- контекстом ряда — в Filter Chip Group / горизонтальном скролле родитель задаёт вертикальный padding.

Это даёт компактный визуальный размер 32/40, но соответствие WCAG / HIG (≥44 pt) — в продакшен-обёртке. См. §«Доступность» ниже.

### Size = 32 (compact)

| Подвариант | Height | paddingLeft | paddingRight | itemSpacing | paddingTop/Bottom |
|---|---|---|---|---|---|
| **Text+Icon (left)** | 32 -> `size/md` | 12 -> `spacing/3` | 12 -> `spacing/3` | 4 -> `spacing/1` | 0 (вычисляемый) |
| **Text+Icon (right)** | 32 -> `size/md` | 12 -> `spacing/3` | 12 -> `spacing/3` | 4 -> `spacing/1` | 0 (вычисляемый) |
| **Text only** | 32 -> `size/md` | 12 -> `spacing/3` | 12 -> `spacing/3` | 8 -> `spacing/2` | 0 (вычисляемый) |
| **Icon only** | 32 -> `size/md` | 8 -> `spacing/2` | 8 -> `spacing/2` | 8 -> `spacing/2` | 0 (вычисляемый) |

### Size = 40 (standard)

| Подвариант | Height | paddingLeft | paddingRight | itemSpacing | paddingTop/Bottom |
|---|---|---|---|---|---|
| **Text+Icon (left)** | 40 -> `size/lg` | 12 -> `spacing/3` | 16 -> `spacing/4` | 4 -> `spacing/1` | 0 (вычисляемый) |
| **Text+Icon (right)** | 40 -> `size/lg` | 16 -> `spacing/4` | 12 -> `spacing/3` | 8 -> `spacing/2` | 0 (вычисляемый) |
| **Text only** | 40 -> `size/lg` | 16 -> `spacing/4` | 16 -> `spacing/4` | 8 -> `spacing/2` | 0 (вычисляемый) |
| **Icon only** | 40 -> `size/lg` | 12 -> `spacing/3` | 12 -> `spacing/3` | 8 -> `spacing/2` | 0 (вычисляемый) |

### Иконки

Иконки берутся из библиотеки, размер **16 px**. Внутри компонента не токенизированы.

---

## Радиусы

Контейнер Chips всегда имеет pill-форму.

| Элемент | Токен | Core | Значение |
|---|---|---|---|
| Container | `radius/pill/pill` | `radius/full` | 999 |

---

## Цвета

По **docs/COLOR-PALETTE.md**. Все цвета привязаны к семантическим токенам палитры.

### Состояния (Fill × Active)

Chip имеет два **визуальных режима** (по аналогии с Input и Badge): `Fill=Filled` (default) и `Fill=Outline`. Внутри каждого — два состояния по Active.

| Fill | Active | Background | Border | Text/Icon |
|---|---|---|---|---|
| **Filled** (default) | **No** | `Background/Secondary` | — | `Text&Icon/Primary` |
| **Filled** | **Yes** | `Background/Tertiary` | 1px `Border/Active` (INSIDE) | `Text&Icon/Primary` |
| **Outline** | **No** | `Background/Primary` | 1px `Border/Default` (INSIDE) | `Text&Icon/Primary` |
| **Outline** | **Yes** | `Background/Secondary` | 1px `Border/Active` (INSIDE) | `Text&Icon/Primary` |

**Когда что использовать (guidance для дизайнера):**

| Сценарий | Filled | Outline |
|---|---|---|
| На нейтральной поверхности (Background/Primary страницы), default filter-chip | ✅ | OK |
| На цветной картинке / image-фоне (ad card, hero) | ⚠️ может сливаться | ✅ |
| В filter-card / surface поверх Background/Secondary (Sellers Cabinets) | ⚠️ Tertiary почти не отличим от Secondary | ✅ |
| Несколько chip'ов подряд на чистой странице — visual rhythm | ✅ | OK |
| Когда chip — статичный тег («Promo», «New») | ✅ | OK |
| Когда chip — interactive filter с явным состоянием | OK | ✅ subtle, читается как control |

Правило: **если сомневаешься — Filled** (исторический default, нет визуального трения).

**Active-сигнал внутри каждой ветки:**
- **Filled:** fill сдвигается Secondary → Tertiary (на одну ступень от страницы) + 1px `Border/Active`. Контейнер заметно «уплотняется» + bright border.
- **Outline:** fill Primary → Secondary + border Default → Active. Два признака одновременно.

**Ключевое решение по элевации (Filled).** Active=No fill = `Background/Secondary` — мягкая filled-плашка. Active=Yes — `Background/Tertiary` (на ступень дальше от Background/Primary страницы, плюс bright border) — тем самым активный chip визуально «выпирает» сильнее, чем default. Это инверсия классической логики (где active обычно темнее) в пользу того, что Tertiary + border ярче читается, чем чистый fill shift в обе стороны.

Промежуточные варианты, отброшенные на сессии 2026-05-26:
- **Active=Yes inverted** (`Background/Inverted Primary` + `Text&Icon/Inverted W-B`) — слишком сильный сигнал, ломал dropdown-паттерн.
- **Active=Yes визуально идентичен Active=No** — слабый сигнал, нечитаемо для Icon-Only.
- **Active=Yes только border (без fill shift)** — терялся на Icon-Only.

Fills -- 100% покрытие токенами. Типография -- 100% покрытие токенами.

---

## Сводная таблица токенов

### Размеры (только существующие токены системы)

| Параметр | Size=32 | Size=40 | **Size=48** |
|---|---|---|---|
| **Height** | 32 → `size/md` | 40 → `size/lg` | **48 → `size/xl`** |
| **Icon size** | 16 | 16 | **24** |
| **paddingLeft (Icon=Left)** | 12 → `spacing/3` | 12 → `spacing/3` | **12 → `spacing/3`** |
| **paddingRight (Icon=Left)** | 12 → `spacing/3` | 16 → `spacing/4` | **16 → `spacing/4`** |
| **paddingLeft (Icon=Right)** | 12 → `spacing/3` | 16 → `spacing/4` | **16 → `spacing/4`** |
| **paddingRight (Icon=Right)** | 12 → `spacing/3` | 12 → `spacing/3` | **12 → `spacing/3`** |
| **paddingLeft/Right (Text only)** | 12 → `spacing/3` | 16 → `spacing/4` | **16 → `spacing/4`** |
| **paddingLeft/Right (Icon only)** | 8 → `spacing/2` | 12 → `spacing/3` | **12 → `spacing/3`** |
| **itemSpacing (Text+Icon)** | 4 → `spacing/1` | 4 → `spacing/1` | **4 → `spacing/1`** |
| **itemSpacing (Text-only / Icon-only)** | 8 → `spacing/2` | 8 → `spacing/2` | **8 → `spacing/2`** |
| **Radius (Shape=Pill)** | `radius/pill/pill` (999) | `radius/pill/pill` | `radius/pill/pill` |
| **Radius (Shape=Rounded)** | `radius/2` (8) | `radius/2` (8) | `radius/2` (8) |

### Shape

| Shape | Radius | Когда применять |
|---|---|---|
| **Pill** (default) | `radius/pill/pill` (999) | Классический chip — фильтры, теги, категории. Лёгкий visual вес. |
| **Rounded** | `radius/2` (8) | Когда нужна более «control-like» подача — например, фильтр-чипы в карточке Sellers Cabinets (визуально ближе к Button shape). Совпадает с Button-radius. |

### FILL-width поведение

По умолчанию chip — HUG width (адаптируется к контенту). Но `Icon=Right, Type=Text+Icon` варианты также поддерживают **FILL-width**: дизайнер ставит `layoutSizingHorizontal=FILL` на инстансе → text растягивается слева, chevron остаётся справа.

Это реализовано через `Text.layoutGrow=1` в master'ах Icon=Right вариантов. Если parent в auto-layout даёт chip больше ширины — text занимает всё свободное место, иконка прижата вправо. Без parent constraint chip продолжает HUG к контенту (backward-compatible).

Use case: широкий «All categories ▼» chip на всю ширину row внутри filter-карточки.

**Logic асимметричных padding'ов для Icon=Left / Icon=Right:** padding со стороны иконки всегда меньше (text-side больше), чтобы иконка визуально «прижималась» к краю чипа, а текст имел воздух с противоположной стороны.

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fills) | **100%** |
| 🔤 Typography | **100%** |
| 🔲 Tokens (общее) | **100%** |
| **Overall** | **100%** |

---

## Доступность (a11y)

- **Минимальная tap-зона:** Size=40 -- 40 px по высоте, соответствует минимальным требованиям (>= 44 pt с учётом padding контейнера). Size=32 -- **ниже** рекомендуемых 44 pt (WCAG / HIG). При использовании в продакшене обернуть в контейнер с минимальным touch target 44 pt.
- **Контраст:** проверить по реальной палитре для Active=Yes / Active=No на целевом фоне.
- **Роль:** `role="button"` или `role="option"` (web, зависит от контекста -- фильтрация или выбор), `aria-pressed` для toggle-чипов. На мобильных -- соответствующие нативные компоненты.
- **Фокус:** обеспечить видимый focus ring при навигации с клавиатуры.
- **Icon Only:** при отсутствии текста обязателен `aria-label` (web) / `accessibilityLabel` (mobile).

---

## Синхронизация с кодом

**Web (React):**
```tsx
<Chip
  size="sm"            // 32 или "md" для 40
  active={isActive}
  icon={<IconFilter />} // опционально
  iconPosition="left"   // "left" | "right"
  onClick={handleClick}
>
  Label
</Chip>
```

CSS-переменные (из существующей шкалы `spacing/*`):
```css
/* Size=32 */
--chip-height: var(--size-md);           /* 32px */
--chip-padding-x: var(--spacing-3);      /* 12px */
--chip-gap: var(--spacing-1);            /* 4px  */

/* Size=40 */
--chip-height-md: var(--size-lg);        /* 40px */
--chip-padding-x-md: var(--spacing-4);   /* 16px */
--chip-gap-md: var(--spacing-1);         /* 4px  */
```

**iOS (SwiftUI):**
```swift
ChipView(
    label: "Filter",
    icon: Image(systemName: "line.3.horizontal.decrease"),
    iconPosition: .left,
    size: .standard,    // .compact (32) | .standard (40)
    isActive: isActive
)
```

**Android (Compose):**
```kotlin
Chip(
    onClick = { /* ... */ },
    label = { Text("Filter") },
    icon = { Icon(Icons.Default.FilterList, contentDescription = null) },
    size = ChipSize.Standard,  // Compact (32) | Standard (40)
    active = isActive
)
```

---

## Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) -- шкалы размеров, spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) -- палитра и семантика цветов
- [switch-spec.md](./switch-spec.md) -- спецификация Switch (для сравнения размерной системы)
- [button-spec.md](./button-spec.md) -- спецификация кнопок (для сравнения размерной системы)
- [badge-spec.md](./badge-spec.md) -- Badge (родственная шкала `size/*`)

---

## История миграций

**2026-05-26 — большое расширение Chips: +Size=48, +Shape axis, FILL-width, Active=Yes invert.**

Контекст: задача редизайна filter-card на Sellers Cabinets вскрыла 4 точки доработки в Chips:

1. **Size=48** (`size/xl`, 24-icon, padding 16/12) — добавлен 3-й размер для крупных filter-card'ов. До этого 32/40 не хватало визуального веса в card'ах с собственным padding 16.
2. **Shape axis (Pill / Rounded)** — добавлен axis. Rounded использует `radius/2` (8) — совпадает с Button radius для control-like подачи. Pill остался default'ом, backward-совместимо.
3. **FILL-width support** — `Text.layoutGrow=1` на Icon=Right master'ах. Позволяет chip'у растягиваться в FILL-парент: text слева, chevron справа. Дешёво (master change), backward-safe.
4. **Fill axis (Filled / Outline)** — как у Input и Badge:
   - **Filled, Active=No:** `Background/Secondary`, без border.
   - **Filled, Active=Yes:** `Background/Tertiary` + 1px `Border/Active`.
   - **Outline, Active=No:** `Background/Primary` + 1px `Border/Default`.
   - **Outline, Active=Yes:** `Background/Secondary` + 1px `Border/Active`.

   Текст/иконка во всех — `Text&Icon/Primary`. Итерации Active-сигнала: только border → inverted fill+text (кричит, ломает dropdown) → визуально идентичен (нечитаемо) → fill shift. Финальное решение — развести в два режима через axis Fill: Filled для классических tag/filter-chip на нейтральной поверхности, Outline — для image-фона / surface поверх Secondary / явных interactive control'ов.

   Матрица: 48 → **96 вариантов** (×2 от Fill).

Матрица: 16 → **48 вариантов** (×3 от Size=48, ×2 от Shape).

DS-gap (для backlog Assets): нужны `16/ic_tune` и `24/ic_tune` (sliders icon). Пока для «Фильтры» Icon-Only chip используем `24/ic_filter` (funnel) как placeholder.

---

**2026-05-11 — аудит готовности (component-spec-check), 10 правок.**

В Figma:
- **Size=32 height** (8 вариантов): `control-height/xs` → **`size/md`**. Значение то же (32 px), но корректная шкала — Chips на `size/*` как Badge, не на `control-height/*` как Button (см. §«Почему size/*»).
- **Иконка chevron** (`ic_expand_more`) в 2 вариантах `Active=No, Icon=Right`: fill `Text&Icon/Secondary` → **`Text&Icon/Primary`**. Унификация с остальными 10 icon-вариантами.

В спеке:
- §«Размеры»: добавлен раздел «Почему `size/*`, а не `control-height/*`» — Chips двойственный (тег + интерактив), touch target обеспечивается hit-slop или родительским рядом.
- §«Сводная таблица токенов»: расплывчатые записи (`12-16 → spacing/3-4`) разнесены по подвариантам — явные значения для Icon=Left / Icon=Right / Text-only / Icon-only.

Chips → ✅ готов к разработке.
