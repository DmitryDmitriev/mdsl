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
| **Helper** | BOOLEAN | `false` | Видимость helper-текста под container'ом (error hint, подсказка). На state=Error цвет автоматически `Accent/Negative` |
| **Scroll** | BOOLEAN | `false` | Видимость вертикальной scroll-полоски (4px) справа inside container — индикатор того что content больше видимой области |
| **Counter text** | TEXT | `0 / 300` | Содержимое счётчика. Формат `current / max`. Designer переопределяет на инстансе |
| **Helper text** | TEXT | `Helper text` | Содержимое helper-строки под container'ом. Designer переопределяет («Description is too short», «This field is required» и т.п.) |

**Input text** — НЕ exposed как property. Designer редактирует напрямую double-click'ом на TEXT node инстанса. Это сделано чтобы сохранить per-state default sample (Default показывает "Description" placeholder, Filled показывает образец текста и т.п.) — TEXT property с одним default'ом стирал бы эти образцы.

---

## 3. Структура слоёв

```
Textarea wrapper (COMPONENT per variant)
├── layoutMode: VERTICAL, gap: spacing/2 (8), no padding, no fill
├── width 328 (FILL родителя на инстансе), height HUG
│
├── Container (FRAME — сам textarea)
│   ├── width FILL, height FIXED (default 252, minHeight 64)
│   ├── padding: spacing/2 (8) vertical · spacing/3 (12) horizontal
│   ├── radius: radius/control/control-md (12)
│   ├── layoutMode: VERTICAL, gap: spacing/2 (8)
│   ├── fills/strokes: по state (см. §4)
│   │
│   ├── input-text (TEXT)
│   │   ├── textStyleId: Base/Body 1 (16/24, w400)
│   │   ├── textAutoResize: HEIGHT
│   │   ├── layoutSizingHorizontal: FILL
│   │   ├── layoutGrow: 1 (занимает оставшуюся высоту container'а)
│   │   └── fill: per-state textColor
│   │
│   ├── Counter (FRAME · visibility = "Counter" boolean)
│   │   ├── layoutMode: HORIZONTAL
│   │   ├── layoutSizingHorizontal: FILL, vertical: HUG
│   │   ├── primaryAxisAlignItems: MAX (push to right), counterAxisAlignItems: CENTER
│   │   ├── fills: [] (transparent)
│   │   └── counter-text (TEXT)
│   │       ├── textStyleId: Caption/caption-md (12/16, w400)
│   │       ├── characters: bound to "Counter text" TEXT property
│   │       └── fill: Text&Icon/Tertiary
│   │
│   └── scroll (RECTANGLE · visibility = "Scroll" boolean)
│       ├── size: 4 × N (designer регулирует высоту в зависимости от ratio overflow)
│       ├── radius: 2
│       ├── fill: Text&Icon/Tertiary
│       ├── layoutPositioning: ABSOLUTE
│       └── constraints: MAX/MIN (pin to top-right of container, inset 4px от правого края)
│
└── helper-text (TEXT · visibility = "Helper" boolean · characters = "Helper text" TEXT property)
    ├── textStyleId: Caption/caption-md (12/16, w400)
    ├── textAutoResize: HEIGHT
    ├── layoutSizingHorizontal: FILL
    └── fill: per-state helperColor (Accent/Negative на Error, Text&Icon/Secondary иначе)
```

**Wrapper vs Container.** Variant root — это wrapper (HUG vertical, без BG/radius), а сам textarea сидит внутри как Container. Это нужно потому что Helper text живёт **ниже** textarea container'а — wrapper держит обоих в VERTICAL layout. Designer ресайзит **Container** вертикально (не wrapper), wrapper подстраивается HUG'ом.

**Дефолт width:** 328 px (вписывается в screen-card с `screen/padding-horizontal=16` от краёв 360-экрана). В инстансе можно `FILL` родителя.

**Дефолт height container:** 252 px (по референсу Post-ad-flow).

