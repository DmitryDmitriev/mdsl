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

По **docs/COLOR-PALETTE.md**. Все цвета привязаны к семантическим токенам палитры. Fills -- 100% покрытие токенами. Типография -- 100% покрытие токенами.

---

## Сводная таблица токенов

### Размеры (только существующие токены системы)

| Параметр | Size=32 | Size=40 |
|---|---|---|
| **Height** | 32 -> `size/md` (`spacing/8`) | 40 -> `size/lg` (`spacing/10`) |
| **paddingLeft (text+icon)** | 12 -> `spacing/3` | 12-16 -> `spacing/3`-`spacing/4` |
| **paddingRight (text+icon)** | 12 -> `spacing/3` | 12-16 -> `spacing/3`-`spacing/4` |
| **paddingLeft/Right (text)** | 12 -> `spacing/3` | 16 -> `spacing/4` |
| **paddingLeft/Right (icon only)** | 8 -> `spacing/2` | 12 -> `spacing/3` |
| **itemSpacing (с иконкой)** | 4 -> `spacing/1` | 4-8 -> `spacing/1`-`spacing/2` |
| **itemSpacing (без иконки)** | 8 -> `spacing/2` | 8 -> `spacing/2` |
| **Radius** | `radius/pill/pill` | `radius/pill/pill` |

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
