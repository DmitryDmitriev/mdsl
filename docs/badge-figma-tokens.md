# Badge — размерности и цвета для Figma

Все значения приведены в соответствие с макетом **[UI-Kit-Mobile — Badge](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=4523-14)** (node 4523-14). Цвета — из палитры проекта (docs/COLOR-PALETTE.md, src/tokens/colors.ts).

---

## 1. Размерности (Dimensions)

### 1.1 Отступы по размеру бейджа

Размеры привязаны к семантическим высотам (height.xs, height.sm, height.md): **xs 32 px** < **sm 40 px** < **md 48 px**.

| Параметр | xs | sm | md |
|----------|-----|-----|-----|
| **Padding Top** | 8 px | 12 px | 16 px |
| **Padding Bottom** | 8 px | 12 px | 16 px |
| **Padding Left** | 8 px | 8 px | 12 px |
| **Padding Right** | 8 px | 8 px | 12 px |
| **Gap** (между иконкой и текстом) | 4 px | 4 px | 4 px |
| **Height** (фиксированная) | 32 px | 40 px | 48 px |
| **Font size** | 12 px (Caption M) | 14 px (Body 2) | 14 px (Body 2) |
| **Line height** | 16 px | 20 px (Body 2 Medium) | 20 px (Body 2 Medium) |
| **Font weight** | 500 | 500 | 500 |
| **Иконка** (размер, если бейдж с иконкой) | 16×16 px | 24×24 px | 24×24 px |

Размер **xs** — для мест с высокой плотностью информации (область применения будет уточнена).

### 1.2 Скругления (Radius)

| Форма | Токен | Значение |
|-------|--------|----------|
| **Pill** (капсула) | radius.pill | 999 px |
| **Rounded** | radius.controlMd | 8 px |

### 1.3 Вариант с иконкой

Бейдж может отображаться **только с текстом** или **с иконкой и текстом**. Для варианта с иконкой:

| Параметр | Значение |
|----------|----------|
| **Позиция иконки** | Слева от текста |
| **Gap между иконкой и текстом** | 4 px (`spacing/1`) |
| **Цвет иконки** | Тот же, что цвет текста бейджа (см. п. 2 — колонка Text для выбранного варианта) |

**Размер иконки для каждого размера бейджа** (по Figma UI-Kit-Mobile: xs 16 px, sm и md 24 px; см. также строку «Иконка» в таблице 1.1):

| Размер бейджа | Высота бейджа | Размер иконки |
|---------------|----------------|----------------|
| xs | 32 px | **16×16 px** |
| sm | 40 px | **24×24 px** |
| md | 48 px | **24×24 px** |

**Сборка в Figma:** Auto layout по горизонтали, порядок слоёв: [Фрейм иконки] → [Gap 4 px] → [Текст]. Горизонтальный padding фрейма бейджа — как в таблице 1.1 (Padding Left/Right); внутренний gap между иконкой и текстом — 4 px. Иконку и текст привязать к цвету варианта (semantic.decor) для единого тона.

---

## 2. Цвета по вариантам (semantic.decor)

Все значения — только из палитры проекта (**docs/COLOR-PALETTE.md**, **src/tokens/colors.ts**). Фон и текст задаются парой **Background** + **Text**.

| Вариант | Роль | Токен фона | Токен текста | Background (Fill) | Text |
|---------|------|------------|--------------|-------------------|------|
| **good** | Good | Green/50 | Green/800 | `#F0FDF4` | `#166534` |
| **info** | Info | Blue/50 | Blue/800 | `#EFF6FF` | `#1E40AF` |
| **warning** | Warning | Orange/50 | Orange/800 | `#FFF7ED` | `#9A3412` |
| **negative** | Negative | Red/50 | Red/800 | `#FEF2F2` | `#991B1B` |
| **question** | Question | Zinc/100 | Zinc/800 | `#F4F4F5` | `#27272A` |
| **answer** | Answer | Blue/100 | Blue/800 | `#DBEAFE` | `#1E40AF` |
| **admin** | Admin | Green/100 | Green/800 | `#DCFCE7` | `#166534` |

---

## 3. Сводная таблица «вариант × размер × форма»

Удобно для создания компонентов в Figma: один компонент с вариантами Variant (good, info, …), Size (xs, sm, md), Shape (pill, rounded).

