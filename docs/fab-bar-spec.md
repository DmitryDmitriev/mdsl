# FAB Bar — спецификация для разработки

Компонент **FAB Bar** — горизонтальная группа плавающих кнопок действия (Floating Action Button). Используется для быстрого доступа к ключевым действиям на экране (звонок, написать, отправить и т.п.).

Привязка к **docs/DESIGN-TOKENS.md**. Цвета, радиусы, размеры и spacing — только через **семантические** токены. FAB-кнопка внутри бара — отдельный компонент (не вариант обычной Button).

Figma: страница **🟢 Button**, набор **FAB Bar** (COMPONENT_SET).

---

## ⚠️ Важное правило: отрицательный itemSpacing

**itemSpacing внутри FAB Bar = −8 px.**

Это **не баг** и не временное решение. Компонент FAB-кнопки заимствован из официального iOS UI Kit и содержит встроенный **оптический touch-padding (~8 px по периметру)** — невидимая зона для гарантии минимальной tap-area 44 pt по HIG.

Отрицательный `itemSpacing` визуально компенсирует эту внутреннюю «подушку», чтобы **реальное расстояние между телами кнопок** соответствовало дизайн-спеке (зазор 4 px между визуальными границами).

### Реализация на платформах

| Платформа | Как реализовать |
|---|---|
| **SwiftUI** | `HStack(spacing: -8) { ... }` — работает нативно. |
| **Jetpack Compose** | `Row(horizontalArrangement = Arrangement.spacedBy((-8).dp))` — возможны warning'и в debug. |
| **CSS** | `gap: -8px` **не поддерживается**. Используйте `margin-left: -4px` на втором и следующих элементах или `translateX`. |
| **Flutter** | Собирать через `Stack` + `Transform.translate` или `Row` с отрицательными `margin`. |

### Правила использования

- **Не заменять** `itemSpacing` на положительное значение без пересмотра FAB-кнопки.
- **При изменении размера FAB** — проверять, что величина компенсации по-прежнему актуальна (touch-padding у разных размеров может отличаться).
- **Не вкладывать** FAB Bar в контейнеры с `clipsContent: true` / `overflow: hidden` — тени и края соседних кнопок могут обрезаться.
- **Проверять доступность:** на реальных устройствах убедиться, что tap-зоны соседних FAB не перекрываются критично; тест с VoiceOver/TalkBack.

### Риски

1. **Tap-зоны соседних кнопок могут пересекаться** — пользователь между двумя FAB может попасть «не туда»; VoiceOver может прочитать кнопки в неверном порядке.
2. **CSS flex gap** не принимает отрицательных значений — фронт должен реализовать через `margin` или `translate`, что ведёт к расхождению с дизайном.
3. **Хрупкая зависимость** — при изменении внутреннего padding FAB-кнопки компенсация сломается, и бар «съедется».
4. **Вложенность** — отрицательный gap может выходить за границы родителя и обрезаться.
5. **Наследование знаний** — следующий дизайнер, не зная контекста, может «починить» `-8` на `8`, сломав визуальную плотность.

### TODO (долгосрочно)

Рассмотреть **отказ от встроенного touch-padding** в FAB-кнопке в пользу `min-size: 44 pt` + честные визуальные размеры. Тогда `itemSpacing` станет положительным (`spacing/xs = 4` или `spacing/sm = 8`) и уберутся все риски выше.

**Источник паттерна:** Apple Human Interface Guidelines — FAB (iOS).

---

## Размеры FAB внутри бара

В FAB Bar используется три размера FAB-кнопок:

| Размер FAB | Semantic (size) | Core референс | Значение |
|---|---|---|---|
| lg | **size/fab-lg** | spacing/24 | 96 × 96 px |
| md | **size/fab-md** | spacing/14 | 56 × 56 px |
| sm | **size/fab-sm** | spacing/12 | 48 × 48 px |

FAB-кнопки в баре **квадратные** (`width = height = size/fab-*`).

---

## Токены по категориям

### Отступы (spacing)

