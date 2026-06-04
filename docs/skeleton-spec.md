# Skeleton — спецификация для разработки

**Один компонент — одна спека.** Skeleton — плейсхолдер контента в момент загрузки. Замещает блоки реального UI до получения данных.

Привязка к **docs/COLOR-PALETTE.md** и **docs/DESIGN-TOKENS.md**. Все цвета и размеры — через семантические токены.

Figma: страница **🟢 Skeleton** в файле UI-Kit-Mobile (`PI2N65xbeJPTc5oWhOP7Bl`).
- `Skeleton` (`7888:13`) — атомарный COMPONENT_SET (Shape variants).
- `Skeleton / Listing Card` (`7889:27`) — пресет с Layout=Grid|Wide.
- `Skeleton / List Item` (`7889:28`) — одиночный пресет.
- `Skeleton / Profile Header` (`7889:33`) — одиночный пресет.

---

## Обзор

Skeleton используется когда страница ждёт данные с сервера. Отрисовывает «скелет» будущего контента в виде серых блоков. Как только данные пришли — `Skeleton` заменяется на реальный компонент. Анимация shimmer передаёт «идёт загрузка».

### Архитектура: Атомы + Пресеты

**Атомы** (`Skeleton` COMPONENT_SET) — три формы для свободной композиции:

| Shape | Что | Default size | Radius |
|---|---|---|---|
| **Block** | Прямоугольный блок (image-плашка, чип, кнопка-плейсхолдер) | 200 × 80 | 8 |
| **Circle** | Круглый блок (avatar, иконка-плейсхолдер) | 40 × 40 | full (≥ width/2) |
| **Line** | Текстовая строка (заголовок, описание, мета) | 200 × 16 | 4 |

Designer / разработчик берёт нужную форму и **резизит свободно** — стандартный auto-layout / CSS resize.

**Пресеты** — готовые композиции под частые сценарии классифайдов:

| Пресет | Variants | Когда брать |
|---|---|---|
| **Skeleton / Listing Card** | `Layout = Grid \| Wide` | На листинге объявлений во время первой загрузки |
| **Skeleton / List Item** | — | Список чатов / уведомлений / пользователей |
| **Skeleton / Profile Header** | — | Шапка профиля / Объявителя |

Пресеты — это **начальные точки**, не строгие правила. Если конкретная карточка отличается — designer может: либо отредактировать инстанс пресета, либо собрать новую композицию из атомов.

---

## Структура пресетов

### Skeleton / Listing Card (Layout=Grid)

```
VERTICAL HUG, gap=8
├── Image (Block) 165×165, radius=12
├── Price (Line) 80×20
├── Title line 1 (Line) 160×16
├── Title line 2 (Line) 110×16
└── Meta (HORIZONTAL, gap=8)
    ├── Line 50×12
    └── Line 70×12
```

### Skeleton / Listing Card (Layout=Wide)

```
VERTICAL HUG, gap=8
├── Image (Block) 343×200, radius=12
├── Price (Line) 100×24
├── Title line 1 (Line) 280×16
├── Title line 2 (Line) 220×16
└── Meta (HORIZONTAL, gap=8)
    ├── Line 60×12
    ├── Line 80×12
    └── Line 50×12
```

### Skeleton / List Item

```
HORIZONTAL HUG, gap=12, align=CENTER, padding=12 V × 16 H
├── Avatar (Circle) 40×40
└── Texts (VERTICAL HUG, gap=6)
    ├── Line 180×16
    └── Line 120×12
```

### Skeleton / Profile Header

```
VERTICAL HUG, gap=12, align=CENTER, padding=24
├── Avatar (Circle) 80×80
├── Name (Line) 180×24
├── Caption (Line) 120×16
└── Stats (HORIZONTAL, gap=32)
    ├── Stat × 3 (VERTICAL gap=6, align=CENTER)
    │   ├── Number (Line) 40×20
    │   └── Label (Line) 60×12
```

---

## Цвет

| Элемент | Токен |
|---|---|
| Все skeleton-блоки (Block/Circle/Line) | `Background/Tertiary` |

`Background/Tertiary` = Zinc/200 Light, Zinc/800 Dark — даёт 2 шага элевации над `Background/Primary` страницы. Хорошо читается в обеих темах.

**Не вводим отдельный токен** `Background/Skeleton` — нет смысла плодить полу-дубликат, `Background/Tertiary` семантически корректен (нейтральная поверхность).

---

## Анимация (Shimmer)

В Figma анимация **не реализована** — это runtime-фича.

### Архитектура

База — `Background/Tertiary` (Zinc/200 Light, Zinc/800 Dark). Поверх — **theme-invariant white overlay** в виде движущегося градиента с пиком прозрачности ~0.4 в центре. Visual convention: shimmer — это «бегущий блик», всегда светлее базы, независимо от темы.

