# Elevation (Тени)

Подъём подсвечивает sticky-элементы (прилипшие к краю экрана) и плавающие контролы над визуальной подложкой. В системе **три Effect Styles** — по направлению тени и роли.

**В Dark-теме тени не применяются.** Визуальная иерархия строится только на цвете поверхности (`Surface/Primary`). Sticky-состояние читается по контрасту.

---

## Модель

| Токен | Направление | Use case |
|-------|-------------|----------|
| **`Elevation/Top`** | ↓ вниз | Sticky Top App Bar при скролле |
| **`Elevation/Floating`** | равномерная | Плавающие контролы над визуальной подложкой (map buttons, Price Pin) |
| **`Elevation/Bottom`** | ↑ вверх | Sticky bottom bar: клавиатура, плашка с CTA-кнопкой |

Каждый токен — двухслойная тень: мягкая контактная + основная глубина.

---

## Spec values (Light)

| Token | Layer | X | Y | Blur | Spread | Alpha |
|-------|-------|---|---|------|--------|-------|
| **Elevation/Top** | 1 | 0 | 4 | 16 | 0 | 0.08 |
|                   | 2 | 0 | 0 | 6  | 0 | 0.08 |
| **Elevation/Floating** | 1 | 0 | 1 | 3 | 0 | 0.15 |
|                        | 2 | 0 | 1 | 2 | 0 | 0.30 |
| **Elevation/Bottom** | 1 | 0 | -8 | 24 | 0 | 0.10 |
|                      | 2 | 0 | -2 | 24 | 0 | 0.08 |

---

## CSS

```css
--elevation-top:
  0 4px 16px rgba(0, 0, 0, 0.08),
  0 0   6px rgba(0, 0, 0, 0.08);

--elevation-floating:
  0 1px 3px rgba(0, 0, 0, 0.15),
  0 1px 2px rgba(0, 0, 0, 0.30);

--elevation-bottom:
  0 -8px 24px rgba(0, 0, 0, 0.10),
  0 -2px 24px rgba(0, 0, 0, 0.08);
```

В Dark-теме все три переменные = `none`.

```css
@media (prefers-color-scheme: dark) {
  --elevation-top: none;
  --elevation-floating: none;
  --elevation-bottom: none;
}
```

---

## Правила применения

1. **Sticky-элемент у верхнего края** (Top App Bar при скролле) → `Elevation/Top`
2. **Sticky-элемент у нижнего края** (клавиатура, плашка с CTA) → `Elevation/Bottom`
3. **Плавающий контрол над визуальной подложкой** (карта, фото-галерея) → `Elevation/Floating`
4. **Модалки, drawers, dropdowns, bottom sheets** — overlay без тени
5. **Карточки, Product Card, Btn Collect, GridCard** — без теней; дифференциация через `border/default` или поверхность
6. **Dark-тема** — ни один Elevation-стиль не применяется

---

## React Native

```typescript
import { Platform } from 'react-native';

export const elevation = {
  top: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    android: { elevation: 4 },
  }),
  floating: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.30,
      shadowRadius: 2,
    },
    android: { elevation: 2 },
  }),
  bottom: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -8 },
      shadowOpacity: 0.10,
      shadowRadius: 24,
    },
    android: { elevation: 8 },
  }),
};
```

> **Dark mode:** при активной тёмной теме возвращать пустой объект — тени не применяются.
> **React Native** поддерживает одну тень — используется параметр с наибольшим визуальным весом (Layer 2 для Floating, Layer 1 для Top/Bottom).

---

## Figma

Effect Styles в файле **UI Kit Mobile** (`PI2N65xbeJPTc5oWhOP7Bl`):
- `Elevation/Top`
- `Elevation/Floating`
- `Elevation/Bottom`

### Deprecated

Старые стили помечены префиксом `[deprecated] ` и остаются в библиотеке для постепенной миграции. В новых макетах не использовать:

- `[deprecated] Elevation/Light/1` … `5`
- `[deprecated] Shadow/Sheet Default`
- `[deprecated] Shadow/Sheet Active`

---

## История решения

Модель с 5 уровнями elevation + 2 sheet-теней была заменена на 3 токена после аудита реального использования подъёмов в приложении (апрель 2026). Аудит показал:

- Levels 3–5 (Dropdowns / Modals / Drawers) в макетах не встречались — модалки идут через overlay без тени
- Карточки и GridCard физически не приподняты над контентом
- Реальные паттерны: sticky top, sticky bottom, floating на картах

Подробности аудита — страница `🔍 Elevation Audit` в файле Mobile (`PI3XrUDuoGyK4aXkqyzYoB`).
