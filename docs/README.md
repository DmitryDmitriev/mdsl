# Документация для разработки

Папка `docs/` — **спеки и фундамент** дизайн-системы. Источник правды для дизайна и разработки. Материалы исключительно для **Figma** в репозиторий не выкладываются.

## Структура

Реестр компонентов организован по **atomic design** (Brad Frost): Atoms → Molecules → Organisms → Special / System. Аналогичная разбивка в Figma (страницы-разделители `━━━ ATOMS` / `━━━ MOLECULES` / `━━━ ORGANISMS` / `━━━ SPECIAL`) и в Confluence-странице `🎨 Design System` (space `itdep`, id `4349231142`).

**Atomic design — глоссарий:**

- **Atoms** — простые элементы, не делятся дальше (одна сущность, одна цель).
- **Molecules** — простые комбинации атомов с единой целью (поле = label + input + helper).
- **Organisms** — сложные композиции из атомов и молекул (Top App Bar, Empty State).
- **Special / System** — системные ассеты (имитация ОС, не часть UI).

## Легенда статусов

- ✅ Figma — компонент собран
- 🔍 На перепроверке (Figma ↔ docs ↔ код)
- ⏳ В планах
- ⚠️ Не делаем / Deprecated
- ❌ Системный (нативный)

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

Простые элементы — одна сущность, не делятся дальше.

| Компонент | Спека | Figma | Сложность |
|-----------|-------|-------|-----------|
| Avatar | [spec](./avatar-spec.md) | ✅ | S |
| Badge | [spec](./badge-spec.md) | ✅ | S |
| Button | [spec](./button-spec.md) | ✅ | M |
| ButtonIcon | [spec](./button-spec.md) (в button-spec) | ✅ | M |
| Checkbox | [spec](./checkbox-spec.md) | ✅ | S |
| Chips | [spec](./chips-spec.md) | ✅ | M |
| Divider | [spec](./divider-spec.md) | ✅ | XS |
| Home Indicator | — | ✅ | XS |
| Progress | — | ✅ | S |
| Radio | [spec](./radio-spec.md) | ✅ | S |
| Skeleton — атомы (Block/Circle/Line) | [spec](./skeleton-spec.md) | ✅ | S |
| StatusBar Body | — | ✅ | XS |
| Switch | [spec](./switch-spec.md) | ✅ | S |
| Top Progress bar (Stories indicator) | — | ✅ | S |

---

## Molecules 🧪

Простые комбинации атомов с единой целью.

| Компонент | Спека | Figma | Сложность |
|-----------|-------|-------|-----------|
| Alert | [spec](./alert-spec.md) | ✅ | S |
| Buttons Stack | — | ✅ | XS |
| Check+Text | [spec](./checkbox-spec.md) | ✅ | XS |
| FAB Bar | [spec](./fab-bar-spec.md) | ✅ | M |
| Helpers / Info Line | — | ✅ | XS |
| Input v2 + Input v2 Stacked | [spec](./input-v2-spec.md) | ✅ | L |
| List Item | [spec](./list-item-spec.md) | ✅ | M |
| Search v2 | [spec](./search-spec.md) | ✅ | L (зависит от Input) |
| Segment Control (Android M3) | [spec](./segment-control-spec.md) | ✅ | M |
| Snackbar | — | ✅ | S |
| Tab Bar | — | ✅ | M |
| Tabs | [spec](./tabs-spec.md) | ✅ | M |

---

## Organisms 🦴

Сложные композиции из атомов и молекул.

| Компонент | Спека | Figma | Сложность |
|-----------|-------|-------|-----------|
| Dialog | [spec](./dialog-spec.md) | ✅ | L |
| Empty State | [spec](./empty-state-spec.md) | ✅ | M |
| Sheet / Sheets | [spec](./sheets-spec.md) | ✅ | L |
| Skeleton / Listing Card (Grid + Wide) | [spec](./skeleton-spec.md) | ✅ | M |
| Skeleton / List Item | [spec](./skeleton-spec.md) | ✅ | S |
| Skeleton / Profile Header | [spec](./skeleton-spec.md) | ✅ | S |
| Top App Bar v2 | [spec](./top-app-bar-spec.md) | ✅ | L |

