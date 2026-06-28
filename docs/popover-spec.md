# Popover — спецификация компонента

Привязанный плавающий контейнер с произвольным контентом. **База «оверлей-семьи»** Larixon Mobile DS: на ней стоят Tooltip (минимальный popover), Context Menu (popover со списком действий, уже есть) и Coach mark (popover + spotlight, организм — позже).

**Статус:** Popover — черновик спеки (Figma-база). **Tooltip — собран** (Figma COMPONENT_SET, 4 placement, WIP на стр. `4334:52`). Остальное — §4.

**Категория:** Molecule · floating overlay.

---

## 1. Overlay foundation — общая база семьи

Один раз заданное поведение и токены, которые делят все плавающие оверлеи (Popover, Tooltip, Context Menu, Coach mark). **Источник правды по токенам — уже существующий Context Menu.**

| Параметр | Токен | Значение |
|---|---|---|
| Фон | `Surface/Surface Primary` | floating → Surface (см. COLOR-PALETTE §3.2) |
| Тень | `Elevation/Floating` | — |
| Радиус | `radius/surface/md` | 12 dp |
| Max-width | — | 256 dp |
| Появление | `duration/base` (200) + `easing/standard` | см. motion-spec |
| Закрытие | `duration/fast` (100) + `easing/accelerate` | — |
| Dismiss | light dismiss (тап за пределами), **без скрима** | (исключение — Coach mark: со spotlight-backdrop) |
| Привязка | anchor к таргету, позиция top/bottom/left/right + auto-flip на стороне рантайма | — |

**Caret (стрелка к таргету)** — опционально: треугольник 12 × 6, заливка = фон контейнера (`Surface/Surface Primary`), без отдельной тени. Указывает на anchor; позиция следует за placement.

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

## 3. Tooltip — минимальный popover

Самый лёгкий член семьи: **только текст**, неинтерактивный.

| Параметр | Значение |
|---|---|
| Контент | текст 1–2 строки, без действий |
| Типографика | `Base/Body 2` (14/20) |
| Padding | `spacing/2` верт. (8) / `spacing/3` гор. (12) |
| Max-width | 240 dp |
| Caret | on (по умолчанию) |
| Триггер | long-press (на мобайле hover нет) |
| Dismiss | авто (через короткую паузу) или по следующему тапу |
| Фон / тень / радиус | как в Overlay foundation (§1) |

> Реализация в Figma: Tooltip — отдельный COMPONENT_SET, делящий токены §1 (не вариант Popover, т.к. контент жёстко текстовый). **Собран:** ось `Placement` (Top / Bottom / Left / Right), caret-вектор к триггеру под каждое направление, фон/текст/радиус привязаны к переменным (`Surface/Surface Primary`, `Text&Icon/Primary`, `radius/surface/md`), тень — `Elevation/Floating`. WIP на стр. `4334:52` — на паблиш переедет на components-страницу.

---

## 4. Связь с остальной семьёй

| Член | Что это | Статус |
|---|---|---|
| **Popover** | общий контейнер (этот документ) | черновик спеки + Figma-база |
| **Tooltip** | минимальный popover (§3) | **Figma COMPONENT_SET, 4 placement (WIP, стр. 4334:52)** |
| **Context Menu** | popover со списком действий | ✅ есть ([context-menu-spec](./context-menu-spec.md)) — выровнять под §1 при сборке |
| **Coach mark** | popover + spotlight-backdrop + шаги (1/N, Далее/Пропустить) + секвенс | организм, **позже** (после sign-off базы разработкой) |

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