```
Base: Background/Tertiary (solid)
+
Overlay: linear-gradient(90deg,
  rgba(255,255,255, 0.0) 0%,
  rgba(255,255,255, 0.4) 50%,
  rgba(255,255,255, 0.0) 100%
), translateX(-100% → 100%), 1.6s ease-in-out infinite
```

### Почему theme-invariant white, а не `Background/Secondary`

Историческая (до 2026-06-04) формулировка спеки описывала shimmer как gradient `Tertiary → Secondary → Tertiary`. Это **работает только в Light**:

| Тема | `Background/Tertiary` (база) | `Background/Secondary` (highlight) | Результат |
|---|---|---|---|
| Light | Zinc/200 (`#e4e4e7`) | Zinc/**100** (`#f4f4f5`) — светлее | ✅ нормальный блик |
| Dark | Zinc/800 | Zinc/**900** — **темнее** | ⚠️ блик «тёмной полосой» |

В Dark `Secondary` темнее `Tertiary` (на ступень ближе к фону экрана) — буквальное применение spec'а давало бы тёмную бегущую полосу вместо светлого блика. **Не дизайн-замысел, а side-effect Zinc-палитры.**

Theme-invariant white overlay (alpha 0.4 пика) решает проблему: в обеих темах визуально один и тот же светлый блик поверх базы.

### Платформенные имплементации

**Web (CSS):**

```css
@keyframes skeleton-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.skeleton {
  background-color: var(--background-tertiary);                              /* база */
  background-image: linear-gradient(90deg,
    rgba(255,255,255, 0)   0%,
    rgba(255,255,255, 0.4) 50%,
    rgba(255,255,255, 0)   100%);                                            /* overlay */
  background-size: 200% 100%;
  background-repeat: no-repeat;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; background-image: none; }
}
```

**Android (Compose) — рекомендуемая реализация:**

```kotlin
val shimmerColors = listOf(
    Color.White.copy(alpha = 0.0f),
    Color.White.copy(alpha = 0.4f),
    Color.White.copy(alpha = 0.0f),
)
// drawn on top of background.tertiary base
```

**iOS (SwiftUI):**

```swift
LinearGradient(
    colors: [
        Color.white.opacity(0.0),
        Color.white.opacity(0.4),
        Color.white.opacity(0.0),
    ],
    startPoint: .leading,
    endPoint: .trailing
)
.blendMode(.normal)
// over Background.tertiary
```

Время цикла **1.6 s** (допустимо 1.4–1.8 s), движение **ease-in-out** (не linear — даёт «дышащий» эффект, не механический бег).

### Доступность — обязательно

При **reduced motion** анимация выключается, остаётся статичная плашка `Background/Tertiary`. Это критично для пользователей с вестибулярными проблемами.

- **Web:** `@media (prefers-reduced-motion: reduce)` — см. CSS выше.
- **iOS:** проверять `UIAccessibility.isReduceMotionEnabled` (UIKit) / `@Environment(\.accessibilityReduceMotion)` (SwiftUI).
- **Android:** проверять `Settings.Global.ANIMATOR_DURATION_SCALE == 0f` (см. `AccessibilityManager`). В Compose можно завернуть в helper `LocalReduceMotion.current`.

---

## A11y

- **`aria-busy="true"`** на родительском контейнере, в котором показывается skeleton.
- **`role="status"`** + `aria-label="Loading…"` на корневом skeleton-блоке (или на странице) — скринридер сообщит «Загружается».
- **Не использовать `<img>`** — это просто div'ы с фоном.
- **`prefers-reduced-motion`** — выключать анимацию.

---

## Сводная таблица токенов

| Параметр | Значение | Токен |
|---|---|---|
| Fill (все формы) | Zinc/200 / Zinc/800 | `Background/Tertiary` |
| Block radius | 8 | `radius/sm` или off-scale design constant |
| Line radius | 4 | off-scale design constant |
| Circle radius | full | width/2 (геометрия круга) |
| Listing image radius | 12 | соответствует card radius |

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fills) | **100%** |
| 🔲 Spacing / sizes | На дискретных значениях из шкалы spacing/size; индивидуальные размеры пресетов — design constants под конкретные карточки |
| 🎬 Animation | spec-only (CSS), не Figma |
| **Overall** | **100%** |

---

## Синхронизация с кодом

**React (примеры):**

```tsx
// Атом
<Skeleton shape="block" width={200} height={80} />
<Skeleton shape="circle" size={40} />
<Skeleton shape="line" width="60%" />

// Пресет
<SkeletonListingCard layout="grid" />
<SkeletonListingCard layout="wide" />
<SkeletonListItem />
<SkeletonProfileHeader />

