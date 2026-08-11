# Field — спецификация примитива (foundation field-семейства)

**Один компонент — одна спека.** `Field` — **приватный building-block** (не публичный компонент): общая обвязка всех полей ввода. Его композируют публичные компоненты: **Input, Textarea, Search, Select** (далее — Combobox).

Канон для реализации на обеих платформах (согласовано с Android + iOS 2026-07-27). **iOS** строит `MDSLFieldView` по этой спеке; **Android** извлекает этот слой из `AppInput` / `AppInputDefaults` (в первую очередь под Select).

Привязка к **docs/DESIGN-TOKENS.md** и **docs/COLOR-PALETTE.md** — только существующие токены.

Figma: страница **🟢 Field family** (объединяющая — кубик `.=Field` + компоненты семейства: Select, далее Input/Search/Textarea), набор **`.=Field`** (`11024:404`) — полный lg/md/sm (42 варианта).

---

## Что такое `Field` и чего в нём НЕТ

`Field` владеет **обвязкой (chrome)**, одинаковой для всех полей:
- контейнер: размер, радиус, padding, фон, **граница по состоянию**;
- слоты: **Leading** (иконка/префикс), **Content** (наполнение — задаёт компонент), **Trailing** (иконка/действие/шеврон);
- окружение: **Label** (сверху, опц.), **Supporting text** (снизу, опц.);
- **машина состояний** (7 состояний + порядок приоритета).

`Field` **не содержит** самого способа ввода — он **content-agnostic**. Текстовое поле, каретку, значение, шеврон, меню приносит компонент-обёртка в слот `Content` / `Trailing`. Это ключ: `Select` строится на `Field` **без** `BasicTextField`/каретки.

---

## Контракт композиции

| Компонент | Leading | Content | Trailing | Спец. состояние |
|---|---|---|---|---|
| **Input** | опц. иконка/префикс | текст + каретка | опц. иконка / suffix | — |
| **Textarea** | — | multiline-текст + каретка (высота растёт) | — | — (без оси Size) |
| **Search** | 🔍 `ic_search` | текст + каретка | × очистка (`ic_close`) | — |
| **Select** | опц. иконка | значение / placeholder (**без ввода**) | ▾ `ic_expand_more` | **`Open`** вместо `Editing` |
| **Combobox** (позже) | опц. | текст + каретка | ▾ + × | Open + Editing |

Компонент прокидывает в `Field` только: `Type`, `Size`, `State`, содержимое слотов. Правка chrome делается **один раз в `Field`** и доезжает до всех.

---

## Оси

| Свойство | Значения |
|---|---|
| **Type** | Filled, Outline |
| **Size** | lg (56), md (48), sm (40) — у Textarea оси Size нет |
| **State** | Default, Focused, Editing, Filled, Error, Disabled, ReadOnly |

---

## Состояния и приоритет

Единая машина состояний. Когда одновременно применимо несколько — **порядок приоритета** (кто побеждает), согласован с реализацией Android:

`Disabled → ReadOnly → Error → Editing → Focused → Filled → Default`

(пример: поле в фокусе И с ошибкой → рендерится `Error`; disabled перебивает всё.)

| State | Смысл | Граница (Outline + Filled active) | Фон (Filled) |
|---|---|---|---|
| **Default** | покой, пусто | `Border/Default` 1px | `Background/Secondary` |
| **Focused** | в фокусе, пусто (начало ввода) | `Border/Active` 2px | `Background/Secondary` |
| **Editing** | в фокусе, со значением | `Border/Active` 2px | `Background/Secondary` |
| **Filled** | заполнено, не в фокусе | `Border/Default` 1px | `Background/Secondary` |
| **Error** | ошибка валидации | `Accent/Negative` 2px | `Background/Secondary` |
| **Disabled** | недоступно | `Border/Disabled` | `Background/Tertiary` |
| **ReadOnly** | только чтение | `Border/Default` 1px | `Background/Secondary` |

