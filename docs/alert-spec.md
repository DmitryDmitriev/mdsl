# Alert — спецификация

Alert — типизированное inline-сообщение с tinted фоном. Три композиционных стиля под разные сценарии: от компактной информационной полоски до карточки с действием.

Figma: страница **Alert**, набор **Alert** (`6947:14128`). 15 вариантов = 5 типов × 3 стиля.

---

## 1. Принципы

- **Композиция = роль.** Стиль определяет вес и контекст использования (Compact / Standard / Card).
- **Тип = семантика.** Каждый тип имеет свой `Decor/Bubble/*` фон + соответствующую иконку.
- **Mobile-native pattern.** Tinted bg, без бордеров. На белом экране в продукте все 5 типов читаются.
- **Width 328.** Все 3 стиля одной ширины (как Dialog), для встройки в стандартный mobile column.

---

## 2. Стили (axis Style)

| Style | Композиция | Иконка | Когда использовать |
|---|---|---|---|
| **Compact** | HORIZONTAL: icon + body | 16×16 | Inline-инфо в потоке формы / списка / страницы. Без действия. |
| **Standard** | VERTICAL: icon+title (header) + description | 24×24 | Заметное сообщение с заголовком и контекстом. Description — boolean. |
| **Card** | VERTICAL: icon+title + description + (?supporting) + action button | 32×32 fill | Эмфатическое сообщение: confirm, error с CTA. Action — boolean. |

---

## 3. Типы (axis Type)

| Type | Background | Title color | Description color | Icon (16 / 24 / 32) |
|---|---|---|---|---|
| **Info** | `Decor/Bubble/Info` | `Text/Black applied` | `Text/Black applied` | `ic_info` / `ic_info` / `ic_Info` |
| **Warning** | `Decor/Bubble/Warning` | `Text/Black applied` | `Text/Black applied` | `ic_warning_amber` / `ic_warning` / `ic_WarningCircle` |
| **Good** | `Decor/Bubble/Admin` | `Text/Black applied` | `Text/Black applied` | `ic_check_circle` / `ic_check_circle` / `ic_CheckCircle` |
| **Tech** | `Decor/Bubble/Question` | `Text/Black applied` | `Text/Black applied` | `ic_info` / `ic_info` / `ic_Info` |
| **Negative** | `Decor/Bubble/Negative` | `Text/Negative` (red) | `Text/Negative` (red) | `ic_declined` / `ic_declined` / `ic_MinusCircle` |

**Принцип цвета текста:**
- Все типы кроме Negative — **`Text/Black applied`** для title и description. Иерархия даётся **весом шрифта** (Medium/Bold для title vs Regular для description), не цветом. Лучшая читаемость на пастельных tinted-bg.
- **Negative** — особый случай: красный текст подчёркивает urgency для destructive-сценариев. В других типах семантика уже даётся фоном + иконкой; цветной текст там — лишний шум.

**Note:** Все иконки следуют конвенции `ic_*` префикса. Для Compact используется 16-вариант, для Standard — 24, для Card — 32 (outline-стиль).

---

## 4. Структура

### Compact

```
Alert (HORIZONTAL, FIXED 328, padding 12, gap 12, radius 12, align MIN top)
├── icon-wrap (HUG, paddingTop=2 — оптическая компенсация)
│   └── icon (16×16, ic_*)
└── body (TEXT, FILL, Base/Body 2 14/20)
```

### Standard

```
Alert (HORIZONTAL, FIXED 328, padding 12, gap 12, radius 12, align MIN top)
├── icon-wrap (HUG, paddingTop=0)
│   └── icon (24×24, ic_*)
└── inner (VERTICAL, FILL, gap 4)
    ├── title (TEXT, FILL, Base/Body 1 Medium 16/24)
    └── description (TEXT, FILL, Base/Body 2) [boolean Description, default true]
```

### Card

