# Brand Mark — новый атом для бренд-логотипов

**Статус:** proposal, ждёт ответа разработки. После апрува — `brand-mark-spec.md` + публикация атома.

**Контекст:** для списков с брендированными сущностями (марки авто в PB-876, категории с лого, другие brand-aware кейсы) нужен переиспользуемый контейнер с логотипом. Avatar для этого не подходит (см. [list-item-checkbox-brand.md](./list-item-checkbox-brand.md) — раздел «Почему Brand Mark, а не Avatar»).

---

## Назначение

`Brand Mark` — атом-контейнер для отображения логотипа бренда в списках, карточках и других плотных UI-композициях.

**НЕ путать с Avatar:** Avatar для людей (initials, photo, illustration). Brand Mark для компаний/марок (BMW, Toyota, и т.п.).

---

## Структура

```
Brand Mark (40×40)
├── radius/full (circle)
├── 1px Border/Default (внутрь, чтобы лого с белым фоном было различимо)
├── fill: прозрачный (background — ответственность ассета)
└── Logo (instance, 32×32, центрирован)
    └── INSTANCE_SWAP property `Logo` → designer свапает через property panel
```

| Параметр | Значение | Токен |
|---|---|---|
| Размер контейнера | 40×40 | `size/lg` |
| Inner image max | 32×32 | safe area 4px по краям |
| Padding | 4 | `spacing/1` |
| Radius | full (circle) | `radius/full` |
| Border | 1px | `Border/Default` |
| Background | прозрачный | — |

---

## INSTANCE_SWAP property `Logo`

**Default value:** `brand/Placeholder` (минимальный компонент 32×32 с серым «?» внутри — показывает, что лого не задан).

**Preferred values:** список топ-N брендов (`brand/BMW`, `brand/Toyota`, ...) — выводится в выпадающем меню INSTANCE_SWAP в property panel.

**UX:** designer выделяет Brand Mark инстанс → в правой панели Properties видит `Logo` dropdown → выбирает нужный бренд из списка.

---

## Стартовый набор `brand/*`

Топ-20 авто-брендов для PB-876 (создаём пачкой):

BMW, Toyota, Mercedes-Benz, Mazda, Nissan, Honda, Audi, Volkswagen, Ford, Hyundai, Kia, Lexus, Mitsubishi, Renault, Skoda, Chevrolet, Volvo, Subaru, Suzuki, Land Rover.

Каждый — отдельный COMPONENT 32×32, name `brand/<Name>`, на странице `🟢 Brand Mark` в UI-Kit-Mobile.

**Что внутри `brand/<Name>`:** PNG/SVG лого, fit в 32×32, transparent background, центрирован.

**Расширение набора:** по необходимости. Если в продукте появляется новый бренд — добавляем компонент, не меняя ничего в Brand Mark.

---

## Почему не другие подходы

Рассматривали 4 варианта (см. также чат-историю обсуждения):

| Подход | Почему отклонили |
|---|---|
| Параметризовать Avatar v2 через IMAGE property | Figma не поддерживает IMAGE component property. Только TEXT/BOOLEAN/INSTANCE_SWAP/VARIANT |
| Manual fill override на Avatar `Type=Photo` | Cumbersome UX (3 клика, заход внутрь инстанса). Не масштабируется на работу со списками |
| Frontend-side swap (placeholder в Figma, image из кода) | Дизайнер не видит реального бренда в макете → визуальные ошибки не ловятся в Figma |
| **Brand Mark + INSTANCE_SWAP** *(выбран)* | Property-уровень UX. Один атом, N мелких brand-компонентов. Семантически чистое разделение Brand ≠ Avatar |

---

## Что нужно от разработки

1. Подтвердить, что **Brand Mark** как отдельный атом — приемлемо со стороны имплементации.
2. **Как ассеты бренд-лого попадают в Mobile приложение?** Варианты:
   - Bundled assets (compile-time)
   - Remote URLs (download by brand id)
   - Гибрид (топ-N bundled, остальные remote)

   Этот вопрос определяет API компонента в коде: `BrandMark(brand: BrandId)` vs `BrandMark(imageUrl: URL)` vs both.

3. Подтвердить, что INSTANCE_SWAP паттерн в Figma → массив бренд-компонентов **в коде** мапится на enum/sealed-class brand IDs (а не на физическое наличие N компонентов в коде).

---

## Что НЕ делаем

- **Не вводим вариант `Brand Mark Without Border`** — пока. Если найдётся кейс «бренд на тёмной поверхности» — добавим variant. Сейчас не множим.
- **Не вводим размеры S/M/L** — пока. Один размер 40 покрывает PB-876 и большинство списочных кейсов. Если появится потребность в малом (24) для inline-badge'ей — добавим тогда.
- **Не делаем `Brand Mark` обёрткой Avatar** — несмотря на визуальную похожесть. Семантика разная, API разные. Forced unification приведёт к замусоренной модели.

---

## Прототип (для визуальной проверки)

В UI-Kit-Mobile, page `🟢 Brand Mark`:
- Brand Mark атом — node `9264:13`
- Placeholder logo — node `9264:11`

⚠️ **INSTANCE_SWAP property пока НЕ добавлена** на прототипе — `addComponentProperty` API падает с «Property value is incompatible with component property type» при `INSTANCE_SWAP` (issue в Figma plugin sandbox). Пока swap работает через right-click → Swap instance. После апрува property добавим вручную через Figma UI (не через plugin API).

---

## Связано

- [list-item-checkbox-brand.md](./list-item-checkbox-brand.md) — где Brand Mark используется впервые
- [composition-rules.md](../composition-rules.md) — правила композиции экрана
- [avatar-spec.md](../avatar-spec.md) — для отличия от Avatar
