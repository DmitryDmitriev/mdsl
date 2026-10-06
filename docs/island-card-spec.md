# Island (Остров)

## §1 Обзор

**Остров** — generic organism «заголовок + слот»: поверхность-карточка, в которую кладётся **любой** контент. Первый organism-множитель Mobile DS — один контейнер закрывает десятки повторов в приложении.

Скан главного Figma-файла (`PI3XrUDuoGyK4aXkqyzYoB`) — острова одной конструкции встречаются под разными именами:

| Блок в продукте | Повторов |
|---|---|
| Description | 27× |
| Video | 19× |
| Analysis Block | 12× |
| Banner | 12× |

Все они — «заголовок + контент на Surface-карте». Вместо четырёх (и более) отдельных компонентов DS даёт **один контейнер** с правилами слота; специфика блока живёт в контенте слота, не в контейнере.

```
Background/Secondary (экран)
 ┆12┆┌──────────────────────────────┐┆12┆
    │ Заголовок            Action ›│   ← Header (Section Header)
    │ Подзаголовок                 │
    │ ↕ 8                          │
    │ ┌──────────────────────────┐ │
    │ │          Slot            │ │   ← любой контент
    │ └──────────────────────────┘ │
    └──────────────────────────────┘
        ↕ 8 (section/gap)
    ┌──────────────────────────────┐
    │ …следующий остров            │
```

Референс-нода продукта: **Sellers `11001:860`**.

---

## §2 Когда использовать

**Использовать:**
- Контентный блок экрана с (опциональным) заголовком: описание объявления, блок аналитики/статистики, баннер, видео, характеристики.
- Список строк-значений внутри карточки (статистика, параметры, тарифы) — `Slot=Rows`.

**Не использовать:**
- Заголовок экрана — Top App Bar.
- Шторка / модалка — [Sheet](./sheets-spec.md), [Dialog](./dialog-spec.md).
- Плоский длинный список без карточек — flat layout ([composition-rules §3.2](./composition-rules.md)); остров не изобретать поверх flat source ([§3.3](./composition-rules.md)).
- Карточка-объявление с фото — [ImageCard](./imagecard-spec.md).

---

## §3 Anatomy

```
Island (VERTICAL, FILL по ширине, HUG по высоте)
├── Header (VERTICAL, опц.)
│   ├── Section Header (instance, exposed)   ← title [+ action]
│   └── Subtitle (TEXT, опц.)
└── Slot (VERTICAL, FILL)
    └── Rows | Content (INSTANCE_SWAP)
```

| Слой | Что это | Источник |
|---|---|---|
| **Island** | Поверхность острова | `Surface/Surface Primary`, `radius/surface/surface` (12), clip content |
| **Header** | Заголовок блока | [Section Header](./section-header-spec.md) — переиспользуется, не дублируется |
| **Subtitle** | Пояснение под заголовком | `Base/Body 2`, `Text&Icon/Secondary` |
| **Slot** | Контент | INSTANCE_SWAP: `Rows` или `Content` |

---

## §4 Варианты

Набор `Island` — 2 оси, 8 вариантов.

### Header

| Значение | Состав | Когда |
|---|---|---|
| `None` | Без заголовка | Баннер, видео, самодостаточный контент |
| `Title` | Section Header `Action=False` | Описание, характеристики |
| `Title + Action` | Section Header `Action=True` (по умолчанию `Icon=Right`) | Блок со ссылкой «Все», «Подробнее», «Выбрать» |
| `Title + Subtitle` | Section Header + Subtitle | Аналитика с пояснением периода/контекста |

Section Header выставлен как **exposed instance** — текст заголовка, `Action`, `Icon` меняются прямо из панели острова.

### Slot

| Значение | Padding слота (T / R / B / L) | Содержимое по умолчанию |
|---|---|---|
| `Rows` | `0 / 0 / 8 / 0` (при `Header=None` — `8 / 0 / 8 / 0`) | `.Island / Rows` — 3 × List Item Compact + Trailing value |
| `Content` | `0 / 16 / 16 / 16` (при `Header=None` — `16 / 16 / 16 / 16`) | `.Island / Slot` — плейсхолдер, swap на любой контент |

### Свойства компонента

| Свойство | Тип | Где видно |
|---|---|---|
| `Header` | Variant | всегда |
| `Slot` | Variant | всегда |
| `Rows` | Instance swap | `Slot=Rows` |
| `Content` | Instance swap | `Slot=Content` |
| `Subtitle` | Text | `Header=Title + Subtitle` |

---

## §5 Правила композиции (из discovery)

Правила — нормативные. Расхождение в сборке экрана = regression.

### 5.1 Боковой gutter — 12

Острова стоят от края экрана на **12** (`spacing/3`), **не 16** (`screen/padding-horizontal`). Ширина острова = `ширина экрана − 2 × 12` (на 360 → 336). Острова FILL между гаттерами.

> Это исключение из [composition-rules §10](./composition-rules.md) для экранов, собранных из островов: внутренний padding контента (16) уже даёт текстовой колонке нужный отступ, внешние 12 оставляют видимый фон `Background/Secondary` между карточкой и краем.

### 5.2 Без double-pad

Внутренний горизонтальный отступ задаётся **один раз**:

- `Slot=Rows` — слот **0 по бокам**; строки List Item full-bleed внутри острова и несут свой `padding 16`. Не оборачивать строки в ещё один padding 16 (иначе текст уезжает на 32).
- `Slot=Content` — padding **16** (`section/padding-default`) задаёт слот; контент внутри **без** собственных боковых отступов.
- Header — padding 16 по бокам, чтобы заголовок стоял на одной вертикали с текстом строк/контента.

