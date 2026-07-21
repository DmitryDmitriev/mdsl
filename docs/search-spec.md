# Search v2 — спецификация для разработки

**Один компонент — одна спека.** Компонент «Search v2» — поле поиска с единой архитектурой состояний, согласованной с Input v2.

Привязка к **docs/DESIGN-TOKENS.md**. Все цвета, размеры и радиусы — только через **существующие** токены системы. Компонентно-специфичные токены не используются.

Figma: страница **🟢 Search**, набор **Search v2** (COMPONENT_SET). Старый Search задепрекейчен 2026-04-20 (переименован в **⚠️ DEPRECATED / Search**), архитектура консолидирована под state-модель Input v2.

---

## Обзор

Search v2 — поле поиска с лидирующей иконкой 🔍, опциональной правой иконкой очистки и опциональным supporting-текстом снизу.

### Варианты (variants)

| Свойство | Значения |
|---|---|
| **Type** | Filled, Outline |
| **Size** | lg (56), md (48), sm (40) |
| **State** | Default, Focused, Editing, Filled, Disabled |

Итого **30 вариантов** = 2 × 3 × 5.

**Focused / Editing — два состояния активного ввода** (добавлено 2026-07-13, идентично Input v2):
- **Focused** («начало ввода») — поле в фокусе, **пустое**: серый плейсхолдер (`Text&Icon/Secondary`) + **каретка перед плейсхолдером**.
- **Editing** («продолжение / исправление») — поле в фокусе, **со значением**: значение `Text&Icon/Primary` + **каретка после текста** + иконка очистки × (`Right Icon` on).

Оба несут focus-обводку 2px (см. §Границы). Различие — наличие значения и позиция каретки.

Boolean-свойства (с дефолтными значениями):

| Свойство | Default | Почему |
|---|---|---|
| **Leading Icon** | on | Иконка 🔍 (`ic_search` из Assets) — базовый идентификатор паттерна поиска |
| **Right Icon** | **off** | Иконка очистки × (`ic_close` из Assets) — включается, когда пользователь ввёл значение |
| **Helper** | off | Supporting-текст — по запросу |

---

## Структура слоёв

```
Search v2 (COMPONENT) — VERTICAL, HUG, gap = spacing/1 (4)
├── Field (HORIZONTAL, FIXED height, center align)
│   ├── Leading Icon (INSTANCE 24 / ic_search, optional)
│   ├── Content      (FILL) → Input Text
│   └── Right Icon   (INSTANCE 24 / ic_close, optional, off by default)
└── Supporting Text (TEXT, optional) — Caption/caption-md (12/16)
```

**Важное проектное решение:** вертикальный padding внутри Field равен 0 — высота фиксирована, содержимое выровнено по центру.

---

## Размеры

| Size | Height | Token | Padding H | Token | Gap | Token | Input font |
|---|---|---|---|---|---|---|---|
| **lg** | 56 | `control-height/lg` | 16 | `spacing/4` | 8 | `spacing/2` | Base/Body 1 (16/24) |
| **md** | 48 | `control-height/md` | 12 | `spacing/3` | 8 | `spacing/2` | Base/Body 2 (14/20) |
| **sm** | 40 | `control-height/sm` | 12 | `spacing/3` | 4 | `spacing/1` | Base/Body 2 (14/20) |

Иконки внутри поля — **24 × 24** (`size/sm`).

---

## Радиусы

Для всех размеров используется единый радиус, согласованный с Button lg/md/sm и Input v2.

| Элемент | Токен | Core | Значение |
|---|---|---|---|
| Field | `radius/control-lg` | `radius/lg` | 12 |

---

## Границы (Outline)

| Состояние | Токен | Core | Значение |
|---|---|---|---|
| Default, Filled, Disabled | `border/default` | — | 1 px |
| **Focused, Editing** | `border/emphasis` | — | **2 px** |

**Filled — обводка в активных состояниях (изменено 2026-07-13).** Раньше у Type=Filled обводки не было ни в одном состоянии → Filled Focused визуально не отличался от Filled Default. Теперь Filled получает **2px обводку `Border/Active`** в `Focused` и `Editing` — как Outline (то же решение, что в Input v2). В остальных состояниях (Default / Filled / Disabled) Filled остаётся без обводки.

