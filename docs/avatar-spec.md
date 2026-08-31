# Avatar — спецификация компонента

Компонент аватара пользователя. Использует токены из дизайн-системы.

**Figma:** Avatar v2 (токенизированная версия)

---

## 1. Свойства компонента

| Свойство | Значения | По умолчанию |
|----------|----------|--------------|
| **type** | `letter` \| `icon` \| `photo` \| `logo` | `letter` |
| **size** | `s` \| `m` \| `l` \| `xl` \| `2xl` \| `3xl` \| `4xl` | `m` |
| **pin** | `boolean` | `false` |

**56 вариантов** = 4 type × 7 size × 2 pin (Figma `Avatar v2`, COMPONENT_SET `6062:390`).

---

## 2. Типы (type)

| Type | Назначение | Содержимое |
|------|------------|------------|
| `letter` | Пользователь без фото | Инициалы (1-2 буквы) |
| `icon` | Пользователь без фото / контекстный статус | Любая релевантная иконка |
| `photo` | Пользователь с фото | Изображение |
| `logo` | Бизнес-продавец / компания | Логотип бренда |

### 2.1 Type=Logo

Аватар для бизнес-продавца/компании — логотип бренда вместо фото/инициалов.

**Отличия от Photo:**
- **Внутренний padding 2px.** Логотип лежит на внутреннем круге, вписанном с отступом 2px от края аватара (иконка `Logo` = `size − 4`, по центру). Нужно, чтобы логотипы, обрезанные в край (full-bleed), не липли к краю аватара.
- **scaleMode = FIT** (не FILL). Логотип виден целиком, не режется — нельзя калечить бренд. Широкие логотипы letterbox'ятся по центру.
- **Фон круга = цвет логотипа (held / applied).** Заливка `background` берётся под конкретный логотип (его фоновое/полевое поле), чтобы плитка читалась бесшовно, а padding был в цвет фона. Значение **held (theme-invariant)** — как applied-слой: цвет бренда не меняется по теме. Это **per-instance override** (raw-цвет под бренд), не токен.
- **Обводка** — hairline `Background/on Photo` (полупрозрачная), чтобы аватар не сливался с белой/тёмной поверхностью экрана независимо от цвета плитки.

**Per-instance:** и логотип (image swap), и цвет фона задаются под конкретный бренд при использовании — как Photo swap'ает фото. Компонент несёт дефолт-плейсхолдер (DOM).

**Пул логотипов-плейсхолдеров** для мокапов/примеров — `_Claude_/image-pool/logos/` (12 шт., png, с bg-цветом в `manifest.json`). **Internal use only** (чужие торговые марки — только placeholder, не в паблик/маркетинг). Examples-фрейм с 12 брендами — на стр. «🟢 Avatar».

---

## 3. Размеры (size)

Прогрессия: 24 → 32 → 40 → 48 → 56 → 64 → 80 (шаг +8px, последний +16px)

| Size | Токен | Значение | Иконка | Шрифт |
|------|-------|----------|--------|-------|
| `s` | `size/sm` | 24px | 16px | 10px |
| `m` | `size/md` | 32px | 16px | 14px |
| `l` | `size/lg` | 40px | 24px | 16px |
| `xl` | `size/xl` | 48px | 24px | 18px |
| `2xl` | `size/2xl` | 56px | 32px | 20px |
| `3xl` | `spacing/16` | 64px | 32px | 24px |
| `4xl` | `size/3xl` | 80px | 40px | 30px |

**Стандартные размеры иконок:** 16, 24, 32, 40

> **4XL — иконка 40px.** В иконочной библиотеке Larixon отдельного `40 / ic_person` нет (стандартный ряд: 16/24/32/48). В Figma для 4XL используется инстанс `32 / ic_person`, отмасштабированный до 40×40 — SVG, без потерь. В коде разработка может тянуть `ic_person` ближайшего доступного размера (32 или 48) и масштабировать до 40, либо завести `ic_person_40` если потребуется пиксель-перфект.

В коде: `size.sm`, `size.md`, `size.lg`, `size.xl`, `size['2xl']`, `spacing[16]`, `size['3xl']`

---

## 4. Форма

- **Форма:** круг (эллипс)
- Для прямоугольных контейнеров: `border-radius: radius/pill` (999px)

---

## 5. Pin-индикатор статуса

Индикатор онлайн-статуса в правом нижнем углу. Все размеры на **4px сетке**.

### 5.1 Размеры Pin (токенизированы)

