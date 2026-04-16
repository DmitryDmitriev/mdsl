# Switch — спецификация для разработки

**Один компонент — одна спека.** Компонент «Switch» (переключатель / тогл) — бинарный контрол для настроек.

Привязка к **docs/DESIGN-TOKENS.md**. Все цвета, размеры и радиусы — только через **существующие** токены системы. Компонентно-специфичные токены не используются.

Figma: страница **🟢 Switch**, набор **Switch** (COMPONENT_SET).

---

## Обзор

Switch — это контрол с двумя состояниями (On / Off), который используется для переключения настроек, фильтров, режимов и т. п. Состоит из **Track** (дорожка) и **Knob** (ползунок).

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Size** | 32 (стандартный), 24 (компактный) |
| **State** | On, Off |
| **Enabled** | True, False |

Итого **8 вариантов** = 2 размера × 2 состояния × 2 enabled.

---

## Структура слоёв

```
Switch (COMPONENT) ← Track
  └── Knob (FRAME) ← Ползунок
```

Оба слоя — pill-форма (`radius/pill/pill = 999`). Knob перемещается внутри Track при переключении On ↔ Off.

---

## Размеры

Все размеры привязаны к существующим токенам `size/*` из шкалы дизайн-системы. Компонентно-специфичные токены не создавались.

### Size = 32 (стандартный)

| Элемент | Параметр | Значение | Токен | Core |
|---|---|---|---|---|
| **Track** | width | **56 px** | `size/2xl` | `spacing/14` |
| **Track** | height | **32 px** | `size/md` | `spacing/8` |
| **Knob** | width × height | **24 × 24 px** | `size/sm` | `spacing/6` |
| **Внутренний padding** | (track height − knob) / 2 | **4 px** | *(вычисляемый)* | — |

### Size = 24 (компактный)

| Элемент | Параметр | Значение | Токен | Core |
|---|---|---|---|---|
| **Track** | width | **40 px** | `size/lg` | `spacing/10` |
| **Track** | height | **24 px** | `size/sm` | `spacing/6` |
| **Knob** | width × height | **20 × 20 px** | `size/xs` | `spacing/5` |
| **Внутренний padding** | (track height − knob) / 2 | **2 px** | *(вычисляемый)* | — |

### Ход ползунка (travel distance)

| Size | Формула | Значение |
|---|---|---|
| 32 | track width − knob − 2 × padding = 56 − 24 − 8 | **24 px** |
| 24 | track width − knob − 2 × padding = 40 − 20 − 4 | **16 px** |

Анимация перехода: **ease-in-out, ~200 мс** (по HIG/Material Design).

---

## Радиусы

Оба элемента (Track и Knob) всегда имеют pill-форму.

| Элемент | Токен | Core | Значение |
|---|---|---|---|
| Track | `radius/pill/pill` | `radius/full` | 999 |
| Knob | `radius/pill/pill` | `radius/full` | 999 |

---

## Цвета

По **docs/COLOR-PALETTE.md**. Все цвета привязаны к семантическим токенам.

### State = On (включён)

| Элемент | Enabled | Token | Light | Dark |
|---|---|---|---|---|
| **Track** | True | `Accent/Graphite` | #2C3135 | *(dark mode TBD)* |
| **Knob** | True | `Background/Primary` | #FFFFFF | *(dark mode TBD)* |
| **Track** | False | `Background/Secondary` | #F2F3F7 | *(dark mode TBD)* |
| **Knob** | False | `Icon/Tertiary` | #BBC1C7 | *(dark mode TBD)* |

### State = Off (выключен)

| Элемент | Enabled | Token | Light | Dark |
|---|---|---|---|---|
| **Track** | True | `Background/Tertiary` | #E2E5EB | *(dark mode TBD)* |
| **Knob** | True | `Background/Primary` | #FFFFFF | *(dark mode TBD)* |
| **Track** | False | `Background/Secondary` | #F2F3F7 | *(dark mode TBD)* |
| **Knob** | False | `Icon/Tertiary` | #BBC1C7 | *(dark mode TBD)* |

### Визуальная таблица

```
           On + Enabled       Off + Enabled       Disabled (On/Off)
Track:     ████ Graphite      ░░░░ Tertiary       ░░░░ Secondary
Knob:      ○ Primary(white)   ○ Primary(white)    ○ Icon/Tertiary(gray)
```

---

## Сводная таблица токенов

### Размеры (только существующие токены системы)

| Элемент | Size=32 | Size=24 |
|---|---|---|
| **Track width** | 56 → `size/2xl` | 40 → `size/lg` |
| **Track height** | 32 → `size/md` | 24 → `size/sm` |
| **Knob** | 24 → `size/sm` | 20 → `size/xs` |
| **Radius** | `radius/pill/pill` | `radius/pill/pill` |

### Цвета

| Токен | Использование |
|---|---|
| `Accent/Graphite` | Track fill (On + Enabled) |
| `Background/Primary` | Knob fill (Enabled) |
| `Background/Tertiary` | Track fill (Off + Enabled) |
| `Background/Secondary` | Track fill (Disabled) |
| `Icon/Tertiary` | Knob fill (Disabled) |

---

## Аудит покрытия токенами

| Категория | Покрытие | Связано / Всего |
|---|---|---|
| 🎨 Fills | **100%** | 16 / 16 |
| ✏️ Strokes | **N/A** | нет обводок |
| 🔲 Corner Radius | **100%** | 16 / 16 |
| ↔️ Width | **100%** | 16 / 16 |
| ↕️ Height | **100%** | 16 / 16 |

---

## Доступность (a11y)

- **Минимальная tap-зона:** Size=32 — 56 × 32 px, Size=24 — 40 × 24 px. Size=24 **меньше** рекомендуемых 44 × 44 pt (WCAG / HIG). При использовании в продакшене обернуть в контейнер с минимальным размером 44 pt.
- **Контраст:** On-состояние (Graphite на белом фоне) — соответствует WCAG AA. Off-состояние (Tertiary на белом) — проверить на реальных экранах.
- **Роль:** `role="switch"` + `aria-checked` (web), `UISwitch` (iOS), `Switch` (Compose).

---

## Синхронизация с кодом

**Web (React):**
```tsx
<Switch
  size="lg"         // или "sm"
  checked={isOn}
  disabled={false}
  onChange={handleToggle}
/>
```

CSS-переменные (из существующей шкалы `size/*`):
```css
/* Size=32 */
--switch-track-width: var(--size-2xl);   /* 56px */
--switch-track-height: var(--size-md);   /* 32px */
--switch-knob: var(--size-sm);           /* 24px */

/* Size=24 */
--switch-track-width-sm: var(--size-lg); /* 40px */
--switch-track-height-sm: var(--size-sm);/* 24px */
--switch-knob-sm: var(--size-xs);        /* 20px */
```

**iOS (SwiftUI):**
```swift
Toggle("Label", isOn: $isOn)
    .toggleStyle(SwitchToggleStyle(tint: Color(.accentGraphite)))
```

Нативный `UISwitch` — 51 × 31 pt; при кастомизации использовать токены из шкалы `size/*`.

**Android (Compose):**
```kotlin
Switch(
    checked = isOn,
    onCheckedChange = { isOn = it },
    colors = SwitchDefaults.colors(
        checkedTrackColor = AccentGraphite,
        uncheckedTrackColor = BackgroundTertiary,
    )
)
```

---

## Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
- [button-spec.md](./button-spec.md) — спецификация кнопок (для сравнения размерной системы)
