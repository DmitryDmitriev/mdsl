# Описание кнопок для Figma

Скопируй блоки ниже в Figma (описание компонента, комментарии или документацию). Источники: **docs/buttons-spec-figma.md**, **docs/TYPOGRAPHY.md**, **docs/COLOR-PALETTE.md**.

---

## Общее

- **Шрифт:** Inter  
- **Состояния:** Default, Disabled (для каждого варианта)  
- **Варианты:** Primary, Secondary, Outline, Ghost — для текстовых и иконных кнопок.  
- **Цвета:** Accent (Primary, Secondary) и Text & Icon из COLOR-PALETTE. Outline: border 1 px.

---

## 1. Button lg — Text (Primary, Secondary, Outline, Ghost)

- **Высота:** 56 px (height/lg, spacing/14)
- **Ширина:** по контенту
- **Padding horizontal:** 24 px (spacing/6)
- **Padding vertical:** 0
- **Corner radius:** 12 px (radius/3)
- **Border:** только Outline — 1 px
- **Типографика:** Body 1 — 16 px, line-height 24 px, Inter Medium (500)
- **Иконка (опционально):** 24×24 px, отступ до текста 12 px (spacing/3)
- **Цвета:**  
  - Primary: fill Accent/Primary, text White (Inverted W-B)  
  - Secondary: fill Accent/Secondary, text Accent/Primary  
  - Outline: fill прозрачный, border Accent/Primary или Border/Default, text Accent/Primary  
  - Ghost: fill прозрачный, text Accent/Primary  
  - Disabled: текст Text & Icon / Tertiary, заливка приглушённая при необходимости

---

## 2. Button md — Text (Primary, Secondary, Outline, Ghost)

- **Высота:** 48 px (height/md, spacing/12)
- **Padding horizontal:** 20 px (spacing/5)
- **Corner radius:** 12 px (radius/3)
- **Border:** только Outline — 1 px
- **Типографика:** Body 2 — 14 px, line-height 20 px, Inter Medium (500)
- **Иконка (опционально):** 20×20 px, отступ до текста 8 px (spacing/2)
- **Цвета:** как у Button lg (Accent Primary/Secondary, Text & Icon)

---

## 3. Button sm — Text (Primary, Secondary, Outline, Ghost)

- **Высота:** 40 px (height/sm, spacing/10)
- **Padding horizontal:** 16 px (spacing/4)
- **Corner radius:** 12 px (radius/3)
- **Border:** только Outline — 1 px
- **Типографика:** Body 2 — 14 px, line-height 20 px, Inter Medium (500)
- **Иконка (опционально):** 20×20 px, отступ до текста 8 px (spacing/2)
- **Цвета:** как у Button lg

---

## 4. Button xs — Text (Primary, Secondary, Outline, Ghost)

- **Высота:** 32 px (spacing/8)
- **Padding horizontal:** 12 px (spacing/3)
- **Corner radius:** 8 px (radius/2)
- **Border:** только Outline — 1 px
- **Типографика:** Caption Medium — 12 px, line-height 16 px, Inter Medium (500)
- **Иконка (опционально):** 16×16 px, отступ до текста 4 px (spacing/1)
- **Цвета:** как у Button lg

---

## 5. Button lg — Icon only (Primary, Secondary, Outline, Ghost)

- **Размер:** 56×56 px (height/lg)
- **Corner radius:** 12 px (radius/3)
- **Border:** только Outline — 1 px
- **Иконка:** 24×24 px по центру
- **Цвета:** как у текстовых (fill, border, цвет иконки = текст той же роли)

---

## 6. Button md — Icon only

- **Размер:** 48×48 px (height/md)
- **Corner radius:** 12 px (radius/3)
- **Иконка:** 20×20 px
- **Цвета:** как у текстовых

---

## 7. Button sm — Icon only

- **Размер:** 40×40 px (height/sm)
- **Corner radius:** 12 px (radius/3)
- **Иконка:** 20×20 px
- **Цвета:** как у текстовых

---

## 8. Button xs — Icon only

- **Размер:** 32×32 px (spacing/8)
- **Corner radius:** 8 px (radius/2)
- **Иконка:** 16×16 px
- **Цвета:** как у текстовых

---

## Текстовые стили в Figma (создать один раз)

| Имя стиля   | Шрифт | Size | Line height | Weight |
|-------------|--------|------|-------------|--------|
| Button / lg | Inter  | 16   | 24          | Medium (500) |
| Button / md | Inter  | 14   | 20          | Medium (500) |
| Button / sm | Inter  | 14   | 20          | Medium (500) |
| Button / xs | Inter  | 12   | 16          | Medium (500) |

---

## Переменные (рекомендуемые в Figma)

- **Height:** lg 56, md 48, sm 40, xs 32  
- **Spacing:** 4, 8, 12, 16, 20, 24 (spacing/1…6)  
- **Radius:** 8 (radius/2), 12 (radius/3)  
- **Цвета:** Accent/Primary, Accent/Secondary, Text & Icon (Primary, Tertiary, Inverted W-B), Border (Default, Disabled)