| Avatar Size | Outer (фон) | Токен | Inner (точка) | Токен |
|-------------|-------------|-------|---------------|-------|
| `s` | 8px | `spacing/2` | 4px | `spacing/1` |
| `m`, `l` | 12px | `spacing/3` | 8px | `spacing/2` |
| `xl`, `2xl` | 16px | `spacing/4` | 12px | `spacing/3` |
| `3xl` | 20px | `spacing/5` | 16px | `spacing/4` |
| `4xl` | 24px | `spacing/6` | 16px | `spacing/4` |

### 5.2 Позиционирование

- Позиция: `bottom-right`, смещение +2px от края аватара
- Constraints: `MAX` по обеим осям

---

## 6. Токены цветов

| Элемент | Токен (canonical после миграции 2026-05-06) | Использование |
|---------|----------------------------------------------|---------------|
| Background аватара (Letter, Icon) | `Background/Tertiary` | Нейтральный светло-серый кружок под инициалы и preset-иконки |
| Background аватара (Photo placeholder) | `Background/Tertiary` | Серый плейсхолдер до загрузки фото |
| Letter text (инициалы) | `Text&Icon/Secondary` | Тёмно-серые инициалы на нейтральном фоне |
| Icon (Person preset) | `Text&Icon/Secondary` | Тёмно-серый силуэт на нейтральном фоне |
| Pin background (внешнее кольцо) | `Background/Primary` | Контур, отделяющий пин от аватара |
| Pin status (точка) | `Accent/Primary` | Цвет статуса (нейтральный) |
| Background аватара (Logo) | **held raw** = цвет логотипа | Per-instance, theme-invariant (applied-логика); фон = поле логотипа, бесшовно |
| Logo — обводка | `Background/on Photo` | Полупрозрачный hairline, читается на любой плитке (светлой/тёмной) |

В коде:
```ts
avatarBg: semantic.background.tertiary      // Letter / Icon
avatarPhotoBg: semantic.background.tertiary // Photo placeholder
letterText: semantic.textIcon.secondary
iconFill: semantic.textIcon.secondary
pinBackground: semantic.background.primary
pinStatus: semantic.accent.primary
```

### 6.1 Per-instance color override — для всех типов (Letter / Icon / Logo), ратифицировано 2026-08-31

**Цвет фона и контента аватара — переопределяемы на инстансе для `Type=Letter` и `Type=Icon`** (не только `Logo`, как было до 2026-08-31). Дефолт без override — канон `Background/Tertiary` + `Text&Icon/Secondary`; **обратная совместимость полная** (инстансы без override не меняются).

**Почему override, а не набор вариантов.** Цвет аватара приходит из **продуктовой семьи** — тир, бренд, категория (VIP-Info, премиум-тир, лого бренда). Перечислить их фиксированной осью нельзя (в классифайде их много и они растут). Поэтому компонент **принимает цвет**, а ответственность за происхождение цвета — на использующем макете. Ручная сборка кружка из `Box + Icon` (текущий обход) запрещена — она плодит расхождения (как 5 копий Page Indicator).

**Гардрейл — цвет контента следует природе фона (applied-слой, [COLOR-PALETTE §2.12/§3.9](./COLOR-PALETTE.md)). Обязателен:**

| Фон override | Цвет контента | Пример |
|---|---|---|
| **Adaptive-токен** (пара адаптируется по теме) | **adaptive-токен той же семьи** | VIP: bg `Background/Tinted/Info` + контент `Text&Icon/Link` — оба адаптивны, контраст держится в Light/Dark |
| **Held / raw** (theme-invariant: бренд, тир) | **held** `Text&Icon/White applied` (или `Black applied`) — НЕ adaptive | Logo (цвет бренда); премиум-тир (золото) + `White applied` |

> ⚠️ **Нельзя** класть adaptive-контент (`Text&Icon/Link`/`Primary`) на held/raw-фон — в Dark адаптивный цвет «плывёт» и контраст ломается (та же логика, что у Logo и coach mark). Held-фон → только held-контент.

**Приоритет — токен, raw только как escape hatch.** Где токен есть — **биндить override к переменной** (VIP → `Background/Tinted/Info`), сохраняя тема-адаптивность и трассируемость. Сырой hex допустим **только** для семьи, у которой токена ещё нет (премиум-тир `#C9A24B`) — это временный обход, а не норма; при заведении токен-семьи override перепривязывается на неё.

