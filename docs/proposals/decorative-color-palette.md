# Decorative Color Palette

**Статус:** ⚠️ **Phase 1a RATIFIED 2026-05-25 (только primitives).** Hex-значения подтверждены как Tailwind v3. В палитре заведены: Purple, Pink, Cyan, Teal, Indigo полные шкалы + дополнения Orange. Финальная часть spec'а — [COLOR-PALETTE.md §1.6](../COLOR-PALETTE.md#16-цветные-шкалы-50950).

**Phase 1b (semantic Decor tokens `Background/Decor/*`, `Text&Icon/on Decor/*`) — НЕ ratified.** Решение пользователя 2026-05-25: «это ситуативные решения, когда они станут паттерновые, тогда и заведём». До этого пользоваться primitives напрямую. См. [COLOR-PALETTE.md §2.10](../COLOR-PALETTE.md) — статус «в тестах».

**Правило `Decor vs Semantic` (§3.8) — НЕ ratified.** Решение пользователя 2026-05-25: «сейчас идут тесты, нельзя привязывать». В spec оставлен только anchor-раздел с текущей мыслью; жёсткие анти-паттерны и mapping'и — не зафиксированы.

**Phase 2 (компоненты)** — будет позже, когда semantic mapping устаканится.

⚠️ **Figma library** — primitives будут заведены отдельным шагом (после согласования стратегии публикации; см. вопрос в чате).

Этот документ оставлен как trail исходного предложения. Текущая версия decor — см. [COLOR-PALETTE.md §1.6, §2.10, §3.8](../COLOR-PALETTE.md).

**Контекст:** текущая палитра — функционально-семантическая (good/info/warning/negative/neutral). Для marketing/promo/decorative-меток (VIP, Hot, New, Most viewed, Featured, Sale) её не хватает — нет нейтрально-декоративных оттенков. Дизайнеры либо хакают семантические токены (VIP красят в `warning` «потому что жёлтый» — ломая семантику для разработки), либо хардкодят hex.

---

## Принцип

Палитра расщепляется на **два слоя**:

| Слой | Назначение | Примеры |
|---|---|---|
| **Semantic** *(существующий)* | Функциональное состояние системы/элемента | `good`, `info`, `warning`, `negative`, `neutral` |
| **Decor** *(новый)* | Категоризация/маркетинговое выделение, без функционального смысла | `Purple`, `Pink`, `Orange`, `Cyan`, `Teal`, `Indigo` |

**Решающий вопрос для дизайнера** при выборе цвета бейджа/чипа/баннера:

> «Этот цвет несёт информацию о состоянии системы или элемента?»
> - **Да** → semantic palette (`good`/`info`/`warning`/`negative`/`neutral`)
> - **Нет, это marketing-label / категория / "выделить"** → decor palette

Если semantic используется для не-семантики — это **нарушение DS** (как сейчас «VIP = warning»).

---

## Стартовый набор: 6 цветов

| Decor | Hue | Стартовые use cases (примеры) | Зачем именно этот тон |
|---|---|---|---|
| **Purple** | violet 270° | VIP, Premium, Featured | Цвет премиальности (классика luxury-брендинга). Не пересекается с semantic. |
| **Pink** | magenta 330° | Promo, Special offer | Тёплый, привлекающий, но не «red=error» |
| **Orange** | orange 25° | Hot, Trending, Sale | Энергия/срочность. Дальше по оттенку от `warning` (amber 35°), не путается |
| **Cyan** | cyan 190° | New, Just added, Fresh | Свежесть, прохлада. Дальше по оттенку от `info` (blue 220°) |
| **Teal** | teal 170° | Verified, Trusted, Eco | Спокойный, доверительный. Не green (=success) и не blue |
| **Indigo** | indigo 240° | Sponsored, Partner | Серьёзный premium-альтернатив, между purple и blue |

Все шесть — **визуально различимы между собой и с semantic-цветами**. Покрывают типичный набор marketing/category-меток в classifieds.

**Расширение в будущем:** если понадобится 7-й/8-й/N-й — добавляем по запросу с обоснованием. Кандидаты второй очереди: `Lime` (energetic), `Fuchsia` (very vivid promo), `Rose` (soft warm), `Yellow` (attention без warning-семантики).

