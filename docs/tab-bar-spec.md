# Tab Bar — спецификация компонента

Молекула — нижняя навигационная панель приложения. Постоянный sticky-bottom элемент с 3–5 вкладками, переключающими корневые разделы (Главная, Поиск, Объявления, Чаты, Профиль).

**Figma:** страница **🟢 Tab Bar**, COMPONENT_SET `Tab Bar` (`4318:873`), 2 варианта (Android / iOS).

**Категория:** Molecule.

---

## 1. Обзор

Tab Bar — главная навигация уровня приложения, заякоренная к нижнему краю экрана. Активная вкладка визуально выделяется (icon + label = `Accent/Primary`), остальные — `Text&Icon/Secondary`. Tap по вкладке мгновенно переключает корневой раздел; double-tap или long-press реализуется на стороне продукта.

Tab Bar — **системный sticky-элемент**, его поведение зашито в платформенный navigation pattern:
- **Android** — `BottomNavigationView` / `NavigationBar` (Material 3 spec) с visual layer Larixon.
- **iOS** — `UITabBar` с visual layer Larixon.

Дизайн отрисовывает оба mockup'а в Figma; код использует системные нативные контролы с применением Larixon-токенов через theme.

---

## 2. Варианты (variants)

| Свойство | Значения |
|---|---|
| **Type** | `Android` / `iOs` |

Итого **2 варианта** на уровне Tab Bar (root). Внутри — building blocks:

| Building Block | SET id | Назначение |
|---|---|---|
| **`.=Building Blocks`** | `35:11686` | Один tab-item (icon + label + опц. badge); ось `Active × Badge` |
| **`.=Tab Item`** | `1955:2749` | Tab item для iOS-стека; ось `Active=Yes/No` |
| **`.=Button/Vertical Stack`** | `1198:8444` | Android-стиль item: icon **над** label; ось `Active=Yes/No` |
| **`.=Button/Horizontal Stack`** | `1198:8451` | iOS-стиль item: icon **слева от** label; ось `Active=Yes/No` |

**Имена осей унифицированы** после миграции 2026-05-12: везде `Active=Yes/No`. Раньше было трое разных (`Active`/`Selected`/`Select`) — теперь one.

### Platform mapping

| Type | Внутренняя структура | Layout |
|---|---|---|
| **Android** (`89:15686`) | Композиция из `.=Button/Vertical Stack` детей | icon-over-label (вертикально), 80 px height |
| **iOs** (`1198:8491`) | Композиция из `.=Button/Horizontal Stack` + Tab Item детей | icon-side-by-side-label (вариативно), 83 px height (49 + 34 safe-area home indicator) |

---

## 3. Структура слоёв

```
Tab Bar (COMPONENT) — sticky-bottom, FILL width
├── Type=Android (80 px height)
│   └── 3–5 × .=Button/Vertical Stack (icon-over-label)
│       └── Active=Yes/No
└── Type=iOs (83 px height, includes 34 px safe-area)
    └── 3–5 × .=Button/Horizontal Stack / .=Tab Item
        └── Active=Yes/No
```

### iOS высота — 49 + 34 px

В Figma визуально 83 px (49 pt content + 34 pt safe-area для home indicator). **В коде** высота content-зоны управляется системой через `additionalSafeAreaInsets`:
- Content height: 49 pt — фиксированный по HIG.
- Safe-area home indicator: 34 pt — на устройствах с notch / Dynamic Island.
- На устройствах без home indicator (старые iPhone SE) safe-area = 0, общая высота = 49 pt.

**Android высота — 80 px**. Material 3 NavigationBar default = 80 dp (Section §M3.bottom-nav). Внутренний `paddingTop` = 12, `paddingBottom` = 16.

---

## 4. Таблица токенов

### Цвета

| Элемент | Inactive | Active |
|---|---|---|
| Icon / Label | `Text&Icon/Secondary` | **`Accent/Primary`** |
| Background | `Background/Primary` (default — inline) | — |

