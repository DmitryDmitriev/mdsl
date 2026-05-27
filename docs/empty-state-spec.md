# Empty State — спецификация для разработки

**Один компонент — одна спека.** Empty State — состояние «нет результатов / пусто», с иллюстрацией или иконкой, заголовком, опциональным описанием и опциональными действиями.

Привязка к **docs/COLOR-PALETTE.md**, **docs/TYPOGRAPHY.md**, **docs/DESIGN-TOKENS.md**. Все цвета, размеры, отступы, типографика — только через семантические токены.

Figma: страница **🟢 Empty State** в секции **Организмы** файла UI-Kit-Mobile (`PI2N65xbeJPTc5oWhOP7Bl`). COMPONENT_SET `Empty State` (`7805:74`).

---

## Обзор

Empty State используется когда список / страница / экран **намеренно пустые**: нет результатов поиска, нет избранного, нет уведомлений, нет сообщений и т.п. Не путать с **Error State** — для ошибок (нет сети, 500) используется Dialog или Snackbar c retry-действием.

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Layout** | Inline, Full-screen |

Итого **2 варианта**.

### Boolean properties

| Свойство | Default | Назначение |
|---|---|---|
| **Icon** | true | Показывает icon-в-круге как визуал (Inline). Designer выключает при использовании Illustration |
| **Illustration** | false | Показывает image-иллюстрацию из Assets как визуал. Designer включает вместо Icon |
| **Description** | true | Поясняющий текст под заголовком |
| **Action 1** | false | Primary CTA (например, «Reset filters», «Try again»). Также управляет видимостью контейнера `Actions` целиком |
| **Action 2** | false | Secondary CTA — Ghost-кнопка (например, «Go to homepage»). Доступна **только при включённой Action 1** |

**Convention для Icon vs Illustration:** взаимоисключающие. Designer выключает один и включает другой. Технически могут отображаться одновременно (две видимые сущности в Visual frame перекроют друг друга или выстроятся в HORIZONTAL — нерабочий кейс).

### Instance swap property

| Свойство | Тип | Default | Назначение |
|---|---|---|---|
| **Illustration source** | INSTANCE_SWAP | `WTF?` | Выбор иллюстрации из библиотеки Assets. Preferred values — 12 иллюстраций (Error, Warning, Info, Good, FAQ, Bell, Bell_02, WTF?, Send, Heart, Like, Prize). Дефолтная — `WTF?` (синий вопросительный знак, подходит для no-results) |

Эффективных комбинаций — 6 (на каждый вариант: с/без Description × 0/1/2 actions, где 2 actions = Action 1 + Action 2):
- Description off · 0 actions
- Description off · A1
- Description off · A1 + A2
- Description on  · 0 actions
- Description on  · A1
- Description on  · A1 + A2

**Convention:** Action 2 одна (без Action 1) — невалидный кейс. Если нужна одна кнопка, это всегда primary (Action 1). Если две — primary + secondary. Это типичный паттерн mobile UI: главное действие сверху, опциональное снизу.

### Layout: Inline vs Full-screen

| Inline | Full-screen |
|---|---|
| Компактная иконка-в-круге 96 px + ic_* 32 px | Иллюстрация 140 px из Larixon Assets |
| Hug-контейнер по контенту, центровка по горизонтали | Frame 375 × 600 (масштабируется на высоту экрана) |
| Встраивается в скролл-страницу (между секциями карточки, под результатами поиска) | Занимает весь экран (после Top App Bar) |
| Не несёт «весь экран пустой» — намекает «в этой секции пусто» | Сильное сообщение «здесь нет ничего, начни сначала» |

### Когда использовать что

| Кейс | Layout |
|---|---|
| Поиск без результатов внутри страницы | **Inline** |
| Раздел «нет рекомендаций» внутри карточки | **Inline** |
| Пустая папка избранного / список чатов / уведомления | **Full-screen** |
| Onboarding-like («ты ещё ничего не сохранил») | **Full-screen** |
| Системная ошибка / нет сети | **НЕ Empty State** — использовать Dialog или Snackbar с retry |

---

## Структура слоёв

### Layout=Inline

```
Empty State / Inline (VERTICAL HUG, gap=16, align=CENTER)
├── Visual                          (FIXED 96×96, radius=48, BG Background/Tertiary)
│   ├── Icon (24/ic_* INSTANCE 32×32, fill=Text&Icon/Secondary · visibility = "Icon")
│   └── Illustration (INSTANCE из Assets, 96×96 · visibility = "Illustration", default hidden)
├── Texts                           (VERTICAL HUG, gap=4, align=CENTER)
│   ├── Title       (Heading/H3 Medium 20/28, Text&Icon/Primary, center)
│   └── [Description] (Base/Body 2 14/20, Text&Icon/Secondary, center, max-width 280)
└── [Actions]                        (HORIZONTAL HUG, gap=8 · visibility bound to "Action 1")
    ├── [Action 1]  (Button Primary, Size=48 · visibility = "Action 1")
    └── [Action 2]  (Button Ghost, Size=48 · visibility = "Action 2")
```