---

## Special / System ⚙️

Имитация ОС, не часть UI-компонентов как таковых.

| Элемент | Спека | Figma |
|---------|-------|-------|
| Keyboard iOS / Android | — | ✅ |
| Stories / Progress Indicator | — | ✅ |

---

## В работе (Phase 1, остатки)

| Компонент | Категория | Сложность |
|-----------|-----------|-----------|
| Tooltip | Molecule | M |
| Accordion | Molecule | M |

---

## В планах — Phase 2 (classifieds-specific)

Компоненты, специфичные для классифайдов. Дизайн ещё не начат.

| Компонент | Категория | Сложность |
|-----------|-----------|-----------|
| Listing Card (Grid + Wide) | Organism | L |
| Image Gallery | Organism | L |
| Filter Chip Group | Molecule | M |
| Banner / Promo | Molecule | M |
| Range Slider | Molecule | M |
| Save Icon Button | Atom | S |
| Carousel | Organism | M |
| OTP Input | Molecule | M |

---

## В планах — Phase 3

| Компонент | Категория | Сложность |
|-----------|-----------|-----------|
| Star Rating | Atom | S |
| Phone Reveal Button | Molecule | M |
| Currency Input | Molecule | M |
| Phone Input | Molecule | M |
| Stepper | Atom | S |

---

## Не делаем / Deprecated

| Компонент | Категория | Почему |
|-----------|-----------|--------|
| ~~Notification~~ | — | Заменён `Alert` |
| ~~Toggle Group~~ | — | Дублирует `Segment Control` (DRAFT-страница оставлена как trail) |
| ~~Confirmation preset for Dialog~~ | — | Покрывается стандартным `Dialog` |
| ~~Time Picker~~ | — | Используем системный нативный picker |
| ~~iOS Segment Control~~ | — | Заменён `Tabs` (Radix-стиль) |
| ~~DialogIllustration~~ | — | Use-case основного `Dialog` (Image=true) |
| Chat Bubble | под вопросом | Спека есть как guideline ([chat-bubble-spec.md](./chat-bubble-spec.md)), формального компонента нет |

---

## Очередь реализации (по скорости)

Логика: сначала атомарные контролы без зависимостей — они дают быстрый прирост покрытия и нужны для составных компонентов (List Item, Dialog, Sheets-контент). Это историческая логика Phase 1; на момент 2026-05-11 почти всё реализовано — здесь оставлено как trail.

1. **Divider** — XS, один токен-цвет.
2. **Switch / Checkbox / Radio** — S, изолированные контролы.
3. **Chips** — M, после атомов; visible win в фильтрах.
4. **List Item** — M, разблокирует контент Sheets и меню.
5. **FAB Bar** — M, использует готовый Button.
6. **Input v2** → **Search v2** — L, Search строится на Input.
7. **Top App Bar v2** — L, использует Button/Avatar/Badge.
8. **Dialog** — L, в конце (составной).

---

## Источники правды

- **Confluence-страница** [🎨 Design System](https://larixon.atlassian.net/wiki/spaces/itdep/pages/4349231142/Design+System) — с тремя статусами Figma / iOS / Android. Колонки iOS/Android заполняет разработка.
- **Figma UI-Kit-Mobile** `PI2N65xbeJPTc5oWhOP7Bl` — компоненты сгруппированы по `━━━ ATOMS / MOLECULES / ORGANISMS / SPECIAL / DEPRECATED`.
- **GitHub `DmitryDmitriev/mdsl`** — markdown-спеки в этом каталоге `docs/`.