| Параметр | Значение | Semantic | Core |
|---|---|---|---|
| **itemSpacing** (между FAB) | **−8 px** | **space/fab-bar-gap** | *(отрицательное значение — не из core шкалы, задаётся вручную)* |
| `paddingRight` бара | 8 px | space/fab-bar-padding-right | spacing/2 |
| `paddingLeft/Top/Bottom` | 0 | — | — |

> В Figma Variables рекомендуется создать связку `fab-touch-padding = 8` и `fab-bar-gap = -(fab-touch-padding)` — тогда изменение одного значения автоматически обновит второе.

### Радиусы (radius)

FAB-кнопки всегда круглые/скруглённые. Radius задаётся на самой FAB-кнопке, не на баре.

| Размер FAB | Semantic | Core | Значение |
|---|---|---|---|
| lg (96) | **radius/pill** | radius/full | 9999 (pill) или `size/2` |
| md (56) | **radius/pill** | radius/full | 9999 или `size/2` |
| sm (48) | **radius/pill** | radius/full | 9999 или `size/2` |

### Ширина самого бара

Ширина бара — **HUG** (по содержимому). В Figma заданы фиксированные варианты ширины (360 / 244 / 200 / 100) как референс для демонстрации, но в продакшене FAB Bar должен адаптироваться к количеству кнопок внутри.

| Ширина | Назначение | Кол-во FAB |
|---|---|---|
| 360 | Максимальная | 4–5 FAB lg |
| 244 | Средняя | 3 FAB md |
| 200 | Компактная | 2 FAB md + текст |
| 100 | Минимальная | 2 FAB sm |

### Высота бара

Высота бара = высоте FAB внутри: `size/fab-lg`, `size/fab-md` или `size/fab-sm`.

### Цвета (semantic)

| Элемент | Токен | Значение |
|---|---|---|
| Background бара | прозрачный | — |
| FAB Primary fill | Accent/Primary | Zinc/900 light, Zinc/200 dark |
| FAB Secondary fill | Accent/Secondary | Zinc/100 light, Zinc/800 dark |
| FAB Icon / Text | Text & Icon / Inverted | по фону |
| FAB Disabled | приглушённые версии | Text & Icon / Tertiary |

### Типографика (для FAB с текстом)

По **docs/TYPOGRAPHY.md**. Начертание — **Medium (500)**.

| Размер FAB | Стиль | Font size | Line height |
|---|---|---|---|
| lg (96) | Body 1 | 16 px | 24 px |
| md (56) | Body 2 | 14 px | 20 px |
| sm (48) | Body 2 | 14 px | 20 px |

---

## Сводная таблица

| Параметр | FAB lg | FAB md | FAB sm |
|---|---|---|---|
| **Size** | 96 × 96 | 56 × 56 | 48 × 48 |
| **Token** | size/fab-lg | size/fab-md | size/fab-sm |
| **Radius** | pill | pill | pill |
| **Icon size** | 32 px | 24 px | 24 px |
| **Touch-padding (встроенный)** | ~12 px | ~8 px | ~8 px |
| **itemSpacing в баре** | −12 px | **−8 px** | −8 px |

---

## Варианты (variants)

В Figma FAB Bar имеет следующие свойства:

- **Size:** lg / md / sm
- **Width:** 360 / 244 / 200 / 100 (фиксированные демонстрационные)
- **Content:** только FAB / FAB + текст

Для каждой комбинации — два состояния: **Default** и **Disabled**.

---

## Синхронизация с кодом

**Web (React):**
```tsx
<FabBar style={{ gap: -8 }}>
  <Fab size="md" variant="primary" icon={<PhoneIcon />} />
  <Fab size="md" variant="secondary" icon={<MessageIcon />} />
</FabBar>
```

CSS: `gap: -8px` не работает → `margin-left: -8px` на всех кроме первого, или собственный flex-контейнер с margin-compensation.

**iOS (SwiftUI):**
```swift
HStack(spacing: -8) {
  FabButton(...)
  FabButton(...)
}
```

**Android (Compose):**
```kotlin
Row(horizontalArrangement = Arrangement.spacedBy((-8).dp)) {
  FabButton(...)
  FabButton(...)
}
```

---

## Связанные документы

- [button-spec.md](./button-spec.md) — спецификация обычных кнопок и IconButton
- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы размеров, spacing, radius
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — палитра и семантика цветов
