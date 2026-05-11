# Divider — спецификация компонента

Разделительная линия между элементами списков и секций. Использует только семантические токены из **docs/DESIGN-TOKENS.md**, **docs/COLOR-PALETTE.md**.

**Figma:** страница **🟢 Divider**, набор **Divider** (COMPONENT_SET).

---

## 1. Обзор

Divider — горизонтальная линия-разделитель. Толщина задаётся через `strokeWeight` элемента LINE (не через высоту фрейма). Высота фрейма = HUG (~1 px).

---

## 2. Варианты (variants)

| Свойство | Значения | Описание |
|----------|----------|----------|
| **Type** | `full-width` | Линия на всю ширину |
| **Type** | `inset` | Отступ слева (для списков с иконками) |
| **Type** | `middle-inset` | Отступы слева и справа |

Итого **3 варианта**.

---

## 3. Структура слоёв

```
Divider (COMPONENT) ← VERTICAL auto-layout
  └── LINE ← stroke = цвет разделителя
```

- **Корневой фрейм:** VERTICAL auto-layout, width = FIXED, height = HUG.
- **LINE:** width = FILL, height = 0 px (толщина через strokeWeight = 1 px).

> LINE height равен 0 — толщина визуально определяется strokeWeight. Токены height к линии не применяются.

---

## 4. Таблица токенов

### Размеры

| Параметр | Значение | Токен | Примечание |
|----------|----------|-------|------------|
| Width (variant root) | iOS: 320 px, Android: 360 px | `Platform/Width` | FIXED |
| Height (variant root) | ~1 px | HUG | Определяется strokeWeight LINE |
| LINE width | 100% | FILL | Растягивается на ширину фрейма |
| LINE strokeWeight | 1 px | — | Визуальная толщина разделителя |

### Цвета

По **docs/COLOR-PALETTE.md**. Все заливки привязаны к семантическим токенам.

| Элемент | Токен | Light | Dark |
|---------|-------|-------|------|
| **LINE stroke** | `Border/Default` | *(по палитре)* | *(dark mode TBD)* |

---

## 5. Аудит покрытия токенами

| Категория | Покрытие |
|-----------|----------|
| Color | **100%** |
| Token | **100%** |
| Type (текст) | **N/A** (нет текстового контента) |
| Overall | **100%** |

---

## 6. Синхронизация с кодом

**Web (React):**
```tsx
<Divider type="full-width" />
<Divider type="inset" />
<Divider type="middle-inset" />
```

**iOS (SwiftUI):**
```swift
Divider()
    .padding(.leading, inset) // для type=inset
```

**Android (Compose):**
```kotlin
HorizontalDivider(
    color = BorderDefault,
    thickness = 1.dp,
    modifier = Modifier.padding(start = insetDp) // для type=inset
)
```

---

## 7. Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
- [list-item-spec.md](./list-item-spec.md) — основной потребитель разделителей

---

## 8. История миграций

**2026-05-11 — аудит готовности (component-spec-check).**

Все 3 варианта (full-width / inset / middle-inset) — на токенах (`Border/Default`, `Platform/Width`, `spacing/4`, `spacing/0`), структура соответствует §3. Покрытие — 100% (до и после аудита).

Cleanup: на корневом COMPONENT_SET (86:20548) висел orphan-stroke c binding на `Accent/Link` — на визуал не влиял (paint без видимой обводки), но засорял variable_defs при codegen. Paint удалён.

Divider → ✅ готов к разработке.
