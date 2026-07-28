# Select — спецификация для разработки

**Один компонент — одна спека.** `Select` — поле выбора значения из списка (**без свободного ввода с клавиатуры**). Первый публичный компонент, собранный на примитиве **[`Field`](./field-spec.md)**.

Привязка к **docs/DESIGN-TOKENS.md** и **docs/COLOR-PALETTE.md** — только существующие токены. Всю обвязку (контейнер, границы, состояния, размеры, слоты, Label, Supporting) Select **наследует от `Field`** — здесь описаны только отличия Select.

Figma: страница **🟢 Select**, набор **`Select`** (`11025:556`) — полный lg/md/sm (42 варианта).

---

## Обзор

Select = `Field` + **отображаемое значение / placeholder** в слоте `Content` + **шеврон** в слоте `Trailing`. По тапу открывает overlay-меню выбора; выбранное значение подставляется в поле. Свободного ввода нет (в отличие от Input/Combobox).

```
Select = Field
├── Leading  (опц. иконка)
├── Content  = значение (Text&Icon/Primary) | placeholder (Text&Icon/Secondary)   ← без каретки
└── Trailing = ▾ шеврон (24 / ic_expand_more, Assets); в Open развёрнут вверх
```

### Оси

| Свойство | Значения |
|---|---|
| **Type** | Filled, Outline |
| **Size** | lg (56), md (48), sm (40) |
| **State** | Default, Focused, **Open**, Filled, Error, Disabled, ReadOnly |

**`Open` вместо `Editing`** (у Select нет ввода): меню раскрыто → граница `Border/Active` 2px + шеврон вверх. Остальные состояния и порядок приоритета — как в [`field-spec.md`](./field-spec.md) (`Disabled → ReadOnly → Error → Open → Focused → Filled → Default`).

---

## Состояния

| State | Content | Граница | Шеврон |
|---|---|---|---|
| **Default** | placeholder (Secondary) | `Border/Default` 1px | вниз |
| **Focused** | placeholder / значение | `Border/Active` 2px | вниз |
| **Open** | placeholder / значение | `Border/Active` 2px | **вверх** |
| **Filled** | значение (Primary) | `Border/Default` 1px | вниз |
| **Error** | placeholder / значение | `Accent/Negative` 2px | вниз |
| **Disabled** | значение (Tertiary) | `Border/Disabled` | вниз (приглушён) |
| **ReadOnly** | значение (Primary) | `Border/Default` 1px | вниз, **приглушён** (`Text&Icon/Tertiary`) |

- **ReadOnly** — значение без возможности открыть меню; шеврон **не скрываем, а приглушаем** (`Text&Icon/Tertiary`) — поле остаётся визуально «селектом», просто неактивным (решение 2026-07-27).
- Фон/тип (Filled/Outline) — по `Field`.

> **`Error` у Select — про обязательность, не про формат.** Вводить нечего, поэтому единственный реальный кейс ошибки — **required-поле не выбрано** (обязательный дропдаун оставили пустым и отправили форму → «Выберите значение»). Реже — кросс-полевая валидация (недопустимая комбинация с другим полем). Валидации содержимого/формата (как у Input) у Select нет. Триггер — обычно submit-time, не «на выборе».

---

## Overlay-меню

Сам список выбора — **отдельный существующий компонент**, Select его лишь триггерит:
**DS-Select — меню-агностичен (без встроенного списка).** Компонент = только триггер: эмитит `onOpen`, а сам список рендерит **продукт** (product-side wiring). Причина (Android, 2026-07-27): существующие `SingleSelect/MultiSelectBottomSheet` живут в модуле `storybook`, а `design-system` от него не зависит — встроить нельзя. iOS — аналогично (bottom sheet / меню поверх собирает продукт из Sheet / Context Menu).

- **Single vs Multi** — выбор варианта меню на стороне продукта; Select-триггер один.
- **Мульти-выбор в Content** — **первое значение + «ещё N»** (напр. «Toyota, ещё 2»); при нехватке ширины — усечение. Не чипы (переполняют однострочное поле) и не голый счётчик (менее информативно). Решение 2026-07-27.

Позиционирование и содержимое меню — вне этого компонента (см. [context-menu-spec.md](./context-menu-spec.md) / [sheets-spec.md](./sheets-spec.md)).

---

## Иконка шеврона

`24 / ic_expand_more` (Assets, key `ff35f17…`), 24×24. В состоянии `Open` — поворот 180° (вверх). Цвет по состоянию: покой `Text&Icon/Secondary`, активно `Text&Icon/Primary`, disabled `Text&Icon/Tertiary`.

---

## Поведение

- Тап по полю → открывается меню (`Open`), шеврон вверх.
- Выбор пункта → значение в Content, состояние `Filled`, меню закрывается, шеврон вниз.
- Нет ручного ввода текста; фильтрация/поиск по списку — это уже **Combobox** (отдельный компонент, позже).
- Клавиатура: Enter/Space открывает, стрелки по пунктам, Esc закрывает.

---

## Доступность (a11y)

- Роль `combobox` (триггер) + `listbox` (меню); `aria-expanded` синхронно с `Open`.
- Label связан с полем; выбранное значение объявляется; Error — `aria-describedby` + `aria-invalid`.
- Тач-высота ≥ 40 (sm); hit-area в коде.

---

## Аудит покрытия токенами

Наследуется от `Field` — **100%** (radius / height / spacing / border / bg / text). Специфика Select: шеврон 24 (`size/sm`), цвет шеврона по семантике. Геометрия меню — вне компонента.

---

## Синхронизация с кодом

Строится на `Field` (Android — извлекаемый chrome-слой из `AppInput`/`AppInputDefaults` **без** `BasicTextField`; iOS — `MDSLFieldView` + кнопка-триггер с меню). Значение — не редактируемый текст, а отображение выбора. Меню — существующий overlay.

```tsx
<Select
  type="outline"          // "filled" | "outline"
  size="md"               // "lg" | "md" | "sm"
  state="default"         // default|focused|open|filled|error|disabled|readonly
  placeholder="Выберите значение"
  value={selected}        // отображаемое значение
  onOpen={openMenu}       // триггерит overlay-меню
/>
```

---

## Дальнейшее

- Полные матрицы lg/md/sm — **готово** (42 варианта).
- Multi-select представление Content — **решено: первое значение + «ещё N»** (см. §Overlay-меню).
- ReadOnly шеврон — **решено: приглушать** (`Text&Icon/Tertiary`), не скрывать.
- Combobox (Select + свободный ввод + фильтрация) — отдельный компонент.

---

## Связанные документы

- [field-spec.md](./field-spec.md) — примитив, на котором построен Select
- [context-menu-spec.md](./context-menu-spec.md) · [sheets-spec.md](./sheets-spec.md) — overlay-меню выбора
- [proposals/field-family-architecture.md](./proposals/field-family-architecture.md)

---

## История

**2026-07-27 — Select собран на `Field`, развёрнут в полный размер.** Первый новый компонент field-семейства после согласования архитектуры с разработкой. Набор `Select` (`11025:556`): Type (Filled/Outline) × **Size (lg/md/sm)** × State (Default/Focused/Open/Filled/Error/Disabled/ReadOnly) = **42 варианта**. Content = значение/placeholder без каретки (типографика по размеру: lg Body 1, md/sm Body 2); Trailing = шеврон `ic_expand_more` (в Open — вверх). Overlay-меню переиспользует существующий паттерн (Android BottomSheet). Вынесен на отдельную страницу **🟢 Select** (RC-страница расформирована). Приоритет обеих команд — первым делали именно Select.