> **Active state на обеих платформах = `Accent/Primary`** (красный Larixon, brand-консистентность). Альтернативы M3 (pill-indicator) или iOS (system Blue) **не используются** — в Figma были смешаны три разных токена, теперь унифицировано.
>
> **Sticky-режим** (стандартный для Tab Bar — он всегда sticky к нижнему краю) — дизайнер на инстансе в продуктовом файле override-ит `Background/Primary` → `Surface/Surface Primary` (Foundation-правило, см. [COLOR-PALETTE.md §3.2](./COLOR-PALETTE.md#32-surface)). В Dark это даёт elevation-контраст Zinc/800 над Zinc/950 при скроллящемся под баром контенте.

### Типографика

| Элемент | Стиль | Размер |
|---|---|---|
| Label | **`Caption/caption-md Medium`** | Inter 12/16 w500 |

12 px выбрано как баланс: читаемо для glance-навигации (vs Caption sm 10/12), при этом не доминирует над иконкой 24×24. `Caption sm` оставлен за под-иконковыми подписями в FAB и Segment Control.

### Размеры и отступы

| Параметр | Значение | Токен |
|---|---|---|
| Tab Bar height (Android) | 80 | hardcoded (Material 3 spec) |
| Tab Bar height (iOS) | 83 = 49 + 34 | hardcoded (HIG + safe-area) |
| Icon size | 24 × 24 | `size/sm` |
| Gap icon ↔ label | 4 | `spacing/1` |
| Padding horizontal (Android root) | 8 | `spacing/2` |
| Item min-width | по содержимому (HUG) | — |

### Elevation

| Платформа | Эффект | Light | Dark |
|---|---|---|---|
| Tab Bar root | `Elevation/Bottom` | drop-shadow вверх (бар отделён от контента над ним) | `none` (тени на тёмном неразличимы) |

`Elevation/Bottom` выбрана потому что shadow направлен **вверх** — Tab Bar примагничен к нижнему краю, тень указывает на отделение от scrolling-content над ним.

---

## 5. Active state — decision

Из 3 кандидатов выбран **option (a)**: иконка + лейбл в активном состоянии = **`Accent/Primary`** на обеих платформах.

**Почему не option (b)** (M3 pill-indicator за иконкой): требует структурного усложнения (background-pill child под иконкой), увеличивает variant matrix, не даёт ощутимой UX-выгоды vs прямая раскраска иконки/лейбла.

**Почему не option (c)** (тонкая линия-indicator над item): не unify-ится с iOS, который у Apple использует tinted-иконку.

Решение фиксирует **brand-консистентность**: красный Larixon Accent — primary marker active-состояния на обеих платформах. Платформенные различия остаются только в раскладке (vertical/horizontal stack), геометрии (80 vs 83 px height) и nav-pattern (Material vs HIG), цветовая семантика — общая.

---

## 6. A11y

- **Роль:** `role="tablist"` на root, `role="tab"` + `aria-selected="true|false"` на item'ах. Native контролы (`UITabBar`, `NavigationBar`) выставляют это автоматически.
- **Tap target:** Android item — ≥ 48 dp (FILL ширины, height 80 даёт zone больше 48). iOS item — 49 pt height + horizontal span. WCAG AA пройдено.
- **Active indicator:** не только цвет — Apple/Material системно подкрашивают tinted-иконку. Дополнительно icon-form может меняться (filled vs outline) — это решается на уровне icon-pair в Larixon Assets.
- **Контраст:** `Accent/Primary` (Zinc/950 Light) на `Background/Primary` (#ffffff Light) = ≥ 15:1, AAA. В Dark `Accent/Primary` (Zinc/200) на `Background/Primary` (Zinc/950) — также AAA.
- **VoiceOver / TalkBack:** label вкладки + state «выбрано» / «не выбрано». Системные NavigationBar / UITabBar выдают это из-коробки.

---

## 7. Использование

| Кейс | Применять |
|---|---|
| Главная навигация приложения (3–5 корневых разделов) | **Tab Bar** |
| Переключение режимов внутри страницы (фильтры, виды списка) | **Segment Control** или **Tabs** |
| Вертикальная навигация / drawer | не Tab Bar — отдельный паттерн |
| Контекстные действия (Save / Share / Delete) | **FAB Bar** или **Buttons Stack**, не Tab Bar |

**Количество вкладок:**
- Минимум — 3 (меньше — обычно один из этих разделов оверкилл, лучше переосмыслить нав).
- Максимум — 5 (больше не помещается без скролла; для большего — overflow «Ещё» как 5-й item).

**Active разделы — взаимоисключающие.** Tab Bar не двойного назначения (нельзя одновременно «и Главная, и Профиль»). Если нужна логика «зашёл сразу в Чат» — это deeplink в раздел Чатов, не отдельный tab.

---

## 8. Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (active/inactive) | **100%** (`Accent/Primary`, `Text&Icon/Secondary`, `Background/Primary`) |
| 🔤 Typography | **100%** (`Caption/caption-md Medium`) |
| 🌑 Elevation | **100%** (`Elevation/Bottom`) |
| 🔲 Spacing / Size | **100%** (`spacing/*`, `size/sm`) |
| **Overall** | **~95%** (Badge — TODO, см. §10) |

---

## 9. Связанные документы

- [badge-spec.md](./badge-spec.md) — Badge для каунтеров на вкладках (см. §10 TODO)
- [elevation-spec.md](./elevation-spec.md) — `Elevation/Bottom`
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — `Accent/Primary`, `Background/Primary`, `Surface/Surface Primary`; §3.2 — правило sticky-overrride
- [TYPOGRAPHY.md](./TYPOGRAPHY.md) — `Caption/caption-md Medium`
- [tabs-spec.md](./tabs-spec.md) — соседний паттерн для in-page навигации (не root)
- [segment-control-spec.md](./segment-control-spec.md) — альтернатива для переключения режимов внутри страницы

---

## 10. Открытые задачи

1. **Badge как инстансы canonical Badge.** Сейчас в `.=Building Blocks` (`35:11686`) badges (Small / Large single-digit / Multiple-digits) реализованы как inline-shapes. Нужно заменить на инстансы `Badge` SET из [badge-spec.md](./badge-spec.md), подставляя соответствующие variants (Size = xs/sm + Content = Number/Dot). После замены варианты Tab Bar Building Blocks становятся консистентны с продуктовыми Badge-инстансами по spec.
   - **Приоритет:** низкий — текущая inline-реализация визуально совпадает с badge-spec, не блокирует разработку.
   - **Когда делать:** при следующей правке Tab Bar или при обновлении Badge spec.

2. **Icon-only вариант.** Material 3 поддерживает `BottomNavigation` без лейблов — в Larixon пока не добавляем. Если по UX-тестам поймём, что лейблы избыточны для опытных пользователей, добавим axis `Show label = true/false`.

---

## 11. История миграций

**2026-05-12 — аудит готовности (component-spec-check), 31 правка в Figma + новая спека.**

### Figma — токены (Pass 1, 29 правок)

- **15 fills** на active-нодах (icon Union + label-text в `Active=Yes`-вариантах всех 4 SET'ов) перепривязаны с `Text&Icon/Primary` / `Text&Icon/Secondary` → **`Accent/Primary`**. Унифицирован active-цвет на обеих платформах (раньше: `Colors/Blue` iOS / `Accent/Link` Tab Item / `Text&Icon/Primary` Android — три разных).
- **12 text styles** на label-text нодах: `M3/label/medium` (Roboto 12/16) → **`Caption/caption-md Medium`** (Inter 12/16). Roboto → Inter, унификация с остальной типографикой Larixon.
- **2 effect styles** на root Tab Bar вариантах (`89:15686` Android + `1198:8491` iOS): добавлен **`Elevation/Bottom`** (раньше отсутствовала). В Dark `Elevation/Bottom` рендерится как `none` (см. elevation-spec).
- **iOS root** (`1198:8491`) — добавлен fill `Background/Primary` (раньше fill отсутствовал).

### Figma — структура (Pass 2, 14 переименований)

- **Удалена ось `Theme=Light`** из `.=Building Blocks` (`35:11686`). 8 variants переименованы (`Active=*, Badge=*, Theme=Light` → `Active=*, Badge=*`). Axis Theme в DS не нужна — тема через токены.
- **Унифицированы имена осей** на всех 4 SET'ах: `Selected=True/False` (Button/Vertical+Horizontal Stack) и `Select=Yes/No` (Tab Item) → **`Active=Yes/No`** везде. Соответствует convention из `.=Building Blocks`.

### Decisions, зафиксированные в спеке

- **Active state = `Accent/Primary`** на обеих платформах. Brand-консистентность важнее M3-/HIG-канона.
- **Label size = `Caption/caption-md Medium`** (12/16). 10 px (Caption sm) оставлен под FAB-метки и Segment Control под-иконковые подписи.
- **iOS высота = 49 + 34 = 83 px** с safe-area home indicator. В коде управляется системой через `additionalSafeAreaInsets`.
- **Platform differences** — оставлены: Android vertical stack + 80 px, iOS horizontal stack + 83 px. Структурные/геометрические различия, цвета/typography canonical.
- **Icon-only вариант** не делаем сейчас — отдельный axis по необходимости.

### Decisions — sticky default

В Tab Bar root по умолчанию `Background/Primary` (inline-default согласно Foundation-правилу). Sticky-override на `Surface/Surface Primary` делается продуктовым дизайнером на инстансе. Хотя Tab Bar **всегда** sticky в проде, default-токен в библиотеке остаётся inline — это требует доп. шага override, но избегает удвоения variant-матрицы (axis `Elevation` не вводим, см. [COLOR-PALETTE.md §3.2](./COLOR-PALETTE.md#32-surface)).

### Открытое (Pass 3)

- Badge как canonical инстансы из `badge-spec.md` — отложено как TODO (см. §10).

Tab Bar → ✅ готов к разработке.
