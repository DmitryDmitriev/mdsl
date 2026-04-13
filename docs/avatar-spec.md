# Avatar — спецификация компонента

Компонент аватара пользователя. Использует токены из дизайн-системы.

**Figma:** Avatar v2 (токенизированная версия)

---

## 1. Свойства компонента

| Свойство | Значения | По умолчанию |
|----------|----------|--------------|
| **type** | `letter` \| `person` \| `add` \| `photo` | `letter` |
| **size** | `s` \| `m` \| `l` \| `xl` \| `2xl` \| `3xl` \| `4xl` | `m` |
| **pin** | `boolean` | `false` |

---

## 2. Типы (type)

| Type | Назначение | Содержимое |
|------|------------|------------|
| `letter` | Пользователь без фото | Инициалы (1-2 буквы) |
| `person` | Пользователь без фото | Иконка пользователя |
| `add` | Призыв загрузить фото | Иконка камеры |
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

| Элемент | Токен | Использование |
|---------|-------|---------------|
| Фон аватара | `Background/Tertiary` | Letter, Person, Add |
| Инициалы | `Text/Secondary` | Letter type |
| Иконки | `Icon/Secondary` | Person, Add types |
| Pin фон | `Background/Primary` | Белая обводка вокруг точки |
| Pin статус | `Accent/Graphite` | Точка индикатора |

В коде:
```ts
background: semantic.background.tertiary
text: semantic.text.secondary
icon: semantic.icon.secondary
pinBackground: semantic.background.primary
pinStatus: semantic.accent.graphite
```

---

## 7. Структура слоёв

```
Avatar (Component)
├── background (Ellipse) — только для Letter/Person/Add
│   └── fills: Background/Tertiary
│   └── size: привязан к size token
├── [content] — зависит от type:
│   ├── Letter: Text "AB" (Text/Secondary)
│   ├── Person: Icon User stroke (Icon/Secondary)
│   ├── Add: Icon Camera fill (Icon/Secondary)
│   └── Photo: Ellipse с image fill
├── Pin Background (Ellipse) — если pin=true
│   └── fills: Background/Primary
│   └── size: привязан к spacing token
└── Status Indicator (Ellipse) — если pin=true
    └── fills: Accent/Graphite
    └── size: привязан к spacing token
```

---

## 8. API компонента

```tsx
interface AvatarProps {
  /** Тип отображения */
  type?: 'letter' | 'person' | 'add' | 'photo';
  
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

// Иконка пользователя
<Avatar type="person" size="l" />

// Призыв загрузить фото
<Avatar type="add" size="xl" />

// С фотографией и статусом онлайн
<Avatar type="photo" size="m" src="/avatar.jpg" pin />
```

---

## 10. Ссылки

- Figma: [UI-Kit-Mobile → Avatar](https://www.figma.com/design/PI2N65xbeJPTc5oWhOP7Bl/UI-Kit-Mobile)
- Токены: `docs/DESIGN-TOKENS.md`
- Цвета: `docs/COLOR-PALETTE.md`
