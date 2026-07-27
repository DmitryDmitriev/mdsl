# Field family — рекомендации по изменениям (для разработки)

**Дата:** 2026-07-21
**Статус:** на согласование с разработкой (сборка полных матриц — после «ок»)
**Figma:** [`.=Field`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=11024-404) (страница 🟢 Field) · [`Select`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=11025-556) (страница 🟢 Select) — полные наборы lg/md/sm
**Архитектура (полный текст):** [field-family-architecture.md](./field-family-architecture.md)

---

## 1. Суть изменения

Поля ввода (Input, Search, Textarea, + отсутствующие Select/Combobox) имеют **идентичный chrome**, но сейчас собраны копированием → дрейф (каретку/Editing/border в Search переносили руками из Input). Предлагаем:

**Один общий примитив `Field`** (контейнер + границы + состояния + размеры + label + supporting + слоты Leading/Content/Trailing) + **отдельные компоненты**, которые его композируют. Правка chrome — один раз в `Field`, а не в N копий.

На RC-странице собрано демо (scope: md, Outline+Filled, единая state-модель):
- **`.=Field`** — примитив с 7 состояниями × 2 типа, слоты видны.
- **Input / Search / Select** — композиция на `Field` (Select — новый компонент).

---

## 2. Рекомендуемые изменения по компонентам

### 2.1 Новый примитив `.=Field`
Вынести обвязку в building-block. Токены (подтверждены в текущих компонентах): radius `radius/control/control-lg`, height `control-height/{lg,md,sm}`, padding H `spacing/4` (lg) / `spacing/3` (md,sm), border `Border/Default` 1px (покой) / `Border/Active` 2px (Focused/Editing) / `Accent/Negative` 2px (Error), bg `Background/Secondary` (Filled) / transparent (Outline).

### 2.2 Input
- **Rename** булевых: `Left Icon` → `Leading Icon`, `Right Icon` → `Trailing Icon` (см. §4 — ломает override).
- Композировать `Field`. Content = текст + каретка. Состояния — полный набор (эталон, уже есть все 7).

### 2.3 Search
- **Дозавести состояния `Error` и `ReadOnly`** (сейчас их нет; есть у Input/Textarea).
- Композировать `Field`. Content = 🔍(leading) + текст + каретка + ×(trailing clear).
- Нейминг уже `Leading/Trailing` — оставить.

### 2.4 Textarea
- **Дозавести состояние `Editing`** (каретка после значения) — либо осознанно отклонить для multiline.
- Композировать `Field` (multiline-режим Content, высота растёт; без оси Size).

### 2.5 Select (НОВЫЙ компонент)
Отсутствует в DS — собрать на `Field`:
- Content = отображаемое значение (**без свободного ввода**) или placeholder.
- Trailing = шеврон **`24 / ic_expand_more`** (Assets).
- Состояния: `Default / Focused / Open / Filled / Error / Disabled / ReadOnly`. **`Editing` неприменимо** (нет ввода с клавиатуры); вместо него **`Open`** (меню раскрыто, шеврон вверх, обводка активна).
- a11y: `combobox`/`listbox`, открывает overlay-меню (переиспользовать Context Menu / Popover).

### 2.6 Combobox / Autocomplete (позже)
Text + фильтрация + меню на `Field` — когда понадобится.

---

## 3. Единая state-модель (канон)

`Default · Focused · Editing · Filled · Error · Disabled · ReadOnly`

| Состояние | Input | Search | Textarea | Select |
|---|---|---|---|---|
| Default | ✅ | ✅ | ✅ | ✅ |
| Focused | ✅ | ✅ | ✅ | ✅ |
| Editing | ✅ | ✅ | ➕ дозавести | ➖ н/п → `Open` |
| Filled | ✅ | ✅ | ✅ | ✅ |
| Error | ✅ | ➕ дозавести | ✅ | ✅ |
| Disabled | ✅ | ✅ | ✅ | ✅ |
| ReadOnly | ✅ | ➕ дозавести | ✅ | ✅ |

➕ = добавить, ➖ = неприменимо.

---

## 4. Нейминг слотов

Привести к единому: **`Leading Icon` / `Trailing Icon`** во всех компонентах (сейчас Input = `Left Icon` / `Right Icon`).

⚠️ Переименование component property **ломает override инстансов** в продуктовых макетах. Нужен ответ разработки: делаем сейчас (с миграцией) или оставляем текущие имена.

---

## 5. План и риски

- **Доставка через RC-страницу**, опубликованные компоненты и прод-инстансы **не трогаем** до отдельной согласованной миграции. Ноль риска сейчас.
- Порядок: `Field` → Select (новый, сразу на Field) → миграция Input/Search/Textarea (большая, по плану).
- Главный риск — миграция инстансов при переводе существующих компонентов на `Field` + переименование. Нужен план (возможно постепенный: новое на `Field`, старое дорабатываем позже).

---

## 6. Вопросы к разработке (перед стартом полной сборки)

1. На каком этапе вы сейчас по полям? Не собрали ли уже `Field`/Select/Combobox на своей стороне?
2. Согласны на общий `Field` + отдельные компоненты (композиция), а не Type-axis?
3. ОК на единую state-модель (Search +Error/ReadOnly, Textarea +Editing)?
4. ОК на переименование `Left/Right Icon` → `Leading/Trailing Icon` (цена миграции override)?

---

## 7. Связанные документы

- [field-family-architecture.md](./field-family-architecture.md) — архитектура и фазировка
- [input-v2-spec.md](../input-v2-spec.md) · [search-spec.md](../search-spec.md) · [textarea-spec.md](../textarea-spec.md)
