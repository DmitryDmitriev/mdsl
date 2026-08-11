# Coach Mark — спецификация компонента

Онбординг-выноска: синий пузырь с хвостиком, указывающим на элемент-якорь. Часть семьи оверлеев ([popover-spec](./popover-spec.md), [tooltip-spec](./tooltip-spec.md), [context-menu-spec](./context-menu-spec.md)). Часть **PB-1580**.

**Статус:** ✅ собран в Figma (2026-08-05). Отдельный компонент — **разъединён** с Tooltip (раньше был единый набор `Tooltip`; теперь три самостоятельных компонента: Tooltip / Coach Mark / Popover).

Figma (UI-Kit-Mobile `PI2N65xbeJPTc5oWhOP7Bl`, стр. «🟢 Coach Mark»):
- набор **`Coach Mark`** (COMPONENT_SET `11088:702`) — ось `Tail` (12 значений);
- building-block **`.=Coach Mark`** (COMPONENT `11053:26`) — пузырь с булевыми.

---

## Обзор

Coach Mark ведёт пользователя по фичам в онбординге: подсвечивает элемент и объясняет его. В отличие от Tooltip — **интерактивный и насыщенный** (заголовок, счётчик шагов, кнопки навигации), синий (attention-grabbing), с хвостиком-указателем.

**Спотлайт/затемнение якоря НЕ делаем** (моб-разработка: дорого). Привязку к элементу несёт **хвостик** — это единственный указатель, поэтому он обязателен.

---

## Анатомия

```
Coach Mark (набор, ось Tail) — тень Elevation/Floating на ФРЕЙМЕ варианта (единый силуэт)
├── ⟶ .=Coach Mark (instance) — пузырь, hug под контент
└── Tail (VECTOR, 16×8 / 8×16, в цвет пузыря) — в «рельсе» на всю грань; инсет 16 от углов на Start/End

.=Coach Mark (COMPONENT) — VERTICAL, pad 16, gap 12 (Content↔Footer), radius 12, fill Blue applied
├── Content (VERTICAL, gap 8)
│   ├── Header (HORIZONTAL, space-between, align top)
│   │   ├── HeaderLeft (VERTICAL, gap 4)
│   │   │   ├── «1 из 3» (TEXT)                    — булев Counter
│   │   │   └── TitleGroup (HORIZONTAL, gap 8): Title [Title] + New badge [New]
│   │   └── Close × (24/ic_close)
│   └── Body (TEXT, auto-width, maxWidth 280)
└── Footer (HORIZONTAL, FILL, align center) [Actions]
    ├── «Пропустить» (Button Type=Link) [Skip]
    ├── Spacer (layoutGrow=1)               ← держит группу справа при скрытом Skip
    └── Actions Right (HORIZONTAL, gap 8): «Назад» [Back] + «Далее»
```

---

## Оси и свойства

### Ось `Tail` (12 значений, по часовой)

Одно свойство вместо двух (Placement + Tail align) — проще выбирать. Значения по часовой стрелке, зеро-пад для порядка в дропдауне:

`01 Top left · 02 Top center · 03 Top right · 04 Right top · 05 Right center · 06 Right bottom · 07 Bottom right · 08 Bottom center · 09 Bottom left · 10 Left bottom · 11 Left center · 12 Left top`

- **Сторона** = грань, с которой торчит хвостик (= противоположна якорю: пузырь снизу → хвостик сверху).
- **Позиция вдоль грани** покрывает **углы**: якорь у правого-верхнего угла экрана → `03 Top right`; левый-нижний → `09 Bottom left` и т.д. Отдельных диагональных хвостиков не заводим.
- На Start/End хвостик **отодвинут от скруглённого угла на 16** (не наезжает на радиус).

### Булевы (проброшены на верхний уровень через `isExposedInstance`)

Все настройки маркера — под рукой на инстансе набора, рядом с `Tail`:

| Свойство | Что переключает |
|---|---|
| **Title** | Заголовок |
| **New** | Бейдж «New» (inline с заголовком) |
| **Counter** | Счётчик шагов «1 из 3» |
| **Actions** | Весь футер (Пропустить/Назад/Далее) |
| **Skip** | «Пропустить» (× тоже закрывает, поэтому Skip опционален) |
| **Back** | «Назад» |

