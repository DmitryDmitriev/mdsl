# ImageCard — спецификация компонента

Молекула поверх атома [`Image`](./image-spec.md): карточка фото фиксированной высоты с состояниями загрузки и угловыми action-оверлеями. Кейс — фото в подаче объявления (добавить / загружается / ошибка / готово с кнопками «редактировать» / «удалить»).

**Категория:** Organism (App image card).

> **Статус (2026-09-27): черновик из iOS-реализации** (LIOS-2687, MR !1418, паритет Android `AppImageCard` / LAA-3700). Спека собрана по коду iOS+Android в формате канона. **Figma-ноды молекулы в UI-Kit-Mobile ещё нет** — iOS и Android собирали по макетам Post-ad-flow и по канону атома `Image` (`image-spec.md`, Larixon Assets `2732:26`). Осталось: **завести компонент в Figma и сверить значения ниже**, после чего снять пометку «черновик».

---

## Обзор

ImageCard — карточка фото фиксированной высоты (`Size`), с четырьмя состояниями (`State`) и угловыми action-оверлеями поверх готового фото. Строится поверх атома `Image`.

- Ширина — **FILL** (по контейнеру).
- Тапа по всей карточке нет — интерактивны только **action-оверлеи** (углы) и **retry** (в Error).

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **State** | Empty, Loading, Error, Success |
| **Size** | Standard (h 160), Compact (h 108), Custom (любая высота) |

- **Empty** — плейсхолдер «добавить фото»: иконка + заголовок.
- **Loading** — индикатор загрузки + необязательный текст.
- **Error** — иконка + текст; вся центральная область — кнопка retry.
- **Success** — фото; поверх — угловые action-оверлеи.

---

## Анатомия

```
ImageCard (h по Size, FILL width, radius 12, clip)
├── Background                      — Empty / Loading / под фото: Background/Secondary; Error: Background/Tinted Negative
├── Center stack (Empty / Loading / Error) — иконка 24 + текст Body 2, по центру, gap 8
│   └── (Error) retry-область вокруг стека — padding 12×8, radius control-md
├── Image (Success)                 — scale aspect fill; при отсутствии URL — фон Secondary
├── Leading action (Success)        — верхний левый угол
└── Trailing action (Success)       — верхний правый угол
```

---

## Размеры

| Элемент | Параметр | Значение | Токен |
|---|---|---|---|
| Карточка | height | 160 / 108 / custom | — |
| Карточка | radius | 12 | `radius/surface/surface` |
| Иконка состояния | size | 24 | `size/sm` |
| Иконка ↔ текст | gap | 8 | `spacing/2` |
| Текст | max lines | 2 | — |
| Контент | horizontal inset | 16 | `spacing/4` |
| Retry-область (Error) | padding | 12 × 8 | `spacing/3` × `spacing/2` |
| Retry-область | radius | 8 | `radius/control-md` |
| Action: тап-зона | size | 40, впритык к углу | `control-height/sm` |
| Action: круг | size | 24 | `size/sm` |
| Action: иконка | size | 16 | `size/xxs` |

---

## Цвета

| Элемент | Токен |
|---|---|
| Фон Empty / Loading / под фото | `Background/Secondary` |
| Фон Error | `Background/Tinted Negative` |
| Иконка и текст состояния | `Text&Icon/Primary` |
| Индикатор загрузки | `Text&Icon/Primary` (системный activity indicator, medium) |
| Action: круг | `Background/Overlay` |
| Action: иконка | `Text&Icon/White Applied` |

Оверлей действий — по [composition-rules](./composition-rules.md) §11 (скрим `Background/Overlay` + белый глиф).

---

## Поведение

- **Empty** — иконка + заголовок (например, «Добавить фото»); пустой заголовок не резервирует строку.
- **Loading** — индикатор + необязательный текст.
- **Error** — иконка + текст; вся центральная область — кнопка retry.
- **Success** — фото; action-оверлеи показываются **только** в Success, даже если заданы для других состояний.
- Нажатие на action: highlight — прозрачность 0.6 (как у ButtonIcon).

---

## Доступность (a11y)

- У каждого action свой `accessibilityLabel`; тап-зона 40.
- Retry в Error — кнопка с текстом состояния.

---

## Синхронизация с кодом (iOS)

```swift
MDSLImageCardView(configuration: .init(
    state: .success(url),
    size: .standard,
    leadingAction: .init(icon: edit, accessibilityLabel: "Edit", onTap: {}),
    trailingAction: .init(icon: close, accessibilityLabel: "Delete", onTap: {})))
```

Иконки сторибука `ic_edit` / `ic_refresh` / `ic_add` сконвертированы из Android `shared-icons` (тот же Figma-экспорт).

---

## Связанные документы

- [image-spec.md](./image-spec.md) — атом Image (основа карточки)
- [composition-rules.md](./composition-rules.md) §11 — оверлей действий (скрим + белый глиф)
- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) · [COLOR-PALETTE.md](./COLOR-PALETTE.md)

---

## Остаётся сделать

1. ⏳ **Завести компонент ImageCard в Figma UI-Kit-Mobile** (State × Size) поверх атома `Image`.
2. ⏳ **Сверить значения** этой спеки с Figma-нодой (размеры/цвета/оверлеи) — после сверки снять статус «черновик».
3. ⏳ Внести в Confluence-реестр DS (Figma / iOS / Android).

---

## История

**2026-09-27 — черновик спеки заведён (LIOS-2687, ответ iOS).** Собран из iOS-реализации (MR !1418) в паритете с Android `AppImageCard` (LAA-3700). Компонента в Figma пока нет — обе платформы собирали по макетам Post-ad-flow. Значения (размеры/цвета/оверлеи) требуют сверки после сборки Figma-ноды.
