# Спецификация компонента Checkbox

Чекбокс — выбор одного или нескольких вариантов в форме или списке. В макетах и коде используются только семантические токены из **docs/DESIGN-TOKENS.md**, **docs/COLOR-PALETTE.md**, **docs/TYPOGRAPHY.md**.

**Соответствие Figma:** [UI-Kit-Mobile — Checkbox](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=86-20323).

В макете Figma у **квадрата чекбокса** (box) зафиксированы переменные **радиуса** и **толщины бордера** — те же семантические токены, что в **docs/DESIGN-TOKENS.md** (не «сырые» px на слое). Цвет обводки по-прежнему из **COLOR-PALETTE** (Border/Default, Disabled, Active и т.д.).

> **Сверка с макетом:** размеры квадрата, gap и отступы при необходимости сверить с **Dev Mode**; радиус и stroke уже должны ссылаться на токены radius / border.

---

## 1. Как токенезировать чекбокс (общие правила)

1. **Один компонент — одна таблица токенов** (как в **docs/DESIGN-TOKENS.md**, п. 8): каждое визуальное значение в макете должно иметь строку в таблице — без «голых» px в компоненте.
2. **Разбить на слои по ролям:**
   - **Hit area / контейнер ряда** — минимальная высота касания (часто **height/xs** или **height/sm**), внутренние отступы — **space** (padding), gap между квадратом и подписью — **spacing/N**.
   - **Квадрат (box)** — сторона квадрата = **spacing/N** (часто 16 или 20 px → **spacing/4** или **spacing/5**); **corner radius** на слое — семантический **radius** (см. §3.1), в Figma привязан к переменной.
   - **Обводка** — семантический **border/default** (референс **border/1**, 1 px) в покое; для кольца фокуса или акцента — **border/emphasis** (**border/2**, 2 px); цвет линии — **Border/*** из палитры.
   - **Заливка** — **Background/Primary** (пустой), в состоянии checked — **Accent/Primary** (или брендовый акцент по контексту).
   - **Галочка** — иконка из [Figma Assets](https://www.figma.com/design/iRb5cHw514oCpucz44gjGv/Assets?node-id=2-4), размер **16** (или **24** при крупном размере чекбокса), цвет **Text & Icon / Inverted W-B** на тёмной заливке или **Text & Icon / Primary** на светлой — по макету.
   - **Подпись** — типографика **Body 2** или **typography/caption-md** / **caption-lg** по размеру макета + **Text & Icon / Primary** (disabled → **Tertiary** или **Secondary**).
3. **Состояния** — отдельные строки или колонки в спеки: `default`, `hover`, `pressed`, `focused`, `checked`, `indeterminate`, `disabled`, при необходимости `error`. Для каждого — только семантические цвета (**Border**, **Accent**, **Text & Icon**).
4. **Доступность:** видимый фокус (кольцо или обводка **Border/Active** / **Accent**), `aria-checked`, связь label ↔ input (`htmlFor` / `aria-labelledby`).

---

## 2. Семантика (варианты в коде / Storybook)

| Свойство      | Значения        | Примечание |
|---------------|-----------------|------------|
| `checked`     | true / false    | Визуал: заливка + иконка |
| `indeterminate` | true / false  | Опционально: частичный выбор (родитель в дереве) |
| `disabled`    | true / false    | Border/disabled, текст tertiary |
| `error`       | true / false    | Опционально: обводка Accent/Negative |
| `size`        | sm / md         | Если в Figma два размера — привязать к spacing/radius |

---

## 3. Таблица токенов (базовый размер — уточнить по Figma)

| Параметр | Токен / значение | Примечание |
|----------|------------------|------------|
| Минимальная высота ряда (touch) | height/xs (32 px) или height/sm (40 px) | Как у контролов в **DESIGN-TOKENS** |
| Gap (квадрат ↔ текст) | spacing/2 (8 px) | Часто 8; сверить с auto-layout |
| Сторона квадрата | spacing/4 (16 px) или spacing/5 (20 px) | Сверить с макетом |
| Скругление квадрата | **radius/control-sm** → radius/2 (8 px) | Переменная radius на слое box в Figma |
| Толщина бордера (stroke) | **border/default** → border/1 (1 px) | Переменная border на слое box в Figma |
| Бордер (default) | color: Border/Default | **COLOR-PALETTE** §2.3 |
| Бордер (disabled) | color: Border/Disabled | |
| Бордер (focus / active) | color: Border/Active или обводка focus-ring | |
| Фон квадрата (unchecked) | Background/Primary | |
| Заливка (checked) | Accent/Primary | или бренд по продукту |
| Иконка галочки | 16 px, Figma Assets | цвет по контрасту к заливке |
| Текст подписи | typography/caption-md или Body 2 + Text & Icon/Primary | см. **TYPOGRAPHY.md** |
| Текст (disabled) | Text & Icon/Tertiary или Secondary | |

### 3.1. Радиус и бордер квадрата (Figma + DSL)

На фрейме/прямоугольнике **box** в компоненте Checkbox в Figma на **corner radius** и **stroke weight** навешаны переменные из шкал **radius** и **border** (**docs/DESIGN-TOKENS.md**), без ручного ввода px на слое. Ниже — каноническое соответствие семантики → Core → пиксели; если в UI-Kit выбрана другая ступень шкалы, в спеки подставляется другая строка из той же системы.

| Роль | Семантика (Figma / спека) | Core | Значение (px) |
|------|----------------------------|------|----------------|
| Скругление углов box | **radius/control-sm** | radius/2 | 8 |
| Альтернатива (более плоский box) | **radius/1** (core), если так задано в макете | radius/1 | 4 |
| Толщина обводки box (default) | **border/default** | border/1 | 1 |
| Толщина кольца фокуса / акцентная обводка | **border/emphasis** | border/2 | 2 |

- **Radius:** варианты **control-sm** / **control-md** / **control-lg** — см. **DESIGN-TOKENS** §radius; для чекбокса обычно совпадает с компактным контролом (**control-sm**).
- **Border:** допустимы только **border/default** и **border/emphasis**; **цвет** линии — отдельно, токены **Border/*** в **COLOR-PALETTE** §2.3.

---

## 4. Состояния (цвета — семантика)

| Состояние | Квадрат (обводка/заливка) | Иконка | Текст |
|-----------|---------------------------|--------|-------|
| Unchecked | Border/Default, фон Primary | — | Primary |
| Checked | Заливка Accent/Primary, бордер при необходимости совпадает | Inverted или контрастный | Primary |
| Hover | Лёгкое затемнение/подсветка поверхности (по гайду UI-Kit) | — | Primary |
| Focus | Border/Active или кольцо **border/emphasis** (2 px) | — | Primary |
| Disabled | Border/Disabled, заливка приглушённая | приглушённая | Tertiary |
| Error | Accent/Negative (бордер) | — | Negative (опционально) |
| Indeterminate | Как checked, иконка «минус» / dash из Assets | по макету | Primary |

---

## 5. Ссылки

- Токены: **docs/DESIGN-TOKENS.md**
- Цвета: **docs/COLOR-PALETTE.md** (Background, Border, Accent, Text & Icon)
- Типографика: **docs/TYPOGRAPHY.md**
- Кнопки (референс по высотам и отступам): **docs/buttons-spec-figma.md**
