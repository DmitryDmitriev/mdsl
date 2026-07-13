# Спецификация компонента Dialog

Dialog — центрированное модальное окно поверх контента. Закрывается по подложке, по кнопкам действий или по Escape. Единый компонент с гибким контент-слотом и опциональной картинкой.

Связанный паттерн (выезжающие панели): **docs/sheets-spec.md**.

---

## 1. Принципы

- **Один компонент.** Все вариации (текстовый, с иконкой, с hero-иллюстрацией, success/error/notification) собираются из одного Dialog через свойства и Content-слот.
- **Слот-подход для контента.** Заголовок, описание, формы — внутри `Content`-слота.
- **Картинка — отдельная зона сверху.** Включается boolean `Image`. Внутри Image-зоны — swap-инстанс из библиотеки иллюстраций.
- **Кнопки — отдельный компонент.** Блок кнопок — инстанс `Buttons Stack` (см. button-spec.md), подменяется через swap-variant.
- **Без скролла как свойство.** Если контент высокий — дизайнер добавляет скролл сам внутри слота.

---

## 2. Структура

```
Dialog (root, 328 wide, radius 16, clipsContent)
├── Image (frame 328×180, optional)
│   └── img (instance — placeholder, swappable)
├── Content (frame, padding 20/16/0/16)
│   └── Text (frame)
│       ├── Header (row, minHeight 32)
│       │   ├── title (TEXT)
│       │   └── close wrapper (32×32, FIXED)
│       │       └── ButtonIcon (visibility = property `Close`)
│       └── Content slot
└── Buttons Stack (instance, FILL/HUG)
```

### Свойства (component properties)

| Property | Type | Default | Описание |
|----------|------|---------|----------|
| **Alignment** | variant | `Left` | `Left` — заголовок и текст по левому краю; `Center` — по центру |
| **Image** | boolean | `false` | Показать картинку сверху |
| **Close** | boolean | `true` | Показать кнопку ×. **Применяется только к `Alignment=Left`.** На `Alignment=Center` close-кнопка не показывается никогда (iOS-style: центральный диалог имеет CTA-кнопки Cancel/OK, close избыточен). См. §3.4 Header row. |
| **Content** | slot | — | Произвольный контент в padded-области |

---

## 3. Токены и размеры

### 3.1 Подложка (backdrop)

| Параметр | Токен / значение |
|----------|------------------|
| Фон | `semantic.background.overlay` |
| Поведение | Клик по подложке закрывает диалог (опционально, по умолчанию `true`) |

### 3.2 Панель (panel)

| Параметр | Токен / значение |
|----------|------------------|
| Фон | `semantic.surface.primary` |
| **Ширина** | **328 px** (= 360 − 16×2) |
| **Радиус** | `radius/surface/overlay` (**16 px**) на всех 4 углах |
| Clip content | `true` (картинка обрезается по верхним углам) |
| Тень | не применяется (диалог идёт поверх overlay) |
| Позиционирование | По центру экрана |

### 3.3 Image зона (при `Image=true`)

| Параметр | Значение |
|----------|----------|
| Ширина | 328 px (edge-to-edge, наследует ширину Dialog) |
| Высота | **180 px** |
| Layout | VERTICAL auto-layout, `align=CENTER/MAX` (иконка прижата к низу зоны) |
| Default content | Инстанс из библиотеки иллюстраций (Bell_02 как placeholder), 140×140 |
| Скругление | Через `clipsContent` родителя (верх 16, низ 0) |

**Подмена картинки:** через **Instance Swap** на вложенном инстансе (двойной клик внутрь Dialog → выделить иконку → правая панель → swap на нужный Asset). Если Image off — зона не рендерится.

**Размер иконки:** дефолт 140×140. Дизайнер может ресайзить (рекомендованный диапазон 88–180).

**Hero-картинка (полная ширина):** ставится размером 328×180, отдельная серия hero-ассетов (когда появится).

### 3.4 Content (slot)

| Параметр | Значение |
|----------|----------|
| Padding | `20/16/0/16` (top/right/bottom/left) |
| **Gap заголовок ↔ тело** (фрейм `Text`) | **`spacing/2` = 8 px** — канон |
| Gap вокруг блока текста (фрейм `Content`) | `space/stack/stack-sm` = 16 px |
| Заголовок | `Text&Icon/Primary` + **`Heading/H3 Bold`** (20/28, w700) |
| Описание | `Text&Icon/Primary` + **`Base/Body 1`** (16/24, w400) — диалог короткий и важный, читаемость идёт первым приоритетом (Body 1 = «multi-line читаемый абзац» из `TYPOGRAPHY.md` §4) |

