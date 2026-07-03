# Page Indicator — спецификация для разработки

**Один компонент — одна спека.** «Page Indicator» — индикатор позиции в постраничном контенте (карусели, онбординг, галереи фото). Ряд точек; текущая страница — удлинённая «пилюля».

Привязка к **docs/DESIGN-TOKENS.md** и **docs/COLOR-PALETTE.md**. Все размеры, радиусы и цвета — через существующие токены.

Figma: страница **🟢 Page Indicator** — контейнер **Page Indicator** (COMPONENT_SET `10851:22`, Type=Standard/Overlay) + атом **Page Indicator / Dot** (COMPONENT_SET `10825:15`) + **Page Indicator / Numeric** (COMPONENT `10857:10`, счётчик «n/m» поверх медиа).

---

## Обзор

Индикатор — горизонтальный ряд точек, по одной на страницу. Текущая страница показана **удлинённой пилюлей**, остальные — круглыми точками. Единица DS — **точка** (`Page Indicator / Dot`); ряд собирается как горизонтальный auto-layout из инстансов точек, где ровно одна — в состоянии `Active`.

Референс паттерна — LINE Design System / Material page indicator (активная пилюля, точки фиксированного размера).

### Компонент `Page Indicator / Dot`

| Свойство | Значения |
|---|---|
| **State** | Inactive, Active |
| **Type** | Standard, Overlay |

Итого **4 варианта**.

- **State=Active** — пилюля (широкая, закруглённая).
- **State=Inactive** — круглая точка.
- **Type=Standard** — на обычной поверхности.
- **Type=Overlay** — поверх медиа (фото/видео); theme-invariant белые точки.

---

## Контейнер `Page Indicator`

Готовый компонент-ряд. Слот с точками — горизонтальный auto-layout из **инстансов** `Page Indicator / Dot` (ссылка на атом, не detached-копии), gap = `spacing/2` (8), выравнивание по центру, HUG. Ровно один `Dot` — `State=Active`.

| Свойство | Значения |
|---|---|
| **Type** | Standard, Overlay |

Type контейнера задаёт тип вложенных точек (Standard → точки Standard, Overlay → белые точки). В библиотеке — **5 точек** (первая Active) как канонический пример.

```
Page Indicator (COMPONENT, Type=Standard/Overlay) — HORIZONTAL auto-layout, gap spacing/2, HUG, align center, fill transparent
├── ⟶ Dot (instance, Active)    — текущая страница
├── ⟶ Dot (instance, Inactive)
├── ⟶ Dot (instance, Inactive)
└── … (инстансы Dot; State/Type проброшены как nested-свойства инстанса)
```

- **Смена активной точки:** переопределить `State` нужного вложенного инстанса через панель свойств (nested instance properties проброшены на контейнер) — без detach.
- **Число точек:** в макете — добавить/удалить инстансы `Dot` в слоте; в коде — рендерится динамически по числу страниц. Количество в мастере (5) — пример, не ограничение.
- **Атом отдельно:** `Page Indicator / Dot` остаётся доступен для сборки нестандартных рядов.

**Максимум точек — 8** (рекомендация). При большем числе страниц ряд визуально расползается: использовать счётчик «n / m» или отдельный паттерн (в текущей версии не входит — см. §Дальнейшее). Все точки одного размера, без сжатия краёв.

---

## Числовой индикатор `Page Indicator / Numeric`

Альтернатива точкам для **длинных галерей** (много фото), **только поверх медиа**. Пилюля-счётчик «текущая / всего», например «1/8».

```
Page Indicator / Numeric (COMPONENT) — HORIZONTAL auto-layout, HUG, pill
└── Text "1/8" — Caption/caption-md Medium, Text&Icon/White applied
```

| Параметр | Значение | Токен |
|---|---|---|
| Фон (скрим) | Background/Overlay | `Background/Overlay` |
| Текст | White applied | `Text&Icon/White applied` |
| Типографика | Caption md Medium 12/16 | `Caption/caption-md Medium` |
| Padding H / V | 8 / 4 | `spacing/2` / `spacing/1` |
| Radius | pill | `radius/pill/pill` |

- **Формат** — `текущая/всего` через слэш без пробелов («1/8»); только цифры, слэш.
- **Только Overlay** — числовой индикатор задуман поверх фото/видео (счётчик кадров). Варианта «на поверхности» нет (там используются точки).
- **Размещение** — обычно верхний-правый или нижний угол медиа; отступ от края — на стороне продукта.

**Соотношение с `Badge Type=Overlay`.** Визуально пилюля-счётчик близка к `Badge Type=Overlay` (тот же скрим `Background/Overlay` + белый текст) — и «1/8» изначально числился в кейсах Badge Overlay. Выделен в **отдельный компонент осознанно** (решение дизайна 2026-07-01): семантика «позиция в галерее» + discoverability в семействе индикаторов. При расхождении стилей двух компонентов — свести к общему источнику (кандидат на будущее).

---

## Размеры и радиусы

| Элемент | Параметр | Значение | Токен |
|---|---|---|---|
| Inactive dot | width × height | 8 × 8 | `spacing/2` × `spacing/2` |
| Active pill | width × height | 24 × 8 | `spacing/6` × `spacing/2` |
| Все точки | radius | pill | `radius/pill/pill` |
| Ряд | gap между точками | 8 | `spacing/2` |

Соотношение пилюля : точка = 3 : 1 (24 : 8) — активная страница читается однозначно.

---

## Цвета

По **docs/COLOR-PALETTE.md**.