### Layout=Full-screen

```
Empty State / Full-screen (FRAME 375×600, auto-layout VERTICAL — для technical sub-children)
└── Center (ABSOLUTE, constraints: H=CENTER, V=CENTER, sizing=HUG×HUG)
    ├── Illustration (INSTANCE из Larixon Assets, 140×140)
    ├── Texts (VERTICAL HUG, gap=8, align=CENTER)
    │   ├── Title       (Heading/H3 Medium 20/28, Text&Icon/Primary, center)
    │   └── [Description] (Base/Body 2 14/20, Text&Icon/Secondary, center, max-width 296)
    └── [Actions] (VERTICAL HUG, gap=8, align=CENTER · visibility bound to "Action 1")
        ├── [Action 1]  (Button Primary, Size=48 · visibility = "Action 1")
        └── [Action 2]  (Button Ghost, Size=48 · visibility = "Action 2")
```

**Важно про схлопывание контейнера `Actions`.** Видимость самого фрейма `Actions` привязана к булевому свойству **«Action 1»** (а не отдельному пропу или OR двух). Это даёт:
- При **Action 1 = false** — весь фрейм скрыт, его место в auto-layout схлопывается, кластер становится короче.
- При **Action 1 = true** — фрейм виден, появляются кнопки. Action 2 показывается дополнительно если включена.

Convention: Action 2 одна (без Action 1) — **невалидный кейс**. Если нужна одна кнопка, это всегда primary. Если две — primary + secondary.

**Ключевое архитектурное решение по Full-screen:**
- Кластер `Center` имеет **HUG-сайзинг по обеим осям** (по реальному содержимому).
- Кластер позиционируется **абсолютно** с constraint `horizontal: CENTER, vertical: CENTER`. Это даёт два важных эффекта:
  1. **Центрирование на экране.** Когда продуктовый дизайнер ресайзит инстанс (например, инстанс Empty State с 600 на 431 — заняв оставшуюся высоту между Top App Bar / Tabs / Tab Bar), кластер пересчитывает Y по центру родителя. Не привязан к фиксированному Y от верха.
  2. **HUG-кластер.** Когда Description / Action 1 / Action 2 выключаются, кластер сужается по высоте, остаётся центрированным.

**Trade-off с toggle:** при переключении пропсов иллюстрация смещается на ~25–80 px вверх или вниз (потому что HUG-кластер меняет высоту, центр кластера остаётся на центре экрана). Это **нормальное поведение iOS-style empty state'ов** — каждое состояние выглядит сбалансированно и центрировано.

**Почему отказались от FIXED-высоты кластера:** фиксированная высота 380 px давала стабильную позицию иллюстрации, но в продуктовых экранах с уменьшенной высотой инстанса (431 px) кластер занимал почти всю доступную область, иллюстрация прижималась к верху и большая пустая область оставалась снизу внутри кластера. HUG решает эту проблему ценой движения иллюстрации при toggle.

---

## Размеры

| Параметр | Inline | Full-screen |
|---|---|---|
| **Visual size** | 96 × 96 (icon-в-круге) | 140 × 140 (3D-иллюстрация) |
| **Icon glyph** | 32 × 32 (внутри круга) | — |
| **Icon-circle radius** | 48 (полный круг) | — |
| **Cluster width** | hug | 296 (по ширине текста) |
| **Cluster height** | hug | hug (по содержимому) |
| **Frame size** | hug | 375 × 600 (минимум; масштабируется на screen) |
| **Padding (frame)** | — | 24 H |
| **Gap visual → texts** | 16 (`spacing/4`) | 24 (`spacing/6`) |
| **Gap title → desc** | 4 | 8 (`spacing/2`) |
| **Gap texts → actions** | 16 (`spacing/4`) | 24 (`spacing/6`) |
| **Gap action 1 → action 2** | 8 (`spacing/2`) | 8 (`spacing/2`) |
| **Description max-width** | 280 | 296 |

Иллюстрация 140 — выбрана после сравнения 160 / 140 / 120: 160 «давит» текст, 120 теряет 3D-присутствие, 140 — золотая середина.

---

## Цвета (по `docs/COLOR-PALETTE.md`)

| Элемент | Токен |
|---|---|
| Frame BG (Full-screen) | `Background/Primary` |
| Visual circle BG (Inline) | `Background/Tertiary` |
| Icon glyph (Inline) | `Text&Icon/Secondary` |
| Title | `Text&Icon/Primary` |
| Description | `Text&Icon/Secondary` |
| Button Action 1 | Component instance `Button Primary` |
| Button Action 2 | Component instance `Button Ghost` |

