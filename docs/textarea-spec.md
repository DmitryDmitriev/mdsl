# Textarea — спецификация для разработки

**Один компонент — одна спека.** Многострочное поле ввода для длинного контента (описания объявлений, комментарии, отзывы). Параллелен [Input v2](./input-v2-spec.md), но для многострочного ввода без иконок/префиксов.

Привязка к [DESIGN-TOKENS.md](./DESIGN-TOKENS.md), [COLOR-PALETTE.md](./COLOR-PALETTE.md), [TYPOGRAPHY.md](./TYPOGRAPHY.md).

Figma: страница **🟢 Textarea**, набор **Textarea** (`9727:59`).

---

## 1. Обзор

Textarea — поле ввода для длинного текста. Container с фоном/границей и областью для multi-line текста. Растягивается по вертикали designer'ом, ширина FILL/FIXED по контексту.

**Отличия от Input v2:**
- Multi-line (textarea grows down, не overflow в одну строку).
- Нет иконочных слотов (Left/Right Icon, Suffix) — Textarea не подразумевает inline-actions.
- **Counter** (счётчик символов) — bottom-right внутри container, опционально.

---

## 2. Варианты (variants)

| Свойство | Значения |
|---|---|
| **Type** | **Filled** (default), Outline |
| **State** | Default, Focused, Filled, Error, Disabled, ReadOnly |

Итого **12 вариантов** (2 Type × 6 State). Зеркалит Input v2 для visual consistency.

### Boolean / TEXT properties

| Свойство | Тип | Default | Назначение |
|---|---|---|---|
| **Counter** | BOOLEAN | `false` | Видимость counter-строки bottom-right inside container |
| **Counter text** | TEXT | `0 / 300` | Содержимое счётчика. Формат `current / max`. Designer переопределяет на инстансе |

**Input text** — НЕ exposed как property. Designer редактирует напрямую double-click'ом на TEXT node инстанса. Это сделано чтобы сохранить per-state default sample (Default показывает "Description" placeholder, Filled показывает образец текста и т.п.) — TEXT property с одним default'ом стирал бы эти образцы.

---

## 3. Структура слоёв

```
Textarea (COMPONENT per variant)
├── padding: spacing/2 (8) vertical · spacing/3 (12) horizontal
├── radius: radius/control/control-md (12)
├── layoutMode: VERTICAL, gap: spacing/2 (8)
├── fills/strokes: по state (см. §4)
│
├── input-text (TEXT)
│   ├── textStyleId: Base/Body 1 (16/24, w400)
│   ├── textAutoResize: HEIGHT
│   ├── layoutSizingHorizontal: FILL
│   ├── layoutGrow: 1 (занимает оставшуюся высоту container'а)
│   └── fill: per-state textColor
│
└── Counter (FRAME · visibility = "Counter" boolean)
    ├── layoutMode: HORIZONTAL
    ├── layoutSizingHorizontal: FILL, vertical: HUG
    ├── primaryAxisAlignItems: MAX (push to right)
    ├── counterAxisAlignItems: CENTER
    ├── fills: [] (transparent)
    │
    └── counter-text (TEXT)
        ├── textStyleId: Caption/caption-md (12/16, w400)
        ├── characters: bound to "Counter text" TEXT property
        └── fill: Text&Icon/Tertiary
```

**Дефолт width:** 328 px (вписывается в screen-card с `screen/padding-horizontal=16` от краёв 360-экрана). В инстансе можно `FILL` родителя.

**Дефолт height:** 252 px (по референсу Post-ad-flow). Designer ресайзит вертикально под контекст; min-height — на усмотрение, типовые значения 120–400.

---

## 4. Цвета (по состояниям)

Параллельно Input v2 §«Цвета по состояниям». Иконок нет — только container fill/stroke + text color.

### Filled (Type=Filled)

| State | Background | Border | input-text |
|---|---|---|---|
| Default | `Background/Secondary` | — | `Text&Icon/Secondary` (placeholder) |
| Focused | `Background/Secondary` | — | `Text&Icon/Primary` |
| Filled | `Background/Secondary` | — | `Text&Icon/Primary` |
| Error | `Background/Secondary` | 1px `Accent/Negative` (INSIDE) | `Text&Icon/Primary` |
| Disabled | `Background/Tertiary` | — | `Text&Icon/Tertiary` |
| ReadOnly | `Background/Tertiary` | — | `Text&Icon/Primary` |

### Outline (Type=Outline)

| State | Background | Border | input-text |
|---|---|---|---|
| Default | transparent | 1px `Border/Default` (INSIDE) | `Text&Icon/Secondary` |
| Focused | transparent | 1px `Border/Active` (INSIDE) | `Text&Icon/Primary` |
| Filled | transparent | 1px `Border/Default` (INSIDE) | `Text&Icon/Primary` |
| Error | transparent | 1px `Accent/Negative` (INSIDE) | `Text&Icon/Primary` |
| Disabled | transparent | 1px `Border/Disabled` (INSIDE) | `Text&Icon/Tertiary` |
| ReadOnly | transparent | 1px `Border/Default` (INSIDE) | `Text&Icon/Primary` |