#### Header row

- Строка с заголовком и (опционально) кнопкой ×.
- `minHeight = 32` — высота не схлопывается, когда Close=off.
- **`Alignment=Left` + `Close=on`** → close wrapper 32×32 в потоке справа от title; title слева, text-align по левому краю.
- **`Alignment=Left` + `Close=off`** → ButtonIcon внутри wrapper'а скрыт, обёртка остаётся 32×32 для стабильности layout'а (заголовок не съезжает).
- **`Alignment=Center`** → close wrapper **всегда скрыт** (visible=false на мастер-уровне), title занимает всю ширину 296 с text-align по центру. Boolean `Close` на Center-варианте **не применяется** — этот вариант не предусматривает close. См. §«Свойства» и Историю миграций 2026-06-01.

### 3.5 Buttons Stack (instance)

| Параметр | Значение |
|----------|----------|
| Компонент | `Buttons Stack` (см. button-spec.md) |
| Варианты | `One`, `Two Horisontal`, `Two Horisontal Reverce`, `Two Vertical`, `Three Vertical` |
| Sizing | `FILL/HUG` (растягивается по ширине Dialog 328) |
| Подмена | Instance Swap |

---

## 4. Состояния

- **Закрыт** — диалог скрыт (не рендерится / opacity: 0, pointer-events: none).
- **Открыт** — диалог видим, подложка затемнена, фокус внутри.

Анимация: fade-in + scale 0.95 → 1 для панели, fade-in для подложки. Длительность 150–200 ms, easing ease-out.

---

## 5. Доступность

- `role="dialog"` и `aria-modal="true"` на панели
- `aria-labelledby` на заголовок
- `aria-describedby` на описание
- Фокус при открытии — на первый фокусируемый элемент или на primary-кнопку
- Trap focus внутри диалога; при закрытии — возврат фокуса на триггер
- Закрытие по Escape

---

## 6. API компонента (рекомендуемое)

```ts
interface DialogProps {
  open: boolean;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;       // default true
  alignment?: "left" | "center";        // default "left"
  showCloseButton?: boolean;            // default true
  image?: ReactNode;                    // если есть — рендерится Image-зона 328×180
  children: ReactNode;                  // Content-слот
  actions: ReactNode;                   // Buttons Stack
}
```

---

## 7. Правила применения

1. **Диалог vs Sheet.** Диалог — для важных действий, требующих подтверждения (удаление, выход, ошибка). Sheet — для выбора, фильтров, длинных форм. Если контент высокий — используй Sheet.
2. **Не разносить информацию на уровни.** Если один диалог превращается в цепочку — пересмотри логику: возможно, это Sheet или отдельный экран.
3. **Всегда показывай хотя бы одну кнопку.** Диалог без действия — это уведомление, а не диалог.
4. **Текст заголовка** — короткий, глагольный («Удалить объявление?»).
5. **Текст описания** — объясняет последствия действия.
6. **Primary-кнопка** — справа в горизонтальном стеке (или сверху в вертикальном); выделяется цветом `Accent/Primary`.
7. **Картинка** — для эмоционального акцента (success / error / promo / онбординг). Использовать иконки из библиотеки иллюстраций; не вставлять произвольные фото.
8. **Alignment=Center** уместен для коротких сообщений с emotional accent (success, ошибка, благодарность). Для содержательных диалогов с длинным текстом — `Left`.

---

## 8. Deprecated

После объединения в единый компонент следующие компоненты помечены как deprecated:

- **`Basic dialog`** (ComponentSet, 312×H, r=28) → `[deprecated]`. Ширина 312 и радиус 28 не соответствовали системе.
- **`Dialog_IMG`** (Component, 328×340, r=28) → `[deprecated]`. Картинка теперь — boolean property + swap-инстанс в Image-зоне.
- **`img_container`** (старый, ComponentSet hero/square) → `[deprecated]`. Логика «hero/square» не нужна — иконки используются в родных пропорциях, центруются автоматически.

