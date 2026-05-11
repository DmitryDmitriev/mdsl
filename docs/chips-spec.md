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
| **Active** | Yes, No |
| **Icon** | Left, Right, No, Icon Only |
| **Type** | Text+Icon, Text, Icon |
| **Size** | 32 (compact), 40 (standard) |

Итого **16 вариантов** = 2 Active x 4 Icon x 3 Type x 2 Size (с учётом валидных комбинаций).

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

### Состояния (Active)

| State | Fill | Border | Text/Icon |
|---|---|---|---|
| **Active=No** (default) | `Background/Tertiary` | — | `Text&Icon/Primary` |
| **Active=Yes** (configured) | `Background/Tertiary` | `Border/Active` (1 px) | `Text&Icon/Primary` |

**Ключевое решение по элевации.** Fill = `Background/Tertiary` (Zinc/200 Light, Zinc/800 Dark) — даёт 2-шаговую элевацию относительно `Background/Primary` страницы (Zinc/50/Zinc/950). Это критично в Dark theme: с `Background/Secondary` (Zinc/900) chip визуально сливался с фоном.

**Ключевое решение по Active.** Border'ом **не дифференцируется** дефолт (он его не имеет), border — это маркер «настроено» на Active=Yes. Та же поверхность, но рамка показывает что внутри что-то выбрано/применено. Это даёт пользователю быстрое визуальное распознавание «активные фильтры» без отдельного бейджа.

Fills -- 100% покрытие токенами. Типография -- 100% покрытие токенами.

---

## Сводная таблица токенов

### Размеры (только существующие токены системы)

| Параметр | Size=32 | Size=40 |
|---|---|---|
| **Height** | 32 → `size/md` | 40 → `size/lg` |
| **paddingLeft (Icon=Left)** | 12 → `spacing/3` | 12 → `spacing/3` |
| **paddingRight (Icon=Left)** | 12 → `spacing/3` | 16 → `spacing/4` |
| **paddingLeft (Icon=Right)** | 12 → `spacing/3` | 16 → `spacing/4` |
| **paddingRight (Icon=Right)** | 12 → `spacing/3` | 12 → `spacing/3` |
| **paddingLeft/Right (Text only)** | 12 → `spacing/3` | 16 → `spacing/4` |
| **paddingLeft/Right (Icon only)** | 8 → `spacing/2` | 12 → `spacing/3` |
| **itemSpacing (Text+Icon)** | 4 → `spacing/1` | 4 → `spacing/1` |
| **itemSpacing (Text-only / Icon-only)** | 8 → `spacing/2` | 8 → `spacing/2` |
| **Radius** | `radius/pill/pill` | `radius/pill/pill` |

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

**2026-05-11 — аудит готовности (component-spec-check), 10 правок.**

В Figma:
- **Size=32 height** (8 вариантов): `control-height/xs` → **`size/md`**. Значение то же (32 px), но корректная шкала — Chips на `size/*` как Badge, не на `control-height/*` как Button (см. §«Почему size/*»).
- **Иконка chevron** (`ic_expand_more`) в 2 вариантах `Active=No, Icon=Right`: fill `Text&Icon/Secondary` → **`Text&Icon/Primary`**. Унификация с остальными 10 icon-вариантами.

В спеке:
- §«Размеры»: добавлен раздел «Почему `size/*`, а не `control-height/*`» — Chips двойственный (тег + интерактив), touch target обеспечивается hit-slop или родительским рядом.
- §«Сводная таблица токенов»: расплывчатые записи (`12-16 → spacing/3-4`) разнесены по подвариантам — явные значения для Icon=Left / Icon=Right / Text-only / Icon-only.

Chips → ✅ готов к разработке.