**Минимальная высота container'а: 64 px** (= 2 строки Body 1 24px LH + padding 8×2). Меньше — visual'но не «area», а просто input. Зафиксировано через `minHeight=64` на Container. См. референс «Leave a comment» (PI3XrUDuoGyK4aXkqyzYoB, node 39908:14120).

Типовые размеры в продукте: 64 (короткий comment), 120 (review), 252 (description, default), 400+ (long-form post). Designer ресайзит под контекст.

---

## 4. Цвета (по состояниям)

Параллельно Input v2 §«Цвета по состояниям». Иконок нет — только container fill/stroke + text color.

### Filled (Type=Filled)

| State | Background | Border | input-text | helper-text |
|---|---|---|---|---|
| Default | `Background/Secondary` | — | `Text&Icon/Secondary` (placeholder) | `Text&Icon/Secondary` |
| Focused | `Background/Secondary` | — | `Text&Icon/Primary` | `Text&Icon/Secondary` |
| Filled | `Background/Secondary` | — | `Text&Icon/Primary` | `Text&Icon/Secondary` |
| Error | `Background/Secondary` | 1px `Accent/Negative` (INSIDE) | `Text&Icon/Primary` | **`Accent/Negative`** |
| Disabled | `Background/Tertiary` | — | `Text&Icon/Tertiary` | `Text&Icon/Tertiary` |
| ReadOnly | `Background/Tertiary` | — | `Text&Icon/Primary` | `Text&Icon/Secondary` |

### Outline (Type=Outline)

| State | Background | Border | input-text | helper-text |
|---|---|---|---|---|
| Default | transparent | 1px `Border/Default` (INSIDE) | `Text&Icon/Secondary` | `Text&Icon/Secondary` |
| Focused | transparent | 1px `Border/Active` (INSIDE) | `Text&Icon/Primary` | `Text&Icon/Secondary` |
| Filled | transparent | 1px `Border/Default` (INSIDE) | `Text&Icon/Primary` | `Text&Icon/Secondary` |
| Error | transparent | 1px `Accent/Negative` (INSIDE) | `Text&Icon/Primary` | **`Accent/Negative`** |
| Disabled | transparent | 1px `Border/Disabled` (INSIDE) | `Text&Icon/Tertiary` | `Text&Icon/Tertiary` |
| ReadOnly | transparent | 1px `Border/Default` (INSIDE) | `Text&Icon/Primary` | `Text&Icon/Secondary` |

**counter-text** во всех state'ах — `Text&Icon/Tertiary` (subtle, не отвлекает от основного текста). Когда counter приближается к лимиту, design-decision: переключать ли цвет на `Accent/Negative` — **открытый вопрос**, на сегодня не реализовано в master'е (designer override на инстансе).

**scroll** во всех state'ах — `Text&Icon/Tertiary`. Visible только когда `Scroll=true` (designer показывает индикатор в mockup'ах где текст превышает container).

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

## 5a. Helper text (error hint)

Текст под textarea container'ом. Используется для:
- **Error message** — на state=Error цвет автоматически `Accent/Negative` (см. §4). Текст вида «Description is too short», «This field is required».
- **Подсказка** — на остальных state'ах цвет `Text&Icon/Secondary`. Текст вида «Tell us about your item», «Up to 300 characters».

Не путать с Label/Title — он живёт **выше** textarea, вне master'а (родительский screen-layout).

Типографика: `Caption/caption-md` (12/16, w400). Gap от container'а до helper-text — `spacing/2` (8 px).

---

## 5b. Scroll indicator

Тонкая (4 px) вертикальная полоска справа inside container. Visible когда `Scroll=true`.

- Position: ABSOLUTE, top-right, inset 4 px от правого края, top inset 8 px (от paddingTop container'а)
- Высота: designer регулирует в mockup'е пропорционально соотношению viewport/content (например, при 50% overflow — полоса занимает половину высоты container'а)
- Color: `Text&Icon/Tertiary`
- Radius: 2 px (полу-капсула)

**Природа индикатора в master'е — статичная.** В коде scroll-bar отрисовывается native платформой (Android: scrollbar attribute, iOS: UITextView showsVerticalScrollIndicator). Master нужен только для design mockup'ов чтобы дизайнер мог показать «здесь много текста».