Перед публикацией библиотеки deprecated-компоненты переименовываются с префиксом `.=` (по правилу из `design_system_rules.md`) — становятся невидимы в Assets picker, но не ломают существующие инстансы.

В новых макетах использовать только канонический `Dialog` (ComponentSet `6632:39` в UI Kit Mobile).

---

## 9. Ссылки

- Токены: **docs/DESIGN-TOKENS.md**
- Цвета: **docs/COLOR-PALETTE.md**
- Типографика: **docs/TYPOGRAPHY.md**
- Кнопки: **docs/button-spec.md**
- Шторки: **docs/sheets-spec.md**

---

## 10. История решений

**2026-04-23 — аудит модалок.** Скан продуктового файла: 12 диалогов в 4 визуальных кластерах с зоопарком размеров (312/328/344) и радиусов (16/24/28/32). Зафиксировано:

1. **Единый компонент** — без вариантов «Basic / Editable / IMG»
2. **Ширина 328** (не 312) — отступы от краёв экрана 360 = 16 px с каждой стороны
3. **Радиус 16** через токен `radius/surface/overlay` (был 28 в `Basic dialog`)
4. **Scroll не вариант** — внутри Content при необходимости
5. **Кнопки — инстанс `Buttons Stack`**

**2026-04-25 — итерации UX компонента.** В процессе работы над Image-зоной:

1. Изначально Image был 328×120 — иконки выглядели зажато. Увеличена до **328×180** для естественного воздуха.
2. Иконка-иконка по умолчанию **140×140**, прижата к низу Image-зоны (`primaryAxisAlignItems=MAX`) — ближе к заголовку, сверху декоративный whitespace.
3. Подмена картинки — через **Instance Swap** вложенного инстанса (placeholder Bell_02). API не позволил создать formal `INSTANCE_SWAP` property — UI-механизм Figma полностью покрывает кейс.
4. Добавлен variant `Alignment=Left/Center`. В Center close-кнопка позиционирована **абсолютно** (top-right), title занимает полную ширину для честного центрирования без переноса при коротких заголовках.
5. Close wrapper всегда 32×32 FIXED — `Close=off` скрывает только иконку, обёртка остаётся для стабильности высоты Header row.
6. Buttons Stack установлен в **FILL** по горизонтали — ширина 328 без overrides.
7. Воздух между Content и Buttons убран — описание касается кнопки. Если визуально не хватает — добавим `paddingBottom` у Content в будущей итерации.

**Следующий шаг:** ревизия библиотеки иллюстраций — выровнять оптическую плотность всех ассетов (внутренний padding единый), чтобы при одинаковом размере 140×140 иконки выглядели одного веса.

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Color | **100%** |
| Token | 82% |
| Type | **100%** |
| **Overall** | **86%** |

### Покрыто токенами (применено 2026-04-26)

| Слой | Свойство | Токен |
|---|---|---|
| Header (строка заголовка) | itemSpacing | `spacing/3` (12) |
| **Text (заголовок ↔ тело)** | itemSpacing | **`spacing/2` (8)** — канон зазора title↔body |
| Content (вокруг блока текста) | itemSpacing | `space/stack/stack-sm` (16) |
| close wrapper | width × height | `size/md` (32) |
| close wrapper | itemSpacing | `spacing/2` (8) |

### Осталось без токенов (по решению)

Намеренно не токенизированы — это **фиксированные размеры визуальных ассетов**, не дизайн-решения через токены:

| Слой | Размер | Обоснование |
|---|---|---|
| **Dialog root** | width = 328 | Модалка не во всю ширину экрана. Формула: `Platform/Width − 2 × spacing/4 = 360 − 32 = 328`. Привязка не делается, чтобы не плодить токены. Документировано как hardcoded design-решение. |
| **Image (hero)** | 328 × 180 | Hero-зона иллюстрации. **Aspect-ratio ~16:9** — стандарт для иллюстраций. Будет проработано при ревизии токенов изображений. |
| **image** (внутри hero) | 140 × 140 | Размер ассета иллюстрации. Аналогично иконкам из библиотеки — задаётся самим ассетом, не токеном. |

Deprecated `[deprecated] Basic dialog` и `[deprecated] img_container` — исключены из аудита (помечены `.=` префиксом для скрытия из Assets).

**Roadmap:** проработать токены пропорций изображений (`image/hero-ratio`, `image/avatar-ratio` и т.п.) в рамках отдельной итерации развития ДС.