- **Outline** — фон прозрачный (наследует поверхность), граница всегда.
- **Filled** — фон `Background/Secondary`; граница появляется только в активных/ошибочных (`Focused/Editing/Error`), в остальном без границы.
- **Select:** вместо `Editing` — **`Open`** (меню раскрыто): граница `Border/Active` 2px, шеврон развёрнут вверх.

> **Runtime-derived (заметка iOS).** На iOS `Focused/Editing/Filled` — производные от рантайма (first responder + наличие текста), это derived-состояния одной модели; в Figma — явные варианты. Расхождения нет: Figma-варианты = визуальные представления рантайм-состояний.

---

## Размеры

| Size | Height | Token | Padding H | Token | Gap | Token | Text |
|---|---|---|---|---|---|---|---|
| **lg** | 56 | `control-height/lg` | 16 | `spacing/4` | 8 | `spacing/2` | Body 1 (16/24) |
| **md** | 48 | `control-height/md` | 12 | `spacing/3` | 8 | `spacing/2` | Body 2 (14/20) |
| **sm** | 40 | `control-height/sm` | 12 | `spacing/3` | 4 | `spacing/1` | Body 2 (14/20) |

- **Radius:** `radius/control/control-lg` (12) — все размеры.
- **Иконки слотов:** 24 × 24 (`size/sm`).
- **Каретка** (Input/Search/Textarea): 2 × line-height (lg 20 / md·sm 18), radius 1, `Text&Icon/Primary`. В `Field` не входит — приносит компонент.

---

## Слоты и окружение

```
Field (контейнер, HORIZONTAL, height по Size, padding H по Size)
├── Leading   (опц.)  — иконка/префикс
├── Content   (FILL)  — наполнение компонента
└── Trailing  (опц.)  — иконка/действие/шеврон
Label          (опц., над Field)      — Caption/caption-md Medium, Text&Icon/Primary
Supporting Text (опц., под Field)     — Caption/caption-md, Text&Icon/Tertiary (Error → Accent/Negative)
```

**Нейминг слотов — `Leading` / `Trailing`** (не Left/Right). Совпадает с целевым неймингом Android (`leading/trailingIcon`) и UIKit-конвенцией iOS (directional). В легаси Android (`AppTextField`, @Deprecated) остались `Left/Right` — уезжают с деприкейтом.

### Аффиксы — `Prefix` / `Suffix` (валюта, единицы)

Внутри `Field` есть две скрытые TEXT-ноды: **`Prefix`** (перед `Content`, leading-сторона) и **`Suffix`** (после `Content`, trailing-сторона). Дефолт `visible=false`; показываются **переопределением видимости на инстансе** (отдельного boolean-property нет — консистентно между Prefix и Suffix). Назначение — знак валюты / единицы измерения:

| Паттерн | Нода | Пример |
|---|---|---|
| Символ-префикс | `Prefix` | **$** 1 000 |
| Символ/код-суффикс | `Suffix` | 1 000 **₽** · 1000 **USD** |

Т.е. `Field` **не текст-онли** — «поле суммы» = Input с показанным `Prefix`/`Suffix`. Сам числовой ввод (numeric keyboard, разделители) — рантайм/продукт. Добавлено 2026-08-11 в кубик (`11024:404`) и Input (`6316:335`), все 42 варианта. (Изначально хотели настоящие SLOT, но `figma.createSlot` в API нет — пошли Prefix/Suffix текстом.)

---

## Цвета контента (задаёт компонент, не Field)

| Роль | Токен |
|---|---|
| Placeholder | `Text&Icon/Secondary` |
| Значение | `Text&Icon/Primary` |
| Иконка (покой) | `Text&Icon/Secondary` |
| Иконка (активно) | `Text&Icon/Primary` |
| Disabled текст/иконка | `Text&Icon/Tertiary` |
| Error supporting | `Accent/Negative` |

---

## Доступность (a11y)

`Field` — визуальная обвязка, роль задаёт компонент: Input `textbox`, Search `searchbox`, Select `combobox`/`listbox`. Label связывается с полем; Supporting/Error — `aria-describedby`. Тач-высота ≥ 40 (sm) / 44 рекомендуется — hit-area расширяется в коде.

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (border / bg / text) | 100% |
| 🔲 Tokens (radius / height / spacing) | 100% |
| **Overall** | **100%** |

