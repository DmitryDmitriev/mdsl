# Context Menu

> Синонимы в кодовой базе: Popover, DropdownMenu, Kebab Menu.

## §1 Обзор

Context Menu — небольшой floating-оверлей со списком действий, привязанный к триггеру (как правило, кнопка kebab `⋮`). Появляется поверх контента без скрима, закрывается тапом за пределами (light dismiss).

**Нативные аналоги:**

| Платформа | Компонент |
|---|---|
| iOS | `UIMenu` (UIKit) / `.contextMenu` / `.menu` (SwiftUI) |
| Android | `DropdownMenu` (Material 3) / `PopupMenu` |

---

## §2 Когда использовать

**Использовать:**
- Список из 2–7 действий для конкретного объекта (карточка, строка списка, элемент).
- Когда Bottom Sheet избыточен по весу для данного контекста.
- Триггер — компактная иконка-кнопка (kebab `⋮`, `…` или другой `ButtonIcon`).

**Не использовать:**
- Навигация между экранами.
- Больше 7 пунктов — использовать Bottom Sheet.
- Формы, пикеры, сложный контент.

---

## §3 Anatomy

```
┌──────────────────────────┐
│  [icon]  Редактировать   │  ← Item (Default)
│  [icon]  Поделиться      │
├──────────────────────────┤  ← Divider (разделитель групп)
│  [icon]  Пожаловаться    │  ← Item (Default)
├──────────────────────────┤
│  [icon]  Удалить         │  ← Item (Destructive)
└──────────────────────────┘
```

**Слои:**
1. `container` — Surface-карточка с тенью
2. `item` — строка действия (icon + label)
3. `divider` — разделитель групп (опционально)

---

## §4 Item — типы и состояния

### Type

| Type | Описание | Цвет текста | Цвет иконки |
|---|---|---|---|
| Default | Обычное действие | `Text&Icon/Primary` | `Text&Icon/Secondary` (M3 on-surface-variant) |
| Destructive | Необратимое действие (удалить, заблокировать и т.п.) | `Text&Icon/Negative` | `Accent/Negative` |

### State

| State | Описание |
|---|---|
| Default | Обычное состояние |
| Pressed | Визуальный отклик — `Background/Tinted/Neutral` (iOS) / ripple (Android) |
| Disabled | `Text&Icon/Tertiary`; иконка `opacity: 0.4` |
| Selected | Активный выбор в пикере — галочка справа (`Accent/Primary`); только для Type=Default |

### Icon (boolean)

`true` — иконка слева. `false` — только текст, горизонтальные отступы сохраняются.

> **Selected + Icon=False** — стандартный паттерн для пикеров (выбор периода, сортировки и т.п.) — без иконки слева, с галочкой справа.

---

## §5 Размеры и токены

### Container

| Параметр | Токен | Значение |
|---|---|---|
| Фон | `Surface/Surface Primary` | — |
| Тень | `Elevation/Floating` | — |
| Радиус | `radius/surface/md` | 12 dp |
| Min-width | — | 160 dp |
| Max-width | — | 256 dp |
| Padding top/bottom | `spacing/2` | 8 dp |

### Item

| Параметр | Токен | Значение |
|---|---|---|
| Высота | `control-height/md` | 48 dp |
| Padding горизонтальный | `spacing/3` | 12 dp |
| Gap иконка↔текст | `spacing/3` | 12 dp |
| Размер иконки (leading/trailing) | — | 24 dp |
| Типографика | `Base/Body 2 Medium` | 14/20, Medium |
| Чекмарк (Selected) | `Accent/Primary` | 24 dp, справа |

> **Метрики по Material 3 baseline menu** (2026-08-09), значения на наших токенах: padding 12 (`spacing/3`), иконка 24, label `Body 2 Medium` (= M3 label-large 14/500/20), gap 12. Leading-иконка — `Text&Icon/Secondary` (M3 on-surface-variant), label — `Text&Icon/Primary` (M3 on-surface).

---

## §6 Позиционирование

Context Menu — overlay с **абсолютным позиционированием** относительно триггера. Дизайнер выбирает позицию вручную под конкретный экран.

**Принципы для разработки:**

**Вертикаль:** раскрывается вниз. Если места снизу недостаточно — раскрывается вверх.

**Горизонталь** (выравнивание зависит от положения триггера):

| Триггер | Выравнивание меню |
|---|---|
| У правого края экрана | Правый край меню совпадает с правым краем триггера |
| У левого края экрана | Левый край меню совпадает с левым краем триггера |
| По центру | Меню центрируется по триггеру |

**Зазор от триггера:** 4 dp.

**Ограничение:** меню не выходит за пределы safe area экрана — логика clamping на стороне кода.

---

## §7 Поведение

**Открытие:** fade-in 100–150 ms или без анимации — по усмотрению платформы.

**Закрытие:**
- Тап за пределами компонента (light dismiss)
- Выбор пункта
- Back gesture / Escape

**Скрим:** отсутствует.

**Скролл контента под меню:** заблокирован пока меню открыто.

**Максимум пунктов:** 7. При большем количестве — использовать Bottom Sheet.

---

## §8 Доступность

- При открытии фокус переходит на первый пункт меню.
- Пункты доступны через VoiceOver (iOS) и TalkBack (Android).
- Destructive-пункты анонсируются как деструктивные (`accessibilityTraits: .destructive` на iOS).
- Back / Escape закрывает меню без выбора действия.

---

## §9 История

**Figma:**
- `Context Menu / Item` (COMPONENT_SET, 14 вариантов) — [`10417:41`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=10417-41)
- `Context Menu / Header` (COMPONENT) — [`10452:27`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=10452-27)
- `Context Menu` — пример с иконками, группировкой, Destructive — [`10423:10`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=10423-10)
- `Context Menu (with header)` — пример пикера с заголовком и Selected — [`10453:20`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=10453-20)

> **Иконки — реальные инстансы из библиотеки** (2026-08-09, было: rect-плейсхолдеры). `icon` — `24 / ic_*` (дефолт `ic_pencil_simple`), swappable через nested-instance override; крашен по состоянию (Union fill: Secondary / Accent/Negative / Tertiary). `checkmark` (Selected) — `24 / ic_check`, `Accent/Primary`. Пример-меню: pencil / share / flag_fill / delete.

---

## §9 История

| Дата | Изменение |
|---|---|
| 2026-08-09 | **Доведён до компонента по Material 3 baseline menu** (наши токены). Item: padding 16→**12** (`spacing/3`), иконка 20→**24**, label `Body 1`→**`Body 2 Medium`** (был без текст-стиля), leading-иконка `Primary`→**`Secondary`**, label растягивается (grow) под trailing. Чекмарк Selected 20→24, `Accent/Primary`. Контейнер-пример сужен до 240 (в рамках 160–256). Фрейм набора Item был схлопнут — 14 вариантов разложены в сетку, фрейм отресайжен. Popover = этот menu (синонимы). |
| 2026-06-08 | `State=Selected` + `Context Menu / Header` добавлены. Паттерн пикера (без иконки + заголовок + галочка). Итого: 14 вариантов Item, 2 примера контейнера. |
| 2026-06-08 | Компонент собран в Figma (12 вариантов Item + Container). Спека написана по факту сборки. Инициатор — продуктовая потребность (контекстное меню в List Item). |
