# Avatar — спецификация компонента

Компонент аватара пользователя (фото или инициалы). Использует только токены из **docs/DESIGN-TOKENS.md** и **docs/COLOR-PALETTE.md**.

---

## 1. Размеры (Semantic)

Размер аватара привязан к семантике **height** (как у кнопок и инпутов). Квадрат: ширина = высота.

| Токен       | Значение | Использование              |
|-------------|----------|----------------------------|
| height/xs   | 32 px    | Компактные списки, чипы    |
| height/sm   | 40 px    | Маленькие карточки         |
| height/md   | 48 px    | Стандартные карточки, хедер|
| height/lg   | 56 px    | Крупные профили, превью    |

В коде: `height.xs`, `height.sm`, `height.md`, `height.lg` из `@/tokens`.

---

## 2. Форма и скругление

- **Форма:** круг (квадрат со скруглением 50% или radius/full).
- **Токен:** `radius/pill` (radius.pill в коде) — полное скругление.

---

## 3. Варианты отображения

### 3.1 С изображением (src)

- Показывается картинка, заполняющая круг.
- `object-fit: cover`, `object-position: center`.
- Обводка (опционально): **border/default** (1 px), цвет **border/default** (semantic.border.default).

### 3.2 Fallback (без изображения или ошибка загрузки)

- Фон: **Background Secondary** (semantic.background.secondary).
- Текст (инициалы): **Text Primary** (semantic.text.primary).
- Шрифт: по **docs/TYPOGRAPHY.md** в зависимости от размера:
  - xs: typography/caption-md (12 px / 16 px), Medium (500)
  - sm: typography/caption-lg (14 px / 16 px), Medium (500)
  - md: Body 2 (14 px / 20 px), Medium (500)
  - lg: Body 1 (16 px / 24 px), Medium (500)
- Инициалы: одна или две буквы (например, первые буквы имени и фамилии), по центру.

---

## 4. Статус (опционально)

Индикатор статуса пользователя (online, offline, away) — точка в углу аватара.

- **Позиция:** правый нижний угол, отступ от края — **spacing/1** (4 px).
- **Размер точки:** 25% от размера аватара или минимум 8 px (spacing/2).
- **Обводка:** border/1, цвет **Background Primary** (semantic.background.primary), чтобы отделить от фона.
- **Цвета статуса (семантика Decor / Accent):**
  - **online:** accent/positive (semantic.accent.positive)
  - **offline:** border/default или text/tertiary (semantic.text.tertiary)
  - **away:** accent/warning (semantic.accent.warning)

---

## 5. Токены в коде

| Элемент           | Токен / значение                          |
|-------------------|-------------------------------------------|
| Размер (width, height) | height.xs / .sm / .md / .lg        |
| Радиус            | radius.pill                               |
| Фон fallback      | semantic.background.secondary             |
| Текст инициалов   | semantic.text.primary                     |
| Обводка           | 1 px, semantic.border.default            |
| Статус online     | semantic.accent.positive                  |
| Статус offline    | semantic.text.tertiary                    |
| Статус away       | semantic.accent.warning                   |
| Отступ статуса    | spacing[1] (4 px)                         |

---

## 6. API компонента (рекомендуемое)

- **src** (string, optional) — URL изображения.
- **alt** (string) — описание для доступности (например, имя пользователя).
- **name** (string, optional) — для инициалов при fallback (например, "Иван Петров" → "ИП").
- **size** ('xs' | 'sm' | 'md' | 'lg') — размер, по умолчанию 'md'.
- **status** ('online' | 'offline' | 'away' | undefined) — индикатор статуса.
- **showBorder** (boolean, optional) — показывать обводку (border/default).

---

## 7. Ссылки

- Токены: **docs/DESIGN-TOKENS.md**
- Цвета: **docs/COLOR-PALETTE.md**
- Типографика: **docs/TYPOGRAPHY.md**