---

## Цвета по состояниям

По **docs/COLOR-PALETTE.md**. Все значения привязаны к семантическим токенам.

| State | Filled BG | Stroke (Outline + Filled active) | Input Text | Icon | Supporting | Каретка |
|---|---|---|---|---|---|---|
| **Default** | `Background/Secondary` | `Border/Default` (1px) | `Text&Icon/Secondary` (placeholder) | `Text&Icon/Secondary` | `Text&Icon/Tertiary` | — |
| **Focused** | `Background/Secondary` | `Border/Active` (2px, оба Type) | `Text&Icon/Secondary` (placeholder) | `Text&Icon/Primary` | `Text&Icon/Tertiary` | `Text&Icon/Primary`, **перед плейсхолдером** |
| **Editing** | `Background/Secondary` | `Border/Active` (2px, оба Type) | `Text&Icon/Primary` (значение) | `Text&Icon/Primary` | `Text&Icon/Tertiary` | `Text&Icon/Primary`, **после значения** |
| **Filled** | `Background/Secondary` | `Border/Default` (1px) | `Text&Icon/Primary` | `Text&Icon/Secondary` | `Text&Icon/Tertiary` | — |
| **Disabled** | `Background/Tertiary` | `Border/Disabled` | `Text&Icon/Tertiary` | `Text&Icon/Tertiary` | `Text&Icon/Tertiary` | — |

**Примечание:** placeholder в Default использует `Text&Icon/Secondary` (не `Tertiary`) — чтобы визуально отличать от Disabled, где текст — `Text&Icon/Tertiary`. То же правило, что и в Input v2.

### Каретка (курсор)

Элемент `Caret` — вертикальная полоса позиции ввода, идентична Input v2.

| Параметр | Значение |
|---|---|
| Ширина | 2 px |
| Высота | lg — 20; md/sm — 18 (по line-height поля, не токенизируется) |
| Радиус | 1 px |
| Цвет | `Text&Icon/Primary` (= цвет вводимого текста; плейсхолдер остаётся серым) |
| Позиция | `Focused` — перед плейсхолдером (первый элемент); `Editing` — после значения (последний) |

Каретка живёт внутри горизонтальной строки `Content` (`counterAxisAlignItems=CENTER`, gap 2): `[Caret, Input Text]` для Focused, `[Input Text, Caret]` для Editing. `Input Text` — вертикально HUG + `textAlignVertical=CENTER`; в Editing — `layoutGrow=0` (hug по ширине), чтобы каретка вставала вплотную к значению, а не уезжала к правому краю.

---

## Иконки

- **Leading Icon:** library instance `24 / ic_search` (fileKey `iRb5cHw514oCpucz44gjGv`). Fill применяется через override на внутренней ноде Union и привязан к Icon-токену, соответствующему состоянию.
- **Right Icon:** library instance `24 / ic_close`. Тот же паттерн.

Дизайнер может заменить на любую иконку из библиотеки через Swap Instance.

---

## Сводная таблица токенов

| Параметр | Search v2 lg | Search v2 md | Search v2 sm |
|---|---|---|---|
| **Height** | `control-height/lg` (56) | `control-height/md` (48) | `control-height/sm` (40) |
| **Padding H** | `spacing/4` (16) | `spacing/3` (12) | `spacing/3` (12) |
| **Gap** | `spacing/2` (8) | `spacing/2` (8) | `spacing/1` (4) |
| **Radius** | `radius/control-lg` (12) | `radius/control-lg` (12) | `radius/control-lg` (12) |
| **Icon size** | `size/sm` (24) | `size/sm` (24) | `size/sm` (24) |

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color (fills / strokes) | **100%** |
| 🔤 Typography | **100%** |
| 🔲 Tokens (общее) | **100%** |
| **Overall** | **100%** |

---

## Доступность (a11y)

