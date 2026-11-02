# Island (Остров) — спецификация компонента

**Остров** — generic-контейнер «заголовок + слот»: поверхность со скруглением, которая группирует связанный контент в один блок и отделяет его от остального экрана. Экран собирается из стопки островов между боковыми гаттерами.

**Категория:** Organism.
**Figma:** страница «🟢 Island», COMPONENT_SET `Island` (`11804:288`) + под-компоненты `.Island / Rows` (`11804:12`), `.Island / Slot` (`11804:10`). Пример и правила — там же.
**Статус:** компонент собран; header острова — инстанс нового `Section Header` (`12132:14`), подзаголовок несёт сам Section Header. Сведение завершено 2026-11-02 (см. §8).

---

## 1. Что это

Остров — **оболочка**, не контент. Внутрь (Slot) кладут что угодно: список строк (`List Item`) или произвольный контент (описание, параметры, медиа, баннер). Задача компонента — задать правила оболочки (поля, радиус, поверхность, header, зазоры), чтобы экраны не разъезжались.

---

## 2. Figma-компонент

**8 вариантов** = `Header` × `Slot`:

| Свойство | Тип | Значения |
|---|---|---|
| **Header** | VARIANT | `None` / `Title` / `Title + Action` / `Title + Subtitle` |
| **Slot** | VARIANT | `Rows` / `Content` |
| **Rows** | INSTANCE_SWAP | контент-слот со строками (дефолт `.Island / Rows`) |
| **Content** | INSTANCE_SWAP | произвольный контент-слот (дефолт `.Island / Slot`) |

> **Title / Subtitle / Link острова не экспонированы на уровне острова** — редактируются на вложенном инстансе `Section Header` (его свойства `Title` / `Subtitle` / `Subtitle text` / `Link label` / `Counter`). Ось `Header` лишь преднастраивает SH под вариант: `Title` → Trailing=None; `Title + Action` → Trailing=Link; `Title + Subtitle` → Subtitle=On. Прежний отдельный островной текст-проп `Subtitle` убран при сведении (2026-11-02, §8).

---

## 3. Анатомия

```
Island (VERTICAL, radius 12, fill Surface/Surface Primary)
├── [Header]  ← Header ≠ None: инстанс Section Header (Title + опц. Counter / Subtitle / Trailing)
└── Slot
     ├── Rows    → стопка List Item (Compact), full-bleed
     └── Content → произвольный контент
```

- **Header** — опционально, = инстанс **`Section Header`** (Title + опц. Counter + опц. **Subtitle** + опц. Trailing). Подзаголовок — **внутри Section Header** (не отдельный текст острова). См. [section-header-spec](./section-header-spec.md).
- **Slot** — контент-зона, два режима: `Rows` (список строк) или `Content` (что угодно).

---

## 4. Токены и геометрия

| Параметр | Значение | Токен |
|---|---|---|
| Поверхность | белая (приподнятая) | **`Surface/Surface Primary`** |
| Радиус | 12 | `radius/3` |
| Боковой gutter экрана | **12** (острова FILL между гаттерами) | `spacing/3` |
| Зазор между островами | **8** | `section/gap` |
| Header-фрейм padding | `16 / 16 / 8 / 16` | `spacing/4` + низ `spacing/2` |
| Header → контент | 8 | `section/title-to-content` |
| Slot = Rows padding | бока **0**, верт **8** (строки full-bleed, свой pad 16) | `spacing/2` |
| Slot = Content padding | бока **16**, низ **16**, верх 0 при наличии Header | `spacing/4` |
| List Item (в Rows) | Density = **Compact**, Left Side 40-бокс, значение справа = Trailing value | см. [list-item-spec](./list-item-spec.md) |
| Elevation | плоский (без тени) — различие цветом+зазором | [elevation-spec](./elevation-spec.md) |

---

## 5. Правила композиции (из Figma «Rules / Island»)

1. **Боковой gutter экрана — 12** (`spacing/3`), не 16. Острова FILL между гаттерами.
2. **Между островами** — `section/gap` (8).
3. **Без double-pad:** `Slot=Rows` — 0 по бокам, строки `List Item` full-bleed со своим padding 16.
4. **Left Side 40-бокс** у строк **не снимать** — тап-зона и тип сущности (иконка/аватар/radio/checkbox).
5. **Строки** в острове — `List Item` `Density=Compact`; значение справа — `Right Side Type=Trailing value`.
6. **`Slot=Content`** — padding 16 по бокам и снизу; любой контент (Description, Analysis Block, Banner, Video).
7. **Header** — `Section Header` (exposed): `Title` / `Title + Action` / `Title + Subtitle` / `None`. Header→Slot = `section/title-to-content` (8).

