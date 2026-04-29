# Alert — спецификация

Alert — статусное сообщение с иконкой, заголовком, описанием и опциональной кнопкой действия. Показывается в потоке контента (не модалка) — для подсказок, предупреждений, ошибок и подтверждений в форме.

Figma: страница **Alert**, набор **Alert** (`6910:1946`).

---

## 1. Принципы

- **Inline-сообщение.** Не модалка, не toast — Alert живёт в потоке контента (форма, лист, страница).
- **Цветная семантика по краям.** Border + цвет заголовка указывают тип сообщения. Фон всегда нейтральный (`Background/Primary`) — shadcn-style без tinted backgrounds.
- **Иконка обязательна.** Слева 16×16, по умолчанию `ic_check`. Дизайнер swap'ает на семантически подходящую (`ic_info`, `ic_warning`, `ic_alert_triangle` — когда появятся в библиотеке).
- **Action — необязательная.** Кнопка-инстанс справа, по умолчанию `Button Size=32, Type=Outline`.

---

## 2. Структура

```
Alert (root, HORIZONTAL, FILL/HUG, padding 12/16, gap 12)
├── Flex (FILL, HORIZONTAL, gap 12)
│   ├── Div (HUG, paddingTop=2 для оптического выравнивания иконки 16 vs текст 14)
│   │   └── icon (INSTANCE 16/ic_check, Icon/Primary)
│   └── Div (FILL, VERTICAL, gap 4)
│       ├── Alert Title (TEXT, Base/Body 2 Medium 14/20)
│       └── This is an alert description. (TEXT, Base/Body 2 14/20)
└── Button (INSTANCE Size=32, Type=Outline, Form=Square)
```

### Свойства

| Property | Type | Values | Default |
|---|---|---|---|
| **Variant** | variant | `Default` / `Info` / `Success` / `Warning` / `Destructive` | `Default` |

(Action button — instance, всегда виден; иконка — instance swappable.)

---

## 3. Размеры и токены

| Параметр | Значение | Токен |
|---|---|---|
| Padding-x | 16 | `spacing/4` |
| Padding-y | 12 | `spacing/3` |
| Gap (root) | 12 | `spacing/3` |
| Gap (Flex) | 12 | `spacing/3` |
| Gap (title↔desc) | 4 | `spacing/1` |
| Radius | 12 | `radius/3` |
| Border weight | 1 | `border/1` |
| Icon size | 16 × 16 | (из библиотеки иконок) |
| Внутренний padding-top icon-обёртки | 2 | hardcoded (оптическое выравнивание 16 vs 14) |

---

## 4. Цвета по вариантам

| Variant | Background | Border | Title | Description | Icon |
|---|---|---|---|---|---|
| **Default** | `Background/Primary` | `Border/Default` | `Text/Primary` | `Text/Secondary` | `Icon/Primary` |
| **Info** | `Background/Primary` | `Accent/Link` | `Accent/Link` | `Text/Secondary` | `Icon/Primary` |
| **Success** | `Background/Primary` | `Accent/Positive` | `Accent/Positive` | `Text/Secondary` | `Icon/Primary` |
| **Warning** | `Background/Primary` | `Accent/Warning` | `Accent/Warning` | `Text/Secondary` | `Icon/Primary` |
| **Destructive** | `Background/Primary` | `Accent/Negative` | `Accent/Negative` | `Accent/Negative` | `Icon/Primary` |

**Note:** В библиотеке существуют `Text/Negative`, `Text/Link`, `Text/Positive`, `Text/Warning` токены, но они в текущем mode резолвятся в `#FFFFFF` (видимо для inverted-mode). Для colored-вариантов используем `Accent/*` напрямую — они работают одинаково на light theme.

---

## 5. Типографика

| Слой | Стиль |
|---|---|
| Title | `Base/Body 2 Medium` (14/20) |
| Description | `Base/Body 2` (14/20) |

---

## 6. API (рекомендуемое)

```ts
interface AlertProps {
  variant?: "default" | "info" | "success" | "warning" | "destructive";  // default "default"
  icon?: ReactNode;             // override default ic_check
  title: string;
  description?: string;
  action?: ReactNode;           // <Button size="32" variant="outline">Action</Button>
}
```

```tsx
<Alert variant="warning" title="Heads up!" description="You can preview the changes here." />
<Alert variant="destructive" title="Error" description="Failed to save." action={<Button>Retry</Button>} />
```

---

## 7. Когда использовать

- **Inline-сообщение** в форме, листе, странице
- **Подтверждение** действия пользователя
- **Подсказка** или предупреждение

**Не использовать** для:
- Глобальных уведомлений (toast) → `Snackbar`
- Модальных подтверждений → `Dialog`
- Полноэкранных пустых состояний → `EmptyState`

---

## 8. Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Color | **100%** |
| Token | 92% |
| Type | **100%** |
| **Overall** | **95%** |

Hardcoded: `paddingTop=2` у icon-wrapper Div (оптическое выравнивание). Документирован как осознанное исключение.

---

## 9. История решений

**2026-04-29 — взято от коллег (shadcn UI Alert), завернуто в наши токены.**

Действия:
1. Цвета `#FFFFFF`, `#E4E4E7`, `#09090B`, `#71717A`, `#DC2626` (shadcn) → Larixon `Background/Primary`, `Border/Default`, `Text/Primary`, `Text/Secondary`, `Accent/Negative`.
2. shadcn `CheckCircle` 16×16 → наш `16 / ic_check` из библиотеки иконок, fill `Icon/Primary`.
3. shadcn `Button` (24h) → наш `Button Size=32, Type=Outline, Form=Square`.
4. Inter Medium 14 / Regular 14 → текстовые стили `Base/Body 2 Medium` / `Base/Body 2`.
5. Padding/radius/gap привязаны к нашим `spacing/*`, `radius/3`, `border/1`.
6. Добавлены 3 новых variants: `Info`, `Success`, `Warning` (раньше было только `Default`/`Destructive`).
7. Для colored-variants использованы `Accent/*` напрямую (Text/Negative и компании резолвятся в #FFFFFF в текущем mode).
