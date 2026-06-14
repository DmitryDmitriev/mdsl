# Snackbar — спецификация компонента

Молекула для коротких системных сообщений: «Сохранено», «Связь восстановлена», «Ошибка сети». Появляется временно поверх UI, может содержать кнопку действия и/или иконку закрытия.

**Figma:** страница **🟢 Snackbar**, COMPONENT_SET `Snackbar` (`4326:440`), 10 вариантов.

**Категория:** Molecule.

---

## 1. Обзор

Snackbar — temporary surface для feedback'а пользователю после действия (Save / Undo / Network error / Connection restored). Появляется снизу экрана с анимацией slide-up + fade-in, висит несколько секунд и уходит автоматически (или после нажатия action / close).

Семантически — **floating element**: плавает над контентом с отступами от краёв экрана, не примагничен к нижнему краю и не блокирует UI (можно тапать сквозь область вокруг плашки).

---

## 2. Варианты (variants)

| Свойство | Значения | Описание |
|---|---|---|
| **Configuration** | `Text only` / `Text & action` / `Text & longer action` | Состав плашки |
| **# of lines** | `One line` / `Two lines` | Высота сообщения |
| **Show close affordance** | `False` / `True` | Иконка-крестик справа |

Итого **10 вариантов** (не все комбинации валидны: `Text & longer action` существует только для `Two lines` — длинный текст вертикально сочетается только с action на новой строке).

### Configuration — раскладка

| Configuration | Layout | Структура | Когда |
|---|---|---|---|
| **Text only** | HORIZONTAL | Supporting text + опц. Close | Простой feedback без действия: «Сохранено», «Связь восстановлена» |
| **Text & action** | HORIZONTAL | Supporting text + Action button + опц. Close | Стандартный кейс с возможностью Undo / Retry / Open |
| **Text & longer action** | VERTICAL stack | Supporting text сверху; Action button + опц. Close affordance снизу (close — справа от action button) | Длинный текст не помещается рядом с action на одной строке → action переносится на отдельную строку под текстом |

---

## 3. Структура слоёв

```
Snackbar (COMPONENT) — pill-плашка, fixed width 344, padding варьируется
├── Supporting text (TEXT) — Base/Body 1 (16/24) для One line; Base/Body 2 (14/20) для Two lines / longer action
├── Action button (INSTANCE: Button sm Ghost Inverted) — опц., 4-line иконка/текст
└── Close affordance (INSTANCE: ButtonIcon Ghost Inverted, container 48×48, icon 24×24) — опц., при Show close affordance=True;
    в «Text & longer action» — в нижней action-строке справа от action button
```

