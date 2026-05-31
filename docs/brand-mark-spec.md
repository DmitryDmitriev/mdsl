# Brand Mark — спецификация атома

Атом-контейнер для отображения логотипа бренда в списках, карточках и других плотных UI-композициях. **Не Avatar:** Avatar для людей (initials, photo, illustration). Brand Mark для компаний/марок (BMW, Toyota, и т.п.).

**Figma:** страница **🟢 Brand Mark**, компонент **Brand Mark**.

---

## 1. Обзор

Brand Mark — фиксированный квадратный контейнер 40×40 с центрированным внутри слотом для логотипа (32×32 max). Логотип подменяется через **swap instance**.

Семантическое разделение: Brand Mark ≠ Avatar. В коде разные API:

```
Avatar(initials, photo?, illustration?)
BrandMark(brandId)
```

---

## 2. Структура

```
Brand Mark (COMPONENT, 40×40, layoutMode=NONE)
├── fill: прозрачный
├── radius: 0 (квадрат)
├── border: нет
└── Logo (INSTANCE, 32×32)
    ├── position: x=4, y=4 (центрирован в 40 контейнере)
    └── constraints: { horizontal: CENTER, vertical: CENTER }
        — позволяет swap'ить на лого другого размера, оставаясь центрированным
```

**Почему не auto-layout:** при `instance.swapComponent()` на лого с другим sizing-mode (например, лого из библиотеки Assets имеет свой layout), auto-layout-обёртка может пересчитать размер контейнера. С `layoutMode=NONE` + constraints — контейнер всегда строго 40×40.

**Logo как INSTANCE_SWAP (с 2026-05-29):** Logo bound к component property `Logo` (тип INSTANCE_SWAP). Designer свапает через property panel инстанса — там dropdown с 15 preferredValues (см. §4 «Источник логотипов»). Right-click → Swap instance тоже работает как fallback (для логотипов вне preferred list).

**Дефолт — `32 / ic_Audi`** (распознаваемый логотип, читается как «образец» при placement-у на canvas). До 2026-05-29 дефолт был `brand/Placeholder` с серым «?» — это создавало впечатление, что компонент сломан. Placeholder остался самостоятельным компонентом, его можно вернуть через right-click → Swap instance, если в макете нужно показать «бренд не выбран».

---

## 3. Размеры и токены

| Параметр | Значение | Токен |
|---|---|---|
| Размер контейнера | 40 × 40 | `size/lg` |
| Inner logo (max) | 32 × 32 | — |
| Visual safe area | 4 px со всех сторон | `spacing/1` |
| Radius | 0 | — |
| Border | — | — |
| Background | прозрачный | — |

**Visual safe area 4px** — между визуальными границами лого и контейнера. Гарантирует, что в композиции List Item / Card логотип не сливается с соседними элементами.

---

## 4. Использование

### Прямое использование

Вставить Brand Mark на canvas → выбрать в правой панели свойство **`Logo`** → выбрать бренд из dropdown (15 preferredValues).

### Внутри List Item

Часть composite-variant'а `Left Side / Type=Checkbox + Brand`. См. [list-item-spec.md](./list-item-spec.md) §3. Свойство `Logo` пробрасывается через инстанс — designer выбирает бренд на уровне List Item.

### Источник логотипов

Логотипы марок — отдельная библиотека Assets (Figma file `iRb5cHw514oCpucz44gjGv`, section `1580:1189` для автомобильных брендов). Формат имени: `32 / ic_<Brand>` (например, `32 / ic_BMW`, `32 / ic_Mazda`).

**INSTANCE_SWAP property `Logo` — preferredValues (15 брендов, 32×32):**

| Brand | Component name | Key |
|---|---|---|
| Alfa Romeo | `32 / ic_Alfa` | `039e04bac9635282cb1ff32e4e405f5c913c054a` |
| Alpine | `32 / ic_Alpin` | `a0581bbabfcd938934572f21cff3fb5c6a168f9d` |
| Asia | `32 / ic_Asia` | `f06f710f81da97738fd25a9108c8dd04d404ebb4` |
| Aston Martin | `32 / ic_Aston` | `33a74408cff948dc79b117f3acdc2341c9322880` |
| **Audi (default)** | `32 / ic_Audi` | `ccb0c372e9bdada0c3cf850a02d4909298a57f6e` |
| Bentley | `32 / ic_Bently` | `1dac1c5553442f344fb9041ee9d4d397f66acd03` |
| BMW | `32 / ic_BMW` | `893ba0e1096c973d4bae28a9ac3e39900a29a128` |
| Bugatti | `32 / ic_Bugatti` | `60ecfb81eac713d03febcd5e2504567b489c90a8` |
| Cadillac | `32 / ic_Cadillac` | `6271d3b7282ae626c37cdc714a1d0a2fef4d590c` |
| Chevrolet | `32 / ic_Chevrolet` | `181a3b7d7649a290c9c0108635400e806b4098a6` |
| Mazda | `32 / ic_Mazda` | `e2e6c854255585beca3f3a9222c027327e44663d` |
| Mercedes-Benz | `32 / ic_Merc` | `07e9bede138a6e6316eac2f7091298ff0dece871` |
| Nissan | `32 / ic_Nissan` | `3412e6540896eedbabf2908bb94150fd00e92e3e` |
| Škoda | `32 / ic_Skoda` | `99ed68fdf444e7d15c414fc0976a71c8ba231f0a` |
| Volkswagen | `32 / ic_VW` | `cd0f46d3617d13b8b8d1de2cc9b5ae24185889d7` |

