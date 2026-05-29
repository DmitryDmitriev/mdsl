# Spacing — Semantic Tokens

Семантические токены отступов Larixon Mobile DS. Слой **поверх** primitive-токенов из [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) (`spacing/0..8`).

> **Зачем второй слой:** primitives (`spacing/2 = 8`) отвечают на «сколько», но не на «зачем». Семантические токены (`section/title-to-content = 8`) отвечают и на «зачем» — это документация назначения отступа прямо в названии. При смене значения primitive'ов (если когда-нибудь решим, что `section/title-to-content` стоит сделать 12 вместо 8) — меняется один alias, не сотня мест в Figma.

**Коллекция в Figma:** «Spacing — usage» — node `9119:10` в UI-Kit-Mobile (`PI2N65xbeJPTc5oWhOP7Bl`). 20 токенов, все алиасят на Core primitives. У каждого — русское описание в Figma description.

**Cheatsheet:** node `9121:3651` (визуальная шпаргалка с примерами).

---

## Группы

### `screen/*` — отступы уровня экрана

| Токен | Значение | Alias | Назначение |
|---|---|---|---|
| `screen/padding-horizontal` | 16 | `spacing/4` | Боковые отступы экрана от края устройства |

### `section/*` — секции (section card)

| Токен | Значение | Alias | Назначение |
|---|---|---|---|
| `section/padding-default` | **16** | `spacing/4` | **Дефолт — большинство мобильных карт (списки, фильтры, формы).** При сомнении — этот. |
| `section/padding-comfortable` | 24 | `spacing/6` | Информационные карты, hero-блоки. Используется редко. |
| `section/padding-spacious` | 32 | `spacing/8` | Hero / финальные экраны с одним действием. |
| `section/gap` | 8 | `spacing/2` | Расстояние между соседними section card на экране |
| `section/title-to-content` | 8 | `spacing/2` | От заголовка секции до её контента (внутри карты) |

> **Внимание — semantic-rotation 2026-05-29.** До этой даты `padding-default = 24` (Tailwind-default наследие). По факту 0 компонентов в UI-Kit-Mobile использовали 24, все 83 binding'а сидели на 16 (`compact`). Имена врали против реального use case. Произведена ротация ролей: бывший `compact` (16) → `padding-default`, бывший `padding-default` (24) → `padding-comfortable`. **Значения не менялись** — Figma трекает variables по ID, все существующие bindings автоматически перешли на новые имена с теми же значениями.
>
> **Что это значит для продуктовых файлов:** инстансы, которые ранее были привязаны к `section/padding-default = 24` (например, ds-build'овский bind в PB-876), теперь привязаны к `section/padding-comfortable = 24`. Визуально не изменилось. Если нужно перевести их на новый дефолт 16 — отдельная переменная в инстансе.

### `stack/*` — вертикальный стек элементов

| Токен | Значение | Alias | Назначение |
|---|---|---|---|
| `stack/gap-tight` | 4 | `spacing/1` | Title ↔ Subtitle, сверхплотная вертикальная связка |
| `stack/gap-default` | 8 | `spacing/2` | Обычный вертикальный стек элементов |
| `stack/gap-loose` | 12 | `spacing/3` | Свободный вертикальный стек |

### `row/*` — горизонтальный ряд элементов

| Токен | Значение | Alias | Назначение |
|---|---|---|---|
| `row/gap-tight` | 4 | `spacing/1` | Сверхплотный горизонтальный ряд (иконка + label) |
| `row/gap-default` | 8 | `spacing/2` | Обычный горизонтальный ряд |
| `row/gap-loose` | 12 | `spacing/3` | Свободный горизонтальный ряд |

### `chip/*` — внутренние отступы chips и подобных pill-элементов

| Токен | Значение | Alias | Назначение |
|---|---|---|---|
| `chip/padding-x` | 8 | `spacing/2` | Горизонтальный padding внутри chip |
| `chip/padding-y` | 4 | `spacing/1` | Вертикальный padding внутри chip |

### `cta/*` — Bottom CTA padding presets

| Токен | Значение | Alias | Назначение |
|---|---|---|---|
| `cta/padding-top-default` | 16 | `spacing/4` | Padding сверху от CTA до контента (Default preset) |
| `cta/padding-bottom-default` | 12 | `spacing/3` | Padding снизу от CTA до края экрана (Default preset) |
| `cta/padding-top-spacious` | 24 | `spacing/6` | Spacious preset top |
| `cta/padding-bottom-spacious` | 32 | `spacing/8` | Spacious preset bottom |
| `cta/padding-compact` | 0 | `spacing/0` | Compact preset (CTA поверх клавиатуры, без воздуха) |

### `list/*` — список

| Токен | Значение | Alias | Назначение |
|---|---|---|---|
| `list/item-gap` | 0 | `spacing/0` | Расстояние между rows внутри списка (вплотную) |

---

## Таблица «значение → возможные семантические роли»

Для маппинга чужих значений (скриншот, foreign Figma) на наши токены:

| Значение | Семантические роли |
|---|---|
| 0 | `list/item-gap`, `cta/padding-compact` |
| 4 | `row/gap-tight`, `stack/gap-tight`, `chip/padding-y` |
| 8 | `section/gap`, `section/title-to-content`, `row/gap-default`, `stack/gap-default`, `chip/padding-x` |
| 12 | `row/gap-loose`, `stack/gap-loose`, `cta/padding-bottom-default` |
| 16 | `screen/padding-horizontal`, `section/padding-default`, `cta/padding-top-default` |
| 20 | ⚠️ нет точного — округлить до 16 или 24 (по контексту) |
| 24 | `section/padding-comfortable`, `cta/padding-top-spacious` |
| 28 | ⚠️ нет точного — обычно 24 |
| 32 | `section/padding-spacious`, `cta/padding-bottom-spacious` |
| 40+ | ⚠️ запрещено в нашей шкале — обычно 32 |

При выборе из нескольких ролей — определять по контексту использования. Если значение не на шкале {0, 4, 8, 12, 16, 24, 32} — это off-scale, требует обсуждения.

---

## Правила использования

1. **Всегда биндить через переменную**, не вписывать число напрямую в padding/gap. В Figma: `frame.setBoundVariable('paddingTop', spacingVar)`.
2. **Имя токена должно совпадать с назначением**. Если ставишь `section/title-to-content` (8) на gap между двумя chips — ты используешь не тот токен. Подбери `row/gap-default` (8) — то же значение, верная семантика.
3. **При появлении новых паттернов** (например, расстояние от Toolbar до контента, padding внутри Toast) — заводить новый семантический токен, не переиспользовать существующий «потому что значение совпадает».
4. **Off-scale значения** (20, 28, 36 и т.п.) — обсуждать. Либо корректировать на шкалу, либо вводить новый primitive в DESIGN-TOKENS.md (требует ревью).

---

## Связанные правила

См. [composition-rules.md](./composition-rules.md) — где и какой semantic-токен применяется (Section header → content, между section card, Bottom CTA preset и т.п.).
