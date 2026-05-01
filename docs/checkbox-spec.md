# Спецификация компонента Checkbox

Чекбокс — выбор одного или нескольких вариантов в форме или списке. Используются только семантические токены из **docs/DESIGN-TOKENS.md**, **docs/COLOR-PALETTE.md**, **docs/TYPOGRAPHY.md**.

---

## 1. Принципы токенизации

1. **Один компонент — одна таблица токенов** (см. **docs/DESIGN-TOKENS.md**, п. 8): каждое визуальное значение задаётся токеном, без произвольных px в коде.
2. **Роли слоёв:**
   - **Hit area / контейнер ряда** — минимальная высота касания (**height/xs** или **height/sm**), внутренние отступы — **space**, gap между квадратом и подписью — **spacing/N**.
   - **Квадрат (box)** — сторона **spacing/4** (16 px) или **spacing/5** (20 px); скругление — семантический **radius** (см. §3); обводка — **border/default** или **border/emphasis**; цвет — **Border/*** из палитры.
   - **Заливка** — **Background/Primary** (пустой), в **checked** — **Accent/Primary** (или по продукту).
   - **Галочка** — иконка **16** или **24** px (по размеру чекбокса), цвет по контрасту к заливке.
   - **Подпись** — **Body 2** или **caption-md** / **caption-lg** + **Text & Icon / Primary** (disabled → **Tertiary** / **Secondary**).
3. **Состояния:** `default`, `hover`, `pressed`, `focused`, `checked`, `indeterminate`, `disabled`, при необходимости `error` — только семантические цвета.
4. **Доступность:** видимый фокус, `aria-checked`, связь label ↔ input.

---

## 2. Семантика (варианты)

| Свойство      | Значения        | Примечание |
|---------------|-----------------|------------|
| `checked`     | true / false    | Заливка + иконка |
| `indeterminate` | true / false  | Частичный выбор |
| `disabled`    | true / false    | Border/disabled, текст tertiary |
| `error`       | true / false    | Обводка Accent/Negative |
| `size`        | sm / md         | При двух размерах — привязка к spacing/radius |

---

## 3. Таблица токенов

| Параметр | Токен / значение | Примечание |
|----------|------------------|------------|
| Минимальная высота ряда (touch) | height/xs (32 px) или height/sm (40 px) | Как у контролов в **DESIGN-TOKENS** |
| Gap (квадрат ↔ текст) | spacing/2 (8 px) | |
| Сторона квадрата | spacing/4 (16 px) или spacing/5 (20 px) | Выбрать один размер для продукта |
| Скругление квадрата | **radius/control-sm** → radius/2 (8 px) | См. **DESIGN-TOKENS** §radius |
| Толщина бордера (покой) | **border/default** → border/1 (1 px) | |
| Бордер (focus / акцент) | **border/emphasis** → border/2 (2 px) | Кольцо фокуса |
| Бордер (default) | color: Border/Default | **COLOR-PALETTE** |
| Бордер (disabled) | Border/Disabled | |
| Бордер (focus) | Border/Active или focus-ring | |
| Фон квадрата (unchecked) | Background/Primary | |
| Заливка (checked) | Accent/Primary | |
| Иконка галочки | 16 px (или 24 при крупном размере) | |
| Текст подписи | Body 2 или caption-md / caption-lg | **TYPOGRAPHY.md** |
| Текст (disabled) | Text & Icon / Tertiary или Secondary | |

### 3.1. Радиус и бордер квадрата

| Роль | Семантика | Core | px |
|------|-----------|------|-----|
| Скругление box | **radius/control-sm** | radius/2 | 8 |
| Плоский вариант (если нужен) | radius/1 | radius/1 | 4 |
| Обводка (default) | **border/default** | border/1 | 1 |
| Фокус / акцентная обводка | **border/emphasis** | border/2 | 2 |

---

## 4. Состояния (цвета — семантика)

| Состояние | Квадрат | Иконка | Текст |
|-----------|---------|--------|-------|
| Unchecked | Border/Default, фон Primary | — | Primary |
| Checked | Заливка Accent/Primary | Inverted / контрастный | Primary |
| Hover | Подсветка по гайду продукта | — | Primary |
| Focus | Border/Active или кольцо **border/emphasis** | — | Primary |
| Disabled | Border/Disabled | приглушённая | Tertiary |
| Error | Accent/Negative (бордер) | — | Negative (опц.) |
| Indeterminate | Как checked, иконка «минус» / dash | по продукту | Primary |

---

## 5. Check+Text (чекбокс с подписью)

Отдельный COMPONENT_SET `Check+Text` — чекбокс в паре с текстовой подписью.

### Варианты

| State | Описание |
|---|---|
| Default | Чекбокс + текст, активный |
| Select | Выбранный |
| Indeterminate | Частичный выбор |
| Disabled | Недоступный |

### Токены (обновлено 2026-04-16)

| Параметр | Значение | Токен |
|---|---|---|
| Text width | **FILL** | — (растягивается на родителя) |
| Gap (чекбокс ↔ текст) | 8 px | `spacing/2` |

> **Изменение:** Text width был FIXED 99 px → переведён на FILL. Текст теперь занимает всю доступную ширину, переносится при длинном содержании.

### Аудит покрытия

| Категория | Покрытие |
|---|---|
| Color | **100%** |
| Token | **100%** |
| Type | **100%** |
| Overall | **100%** |

---

## 6. Ссылки

- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md)
- [COLOR-PALETTE.md](./COLOR-PALETTE.md)
- [TYPOGRAPHY.md](./TYPOGRAPHY.md)
- [button-spec.md](./button-spec.md) (референс по высотам контролов)