- **Tap-зоны:** lg — 56, md — 48 соответствуют WCAG/HIG (≥ 44 pt); **sm = 40** — граничный, оборачивать в контейнер 44 pt при возможности.
- **Клавиатура:** Tab — фокус на input, Enter — submit, Esc — сброс фокуса/очистка.
- **Screen reader:** `role="search"`, `aria-label="Search"`, `aria-describedby` для Supporting.
- **Контраст:** placeholder `Text&Icon/Secondary` на `Background/Secondary` — проверить WCAG AA на реальных устройствах.

---

## Синхронизация с кодом

**Web (React):**
```tsx
<Search
  type="filled"    // "filled" | "outline"
  size="lg"        // "lg" | "md" | "sm"
  state="default"  // "default" | "focused" | "editing" | "filled" | "disabled"
  value={query}
  placeholder="Search"
  onChange={setQuery}
  onClear={clear}  // toggles Right Icon
  supporting="Press Enter to search"
/>
```

CSS-переменные (из существующих токенов):
```css
--search-height-lg:    var(--control-height-lg);   /* 56 */
--search-height-md:    var(--control-height-md);   /* 48 */
--search-height-sm:    var(--control-height-sm);   /* 40 */
--search-radius:       var(--radius-control-lg);   /* 12 */
--search-padding-h-lg: var(--spacing-4);           /* 16 */
--search-padding-h-md: var(--spacing-3);           /* 12 */
--search-padding-h-sm: var(--spacing-3);           /* 12 */
--search-gap-lg:       var(--spacing-2);           /* 8  */
--search-gap-md:       var(--spacing-2);           /* 8  */
--search-gap-sm:       var(--spacing-1);           /* 4  */
```

---

## Миграция со старого Search

| Old State | New State |
|---|---|
| Field, Default | Default (пусто + placeholder) |
| Edit | Focused (курсор активен) |
| Edit + Placeholder | Focused |
| New | Filled |

`Type=Field` → `Type=Filled` (консистентность с Input v2). Размеры 40/48/56 сохранены. Свойство `R_Icon#` → `Right Icon#`.

---

## Связанные документы

- [input-v2-spec.md](./input-v2-spec.md) — родительская архитектура state-модели
- [top-app-bar-spec.md](./top-app-bar-spec.md) — Search v2 используется в Content=Search
- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing, radius

---

## История миграций

**2026-07-13 — каретка + состояние Editing + Filled focus-обводка (синхронизация с Input v2).**

По фидбеку дизайна Search приведён к той же state-модели активного ввода, что и Input v2:
1. **Focused переосмыслен как «начало ввода»**: серый плейсхолдер (`Text&Icon/Secondary`) + **каретка перед плейсхолдером**. Content переведён в HORIZONTAL (был VERTICAL).
2. **Новое состояние `Editing`** («продолжение / исправление»): фокус-обводка + значение `Text&Icon/Primary` + **каретка после текста** + иконка очистки × (`Right Icon` on). +6 вариантов (2 Type × 3 Size). Итого **24 → 30**.
3. **Filled focus-обводка**: Type=Filled получил 2px `Border/Active` в Focused/Editing (раньше не отличался от Default).

Каретка — презентационный примитив (2 × line-height, radius 1, fill `Text&Icon/Primary`); высота не токенизируется. В Editing `Input Text` — `layoutGrow=0` (hug), чтобы каретка стояла вплотную к значению. Набор `Search v2` (`6447:268`).

**2026-05-12 — аудит готовности (component-spec-check).**

Компонент чистый — 24/24 варианта на canonical-токенах: padding / gap / radius / border / background / typography / colors / iconography — 100% покрытие.

Field height (`6447:101 … 6447:262`) проверен напрямую через Plugin API: на всех 24 вариантах `boundVariables.height` корректно ссылается на `control-height/lg` (8 lg-вариантов: 56 px), `control-height/md` (8 md: 48 px), `control-height/sm` (8 sm: 40 px). Codegen MCP эмитит `h-[56px]/48/40` как pixel-значения — это артефакт развёртки токенов в плагине, а не отсутствие биндингов в Figma.

Правок ни в Figma, ни в спеке не потребовалось.

Search v2 → ✅ готов к разработке.