**24×24 версии** этих брендов в Assets тоже есть (`24 / ic_<Brand>_24`), но в Brand Mark не используются — slot 32×32, меньший размер выглядел бы потерянным с воздухом. Они для других контекстов (inline list item icon без обёртки Brand Mark, например).

**Покрытие категорий:** сейчас 15 автомобильных брендов. Остальные марки авто и другие категории (бытовая техника, телекомы и т.п.) — добавляются в Assets и в preferredValues по мере необходимости. Если нужный бренд отсутствует в preferredValues — designer всегда может swap'нуть через right-click → Swap instance на любой 32×32 компонент.

**Без подходящего бренда** — оставить дефолтный Audi на стадии mockup'а, либо вернуть `brand/Placeholder` (компонент `9264:11`, серый `?`) если нужно показать «состояние без выбора».

---

## 5. Аудит покрытия токенами

| Категория | Покрытие |
|---|---|
| Размеры | **100%** (40×40 — `size/lg`, padding — `spacing/1`) |
| Цвет | n/a (контейнер прозрачный) |
| Border | n/a (отсутствует) |
| Overall | **100%** |

---

## 6. Синхронизация с кодом

**Android (Compose):**
```kotlin
@Composable
fun BrandMark(brandId: BrandId, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier.size(40.dp),
        contentAlignment = Alignment.Center
    ) {
        BrandLogo(brandId = brandId, modifier = Modifier.size(32.dp))
    }
}
```

**iOS (SwiftUI):**
```swift
struct BrandMarkView: View {
    let brandId: BrandId
    var body: some View {
        BrandLogoView(brandId: brandId)
            .frame(width: 32, height: 32)
            .frame(width: 40, height: 40, alignment: .center)
    }
}
```

**Открытый вопрос для разработки:** как бренд-ассеты попадают в приложение — bundled (compile-time enum), remote (URL по brand id), или гибрид? Этот выбор определяет тип BrandId (sealed class vs String) и стратегию кэширования.

---

## 7. Связанные документы

- [list-item-spec.md](./list-item-spec.md) — где Brand Mark используется впервые (Type=Checkbox + Brand)
- [avatar-spec.md](./avatar-spec.md) — для отличия Brand vs Avatar
- [composition-rules.md](./composition-rules.md) — правила композиции экрана

---

## 8. История

**2026-05-29 — INSTANCE_SWAP property `Logo` + дефолт переключён на Audi.**

- Раньше Brand Mark показывал `?` (placeholder) по умолчанию — в продуктовых файлах и в DS-документации это создавало впечатление, что компонент сломан / не до конца сделан.
- Добавлена component property **`Logo`** (тип INSTANCE_SWAP) с **15 preferredValues** — все 32×32 car-логотипы из Assets `Car` section (`1580:1189`). Полный список — в §4 «Источник логотипов».
- Дефолт переключён с `brand/Placeholder` (9264:11) на **`32 / ic_Audi`** (`9461:20` локальный id после импорта; key `ccb0c372e9bdada0c3cf850a02d4909298a57f6e`). Audi выбран как distinctive + universally recognizable логотип, читается как «образец» в DS.
- Placeholder остался отдельным компонентом (не удалён), его можно вернуть через right-click → Swap instance.
- Раньше в этом spec'е был open task «INSTANCE_SWAP падает в plugin API» — решено через паттерн «pre-import component → use `.id` как defaultValue» (тот же подход, что для Empty State `Illustration source` и Chips Notification slot). Теперь работает.

**2026-05-20 — введён атом Brand Mark.**

- Появилась потребность на задаче PB-876 (multiselect марок авто): List Item с чекбоксом и логотипом одновременно.
- Рассматривали 4 подхода: параметризация Avatar (отклонено — у Figma нет нативной IMAGE component property), manual fill override (отклонено — cumbersome UX), frontend-side swap (отклонено — дизайнер не видит реальный бренд в макете), отдельный атом + INSTANCE_SWAP (принято).
- Стартовая реализация: контейнер с auto-layout + border + radius/full (круглый, как Avatar). После тестирования с реальными логотипами из Assets откатили к: layoutMode=NONE + центрированный slot + квадратный + прозрачный — visual меньше шумит, контейнер не «давит» на лого с собственным фоном.
- INSTANCE_SWAP component property на старте НЕ была добавлена (Figma plugin API падал на `addComponentProperty` для INSTANCE_SWAP). Swap работал через right-click. **Закрыто 2026-05-29.**
- Подробности эволюции дизайна — proposals в `docs/proposals/brand-mark-atom.md` и `docs/proposals/list-item-checkbox-brand.md`.