---

## Тонировка (light/dark) — повторяет паттерн semantic Tinted

Для каждого decor-цвета — пара токенов поверхности и текста, как в [COLOR-PALETTE.md §2.2 / §2.8](../COLOR-PALETTE.md):

```
Background/Decor/{Color}        — пастельная плашка
Text&Icon/on Decor/{Color}      — тёмный/светлый текст с контрастом 6:1+ на плашке
```

| Токен | Light (50-shade) | Dark (900-shade) | Назначение |
|---|---|---|---|
| `Background/Decor/Purple` | Purple/50 | Purple/900 | tinted bg для Purple decor |
| `Background/Decor/Pink` | Pink/50 | Pink/900 | tinted bg для Pink |
| `Background/Decor/Orange` | Orange/50 | Orange/900 | (Orange/50 уже есть в палитре, переиспользуем) |
| `Background/Decor/Cyan` | Cyan/50 | Cyan/900 | |
| `Background/Decor/Teal` | Teal/50 | Teal/900 | |
| `Background/Decor/Indigo` | Indigo/50 | Indigo/900 | |
| `Text&Icon/on Decor/Purple` | Purple/700 | Purple/50 | тёмный shade — обеспечивает 6:1+ контраст на пастели |
| `Text&Icon/on Decor/Pink` | Pink/700 | Pink/50 | |
| `Text&Icon/on Decor/Orange` | Orange/700 | Orange/50 | |
| `Text&Icon/on Decor/Cyan` | Cyan/700 | Cyan/50 | |
| `Text&Icon/on Decor/Teal` | Teal/700 | Teal/50 | |
| `Text&Icon/on Decor/Indigo` | Indigo/700 | Indigo/50 | |

**Принцип симметрии Light ↔ Dark** соблюдён — тот же подход, что для semantic Tinted (см. COLOR-PALETTE.md §2.2 «принцип симметрии»).

