# Buttons Stack — спецификация компонента

Молекула-обёртка для группы Button'ов в bottom-зоне экрана или в карточке. Пять предустановленных компоновок для типовых сценариев (одна CTA, парные действия, тройной выбор). Кросс-платформенный.

**Figma:** страница **🟢 Buttons Stack**, COMPONENT_SET `Buttons Stack` (`4608:1492`).

**Категория:** Molecule.

---

## 1. Обзор

Стек размещает Button-инстансы в фиксированной обёртке с предопределёнными отступами и направлением (вертикальное / горизонтальное). Используется для bottom-CTA в шторках, диалогах, формах и карточках, где набор действий ограничен и заранее известен.

Внутри стека — стандартные Button md (48 px). Если нужен другой размер (lg для CTA-кнопок выше клавиатуры или sm/xs для inline-блоков) — используется отдельный паттерн без обёртки Buttons Stack.

---

## 2. Варианты (variants)

| Type | Композиция | Когда |
|---|---|---|
| **One** | 1 Button (Primary, FILL) | Одиночная CTA: «Продолжить», «Отправить заявку», «Сохранить» |
| **Two Horizontal** | 2 Button (Primary \| Secondary), FILL-FILL | Парный выбор, основное действие слева: «Включить» / «Не сейчас» |
| **Two Horizontal Reverse** | 2 Button (Secondary \| Primary), FILL-FILL | Парный выбор, основное действие справа (iOS-канон, destructive flow) |
| **Two Vertical** | 2 Button (Primary над Secondary) | Узкий контейнер или длинные надписи: «Включить» / «Спасибо, буду знать» |
| **Three Vertical** | 3 Button (Primary над 2× Secondary) | Тройной выбор с одним приоритетным действием: «Настроить» / «Продолжить» / «Спасибо, буду знать» |

Все Button внутри — Size=md (48 px), Type=Primary / Secondary. Negative / Soft Negative / Ghost — точечный override инстанса, не зашиты в стек.

---

## 3. Структура слоёв

```
Buttons Stack (COMPONENT) — HORIZONTAL/VERTICAL по Type, FILL width, layoutAlign=STRETCH
  └── Button × 1…3 (instance, Size=48, FILL)
```

- **Корневой контейнер:** **FILL ширины родителя**, без привязки `width`/`minWidth` к токенам. Растягивается под parent — экран 360/320 (Platform/Width), Dialog card 328, Sheet, FAB Bar и т.п. Padding (`spacing/4` × `spacing/5`), items=center, justify=center.
- **Two Horizontal / Two Horizontal Reverse:** flex-row, gap=`spacing/3`, обе кнопки FILL.
- **Two Vertical / Three Vertical:** flex-col, gap=`spacing/3`, каждая кнопка занимает 100% ширины.
- **One:** flex-col, gap=`spacing/0` (один child — gap не визуален), кнопка занимает 100% ширины.

> **Важно:** контейнер **не** должен биндиться к `Platform/Width` (360 Android / 320 iOS). Если положить Buttons Stack в Dialog card 328 px — биндинг `width=360 + minWidth=360` заставит его вылезти за края card'а на 32 px. Эта ошибка была исправлена 2026-05-29 (см. История миграций). При создании новых variant'ов и встраивании компонента в другие контейнеры — оставлять FILL, не привязывать ширину.

---

## 4. Таблица токенов

### Размеры

| Параметр | Значение | Токен |
|---|---|---|
| Container width | FILL родителя (Dialog 328 / экран 320–360 / Sheet и т.п.) | **не биндить — определяется родителем** |
| Container min-w | — | **не задаётся** (раньше был hardcoded 360, удалён 2026-05-29 — ломал dialog 328) |
| Container padding horizontal | 16 | `spacing/4` |
| Container padding vertical | 20 | `spacing/5` |
| Gap между кнопками (Two H/V, Three V) | 12 | `spacing/3` |
| Gap (Type=One) | 0 | `spacing/0` |
| Button height | 48 | `control-height/md` (через инстанс Button) |
| Button radius / padding / typography / colors | — | по [button-spec.md](./button-spec.md), Size=md |

