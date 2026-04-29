# Alert — спецификация

Alert — inline-сообщение в потоке мобильного контента с типизированным фоном, иконкой, заголовком, опциональным описанием/таймстампом и опциональной полно-широкой кнопкой действия.

Figma: страница **Alert**, набор **Alert** (`6947:14128`).

---

## 1. Принципы

- **Mobile-native pattern.** Tinted bg + крупная (32×32) fill-иконка + полноширинная кнопка снизу — паттерн iOS/Android, читается на мелких экранах.
- **Цвет = тип.** Каждый вариант имеет свой `Decor/Bubble/*` фон + свою fill-иконку. Smartphone-friendly визуальная семантика.
- **Гибкий контент.** Description и Action — boolean (можно скрыть). Supporting (timestamp / детали) — boolean (показать по необходимости).
- **Width 328.** Как `Dialog` — стандарт мобильной модалки/баннера для экранов 360px.

---

## 2. Структура

```
Alert (root, VERTICAL, FIXED 328, padding 12, gap 12, radius 16, fill = tinted)
├── Content (VERTICAL, FILL/HUG, gap 8)
│   ├── Header (HORIZONTAL, FILL/HUG, gap 12, align CENTER)
│   │   ├── icon (INSTANCE 32×32 fill, type-specific)
│   │   └── title (TEXT, Base/Body 1 Medium 16/24, FILL)
│   ├── description (TEXT, Base/Body 2 14/20, FILL) — boolean Description
│   └── supporting (TEXT, Caption/caption-md 12/16, FILL, Text/Tertiery) — boolean Supporting
└── Action (INSTANCE Button Size=40, Type=Outline, FILL width) — boolean Action
```

### Свойства

| Property | Type | Values | Default |
|---|---|---|---|
| **Type** | variant | `Info / Warning / Good / Tech / Negative` | `Info` |
| **Action** | boolean | — | `true` |
| **Description** | boolean | — | `true` |
| **Supporting** | boolean | — | `false` |

---

## 3. Размеры и токены

| Параметр | Значение | Токен |
|---|---|---|
| Width | 328 | hardcoded (как Dialog: `360 − 16×2`) |
| Padding (все стороны) | 12 | `spacing/3` |
| Gap root (Content ↔ Action) | 12 | `spacing/3` |
| Gap Content (title-block ↔ desc) | 8 | `spacing/2` |
| Gap Header (icon ↔ title) | 12 | `spacing/3` |
| Radius | 16 | `radius/4` |
| Icon size | 32 × 32 | (из иконочной библиотеки) |
| Action button | 40h, FILL width | Button `Size=40, Type=Outline, Form=Square` |

---

## 4. Цвета по типам

| Type | Background | Title | Description | Icon (fill 32) |
|---|---|---|---|---|
| **Info** | `Decor/Bubble/Info` | `Text/Black applied` | `Text/Secondary` | `32 / info_fill` |
| **Warning** | `Decor/Bubble/Warning` | `Text/Black applied` | `Text/Secondary` | `32 / warning_fill` |
| **Good** | `Decor/Bubble/Good` | `Text/Black applied` | `Text/Secondary` | `32 / check_circle_fill` |
| **Tech** | `Decor/Bubble/Tech` | `Text/Black applied` | `Text/Secondary` | `32 / info_fill` (плейсхолдер; swap на cog/settings когда появится в библиотеке) |
| **Negative** | `Decor/Bubble/Negative` | `Text/Negative` | `Text/Negative` | `32 / declined_fill` |

Supporting всегда `Text/Tertiery` независимо от типа.

---

## 5. Типографика

| Слой | Стиль |
|---|---|
| Title | `Base/Body 1 Medium` (16/24) |
| Description | `Base/Body 2` (14/20) |
| Supporting | `Caption/caption-md` (12/16) |

---

## 6. API (рекомендуемое)

```ts
interface AlertProps {
  type?: "info" | "warning" | "good" | "tech" | "negative";  // default "info"
  title: string;
  description?: string;            // showsDescription
  supporting?: string;             // showsSupporting (timestamp/details)
  action?: { label: string; onClick: () => void };  // shows button if provided
  icon?: ReactNode;                // override default
}
```

```tsx
<Alert type="good" title="Profile verified" description="Your changes are saved." action={{ label: "Open settings", onClick }} />
<Alert type="negative" title="Verification failed" description="Try again later." />
<Alert type="info" title="New feature" supporting="2 hours ago" />
```

---

## 7. Когда использовать

- **Inline в форме** — сообщение под полем или над секцией
- **Page-level баннер** — статус операции, новости, system message
- **Уведомления о состоянии** — verified, archived, error и т.п.

**Не использовать** для:
- Глобальных toast-уведомлений → `Snackbar`
- Модальных подтверждений → `Dialog`
- Полноэкранных пустых состояний → `EmptyState`

---

## 8. Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Color | **100%** |
| Token | **100%** |
| Type | **100%** |
| **Overall** | **100%** |

---

## 9. История решений

**2026-04-29 — переосмыслили Alert.**

Изначально (утром) был импортирован shadcn Alert (white bg, маленькая 16×16 иконка, кнопка справа). При совместном осмотре пришли к выводу: shadcn-стиль — desktop-pattern, в мобилке плохо работает. Параллельно существовал `Notification` (2270:2558) с правильным mobile-стилем.

**Решение:** объединить — взять Notification-стиль, имя `Alert`, добавить гибкость boolean'ов (Action/Description/Supporting).

Действия:
1. Создан новый `Alert` SET с 5 типами (Info / Warning / Good / Tech / Negative).
2. Добавлены 3 boolean: `Action` (default true), `Description` (default true), `Supporting` (default false).
3. Иконка 32×32 fill — per type, `Icon/Primary` цвет или дефолтный fill из библиотеки.
4. Action — наш Button Size=40 Outline, FILL width (40 выбран по балансу: 32 мелковат рядом с 32-иконкой, 48 переутяжелит).
5. Padding/gap uniform `spacing/3` (12) — единый ритм.
6. **Старый shadcn Alert** (5 variants Default/Destructive/Info/Success/Warning) → переименован в `.=[deprecated] Alert (shadcn)`, залочен. Существующие инстансы не сломаются.
7. **Старый Notification** (2270:2558) → переименован в `.=[deprecated] Notification`, залочен. Направлен на новый Alert.
8. **Tech-иконка** — временно `info_fill` (как было в Notification). Когда появится `cog_fill` или `settings_fill` 32px — подменим через Instance Swap.

**Roadmap:**
- Добавить 32px `gear_fill` / `settings_fill` в иконочную библиотеку → swap для Tech
- Возможно `Type=Tech` переименовать в `System` или `Update` (более семантично)
- Если потребуются compact-варианты (без иконки или с 24-иконкой) — добавить `Size = sm | md` axis
