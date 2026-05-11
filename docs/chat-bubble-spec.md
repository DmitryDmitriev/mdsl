# Chat Bubble — спецификация

Сообщение в чате (мессенджер, отзывы, support). Атомарный color-coded элемент с tinted-плашкой. На момент написания **компонент не реализован как формальный COMPONENT_SET в Figma** — спека фиксирует guideline для будущей реализации и для текущих чат-фрагментов в продукте.

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

**Incoming** — без tinted-плашки. Используется нейтральная Surface/Background, чтобы визуально отделить «чужое» сообщение от системных tinted-баблов. Это сознательный design-decision: tinted = «у этого сообщения есть смысловая окраска», нейтральный фон = «обычный текст от собеседника».

---

## 2. Цветовые токены — почему `Decor/Bubble Old/*`?

Изначально для чат-баблов планировалось переиспользовать канонические `Background/Tinted/Question` и `/Admin`. После 2026-05-07 канонические токены удалены — нейтральная и admin-роли в системных компонентах закрыты `Background/Tinted/Neutral` и `Background/Tinted/Good`. Чат-баблы оставлены на отдельной легаси-группе `Decor/Bubble Old/Question` и `/Admin`:

- **Decor/Bubble Old/Question** (Zinc/100 / Zinc/800) — нейтральный shade для системных вопросов в чате.
- **Decor/Bubble Old/Admin** (Green/100 / Green/700) — модераторские сообщения. Слегка отличается от `Background/Tinted/Good` по тёмной shade (Green/700 vs Green/800), что даёт лёгкое визуальное различие admin vs success в Dark.

`Decor/Bubble Old/*` — единственное оставшееся легаси-наследство в новой палитре, изолированное за чат-сценарием. Когда чат-bubble будет реализован как формальный COMPONENT_SET — пересмотрим: либо мигрируем на canonical (Neutral / Good / Info), либо переименуем `Decor/Bubble/*` в каноническую группу без суффикса Old.

Текст на этих shade-плашках берётся из обычного `Text&Icon/Primary` (структурный компонент с tinted-фоном — см. `alert-spec.md` принцип цвета текста). Парный `Text&Icon/on Tinted/*` для чата не применяется.

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

- **Pressed** — кратковременное затемнение (overlay `alpha Black/10` поверх плашки). Использовать `Background/Overlay` или специфичный pressed-токен (когда заведём шкалу pressed states).
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

1. **Оформить как формальный COMPONENT_SET в Figma** — после реальной валидации в продукте сейчас ChatBubble существует как набор фрагментов в чат-экранах, не как переиспользуемый компонент DS.
2. **Pressed-overlay токен** — если решим вводить общий слой (см. comment в `COLOR-PALETTE.md` про Pressed / Hover отложенные состояния).
3. **Quoted reply / attachment-bubble** — отдельный паттерн внутри content; нужно отрисовать примеры до фиксации в спеке.
4. **Reactions** — стикеры/эмодзи поверх bubble; пока не фиксируем.

---

## 11. Связь с другими компонентами

- `Decor/Bubble Old/Question`, `/Admin` — **только** в чате. Для нейтральных бейджей и других color-coded элементов вне чата — `Background/Tinted/Neutral` (см. `badge-spec.md`).
- Avatar в чате — стандартный компонент `Avatar v2`, размеры S/M.
- Status badge для error — иконка из ic_*-набора.
