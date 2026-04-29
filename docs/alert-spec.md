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

| Type | Background | Title color | Icon (16 / 24 / 32) |
|---|---|---|---|
| **Info** | `Decor/Bubble/Info` | `Text/Black applied` | `dot_fill` / `visibility` / `info_fill` |
| **Warning** | `Decor/Bubble/Warning` | `Text/Black applied` | `expand_more` / `expand_more` / `warning_fill` |
| **Good** | `Decor/Bubble/Good` | `Text/Black applied` | `check` / `check` / `check_circle_fill` |
| **Tech** | `Decor/Bubble/Tech` | `Text/Black applied` | `setting` / `menu` / `info_fill` |
| **Negative** | `Decor/Bubble/Negative` | `Text/Negative` | `close` / `cancel_fill` / `declined_fill` |

**Note:** 16 и 24 outline-иконки — плейсхолдеры из имеющихся в библиотеке. По мере того как добавятся настоящие `info`, `warning`, `alert_circle` outlines в библиотеке — дизайнер swap'ает через Instance Swap.

---

## 4. Структура

### Compact

```
Alert (HORIZONTAL, FIXED 328, padding 12, gap 12, radius 12, fill = tinted)
├── icon (16×16)
└── body (TEXT, FILL, Base/Body 2 14/20)
```

### Standard

```
Alert (VERTICAL, FIXED 328, padding 12, gap 8, radius 12, fill = tinted)
├── Header (HORIZONTAL, FILL/HUG, gap 12, align CENTER)
│   ├── icon (24×24)
│   └── title (TEXT, FILL, Base/Body 2 Medium)
└── description (TEXT, FILL, Base/Body 2) [boolean Description, default true]
```

### Card

```
Alert (VERTICAL, FIXED 328, padding 12, gap 12, radius 16, fill = tinted)
├── Content (VERTICAL, FILL/HUG, gap 8)
│   ├── Header (HORIZONTAL, FILL/HUG, gap 12, align CENTER)
│   │   ├── icon (32×32 fill)
│   │   └── title (TEXT, FILL, Base/Body 1 Medium 16/24)
│   ├── description (TEXT, FILL, Base/Body 2) [boolean Description, default true]
│   └── supporting (TEXT, FILL, Caption/caption-md) [boolean Supporting, default false]
└── Action (Button Size=40, Type=Outline, FILL width) [boolean Action, default true]
```

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
| Standard title | `Base/Body 2 Medium` (14/20) |
| Standard description | `Base/Body 2` (14/20) |
| Card title | `Base/Body 1 Medium` (16/24) |
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
| Token | **100%** |
| Type | **100%** |
| **Overall** | **100%** |

15 вариантов (5 type × 3 style), все на токенах.

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