**Outline-вариант** (на случай выноса Decor в Badge — см. ниже) не вводит новых токенов: border берёт `Text&Icon/on Decor/{Color}`, как для semantic Outline ([badge-spec.md §2 после правки 2026-05-25](../badge-spec.md#2-токены)).

---

## Что нужно добавить в палитру (Phase 1)

### 1.6 Primitives — добавить шкалы

| Color | 50 | 100 | 400 | 500 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|
| **Purple** | #FAF5FF | #F3E8FF | #C084FC | #A855F7 | #7E22CE | #6B21A8 | #581C87 |
| **Pink** | #FDF2F8 | #FCE7F3 | #F472B6 | #EC4899 | #BE185D | #9D174D | #831843 |
| **Cyan** | #ECFEFF | #CFFAFE | #22D3EE | #06B6D4 | #0E7490 | #155E75 | #164E63 |
| **Teal** | #F0FDFA | #CCFBF1 | #2DD4BF | #14B8A6 | #0F766E | #115E59 | #134E4A |
| **Indigo** | #EEF2FF | #E0E7FF | #818CF8 | #6366F1 | #4F46E5 | #3730A3 | #312E81 |

(Orange уже есть, добавляем недостающие shade'ы — `Orange/100`, `Orange/700`, `Orange/900` если нужны.)

Источник: Tailwind CSS v3 palette (de-facto industry baseline, прошёл миллионы accessibility-проверок). Можем заменить на свои хеши если есть brand-причины.

### 2.X Semantic Decor — добавить раздел

Новый раздел `2.10 Decor` в COLOR-PALETTE.md (после §2.9 Brand Color):

```markdown
### 2.10 Decor
Decorative-палитра для marketing/category-меток. См. §3.X «Decor vs Semantic».

| Роль | Light | Dark |
|------|-------|------|
| Background/Decor/Purple | Purple/50 | Purple/900 |
| Background/Decor/Pink   | Pink/50   | Pink/900   |
| Background/Decor/Orange | Orange/50 | Orange/900 |
| Background/Decor/Cyan   | Cyan/50   | Cyan/900   |
| Background/Decor/Teal   | Teal/50   | Teal/900   |
| Background/Decor/Indigo | Indigo/50 | Indigo/900 |
| Text&Icon/on Decor/{Color} | Color/700 | Color/50 |
```

### 3.X Правила применения — добавить раздел

Новый раздел в §3 «Правила применения» — `Decor vs Semantic`:

```markdown
### 3.X Decor vs Semantic
- **Semantic** (`good`/`info`/`warning`/`negative`/`neutral`) — функциональный смысл, состояние системы/элемента. В коде через семантические роли.
- **Decor** (`Purple`/`Pink`/`Orange`/`Cyan`/`Teal`/`Indigo`) — нейтральные оттенки для категоризации/маркетинга, без функционального смысла. В коде через явный выбор «вот этот цвет».

**Правило выбора** см. в proposal этого decor-палитры.

❌ Не использовать `warning` для VIP/Premium-меток. Это marketing-label, не системное warning.
❌ Не использовать `negative` для Hot/Sale. Это promo, не error.
✅ Для VIP/Premium → `Decor/Purple` (или другой по выбору).
```

---

## Что НЕ входит в Phase 1

- **Border/Decor/*** — не вводим. Outline-вариант компонентов (Badge, Chips и т.п.) использует `Text&Icon/on Decor/{Color}` как border (тот же подход, что для semantic после 2026-05-25). Меньше токенов в палитре.
- **Accent/Decor/*** — не вводим. Decor-цвета НЕ применяются как кнопочные акценты (для этого есть Brand-цвета и semantic `Accent/*`).
- **Применение в компонентах** — отдельный шаг (Phase 2+). Сначала Badge получит Decor-type'ы, потом Chips, потом Alerts. По мере задач.

---

## Workflow (как раскатываем)

| Phase | Что делаем | Когда |
|---|---|---|
| **1. Палитра** | Ввести primitives + semantic Decor + правила применения в `COLOR-PALETTE.md`. В Figma — заверстать в коллекцию переменных. | После апрува этого proposal'а |
| **2. Badge** | Добавить 6 новых Type variants в Badge (decor-purple, ...). Финальная матрица: (5 semantic + 6 decor) × 6 size × 2 shape × 2 fill = **264** | Отдельный proposal `badge-decor-types.md` |
| **3. Chips** | По аналогии — добавить Decor type'ы в Chips | По задаче |
| **4. Alerts / Banners** | По аналогии — там где имеет смысл (Sale-banner, Hot-deal alert) | По задаче |

---

## Что нужно от разработки

1. Подтвердить: decorative-палитра как отдельный слой токенов — приемлемо со стороны имплементации.
2. На Compose/SwiftUI — как ожидаемо выглядит API? `Badge(type: BadgeType.Decor.Purple)` vs `Badge(decor: DecorColor.Purple)` vs hybrid (`Badge(type: ...)` с union типом).
3. **Open:** оставить hex-значения как в Tailwind v3 (быстро, стандарт) или подобрать собственные с учётом brand-aesthetics? Если второе — нужен дизайн-ресёрч (1-2 дня), не блокирующий.

---

## Открытые вопросы перед утверждением

- **Стартовый список:** 6 цветов из таблицы — устраивает или хочется другую комбинацию?
- **Hex-значения:** Tailwind v3 или подбираем свои?
- **Brand-цвета и Decor** — Bazaraki/Somon/PinTT/Unegui уже определены как brand-палитра (см. COLOR-PALETTE §1.7). Какое отношение между brand-цветами и decor? Можно ли использовать `Brand/Somon` (синий) в качестве decor-выделения для несвязанных с брендом меток? **Моё мнение:** нельзя смешивать. Brand остаётся брендом. Decor — отдельный слой.

---

## Прототип

Пока не собран. После апрува — заверстаю в Figma в коллекцию переменных, добавлю demo-кадр с цветами на типичных бейджах.

## Связано

- [COLOR-PALETTE.md](../COLOR-PALETTE.md) — текущая палитра, куда вносим Decor
- [badge-spec.md](../badge-spec.md) — первый компонент, который получит Decor types в Phase 2
- Tailwind CSS v3 palette: <https://tailwindcss.com/docs/customizing-colors>
