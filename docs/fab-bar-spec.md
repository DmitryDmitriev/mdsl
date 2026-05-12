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

В FAB Bar используются canonical-токены из шкал `size/*` и `control-height/*`. Отдельного семейства `size/fab-*` в системе нет — оно не нужно, размеры FAB полностью покрываются основными шкалами.

| Фрейм | Что | Размер | Токен |
|---|---|---|---|
| `Tab Bar Buttons` | Wrap-фрейм для группы Tab-кнопок (Tab 1…N) | h = 56 | `control-height/lg` |
| `SinglButton` | Wrap-фрейм центральной/одиночной FAB-кнопки | 56 × 56 | `size/2xl` (w + h) |
| `.=Tab Bar SinglButton` | Сама круглая FAB-кнопка (48 × 48) | 48 × 48 | `size/xl` (w + h) |
| Tab item (`Tab 1…N`) | Один Tab-инстанс внутри Tab Bar Buttons | h = 48, w = FILL | `size/xl` (h) |

**Почему такая комбинация:**
- `Tab Bar Buttons` оборачивает горизонтальный ряд тач-целей с приёмом гестов — это «контрол», поэтому height на `control-height/lg`.
- `SinglButton` и его внутренний инстанс — иконочные/identity-блоки без отдельного touch-padding-контракта, поэтому `size/*`.

FAB-кнопки в баре **квадратные** (`width = height`). Visualно read как чипы / иконочные действия, не как полноценные кнопки с текстом.

---

## Токены по категориям

### Отступы (spacing)

FAB Bar — sticky-floating контейнер у нижнего края экрана. Его внешние отступы задают «дыхание» от краёв экрана и safe-area; внутри между кнопками действует негативный gap (см. выше).

| Параметр | Значение | Токен |
|---|---|---|
| **itemSpacing** (между FAB) | **−8 px** | hardcoded — отрицательное значение, не из core-шкалы |
| `paddingTop` | 16 px | `spacing/4` |
| `paddingBottom` | 24 px | `spacing/6` (safe-area floor) |
| `paddingLeft` | 24 px | `spacing/6` |
| `paddingRight` | 24 px | `spacing/6` |

> В Figma Variables рекомендуется создать связку `fab-touch-padding = 8` и `fab-bar-gap = -(fab-touch-padding)` — тогда изменение одного значения автоматически обновит второе.

### Радиусы (radius)

FAB-кнопки всегда круглые. Radius задаётся на самой FAB-кнопке, не на баре.

| Элемент | Токен | Значение |
|---|---|---|
| Внутренняя FAB-кнопка (48 × 48) | `radius/pill/pill` | 999 (pill) |

### Ширина самого бара

Ширина бара — **HUG** (по содержимому). В Figma заданы фиксированные варианты ширины (360 / 244 / 200 / 100) как референс для демонстрации, но в продакшене FAB Bar должен адаптироваться к количеству кнопок внутри.

| Ширина | Назначение | Кол-во FAB |
|---|---|---|
| 360 | Максимальная | 4–5 FAB lg |
| 244 | Средняя | 3 FAB md |
| 200 | Компактная | 2 FAB md + текст |
| 100 | Минимальная | 2 FAB sm |

### Высота бара

Высота бара — **HUG**, считается по внутренним фреймам: высота FAB-контента (`control-height/lg` = 56 для `Tab Bar Buttons`, `size/2xl` = 56 для `SinglButton`) + `paddingTop` (`spacing/4` = 16) + `paddingBottom` (`spacing/6` = 24) = **96 px**.

На root-варианте `FAB Bar` (`5879:813 / :820 / :826`) собственного height-токена нет — это HUG-фрейм, высота производна от детей и paddings.

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

| Параметр | Tab Bar Buttons | SinglButton (внешний) | FAB (внутренний) |
|---|---|---|---|
| **Размер** | h = 56, w = HUG | 56 × 56 | 48 × 48 |
| **Токен** | `control-height/lg` (h) | `size/2xl` (w, h) | `size/xl` (w, h) |
| **Radius** | — (контейнер) | — (контейнер) | `radius/pill/pill` (999) |
| **Icon size внутри** | 24 px | — | 24 px |
| **itemSpacing с соседями** | −8 px | −8 px | — |

---

## Варианты (variants)

В текущем COMPONENT_SET одна ось:

| Свойство | Значения | Описание |
|---|---|---|
| **Type** | `1` / `2` / `3` | Количество FAB-кнопок внутри бара |