Иллюстрации в Full-screen — **3D-ассеты из Larixon Assets** (fileKey `iRb5cHw514oCpucz44gjGv`). Цветами не управляются токенами палитры (это растровые/изобразительные ассеты с собственным окрасом). Дефолт — `WTF?` (синий вопросительный знак). Designer может swap'нуть на любую другую через Swap Instance.

### Доступные иллюстрации в Assets

| Имя | Когда применять |
|---|---|
| **WTF?** (дефолт) | Поиск без результатов, общая «пустота» |
| **FAQ** | Нет вопросов / ответов |
| **Send** | Нет сообщений / чатов |
| **Bell**, **Bell_02** | Нет уведомлений |
| **Heart**, **Like** | Пустое избранное / лайки |
| **Prize** | Нет достижений / наград |
| **Good** | После успешного действия (но обычно — Snackbar) |
| **Error** | Не для Empty State (использовать Dialog) |
| **Warning**, **Info** | Не для Empty State (использовать Alert) |

---

## Типографика

| Слот | Стиль | Размер |
|---|---|---|
| Title | `Heading/H3 Medium` | 20 / 28 |
| Description | `Base/Body 2` | 14 / 20 |

Оба текста — `textAlignHorizontal: CENTER`. Description обёрнут на `max-width: 280` (Inline) / `296` (Full-screen) — переносится на 2–3 строки.

---

## Сводная таблица токенов

| Параметр | Inline | Full-screen |
|---|---|---|
| Frame BG | — | `Background/Primary` |
| Circle BG | `Background/Tertiary` | — |
| Title color | `Text&Icon/Primary` | `Text&Icon/Primary` |
| Desc color | `Text&Icon/Secondary` | `Text&Icon/Secondary` |
| Icon color | `Text&Icon/Secondary` | (illustration native) |
| Gap visual→text | `spacing/4` (16) | `spacing/6` (24) |
| Gap title→desc | 4 (off-scale) | `spacing/2` (8) |
| Gap text→actions | `spacing/4` (16) | `spacing/6` (24) |
| Gap btn 1→btn 2 | `spacing/2` (8) | `spacing/2` (8) |
| Title font | `Heading/H3 Medium` | `Heading/H3 Medium` |
| Desc font | `Base/Body 2` | `Base/Body 2` |

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color | **100%** (структурные элементы, иллюстрация — из Assets) |
| 🔤 Typography | **100%** |
| 🔲 Spacing | **100%** (одно значение 4 — off-scale gap title→desc для Inline, design constant) |
| 🖼 Visual | Иллюстрации — Larixon Assets, не часть палитры (намеренно) |
| **Overall** | **100%** |

Off-scale значения (по правилу `DESIGN-TOKENS.md` §11):
- Gap 4 для Inline title→desc — компактнее 8 spacing/2, не нашлось семантического смысла вводить отдельный токен.
- Frame size 375 × 600 — превью-размер. В продакшене инстанс ресайзится под доступную высоту (например, 431 / 480 / 800 px между Top App Bar и Tab Bar). Кластер автоматически центрируется внутри.

---

## Доступность (a11y)

- **Семантика.** Корневой контейнер — `role="status"` с `aria-live="polite"`, чтобы скринридер сообщил о пустом состоянии. Title — `<h1>` (Full-screen) или `<h2>` (Inline) внутри страницы.
- **Иллюстрация / иконка.** Декоративная — `aria-hidden="true"`, чтобы не зачитывалась.
- **Action buttons.** Стандартные `<button>` с понятными лейблами («Reset filters», не «Click here»).
- **Контраст.** `Text&Icon/Primary` на `Background/Primary` — WCAG AA в обеих темах. `Text&Icon/Secondary` на `Background/Primary` для Description — также AA.
- **Tap target actions.** Buttons Size=48 → ≥ 44 pt (WCAG/HIG).

---

## Синхронизация с кодом

**Web (React):**
```tsx
<EmptyState
  layout="full-screen"          // "inline" | "full-screen"
  illustration={<WtfIllustration />}  // Inline: <Icon name="search-off" />
  title="Nothing found"
  description="Try changing your keywords or broadening your search criteria"
  actions={[
    { label: "Reset filters", onClick: resetFilters, variant: "primary" },
    { label: "Go to homepage", onClick: goHome, variant: "ghost" },
  ]}
/>
```

CSS-переменные:
```css
--empty-state-cluster-height-fullscreen: 380px;
--empty-state-cluster-width-fullscreen:  296px;
--empty-state-illustration-size:         140px;
--empty-state-circle-size-inline:        96px;
--empty-state-icon-glyph-inline:         32px;
--empty-state-padding-h:                 var(--spacing-6);  /* 24 */
--empty-state-gap-visual-text:           var(--spacing-6);  /* 24 */
--empty-state-gap-title-desc:            var(--spacing-2);  /* 8  */
--empty-state-gap-text-actions:          var(--spacing-6);  /* 24 */
```

