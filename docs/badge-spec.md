# Спецификация компонента Badge

Бейдж — компактный индикатор статуса или категории. Использует только семантические токены дизайн-системы.

**Соответствие Figma:** [UI-Kit-Mobile — Badge](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=4523-14). В макете: размеры xs/sm/md, формы Pill/Rounded, типы Default (→ question), Good (→ good), Warning (→ warning), Error (→ negative). Типографика: xs = typography/caption-md (12/16), sm и md = Body 2 Medium (14/20). Иконки: xs 16 px, sm и md 24 px.

---

## 1. Семантика (варианты)

Цвета бейджа задаются через **semantic.decor** (docs/COLOR-PALETTE.md, раздел Decor/Bubble). В UI не используются примитивные палитры.

| Вариант   | Роль       | Фон (decor)   | Текст (decor) | Использование              |
|-----------|------------|---------------|----------------|----------------------------|
| good      | Good       | Green/50      | Green/800      | Успех, подтверждение       |
| info      | Info       | Blue/50       | Blue/800       | Информация, подсказка       |
| warning   | Warning    | Orange/50     | Orange/800     | Внимание, предупреждение   |
| negative  | Negative   | Red/50        | Red/800        | Ошибка, отклонено          |
| question  | Question   | Zinc/100      | Zinc/800       | Вопрос, нейтральный статус |
| answer    | Answer     | Blue/100      | Blue/800       | Ответ, решение             |
| admin     | Admin      | Green/100     | Green/800      | Админ, модерация           |

---

## 2. Токены

### Цвет
- **Фон и текст**: только `semantic.decor[variant].bg` и `semantic.decor[variant].text`.

### Отступы (spacing)
- **xs**: padding vertical `spacing/2` (8 px), horizontal `spacing/2` (8 px).
- **sm**: padding vertical `spacing/3` (12 px), horizontal `spacing/2` (8 px) — по Figma UI-Kit-Mobile.
- **md**: padding vertical `spacing/4` (16 px), horizontal `spacing/3` (12 px).

### Радиус (radius)
- **pill**: `radius.pill` (капсула) — по умолчанию.
- **rounded**: `radius.controlMd` (8 px) — альтернатива для коротких бейджей (Semantic: control-md → radius/2).

### Типографика (по Figma: caption-md для xs, Body 2 Medium для sm и md)
- **xs**: typography/caption-md — 12 px / 16 px, weight 500 (docs/TYPOGRAPHY.md).
- **sm**: Body 2 Medium — 14 px / 20 px, weight 500.
- **md**: Body 2 Medium — 14 px / 20 px, weight 500.
- Font-weight: 500.

---

## 3. Размеры

Высота бейджа **фиксирована** и совпадает с рендером в коде и Storybook. Размеры привязаны к семантическим высотам: **xs** = `height.xs` (32), **sm** = `height.sm` (40), **md** = `height.md` (48). Прогрессия xs < sm < md.

| Размер | Высота | Padding X | Padding Y | Font  | Иконка | Область применения |
|--------|--------|-----------|-----------|-------|--------|---------------------|
| xs     | 32 px (`height.xs`) | spacing/2 (8) | spacing/2 (8) | typography/caption-md (12/16) | 16×16 px | Плотные интерфейсы (уточняется). |
| sm     | 40 px (`height.sm`) | spacing/2 (8) | spacing/3 (12) | Body 2 Medium (14/20) | 24×24 px | Компактные блоки. |
| md     | 48 px (`height.md`) | spacing/3 (12) | spacing/4 (16) | Body 2 Medium (14/20) | 24×24 px | Стандартное использование. |

---

## 4. Состояния

- **Default** — обычное отображение.
- Бейдж не интерактивен по умолчанию; при необходимости интерактивность задаётся обёрткой (кнопка/ссылка).

---

## 5. Контент и варианты отображения

### 5.1 Только текст
Бейдж с одной текстовой подписью. Padding и типографика по размеру (см. п. 3).

### 5.2 Текст + иконка (вариант с иконкой)
- **Расположение**: иконка слева от текста.
- **Зазор**: между иконкой и текстом — `spacing/1` (4 px). Этот же gap учитывается в Auto layout при сборке в Figma.
- **Размеры иконки** по размеру бейджа (по Figma UI-Kit-Mobile: **16** и **24** px):
  - **xs**: 16×16 px (высота бейджа 32 px)
  - **sm**: 24×24 px (высота бейджа 40 px)
  - **md**: 24×24 px (высота бейджа 48 px)
- **Цвет иконки**: наследует цвет текста бейджа (`semantic.decor[variant].text`), чтобы иконка и подпись были в одной семантической паре.
- **Порядок в разметке**: [иконка] → [gap] → [текст]. Padding бейджа не меняется: отступ от края до иконки и от текста до края — по таблице размеров (Padding X, Padding Y).

Используйте вариант с иконкой, когда нужно визуально усилить смысл (статус, категория, тип) или улучшить узнаваемость в плотных списках.

---

## 6. Соответствие макету Figma

| Figma (UI-Kit-Mobile) | В коде / спеках |
|------------------------|------------------|
| Type: Default          | variant: question |
| Type: Good            | variant: good    |
| Type: Warning         | variant: warning |
| Type: Error           | variant: negative |
| Shape: Pill           | shape: pill      |
| Shape: Rounded        | shape: rounded   |
| Size: xs / sm / md    | size: xs / sm / md |
| Fonts/size/xs, line-height/xs | typography/caption-md 12/16 |
| Fonts/size/sm, line-height/sm | Body 2 Medium 14/20 (sm и md) |

---

## 7. Ссылки

- Figma: [UI-Kit-Mobile — Badge (node 4523-14)](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=4523-14)
- Цвета: **docs/COLOR-PALETTE.md**
- Токены: **docs/DESIGN-TOKENS.md**
- Типографика: **docs/TYPOGRAPHY.md**