| Вариант | Size | Shape | Padding H | Padding V | Height | Icon | Radius | Font | BG | Text |
|---------|------|-------|-----------|-----------|--------|------|--------|------|-----|------|
| good | xs | pill | 8 | 8 | 32 | 16×16 | 999 | 12/16 | #F0FDF4 | #166534 |
| good | xs | rounded | 8 | 8 | 32 | 16×16 | 8 | 12/16 | #F0FDF4 | #166534 |
| good | sm | pill | 8 | 12 | 40 | 24×24 | 999 | 14/20 | #F0FDF4 | #166534 |
| good | sm | rounded | 8 | 12 | 40 | 24×24 | 8 | 14/20 | #F0FDF4 | #166534 |
| good | md | pill | 12 | 16 | 48 | 24×24 | 999 | 14/20 | #F0FDF4 | #166534 |
| good | md | rounded | 12 | 16 | 48 | 24×24 | 8 | 14/20 | #F0FDF4 | #166534 |
| info | xs | pill | 8 | 8 | 32 | 16×16 | 999 | 12/16 | #EFF6FF | #1E40AF |
| info | xs | rounded | 8 | 8 | 32 | 16×16 | 8 | 12/16 | #EFF6FF | #1E40AF |
| info | sm | pill | 8 | 12 | 40 | 24×24 | 999 | 14/20 | #EFF6FF | #1E40AF |
| info | sm | rounded | 8 | 12 | 40 | 24×24 | 8 | 14/20 | #EFF6FF | #1E40AF |
| info | md | pill | 12 | 16 | 48 | 24×24 | 999 | 14/20 | #EFF6FF | #1E40AF |
| info | md | rounded | 12 | 16 | 48 | 24×24 | 8 | 14/20 | #EFF6FF | #1E40AF |
| warning | xs | pill | 8 | 8 | 32 | 16×16 | 999 | 12/16 | #FFF7ED | #9A3412 |
| warning | xs | rounded | 8 | 8 | 32 | 16×16 | 8 | 12/16 | #FFF7ED | #9A3412 |
| warning | sm | pill | 8 | 12 | 40 | 24×24 | 999 | 14/20 | #FFF7ED | #9A3412 |
| warning | sm | rounded | 8 | 12 | 40 | 24×24 | 8 | 14/20 | #FFF7ED | #9A3412 |
| warning | md | pill | 12 | 16 | 48 | 24×24 | 999 | 14/20 | #FFF7ED | #9A3412 |
| warning | md | rounded | 12 | 16 | 48 | 24×24 | 8 | 14/20 | #FFF7ED | #9A3412 |
| negative | xs | pill | 8 | 8 | 32 | 16×16 | 999 | 12/16 | #FEF2F2 | #991B1B |
| negative | xs | rounded | 8 | 8 | 32 | 16×16 | 8 | 12/16 | #FEF2F2 | #991B1B |
| negative | sm | pill | 8 | 12 | 40 | 24×24 | 999 | 14/20 | #FEF2F2 | #991B1B |
| negative | sm | rounded | 8 | 12 | 40 | 24×24 | 8 | 14/20 | #FEF2F2 | #991B1B |
| negative | md | pill | 12 | 16 | 48 | 24×24 | 999 | 14/20 | #FEF2F2 | #991B1B |
| negative | md | rounded | 12 | 16 | 48 | 24×24 | 8 | 14/20 | #FEF2F2 | #991B1B |
| question | xs | pill | 8 | 8 | 32 | 16×16 | 999 | 12/16 | #F4F4F5 | #27272A |
| question | xs | rounded | 8 | 8 | 32 | 16×16 | 8 | 12/16 | #F4F4F5 | #27272A |
| question | sm | pill | 8 | 12 | 40 | 24×24 | 999 | 14/20 | #F4F4F5 | #27272A |
| question | sm | rounded | 8 | 12 | 40 | 24×24 | 8 | 14/20 | #F4F4F5 | #27272A |
| question | md | pill | 12 | 16 | 48 | 24×24 | 999 | 14/20 | #F4F4F5 | #27272A |
| question | md | rounded | 12 | 16 | 48 | 24×24 | 8 | 14/20 | #F4F4F5 | #27272A |
| answer | xs | pill | 8 | 8 | 32 | 16×16 | 999 | 12/16 | #DBEAFE | #1E40AF |
| answer | xs | rounded | 8 | 8 | 32 | 16×16 | 8 | 12/16 | #DBEAFE | #1E40AF |
| answer | sm | pill | 8 | 12 | 40 | 24×24 | 999 | 14/20 | #DBEAFE | #1E40AF |
| answer | sm | rounded | 8 | 12 | 40 | 24×24 | 8 | 14/20 | #DBEAFE | #1E40AF |
| answer | md | pill | 12 | 16 | 48 | 24×24 | 999 | 14/20 | #DBEAFE | #1E40AF |
| answer | md | rounded | 12 | 16 | 48 | 24×24 | 8 | 14/20 | #DBEAFE | #1E40AF |
| admin | xs | pill | 8 | 8 | 32 | 16×16 | 999 | 12/16 | #DCFCE7 | #166534 |
| admin | xs | rounded | 8 | 8 | 32 | 16×16 | 8 | 12/16 | #DCFCE7 | #166534 |
| admin | sm | pill | 8 | 12 | 40 | 24×24 | 999 | 14/20 | #DCFCE7 | #166534 |
| admin | sm | rounded | 8 | 12 | 40 | 24×24 | 8 | 14/20 | #DCFCE7 | #166534 |
| admin | md | pill | 12 | 16 | 48 | 24×24 | 999 | 14/20 | #DCFCE7 | #166534 |
| admin | md | rounded | 12 | 16 | 48 | 24×24 | 8 | 14/20 | #DCFCE7 | #166534 |

---

## 4. Рекомендации для Figma

1. **Компонент**: создайте Component с тремя свойствами (variants): **Variant** (7 вариантов), **Size** (xs, sm, md), **Shape** (pill, rounded).
2. **Auto layout**: включите Auto layout, задайте padding по таблице 1.1, gap между иконкой и текстом 4 px.
3. **Текст**: один текстовый слой (xs: typography/caption-md 12/16, sm и md: Body 2 Medium 14/20), weight 500; цвет — из колонки Text для выбранного Variant.
4. **Иконка** (если есть): по Figma xs → **16×16** px, sm и md → **24×24** px.
5. **Фон**: заливка фрейма — из колонки BG; corner radius — 999 (pill) или 8 (rounded).
6. **Токены в Figma**: если используете Variables, создайте цветовые переменные для каждого decor (good, info, …) и привяжите Fill и Text к ним — так при смене темы или стилей обновление будет централизованным.

Спецификация компонента: **docs/badge-spec.md**. Цветовая палитра: **docs/COLOR-PALETTE.md**. Макет: [Figma UI-Kit-Mobile — Badge (4523-14)](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=4523-14).
