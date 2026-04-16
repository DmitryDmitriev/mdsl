# Radio — спецификация компонента

Радиокнопка — выбор одного варианта из группы. Использует только семантические токены из **docs/DESIGN-TOKENS.md**, **docs/COLOR-PALETTE.md**.

**Figma:** страница **🟢 Radio**, набор **Radio** (COMPONENT_SET).

---

## 1. Обзор

Radio — круглый контрол для единственного выбора в группе. Состоит из одного элемента — круг (circle) с заливкой/обводкой в зависимости от состояния.

---

## 2. Варианты (variants)

| Свойство | Значения | Описание |
|----------|----------|----------|
| **Select** | `Yes` / `No` | Выбран / не выбран |
| **Enabled** | `Yes` / `No` | Активен / задизейблен |
| **Filled** | `No` | Всегда No (зарезервировано) |

Итого **4 варианта** = 2 Select x 2 Enabled (Filled всегда No).

---

## 3. Структура слоёв

```
Radio (COMPONENT) ← Круг (circle)
```

Простая структура: один элемент без вложенных фреймов. Текстовый лейбл не входит в компонент.

---

## 4. Таблица токенов

Все свойства привязаны к токенам дизайн-системы.

### Цвета

По **docs/COLOR-PALETTE.md**. Все заливки и обводки привязаны к семантическим токенам.

| Состояние | Элемент | Токен | Light | Dark |
|-----------|---------|-------|-------|------|
| Select=Yes, Enabled=Yes | Circle fill | `Accent/Graphite` | *(по палитре)* | *(TBD)* |
| Select=No, Enabled=Yes | Circle stroke | `Border/Default` | *(по палитре)* | *(TBD)* |
| Select=Yes, Enabled=No | Circle fill | `Icon/Tertiary` | *(по палитре)* | *(TBD)* |
| Select=No, Enabled=No | Circle stroke | `Border/Disabled` | *(по палитре)* | *(TBD)* |

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
<Radio
  checked={selected}
  disabled={false}
  onChange={handleChange}
/>
```

**iOS (SwiftUI):**
```swift
Picker("Options", selection: $selected) {
    Text("Option A").tag(0)
    Text("Option B").tag(1)
}
.pickerStyle(.radioGroup)
```

**Android (Compose):**
```kotlin
RadioButton(
    selected = isSelected,
    onClick = { onSelect() },
    enabled = true,
    colors = RadioButtonDefaults.colors(
        selectedColor = AccentGraphite,
        unselectedColor = BorderDefault,
    )
)
```

---

## 7. Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
- [checkbox-spec.md](./checkbox-spec.md) — аналогичный контрол (множественный выбор)
- [list-item-spec.md](./list-item-spec.md) — Radio как building block списка
