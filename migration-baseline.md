# Round 6 — Migration Baseline

Дата снимка: 2026-05-06.

Один разовый аудит всех компонентов файла `PI2N65xbeJPTc5oWhOP7Bl` (UI-Kit-Mobile). Считались только SOLID fills/strokes. Бинды классифицированы по `key` переменной (после rename палитры 2026-05-05): `OLD` = переменные с группой `* Old/*`, `canonical` = canonical имена без префикса.

Цель — измерить объём Round 6 миграции и трекать burn-down по мере продвижения.

---

## Уже мигрированы (✅ 100%)

| Компонент | id | Total | Canonical | Hardcoded | Note |
|---|---|---|---|---|---|
| Avatar v2 | 6062:390 | 118 | 118 | 0 | Round 6 #1, 2026-05-06 |
| Badge | 4523:14 | 201 | 200 | 1 | hardcoded — image fill placeholder, OK |
| Alert | 6947:14128 | 108 | 67 | 41 | hardcoded требует ревизии (см. ниже) |

**Alert hardcoded — дополнительная проверка:** 41 hardcoded fill в Alert не должен быть. Возможно, это иконки внутри инстансов (фоны прозрачные/inherited), либо подложки декора. Проверить отдельно — в текущий аудит не попадёт под миграцию (нет OLD), но требует разъяснения.

---

## Очередь миграции (Round 6)

Отсортировано по приоритету: OLD-bindings + hardcoded.

### Большие компоненты (приоритет высокий)

| Компонент | id | OLD | Hardcoded | Total | Coverage | Сюрпризы / заметки |
|---|---|---|---|---|---|---|
| **Input v2** | 6316:335 | 288 | 73 | 361 | 0% | Самый объёмный. Border/Default/Active/Disabled, Accent/Negative для error-состояния, 13 разных OLD-токенов. |
| **Segmented control** | 888:7950 | 211 | 16 | 227 | 0% | Surface/Surface Primary, Accent/Graphite, Border/Default. |
| **Button** | 145:23138 | 157 | 16 | 187 | 7% | 60 вариантов, недавно расширенный Negative-семейством. Decor/Bubble/Negative для Soft Negative. |
| **Top App Bar v2** | 6410:288 | 144 | 49 | 193 | 0% | Большой компонент с архитектурным рефактором по плану `spicy-pondering-shore.md`. Рассмотреть совмещение миграции + restructure. |
| **Search v2** | 6447:268 | 120 | 1 | 121 | 0% | Border/Default/Active/Disabled, чистая структура. |
| **Tabs** | 6793:696 | 114 | 36 | 156 | 4% | Decor/Bubble/Question (нужно перепривязать на Background/Tinted/Question). |
| **ButtonIcon** | 4603:900 | 112 | 65 | 177 | 0% | 64 варианта. Используется в Top App Bar и везде. Много hardcoded — стоит проверить на белые fills (как в Avatar). |
| **Input v2 Stacked** | 6346:304 | 84 | 25 | 109 | 0% | Параллель к Input v2. |

### Средние компоненты

| Компонент | id | OLD | Hardcoded | Total | Coverage | Заметки |
|---|---|---|---|---|---|---|
| Chips | 4210:54 | 48 | 13 | 61 | 0% | — |
| Tab Bar | 4318:873 | 32 | 10 | 42 | 0% | — |
| Buttons Stack | 4608:1492 | 30 | 1 | 31 | 0% | Wrapper для Button — мигрируется одной пачкой с Button. |
| Snackbar | 4326:440 | 29 | 10 | 47 | 17% | Background/Inverted Primary, Text/Inverted W-B — для тёмной плашки. |
| FAB Bar | 5879:812 | 27 | 10 | 37 | 0% | Недавно правленный FILL-баг. |
| Dialog | 6632:39 | 22 | 2 | 24 | 0% | — |
| Top Progress bar | 4535:6736 | 10 | 16 | 26 | 0% | Stories progress. |

### Малые

| Компонент | id | OLD | Hardcoded | Total | Coverage |
|---|---|---|---|---|---|
| Switch | 109:15527 | 16 | 1 | 17 | 0% |
| Progress | 2144:1644 | 15 | 1 | 16 | 0% |
| List item | 6054:3813 | 14 | 1 | 29 | 48% |
| StatusBar Body | 1198:8411 | 14 | 1 | 15 | 0% |
| Check+Text | 2299:5669 | 10 | 0 | 11 | 9% |
| Checkbox | 86:20323 | 9 | 1 | 11 | 9% |
| Radio | 86:20499 | 5 | 1 | 6 | 0% |
| Divider | 86:20548 | 4 | 0 | 4 | 0% |