### 5.3 Left Side 40-бокс не снимать

У строк List Item в острове **Left Side остаётся** с 40-боксом (Icon 24 в 40, Avatar 40, Brand 40/32 — см. [list-item-spec §3](./list-item-spec.md)). Он держит тап-зону и тип сущности строки. «Сэкономить ширину» снятием Left Side — нельзя.

### 5.4 Строки — Compact + Trailing value

Строки внутри острова — List Item **`Density=Compact`** (min-height 48, padding верт. 4). Значение справа — Right Side **`Type=Trailing value`** (`Base/Body 1 Medium` 16/24). Это стандарт для статистики/параметров/цен в острове (Analysis Block).

### 5.5 Вертикальный ритм

| Отношение | Значение | Токен |
|---|---|---|
| Верх острова → заголовок | 16 | `section/padding-default` |
| Заголовок → подзаголовок | 4 | `stack/gap-tight` |
| Header → Slot | 8 | `section/title-to-content` |
| Низ слота `Rows` | 8 (+4 padding строки = 12 визуально) | `spacing/2` |
| Низ слота `Content` | 16 | `section/padding-default` |
| Между островами | 8 | `section/gap` |

Proximity соблюдён: заголовок ближе к своему контенту (8), чем к краю острова (16) — [composition-rules §3.1](./composition-rules.md).

---

## §6 Токены

| Параметр | Значение | Токен |
|---|---|---|
| Фон | — | `Surface/Surface Primary` |
| Радиус | 12 | `radius/surface/surface` |
| Header padding T / R / B / L | 16 / 16 / 8 / 16 | `section/padding-default` / `section/title-to-content` |
| Header gap | 4 | `stack/gap-tight` |
| Title | 20/28 Medium, Primary | `Heading/H3 Medium`, `Text&Icon/Primary` (из Section Header) |
| Subtitle | 14/20, Secondary | `Base/Body 2`, `Text&Icon/Secondary` |
| Slot padding | см. §4 | `spacing/2`, `section/padding-default` |
| Screen gutter | 12 | `spacing/3` |
| Gap между островами | 8 | `section/gap` |
| Фон экрана | — | `Background/Secondary` |

Плейсхолдер `.Island / Slot`: dashed 1 px `Text&Icon/Tertiary`, `radius/2`, подпись `Base/Body 2` Tertiary — **только для Figma**, в продукт не уходит.

---

## §7 Доступность

- Title острова — heading-роль (`.header` iOS / `heading()` Android), наследуется от Section Header.
- Action в заголовке — отдельная tappable-область ≥ 44.
- Строки `Slot=Rows` — тап-зона строки целиком (min-height 48 ≥ 44 WCAG), Left Side 40 сохраняет визуальную опору.
- Остров сам по себе не интерактивен; если весь остров кликабелен (баннер) — tappable-роль на контейнер, без вложенных tap-целей.

---

## §8 Синхронизация с кодом (ориентир)

**Android (Compose):**
```kotlin
Island(
    title = "Статистика",
    subtitle = "За 7 дней",
    action = IslandAction("Все") { /* … */ },
) {
    ListItem(density = Compact, leading = { Icon(...) }, headline = "Просмотры",
             trailing = TrailingValue("1 248"))
}
```

**iOS (SwiftUI):**
```swift
IslandView(title: "Описание") {
    Text(description)
}
```

Контейнер в коде: фон Surface Primary, радиус 12, `padding(horizontal = 12)` на уровне экранного списка островов, `spacedBy(8)` между островами. Горизонтальный padding контента — внутри слота по правилам §5.2.

---

## §9 Figma

Файл **UI-Kit-Mobile** (`PI2N65xbeJPTc5oWhOP7Bl`), страница **🟢 Island** (`11803:29`, раздел ORGANISMS, после Section Header).

| Нода | Что |
|---|---|
| [`11804:288`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=11804-288) | `Island` — COMPONENT_SET, 8 вариантов (Header × Slot) |
| [`11804:12`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=11804-12) | `.Island / Rows` — образец слота: List Item Compact + Trailing value |
| [`11804:10`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=11804-10) | `.Island / Slot` — плейсхолдер свободного слота |
| [`11805:739`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=11805-739) | Пример экрана: gutter 12, gap 8, 3 острова |
| [`11805:799`](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile?node-id=11805-799) | Карточка правил на канвасе |

Все отступы, радиус и цвета привязаны к переменным. Публикация UI-Kit — вручную.

**Как собрать свой остров:** вставь `Island` → выбери `Header` и `Slot` → в `Content` (или `Rows`) сделай swap на компонент своего блока. Если для блока нет компонента — собери его как отдельный компонент шириной FILL и подставь через swap; детачить остров не нужно.

---

## §10 Связанные документы

- [composition-rules.md](./composition-rules.md) — §2 Section card, §3 proximity, §4 gap
- [section-header-spec.md](./section-header-spec.md) — заголовок острова
- [list-item-spec.md](./list-item-spec.md) — Density=Compact, Right Side Trailing value, Left Side 40-бокс
- [spacing-semantic.md](./spacing-semantic.md) — `section/*`, `stack/*`

---

## §11 История

| Дата | Изменение |
|---|---|
| 2026-10-06 | Компонент добавлен в DS (Organisms). Набор `Island` (`11804:288`, Header × Slot = 8 вариантов) + `.Island / Rows`, `.Island / Slot`, пример экрана. Composition-правила из discovery: gutter 12, без double-pad, Left Side 40 не снимать, Compact + Trailing value. Референс — Sellers `11001:860`. Статус — «designed and described». OKR: [Skailer goal 4886](https://app.skailer.com/goals/4886). |