```
Alert (VERTICAL, FIXED 328, padding 12, gap 12, radius 16, fill = tinted)
├── content-row (HORIZONTAL, FILL/HUG, gap 12, align MIN top)
│   ├── icon-wrap (HUG, paddingTop=3 — оптическая компенсация для большой иконки)
│   │   └── icon (32×32, ic_*)
│   └── inner (VERTICAL, FILL, gap 8)
│       ├── title (TEXT, FILL, Heading/H4 Bold)
│       ├── description (TEXT, FILL, Base/Body 2) [boolean Description, default true]
│       └── supporting (TEXT, FILL, Caption/caption-md) [boolean Supporting, default false]
└── Action (Button Size=40, Type=Outline, FILL width) [boolean Action, default true]
```

**Структурное правило:** во всех 3 стилях иконка стоит **слева**, текстовый блок — справа в FILL-колонке. Description и Supporting выровнены по title (по началу текста, не по иконке). Это даёт чистый ритм слева→направо, легко читается на мобиле.

---

## 5. Свойства

| Property | Type | Values | Default | Доступно в стилях |
|---|---|---|---|---|
| **Style** | variant | `Compact / Standard / Card` | — | все |
| **Type** | variant | `Info / Warning / Good / Tech / Negative` | `Info` | все |
| **Description** | boolean | — | `true` | Standard, Card |
| **Supporting** | boolean | — | `false` | Card |
| **Action** | boolean | — | `true` | Card |

---

## 6. Размеры и токены

| Параметр | Compact | Standard | Card |
|---|---|---|---|
| Width | 328 | 328 | 328 |
| Padding | `spacing/3` (12) | `spacing/3` (12) | `spacing/3` (12) |
| Gap (root) | `spacing/3` (12) — icon↔body | `spacing/2` (8) — header↔desc | `spacing/3` (12) — content↔action |
| Gap (header) | — | `spacing/3` (12) | `spacing/3` (12) |
| Gap (content) | — | — | `spacing/2` (8) |
| Radius | `radius/3` (12) | `radius/3` (12) | `radius/4` (16) |
| Icon size | 16 × 16 | 24 × 24 | 32 × 32 |
| Action button | — | — | Size=40, Outline, FILL |

---

## 7. Типографика

| Слой | Стиль |
|---|---|
| Compact body | `Base/Body 2` (14/20) |
| Standard title | `Base/Body 1 Medium` (16/24) — был Body 2 Medium, поднят чтобы балансировать с 24-иконкой |
| Standard description | `Base/Body 2` (14/20) |
| Card title | `Heading/H4 Bold` — был Body 1 Medium, поднят до H4 Bold чтобы балансировать с 32 fill-иконкой |
| Card description | `Base/Body 2` (14/20) |
| Card supporting | `Caption/caption-md` (12/16) |

---

## 8. API (рекомендуемое)

```ts
interface AlertProps {
  type?: "info" | "warning" | "good" | "tech" | "negative";  // default "info"
  style?: "compact" | "standard" | "card";                   // default "compact"
  title?: string;                                             // ignored in compact
  body: string;                                               // compact: required body / standard,card: description
  supporting?: string;                                        // card only
  action?: { label: string; onClick: () => void };           // card only
  icon?: ReactNode;                                           // override default
}
```

```tsx
<Alert style="compact" type="info" body="Right now, you can only leave reviews for specific subcategories." />
<Alert style="standard" type="warning" title="Heads up!" body="Please complete your profile." />
<Alert style="card" type="good" title="Profile verified" body="Your changes are saved." action={{ label: "Open settings", onClick }} />
```

---

## 9. Когда какой стиль

| Use case | Style |
|---|---|
| Inline-подсказка под полем формы | **Compact** |
| Инфо-баннер в начале списка | **Compact** |
| Ошибка валидации формы (с заголовком) | **Standard** |
| Системное уведомление (без CTA) | **Standard** |
| Confirmation после действия | **Card** |
| Permission prompt с кнопкой | **Card** |
| Error с retry-действием | **Card** |

**Не использовать** для:
- Глобальных toast-уведомлений → `Snackbar`
- Модальных подтверждений → `Dialog`
- Полноэкранных пустых состояний → `EmptyState`

---

## 10. Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Color | **100%** |
| Token | **93%** |
| Type | **100%** |
| **Overall** | **95%** |