**Вне скоупа этого решения:** золотой акцент премиум-тира VIP+ (`#C9A24B`) — **отдельная заявка на акцентную семью тира** (плашка/подзаголовок/буллеты/бейдж «Рекомендуем» несут тот же цвет — это не про аватар). До заведения этой семьи VIP+ аватар держит золото сырым escape-hatch'ем. (Фрейм VIP+ также заблокирован независимо — в контракте `promo-plan` нет полей под «Поднять в пик спроса» и бейдж «Рекомендуем».)

---

## 7. Структура слоёв

```
Avatar (Component)
├── background (Ellipse) — Letter/Icon: Background/Tertiary; Photo placeholder: Background/Tertiary
│   └── size: привязан к size token
├── [content] — зависит от type:
│   ├── Letter: Text "AB" (Text&Icon/Secondary)
│   ├── Icon: ic_person preset (Text&Icon/Secondary), swap на любую `ic_*`
│   ├── Photo: Ellipse с image fill (scaleMode FILL, во весь круг)
│   └── Logo: Ellipse `Logo` (size−4, inset 2px, по центру) с image fill (scaleMode FIT)
│         └── background у Logo: fill = цвет логотипа (held raw) + stroke `Background/on Photo` 1px INSIDE
├── Pin Background (Ellipse) — если pin=true
│   └── fills: Background/Primary
│   └── size: привязан к spacing token
│   └── offset: PIN_OFFSET = 2dp наружу (design constant, не на spacing-шкале)
└── Status Indicator (Ellipse) — если pin=true
    └── fills: Accent/Primary
    └── size: привязан к spacing token
```

**Type=Icon — это «free icon slot».** Default иконка — `ic_person` (для пустого профиля). Для add-flow — swap instance на `ic_plus`. Person и Add — это **icon presets**, не отдельные variant'ы (исторически в description Figma были перечислены 4 типа `Letter | Person | Add | Photo` — поправлено 2026-05-06).

---

## 8. API компонента

```tsx
interface AvatarProps {
  /** Тип отображения */
  type?: 'letter' | 'icon' | 'photo' | 'logo';
  
  /** Размер */
  size?: 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl';
  
  /** Показать индикатор статуса */
  pin?: boolean;
  
  /** URL изображения (для type="photo") или логотипа (для type="logo") */
  src?: string;
  
  /** Override цвета фона кружка (Letter / Icon / Logo). Дефолт — Background/Tertiary.
   *  Предпочтительно токен-переменная; raw hex — escape hatch для token-less семей (тир/бренд). */
  bgColor?: string;
  
  /** Override цвета контента (инициалы / иконка). Дефолт — Text&Icon/Secondary.
   *  ГАРДРЕЙЛ (§6.1): adaptive-фон → adaptive-контент; held/raw-фон → held `Text&Icon/White applied`. */
  contentColor?: string;
  
  /** Имя пользователя (для генерации инициалов) */
  name?: string;
  
  /** Инициалы (если нужно задать явно) */
  initials?: string;
  
  /** Alt текст для изображения */
  alt?: string;
}
```

---

## 9. Примеры использования

```tsx
// Инициалы
<Avatar type="letter" size="m" name="Иван Петров" />

// Контекстная иконка (например, профиль/камера/статус)
<Avatar type="icon" size="l" />

// С фотографией и статусом онлайн
<Avatar type="photo" size="m" src="/avatar.jpg" pin />

// Логотип компании (бизнес-продавец) — фон под цвет логотипа
<Avatar type="logo" size="m" src="/brand-logo.png" logoBgColor="#ff0f13" />
```

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Color | **100%** (на canonical-токенах после миграции 2026-05-06) |
| Token (size/radius/spacing) | **100%** |
| Type (типографика) | **100%** |
| **Overall** | **100%** |

Аудит выполнен по правилам исключения building blocks (`.=` префикс), HUG/FILL размеров, иконок из библиотеки и вычисляемого вертикального padding.

---

## История миграций

**2026-08-31 — per-instance color override обобщён на Letter/Icon (LAA-4215, «План продвижения»).**

- §6.1 + API: цвет фона (`bgColor`) и контента (`contentColor`) переопределяемы на инстансе для **всех типов** (было только `Type=Logo` через `logoBgColor`). Дефолт — канон `Background/Tertiary` + `Text&Icon/Secondary`, обратная совместимость полная.
- Причина: цвет аватара приходит из продуктовой семьи (тир/бренд/категория), перечислить осью нельзя. Обход «Box+Icon вручную» плодит расхождения — запрещён.
- Гардрейл (обязателен): контент следует природе фона — adaptive-фон→adaptive-контент (VIP: `Background/Tinted/Info`+`Text&Icon/Link`); held/raw-фон→held `Text&Icon/White applied`. Токен предпочтителен, raw — escape hatch для token-less семей.
- **Смежное (сделано в этой же сессии):** description компонента в Figma перезаписан на канон `Background/Tertiary`+`Text&Icon/Secondary` (Person icon→Secondary) — устаревший `Accent/Primary`+`Inverted W-B` убран.
- Вне скоупа: золотой акцент VIP+ (`#C9A24B`) — отдельная заявка на акцентную семью премиум-тира.

