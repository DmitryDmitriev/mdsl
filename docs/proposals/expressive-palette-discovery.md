# Expressive / Decorative Palette — Discovery

**Статус:** discovery (инвентарь + оценка scope + каркас подходов). **НЕ дизайн палитры.** Уровень решения — structural (Round 6), если примут.
**Дата:** 2026-07-28

---

## 1. Проблема (постановка Дмитрия)

Canonical-палитра (`Text&Icon/*`, `Background/*`, `Border/*`, `Accent/*`, `Background/Tinted/*`) построена **функционально — под controls**. В controls она отлично работает в обеих темах. Но в **декоративных контекстах** (tier-бейджи VIP/TOP, градиенты, illustration/hero-accents, category-hues) в **тёмной теме** цвета становятся грязными/тусклыми/выпадают из mood. В светлой — ок.

---

## 2. Главная находка discovery

Декор-палитра **уже частично существует, и это меняет постановку.**

- **Primitives ратифицированы** (2026-05-25): шкалы Purple / Pink / Cyan / Teal / Indigo (+ Orange), 50–950 — `COLOR-PALETTE.md §1.6`.
- **Semantic-обвязка (`Background/Decor/*`, `Text&Icon/on Decor/*`) и правило «decor vs semantic» (§3.8) — НЕ ратифицированы** (решение: «ситуативно, паттерн не устаканился»). → сегодня **любое** использование декора формально вне canonical: либо primitives напрямую, либо хардкод.
- Существующий proposal `decorative-color-palette.md` описывает декор как **Tinted-модель**: пастельная плашка (Color/50 Light ↔ Color/900 Dark) + текст. Это extension семантического Tinted, заточенный под **плоские бейджи** (Badge, Chips).

**Ключевой разрыв, который вскрывает боль Дмитрия:** существующая Tinted-decor модель использует **тот же shade-swap Light 50 / Dark 900**, что и semantic Tinted. Для плоского бейджа это ок. Но для **выразительной поверхности** (градиент, hero, насыщенный tier-бейдж) shade-swap на 900 — это и есть «грязный/тусклый в dark». То есть проблема не в «decor вообще», а в том, что **нет модели для expressive-поверхностей, которая не деградирует в тёмной теме.**

Итог: у нас **две разные вещи** под одним словом «декор»:

| | Decor-Tinted (плоский лейбл) | Expressive (выразительная поверхность) |
|---|---|---|
| Кейсы | VIP/New/Hot как мелкий бейдж, chip | Градиент-hero, AI-coach баннер, tier-«золото», celebration, category-mood |
| Модель | пастель bg + текст (shade-swap 50↔900) | насыщенный цвет / градиент, **shade-swap ломается в dark** |
| Статус | proposal есть (Phase 1b не ратифицирован) | **модели нет — реальная дыра** |

---

## 3. Inventory of pain (по факту, из свежих макетов)

Материализовалось **5 из 6** профильных категорий (+ пласт legacy/other). Источники: `tasks/seller-cabinet/notes.md` (наибольшая концентрация), `tasks/PB-1586` (D-10/D-11), `tasks/PB-1473`, `tasks/PB-1581`, `DSL/docs/proposals/decorative-color-palette.md`, `COLOR-PALETTE.md §1.6/§2.10/§3.8`.

1. **Tier-badge** (самый частотный и «грязный») — VIP/TOP красятся то в semantic `warning #FBBF24` (анти-паттерн: семантика захвачена маркетингом — `seller-cabinet/notes.md:159`, `listing-score-v2.html:45`), то в хардкод-purple `#9333EA` (`ai-score-vip-flow.html:168,189`). PB-1473 lifecycle-бейджи используют `Background/Decor/Orange`/`Cyan` — токены, которых канонически нет.
2. **Gradient** — ни один не токенизирован: hero-coach `#7E22CE→#A855F7` (`ai-score-vip-flow.html:89`), **D-10** adv_block overlay `#c6f0ff→#0700cd @20%` (`PB-1586`), три score/price-шкалы green→amber→red и blue→red (`seller-insights`, `price-positioning`).
3. **Hero-mood** — фиолетовый `#7E22CE` + карточные `#F5F0FF`/`#E9D5FF` захардкожены во всех творческих поверхностях Seller Cabinet (`notes.md:311,312`).
4. **Category / price-hue** — ценовая band-шкала blue→green→amber→red как кодирование позиции. Отдельного «цвета вертикали каталога» пока НЕ материализовалось (гипотеза).
5. **Illustration / viz-accent** — score-кольцо взято из `Outline/*` (canonical-adjacent, т.к. у `Accent/Warning` графический контраст ~1.5:1 — провал WCAG 1.4.11); score-бары расширяют Progress семантикой вне viz-токенов.
6. **Celebration / success-mood** — **собственного декор-цвета НЕТ**: success PB-1586 собран на canonical (`Alert Standard/Good`, `Text&Icon/Positive`); «праздник» сводится к фиолетовому hero.