В мобильной верстке Full-screen занимает всю доступную высоту между Top App Bar и (если есть) Tab Bar / FAB; кластер центрируется в этой области.

---

## Связанные документы

- [button-spec.md](./button-spec.md) — Button Primary / Ghost для Action 1 / Action 2
- [dialog-spec.md](./dialog-spec.md) — для error-состояний и подтверждений
- [TYPOGRAPHY.md](./TYPOGRAPHY.md) §3 (Heading/H3), §4 (Base/Body 2)
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — `Background/Primary`, `Background/Tertiary`, `Text&Icon/Primary`/`/Secondary`
- [reference_larixon_libraries.md](~/.claude/projects/-Users-partyzan-Yandex-Disk-localized--Claude-/memory/reference_larixon_libraries.md) — Assets-файл с 3D-иллюстрациями

---

## Открытые вопросы

1. **Empty State для Dark theme** — иллюстрации из Assets с собственным окрасом, в Dark выглядят так же как в Light. Если визуальная команда захочет адаптации — создавать парные dark-версии иллюстраций в Assets.
2. **Inline icon mapping** — дефолт `ic_close`, но семантически для no-results лучше `ic_search_off` (если такая иконка есть в библиотеке). Designer может swap'нуть.
3. **Pressed/Hover overlay** — пока нет; если введём общий overlay-токен, action buttons его подхватят автоматически.

---

## История миграций

**2026-05-27 — Inline получил Image-вариант visual'а через boolean Icon/Illustration.**

До этого Inline жёстко был «иконка-в-круге» (96 кружок + 32 icon), а Image-иллюстрации были доступны только в Layout=Full-screen. Продуктовая задача показала кейс: хочется в inline-контексте (между секциями скролла) использовать ту же иллюстрацию из Larixon Assets, что и в Full-screen, но компактнее.

Решение — **не вводить Size axis** (как изначально хотелось), а добавить в Visual frame Inline'а **второй ребёнок Illustration** (96×96, INSTANCE из Assets, default hidden) и завести два booleans:
- `Icon` (default true) — bound к Icon.visible
- `Illustration` (default false) — bound к Illustration.visible

Designer toggle'ит: выключает Icon, включает Illustration. Свапает на нужную через свойство `Illustration source` (INSTANCE_SWAP, preferred values = 12 иллюстраций из Assets).

Trade-off: Icon и Illustration технически могут отображаться одновременно (нерабочий кейс — выстроятся в HORIZONTAL layout родительского Visual frame). Convention в спеке. Альтернатива — Visual VARIANT axis — отвергнута: компонент уже имеет Layout axis и три boolean, добавлять второй axis ради взаимоисключения — оверкилл.

Full-screen — не тронут: там Illustration уже была дефолтной, Icon-варианта не требуется.

**2026-05-12 — аудит готовности (component-spec-check), 100% соответствие, 0 правок.**

Второй чистый компонент за сессию (после Input v2). Проверено ~22 параметра на 4 представительных вариантах (2 master + 2 с Actions): структура (`Layout=Inline/Full-screen` + 3 boolean), все размеры (visual 96/140, gaps `spacing/4` / `spacing/6` / `spacing/2`), цвета (`Background/Primary`, `Background/Tertiary`, `Text&Icon/Primary`/`/Secondary`, `Accent/Primary`, `Text&Icon/Inverted W-B`), типографика (`Heading/H3 Medium`, `Base/Body 2`, `Base/Body 2 Medium`), action buttons (Button Primary + Ghost Size=48 на `control-height/md` + `radius/control/control-lg`).

**Hardcoded:** 0. **Missing states:** 0. **M3-leftover'ов:** 0.

**Foundation-bypass:** Empty State **не затронут** open-task'ом `Fonts/line-hright/*` (typo в lh-токенах), потому что использует `Heading/H3 Medium` и `Base/Body 2` — это lh-токены без опечатки (`line-height/lg|sm`). Typo живёт в `line-hright/md|lg|xxxs`, затрагивая `Heading/H*` Bold/Semi-Bold, `Base/Body 1*`, `Caption/caption-sm Medium` — но не текущую палитру Empty State.

**Не блокирующие наблюдения:**
- Demo-скриншоты в секции `Empty States` (`7827:2215`) используют `⚠️ DEPRECATED / Top app bar` вместо нового Top App Bar v2. Иллюстративные превью, не сам компонент — обновить при следующей итерации demo-страницы.
- `Accent/Primary` = Zinc/950 (established canonical) — Action 1 кнопка тёмно-серая, не brand-red. См. `COLOR-PALETTE.md §3.5 + §3.7`.

Empty State → ✅ готов к разработке.
