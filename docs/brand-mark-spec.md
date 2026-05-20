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

**Logo как Placeholder:** по умолчанию внутри стоит `brand/Placeholder` — пустой 32×32 компонент с серым «?». Designer свапает на конкретный brand-компонент через right-click → Swap instance, либо (когда добавим INSTANCE_SWAP property) через property panel.

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

Вставить Brand Mark на canvas → правый клик на Logo → Swap instance → выбрать `32 / ic_<Brand>` из библиотеки Assets.

### Внутри List Item

Часть composite-variant'а `Left Side / Type=Checkbox + Brand`. См. [list-item-spec.md](./list-item-spec.md) §3.

### Источник логотипов

Логотипы марок — отдельная библиотека Assets (Figma file `iRb5cHw514oCpucz44gjGv`, section `1580:1189` для автомобильных брендов). Формат имени: `32 / ic_<Brand>` (например, `32 / ic_BMW`, `32 / ic_Mazda`).

**Покрытие на 2026-05-20:** 15 автомарок (Alfa, Alpin, Asia, Aston, Audi, Bently, Bugatti, Cadillac, Chevrolet, Merc, Mazda, Nissan, VW, Skoda, BMW). Остальные марки и категории — добавляются в Assets по мере необходимости.

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

**2026-05-20 — введён атом Brand Mark.**

- Появилась потребность на задаче PB-876 (multiselect марок авто): List Item с чекбоксом и логотипом одновременно.
- Рассматривали 4 подхода: параметризация Avatar (отклонено — у Figma нет нативной IMAGE component property), manual fill override (отклонено — cumbersome UX), frontend-side swap (отклонено — дизайнер не видит реальный бренд в макете), отдельный атом + INSTANCE_SWAP (принято).
- Стартовая реализация: контейнер с auto-layout + border + radius/full (круглый, как Avatar). После тестирования с реальными логотипами из Assets откатили к: layoutMode=NONE + центрированный slot + квадратный + прозрачный — visual меньше шумит, контейнер не «давит» на лого с собственным фоном.
- INSTANCE_SWAP component property пока НЕ добавлена (Figma plugin API падает на `addComponentProperty` для INSTANCE_SWAP). Swap работает через right-click. Property добавим вручную через Figma UI после публикации library.
- Подробности эволюции дизайна — proposals в `docs/proposals/brand-mark-atom.md` и `docs/proposals/list-item-checkbox-brand.md`.
