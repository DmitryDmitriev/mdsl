# Notification Slot — правило композиции

**Это не компонент.** Notification Slot — **правило композиции** (как [composition-rules.md](./composition-rules.md), [spacing-semantic.md](./spacing-semantic.md)) для overlay-индикаторов поверх icon-bearing control'ов и avatar'ов.

Привязка к [badge-spec.md §6.2 Микро-индикаторы](./badge-spec.md) (atom-anchor), [chips-spec.md](./chips-spec.md), [avatar-spec.md §5](./avatar-spec.md) (consumer'ы).

---

## 1. Концепция

Notification Slot — это **именованная точка** в правом верхнем углу icon-bearing control'а или в правом нижнем углу avatar'а, в которую сажается мини-индикатор. Применяется когда control **не может сигналить состояние через text-content** (Chips Type=Icon, future Button-Icon) или когда нужно overlay-метить контейнер изображения (Avatar pin).

Slot решает один паттерн: **«есть что-то непрочитанное / применённое / активное / новое — без места под текст в самом control'е»**.

**Что НЕ Notification Slot:**
- Inline badge внутри List Item trailing-слота — это просто `Badge size=xs/sm/md` (см. badge-spec.md §6.1)
- Banner / Alert с фоновой подложкой — это Alert компонент
- Tooltip / Hint с указкой — отдельный паттерн, не slot

---

## 2. Anchor atom (что физически кладётся в slot)

Дефолтный anchor — **`Badge size=2xs`** (см. [badge-spec.md §6.2](./badge-spec.md)):

| Вариант | Содержимое | Когда |
|---|---|---|
| **Dot** | Пустой Badge 2xs (только подложка 12×12) | Сигнал «есть/нет» |
| **Counter** | Badge 2xs с числом (16 height, min-width 16, caption-sm 10/12) | Сигнал «сколько» |

**Avatar Pin — исключение:** использует свою размерную шкалу (8/12/16/20/24, см. avatar-spec.md §5.1) — концептуально тот же Slot, но размер привязан к avatar size. Структурно реализован как Ellipse, не Badge instance (структурная миграция отложена до гармонизации шкал).

---

## 3. Размерные ограничения и use-case rule

**Размер control'а определяет availability** (что физически помещается):

| Control size | Dot | Counter |
|---|---|---|
| 32 dp | ✅ | ❌ (теряется читаемость числа) |
| 40 dp | ✅ | ❌ |
| 48 dp+ | ✅ | ✅ |

**Use-case определяет usage** (что выбирать когда оба доступны на 48 dp):

| Use case | Выбор |
|---|---|
| Cart, messages, notifications, unread items | **Counter** — количество само по себе информативно |
| Applied filters, status changed, settings updated | **Dot** — «есть/нет» достаточно |
| Online presence, verified mark (на avatar) | **Dot** |

Решение (2026-05-28): на 48 dp **оба варианта доступны — designer выбирает по задаче**. Filter case → dot, cart/messages → counter.

---

## 4. Позиционирование

| Anchor target | Поза dot | Поза counter |
|---|---|---|
| Icon control (chip, button-icon) | top-right corner, offset 8/8 (от внутреннего края) | top-right corner, offset 4/4 |
| Avatar | bottom-right, offset +2 dp наружу (см. avatar-spec.md §5.2) | — (avatar не носит counter) |

Точные offset'ы для chip — подбираются визуально на radius/2 = 8 углах (см. chips-spec.md). Counter имеет меньший offset потому что сам шире.

**Constraints:** `MAX` по обеим осям — индикатор остаётся в правом верхнем (нижнем для avatar) углу при resize родителя.

---

## 5. Цвет

**Default (spec'ом фиксирован):** `Accent/Primary`.

Это даёт DS-консистентность: avatar online-pin, chip applied-filter dot, button-icon unread counter — все используют один и тот же визуальный signal.

**Другие цвета — по обоснованию use case'а, через override на инстансе** (не через variant axis в master):
- `Accent/Negative` — destructive notification, errors («failed to send»)
- `Background/Decor/Cyan` или `Decor/Orange` — для информационных кейсов, где Primary неуместен

Spec **не вводит variant axis Color** на slot/badge для этого паттерна. Это сознательное решение чтобы не раздувать число variant'ов на consumer'ах (chips и т.п.). Designer override'ит fill на конкретном инстансе, если нужно.

---

## 6. Border (2px ring вокруг indicator'а)

Чтобы dot/counter **не сливался с фоном control'а**, под него кладётся 2px ring цвета фона control'а:

| Состояние control'а | Background control'а | Ring индикатора |
|---|---|---|
| Active=No (default) | `Background/Primary` (Outline) / `Background/Secondary` (Filled) | соответствующий цвет |
| Active=Yes | `Background/Secondary` (Outline) / `Background/Tertiary` (Filled) | соответствующий цвет |

**Реализация:** ring — это outer-stroke 2px на dot/counter в цвете, **bound to** соответствующий Background token control'а. В Figma — отдельный paint на ellipse/badge.

На master-уровне chip это решается **per-variant override**: каждый chip-Active variant имеет своё значение ring-цвета. См. chips-spec.md §«Notification axis».

---

## 7. Consumer'ы (компоненты, использующие slot)

| Component | Slot location | Anchor atom | Sizes |
|---|---|---|---|
| **Chips Type=Icon** | top-right (внешний край), offset 8/8 (dot) или 4/4 (counter) | Badge 2xs | Size=32/40 → None/Dot · Size=48 → None/Dot/Counter |
| **Avatar (pin)** | bottom-right, offset +2 dp | Ellipse (avatar-specific scale 8/12/16/20/24) | All avatar sizes |
| **Button-Icon** *(будущее)* | top-right | Badge 2xs | По размеру button-icon |

---

## 8. Counter overflow

При значении **> 99** counter показывает **«99+»**. Это сохраняет семантику «много» и позволяет различить 5 vs 200. Решение 2026-05-28.

Альтернативы (рассматривались, отвергнуты):
- Auto-fallback на dot — теряется семантика
- 999+ — не влезает в 16×16 без роста padding'а

---

## 9. Когда НЕ использовать slot

- Control имеет text-контент, который сам сигналит состояние (например, Chips Type=Text+Icon с лейблом «Active +2») — slot избыточен
- Indicator должен жить **внутри** control'а, а не overlay'ем (inline Badge в trailing list item)
- Indicator несёт системное состояние, для которого есть Alert/Snackbar/Dialog

---

## 10. Reference

- [badge-spec.md §6.2](./badge-spec.md) — Badge 2xs (anchor atom)
- [chips-spec.md](./chips-spec.md) — первый consumer с явным Notification axis
- [avatar-spec.md §5](./avatar-spec.md) — Pin как conceptual instance паттерна
- [composition-rules.md](./composition-rules.md) — другие composition rules
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — `Accent/Primary` (default), `Background/Primary`/`Secondary`/`Tertiary` (ring)

---

## История

**2026-05-28 — паттерн заведён.**

Контекст: задача My ads (Sellers Cabinets) на фильтр-баре потребовала overlay-индикатор на icon-only chip (⚙ More filters), где text-сигнал состояния невозможен. Из этого вырос общий DS-паттерн.

Решения зафиксированы в hub-сессии 2026-05-28: Notification как axis name, Badge 2xs как anchor, 48 dp как порог для counter, на 48 dp оба варианта доступны, цвет default Accent/Primary, counter overflow «99+».

Avatar Pin **не мигрирует структурно** на Badge 2xs в этой итерации из-за разной размерной шкалы (avatar pin = 8/12/16/20/24 vs Badge 2xs = фикс 16). Перефреймлен концептуально как specific instance паттерна — Figma-структура (Ellipse) сохранена. Открытый вопрос: гармонизировать шкалы или нет, в следующих итерациях.
