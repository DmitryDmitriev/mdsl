# mdsl audit plan — 2026-08-18

Триаж актуальности всех спек и документации Larixon Mobile DS. Заведён из hub-чата, выполнять в **DS-чате** (`cd ~/Yandex.Disk.localized/_Claude_/ && claude`).

## Контекст

- **56 md-файлов** в `docs/` — 44 компонент-спеки, 4 фундамента (COLOR-PALETTE, DESIGN-TOKENS, TYPOGRAPHY, composition-rules), 8 proposals/patterns/other.
- Проверка разбита на **3 задачи (A / B / C)**. Каждая — отдельный проход. Можно параллелить B и C — они независимы; A завершается первой.

---

## A. Staleness triage — отчёт (2026-08-18)

9 спек не менялись более 3 месяцев. Reconnaissance выполнен Explore-агентом из hub-чата, вердикты:

| Файл | Строк | Вердикт | Что именно | Action |
|---|---|---|---|---|
| `TYPOGRAPHY.md` | 160 | 🟢 актуален | Stable primitive: Inter, шкала размеров, weights 400/500/700, tabular-numerals. Цветов не касается (только ссылка на COLOR-PALETTE.md §8.6). Не зависит от палитровой миграции. | оставить |
| `chat-bubble-spec.md` | 148 | 🟡 нужен апдейт | Токены canonical (`Background/Tinted/*`, `Text&Icon/on Tinted/*`, `Surface/Surface Primary`), явный disclaimer про удаление legacy 2026-05-07 и изоляцию `Decor/Bubble Old/*`. Но: (a) не пересмотрен на предмет `Text&Icon/*applied` архитектуры от 13.08, (b) до сих пор «не реализован как COMPONENT_SET» — open question §10.1 может быть закрыт, (c) Pressed-overlay токен всё ещё TBD. | drift-check в DS-чате |
| `divider-spec.md` | 115 | 🟡 нужен апдейт | Stable primitive (1px LINE, `Border/Default`), но §4 «Цвета» содержит явный placeholder `*(dark mode TBD)*` для Light/Dark столбцов — Dark значение по `Border/Default` давно определено палитрой. Мелкий, но точечный staleness-маркер. | drift-check в DS-чате (доредактировать таблицу) |
| `elevation-spec.md` | 139 | 🟢 актуален | Явно описывает «в Dark тени не применяются», ссылается на `Surface/Surface Primary` Zinc/800 и `Background/Primary/Secondary` Zinc/950/900. Deprecated-стили помечены. История аудита апрель 2026 объясняет 3-токенную модель. | оставить |
| `home-indicator-spec.md` | 97 | 🟢 актуален | Мигрирован в мае 2026 с `Icon Old/Primary` → `Text&Icon/Primary`, hex Zinc/950 / Zinc/50 корректны. Stable primitive (5×72 pill), нечему устаревать. | оставить |
| `progress-spec.md` | 128 | 🟢 актуален | Canonical: `Accent/Primary`, `Background/Tertiary`, `radius/pill/pill`, `spacing/*`, `Platform/Width`. 100% покрытие после 37 правок 11.05. Indeterminate явно вынесен как TODO. | оставить |
| `radio-spec.md` | 135 | 🟢 актуален | Canonical: `Border/Default/Active/Disabled`, `Accent/Primary`. Реструктурирован (Outer Ring + Inner Dot) в мае 2026, семантика ring→Border/dot→Accent корректна. | оставить |
| `switch-spec.md` | 223 | 🟢 актуален | Все 8 вариантов на canonical (`Accent/Primary`, `Background/Primary/Secondary/Tertiary`, `Text&Icon/Tertiary`), Light+Dark hex заполнены. Косметика: parenthetical «(White/Main)» рядом с #FFFFFF — legacy-имя в скобках, не токен. | оставить (косметика опционально) |
| `tabs-spec.md` | 258 | 🟢 актуален | Canonical tokens, `Elevation/Floating` через миграцию 12.05, полная a11y, размерная сетка sm/md/lg. Slot API помечен open beta 2026-04-27 — статус мог измениться, но не блокирует. | оставить |

**Сводка:** 🟢 **7** · 🟡 **2** · 🔴 **0**

**Приоритет действий (staleness):**
1. `divider-spec.md` — 5-минутная правка: заменить `*(dark mode TBD)*` на `Border/Default` для Dark. Убрать единственный явный staleness-маркер.
2. `chat-bubble-spec.md` — обсудить в DS-чате: (a) влияет ли applied-color архитектура на `Text&Icon/on Tinted/*`; (b) закрыть §10.1 open-question про COMPONENT_SET; (c) закрыть Pressed-overlay TBD.

Остальные 7 не редактировались с мая, потому что нечему было устареть: stable primitives (typography, home-indicator, divider-shape) либо синхронно мигрированные в Round 6 (progress, radio, switch, tabs, elevation).