---

## 6. Наполнение Slot (по макетам)

**Slot = Rows** — однородный список: селектор, настройки, параметры-строки, список заказов. Каждая строка — `List Item` (Compact).

**Slot = Content** — разнородный контент (собрано по карточке товара `PI3XrU`):

| Тип | Пример |
|---|---|
| Свободный текст + раскрытие | Description (текст + «Показать ещё») |
| Key-value параметры | Характеристики (строки label — value) |
| Медиа | Video / Photo (во всю ширину контента) |
| Адрес + карта | строка-адрес + превью карты (Pin) |
| Продавец + CTA | блок продавца + «Позвонить» |
| Вложенная мини-карточка | промо/баннер/CTA (меньший радиус 8–12, своя заливка) |

---

## 7. Вложенность (мини-острова внутри Content)

Внутрь `Slot=Content` часто кладут вложенную карточку (промо/CTA/баннер): **меньший радиус** (`radius/2` 8 … `radius/3` 12 против 12 острова) и меньший/равный padding — читается как уровень глубже. Часто с акцентной/held-заливкой, не surface.

---

## 8. Header = Section Header (сведение — выполнено 2026-11-02)

Header острова — инстанс нового `Section Header` (`12132:14`): Title + опц. Counter + опц. **Subtitle** + опц. Trailing (None/Link/Overflow). **Подзаголовок несёт сам Section Header** (boolean `Subtitle`), в одном блоке с тайтлом — больше не уплывает к контенту.

✅ **Сделано:**
- Во всех 6 header-вариантах (`Title` / `Title + Action` / `Title + Subtitle` × `Rows`/`Content`) старый SH-инстанс заменён на новый `12132:14`.
- Оси Header преднастраивают SH: `Title` → Trailing=None; `Title + Action` → Trailing=**Link** («Все»); `Title + Subtitle` → **Subtitle=On** (саб теперь в SH).
- Отдельный островной Subtitle-текст и проп `Subtitle#11804:18` **удалены** — подзаголовок полностью на стороне Section Header.
- Старый `Section Header` `10463:26` в файле отсутствует (ретайрнут ранее); живых инстансов не осталось.
- Header-фрейм (padding `16/16/8/16`) сохранён как обёртка отступов; SH внутри — FILL по ширине. Публикация UI-Kit — вручную.

> **Возможное упрощение (не сделано, на будущее):** ось `Header` частично дублирует собственные свойства SH (`Trailing`/`Subtitle`). Можно схлопнуть ось до `None`/`Present` и отдать Action/Subtitle целиком свойствам SH — но это отдельный редизайн вариантной матрицы острова (8→4), вне текущего сведения.

---

## 9. Связанные документы

- [section-header-spec.md](./section-header-spec.md) — header острова
- [list-item-spec.md](./list-item-spec.md) — строки в `Slot=Rows` (Compact, Left Side 40, Trailing value)
- [sheets-spec.md](./sheets-spec.md) — канон вертикали слота (родственный паттерн)
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — `Surface/Surface Primary`, `Background/Secondary` фон страницы
- [imagecard-spec.md](./imagecard-spec.md) — соседний организм (карточка-листинг), не путать

---

## 10. История

**2026-11-02 — сведение Header острова на новый Section Header.** Во всех 6 header-вариантах старый SH `10463:26` заменён на новый `12132:14`; подзаголовок переведён на свойство `Subtitle` самого Section Header (отдельный островной Subtitle-текст и проп `Subtitle#11804:18` удалены) — саб теперь в одном блоке с тайтлом, не уплывает к контенту. Оси Header преднастраивают SH (Title→Trailing=None, Title+Action→Trailing=Link, Title+Subtitle→Subtitle=On). Старый SH отсутствует в файле, живых инстансов 0. Проверено по всем 8 вариантам. §8 закрыт. Публикация — вручную. §2 — убран островной проп `Subtitle`.

**2026-11-01 — спека приведена к собранному компоненту.** Прежний черновик `island-spec.md` (писался «с нуля», ошибочно утверждал «компонента нет») заменён этим файлом. Зафиксировано по факту Figma (`11804:288` + rules-фрейм): 8 вариантов `Header`×`Slot`, `Surface/Surface Primary`, radius 12, gutter 12 / gap 8, правила 1–7, Header = инстанс Section Header, Subtitle — на стороне острова. Открыто: перевод Header на новый `Section Header` (`12132:14`) + ретайр старого. Референс — Sellers `11001:860`.
