# Elevation (Тени)

Подъём подсвечивает sticky-элементы (прилипшие к краю экрана) и плавающие контролы над визуальной подложкой. В системе **три Effect Styles** — по направлению тени и роли.

**В Dark-теме тени не применяются.** Визуальная иерархия строится только на цвете поверхности — `Surface/Surface Primary` Dark = `Zinc/800` (#27272A), на ступень светлее `Background/Primary` (Zinc/950) и `Background/Secondary` (Zinc/900). Sticky-состояние читается по контрасту.

---

## Модель

| Токен | Направление | Use case |
|-------|-------------|----------|
| **`Elevation/Top`** | ↓ вниз | Sticky Top App Bar при скролле |
| **`Elevation/Floating`** | всесторонняя (ambient) | Плавающие контролы над любой подложкой и в любой позиции (Chat Composer, FAB Bar, map buttons, Price Pin) |
| **`Elevation/Bottom`** | ↑ вверх | Sticky bottom bar: клавиатура, плашка с CTA-кнопкой |

Каждый токен — двухслойная тень: мягкая контактная + основная глубина.

---

## Spec values (Light)

| Token | Layer | X | Y | Blur | Spread | Alpha |
|-------|-------|---|---|------|--------|-------|
| **Elevation/Top** | 1 | 0 | 4 | 16 | 0 | 0.08 |
|                   | 2 | 0 | 0 | 6  | 0 | 0.08 |
| **Elevation/Floating** | 1 | 0 | 0 | 12 | 0 | 0.08 |
|                        | 2 | 0 | 2 | 4  | 0 | 0.05 |
| **Elevation/Bottom** | 1 | 0 | -8 | 24 | 0 | 0.10 |
|                      | 2 | 0 | -2 | 24 | 0 | 0.08 |

---

## CSS

```css
--elevation-top:
  0 4px 16px rgba(0, 0, 0, 0.08),
  0 0   6px rgba(0, 0, 0, 0.08);

--elevation-floating:
  0 0   12px rgba(0, 0, 0, 0.08),
  0 2px 4px  rgba(0, 0, 0, 0.05);

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
3. **Плавающий контрол** (Chat Composer, FAB Bar, map buttons, Price Pin) → `Elevation/Floating`. Тень всесторонняя (ambient) — читается в любой позиции: у нижнего края, в центре, над медиа. На светлой подложке того же тона, где одна тень недостаточна (белое поле на белом экране чата), определённость края несёт парный **`Border/Default` 1px inside** — так собран Chat Composer (`field` + `btn-add`). Send-кнопка (залитая) — без бордера.
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
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    android: { elevation: 3 },
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
> **React Native** поддерживает одну тень — используется параметр с наибольшим визуальным весом (Layer 1 для Floating/Top/Bottom — основная глубина).

---

## Android (Jetpack Compose)

Двухслойную тень (`Elevation/Floating` и др.) можно воспроизвести **точно** через **`Modifier.dropShadow()`** (Compose 1.8+): кастомные `color` / `offset` / `radius` (= blur) / `spread`, модификаторы **чейнятся** — это прямой аналог многослойного `box-shadow`.

```kotlin
Modifier
  .dropShadow(shape, Shadow(radius = 12.dp, spread = 0.dp,
      color = Color(0x14000000), offset = DpOffset(0.dp, 0.dp)))   // Layer 1 · 8%
  .dropShadow(shape, Shadow(radius = 4.dp,  spread = 0.dp,
      color = Color(0x0D000000), offset = DpOffset(0.dp, 2.dp)))   // Layer 2 · 5%
```

> **Версия Compose:** `dropShadow`/`innerShadow` — API Compose 1.8+. Если версия старее — доступен только `Modifier.shadow(elevation)` = **одна** системная тень из dp-значения (Material), двухслойный токен точно не воспроизвести, только грубо приблизить. Перед имплементацией подтвердить версию Compose.

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

**2026-10-05 — `Elevation/Floating` переопределён на ambient.** Старое значение (`0 1 3 /15% · 0 1 2 /30%`) было тёмным и тугим — заточено под контраст над медиа, но на светлой подложке давало жёсткое тёмное кольцо, а на нижнем баре (FAB) тень уходила вниз/под элемент. Проверка на реальных экранах с данными (не на пустом фоне): нужна **всесторонняя мягкая** тень, работающая в любой позиции. Новое значение `0 0 12 /8% · 0 2 4 /5%` (≈ ретро `[deprecated] Elevation/Light/3`). Привязаны Chat Composer и FAB Bar. Старое значение на момент правки не использовал ни один узел (0 consumers). Для определённости края на белом фоне плавающие поверхности композера дополнены `Border/Default` 1px.

Модель с 5 уровнями elevation + 2 sheet-теней была заменена на 3 токена после аудита реального использования подъёмов в приложении (апрель 2026). Аудит показал:

- Levels 3–5 (Dropdowns / Modals / Drawers) в макетах не встречались — модалки идут через overlay без тени
- Карточки и GridCard физически не приподняты над контентом
- Реальные паттерны: sticky top, sticky bottom, floating на картах

Подробности аудита — страница `🔍 Elevation Audit` в файле Mobile (`PI3XrUDuoGyK4aXkqyzYoB`).