---

## B. Drift check (DS-чат)

**Цель:** сверить каждую спеку в `docs/*.md` с реальным состоянием Figma-компонента в Larixon UI Kit Mobile (`PI2N65xbeJPTc5oWhOP7Bl`). Найти token drift, missing states, устаревшие пропы.

**Инструмент:** skill `component-spec-check` — по одной спеке за проход.

**Промпт для копирования в DS-чат:**

```
Запусти mdsl drift-audit: пройди по всем 44 компонент-спекам в
`~/Yandex.Disk.localized/_Claude_/DSL/docs/*.md`, для каждой запусти skill
`component-spec-check` против её Figma-компонента в UI Kit Mobile (fileKey
`PI2N65xbeJPTc5oWhOP7Bl`).

Порядок обхода — от свежих к стейлым (уже упорядочено в mdsl-audit-plan.md,
секция «B. Порядок обхода»).

Стратегия батчами по 4-5 компонент за раз, чтобы можно было останавливаться и
переключаться. Между батчами — короткий рекап (что нашли, что чинить).

По каждой спеке результат в таблицу:
| Компонент | Вердикт | Ключевой drift | Priority |
|---|---|---|---|

Приоритеты:
- 🔴 blocker — реальный drift, компонент используется, кто-то запутается
- 🟡 нужен апдейт — расхождение зафиксировать в спеке или патч Figma
- 🟢 в порядке

Итоговую сводку сохраняем в `~/Yandex.Disk.localized/_Claude_/DSL/audit-2026-08.md`.
```

### B. Порядок обхода (свежие → стейлые)

**Свежие (12–13 августа) — 15 файлов:**
COLOR-PALETTE, avatar, coach-mark, context-menu, field, input-v2, popover, search, select, textarea, tooltip, list-item, screen-assembly, top-app-bar, README

**Средние (июнь – начало августа) — 19 файлов:**
badge, button, chips, dialog, checkbox, snackbar, sheets, alert, segment-control, empty-state, page-indicator, slider, tab-bar, motion, image, composition-rules, spacing-semantic, skeleton, stories, buttons-stack, section-header, fab-bar, pb-1580-discovery

**Стейлые (май) — 9 файлов (пересекается с A, использовать вердикт A):**
TYPOGRAPHY, chat-bubble, divider, elevation, home-indicator, progress, radio, switch, tabs

---

## C. Orphans & completeness (DS-чат)

**Цель:** найти дыры покрытия — компоненты в Figma без спек в mdsl (и наоборот, спеки без компонентов).

**Промпт для копирования в DS-чат:**

```
Запусти mdsl completeness-audit:

1. Вычитай `docs/*.md` — составь реестр «спеки → имя компонента».
2. Через `use_figma` MCP пройди по страницам UI Kit Mobile
   (fileKey `PI2N65xbeJPTc5oWhOP7Bl`) — собери список published components
   (COMPONENT_SET на страницах atoms/molecules/organisms).
3. Сверь: список компонентов Figma ⇄ реестр спек.
4. Отчёт с двумя списками:
   - **Компоненты в Figma без спек** — что-то есть в UI Kit, спеки нет
     (пример: карточка объявления `vip+Card` — работали 2026-08-18, спеки нет)
   - **Спеки без компонентов** — spec есть, соответствующего Figma-компонента
     нет (устарел / retired / никогда не собран)

Итог сохраняем в `~/Yandex.Disk.localized/_Claude_/DSL/audit-2026-08.md`
(рядом с B).

Заводить новые спеки — уже отдельные тикеты после отчёта, не в этой сессии.
```

### Известные дыры (для затравки)

- **`ad-card-spec.md`** — карточка объявления (VIP+, обычная). Работали 2026-08-18 (адаптация под веб 868). В mdsl нет.
- **Sellers-Cabinets паттерны** — grid карточек, list-row, action-menu. Не описаны.
- Возможно: badge type=Overlay уточнения (padding 8 convention добавлена в SKILL, но в badge-spec ли?)

---

## Приоритет действий (после закрытия A/B/C)

1. По результатам B — сначала 🔴 blockers, потом 🟡 апдейты.
2. По результатам C — завести отдельные тикеты на пропущенные спеки (ad-card, cabinet-patterns).
3. По результатам A — либо оставить стабильные, либо влить их вердикт в B (если B ещё не пройдёт эти файлы).

## Не делать в этой волне

- Переписывать Foundation (COLOR-PALETTE, DESIGN-TOKENS, TYPOGRAPHY) — только фиксировать drift, если обнаружен.
- Обновлять proposals/ — они по природе черновики, актуальность оценивается на этапе принятия решения.
- Переводить mdsl в другой формат / реорганизовывать структуру — только контентная сверка.
