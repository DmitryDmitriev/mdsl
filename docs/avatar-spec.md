# Avatar — спецификация компонента

Компонент аватара пользователя. Использует токены из дизайн-системы.

**Figma:** Avatar v2 (токенизированная версия)

---

## 1. Свойства компонента

| Свойство | Значения | По умолчанию |
|----------|----------|--------------|
| **type** | `letter` \| `icon` \| `photo` | `letter` |
| **size** | `s` \| `m` \| `l` \| `xl` \| `2xl` \| `3xl` \| `4xl` | `m` |
| **pin** | `boolean` | `false` |

---

## 2. Типы (type)

| Type | Назначение | Содержимое |
|------|------------|------------|
| `letter` | Пользователь без фото | Инициалы (1-2 буквы) |
| `icon` | Пользователь без фото / контекстный статус | Любая релевантная иконка |
| `photo` | Пользователь с фото | Изображение |

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

> **Концептуально:** Pin — это **specific instance паттерна Notification Slot** (см. [notification-slot-spec.md](./notification-slot-spec.md)). Цвет (`Accent/Primary` default) и логика позиционирования наследуются из slot-спеки. **Структурно Figma остаётся на Ellipse**, не на Badge instance — из-за разной размерной шкалы (avatar pin = 8/12/16/20/24, Badge 2xs = фикс 16). Гармонизация шкал — открытый вопрос для будущих итераций (см. notification-slot-spec.md §10 «История»).

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
| Background аватара (Letter, Icon) | `Accent/Primary` | Тёмная заливка под инициалы и preset-иконки |
| Background аватара (Photo placeholder) | `Background/Tertiary` | Серый плейсхолдер до загрузки фото |
| Letter text (инициалы) | `Text&Icon/Secondary` | На фоне `Accent/Primary` остаётся читаемо |
| Icon (Person preset) | `Text&Icon/Inverted W-B` | Белая в Light, чёрная в Dark — инвертирует против `Accent/Primary` |
| Pin background (внешнее кольцо) | `Background/Primary` | Контур, отделяющий пин от аватара |
| Pin status (точка) | `Accent/Primary` | Цвет статуса (нейтральный) |

В коде:
```ts
avatarBg: semantic.accent.primary           // Letter / Icon
avatarPhotoBg: semantic.background.tertiary // Photo placeholder
letterText: semantic.textIcon.secondary
iconFill: semantic.textIcon.invertedWB
pinBackground: semantic.background.primary
pinStatus: semantic.accent.primary
```

---

## 7. Структура слоёв

```
Avatar (Component)
├── background (Ellipse) — Letter/Icon: Accent/Primary; Photo placeholder: Background/Tertiary
│   └── size: привязан к size token
├── [content] — зависит от type:
│   ├── Letter: Text "AB" (Text&Icon/Secondary)
│   ├── Icon: ic_person preset (Text&Icon/Inverted W-B), swap на любую `ic_*`
│   └── Photo: Ellipse с image fill
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
  type?: 'letter' | 'icon' | 'photo';
  
  /** Размер */
  size?: 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl';
  
  /** Показать индикатор статуса */
  pin?: boolean;
  
  /** URL изображения (для type="photo") */
  src?: string;
  
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