**2026-08-09 — добавлен `Type=Logo` (аватар компании/бизнес-продавца).**

- +14 вариантов (7 size × 2 pin) в `Avatar v2` (`6062:390`) → итого **56**. Ось Type: `Letter | Icon | Photo | Logo`.
- Структура Logo: `background` (fill = цвет логотипа held raw + hairline `Background/on Photo`) + внутренний круг `Logo` (size−4, inset **2px**, image fill **FIT**). Pin-геометрия переиспользована из Photo-вариантов.
- **2px padding** — чтобы full-bleed логотипы не липли к краю. **FIT** — логотип целиком, не режется. **Фон по цвету логотипа, held** (applied-логика, theme-invariant) — бесшовная брендовая плитка; per-instance override (raw), не токен.
- Пул из 12 логотипов-плейсхолдеров (Bazaraki) — `_Claude_/image-pool/logos/` (png + `manifest.json` с bg-цветом). Internal use only. Examples-фрейм с 12 брендами — на стр. «🟢 Avatar».
- Картинки заведены через `upload_assets` (в `use_figma` прямой `createImageAsync` запрещён).

**2026-06-09 — фон Letter/Icon: Accent/Primary → Background/Tertiary (QA-reconciliation LIOS-2509).**

- Background аватара (Letter, Icon): `Accent/Primary` → `Background/Tertiary`. Канон расходился с Figma: `Accent/Primary` = Zinc/900 в Light даёт тёмный кружок — читаемость инициалов была только в Dark-теме.
- Icon (Person preset) tint: `Text&Icon/Inverted W-B` → `Text&Icon/Secondary`. Силуэт тёмно-серый на светло-сером кружке, работает в обеих темах.
- Код уже приведён под Figma (ветка `feature/LAA-3524-design-system`, коммит `b4a0a3b97`).

**2026-05-11 — аудит готовности к разработке.**

- Pin sizes — все 84 pin-слоя (`Pin Background` + `Status Indicator` во всех 21 pinned-варианте) подтверждены на variable bindings (`spacing/1`..`spacing/6`). Hardcoded нет.
- 4XL иконка — задокументировано отсутствие `40 / ic_person` в иконочной библиотеке; в Figma используется `32 / ic_person` scaled до 40×40 (SVG lossless). Указание для кода: подгрузить ближайший размер или завести `ic_person_40` при необходимости.
- Подтверждены: `Text&Icon/Secondary` для Letter, `Text&Icon/Inverted W-B` для Person preset, Type=Icon как free icon slot (default `ic_person`, swap на `ic_plus` для add-flow). 42 варианта (3 type × 7 size × 2 pin) — все на месте.

**2026-05-06 — миграция на canonical-палитру.**

- Перепривязано **104 binding'а** с OLD на canonical: `Background/Tertiary` (Old) → `Background/Tertiary` (canonical), `Text/Secondary` → `Text&Icon/Secondary`, `Icon/Secondary` → `Text&Icon/Secondary`, `Background/Primary` (Old) → `Background/Primary` (canonical), `Accent/Graphite` → `Accent/Primary`.
- Заменено **14 hardcoded `#ffffff`** на иконке `ic_person` → `Text&Icon/Inverted W-B`. Закрывает hardcoded fills в Avatar до 0.
- **Description компонента** обновлено: `Letter | Icon | Photo` (было `Letter | Person | Add | Photo` — устаревшее, Person/Add теперь явно описаны как icon-presets внутри `Type=Icon`).
- Pin offset = **2dp**, design constant. Не вводим отдельный токен `AppSpacing.Overlap.pin` — переиспользуем хардкод с комментарием в коде. Если появятся другие overlap-сценарии — заведём общий токен и мигрируем.
- 64/80px размеры (XXXL/XXXXL) — **identity-illustration**, используют `AppIllustration.sm/md`. Уточнено в `DESIGN-TOKENS.md` §Illustrations.

---

## 10. Ссылки

- Figma: [UI-Kit-Mobile → Avatar](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile)
- Токены: `docs/DESIGN-TOKENS.md`
- Цвета: `docs/COLOR-PALETTE.md`