- **Container width:** 344 px (FIXED, демонстрационное). В продакшене — `min(screen-width − 32, 344)` с горизонтальными отступами 16 px от краёв.
- **Background:** `Background/Inverted Primary` (Zinc/950 Light, Zinc/100 Dark) — инвертированная поверхность.
- **Text / Icon:** `Text&Icon/Inverted W-B` (#FFFFFF Light, #09090B Dark).
- **Shadow:** `Elevation/Floating` (см. §6 «Elevation»).
- **Radius:** `radius/1` (4 px) — flat плашка, не скруглённая capsule.

### Action button

Внутри snackbar — inline-control с собственными paddings. Технически это инстанс **Button sm Ghost Inverted** (40 px), что даёт touch-zone в пределах snackbar-высоты для Configuration=`Text & action / Text & longer action`. Цвет лейбла наследуется от `Button/*` токенов (после Inverted-override — `Text&Icon/Inverted W-B`).

---

## 4. Таблица токенов

### Размеры и отступы

| Параметр | Значение | Токен |
|---|---|---|
| Container width | 344 px | hardcoded (демонстрационное) |
| Container min-h (`One line`) | 48 | `control-height/md` |
| Container min-h (`Two lines`) | 68 / 112 (longer action) | hardcoded под контент |
| Padding vertical | 12 | `spacing/3` |
| Padding left | 16 | `spacing/4` |
| Padding right | 16 (text-only без action/close); 0 при наличии action button или close affordance — trailing-компонент сам задаёт правый край | `spacing/4` / — |
| Gap text↔action (horizontal, Text & action) | 4 | `spacing/1` |
| Gap content-row↔action-row (vertical, Text & longer action) | 12 | `spacing/3` |
| Action button | sm (40 px) | `control-height/sm` (через инстанс) |
| Close container (touch target) | 48 × 48 | `size/xl` |
| Close icon (внутри) | 24 × 24 | `size/sm` (через ButtonIcon-инстанс) |
| Close state-layer padding | 8 | `spacing/2` |
| Radius плашки | 4 | `radius/1` |

### Цвета

| Элемент | Токен | Light | Dark |
|---|---|---|---|
| Background плашки | `Background/Inverted Primary` | Zinc/950 | Zinc/100 |
| Supporting text | `Text&Icon/Inverted W-B` | #FFFFFF | #09090B |
| Action label | `Text&Icon/Inverted W-B` (через Button Inverted) | #FFFFFF | #09090B |
| Close icon | `Text&Icon/Inverted W-B` | #FFFFFF | #09090B |

### Типографика

| Элемент | Стиль | Размер |
|---|---|---|
| Supporting text — One line | `Base/Body 1` | Inter 16/24 Regular |
| Supporting text — Two lines / longer action | `Base/Body 2` | Inter 14/20 Regular |
| Action label | `Base/Body 2 Medium` | Inter 14/20 Medium |

---

## 5. State (default / pressed / hover)

**State-axis в variant-матрицу не добавляется.** Snackbar — temporary surface, pressed/hover у самой плашки нет (плашка не интерактивна — клики проходят сквозь).

Pressed/hover есть только у вложенных **Action button** и **Close icon** — оба инстансы Button-системы (Ghost Inverted), pressed обрабатывается на платформе:
- **iOS** — opacity 0.6 на нажатии (system).
- **Android** — Material ripple на нажатии (system, цвет `White Alpha/16`).
- **Web** — `:hover` + `:active` overlay через `Background/Inverted Hover/Pressed` (если будем поднимать в DS).

В Figma явный visual state не нужен — каждый Button-инстанс показывает свой Default-вид.

---

## 6. Elevation

Snackbar использует **`Elevation/Floating`** — единый shadow-стиль для floating elements (drop-shadow вокруг всего элемента, не направленный вверх/вниз).

В Dark theme `Elevation/Floating` рендерится без тени (тени на тёмном фоне нечитаемы) — отделение от фона достигается через `Background/Inverted Primary` ≠ `Background/Primary` (инвертированная поверхность сама создаёт контраст).

---

## 7. Анимация и время показа

Параметры **не зашиты в Figma** — это runtime-фича, фиксируется на стороне платформы:

| Параметр | Рекомендация |
|---|---|
| Slide-up duration | 250 мс ease-out |
| Auto-dismiss (без action) | 4 с |
| Auto-dismiss (с action) | 6 с (даём время дотянуться) |
| Pause при наведении / VoiceOver | да |
| Слов больше N → action только Close | не делаем — длинные сообщения = `Text & longer action` Configuration |

---

## 8. A11y

- **Роль:** `role="status"` для информационных снэков, `role="alert"` — для ошибок (читается сразу VoiceOver / TalkBack).
- **aria-live:** `polite` (status) / `assertive` (alert).
- **Auto-dismiss:** при `prefers-reduced-motion: reduce` — anim упрощается до fade; auto-dismiss таймер удлиняется в 1.5×.
- **Action label:** имя действия описывает результат, не процесс: «Отменить», «Открыть», не «Нажмите чтобы отменить».
- **Close icon:** `aria-label="Закрыть"`, touch target 48×48 (icon 24×24 + state-layer padding 8dp); соответствует Material touch target.
- **Контраст:** `Text&Icon/Inverted W-B` (#FFFFFF) на `Background/Inverted Primary` (Zinc/950) = ≥ 18:1 (Light), WCAG AAA.

---

## 9. Использование

| Кейс | Применять |
|---|---|
| Подтверждение действия («Сохранено», «Скопировано») | **Snackbar Text only** |
| Подтверждение с возможностью undo | **Snackbar Text & action**, action = «Отменить» |
| Ошибка с retry | **Snackbar Text & action**, action = «Повторить» |
| Длинное системное сообщение | **Snackbar Text & longer action** |
| Критичная блокирующая ошибка | **Dialog** или **Alert**, не Snackbar |
| Persistent уведомление | **Alert** (inline-блок в потоке), не Snackbar |

**Snackbar не использовать** для:
- Запроса подтверждения (Confirm / Discard) — это Dialog.
- Длительных индикаторов прогресса — это Toast/Progress.
- Промо / маркетинговых сообщений — отдельный Banner-паттерн.

---

## 10. Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fills) | **100%** |
| 🔤 Typography | **100%** (`Base/Body 1` one-line, `Base/Body 2` two-line/longer-action, `Base/Body 2 Medium` action) |
| 🌑 Elevation | **100%** (`Elevation/Floating`) |
| 🔲 Spacing / Radius | **100%** (`spacing/*`, `radius/1`, `control-height/*`, `size/sm`, `size/xl`) |
| **Overall** | **100%** |

---

## 11. Связанные документы

- [button-spec.md](./button-spec.md) — Button sm Ghost Inverted (Action button внутри)
- [elevation-spec.md](./elevation-spec.md) — `Elevation/Floating`
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — `Background/Inverted Primary`, `Text&Icon/Inverted W-B`
- [TYPOGRAPHY.md](./TYPOGRAPHY.md) — `Base/Body 2`, `Base/Body 2 Medium`
- [alert-spec.md](./alert-spec.md) — соседний паттерн для inline-сообщений (persistent)
- [dialog-spec.md](./dialog-spec.md) — блокирующие сообщения с подтверждением

---

## 12. История миграций

**2026-06-14 — QA-reconciliation: 5 drift-вопросов Android (LAA-3773), снято по Figma-инспекции.**

Спека дополнена по результатам инспекции нод `4326:441`, `4326:465`, `4326:476`:

1. **Типографика supporting-text — адаптивная.** One-line = `Base/Body 1` (16/24); Two-line / longer action = `Base/Body 2` (14/20). Drift произошёл после аудита 2026-05-12 без обновления changelog'а. Figma верна, спека исправлена.
2. **Close container = 48×48** (`size/xl`), icon 24×24 внутри, state-layer padding `spacing/2` (8). В спеке было только `24×24` про иконку.
3. **TextLongerAction: close affordance живёт в нижней action-строке** справа от action button, а не рядом с текстом. Добавлено в §2 и §3.
4. **TextLongerAction: вертикальный gap content-row↔action-row = 12dp** (`spacing/3`). Добавлено в §4.
5. **Padding right = 0 при наличии action/close**; 16 только для text-only. Trailing-компонент сам задаёт правый край.

**2026-05-12 — аудит готовности (component-spec-check), 20 правок в Figma + новая спека.**

### Figma (20 правок)

- **2 text styles** на нодах `Supporting text`: `M3/body/medium` (Roboto 14/20 Regular) → **`Base/Body 2`** (Inter 14/20 Regular). Остальные 8 вариантов уже были на canonical (видимо, ранее частично мигрированы — массовая зачистка завершила).
- **2 fills** на нодах `Supporting text`: `Schemes/Inverse On Surface` → **`Text&Icon/Inverted W-B`**. Остальные 8 — уже canonical.
- **6 fills** на `Vector` нодах внутри Action button: **`Brand Color/Bazaraki` → `Text&Icon/Inverted W-B`**. Это была случайная брендовая привязка в action-кнопке (icon-tint), которая в любой brand-сборке кроме Bazaraki давала бы неверный цвет.
- **10 effect styles** на root-вариантах: `M3/Elevation Light/3` → **`Elevation/Floating`** (canonical). Floating выбран потому, что snackbar плавает над контентом с отступами от краёв, а не примагничен к viewport-edge.

### Decisions, зафиксированные в спеке

- **State axis (default / pressed) — не вводим.** Плашка snackbar не интерактивна, pressed есть только у внутренних Button / Close, обрабатывается на платформе (iOS opacity / Android ripple).
- **Sticky vs Floating** → **Floating**. Snackbar плавает с margin от краёв, не uphardcode к bottom-edge.
- **«Text & longer action»** — отдельный Configuration с вертикальным layout'ом (action на новой строке), не просто wrap длинного текста.
- **Анимация / время показа** — runtime-параметры, не зашиты в Figma. Рекомендации (4 с / 6 с с action, slide-up 250 мс) зафиксированы в §7.
- **Radius `radius/1` (4) на плашке + `radius/control/control-lg` (12) на Button внутри** — это разные элементы, не миксинг. Плашка остаётся на `radius/1` (Material-style flat snackbar).

Snackbar → ✅ готов к разработке.