Итого **3 варианта**. Внутри каждого — фиксированный набор кнопок (SinglButton слева + Tab Bar Buttons справа).

Размер FAB-кнопок (lg / md / sm), наличие текста рядом с FAB и destructive/disabled-состояния задаются на инстанс-уровне через **Swap Instance** или override инстанса — не зашиты в variant-матрицу. Это даёт дизайнеру гибкость без раздувания компонент-сета.

**Elevation:** все 3 варианта используют единый shadow-стиль `Elevation/Bottom` (sticky bottom-edge floating bar, см. [elevation-spec.md](./elevation-spec.md) §«Правила применения»).

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

---

## Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Color | 100% |
| Token | 89% |
| Type | 100% |
| **Overall** | **91%** |

Что осталось вне токенов:

- **Negative `itemSpacing = −8`** в обоих внутренних фреймах (`SinglButton`, `Tab Bar Buttons`). Не из core-шкалы, задано вручную. Это компенсация встроенного touch-padding в FAB-кнопке (паттерн iOS UI Kit, см. §«Важное правило: отрицательный itemSpacing»). Переменной для отрицательного gap в системе нет и не планируется.
- **Tab Bar Buttons `width`** — hardcoded демонстрационные значения (124 / 200 / 244) под количество табов внутри. В продакшене бар адаптируется к содержимому (HUG / FILL по контексту).

---

## История миграций

**2026-05-12 — аудит готовности (component-spec-check), 7 правок Figma + sync спеки.**

### Figma (7 правок)

- **Shadow style на 6 нодах** перепривязан с `[deprecated] Shadow/Sheet Active` (id `S:ed244f90…`) на canonical **`Elevation/Bottom`** (`S:556c1eee…`):
  - `Tab Bar Buttons` × 3: `5879:827`, `5879:821`, `5879:814`.
  - `SinglButton` × 3: `5879:829`, `5879:824`, `5879:818`.
  - Это первая зачистка `[deprecated] Shadow/Sheet *` в DS; визуально результат идентичен (стили в Elevation/Bottom выровнены с теми же drop-shadow параметрами).
- **`5879:814` (Tab Bar Buttons, w=244)** — height перепривязан с `spacing/14` на **`control-height/lg`** (оба = 56 px, но семантически height контейнера тач-зоны должен идти через `control-height/*`). Два соседних `Tab Bar Buttons` (`5879:827`, `5879:821`) уже были корректные.

### Спека

- §«Отступы» — синхронизирована с реальным Figma: `pt = 16` (spacing/4), `pb = pl = pr = 24` (spacing/6). Старая запись «pr=8, остальное=0» была неактуальной — FAB Bar в Figma — sticky-floating контейнер с safe-area-style отступами от краёв.
- §«Варианты» — переписан под фактическую axis `Type = 1 | 2 | 3` (количество FAB внутри). Размеры/Content/Disabled выведены на инстанс-override-уровень (Swap Instance), не зашиты в matrix.
- §«Аудит» — формулировка «SiglButton itemSpacing ×3» уточнена: оба внутренних фрейма (SinglButton + Tab Bar Buttons) используют negative gap −8 как компенсацию touch-padding. Tab Bar Buttons width — отдельный пункт.
- §«Размеры FAB внутри бара», §«Сводная таблица», §«Высота бара» — переписаны под реальные canonical-токены (`control-height/lg`, `size/2xl`, `size/xl`, `radius/pill/pill`). Удалена выдуманная семья `size/fab-lg/md/sm` — в палитре её нет и не нужна. FAB-кнопки полностью покрываются основными шкалами `size/*` и `control-height/*`. Высота root-фрейма FAB Bar — HUG (96 px = 56 контента + 16 pt + 24 pb), отдельного height-токена на варианте нет и не требуется.

### Открытый вопрос (палитра / cross-cutting)

В библиотеке **App Color Palette** (`KUQhruxtJAqD3uwshelCt2`) живёт переменная `Fonts/line-hright/xxxs` — опечатка `hright` вместо `height`. Затрагивает все компоненты с `Caption / caption-sm Medium` (Avatar S, Badge 2xs/xs, FAB-метки). Переименование `Fonts/line-hright/xxxs → Fonts/line-height/xxxs` нужно делать в **исходном файле палитры**, не в UI-Kit-Mobile — rename сохранит все привязки автоматически. Отдельный таск.

FAB Bar → ✅ готов к разработке (с открытым cross-cutting тикетом по палитре).