- **Single-step анонс** (как «Claude now has a browser»): New on, Counter/Actions off → заголовок + New + × + текст.
- **Multi-step тур:** Counter + Actions on, Skip/Back по потребности.

---

## Размеры и токены

| Элемент | Параметр | Значение | Токен |
|---|---|---|---|
| Пузырь | padding | 16 | `spacing/4` |
| Пузырь | gap Content↔Footer | 12 | `spacing/3` |
| Пузырь | gap Header↔Body (внутри Content) | 8 | `spacing/2` |
| Пузырь | gap Title↔Body | 8 | `spacing/2` |
| TitleGroup | gap Title↔New | 8 | `spacing/2` |
| Пузырь | radius | 12 | `radius/surface/surface` |
| Пузырь | max-width | 280 | — (ограничение контента) |
| Хвостик | размер | 16×8 / 8×16 | — (геометрия указателя) |
| Хвостик | инсет от угла (Start/End) | 16 | `spacing/4` |
| Кнопки | Size | 32 | Button `Size=32` |
| Тень | Elevation | **на фрейме варианта** | `Elevation/Floating` |

Ширина пузыря — **hug под контент** (задаёт Body, maxWidth 280), не токенизируется.

### Тень — на фрейме, не на пузыре/хвостике

Drop-shadow `Elevation/Floating` ставится на **фрейм варианта** (контейнер пузыря + хвостика). Фрейм отбрасывает **единую тень по силуэту** — без шва на стыке. Отдельные тени на пузыре и хвостике дают «зарез» — так НЕ делать (приём подтверждён по Larixon Web DS Coach Mark).

---

## Цвета

| Элемент | Токен | Значение |
|---|---|---|
| Пузырь + хвостик | **`Background/Blue applied`** (held) | Blue/600 `#2563eb` в обеих темах |
| Title / Body | `Text&Icon/White applied` | белый |
| Счётчик «1 из 3» | `Text&Icon/White applied` | белый |
| «New» — плашка | `Text&Icon/White applied` (bg) | белая |
| «New» — текст | **raw `#1d4ed8`** (одноразовый override, не токен) | Blue/700 |
| × / «Пропустить»(Link) / «Назад» — текст | `Text&Icon/White applied` | белый |
| «Назад» (Outline) — обводка | **`Border/White applied`** (held) | белый |
| «Далее» — заливка | `Text&Icon/White applied` | белая |
| «Далее» — текст | **raw `#1d4ed8`** (одноразовый override, не токен) | Blue/700 |

**Почему held (applied), а не `Accent/Link`.** `Accent/Link` адаптивный — светлеет в dark (`#60a5fa`), белый текст проваливает контраст (2.5:1). Coach Mark — **декор-идентичность**, цвет держится константой по теме (см. [expressive-palette-discovery §9](./proposals/expressive-palette-discovery.md)). Held `#2563eb` + белый = **4.6:1**, проходит AA в обеих темах.

**Синий текст на белом («Далее»/«New») — raw `#1d4ed8`, не токен** (решение 2026-08-05, вариант B). Отдельный applied-токен под синий текст не заводим — надобности нет, applied-синий в системе только как фон (`Background/Blue applied`). Значение `#1d4ed8` (Blue/700, глубже фона) выбрано для контраста с белой пилюлей; держится константой (raw = theme-invariant по определению). Это единственное raw-исключение в компоненте, осознанное — декор-идентичность одного инстанса.

**On-color триплет (held).** Насыщенная синяя поверхность требует held-контента и held-обводки — иначе адаптивные токены «плывут» в dark: `Accent/Link` (фон) светлеет, `Border/*` (обводка Outline) чернеет. Держим триплетом: `Background/Blue applied` (поверхность) + `Text&Icon/White applied` (контент) + `Border/White applied` (обводка). `Accent/Link` для поверхности ещё и **семантически неверен** (это роль ссылок).

> **Готово (2026-08-05):** App Color Palette опубликован, `Background/Blue applied` + `Border/White applied` импортированы в UI-Kit и привязаны — пузырь+12 хвостиков → `Background/Blue applied`, обводка «Назад» → `Border/White applied`. Проверено скриншотом в Light и Dark — **идентичны** (held, тема не влияет). Слой цвета — **только переменные**, стилей App Color Palette не ведёт (легаси).

---

## Отступления от дефолтных состояний компонентов

