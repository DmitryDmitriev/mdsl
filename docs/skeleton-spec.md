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

В Figma анимация **не реализована** — это runtime-фича. В коде используется **shimmer-эффект** — движущийся градиент поверх skeleton-блока:

```css
@keyframes skeleton-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--background-tertiary) 0%,
    var(--background-secondary) 50%,
    var(--background-tertiary) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}
```

**React (рекомендация):** использовать `react-content-loader` или собственный компонент с CSS-animation выше. Время цикла 1.4–1.8 s, без линейного движения (ease-in-out даёт «дышащий» эффект).

**Доступность:** при `prefers-reduced-motion: reduce` — выключить анимацию, оставить статичную плашку. Это критично для пользователей с вестибулярными проблемами.

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

## Открытые вопросы

1. **Skeleton для Dark theme.** Цвет работает в обеих темах (`Background/Tertiary`), но shimmer-градиент в Dark может потребовать смягчения — gradient от Zinc/800 → Zinc/700 → Zinc/800. Уточнить с командой при имплементации.
2. **Длительность анимации.** Дефолт 1.6 s. Тестируем на проде, может сократиться до 1.2 s или удлиниться до 2 s.
3. **Расширение пресетов.** Сейчас 4 пресета (Listing Grid/Wide, List Item, Profile Header). При появлении новых стандартных карточек — добавляем по запросу, а не превентивно.
