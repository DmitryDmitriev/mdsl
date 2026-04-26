# Спецификация компонента Sheets

Sheets (шит) — выезжающая панель поверх контента (bottom sheet или top sheet). Использует только семантические токены дизайн-системы. Спецификация: **docs/DESIGN-TOKENS.md**, **docs/COLOR-PALETTE.md**.

---

## 1. Семантика и варианты

| Вариант | Роль | Описание |
|---------|------|----------|
| **anchor** | Позиция | `bottom` — панель выезжает снизу (по умолчанию); `top` — сверху |
| **size** | Высота панели | `full` — на весь экран; `half` — 50% высоты вьюпорта; `auto` — по контенту (с max-height) |
| **withHandle** | Индикатор перетаскивания | Показывать «ручку» (полоску) сверху панели для жеста drag |
| **withHeader** | Заголовок | Фиксированный хедер с заголовком и опциональной кнопкой закрытия |

---

## 2. Токены

### 2.1 Подложка (backdrop)

| Параметр | Токен / значение |
|----------|------------------|
| Фон | semantic.background.overlay |
| Поведение | Клик по подложке закрывает шит (опционально, настраивается) |

### 2.2 Панель (panel)

| Параметр | Токен / значение |
|----------|------------------|
| Фон | semantic.surface.primary |
| Ширина | **360 px** (минимальная; при более широком экране растягивается или остаётся 360 — в зависимости от платформы) |
| Скругление (сторона открытия) | radius.overlay (**16 px**) — верхние углы для bottom, нижние для top; устанавливается **на корне** панели, `clipsContent: true` |
| Скругление (противоположная сторона) | 0 (прижата к краю экрана) |
| Толщина бордера (опционально) | border/default (1 px) |
| Цвет бордера | semantic.border.default (только со стороны, не прижатой к краю) |

### 2.3 Ручка (handle)

| Параметр | Токен / значение |
|----------|------------------|
| Ширина | 40 px (spacing/10) |
| Высота | 4 px (spacing/1) |
| Радиус | radius.pill |
| Фон | semantic.text.tertiary |
| Отступ сверху | stack-sm (16 px) |
| Отступ снизу (до контента/хедера) | stack-sm (16 px) |
| Выравнивание | По центру по горизонтали |

### 2.4 Хедер (при withHeader)

| Параметр | Токен / значение |
|----------|------------------|
| Padding horizontal | space → spacing/4 (16 px) |
| Padding vertical | spacing/3 (12 px) |
| Gap между заголовком и кнопкой закрытия | spacing/2 (8 px) |
| Разделитель под хедером | divider/default (1 px), color semantic.border.default |
| Текст заголовка | typography (см. TYPOGRAPHY.md): заголовок панели — например 16–18 px, weight 600; color semantic.text.primary |
| Иконка закрытия | 24×24 px, color semantic.text.secondary |

### 2.5 Контент (body)

| Параметр | Токен / значение |
|----------|------------------|
| Padding | stack-md (24 px) по вертикали, spacing/4 (16 px) по горизонтали |
| Вертикальный gap между блоками контента | stack-sm (16 px) или stack-md (24 px) по смыслу |
| Цвет текста | semantic.text.primary / text.secondary по контексту |

### 2.6 Размеры панели (size)

| size | Поведение |
|------|-----------|
| full | height: 100% (или 100dvh); скругление только у верхних углов (bottom sheet) |
| half | height: 50dvh (или 50%); скругление как у full |
| auto | min-height по контенту; max-height: 90dvh; overflow-y: auto; скругление как у full |

---

## 3. Состояния

- **Закрыт** — панель скрыта (вне экрана или opacity: 0, pointer-events: none).
- **Открыт** — панель видима, подложка затемнена.
- **Перетаскивание** (опционально) — при свайпе по ручке или панели панель следует за жестом; по отпусканию — открыто/закрыто по порогу.

Анимация: открытие/закрытие по трансформации (translateY) или высоте, длительность 200–300 ms, easing ease-out / cubic-bezier.

---

## 4. Доступность

- **role="dialog"** и **aria-modal="true"** для панели.
- **aria-labelledby** на заголовок при withHeader.
- Фокус при открытии — в первый фокусируемый элемент внутри панели или на кнопку закрытия.
- Trap focus внутри панели; при закрытии — возврат фокуса на триггер.
- Закрытие по Escape.

---

## 5. API компонента (рекомендуемое)

- **open** (boolean) — открыт / закрыт.
- **onClose** (function) — вызывается при запросе закрытия (клик по backdrop, Escape, кнопка закрытия).
- **anchor** ('bottom' | 'top') — сторона появления.
- **size** ('full' | 'half' | 'auto') — размер панели.
- **withHandle** (boolean) — показывать ручку.
- **withHeader** (boolean) — показывать хедер.
- **title** (string, optional) — заголовок хедера.
- **children** — контент панели.
- **closeOnBackdropClick** (boolean, default true) — закрывать по клику на подложку.

---

## 6. Сводная таблица токенов

| Параметр | Токен / значение |
|----------|------------------|
| Backdrop fill | semantic.background.overlay |
| Panel fill | semantic.surface.primary |
| Panel radius (открытый край) | radius.overlay (16 px) |
| Handle width | 40 px |
| Handle height | 4 px (spacing/1) |
| Handle fill | semantic.text.tertiary |
| Handle radius | radius.pill |
| Handle margin top/bottom | stack-sm (16 px) |
| Header padding H | spacing/4 (16 px) |
| Header padding V | spacing/3 (12 px) |
| Header gap | spacing/2 (8 px) |
| Divider | divider/default, semantic.border.default |
| Body padding vertical | stack-md (24 px) |
| Body padding horizontal | spacing/4 (16 px) |
| Title typography | 16–18 px, weight 600, semantic.text.primary |
| Close icon | 24×24, semantic.text.secondary |

---

## 7. Ссылки

- Токены: **docs/DESIGN-TOKENS.md**
- Цвета: **docs/COLOR-PALETTE.md**
- Типографика: **docs/TYPOGRAPHY.md**
- Спека диалога (связанный паттерн): **docs/dialog-spec.md**

---

## 8. История решений

**2026-04-23 — согласование по аудиту модалок.** По итогам скана продуктового файла (25 bottom sheet в макетах, 0 — инстансы DS-компонента, зоопарк радиусов 8/12/16) приняты:
- Радиус фиксирован на **16 px** по всей системе (`radius.overlay`) — устанавливается **на корне** панели с `clipsContent: true` (раньше скругление жило на Header-инстансе, что ломалось при подмене хедера)
- Ширина панели = **360 px** минимум
- `withHandle` — булева опция (не обязателен, но сохранён как паттерн для свайп-закрытия)
- `withHeader` — булева опция

---

## Аудит покрытия токенами

| Component | Color | Token | Type | Overall |
|---|---|---|---|---|
| Header | 100% | 75% | 100% | 80% |
| HandleContainer | 33% | 19% | — | 21% |
| **Среднее** | 67% | 47% | — | **53%** |

Что осталось: HandleContainer — Type=Handler width/height (физический размер ручки) и логотип-фоны (декоративные изображения, не токены). Header — HandleBar w ×4, HandleContainer itemSpacing ×4.

Building blocks `.=Leading` и `.=Trailing` исключены из аудита.
