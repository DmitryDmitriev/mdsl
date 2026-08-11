# Popover — спецификация компонента

Привязанный плавающий контейнер с произвольным контентом. **База «оверлей-семьи»** Larixon Mobile DS. Семья разъединена на самостоятельные компоненты (2026-08-05): **[Tooltip](./tooltip-spec.md)** (минимальная тёмная подсказка), **[Coach Mark](./coach-mark-spec.md)** (синяя онбординг-выноска), **[Context Menu](./context-menu-spec.md)** (список действий) и **Popover** (этот документ — контейнер с произвольным контентом).

**Статус:** Popover — черновик спеки (Figma-база `10726:11`, стр. «🟢 Popover» `10785:10`). Механика хвостика и тени — общая с Coach Mark/Tooltip (ось `Tail`, тень на фрейме варианта). Соседи — §4.

**Категория:** Molecule · floating overlay.

---

## 1. Overlay foundation — общая база семьи

Один раз заданное поведение и токены, которые делят все плавающие оверлеи (Popover, Tooltip, Context Menu, Coach mark). **Источник правды по токенам — уже существующий Context Menu.**

| Параметр | Токен | Значение |
|---|---|---|
| Фон | `Surface/Surface Primary` | floating → Surface (см. COLOR-PALETTE §3.2). **Исключение — Tooltip:** инвертированный фон, см. §3 |
| Тень | `Elevation/Floating` | — |
| Радиус | `radius/surface/md` | 12 dp |
| Max-width | — | 256 dp |
| Появление | `duration/base` (200) + `easing/standard` | см. motion-spec |
| Закрытие | `duration/fast` (100) + `easing/accelerate` | — |
| Dismiss | light dismiss (тап за пределами), **без скрима** | скрима нет ни у кого в семье (спотлайт/затемнение якоря в Coach Mark **не делаем** — моб-разработка: дорого) |
| Привязка | anchor к таргету, позиция через ось `Tail` (12 по часовой) + auto-flip на стороне рантайма | единая механика с [Coach Mark](./coach-mark-spec.md)/[Tooltip](./tooltip-spec.md) |

**Caret / хвостик** — залитый вектор (16×8 / 8×16), заливка = фон контейнера (`Surface/Surface Primary`), **без отдельной тени** (тень отбрасывает фрейм варианта единым силуэтом — см. [coach-mark-spec](./coach-mark-spec.md#тень--на-фрейме-не-на-пузырехвостике)). Указывает на anchor; позиция — ось `Tail`.

---

## 2. Popover

### Анатомия

```
Popover (Surface-карточка, radius 12, Elevation/Floating)
├── Caret (optional, 12×6, к anchor)
└── Content (slot — произвольный)
    ├── Title (optional)    — Heading/H4 Medium или Body 2 Medium
    ├── Body (optional)     — Base/Body 2 (14/20)
    └── Actions (optional)  — Buttons Stack / Button(s)
```

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Placement** | Top, Bottom, Left, Right (позиция caret; auto-flip — рантайм) |
| **Caret** | on / off |
| **Content** | slot (INSTANCE_SWAP / FRAME) |

### Размеры

| Параметр | Токен | Значение |
|---|---|---|
| Padding (контент) | `spacing/3` | 12 dp (все стороны; дефолт для текст/смешанного контента) |
| Max-width | — | 256 dp |
| Min-width | — | hug content |
| Caret | — | 12 × 6 dp |
| Gap Title↔Body | `stack/gap-tight` | 4 dp |
| Gap Body↔Actions | `stack/gap-loose` | 12 dp |

### Цвета

| Элемент | Токен |
|---|---|
| Фон / caret | `Surface/Surface Primary` |
| Тень | `Elevation/Floating` |
| Title | `Text&Icon/Primary` |
| Body | `Text&Icon/Secondary` |
| Actions | по [button-spec](./button-spec.md) |

### Поведение

- Light dismiss (тап вне), без скрима. Action внутри может закрывать popover.
- Интерактивный (в отличие от Tooltip): держит кнопки, ссылки, медиа.
- Появление/закрытие — по motion-spec (база/standard, закрытие fast/accelerate).

---

## 3. Tooltip — вынесен в отдельную спеку

Самый лёгкий член семьи (тёмный инверсный пузырь, только текст, неинтерактивный) теперь **самостоятельный компонент** — см. **[tooltip-spec.md](./tooltip-spec.md)**. Здесь не дублируем; ключевое для семьи: Tooltip — единственный **инверсный** (`Background/Inverted Primary`), остальные оверлеи светлые (`Surface/Surface Primary`); механика хвостика/тени — общая (ось `Tail`, тень на фрейме).

---

## 4. Связь с остальной семьёй

| Член | Что это | Статус |
|---|---|---|
| **Popover** | общий контейнер (этот документ) | черновик спеки + Figma-база `10726:11` |
| **Tooltip** | минимальная тёмная подсказка, текст | спека готова ([tooltip-spec](./tooltip-spec.md)); standalone-сборка pending |
| **Coach Mark** | синяя онбординг-выноска (Title/счётчик/кнопки) | ✅ собран ([coach-mark-spec](./coach-mark-spec.md), набор `11088:702`) |
| **Context Menu** | список действий | ✅ есть ([context-menu-spec](./context-menu-spec.md)) — выровнять под §1 при сборке |

**Спотлайт/затемнение якоря в семье не реализуем** (моб-разработка: дорого) — привязку к элементу несёт хвостик.

---

## 5. Доступность (a11y)

- `role="tooltip"` (Tooltip) / `role="dialog"` или `menu` (Popover, в зависимости от контента).
- Фокус: Popover с интерактивом — ловит фокус, Esc/тап-вне закрывают, фокус возвращается на триггер.
- Контраст текста на `Surface/Surface Primary` — WCAG AA (проверено в палитре).
- Motion — уважать `prefers-reduced-motion` (см. motion-spec §4).

---

## 6. Связанные документы

- [context-menu-spec.md](./context-menu-spec.md) — член семьи, источник базовых токенов.
- [motion-spec.md](./motion-spec.md) — тайминги появления/закрытия.
- [elevation-spec.md](./elevation-spec.md) — `Elevation/Floating`.
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) §3.2 — почему floating = Surface.
