# Tabs — спецификация

Tabs — переключатель в стиле Radix/shadcn UI: пилюлеобразный контейнер с фоном и активным сегментом-карточкой с тенью. Используется для переключения между взаимоисключающими разделами одного экрана.

**Не путать с** `Top App Bar` (навигационные табы) и Material 3 `Segmented control` (Android-native, отдельный компонент в этом же файле).

Figma: страница **🟢 Segment Control**, наборы:
- `Tabs` (COMPONENT_SET) — главный компонент
- `.=Tab Item` (COMPONENT_SET) — building block, скрыт из Assets

---

## 1. Принципы

- **Контейнер с активной карточкой.** Контейнер — `Background/Tertiary`, активный таб — белая карточка с тенью `Elevation/Floating`.
- **Один активный таб одновременно.** Поведение radio-group.
- **Items пакуются плотно.** `itemSpacing = 0`, чтобы пилюли «склеивались».
- **Building block для повторного использования.** `.=Tab Item` — отдельный COMPONENT_SET с осями `Size × Active`, используется как инстанс внутри `Tabs`.

---

## 2. Структура

```
Tabs (COMPONENT_SET, варианты Size × Items)
└── Size=md, Items=3 (root, HORIZONTAL, HUG/HUG)
    ├── padding = spacing/1 (4) со всех сторон
    ├── radius = radius/3 (12) — для md/lg
    ├── itemSpacing = 0
    ├── fill = Background/Tertiary
    ├── Tab 1 (instance .=Tab Item, Active=On)
    ├── Tab 2 (instance .=Tab Item, Active=Off)
    └── Tab 3 (instance .=Tab Item, Active=Off)
```

```
.=Tab Item (COMPONENT_SET, варианты Size × Active)
└── Size=md, Active=On (HORIZONTAL, HUG/FIXED)
    ├── height = size/md (32)
    ├── padding-x = spacing/3 (12)
    ├── itemSpacing = spacing/1 (4)
    ├── radius = radius/2 (8)
    ├── fill = Background/Primary (только при Active=On)
    ├── effect = Elevation/Floating (только при Active=On)
    ├── icon (FRAME 20×20, boolean Icon, hidden by default)
    ├── Label (TEXT, Base/Body 2 Medium)
    └── Badge (instance, boolean Badge, hidden by default)
```

### Свойства `Tabs`

| Property | Type | Values | Default |
|----------|------|--------|---------|
| **Size** | variant | `sm` / `md` / `lg` | `sm` |
| **Distribution** | variant | `Hug` / `Fill` | `Hug` |
| **Items** | **SLOT** | — | `.=Tab Item` |

Итого **6 вариантов** = 3 × 2.

**Distribution:**
- `Hug` — каждый таб шириной по содержимому (Account шире Password). Контейнер — auto-layout HUG.
- `Fill` — табы делят ширину контейнера поровну. Контейнер с `FIXED` шириной (по умолчанию 480 px), Tab Item внутри — `FILL`. Используется для full-width tabs в формах и хедерах секций.

### Items — нативный Figma Slot

`Tabs` использует **Figma Slot** (open beta) для произвольного количества табов. Слот `Items` принимает любое количество инстансов `.=Tab Item`. `preferredValues` слота указывают на `.=Tab Item` — Figma подскажет дизайнеру, что именно класть.

**Использование в Figma UI:**
1. Перетащить инстанс `Tabs` на холст — появятся 3 default-таба внутри слота
2. Выделить инстанс таба внутри → правая панель → менять `Active`, `Size`, `Icon`, `Badge`, текст лейбла
3. Дублировать (`Cmd+D`) для добавления табов / удалить (`Backspace`)
4. Перетащить любой свой `.=Tab Item` инстанс прямо в слот — заменит default

**Замечание про Plugin API:** на момент написания спеки (2026-04-27) `figma.createSlot` доступен только на исходном COMPONENT'е (не на `figma` глобал). Slots в инстансах модифицируются через UI или с обходом race-condition в Plugin API (yield event loop после `appendChild`).

### Свойства `.=Tab Item`

| Property | Type | Values | Default |
|----------|------|--------|---------|
| **Size** | variant | `sm` / `md` / `lg` | `md` |
| **Active** | variant | `On` / `Off` | `Off` |
| **Icon** | boolean | — | `false` |
| **Badge** | boolean | — | `false` |

---

## 3. Размерная сетка

| Параметр | sm | md | lg |
|---|---|---|---|
| **Container height** | 32 | 40 | 48 |
| **Container token** | — (вычисляется из Item + padding) | — | — |
| **Container radius** | `radius/2` (8) | `radius/3` (12) | `radius/3` (12) |
| **Container padding** | `spacing/1` (4) | `spacing/1` (4) | `spacing/1` (4) |
| **Container itemSpacing** | 0 | 0 | 0 |
| **Item height** | `size/sm` (24) | `size/md` (32) | `size/lg` (40) |
| **Item radius** | `radius/1` (4) | `radius/2` (8) | `radius/2` (8) |
| **Item padding-x** | `spacing/2` (8) | `spacing/3` (12) | `spacing/4` (16) |
| **Item itemSpacing** | `spacing/1` (4) | `spacing/1` (4) | `spacing/1` (4) |
| **Icon size** | 16 × 16 | 24 × 24 | 24 × 24 |
| **Icon source** | `16 / ic_check` (default) | `24 / ic_check` (default) | `24 / ic_check` (default) |
| **Text style** | `Caption/caption-md` (12/16) | `Base/Body 2 Medium` (14/20) | `Base/Body 1 Medium` (16/24) |

