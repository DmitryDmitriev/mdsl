# Chat Bubble — спецификация

> ⚠️ **DEPRECATED / не используется.** Chat Bubble в продукте не применяется — договорённость команды (подтверждено 2026-08-19). Компонент в Figma не собран и собираться не планируется. Спека оставлена как **исторический артефакт** (цветовые решения tinted-баблов могут пригодиться при возврате чат-сценария), но из активного реестра выведена. Не поддерживать, в drift-аудит не включать.

Сообщение в чате (мессенджер, отзывы, support). Атомарный color-coded элемент с tinted-плашкой. **Компонент не реализован как формальный COMPONENT_SET в Figma** — спека фиксирует guideline для возможной будущей реализации.

---

## 1. Семантика типов

| Тип | Кто отправляет | Фон | Текст / иконка |
|---|---|---|---|
| **outgoing** | Текущий пользователь | `Background/Tinted/Info` | `Text&Icon/on Tinted/Info` |
| **incoming** | Собеседник | `Background/Secondary` или `Surface/Surface Primary` | `Text&Icon/Primary` |
| **question** | Системный вопрос («Уточните детали», FAQ-prompt) | `Decor/Bubble Old/Question` | `Text&Icon/Primary` |
| **answer** | Системный ответ / решение | `Background/Tinted/Info` | `Text&Icon/on Tinted/Info` |
| **admin** | Сообщение модератора / системы | `Decor/Bubble Old/Admin` | `Text&Icon/Primary` |
| **negative** | Отклонено / ошибка отправки / red flag от системы | `Background/Tinted/Negative` | `Text&Icon/on Tinted/Negative` |

**Outgoing vs Answer** — внешне неразличимы (оба Info-shade), потому что в продукте они никогда не появляются в одном экране одновременно: outgoing — мессенджер с собеседником, answer — system-prompt в FAQ/support. Если сценарий смешает их — пересмотрим.

**Incoming** — без tinted-плашки. Используется `Surface/Surface Primary` (Zinc/800 в Dark — приподнятая поверхность над фоном), чтобы визуально отделить «чужое» сообщение от системных tinted-баблов. Это сознательный design-decision: tinted = «у этого сообщения есть смысловая окраска», нейтральный фон = «обычный текст от собеседника».

---

## 2. Цветовые токены — почему `Decor/Bubble Old/*`?

Изначально для чат-баблов планировалось переиспользовать канонические `Background/Tinted/Question` и `/Admin`. После 2026-05-07 канонические токены удалены — нейтральная и admin-роли в системных компонентах закрыты `Background/Tinted/Neutral` и `Background/Tinted/Good`. Чат-баблы оставлены на отдельной легаси-группе `Decor/Bubble Old/Question` и `/Admin`:

- **Decor/Bubble Old/Question** (Zinc/100 / Zinc/800) — нейтральный shade для системных вопросов в чате.
- **Decor/Bubble Old/Admin** (Green/100 / Green/700) — модераторские сообщения. Слегка отличается от `Background/Tinted/Good` по тёмной shade (Green/700 vs Green/800), что даёт лёгкое визуальное различие admin vs success в Dark.

`Decor/Bubble Old/*` — единственное оставшееся легаси-наследство в новой палитре, изолированное за чат-сценарием. Когда чат-bubble будет реализован как формальный COMPONENT_SET — пересмотрим: либо мигрируем на canonical (Neutral / Good / Info), либо переименуем `Decor/Bubble/*` в каноническую группу без суффикса Old.

Текст на этих shade-плашках берётся из обычного `Text&Icon/Primary` (структурный компонент с tinted-фоном — см. `alert-spec.md` принцип цвета текста). Парный `Text&Icon/on Tinted/*` для чата не применяется.

**Applied-слой (§2.12/§3.9) на чат-баблы не влияет — проверено 2026-08-19.** Токены `Text&Icon/on Tinted/*` (outgoing / answer / negative) — **adaptive** (Color/800 Light → Color/50 Dark, §2.8), не held. Они сидят на adaptive-плашке `Background/Tinted/*` (50-shade Light → 900-shade Dark, §2.7), поэтому пара «фон + текст» адаптируется синхронно и контраст держится внутри каждой темы (8.7–9.5:1). Held-слой `* applied` нужен только когда on-color-текст лежит на **theme-invariant** декор-поверхности или произвольном медиа (coach mark, tier-бейдж, элементы над фото) — у чат-бабла такого сценария нет. По тесту §3.9 chat bubble — функциональная/adaptive ветка. **Менять на `applied` не нужно.**

---

## 3. Структура

```
ChatBubble (HORIZONTAL container, выравнивание по типу)
├── [avatar] (Avatar Type=Letter|Photo, Size=S или M) — опционально, только в групповых чатах
├── bubble-frame (VERTICAL stack, FILL/HUG, padding 8/12, radius 16)
│   ├── [author-name] (Caption sm Medium, Text&Icon/Secondary) — только в группах, не для outgoing
│   ├── content (Body 2 / Body 1 в зависимости от длины)
│   ├── [attachment] (image/file/quote) — опционально, в общем layout
│   └── meta-row (HORIZONTAL, gap 4)
│       ├── timestamp (Caption sm, Text&Icon/Tertiary — для нейтральных или Text&Icon/on Tinted/{type} с opacity 0.6)
│       └── [status icon] (read/sent/error — только для outgoing)
└── [status badge] (для admin / negative — иконка слева от bubble)
```