Coach Mark сидит на held-синей поверхности, поэтому вложенные компоненты **переопределяются на on-color (held)**. Это осознанные instance-override, а не новые варианты компонентов:

| Элемент | Дефолт компонента | Override в коаче | Причина |
|---|---|---|---|
| «Пропустить» (Button `Link`) | текст `Text&Icon/Link` (синий, адаптив) | текст → `Text&Icon/White applied` | белым на синем |
| «Назад» (Button `Outline`) | обводка `Border/*` + текст `Text&Icon/Primary` (адаптив) | обводка → `Border/White applied`, текст → `Text&Icon/White applied` | held-белые; адаптивные чернеют в dark |
| «Далее» (Button, primary-действие) | заливка `Accent/Primary` + on-color текст | заливка → `Text&Icon/White applied` (белая пилюля), текст → raw `#1d4ed8` | on-color primary |
| «New» badge | — | плашка белая (`Text&Icon/White applied`), текст raw `#1d4ed8` | акцент на синем |
| × Close, иконки | адаптивные | `Text&Icon/White applied` | белым на синем |

**Первопричина всех override — у Button нет on-color / inverse типа** (Primary/Secondary/Ghost/Outline/Negative/Soft Negative/Ghost Negative/Link). Системное решение на будущее — добавить on-color тип в Button (бэклог, [button-spec](./button-spec.md)); пока on-color достигается instance-override внутри коача. Единственное raw-значение (`#1d4ed8`, текст «Далее»/«New») — тоже следствие этого (см. [Цвета](#цвета), решение B).

---

## Поведение

- Пузырь позиционируется относительно якоря; `Tail` = сторона+позиция хвостика (наводит на якорь без сдвига пузыря). Auto-flip у края — рантайм.
- «Далее» листает шаги, «Назад» — назад, счётчик отражает прогресс. «Пропустить» и × закрывают тур.
- Появление/скрытие (fade + scale от якоря), morph при листании — на стороне кода.
- Затемнения (scrim/spotlight) нет — не реализуем.

---

## Доступность (a11y)

- Модальная выноска: фокус внутри, `aria-label` на шаге, кнопки — обычные `button`; Esc = «Пропустить»/закрыть.
- Контраст held-синего с белым — 4.6:1 (AA) в обеих темах.
- Тач-таргет «Пропустить» (Link, флеш по краю) держать ≥44px через hit-slop в коде (визуально флеш).
- Хвостик декоративен (`aria-hidden`).

---

## Синхронизация с кодом

```tsx
<CoachMark
  tail="03 Top right"      // 12 значений по часовой (сторона+позиция)
  title="Пригласите команду"
  showNew                  // бейдж New
  step={{current:2, total:5}}   // Counter
  body="…"
  actions                  // футер
  showSkip showBack        // Пропустить / Назад
/>
```

CSS-переменные:
```css
--cm-bg:      var(--background-blue-applied);   /* #2563eb held */
--cm-text:    var(--text-white-applied);        /* #fff */
--cm-accent:  #1d4ed8;                           /* raw one-off (не токен) — текст «Далее»/«New» на белом */
--cm-radius:  var(--radius-surface-surface);    /* 12 */
--cm-pad:     var(--spacing-4);                 /* 16 */
```

---

## История

**2026-08-05 — Coach Mark выделен в отдельный компонент** (из объединённого `Tooltip`).
- Ось `Tail` (12 по часовой) вместо Placement × Tail align; булевы проброшены (isExposedInstance).
- Цвет — applied/held (`Background/Blue applied`), не адаптивный `Accent/Link` (a11y в dark).
- «Пропустить» = Button `Type=Link` (заведён в библиотеку, флеш по краю текста); Skip — булев.
- Тень `Elevation/Floating` на фрейме (единый силуэт); хвостик — инсет 16 от углов; on-color кнопки.
- Кнопки Size 32.

## Связано
- [tooltip-spec.md](./tooltip-spec.md) · [popover-spec.md](./popover-spec.md) · [context-menu-spec.md](./context-menu-spec.md)
- [proposals/expressive-palette-discovery.md](./proposals/expressive-palette-discovery.md) §9 — applied-слой
- [button-spec.md](./button-spec.md) — Type=Link + бэклог on-color
- [pb-1580-discovery.md](./pb-1580-discovery.md)