Каретка (2 × line-height) и рантайм-геометрия контента — вне токенизации (не chrome).

---

## Синхронизация с кодом

**Android:** роль `Field` де-факто у `AppInput` (+ `AppInputDefaults`); chrome-слой извлекается в приватный building-block, чтобы `Select` строился без `BasicTextField`. State-resolver уже реализует канон-порядок выше. Модуль `design-system/` (не легаси `storybook/`).

**iOS:** `MDSLFieldView` (UIKit) — контейнер + border/bg по состоянию + слоты; поверх — публичные `Input`/`Search`/`Select` (`UITextField` / `UITextView` / кнопка+меню). Overlay-меню Select — переиспользовать существующий паттерн (Android: `SingleSelect/MultiSelectBottomSheet`).

Overlay-меню Select переиспользует Context Menu / Popover / Sheet.

---

## Chrome parity (mirror-модель)

В Figma публичные компоненты (Input, Search, Select, Textarea) — **отдельные копии** обвязки кубика `.=Field`, не вложенные инстансы (Figma не даёт впрыснуть значение/каретку в инстанс без SLOT, а `figma.createSlot` в API нет). Живой авто-связи нет — синхронизацию держим **дисциплиной parity**:

1. **Источник правды** — кубик `.=Field` (`11024:404`) + эта спека (+ единый `Field` в коде).
2. **Правишь обвязку** (radius / padding / height / layout / gap / цвет) — правишь в кубике **И** прогоняешь по копиям.
3. **Перед каждым Publish** — прогнать аудит [`DSL/scripts/field-parity-audit.js`](../scripts/field-parity-audit.js) (через MCP `use_figma`). Ожидаемо `drift: []`.

Textarea намеренно в grow-режиме (VERTICAL, min-height 64, top-align) — сверяется только `radius`.

**Базлайн 2026-08-11:** `drift: []` — Input/Search/Select совпадают с кубиком по radius 12 / height 56·48·40 / padH 16·12·12 / HORIZONTAL·CENTER·gap; Textarea radius 12 ✓.

> **Почему не true-nested** (вложенный инстанс кубика): потребовало бы перестройки `Content` кубика + всех боевых сетов (риск регрессий override'ов), Textarea всё равно не ложится (grow), а выгода маргинальна — в **коде** композиция уже единая (`Field` content-agnostic — там дрейфа нет). Решение 2026-08-11.

## Дальнейшее

- **Select** — первый новый компонент на `Field` (приоритет обеих команд).
- Полные матрицы `Field` lg/md/sm в Figma — **готово** (42 варианта).
- Combobox — по потребности.
- Миграция публичных Input/Search/Textarea на явный `Field` — по плану (Android: freeze legacy, перевод вызовов LAA-3615; дизайн: миграция инстансов при переименовании).

---

## Связанные документы

- [proposals/field-family-architecture.md](./proposals/field-family-architecture.md) — архитектура и фазировка
- [proposals/field-family-recommendations.md](./proposals/field-family-recommendations.md) — рекомендации + ответы команд
- [input-v2-spec.md](./input-v2-spec.md) · [search-spec.md](./search-spec.md) · [textarea-spec.md](./textarea-spec.md)

---

## История

**2026-07-27 (вечер) — `Field` развёрнут в полный размер + вынесен на страницу.** Набор `.=Field` (`11024:404`): Type × Size (lg/md/sm) × State = **42 варианта** на странице **🟢 Field** (RC-страница расформирована на 🟢 Field + 🟢 Select). Контент — пустой слот, иконочные слоты скрыты. Готов к публикации.

**2026-07-27 — `field-spec.md` создан после согласования с разработкой.**

Обе платформы приняли архитектуру (общий `Field` + отдельные компоненты, единый state-набор, нейминг Leading/Trailing). Android: `AppInput` уже = de-facto Field, Search композирует его, state-модель совпадает; Field выделяют под Select. iOS: чистый лист, строят `MDSLFieldView` по этой спеке. Порядок приоритета состояний зафиксирован из реализации Android; заметка про runtime-derived — из iOS.