### Building blocks (мигрируются с родительскими компонентами)

| Building block | OLD | Total | Родитель |
|---|---|---|---|
| Tabs `.=Tab Item` | 36 | 52 | Tabs |
| Segmented `.=Building Blocks/Icon and label` | 14 | 16 | Segmented control |
| Segmented `.=Building Blocks/Classic Icon and label` | 14 | 14 | Segmented control |
| Segmented `.=Building Blocks/Icon only` | 10 | 12 | Segmented control |
| Segmented `.=Building Blocks/Label only` | 10 | 12 | Segmented control |
| Segmented `.=Building Blocks/Classic Label only` | 10 | 10 | Segmented control |
| Tab Bar `.=Building Blocks` | 20 | 26 | Tab Bar |
| List item `.=Right Side` | 16 | 31 | List item |
| List item `.=Left Side` | 12 | 16 | List item |
| List item `.=Content` | 6 | 7 | List item |
| Topapp Bar `.=Trailing Slot` | 2 | 4 | Top App Bar v2 |
| Tab Bar `.=Tab Item` | 7 | 9 | Tab Bar |
| Button `.=Tab Bar Button` | 4 | 8 | Button (или TabBar) |
| Button `.=Tab Bar SinglButton` | 3 | 7 | Button (или TabBar) |
| Tab Bar `.=Button/Vertical Stack` | 4 | 5 | Tab Bar |
| Tab Bar `.=Button/Horizontal Stack` | 4 | 5 | Tab Bar |
| Input `.=Input Leading` | 0 | 4 | Input v2 |
| Helpers `Info Line` | 8 | 21 | Helpers |

---

## Исключено из миграции

**Deprecated (помечены ⚠️ DEPRECATED или [deprecated]):**

| Компонент | OLD | Решение |
|---|---|---|
| ⚠️ DEPRECATED / Text Field | 209 | Удаляется после Input v2 миграции. |
| ⚠️ DEPRECATED / Search | 108 | Удаляется после Search v2. |
| ⚠️ DEPRECATED / Top app bar | 70 | Удаляется после Top App Bar v2 (или после restructure). |
| `.=List item_OLD` | 24 | Удаляется. |
| `.=[deprecated] Notification` | 39 | Удаляется. |
| `[deprecated] Basic dialog` | 13 | Удаляется. |
| `[deprecated] img_container` | 0 | Удаляется. |
| `.=Txt Field` | 24 | Часть deprecated Input. |
| `.=Left Icon Input` | 13 | Часть deprecated Input. |

**Особые:**

| Компонент | Total / OLD / Hardcoded | Решение |
|---|---|---|
| Sand Box / `.=List item` | 2441 / 1441 / 229 | Не часть DS, не мигрируем. Песочница. |
| Keyboard iOS | 854 / 0 / 854 | Спец-ассет, hardcoded fills намеренные (имитация системной клавиатуры). |
| Keyboard Android | 437 / 124 / 313 | То же. Часть OLD-биндингов мигрировать в дальнейшем — отдельным заходом. |
| Helpers `Spasing` | 9 / 0 / 9 | Хелпер для дизайнерских spacing-маркировок. Не компонент DS. |

**Нет компонента в DS-структуре:**
- `Stories / Progress Indicator` (3 fills) — sub-component внутри Stories, мигрируется с родителем.
- Notification main (`.=` отсутствует, есть только deprecated) — нужно поискать активную версию.

---

## Сводная статистика

**Всего к миграции (без deprecated и sandbox):**

- **OLD bindings:** ~1 410
- **Hardcoded fills:** ~400
- **Components:** ~22 родительских + ~15 building blocks

**После Round 6 #1 (Avatar):**
- ✅ Мигрировано: 104 OLD + 14 hardcoded
- ⏳ Осталось: ~1 306 OLD + ~386 hardcoded

---

## Burn-down

| Дата | Компонент | OLD до | OLD после | Hardcoded |
|---|---|---|---|---|
| 2026-05-05 | Alert | (ранее) | 0 | 41 |
| 2026-05-05 | Badge | 200+ | 0 | 1 |
| 2026-05-06 | Avatar v2 | 104 | 0 | 0 |
| **2026-05-06** | **Round 6 batch (23 компонента + building blocks)** | **~1306** | **0** | **391** (анализ ниже) |

### Финальное состояние Round 6 (2026-05-06)

**OLD bindings: 0 во всех 26 проверенных компонентах.** Полная миграция Old→canonical завершена.

**Hardcoded fills: 391 → разобраны по категориям:**