**Выравнивание:**
- `outgoing` — bubble справа, без аватара, max-width ~75%
- `incoming` / `question` / `answer` / `admin` — bubble слева, с аватаром (или иконкой), max-width ~75%
- `negative` — слева или справа в зависимости от того, чьё сообщение ошибочно; визуально маркируется иконкой `ic_warning_circle` в meta-row

---

## 4. Размеры и токены

| Параметр | Значение | Токен |
|---|---|---|
| Padding bubble | 8 vert, 12 horiz | `spacing/2`, `spacing/3` |
| Gap внутри (text → meta) | 4 | `spacing/1` |
| Radius bubble (default) | 16 | `radius/4` |
| Radius bubble (sticky group corner) | 4 | `radius/1` (см. §6 sticky-corners) |
| Avatar size в чате | 32 (M) или 24 (S) | `size/md` / `size/sm` |
| Max-width контейнера | 75% от ширины screen | вычисляемое |
| Vertical gap между bubbles одного автора | 4 | `spacing/1` |
| Vertical gap между bubbles разных авторов | 12 | `spacing/3` |

---

## 5. Типографика

| Элемент | Стиль |
|---|---|
| Author name | `Caption/caption-sm Medium` (10/12, weight 500) |
| Content (короткий) | `Base/Body 2` (14/20, weight 400) |
| Content (длинный, многострочный) | `Base/Body 2` |
| Timestamp | `Caption/caption-sm` (10/12, weight 400) |

---

## 6. Sticky corners (групповые сообщения)

Когда от одного автора подряд идёт несколько сообщений — bubble'ы визуально объединяются, угол со стороны автора «прилипает» (radius `4` вместо `16`). Правила:

| Позиция в группе | Top-corner со стороны автора | Bottom-corner со стороны автора |
|---|---|---|
| Single (одно сообщение) | 16 | 16 |
| First (первое в группе) | 16 | 4 |
| Middle (среднее) | 4 | 4 |
| Last (последнее) | 4 | 16 |

«Сторона автора» — это сторона, где находятся bubble'ы данного автора (правая для outgoing, левая для incoming).

Углы со стороны собеседника всегда `radius/4` (16).

---

## 7. Pressed / Long-press

- **Pressed** — **решено 2026-08-19: отдельный pressed-токен не заводим.** Общей шкалы pressed-состояний в палитре нет, а плодить токен под один негеометризованный чат-фрагмент — против правила DS. Обратную связь на нажатие даёт **нативный платформенный highlight** (Android ripple, iOS system highlight), не DS-overlay. Если позже появится общий слой pressed/hover (см. отложенный вопрос в `COLOR-PALETTE.md`) — чат-бабл переиспользует его, без собственного токена.
- **Long-press** — открывает action menu (reply, copy, forward, delete). Bubble визуально не меняется до открытия меню.

---

## 8. Состояния отправки (outgoing only)

Иконка статуса в meta-row справа от timestamp:

| Статус | Иконка | Цвет |
|---|---|---|
| Sending | `ic_clock` | `Text&Icon/Tertiary` |
| Sent | `ic_check` | `Text&Icon/Tertiary` |
| Delivered | `ic_check_double` | `Text&Icon/Tertiary` |
| Read | `ic_check_double` | `Accent/Link` (синий) |
| Error | `ic_warning_circle` | `Text&Icon/Negative` |

---

## 9. Использование

```tsx
<ChatBubble type="outgoing" content="Привет!" timestamp="14:32" status="read" />
<ChatBubble type="incoming" author="Иван" avatar={...} content="Здравствуйте" timestamp="14:33" />
<ChatBubble type="question" content="Уточните, пожалуйста, цвет товара" />
<ChatBubble type="admin" content="Объявление было перемещено в архив" />
<ChatBubble type="negative" content="Сообщение не отправлено" />
```

---

## 10. Открытые вопросы

**Закрыто 2026-08-19:**

1. ~~Оформить как формальный COMPONENT_SET в Figma~~ — **решено: не в эту волну, остаётся guideline-only.** ChatBubble живёт как набор фрагментов в чат-экранах; формальный COMPONENT_SET заводим только после продуктовой валидации реальных сценариев (avatar-в-группах, sticky-corners, attachment). До тех пор спека — контракт для фрагментов, не Figma-компонент. Пере-оценивать при появлении задачи на чат/мессенджер.
2. ~~Pressed-overlay токен~~ — **решено: свой токен не заводим** (см. §7). Pressed = нативный highlight; при появлении общего pressed/hover-слоя переиспользуем его.

**Остаются открытыми:**

3. **Quoted reply / attachment-bubble** — отдельный паттерн внутри content; нужно отрисовать примеры до фиксации в спеке.
4. **Reactions** — стикеры/эмодзи поверх bubble; пока не фиксируем.

---

## 11. Связь с другими компонентами

- `Decor/Bubble Old/Question`, `/Admin` — **только** в чате. Для нейтральных бейджей и других color-coded элементов вне чата — `Background/Tinted/Neutral` (см. `badge-spec.md`).
- Avatar в чате — стандартный компонент `Avatar v2`, размеры S/M.
- Status badge для error — иконка из ic_*-набора.
