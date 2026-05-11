# Home Indicator — спецификация компонента

Имитация нижней жестовой полоски ОС — визуальный элемент в макетах. **В коде не реализуется**: на iOS отрисовывается нативно через safe area, на Android-12+ — аналогично через системные жесты. Компонент в Figma — плейсхолдер для дизайна, чтобы экран читался как готовое мобильное приложение.

**Figma:** страница **🟢 Home Indicator**, COMPONENT `Home Indicator` (`62:15579`).

**Категория:** Atom · Special / System (имитация ОС). Кросс-платформенный (iOS / Android).

---

## 1. Обзор

Полоска в центре нижней безопасной зоны мобильного экрана. Используется как плейсхолдер вместо нативного индикатора в макетах для обеих платформ — даёт визуальную консистентность мобильных экранов в дизайн-файле.

---

## 2. Варианты (variants)

Один вариант — Default. Theme-варианты не требуются: цвет полоски `Text&Icon/Primary` сам инвертирует против фона (Zinc/950 в Light, Zinc/50 в Dark).

---

## 3. Структура слоёв

```
Home Indicator (COMPONENT, VERTICAL auto-layout, FIXED size, MAX align)
  └── Home (RECTANGLE) ← полоска, всегда pill
```

- **Корневой контейнер:** auto-layout VERTICAL, FIXED `Platform/Width` × 28 px, primary-axis align = `MAX` (прижимает полоску к низу), counter-axis align = `CENTER`. Padding bottom = `spacing/2` (8 px).
- **Home (полоска):** width 72 px, height 4 px. Центрируется по горизонтали через counter-axis CENTER, к низу прижата за счёт MAX + paddingBottom.

---

## 4. Таблица токенов

### Размеры

| Параметр | Значение | Токен | Примечание |
|----------|----------|-------|------------|
| Container width | iOS: 320 / Android: 360 | `Platform/Width` | FIXED, переменная покрывает обе платформы через моды |
| Container height | 28 px | — | hardcoded — нижняя safe area |
| Home bar width | 72 px | — | hardcoded — визуальная пропорция Larixon-макетов |
| Home bar height | 4 px | — | hardcoded |
| Home bar radius | pill | `radius/pill/pill` | Концептуально полоска — всегда pill |
| Bottom offset | 8 px | `spacing/2` (paddingBottom на контейнере) | Отступ полоски от низа фрейма |

### Цвета

По **docs/COLOR-PALETTE.md**.

| Элемент | Токен | Light | Dark |
|---------|-------|-------|------|
| Home bar fill | `Text&Icon/Primary` | Zinc/950 (#09090b) | Zinc/50 (#fafafa) |

---

## 5. Аудит покрытия токенами

| Категория | Покрытие |
|-----------|----------|
| Color | **100%** (на canonical `Text&Icon/Primary` после миграции 2026-05-11) |
| Token (size) | width — Platform/Width, radius — pill, paddingBottom — spacing/2. Hardcoded остались: container height 28, bar width 72, bar height 4 — design constants специфики компонента. |
| Overall | **100%** на токенизируемом, остальное закреплено как design constants |

---

## 6. Использование

- Размещать в макетах мобильных экранов в самом низу — поверх контента, который идёт под жестовую зону.
- Применимо для iOS и Android (на обеих платформах нативно отрисовывается ОС, но в макете полоска нужна как визуальный плейсхолдер).
- Не использовать как UI-элемент: это плейсхолдер ОС, не интерактив.

---

## 7. История миграций

**2026-05-11 — аудит готовности + миграция OLD → canonical.**

Компонент был пропущен в Round 6 миграции (2026-05-06), оставался на legacy-токене.

В Figma (62:15579 / 62:15578):
- **Fill полоски**: `Icon Old/Primary` (#1d2023, legacy) → **`Text&Icon/Primary`** (Zinc/950 Light / Zinc/50 Dark).
- **Radius полоски**: hardcoded 8 px → **`radius/pill/pill`** (всегда pill — концептуально полоска).
- **Height полоски**: 2 px → **4 px** (top: 18 → 16, height: 28 − 16 − 8 = 4).
- **Bottom offset**: hardcoded 8 px → **`spacing/2`** через paddingBottom (контейнер сконвертирован в auto-layout VERTICAL, primary-axis = MAX, counter-axis = CENTER).
- **Width**: повторно привязан к `Platform/Width` (потерялся при конверсии layoutMode, восстановлен).

Home Indicator → ✅ готов к разработке (как design-only mockup).

---

## 8. Связанные документы

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
- [divider-spec.md](./divider-spec.md) — соседний атомарный системный компонент