**Counter text** во всех state'ах — `Text&Icon/Tertiary` (subtle, не отвлекает от основного текста). Когда counter приближается к лимиту, design-decision: переключать ли цвет на `Accent/Negative` — **открытый вопрос**, на сегодня не реализовано в master'е (designer override на инстансе).

---

## 5. Counter

### Поведение

- Скрыт по умолчанию (`Counter=false`).
- Включается boolean'ом на инстансе.
- Позиционируется **bottom-right inside container** — Material 3 pattern.
- Не overlap'ит текст: `Counter` row живёт в потоке VERTICAL layout'а container'а, занимает HUG-высоту (~16 px), сжимает input-text сверху.

### Формат

Дефолт: **`0 / 300`** (current / max). Локализация: пробел вокруг `/` — оставлен, латиница цифры. Альтернативы (`123 из 300`, `остались 177`) отвергнуты — индустрия-стандарт через `/`.

При значении > max — UI-логика на стороне разработки (turn counter color red, OR block input). В master'е — просто текст, designer моделирует через override.

### Когда применять

- **Применять:** длинные поля с серверным лимитом (description, comment, review).
- **Не применять:** короткие textarea без лимита, чисто визуальные.

---

## 6. Размеры

| Параметр | Значение | Токен |
|---|---|---|
| Width (default) | 328 | — (`screen/padding-horizontal × 2 - 360`) |
| Height (default) | 252 | — (off-scale, design constant) |
| Padding vertical | 8 | `spacing/2` |
| Padding horizontal | 12 | `spacing/3` |
| Gap (input-text → counter) | 8 | `spacing/2` |
| Radius | 12 | `radius/control/control-md` |
| Border weight (Outline + Error states) | 1 px | — |

**Off-scale width 328:** соответствует screen-card pattern (screen-padding-horizontal 16 × 2). В FAB-bar контексте или dialog'е (где container уже 360 или 296) — designer FILL'ит по родителю.

---

## 7. Типографика

| Слот | Стиль | Размер | Weight |
|---|---|---|---|
| input-text | `Base/Body 1` | 16 / 24 | 400 |
| counter-text | `Caption/caption-md` | 12 / 16 | 400 |

---

## 8. Доступность (a11y)

- **Семантика:** `<textarea>` (web), `EditText/multiline` (Android), `UITextView` (iOS)
- **Label/Description outside:** Textarea не имеет встроенного label — родительский экран должен предоставить heading или description над полем (см. референс Post-ad-flow: "Description" заголовок над textarea)
- **Counter:** `aria-live="polite"` для screen-reader при подходе к лимиту
- **Error:** `aria-invalid="true"` + error message ниже компонента (вне master'а, на стороне screen layout)
- **Disabled vs ReadOnly:** Disabled — input недоступен (атрибут `disabled`); ReadOnly — input заблокирован но текст копируем

---

## 9. Синхронизация с кодом

**Android (Compose):**
```kotlin
@Composable
fun Textarea(
    value: String,
    onValueChange: (String) -> Unit,
    type: TextareaType = TextareaType.Filled,
    state: TextareaState = TextareaState.Default,
    counter: Boolean = false,
    counterText: String? = null,  // "0 / 300" or computed from value.length + maxLength
    modifier: Modifier = Modifier,
)
```

**iOS (SwiftUI):**
```swift
struct TextareaView: View {
    @Binding var text: String
    var type: TextareaType = .filled
    var state: TextareaState = .default
    var counter: Bool = false
    var counterText: String? = nil
    // ...
}
```

**Counter — на стороне UI** (computed string), не управляется DS. DS отвечает только за visibility и стилизацию.

---

## 10. Связанные документы

- [input-v2-spec.md](./input-v2-spec.md) — родственный однострочный input (mirror axes)
- [TYPOGRAPHY.md](./TYPOGRAPHY.md) — Body 1 + caption-md
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — Background/Border/Accent state tokens

---

## 11. История

**2026-06-01 — введён компонент Textarea.**

Контекст: у Mobile DS не было multi-line input. В Post-ad-flow задаче (description поля для объявления) был собран ad-hoc «Text Area Description» — не компонент. Заведён в DS как полноценный компонент параллельно Input v2.

Решения сессии (2026-06-01):
- **Variant matrix:** зеркалит Input v2 (Type Filled/Outline × State 6 = 12). Designer'у привычная семантика, единая mental model.
- **Counter placement:** **inside container, bottom-right** (Material 3 pattern). Альтернатива «below textarea с Helper» отвергнута — для textarea bottom-right inside компактнее и логичнее (поле длинное, counter не должен «убегать» вниз).
- **Counter format:** `0 / 300` (current / max). Индустрия-стандарт.
- **Input text НЕ property:** обычное TEXT node без binding. Designer редактирует напрямую через double-click. Это сохраняет per-state placeholder/sample text для visual demo master'а.
- **Counter text — TEXT property:** designer переопределяет per-instance.

Open:
- При приближении counter к лимиту переключать цвет на `Accent/Negative` — на сегодня не реализовано (manual override).
- Label/description outside textarea — не часть master'а, screen layout problem.
- Поведение при overflow (scroll bar) — в Figma не реализован, есть в референсе Post-ad-flow как ad-hoc 4×318 thin bar; нужен DS-вариант (вместе с native scroll behavior на платформах) — отложено.