---

## История миграций

**2026-07-13 — разрешён конфликт зазора заголовок↔тело (token-аудит Android).** Спека на §3.4 указывала «Gap внутри = stack-sm (16)», что читалось как зазор title↔body; фактически 16 (`stack-sm`) — это gap внешнего фрейма `Content`, а зазор заголовок↔тело живёт на фрейме `Text` = **8 px (`spacing/2`)**. Код стоял на 8 (верно). §3.4 и токен-таблица уточнены (разведены три уровня gap: Header 12 / Text 8 / Content 16). Код не менялся.

**2026-06-01 (вечер) — Background/Overlay подключён к canonical.**

3 backdrop-фрейма Dialog'а (`Test`, `Test-2`, `Test-3` — demo backdrop'ы) переключены с `Background Old/Overlay` → canonical `Background/Overlay`. Визуально без изменений (одинаковые значения). Synced с Sheets (см. sheets-spec.md). Foundation-таск «`Background/Overlay` не подключён в UI-Kit-Mobile» закрыт.

**2026-06-01 — Close применяется только к Alignment=Left (Android drift report).**

Контекст: Android `/sync-mdsl-component` отчёт показал расхождение — на `Alignment=Center` close-кнопка не отрисовывалась в Figma (`close wrapper` имел `visible=false`), но boolean `Close` имел defaultValue=true. Designer toggle'я Close=true на Center-инстансе не получал кнопки — выглядело как баг.

Решение (design call): **center-aligned dialog не имеет close**, это iOS-конвенция (центральный диалог использует CTA Cancel/OK, close избыточен). Figma master корректен. Спека и код синхронизированы:

- Figma: на Center-варианте удалена dead binding `Close#6632:0 → ButtonIcon.visible` (раньше boolean управлял видимостью кнопки, но обёртка-frame всё равно была hidden — toggle ничего визуально не давал). Теперь Close binding живёт только на Left-варианте.
- Спека §«Свойства» и §3.4 «Header row»: уточнено что Close применяется только к `Alignment=Left`. На `Alignment=Center` close-wrapper всегда скрыт.
- Code-side: dev уберёт close-render для Alignment=Center (отдельный тикет).

**2026-05-12 — аудит готовности (component-spec-check), 2 правки Figma + sync спеки.**

Базовая модель совпадает со спекой (2 варианта `Alignment=Left/Center` + booleans `Image`/`Close`). Проверено ~25 параметров, расхождений 3 + 1 структурная аномалия + 1 foundation-typo.

**Figma (2 правки):**

- **`Buttons Stack` width** в обоих вариантах Dialog (инстансы `4701:343` и `6632:20`): `FIXED 360 px` → **`FILL` (328 px по ширине Dialog)**. Раньше стек был на 32 px шире модалки и срезался через `overflow-clip` — теперь корректно вписан.

**Спека:**

- §3.4 «Content (slot)» — типографика синхронизирована с фактическим Figma: заголовок = **`Heading/H3 Bold`** (20/28, w700) + `Text&Icon/Primary`; описание = **`Base/Body 1`** (16/24, w400) + `Text&Icon/Primary`. Старые формулировки «16–18 px / weight 600», «14 px / weight 400 / semantic.text.secondary» удалены — это были Material-наследие. По UX-логике диалог содержит короткий важный текст, не secondary-supporting → Body 1 + Primary читаемость > Body 2 + Secondary subtle.

**Открытые таски (не Dialog-specific, cross-cutting):**

- **Foundation typo `Fonts/line-hright/{md,lg}` → `Fonts/line-height/{md,lg}`** — затрагивает все стили из семейства `Heading/H*` и `Base/Body 1*`. Живёт в исходном файле типографики (вне UI-Kit-Mobile, недоступен через MCP). Тот же таск, что задокументирован при аудите FAB Bar.
- **`[deprecated]` префикс** на старых `Basic dialog`, `Dialog_IMG`, `img_container` — оставлен как есть. Для скрытия из Assets picker нужен `.=` префикс. Micro-task на следующую итерацию.

**Foundation-observation (не блокирующее):** `Accent/Primary` в Primary-кнопке Buttons Stack = Zinc/950 — это established canonical Larixon DS (CTA-цвет, не brand-red). См. `COLOR-PALETTE.md §3.5 + §3.7`.

Dialog → ✅ готов к разработке.