15 вариантов (5 type × 3 style). Hardcoded `paddingTop` в `icon-wrap`: 2px (Compact) и 3px (Card) — оптическая компенсация выравнивания иконок с первой строкой текста. В Standard `paddingTop=0` (24-иконка с lineHeight=24 уже выровнены). Намеренные design-decisions, не баг.

---

## 11. История решений

**2026-04-29 — два захода.**

**Заход 1 (утро):** импорт shadcn Alert (white bg, 16 icon side, side button) → tokenized. По осмотру: desktop-pattern, не работает в mobile.

**Заход 2 (день):** переосмыслили — взяли стиль Notification (tinted bg, 32 fill icon, full-width button), назвали `Alert`. Получилось 5 type variants × 3 booleans (Action/Description/Supporting). Старый shadcn Alert и старый Notification — deprecated.

**Заход 3 (день, после ревью):** дизайнер показал реальное использование на скриншоте — компактный inline-alert (16 outline icon, body only, no button). Один стиль не покрывает весь спектр use case'ов. Добавили **Style axis** (`Compact / Standard / Card`) — 15 вариантов = 5 type × 3 style.

Решения:
- **Style axis** — три композиционных стиля под разные сценарии (см. §2).
- **Type axis** — 5 семантических типов (Info / Warning / Good / Tech / Negative).
- **Booleans Description / Supporting / Action** — applicable только в стилях где соответствующие узлы существуют (Description в Standard/Card, Supporting и Action только в Card).
- **Иконки** — плейсхолдеры из имеющейся библиотеки (16/24 outline для Compact/Standard, 32 fill для Card). Дизайнер дорисует недостающие info/warning/alert outlines, swap'ает через Instance Swap.
- **Padding/radius/gap** — `spacing/3 (12)` ритм; radius `radius/3 (12)` для Compact/Standard, `radius/4 (16)` для Card (визуально подчёркивает «карточный» вес).
- **Action button** — `Size=40` (выше WCAG 44pt близко, рядом с 32-иконкой смотрится сбалансированно).

**Roadmap:**
- 16/24 outline icons: `info`, `warning`, `alert_circle`, `cog/settings` для семантически точных Compact/Standard вариантов
- Возможно `Type=Tech` переименовать в `System` или `Update` (более семантично)
- Если потребуется — добавить вариант с trailing close (×) для dismissable alerts

**2026-04-29 (вечер) — финал-ревизия после показа в продукте.**

Дизайнер показал реальное использование Compact (light blue inline-banner). Дополнительно сделали:
1. Все иконки заменены на `ic_*` варианты (новая конвенция в библиотеке). **Convention:** для всех новых компонентов использовать только иконки с `ic_` префиксом.
2. **Compact** — иконка завёрнута в `icon-wrap` с `paddingTop=2` для оптического выравнивания с первой строкой Body 2.
3. **Standard / Card** — restructure: root теперь HORIZONTAL `icon | inner(title + description ...)`. Description и Supporting выровнены по title (start-aligned), а не по всей ширине root. Это даёт правильную колоночную типографику.
4. **Title weights:** Standard поднят с Body 2 Medium → Body 1 Medium (16/24); Card поднят с Body 1 Medium → Heading/H4 Bold. Заголовки теперь визуально балансируют с тяжестью иконок (24, 32 fill).

**2026-04-30 — финальная цветовая ревизия.**

Дизайнер скорректировал backgrounds (Good→`Decor/Bubble/Admin`, Tech→`Decor/Bubble/Question` для лучшего контраста; семантика будет уточнена позже) и заменил fill-иконки 32 на outline-стиль. После осмотра:
1. **Optical compensation** распространена на все стили: Compact `paddingTop=2`, Standard `paddingTop=0` (lineH=24=icon), Card `paddingTop=3` (32-icon крупнее H4).
2. **Description цвет** изменён с `Text/Secondary` (серый, низкий контраст на пастельном bg) на **`Text/Black applied`** для всех типов кроме Negative. Иерархия теперь даётся весом шрифта (Medium/Bold/Regular), а не цветом.
3. **Negative — особый случай**: красный текст (Text/Negative) и для title и для description. В других типах цветной текст не применять (избыточно с tinted bg + иконкой). Решение зафиксировано: только Negative подчёркивает urgency через цвет.