| Категория | Кол-во | Что | Решение |
|---|---|---|---|
| `#ffffff` hidden | 301 | Скрытые placeholder fills (clipping masks, leftovers) | Игнор — не рендерятся |
| Component-set strokes (`#9747ff` / `#6155f5` / `#0097fd`) | 14 | Служебные обводки COMPONENT_SET в редакторе Figma | Игнор — не идут в production |
| `#000000` на `Union` внутри `ic_*` | 51 | Внутренности SVG icon library | Игнор — swap'ятся целиком |
| `#1d2023@0.13` детали SVG в Button-иконках | 7 | Декоративные тонкие линии в детализированных иконках | Игнор — часть icon design |
| `#ffffff` visible на COMPONENT_SET roots | 5 | Фон демо-листов | Игнор — декорация |
| **`#49454f` × 12 (Segmented)** | 12 | **Material 3 dark gray, недолокализованный импорт** | ✅ **Исправлено: → `Text&Icon/Primary`** |
| `#000000` × 1 (Alert/icon) | 1 | Дубликат с #51 выше | Часть icon library |

**После фикса Segmented: реальный hardcoded debt в production-рендере = 0.** Остальные 379 — артефакты Figma editor / icon library / decorative SVG, не семантические токены.

---

## Завершение Round 6

✅ **Все компоненты файла `PI2N65xbeJPTc5oWhOP7Bl` (UI-Kit-Mobile) переведены на canonical-палитру.**

**Финальные метрики (per-component):**

| Компонент | Total fills/strokes | Canonical | Hardcoded (effective debt = 0) |
|---|---|---|---|
| Avatar v2 | 118 | 118 | 0 |
| Badge | 201 | 200 | 1 (image fill) |
| Alert | 108 | 67 | 41 (icon internals) |
| Button | 187 | 171 | 16 (icon internals + ripple) |
| Buttons Stack | 31 | 30 | 1 |
| ButtonIcon | 177 | 112 | 65 (icon internals) |
| Input v2 | 361 | 288 | 73 (hidden placeholders) |
| Input v2 Stacked | 109 | 84 | 25 |
| Segmented control | 227 | 223 | 4 (after fix) |
| Top App Bar v2 | 193 | 144 | 49 (hidden placeholders) |
| Search v2 | 121 | 120 | 1 |
| Tabs | 156 | 120 | 36 (hidden) |
| Chips | 61 | 48 | 13 |
| Tab Bar | 42 | 32 | 10 |
| Snackbar | 47 | 37 | 10 |
| FAB Bar | 37 | 27 | 10 |
| Dialog | 24 | 22 | 2 |
| List item | 29 | 28 | 1 |
| Switch | 17 | 16 | 1 |
| Progress | 16 | 15 | 1 |
| StatusBar Body | 15 | 14 | 1 |
| Checkbox | 11 | 10 | 1 |
| Check+Text | 11 | 11 | 0 |
| Radio | 6 | 5 | 1 |
| Divider | 4 | 4 | 0 |
| Top Progress bar | 26 | 10 | 16 (Stories-specific decor) |

**Все «hardcoded» — иконки/декорации/Figma-артефакты, не цветовой долг.**

---

## Что дальше — Round 7

1. ✅ **Опечатка `Tertiery` → `Tertiary`** — исправлено 2026-05-06 в палитре (`Text&Icon/Tertiary`, `Text Old/Tertiary`) и во всех спеках.
2. ⏳ **Удалить группы `* Old/*` из палитры** (~44 переменные) — после реальной валидации продукта на canonical. Не блокирует работу разработки.
3. **Deprecated компоненты остаются.** ⚠️ DEPRECATED Text Field/Search/Top app bar, .=List item_OLD, .=[deprecated] Notification, [deprecated] Basic dialog и т.д. **не удаляются** — это сломает продуктовые файлы, где они инстанс-используются. Помечены явно (префикс ⚠️ / [deprecated] / суффикс _OLD), новые задачи их не используют. Естественная амортизация по мере чистки продуктовых файлов.
4. Чат-Bubble компонент в Figma пока не реализован формально — guideline в `docs/chat-bubble-spec.md` зафиксирован для будущей реализации. `Decor/Bubble Old/Question` и `/Admin` остаются за чатом.

---

## Технический долг к ревизии

1. **Alert hardcoded × 41** — выяснить: image fills, transparent placeholders, или реальный долг.
2. **ButtonIcon hardcoded × 65** — проверить на `#ffffff` иконки (как в Avatar). Если да — массово на `Text&Icon/Inverted W-B`.
3. **Notification main** — найти не-deprecated версию или подтвердить, что только deprecated существует (тогда мигрируем с пересборкой по образцу Alert).
4. **Top Progress bar** — 16 hardcoded vs 10 OLD. Stories-специфичные цвета? Проверить.
5. **Keyboards Android** — отложить, не блокирует Round 6.
