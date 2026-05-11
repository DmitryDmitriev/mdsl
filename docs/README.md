# Документация для разработки

Папка `docs/` — **спеки и фундамент** дизайн-системы. Источник правды для дизайна и разработки. Материалы исключительно для **Figma** в репозиторий не выкладываются.

> ⚠️ **Единственный источник правды — ветка `main` репозитория [`DmitryDmitriev/mdsl`](https://github.com/DmitryDmitriev/mdsl).** Любые другие копии — локальные клоны, выгрузки в Confluence, описания компонентов в Figma, скриншоты в Jira — **производные**. При расхождении верить только `main` через `raw.githubusercontent.com/DmitryDmitriev/mdsl/main/docs/...` или GitHub web.

## Структура

Реестр компонентов организован по **atomic design** (Brad Frost): Atoms → Molecules → Organisms → Special / System. **Внутри каждой категории — одна таблица со всеми компонентами** (готовые, в планах, отказанные) — статус показан в колонке.

Аналогичная разбивка:
- **Figma** UI-Kit-Mobile — страницы-разделители `━━━ ATOMS / MOLECULES / ORGANISMS / SPECIAL / DEPRECATED`
- **Confluence** `🎨 Design System` (space `itdep`, id `4349231142`) — централизованный реестр со статусами Figma / iOS / Android

**Atomic design — глоссарий:**

- **Atoms** — простые элементы, не делятся дальше (одна сущность, одна цель).
- **Molecules** — простые комбинации атомов с единой целью (поле = label + input + helper).
- **Organisms** — сложные композиции из атомов и молекул (Top App Bar, Empty State).
- **Special / System** — системные ассеты (имитация ОС, не часть UI).

## Легенда статусов

| Иконка | Значение |
|---|---|
| ✅ | Готов |
| 🔍 | На перепроверке (Figma ↔ docs ↔ код) |
| 🟡 | В работе |
| 🔵 | Review / pending merge |
| ⏳ | В планах |
| 📋 | To Do (не начат) |
| ⚠️ | Не делаем / Deprecated |
| ❌ | Системный (используем нативный) |
| ❓ | Под вопросом (guideline без формального компонента) |
| — | Не оценено / не применимо |

---

## Фундамент

| Файл | Назначение |
|------|------------|
| [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) | Spacing / Radius (включая новый `radius/0_5 = 2`) / Size / Control-height / Border, правила хардкода |
| [COLOR-PALETTE.md](./COLOR-PALETTE.md) | Цветовая семантика, Tinted-роли, Brand, правила Light/Dark |
| [TYPOGRAPHY.md](./TYPOGRAPHY.md) | Шрифт, стили текста, Heading / Body / Caption |
| [elevation-spec.md](./elevation-spec.md) | Elevation (3 токена: Top / Floating / Bottom) |

---

## Atoms 🧬

Простые элементы — одна сущность, не делятся дальше. **Все атомы в одной таблице**, включая планируемые.

| Компонент | Статус | Спека |
|-----------|--------|-------|
| Avatar v2 | 🔍 | [avatar-spec](./avatar-spec.md) |
| Badge | 🔍 | [badge-spec](./badge-spec.md) |
| Button | 🔍 | [button-spec](./button-spec.md) |
| ButtonIcon | 🔍 | [button-spec](./button-spec.md) |
| Checkbox (radius 2 px, M3) | 🔍 | [checkbox-spec](./checkbox-spec.md) |
| Chips | 🔍 | [chips-spec](./chips-spec.md) |
| Divider | 🔍 | [divider-spec](./divider-spec.md) |
| Home Indicator | 🔍 | — |
| Progress | 🔍 | — |
| Radio | 🔍 | [radio-spec](./radio-spec.md) |
| Skeleton — атомы (Block/Circle/Line) | 🔍 | [skeleton-spec](./skeleton-spec.md) |
| StatusBar Body | 🔍 | — |
| Switch | 🔍 | [switch-spec](./switch-spec.md) |
| Top Progress bar (Stories indicator) | 🔍 | — |
| Save Icon Button | ⏳ | — |
| Star Rating | ⏳ | — |
| Stepper | ⏳ | — |

---

## Molecules 🧪

Простые комбинации атомов с единой целью. Готовые + планируемые + отказанные — в одной таблице.

| Компонент | Статус | Спека / Примечание |
|-----------|--------|--------------------|
| Alert | 🔍 | [alert-spec](./alert-spec.md) |
| Buttons Stack | 🔍 | — |
| Check+Text | 🔍 | [checkbox-spec](./checkbox-spec.md) |
| FAB Bar | 🔍 | [fab-bar-spec](./fab-bar-spec.md) |
| Helpers / Info Line | 🔍 | — |
| Input v2 + Input v2 Stacked | 🔍 | [input-v2-spec](./input-v2-spec.md) |
| List Item | 🔍 | [list-item-spec](./list-item-spec.md) |
| Search v2 | 🔍 | [search-spec](./search-spec.md) |
| Segment Control (Android M3) | 🔍 | [segment-control-spec](./segment-control-spec.md) |
| Snackbar | 🔍 | — |
| Tab Bar | 🔍 | — |
| Tabs | 🔍 | [tabs-spec](./tabs-spec.md) |
| Tooltip | ⏳ | — |
| Accordion | ⏳ | — |
| Filter Chip Group | ⏳ | — |
| Banner / Promo | ⏳ | — |
| Range Slider | ⏳ | — |
| OTP Input | ⏳ | — |
| Phone Reveal Button | ⏳ | — |
| Currency Input | ⏳ | — |
| Phone Input | ⏳ | — |
| ~~Notification~~ | ⚠️ | Заменён `Alert` |
| ~~Toggle Group~~ | ⚠️ draft | Дублирует `Segment Control` |
| ~~iOS Segment Control~~ | ⚠️ | Заменён `Tabs` (Radix) |
| Chat Bubble | ❓ | [chat-bubble-spec](./chat-bubble-spec.md) — guideline, формального компонента нет |
| ~~Time Picker~~ | ❌ | Используем нативный iOS/Android picker |

---

## Organisms 🦴

Сложные композиции из атомов и молекул.

| Компонент | Статус | Спека / Примечание |
|-----------|--------|--------------------|
| Dialog (slots: Title/Description/Buttons Stack/Image) | 🔍 | [dialog-spec](./dialog-spec.md) |
| Empty State (Inline / Full-screen) | 🔍 | [empty-state-spec](./empty-state-spec.md) |
| Sheet / Sheets | 🔍 | [sheets-spec](./sheets-spec.md) |
| Skeleton / Listing Card (Grid + Wide) | 🔍 | [skeleton-spec](./skeleton-spec.md) |
| Skeleton / List Item | 🔍 | [skeleton-spec](./skeleton-spec.md) |
| Skeleton / Profile Header | 🔍 | [skeleton-spec](./skeleton-spec.md) |
| Top App Bar v2 | 🔍 | [top-app-bar-spec](./top-app-bar-spec.md) |
| Listing Card (Grid + Wide) | ⏳ | — |
| Image Gallery | ⏳ | — |
| Carousel | ⏳ | — |
| ~~Confirmation preset for Dialog~~ | ⚠️ | Покрывается стандартным `Dialog` |
| ~~DialogIllustration~~ | ⚠️ | Use-case основного `Dialog` (Image=true) |

---

## Special / System ⚙️

Имитация ОС, не часть UI-компонентов как таковых.

| Элемент | Статус | Спека |
|---------|--------|-------|
| Keyboard iOS / Android | 🔍 | — |
| Stories / Progress Indicator | 🔍 | — |

---

## Источники правды

- **Confluence-страница** [🎨 Design System](https://larixon.atlassian.net/wiki/spaces/itdep/pages/4349231142/Design+System) — реестр со статусами Figma / iOS / Android (колонки iOS/Android заполняет разработка). Аудиты компонентов и вопросы по дизайну — footer-комментарии на этой странице.
- **Figma UI-Kit-Mobile** `PI2N65xbeJPTc5oWhOP7Bl` — компоненты сгруппированы по `━━━ ATOMS / MOLECULES / ORGANISMS / SPECIAL / DEPRECATED`.
- **GitHub `DmitryDmitriev/mdsl`** — markdown-спеки в этом каталоге `docs/`.

## Очередь реализации (исторический trail)

Phase 1 почти завершён; здесь оставлено как исторический контекст порядка реализации:

1. **Divider** — XS, один токен-цвет.
2. **Switch / Checkbox / Radio** — S, изолированные контролы.
3. **Chips** — M, после атомов; visible win в фильтрах.
4. **List Item** — M, разблокирует контент Sheets и меню.
5. **FAB Bar** — M, использует готовый Button.
6. **Input v2** → **Search v2** — L, Search строится на Input.
7. **Top App Bar v2** — L, использует Button/Avatar/Badge.
8. **Dialog** — L, в конце (составной).