---

## 6. Размеры

| Параметр | Значение | Токен |
|---|---|---|
| Width (default) | 328 | — (`screen/padding-horizontal × 2 - 360`) |
| Height container (default) | 252 | — (off-scale, design constant из Post-ad-flow) |
| **Height container (min)** | **64** | off-scale (`2 × Body 1 LH + 2 × spacing/2 padding`). Зафиксировано `minHeight=64`. Меньше — не «area», а input |
| Padding container vertical | 8 | `spacing/2` |
| Padding container horizontal | 12 | `spacing/3` |
| Gap (input-text → counter) | 8 | `spacing/2` |
| Gap (container → helper-text) | 8 | `spacing/2` (от wrapper'а) |
| Radius container | 12 | `radius/control/control-md` |
| Border weight (Outline + Error states) | 1 px | — |
| Scroll indicator size | 4 × N | — (off-scale ширина) |
| Scroll indicator inset (right, top) | 4, 8 | `spacing/1`, `spacing/2` |

**Off-scale width 328:** соответствует screen-card pattern (screen-padding-horizontal 16 × 2). В FAB-bar контексте или dialog'е (где container уже 360 или 296) — designer FILL'ит по родителю.

---

## 7. Типографика

| Слот | Стиль | Размер | Weight |
|---|---|---|---|
| input-text | `Base/Body 1` | 16 / 24 | 400 |
| counter-text | `Caption/caption-md` | 12 / 16 | 400 |
| helper-text | `Caption/caption-md` | 12 / 16 | 400 |

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
    minHeightDp: Dp = 64.dp,
    counter: Boolean = false,
    counterText: String? = null,        // "0 / 300" or computed from value.length + maxLength
    helper: Boolean = false,
    helperText: String? = null,         // "Description is too short" — color follows state (Error → red)
    modifier: Modifier = Modifier,
)
```

**iOS (SwiftUI):**
```swift
struct TextareaView: View {
    @Binding var text: String
    var type: TextareaType = .filled
    var state: TextareaState = .default
    var minHeight: CGFloat = 64
    var counter: Bool = false
    var counterText: String? = nil
    var helper: Bool = false
    var helperText: String? = nil
    // ...
}
```

**Counter, Helper — на стороне UI** (computed strings), не управляются DS. DS отвечает только за visibility и стилизацию.

**Scroll indicator** в коде — **native** (Android scrollbar, iOS UITextView showsVerticalScrollIndicator). Figma master имеет `Scroll` boolean только для дизайнерских mockup'ов, в код не транслируется как property.

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

**2026-06-01 (вечер) — расширение: Helper + Scroll + minHeight 64.**

В тот же день после первого билда добавлены 3 фичи (запрос дизайнера):

1. **Helper text** (error hint) под container'ом. BOOLEAN `Helper` + TEXT `Helper text`. Цвет per-state: на `Error` — `Accent/Negative` (красный), на остальных — `Text&Icon/Secondary`. Это потребовало структурного перестроя: variant root теперь wrapper (VERTICAL HUG, без BG), внутри Container (textarea body) + helper-text. До этого variant root был самим Container'ом. Перестроены все 12 вариантов.

2. **Scroll indicator** (4 px вертикальная полоска внутри container справа). BOOLEAN `Scroll` (default false). RECTANGLE 4×N, ABSOLUTE positioning, MAX/MIN constraints, fill `Text&Icon/Tertiary`. Используется для design mockup'ов overflow-сценария; в коде scroll-bar отрисовывается native платформой.

3. **minHeight=64** на Container (= 2 строки Body 1 LH + padding). Designer ресайзит инстанс вертикально, Figma не даёт сжать меньше — гарантирует что textarea остаётся multi-line area, не превращается в визуальный input. Референс: «Leave a comment» в PI3XrUDuoGyK4aXkqyzYoB (39908:14120) — short comment-mode 64 px.

Итоговая matrix: 12 вариантов, 5 component properties (`Counter`, `Helper`, `Scroll`, `Counter text`, `Helper text`).