| Type | State | Токен |
|---|---|---|
| **Standard** | Active | `Accent/Primary` |
| **Standard** | Inactive | `Text&Icon/Tertiary` |
| **Overlay** | Active | `Text&Icon/White applied` (theme-invariant белый) |
| **Overlay** | Inactive | `Text&Icon/White applied` @ 40% (выравнивание со Stories `White 40`) |

- **Standard** — на поверхностях (`Background/*`, `Surface/*`). Inactive = приглушённый нейтральный `Text&Icon/Tertiary` (Zinc/300); при необходимости большего контраста — кандидат на `Text&Icon/Secondary` (проверить в продукте).
- **Overlay** — поверх произвольного медиа: белые точки не зависят от темы (как прогресс-бар Stories). Собственного скрима нет (точки мелкие); если контраст с изображением недостаточен — продукт добавляет scrim под индикатором (см. composition-rules §11, элементы поверх медиа).

> **Примечание по `White 40`:** отдельная переменная «White 40» в палитре на 2026-07-01 не заведена — overlay-inactive реализован как `Text&Icon/White applied` с opacity 40%. Когда `White 40` появится как токен (уже используется в Stories) — перепривязать.

---

## Поведение

- Отражает текущую позицию в пейджере; **одна** точка `Active` в любой момент.
- Индикатор по умолчанию **не интерактивен** (только отражает позицию). Если делается tappable (переход к странице) — hit-area точки ≥ 44 px (прозрачное расширение в коде).
- Смена страницы → `Active` переезжает на соответствующую точку (в коде — анимация morph пилюли, в Figma не отражается).

---

## Доступность (a11y)

- **Роль:** контейнер `role="tablist"` либо `aria-label="Страница X из N"`; точки декоративные, позиция объявляется на уровне пейджера.
- **Контраст:** Standard active `Accent/Primary` на светлой поверхности ≥ 3:1 (WCAG 1.4.11, не-текстовый UI). Overlay — белый над медиа; при светлом изображении полагаться на scrim продукта.
- **Не только цвет:** активная страница отличается **формой** (пилюля vs точка), не только цветом — доступно при цветовой слепоте.

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color | **100%** |
| 🔲 Tokens (size / radius / spacing) | **100%** |
| **Overall** | **100%** |

Все размеры (ширина/высота точек), радиус и gap ряда привязаны к переменным. Единственное отступление — overlay-inactive использует opacity 40% поверх `Text&Icon/White applied` (нет отдельного токена White 40; см. примечание).

---

## Синхронизация с кодом

```tsx
<PageIndicator
  total={5}
  current={0}
  type="standard"   // "standard" | "overlay"
/>
```

CSS-переменные (из существующих токенов):
```css
--pageindicator-dot:        var(--spacing-2);        /* 8  */
--pageindicator-active-w:    var(--spacing-6);        /* 24 */
--pageindicator-radius:      var(--radius-pill-pill); /* pill */
--pageindicator-gap:         var(--spacing-2);        /* 8  */
/* standard: active = Accent/Primary; inactive = Text&Icon/Tertiary */
/* overlay:  active = Text&Icon/White applied; inactive = same @ 40% */
```

---

## Дальнейшее (бэклог)

- **Windowed / shrinking dots** — «оконный» вариант со сжимающимися краевыми точками (LINE/iOS) при большом числе страниц; отклонён в v1 в пользу фиксированных точек.
- **Counter «n / m»** — для очень длинных галерей вместо ряда точек.
- **Interactive** — tappable-точки с переходом к странице (+ hit-area 44).

---

## Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — size/spacing/radius шкалы
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра, overlay-роли
- [composition-rules.md](./composition-rules.md) — §11, элементы поверх медиа
- [stories-spec.md](./stories-spec.md) — прогресс-индикатор Stories (White/Main + White 40)

---

## История

**2026-07-01 — Page Indicator собран (Dot-атом + демо-ряды).**

Набор `Page Indicator / Dot` (`10825:15`) на странице 🟢 Page Indicator: State (Active/Inactive) × Type (Standard/Overlay) = 4 варианта. Активная — пилюля 24×8 (`spacing/6`×`spacing/2`), неактивная — точка 8×8 (`spacing/2`), радиус `radius/pill/pill`. Standard: active `Accent/Primary`, inactive `Text&Icon/Tertiary`. Overlay: active `Text&Icon/White applied`, inactive — то же @ 40% (нет токена White 40). Ряд = композиция инстансов, gap `spacing/2`.

Решения по запросу дизайна: **активная = пилюля** (не LINE-точка-цветом), **фиксированные точки** без сжимающегося окна (max 8), **+ Overlay-вариант** для медиа. Windowed-вариант вынесен в бэклог.

**2026-07-01 (числовой) — добавлен `Page Indicator / Numeric`.** Пилюля-счётчик «n/m» поверх медиа (`10857:10`): `Background/Overlay` + `Text&Icon/White applied`, Caption md Medium, padding `spacing/2`×`spacing/1`, radius pill. По референсу LINE (числовой page-indicator). Premise-check: визуально пересекается с `Badge Type=Overlay`; выделен в отдельный компонент по решению дизайна (семантика позиции + discoverability), только Overlay.

**2026-07-01 (уточнение) — Page Indicator оформлен как компонент-контейнер.** Поверх атома `Page Indicator / Dot` добавлен контейнер `Page Indicator` (`10851:22`, Type=Standard/Overlay), слот которого содержит **инстансы** точек (ссылка на атом). Смена активной точки — через nested-свойства инстансов, без detach. Демо-фреймы удалены (заменены компонентом).

Page Indicator → ✅ готов к разработке (v1 — фиксированные точки, Standard + Overlay).
