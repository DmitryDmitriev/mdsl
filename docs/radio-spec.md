# Radio — спецификация компонента

Радиокнопка — выбор одного варианта из группы. Использует только семантические токены из **docs/DESIGN-TOKENS.md**, **docs/COLOR-PALETTE.md**.

**Figma:** страница **🟢 Radio**, набор **Radio** (COMPONENT_SET).

---

## 1. Обзор

Radio — круглый контрол для единственного выбора в группе. Состоит из **двух** элементов: внешнее кольцо (`Outer Ring`) и внутренняя точка (`Inner Dot`, видна только в Select=Yes). Раздельные слои дают каждому свою семантику: ring — `Border/*`, dot — `Accent/*`.

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
Radio (COMPONENT)
├── Outer Ring (ELLIPSE 20×20, transparent fill, stroke 2px INSIDE)
└── Inner Dot (ELLIPSE 10×10, центрирован) — только при Select=Yes
```

Outer Ring всегда присутствует, Inner Dot — только в Select=Yes вариантах. Текстовый лейбл не входит в компонент (используется отдельно или через ListItem).

**Почему два слоя:** ring и dot отвечают за разные семантические роли. Ring — это border/контур контрола (использует семейство `Border/*`), dot — внутренний акцент (использует семейство `Accent/*`). Раздельные слои позволяют состоянию Disabled приглушать оба независимо: ring → `Border/Disabled`, dot тоже → `Border/Disabled` (вместо использования семейства `Text&Icon/*` для бордера, как было в первой версии).

---

## 4. Таблица токенов

Все свойства привязаны к токенам дизайн-системы.

### Цвета

По **docs/COLOR-PALETTE.md**. Все заливки и обводки привязаны к семантическим токенам.

| Состояние | Outer Ring (stroke) | Inner Dot (fill) |
|-----------|---------------------|------------------|
| Select=No, Enabled=Yes  | `Border/Default`  | — (hidden) |
| Select=Yes, Enabled=Yes | `Border/Active`   | `Accent/Primary` |
| Select=No, Enabled=No   | `Border/Disabled` | — (hidden) |
| Select=Yes, Enabled=No  | `Border/Disabled` | `Border/Disabled` |

**Размеры:**
- **Outer Ring:** 20×20 → `size/xs`. Stroke 2px → `border/emphasis`. Stroke alignment INSIDE.
- **Inner Dot:** **10×10 — design constant**, не на spacing-шкале (она идёт 4/8/12/16). 10px = ровно 50% от ring 20px — стандартное соотношение для radio. Привязывать к ближайшему токену (8 = `spacing/2` или 12 = `spacing/3`) визуально хуже, поэтому осознанный хардкод. См. правило в `DESIGN-TOKENS.md` §«Когда допустим хардкод».

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
        selectedColor = AccentPrimary,    // inner dot in selected state
        unselectedColor = BorderDefault,  // ring in unselected state
        disabledSelectedColor = BorderDisabled,
        disabledUnselectedColor = BorderDisabled,
    )
)
```

---

## 7. Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
- [checkbox-spec.md](./checkbox-spec.md) — аналогичный контрол (множественный выбор)
- [list-item-spec.md](./list-item-spec.md) — Radio как building block списка

---

## 8. История

**2026-05-06 — реструктуризация: Outer Ring + Inner Dot.**

Было: один Vector с заливкой одним цветом — ring и dot не разделены.

Проблемы:
- В Disabled бордер использовал `Text&Icon/Tertiery` — text-token для контура, семантически странно.
- В Select=Yes Enabled=Yes ring и dot заливались одним `Accent/Primary` — нет визуального разделения, в крупных размерах смотрится как сплошной круг.

Стало: компонент разделён на два ELLIPSE — Outer Ring (stroke) + Inner Dot (fill). Каждый слой использует своё семейство токенов: ring → `Border/*`, dot → `Accent/*`. Disabled теперь корректно использует `Border/Disabled` для обоих слоёв вместо смешивания семейств.