// Использование с aria-busy
<div aria-busy={loading}>
  {loading
    ? Array.from({length: 6}).map((_, i) => <SkeletonListingCard key={i} layout="grid" />)
    : items.map(item => <ListingCard key={item.id} {...item} />)}
</div>
```

CSS-переменные:
```css
--skeleton-fill: var(--background-tertiary);
--skeleton-radius-block: 8px;
--skeleton-radius-line: 4px;
--skeleton-shimmer-duration: 1.6s;
```

---

## Связанные документы

- [COLOR-PALETTE.md](./COLOR-PALETTE.md) §2.1 — `Background/Tertiary`
- [empty-state-spec.md](./empty-state-spec.md) — соседний паттерн для пустых состояний (когда данные пришли пустыми, не во время загрузки)
- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы spacing / size / radius

---

## История миграций

**2026-06-04 — пересмотрена формулировка shimmer'а: theme-invariant white overlay вместо `Tertiary → Secondary → Tertiary`.**

Поводом стал drift-вопрос Android. В коде уже было сделано отклонение от буквы старой спеки — shimmer на white-alpha overlay (0.4 alpha пика), а не на token pair `Tertiary/Secondary`. Это **корректное решение проблемы Dark mode**, которая была признана ещё при первой ревизии (открытый вопрос §«Открытые вопросы» — теперь закрыт):

- В Light: `Background/Secondary` (Zinc/100) **светлее** `Background/Tertiary` (Zinc/200) → старая spec-формула работала.
- В Dark: `Background/Secondary` (Zinc/900) **темнее** `Background/Tertiary` (Zinc/800) — старая формула давала «тёмную полосу» вместо светлого блика.

Theme-invariant white overlay даёт визуально одинаковый светлый блик в обеих темах. Это индустриальный стандарт (Material 3, shadcn, react-content-loader). Не вводим отдельный token-pair специально под shimmer — overkill для одного use case.

Что обновлено:
- §«Анимация (Shimmer)» переписана: новая формулировка, объяснение «почему не Secondary», платформенные имплементации (Web + Android + iOS), reduced-motion детали для каждой платформы.
- §«Открытые вопросы» — закрыт пункт про Dark theme.

Code-side action (Android): уже на правильной формуле (`shimmerColors` с white.alpha 0.0 / 0.4 / 0.0). iOS и Web — реализовать по новой спеке.

**2026-05-11 — аудит готовности (component-spec-check), 9 правок в Figma.**

Цвета атомов (`Background/Tertiary`) и размеры — на 100% соответствовали спеке. Правки касались только hardcoded размеров фреймов-пресетов:

- **Skeleton / List Item** — Texts frame (`7889:32`): `layoutSizingHorizontal` FIXED 100 → **HUG** (по спеке §«Texts VERTICAL HUG»). Линии 180/120 больше не клипаются.
- **Skeleton / Profile Header** — Stats frame (`7889:43`): `layoutSizingVertical` FIXED 100 → **HUG**. Убрана лишняя hardcoded высота.
- **Skeleton / Profile Header** — Stat sub-frames (`7889:36 / :39 / :42`): `layoutSizingHorizontal` FIXED 100 → **HUG**.
- **Skeleton / Listing Card** Grid + Wide — Meta frames (`7889:17 / :26`): `layoutSizingVertical` FIXED 100 → **HUG**.
- **Skeleton / Listing Card** Grid + Wide — Listing image rectangles (`7889:11 / :19`): cornerRadius hardcoded 12 → биндинг **`radius/3`** (то же значение, корректная семантика «соответствует card radius»).

Avatar Ellipse (`7889:29 / :44`) — codegen MCP видел SVG-image-fill, но в Figma уже корректный binding на `Background/Tertiary`. Правка не потребовалась.

Skeleton (атомы + 4 пресета) → ✅ готов к разработке.

---

## Открытые вопросы

1. ~~**Skeleton для Dark theme.** Цвет работает в обеих темах (`Background/Tertiary`), но shimmer-градиент в Dark может потребовать смягчения — gradient от Zinc/800 → Zinc/700 → Zinc/800. Уточнить с командой при имплементации.~~ **Закрыто 2026-06-04** — решено через theme-invariant white overlay (alpha 0.4 пика), не через token pair. См. §«Анимация (Shimmer)» — пересмотрена в 2026-06-04 после drift-вопроса Android.
2. **Длительность анимации.** Дефолт 1.6 s. Тестируем на проде, может сократиться до 1.2 s или удлиниться до 2 s.
3. **Расширение пресетов.** Сейчас 4 пресета (Listing Grid/Wide, List Item, Profile Header). При появлении новых стандартных карточек — добавляем по запросу, а не превентивно.
