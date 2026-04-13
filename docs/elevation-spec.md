# Elevation (Тени)

Тени создают визуальную иерархию и ощущение глубины интерфейса. Уровень elevation определяет "высоту" элемента над поверхностью.

## Принцип

Каждый уровень elevation состоит из **двух теней**:
- **Shadow 1** — мягкая контактная тень (маленький offset, низкая opacity)
- **Shadow 2** — основная тень глубины (больший offset и blur)

---

## Light Theme

### Specifications

| Level | Shadow | Y Offset | Blur | Opacity |
|-------|--------|----------|------|---------|
| **1** | 1 | 1px | 2px | 4% |
|       | 2 | 1px | 3px | 6% |
| **2** | 1 | 1px | 2px | 4% |
|       | 2 | 2px | 6px | 8% |
| **3** | 1 | 2px | 4px | 4% |
|       | 2 | 4px | 12px | 8% |
| **4** | 1 | 2px | 4px | 4% |
|       | 2 | 8px | 16px | 10% |
| **5** | 1 | 4px | 6px | 4% |
|       | 2 | 12px | 24px | 12% |

### CSS

```css
/* Level 1 */
--elevation-1: 
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 1px 3px rgba(0, 0, 0, 0.06);

/* Level 2 */
--elevation-2: 
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 2px 6px rgba(0, 0, 0, 0.08);

/* Level 3 */
--elevation-3: 
  0 2px 4px rgba(0, 0, 0, 0.04),
  0 4px 12px rgba(0, 0, 0, 0.08);

/* Level 4 */
--elevation-4: 
  0 2px 4px rgba(0, 0, 0, 0.04),
  0 8px 16px rgba(0, 0, 0, 0.10);

/* Level 5 */
--elevation-5: 
  0 4px 6px rgba(0, 0, 0, 0.04),
  0 12px 24px rgba(0, 0, 0, 0.12);
```

---

## Dark Theme

В тёмной теме elevation выражается через **осветление поверхности**, а не только тень. Тень остаётся для отделения от фона.

### Level 1

| Shadow | Y Offset | Blur | Opacity |
|--------|----------|------|---------|
| 1 | 1px | 3px | 20% |
| 2 | 1px | 2px | 12% |

```css
--elevation-dark-1: 
  0 1px 3px rgba(0, 0, 0, 0.20),
  0 1px 2px rgba(0, 0, 0, 0.12);
```

---

## Sheet Shadows

Специальные тени для bottom sheets (шторок). Направлены **вверх** (отрицательный Y offset).

### Sheet Default

| Shadow | Y Offset | Blur | Opacity |
|--------|----------|------|---------|
| 1 | -4px | 16px | 6% |
| 2 | -1px | 4px | 4% |

### Sheet Active

| Shadow | Y Offset | Blur | Opacity |
|--------|----------|------|---------|
| 1 | -8px | 24px | 8% |
| 2 | -2px | 6px | 4% |

```css
--shadow-sheet-default: 
  0 -4px 16px rgba(0, 0, 0, 0.06),
  0 -1px 4px rgba(0, 0, 0, 0.04);

--shadow-sheet-active: 
  0 -8px 24px rgba(0, 0, 0, 0.08),
  0 -2px 6px rgba(0, 0, 0, 0.04);
```

---

## Когда использовать

| Level | Применение |
|-------|-----------|
| **1** | Карточки, небольшие элементы (chips, badges) |
| **2** | Кнопки FAB, меню в состоянии hover |
| **3** | Карточки с действиями, dropdown меню |
| **4** | Модальные окна, dialogs |
| **5** | Navigation drawers, bottom sheets |

---

## Figma

Effect Styles в файле UI Kit Mobile:
- `Elevation/Light/1` — `Elevation/Light/5`
- `Elevation/Dark/1`
- `Shadow/Sheet Default`
- `Shadow/Sheet Active`

---

## Реализация в коде

### React Native (Shadow Props)

```typescript
export const elevation = {
  1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  5: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
};
```

> **Примечание:** React Native поддерживает только одну тень. Используются параметры Shadow 2 (основная тень глубины).
