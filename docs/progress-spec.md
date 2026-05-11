# Progress — спецификация компонента

Linear progress indicator — горизонтальная полоска состояния загрузки/прогресса. Material 3 пресет с тремя слоями: Active indicator + Track + Stop indicator. Кросс-платформенный.

**Figma:** страница **🟢 Progress**, COMPONENT_SET `Progress` (`2144:1644`).

**Категория:** Atom · feedback / system status.

---

## 1. Обзор

Тонкая полоса (4 px) с двумя сегментами — заполненный (Active indicator) и оставшийся (Track), разделёнными зазором. В правой части — точка Stop indicator, отмечающая 100%-позицию (M3-конвенция).

Состояние полосы передаётся через `value: 0..100`. Variants в Figma — пять иллюстративных позиций (Start / 25% / Middle / 75% / Finish), не функциональные значения для кода — они нужны только для дизайн-ревью.

Компонент применим на iOS и Android (M3-канон работает на обеих платформах).

**Indeterminate state** (анимированная бегущая полоса) — TODO на потом. В Figma сейчас не реализован, добавится отдельным variant'ом по мере необходимости.

---

## 2. Варианты (variants)

| Свойство | Значения | Назначение |
|----------|----------|------------|
| **State** | `Start`, `25%`, `Middle`, `75%`, `Finish` | Иллюстративные позиции для дизайн-ревью. В коде заменяются на `value: 0..100` |

---

## 3. Структура слоёв

```
Progress (COMPONENT) ← HORIZONTAL auto-layout, gap=spacing/1, padding-x=spacing/4
  ├── Active indicator ← заполненная часть, bg=Accent/Primary
  ├── Track ← оставшаяся часть, bg=Background/Tertiary
  └── Stop indicator ← FRAME-контейнер 4×4
       └── Stop shape ← RECTANGLE 4×4, bg=Accent/Primary, radius=pill (= идеальный круг)
```

- **Корневой контейнер:** FIXED `Platform/Width`, height = HUG (4 px), padding-x = `spacing/4`, gap = `spacing/1`.
- **Active indicator / Track:** height 4 px, radius `radius/pill/pill`, ширины динамические в зависимости от `value`.
- **Stop indicator:** размер 4×4, radius `radius/pill/pill`. Прижат к правому краю через `paddingRight` контейнера (16 px = `spacing/4`).

---

## 4. Таблица токенов

### Размеры

| Параметр | Значение | Токен |
|----------|----------|-------|
| Container width | iOS: 320 / Android: 360 | `Platform/Width` (переменная покрывает обе платформы через моды) |
| Container padding-x | 16 px | `spacing/4` |
| Container gap (Active ↔ Track) | 4 px | `spacing/1` |
| Bar height (Active, Track, Stop) | 4 px | hardcoded — M3-стандарт thin progress, design constant |
| Bar radius (Active, Track) | pill | `radius/pill/pill` |
| Stop indicator size | 4 × 4 | hardcoded — M3-стандарт, design constant |
| Stop indicator radius | pill | `radius/pill/pill` |
| Stop indicator right offset | 16 px | `spacing/4` (через paddingRight контейнера) |

### Цвета

По **docs/COLOR-PALETTE.md**.

| Элемент | Токен |
|---------|-------|
| Active indicator fill | `Accent/Primary` |
| Track fill | `Background/Tertiary` |
| Stop indicator fill | `Accent/Primary` |

---

## 5. Аудит покрытия токенами

| Категория | Покрытие |
|-----------|----------|
| Color | **100%** (canonical Accent/Primary + Background/Tertiary) |
| Token (size/spacing/radius) | **100%** на токенизируемом. Hardcoded остались: bar height 4 px и stop size 4×4 — design constants M3-канона. |
| Overall | **100%** |

---

## 6. API (рекомендуемое)

```ts
interface ProgressProps {
  /** 0..100 */
  value: number;
  /** indeterminate — бегущая анимация (TBD, ещё не в Figma) */
  indeterminate?: boolean;
}
```

---

## 7. Использование

- Loading bar в шапке экрана при подгрузке данных.
- Прогресс длительной операции (загрузка файла, синхронизация).
- Шаговые формы: показывать заполненность.
- **Не использовать** для skeleton-загрузки списков — там `Skeleton`.

---

## 8. История миграций

**2026-05-11 — аудит готовности (component-spec-check), 37 правок в Figma (2144:1644).**

- **Имена variant'ов**: `State=3/4` → `State=25%`, `State=4/3` → `State=75%` (визуально это 25% и 75% прогресса, дроби сбивали).
- **Container padding-x** (5 вариантов × L+R): hardcoded 16 → **`spacing/4`**.
- **Container gap** (5 вариантов): hardcoded 4 → **`spacing/1`**.
- **Bar radius** (Active + Track × 5 вариантов, 10 нод): hardcoded 8 → **`radius/pill/pill`**.
- **Stop shape radius** (5 вариантов): arbitrary 26 → **`radius/pill/pill`** (4×4 квадрат → pill = идеальный круг).
- Stop indicator right offset обеспечивается `paddingRight` контейнера (16 → `spacing/4`), отдельная привязка не нужна.

Цвета уже были на canonical (`Accent/Primary` + `Background/Tertiary`) — переделок не потребовалось.

Progress → ✅ готов к разработке (без indeterminate state; добавится отдельным variant'ом по мере необходимости).

---

## 9. Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — Accent / Background палитра
- [skeleton-spec.md](./skeleton-spec.md) — альтернатива для shimmer-загрузки списков
- [home-indicator-spec.md](./home-indicator-spec.md) — соседний атомарный системный mockup