**Единственная явная пометка «в dark выпадает / не адаптируется»** — D-10 (`PB-1586/notes.md:120`): в dark «карточка становится насыщенно сине-фиолетовой», принято by design. Вторичные dark-риски: overlay-бейдж «Main photo» (нечитаем на тёмном, PB-1581), зелёные чек-иконки `#16a34a` при свопе темы.

*(Legacy/other — вне scope: `Decor/Bubble Old/*` чат-баблы, `Colors/`/`Brand Color/` мигрированы, theme-invariant White/scrim/shimmer шкалы — задокументированы отдельно.)*

---

## 4. Как решает индустрия (Mobbin, dark-акцент)

Сквозной приём: **expressive-цвет НЕ гасится в тёмной теме — адаптируется окружение (surface), а сам декор остаётся насыщенным.**

- **Spotify «Your benefits»** — [light](https://mobbin.com/screens/d69941dd-ac64-42e2-9dce-fe12d0bdfb13) vs [dark](https://mobbin.com/screens/853e9f95-b1e1-4ec7-8dec-8724c766fbd0): плитки-декор (маджента/синий/зелёный/розовый) **идентичны** в обеих темах; меняется только фон-подложка. Прямое опровержение shade-swap-подхода для expressive.
- **Apple Fitness** — [градиентный hero на чёрном](https://mobbin.com/screens/eaea5c61-75fc-43ea-9fce-d39536d9f91e): насыщенный purple→orange остаётся ярким.
- **Moonly** — [3D-mood-градиент в dark](https://mobbin.com/screens/eee6bdff-6572-4f79-bdd4-ed189ea96429).
- **Hatch Sleep** — [именованные decorative-hue карточки](https://mobbin.com/screens/bd233f10-d6ab-4dff-94b2-4907a6ea7883) (Lavender Sky / Golden Hour / Deep Ocean) — прямой аналог category/mood-hues как отдельного слоя.
- **Celebration:** [Runna — конфетти на тёмном](https://mobbin.com/screens/0e8a24e7-31ae-4657-bc16-6ace3abc70ea), [Numo level-up](https://mobbin.com/screens/471775a4-fb1c-42ac-9e6c-72cf8acece92) — цвет конфетти/награды **константен** в обеих темах.

Приёмы (Material Expressive / Adobe Spectrum / IBM Carbon): expressive в dark — не 900-shade, а 300–400 + subtle backdrop; часто **не адаптируется вообще** (tier остаётся золотым, среда подстраивается); overlay-подход (цвет + subtle white/black scrim под тему); elevation через shade.

---

## 5. Оценка scope

- **Decor-Tinted (плоские бейджи)** — расширения существующего достаточно: доратифицировать Phase 1b (`Background/Decor/*` + `Text&Icon/on Decor/*`) + правило §3.8. Shade-swap 50↔900 для мелких пастельных лейблов приемлем. Это **не** решает dark-боль, но закрывает анти-паттерн «VIP=warning».
- **Expressive (поверхности/градиенты/mood/tier-«золото»)** — расширения Tinted **недостаточно**: нужна отдельная модель, где цвет в dark **не свопается на 900**. Это и есть настоящая дыра.

Вывод: **это два трека, а не один.** Их стоит развести явно, иначе expressive снова упрётся в shade-swap.

---

## 6. Каркас подходов (2–3 варианта архитектуры)

### A. Расширить существующее (доратифицировать Decor-Tinted) — и всё
- **+** минимум новых сущностей; закрывает частотный tier-badge-лейбл и анти-паттерн VIP=warning; уже спроектировано.
- **−** **не решает dark-боль** для градиентов/hero/mood (там shade-swap на 900 и даёт «грязь»). Expressive остаётся хардкодом.
- *Вывод:* необходимо, но недостаточно. Хорош как «трек 1».

### B. Новый слой `Expressive/*` — theme-static (или dual-token), не shade-swap
- Роли не «Light 50 / Dark 900», а **насыщенный тон, константный по теме** (как Spotify-плитки), либо dual-token с ручным подбором dark-варианта (300–400 + subtle backdrop, а не 900). Плюс токены под **градиенты** (пары стопов) и **tier** («золото» держится, среда адаптируется).
- **+** прямо решает dark-боль (доказано индустрией); отделяет expressive от functional/semantic семантически чисто; покрывает градиенты и mood, чего Tinted не умеет.
- **−** больше токенов и новая ментальная модель; нужен ручной подбор dark-вариантов (не автоматический swap); риск разрастания (сколько hue, сколько градиентов).
- *Вывод:* единственный, что закрывает исходную проблему. Кандидат в основу «трека 2».

### C. Overlay-система — expressive = базовый цвет + theme-scrim
- Один насыщенный слой на обе темы + автоматический subtle white/black overlay под тему (как наш scrim-подход `Background/Overlay` + `White applied`).
- **+** мало токенов, «одна правда цвета»; переиспользует уже принятый overlay-паттерн (button-spec, stories, skeleton — theme-invariant + overlay уже прижились в DS).
- **−** overlay «пачкает» насыщенность (даёт молочность/затемнение — рискует снова стать тускло); хуже для градиентов (overlay поверх градиента смотрится грязно); меньше контроля, чем ручной dual-token.
- *Вывод:* дёшево и в духе существующих решений DS, но по mood-качеству слабее B.

### Рекомендация (для обсуждения, не решение)
**Гибрид B на базе A:** трек 1 — доратифицировать Decor-Tinted для плоских бейджей (быстро, чинит VIP=warning); трек 2 — ввести небольшой `Expressive/*` слой (theme-static tones + gradient-токены + tier), где dark задаётся **осознанно**, а не swap'ом. Overlay (C) — держать как приём внутри B (scrim под текст на expressive), а не как основную модель.

---

## 7. Границы / что дальше

- **Не делаем сейчас:** дизайн самой палитры (сначала это discovery + выбор подхода); правки Old→New по декору (хардкод как D-10 — правильная тактика до ратификации); отдельную папку `_research-expressive-palette/` (не нужна — документ живёт в `docs/proposals/`, per `feedback_structure_skepticism`).
- **Решено с Дмитрием (2026-07-30):** (a) подход — **C/overlay в Apple-модели** (accent × opacity над нейтральной адаптивной поверхностью), не подбор dark-хексов руками; (b) стадия — **рабочий рецепт сейчас, токены после полного покрытия Seller-Cabinet**; (c) две роли (band/surface) принимаем — см. §8.
- **Открытый вопрос:** нужен ли category-hue per вертикаль (пока гипотеза, в макетах не материализовался).
- **Память:** записать как structural DS-decision — **только после** ратификации токенов (сейчас рецепт-фаза, published-токенов нет).

---

## 8. Рабочий рецепт — dark decor-surfaces (recipe-фаза)

**Статус:** working recipe (применяю ко всем экранам Seller-Cabinet для консистентности). Не published-токены. Регуляризуется в токены после полного прокраса кабинета.

### Модель (как у Apple)

Apple не хранит «два синих». Поверхность = **нейтральный адаптивный слой** (`systemGroupedBackground`/`Surface/*`); цвет живёт в **контенте** (accent/icon); цветная плашка = **accent при низкой прозрачности поверх нейтрального слоя** (шкала `systemFill`). База адаптивна → в light сам выходит пастель, в dark — глубокий приглушённый тон, из **одного** источника.

**Следствие для нас:** dark-tint поверхности — это `accent hue × opacity` над `Background/Primary` (near-black) / `Surface/*`, а не отдельно подобранный dark-хекс. При токенизации это **одна opacity-переменная на роль** + переиспользование существующих `Accent/*` hue. Отменяет ручной подбор dark на каждый hue.

### Две роли (шкала эмфазиса одного акцента)

| Роль | Когда | Apple-аналог | Трактовка |
|---|---|---|---|
| **band-tint** | цвет = данные, надо читать (мелкие data-плашки: Спрос/Конкуренция) | сплошной / высокий accent (`systemBlue`) | почти сплошной насыщенный тон |
| **surface-tint** | цвет = фон-подсказка, уходит назад (крупные CTA-карточки) | `secondary/tertiarySystemFill` (accent @ ~15–25% над neutral) | глубокий приглушённый тинт |

### Рабочие значения (dark), пополняются по мере экранов

| Hue | band-tint | surface-tint | Применено на |
|---|---|---|---|
| **Blue** (Info) | `#1e40af` | `#202c4e` | My-ads Спрос/Конкуренция (band); score-карточки фото/описание (surface) |
| **Red** (Negative) | — | `#43201f` | score-карточка «цена» (surface) |

*(Расхождение `#1e40af` vs `#202c4e` — не разнобой, а две роли. Рефактор My-ads не нужен.)*

### Правила применения

- **Акценты НЕ трогаем.** Иконки-кружки, `+N`-бейджи, «score», amber-бар — уже theme-invariant на `Accent/*` / `Text&Icon/*`. Рецепт касается **только поверхности**.
- **Hero / градиент (D-10)** — отдельный expressive-кейс (cyan-rim + золото), вне этого рецепта; трогаем осознанно, не под формулу.
- Значения — screen-local raw fills до ратификации (как D-10). Токенизация — одним opacity-набором.

## Связано
- [decorative-color-palette.md](./decorative-color-palette.md) — существующий Tinted-decor proposal (Phase 1a ratified)
- [COLOR-PALETTE.md](../COLOR-PALETTE.md) §1.6 primitives / §2.10 decor status / §3.8 decor vs semantic
- Источники pain: `tasks/seller-cabinet/notes.md`, `tasks/PB-1586`, `tasks/PB-1473`, `tasks/PB-1581`