---

## 4. Цвета

| Слой | Состояние | Token |
|---|---|---|
| Container | — | `Background/Tertiary` |
| Item fill | Active=On | `Background/Primary` (белый) |
| Item fill | Active=Off | прозрачный (нет fills) |
| Item shadow | Active=On | `Elevation/Floating` |
| Item shadow | Active=Off | нет |
| Label | Active=On | `Text/Primary` |
| Label | Active=Off | `Text/Secondary` |
| Icon | Active=On | `Icon/Primary` |
| Icon | Active=Off | `Icon/Secondary` |

---

## 5. Поведение

### Active toggle

В Figma: дизайнер вручную меняет вариант `Active` на нужном инстансе таба. В коде: контролируется prop'ом `value`.

### Tab items count

В Figma — выбирается через variant `Items` (2 / 3 / 4). Если нужно больше — добавить вариант `Items=5` (расширение по запросу).

### Icon / Badge per tab

Boolean'ы `Icon` и `Badge` управляются на уровне каждого инстанса (override). Можно сделать таб с иконкой+текстом, текст+бейдж или только текст в одной группе.

**Иконки — живые из библиотеки.** Дефолт — `ic_check` (16px для sm, 24px для md/lg). При использовании дизайнер делает Instance Swap на нужную иконку. Цвет привязан к токенам: `Icon/Primary` для Active=On, `Icon/Secondary` для Active=Off.

**Note:** библиотека Larixon не имеет 20px иконок, поэтому md и lg табы используют одинаковый 24px ассет. При появлении 20px ассетов — обновим md.

**Конфигурация Badge внутри Tab Item** (по умолчанию):
- `Type=Default, Size=2xs, Shape=Pill`
- `Icon=false, Label=false, Counter=true` — только число (паттерн «Notifications 8»)
- Дизайнер меняет число через override counter-текста

---

## 6. API компонента (рекомендуемое)

```ts
interface TabsProps {
  size?: "sm" | "md" | "lg";        // default "md"
  value: string;                     // controlled active item id
  onValueChange: (v: string) => void;
  children: ReactNode;               // Tab[] items
}

interface TabProps {
  value: string;                     // unique id
  icon?: ReactNode;
  badge?: ReactNode;                 // обычно <Badge count={N} />
  children: ReactNode;               // label
}
```

```tsx
<Tabs size="md" value={tab} onValueChange={setTab}>
  <Tab value="account">Account</Tab>
  <Tab value="password">Password</Tab>
</Tabs>

<Tabs size="sm" value={tab} onValueChange={setTab}>
  <Tab value="billing">Billing</Tab>
  <Tab value="notifications" badge={<Badge count={8} />}>Notifications</Tab>
</Tabs>
```

---

## 7. Доступность

- `role="tablist"` на контейнере, `role="tab"` на каждом item
- `aria-selected` на active
- Стрелочная навигация: ← / → переключают активный
- Home / End — на первый / последний
- `aria-controls` на tab → id панели контента
- Tap-зоны: lg=48 ≥44 pt (WCAG OK), md=40 (граница), **sm=32 ниже WCAG** — использовать только в плотных layout с кликабельной зоной шире item

---

## 8. Когда использовать

- Переключение между разделами **одного экрана** (Profile: Account / Password)
- Фильтрация view (List / Grid / Cards)
- Tabs в формах (короткий шаг)

**Не использовать** для:
- Глобальной навигации между экранами → Top App Bar / Bottom Navigation
- Длинного списка опций (>4) → Sheet или Dropdown
- Кнопок-действий (Save / Cancel) → Buttons Stack

---

## 9. Связанные компоненты

- **Segment control (Android, M3)** — Material Design Tabs с индикатором снизу. Native Android-pattern, для Android-only экранов
- **Top App Bar v2** — навигационные табы экрана
- **Badge** — счётчик внутри Tab Item
- **Button** — для иерархического CTA вместо переключателя

---

## 10. Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Color | **100%** |
| Token | **100%** |
| Type | **100%** |
| **Overall** | **100%** |

Building blocks (`.=Tab Item`) залочены и скрыты из Assets через префикс `.=`.

---

## 11. История решений

**2026-04-27 — пересборка с нуля.** Изначально на странице был прототип `Tabs / Trigger` из внешней библиотеки (фиолетовый dashed). При уборке страницы был ошибочно удалён, дизайнер показал референс — Radix-style Tabs. Принято решение собрать собственный компонент с нуля на наших токенах.

Решения:
1. **Building block `.=Tab Item`** отдельным SET'ом — переиспользуется в `Tabs` через инстансы. Размеры через variant `Size`, активность через variant `Active`.
2. **Tabs containerHeight** не токенизирован — вычисляется из item-height (`size/sm/md/lg`) + двойной `spacing/1` (4×2). Не нужен отдельный token.
3. **Item padding-y** не задан — высота фиксирована, контент центруется (правило 6 audit rules).
4. **Items=2/3/4** — наиболее частые кейсы. Items=5 добавим по запросу.
5. **Active controlled by variant** — каждый инстанс таба меняет своё `Active` через override. В коде это будет `selected` prop.

**Следующие шаги:**
- Добавить вариант `Items=5` если потребуется
- Добавить `Disabled` state по запросу (сейчас не блокирующий)
- Анимация перехода между активными табами (CSS transition `transform` для pill)
