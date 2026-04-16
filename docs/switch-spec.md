# Switch — спецификация для разработки

**Один компонент — одна спека.** Компонент «Switch» (переключатель / тогл) — бинарный контрол для настроек.

Привязка к **docs/DESIGN-TOKENS.md**. Все цвета, размеры и радиусы — только через **семантические** токены.

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

### Size = 32 (стандартный)

| Элемент | Параметр | Значение | Semantic | Core |
|---|---|---|---|---|
| **Track** | width | **52 px** | `switch/track-width/lg` | *(raw, не на 4px grid)* |
| **Track** | height | **32 px** | `switch/track-height/lg` → `size/md` | `spacing/8` |
| **Knob** | width × height | **24 × 24 px** | `switch/knob/lg` → `size/sm` | `spacing/6` |
| **Внутренний padding** | (track height − knob) / 2 | **4 px** | `switch/padding` → `spacing/1` | `spacing/1` |

### Size = 24 (компактный)

| Элемент | Параметр | Значение | Semantic | Core |
|---|---|---|---|---|
| **Track** | width | **40 px** | `switch/track-width/sm` → `size/lg` | `spacing/10` |
| **Track** | height | **24 px** | `switch/track-height/sm` → `size/sm` | `spacing/6` |
| **Knob** | width × height | **18 × 18 px** | `switch/knob/sm` | *(raw, не на 4px grid)* |
| **Внутренний padding** | (track height − knob) / 2 | **3 px** | *(вычисляемый)* | — |

### Ход ползунка (travel distance)

| Size | Формула | Значение |
|---|---|---|
| 32 | track width − knob − 2 × padding = 52 − 24 − 8 | **20 px** |
| 24 | track width − knob − 2 × padding = 40 − 18 − 6 | **16 px** |

Анимация перехода: **ease-in-out, ~200 мс** (по HIG/Material Design).

### Примечание по не-gridовым размерам

Значения **52 px** (track width lg) и **18 px** (knob sm) не попадают на 4px-сетку Core. Это стандартные размеры iOS-переключателя (51 × 31 нативный, здесь 52 × 32 — ровные числа). Они заданы как прямые значения в семантических токенах `switch/*` без core-алиасов.

---

## Радиусы

Оба элемента (Track и Knob) всегда имеют pill-форму.

| Элемент | Semantic | Core | Значение |
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

| Токен | Тип | Значение | Алиас |
|---|---|---|---|
| `switch/track-width/lg` | size | 52 | — |
| `switch/track-width/sm` | size | 40 | → `size/lg` |
| `switch/track-height/lg` | size | 32 | → `size/md` |
| `switch/track-height/sm` | size | 24 | → `size/sm` |
| `switch/knob/lg` | size | 24 | → `size/sm` |
| `switch/knob/sm` | size | 18 | — |
| `switch/padding` | spacing | 4 | → `spacing/1` |
| `radius/pill/pill` | radius | 999 | → `radius/full` |

Цвета:
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

- **Минимальная tap-зона:** Size=32 — 52 × 32 px, Size=24 — 40 × 24 px. Size=24 **меньше** рекомендуемых 44 × 44 pt (WCAG / HIG). При использовании в продакшене обернуть в контейнер с минимальным размером 44 pt.
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

CSS-переменные:
```css
--switch-track-width-lg: 52px;
--switch-track-height-lg: 32px;
--switch-knob-lg: 24px;
--switch-track-width-sm: 40px;
--switch-track-height-sm: 24px;
--switch-knob-sm: 18px;
--switch-padding: 4px;
```

**iOS (SwiftUI):**
```swift
Toggle("Label", isOn: $isOn)
    .toggleStyle(SwitchToggleStyle(tint: Color(.accentGraphite)))
```

Нативный `UISwitch` — 51 × 31 pt; при кастомизации использовать токены из спеки.

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
