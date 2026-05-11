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
| `disabled`    | true / false    | В Figma реализован как variant property `Active=No`. Border/disabled, текст tertiary |
| `size`        | sm / md         | При двух размерах — привязка к spacing/radius |

> **Naming в Figma:** variant properties — `Select = Off / On / Indeterminate` и `Active = Yes / No`. **`Active=No` ≡ Disabled state**. Отдельного `Focus` variant нет: визуальный фокус (border/2 + Border/Active) рисуется поверх компонента в коде через focus-ring; spec-таблица состояний §4 описывает Focus как роль, не как Figma variant.
>
> **Error state — в Figma не делаем.** В Larixon Mobile UX чекбоксы используются в фильтрах и согласиях («подтверждаю условия»), где error-валидация даётся helpers/info line под группой, не цветом самого квадрата. Если в будущем появится use-case с per-checkbox error — добавим variant `Error=Yes/No`.

---

## 3. Таблица токенов

| Параметр | Токен / значение | Примечание |
|----------|------------------|------------|
| Минимальная высота ряда (touch) | для standalone Checkbox — `control-height/xs` (32 px) или `/sm` (40 px); для Check+Text как building block (см. §5) — touch обеспечивает родительский ряд (List Item, Filter Row) | Как у контролов в **DESIGN-TOKENS** |
| Gap (квадрат ↔ текст) | spacing/2 (8 px) | |
| Сторона квадрата | **`spacing/5`** (20 px) | Канон для Larixon Mobile. На 16 px квадрат не используем — на mobile хуже читается. |
| Скругление квадрата | **radius/0_5** (2 px) | M3-спека Checkbox = 2 px. Введён 2026-05-11. |
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
| Скругление box | **radius/0_5** | radius/0_5 | 2 |
| Обводка (default) | **border/default** | border/1 | 1 |
| Фокус / акцентная обводка | **border/emphasis** | border/2 | 2 |

**Почему 2 px, а не 4 (radius/1) и не 8 (radius/2):** Material 3 спека для Checkbox задаёт 2 px радиус. На 20×20 квадрате это даёт «почти-острый угол со скруглением, заметным только вблизи» — отличает Checkbox от Radio (full-circle) и от чипов/кнопок (8+). Для этого 2026-05-11 заведён отдельный токен `radius/0_5` (значение 2) между `radius/0` (0) и `radius/1` (4).

---

## 4. Состояния (цвета — семантика)

| Состояние | Квадрат (box) | Иконка (галочка) | Текст подписи |
|-----------|---------------|------------------|---------------|
| Unchecked, Active=Yes | stroke `Border/Active` (или `Border/Default`) | — | `Text&Icon/Primary` |
| Unchecked, Active=No (Disabled) | fill `Background/Tertiary` | — | `Text&Icon/Tertiary` |
| Checked, Active=Yes | fill `Accent/Primary` | **`Text&Icon/Inverted W-B`** ⚠️ | `Text&Icon/Primary` |
| Checked, Active=No (Disabled) | fill `Background/Tertiary` | `Text&Icon/Tertiary` (приглушённая) | `Text&Icon/Tertiary` |
| Indeterminate, Active=Yes | fill `Accent/Primary` | **`Text&Icon/Inverted W-B`** (черта) | `Text&Icon/Primary` |
| Indeterminate, Active=No | fill `Background/Tertiary` | `Text&Icon/Tertiary` (черта) | `Text&Icon/Tertiary` |
| Hover | Подсветка по гайду продукта (в DS не реализовано — mobile-only) | — | `Text&Icon/Primary` |
| Focus | Border/Active или ring `Border/Focus` (рисуется в коде поверх, не отдельный variant) | — | `Text&Icon/Primary` |

**Критично — иконка в Checked/Indeterminate (Active=Yes):** использовать **`Text&Icon/Inverted W-B`** (W в Light, B в Dark), а **не** `Text&Icon/White applied`. Причина: `Accent/Primary` в Light — Zinc/950 (тёмный, белая галочка читается), в Dark — Zinc/50 (почти белый), на нём theme-invariant white текст пропадает и компонент визуально схлопывается с disabled. `Inverted W-B` инвертирует против фона: белый на тёмном Light, чёрный на светлом Dark.

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

### Назначение и touch target

Check+Text — **building block**, не самостоятельный touch-row. Используется внутри List Item / Filter Row / Settings Item, где минимальная высота касания обеспечивается родителем. Сам компонент в Figma имеет высоту `size/sm` (24 px) — равную стороне квадрата + visual breathing room, без собственного padding.

Если нужна standalone-форма (стэк чекбоксов в форме согласий) — оборачивайте в List Item с `control-height/xs` (32) или `/sm` (40).

### Токены (обновлено 2026-05-11)

| Параметр | Значение | Токен |
|---|---|---|
| Высота ряда | 24 px | `size/sm` (building block — см. выше) |
| Text width | **FILL** | layoutGrow=1 на горизонтальном auto-layout |
| Text стиль | **Body 2** (14/20 Regular) | `Base/Body 2` — было `Base/Body Dense` (16/20), не из списка допустимых |
| Gap (чекбокс ↔ текст) | 8 px | `spacing/2` |

> **Изменения 2026-05-11:** Text width 99 fixed → FILL (layoutGrow=1). Text style `Body Dense` (16/20) → `Body 2` (14/20, по spec §3). Высота 24 = `size/sm` — закреплено как building block.

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

---

## 7. История миграций

**2026-05-11 — аудит готовности (component-spec-check), 12 правок.**

В Figma:
- Checkbox box side: 6+1 нод перепривязаны с `size/xs` (информационная шкала) на **`spacing/5`** (20 px, spacing-шкала). Значение то же, шкала корректная.
- Checkbox 86:20324 (Select=Off, Active=Yes): `strokeWeight` `border/2` → **`border/1`** (по спеке §3 — обводка покоя должна быть 1 px; border/2 зарезервирован для focus/акцента).
- Check+Text (4 state-варианта): text style `Base/Body Dense` (16/20) → **`Base/Body 2`** (14/20). Text width 99 fixed → **FILL** (layoutGrow=1).

В спеке:
- §2 «Семантика»: убран `error` (не делаем сейчас), `disabled` уточнён как `Active=No` в Figma. Добавлено пояснение про naming (Active≠Focus) и Error rationale.
- §3 «Таблица токенов»: сторона квадрата зафиксирована на **`spacing/5`** (без альтернативы 16); high target уточнён по контексту (standalone vs building block).
- §4 «Состояния»: удалена строка Error.
- §5 «Check+Text»: добавлен раздел «Назначение и touch target» — building block, touch на родителе. Токены: text style Body 2, высота 24 = size/sm.

Checkbox + Check+Text → ✅ готовы к разработке.

---

**2026-05-06 — fix: галочка в Dark theme.**

В Active=Yes (Select=On и Indeterminate) checkmark был привязан к `Text&Icon/White applied` (theme-invariant белый). В Light это работало (белый на Zinc/950 — отличный контраст), но в Dark `Accent/Primary` становится Zinc/50 (почти белый) — белая галочка пропадала, чекбокс визуально становился похож на disabled.

Перепривязано на `Text&Icon/Inverted W-B` (W в Light → B в Dark). Теперь галочка корректно инвертирует против заливки в обеих темах.