### Цвета

Все цвета приходят из инстансов Button, см. [button-spec.md](./button-spec.md) §«Цвета». Buttons Stack сам не вводит цветовых токенов.

---

## 5. Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| 🎨 Color | **100%** (через инстансы Button) |
| 🔲 Spacing | **100%** |
| 🔤 Typography | **100%** (через инстансы Button) |
| **Overall** | **100%** |

---

## 6. Использование

- В bottom-зоне шторки (Sheet) или диалога (Dialog) — fixed-плашка перед закрытием.
- В шапке профиля или карточке — CTA-блок.
- **Не использовать** для одиночной inline-кнопки в потоке формы (просто Button без обёртки).
- Если в дизайне нужна группа из 4+ кнопок — пересмотреть UX (вертикальная навигация / меню / список действий), стек не масштабируется выше Three Vertical.

---

## 7. Связанные документы

- [button-spec.md](./button-spec.md) — родительский Button (Size=md, Type=Primary/Secondary), на котором строится стек
- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — шкалы spacing / control-height
- [sheets-spec.md](./sheets-spec.md) — основной потребитель Buttons Stack в bottom-зоне
- [dialog-spec.md](./dialog-spec.md) — Buttons Stack как footer диалога

---

## 8. История миграций

**2026-05-29 — fix overflow в Dialog: убрана привязка `width`/`minWidth` к Platform/Width.**

Симптом: в Dialog (master 328 px) инстанс Buttons Stack выпирал на 32 px за края card'а. Корень: все 5 variant'ов master'а `Buttons Stack` имели `width` и `minWidth` забинденные на `Platform/Width` (360 Android / 320 iOS). При `lsH=FILL` биндинг `minWidth=360` работал как «не сжимайся ниже 360» — в Dialog 328 это давало overflow.

Правки в Figma (master `4608:1492`):
- Удалены `boundVariables.width` и `boundVariables.minWidth` на всех 5 variant'ах (Type=One, Two Horizontal, Two Horizontal Reverse, Two Vertical, Three Vertical).
- `minWidth` сброшен в `null`.
- `Type=One` переведён с `lsH=FIXED` на `lsH=FILL` (был единственный FIXED в наборе).
- Все variant'ы: `layoutAlign=STRETCH`.

Правки в Dialog (consumer):
- Инстансы Buttons Stack в `Dialog/Alignment=Left` (`4701:343`) и `Dialog/Alignment=Center` (`6632:20`) переведены с `lsH=FIXED` на `lsH=FILL`, `layoutAlign=STRETCH`. Теперь они корректно сидят в 328 (как и должны).

Side-effect: в любых других potential consumer'ах Buttons Stack (Sheet, FAB Bar и т.п.) если был FIXED override — нужно сверить, что инстанс берёт FILL от родителя. Massive consumer-audit не делался в этом фиксе — точечные правки потенциально нужны при обнаружении.

**2026-05-12 — аудит готовности (component-spec-check), 3 правки в Figma.**

- Опечатки в variant property `Type`: `Two Horisontal` → **`Two Horizontal`**, `Two Horisontal Reverce` → **`Two Horizontal Reverse`**. Переименованы child-варианты (`4608:1496`, `4608:1500`), variant options Figma пересобрал автоматически. Это ломало TS-enum на стороне разработки.
- `Type=One` (`4608:1493`) `itemSpacing` был привязан к нестандартному токену `Spacing/12 px` (с пробелом и units в имени). Перепривязан на **`spacing/0`** (для одиночного child gap не визуален), значение `0`.
- Все остальные 4 варианта (`Two Horizontal`, `Two Horizontal Reverse`, `Two Vertical`, `Three Vertical`) уже на `spacing/3` — не тронуты.

**Аудит покрытия токенами:** 100%. Все 5 вариантов корректно наследуют цвета/typography из Button md и используют canonical-spacing.

Buttons Stack → ✅ готов к разработке.

> **Note:** Переменная `Spacing/12 px` остаётся в библиотеке (источник — внешняя palette), но в этом файле больше не используется. Удаление переменной — на стороне owner'ов библиотеки, если решат вычистить.
