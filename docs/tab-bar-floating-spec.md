# Floating Tab Bar — спецификация

Плавающий вариант нижней навигации: скруглённый бар-пилюля, оторванный от нижнего края экрана, лежащий поверх контента (iOS-эстетика floating navigation). Приходит на смену прижатому таб-бару и становится основным навигационным паттерном приложения.

Figma: **`Tab Bar / Floating`** (COMPONENT_SET `12070:1292`), страница **🟢 Tab Bar** в UI Kit Mobile. Пересобран 2026-10-28 по эталону продукта (`11922:1477`); заменил старую сборку `11700:454` (удалена).

Anchored (прижатый) таб-бар — в [tab-bar-spec.md](./tab-bar-spec.md). Этот документ — только про floating.

---

## 1. Floating vs anchored — почему отдельный компонент

Отдельный компонент, а **не** ось `Style` на `Tab Bar` (`4318:873`):

- anchored-бар маппится на нативные контролы (UITabBar / NavigationBar) и делится по `Type=Android/iOs`;
- floating — **кастомный кросс-платформенный** паттерн (не нативный), платформенного деления не имеет;
- ось `Style` внутри нативного набора дала бы избыточные `Android×Floating` / `iOs×Floating` дубли.

Поэтому floating — сосед в семействе Tab Bar, а не вариант нативного бара.

---

## 2. Ячейка — `.=Tab Bar Button` (`5879:799`)

Бар собран из отдельного компонента-ячейки `.=Tab Bar Button` (COMPONENT_SET `5879:799`, стр. «🟢 Tab Bar»). Ячейка — 80×48, VERTICAL: иконка 24×24 по центру сверху, лейбл fs10 под ней.

| Свойство ячейки | Тип | Значения / дефолт |
|---|---|---|
| **`Selected`** | VARIANT | `True` / `False` |
| **`Label`** (`#5735:10`) | TEXT | текст лейбла |
| **`Pin`** (`#12069:0`) | BOOLEAN | `false` (дефолт) — опциональный красный пин оповещения |

- **`Selected=True` → активный таб:** подложка-пилюля `Background/Tertiary`, **заливная** иконка `Text&Icon/Primary`, лейбл `Text&Icon/Primary`.
- **`Selected=False` → неактивный:** без подложки, **outline**-иконка `Text&Icon/Secondary`, лейбл `Text&Icon/Secondary`.

---

## 3. Иконки — пара outline / fill на таб

Активное состояние = **залитая** иконка, неактивное = **контурная**. Это основной маркер активности (помимо цвета и пилюли) и не-цветовой A11y-признак.

| Таб | Outline (inactive) | Fill (active) |
|---|---|---|
| Home | `ic_House` | `ic_House_fill` |
| Favorite | `ic_favorite` | `ic_favorite_fill` |
| New ad | `ic_add_round` | `ic_add_round_fill` |
| Messages | `ic_chats` | `ic_chats_fill` |
| Profile | `ic_person` | `ic_person_fill` |

Иконки — из SECTION «tab icon» (`12056:2630`). Состав 5 табов фиксирован: **Home / Favorite / New ad / Messages / Profile**.

---

## 4. Пин оповещения (`Pin`)

Опциональный красный dot в правом-верхнем углу иконки (BOOLEAN-свойство на ячейке, по умолчанию выключен). Числовых счётчиков нет — см. §7.

| Параметр | Значение |
|---|---|
| Форма / размер | ELLIPSE 7×7 |
| Fill | `Accent/Negative` |
| Обводка (ring) | контекстная: активный таб → `Background/Tertiary` (цвет пилюли), неактивный → `Background/Secondary` (цвет бара); strokeWeight 1.5, OUTSIDE |
| Позиция | ABSOLUTE, правый-верх иконки (icon_x+16 / icon_y+1), constraints `{horizontal: CENTER, vertical: MIN}` |

Обводка пина цветом фона-носителя даёт «вырез» — пин не слипается с глифом.

---

## 5. Варианты — `Active` × `Language` (25)

Локализация **зашита в компонент** отдельной осью (референс-макет шёл с 5 языками):

| Ось | Значения |
|---|---|
| **Active** | `Home` / `Favorite` / `New ad` / `Messages` / `Profile` |
| **Language** | `English` / `Ελληνικά` / `Тоҷикӣ` / `Монгол` / `Русский` |

5 × 5 = **25 вариантов**. Выбор языка меняет лейблы всех пяти табов разом.

**Переводы разделов (зашиты в компонент, проверено 2026-11-05 — все 25 заполнены):**

| Раздел | EN | Ελληνικά | Тоҷикӣ | Монгол | Русский |
|---|---|---|---|---|---|
| Home | Home | Αρχική | Асосӣ | Хайлт | Главная |
| Favorite | Favorite | Αγαπημένα | Дӯстдошта | Таалагдсан | Избранное |
| New ad | New ad | Προσθήκη | Эълон | Зар нэмэх | Добавить |
| Messages | Messages | Μηνύματα | Чатҳо | Мессеж | Сообщения |
| Profile | Profile | Προφίλ | Профил | Профайл | Профиль |

Формулировки — зона переводчиков; при изменении они напишут. Отдельного файла-источника нет, канон живёт в самом компоненте (это и есть результат стресс-теста локализации).

---

## 6. Контейнер-бар и токены

```
Tab Bar / Floating (COMPONENT_SET, оси Active × Language)
└── бар — HORIZONTAL, pill (cornerRadius 999), fill Background/Secondary, Elevation/Floating
    ├── min-width 344, clipsContent = false (тень не обрезается)
    └── 5 × .=Tab Bar Button (одна Selected=True, остальные False)
```

| Элемент | Значение | Токен |
|---|---|---|
| Бар fill | Secondary (адаптив по теме) | `Background/Secondary` |
| Бар radius | pill | `cornerRadius 999` |
| Бар elevation | Floating (в Dark теней нет — elevation-spec) | `Elevation/Floating` |
| Бар min-width | 344 | — |
| Активный таб — пилюля | сплошной, адаптив | `Background/Tertiary` |
| Активная иконка / лейбл | заливная / Primary | `Text&Icon/Primary` |
| Неактивная иконка / лейбл | контурная / Secondary | `Text&Icon/Secondary` |
| Пин fill / ring | негатив / контекстный фон | `Accent/Negative` + `Background/Tertiary`‖`Background/Secondary` |

Покрытие токенами — **100%** (fills / radius / elevation-style / spacing / text привязаны; проверено 2026-11-05).

---

## 7. Решения

- **Активный индикатор — pill + fill-иконка (осознанное отличие от anchored).** Anchored (§5 tab-bar-spec) отверг pill в пользу accent-цвета. Для floating pill возвращён: на тёмной / медиа-поверхности цветовой accent читается хуже, чем плашка-подложка. Плюс смена формы иконки (outline→fill) — дополнительный не-цветовой маркер (A11y). Плашка — **сплошной `Background/Tertiary`**, НЕ opacity-приём (paint-level opacity на bound-краске нестабильна через пайплайн компонент→инстанс — рендерилась в 100%).

- **`clipsContent = false`** на баре и сете — иначе `Elevation/Floating` обрезается рамкой компонента.

- **Тема — адаптивная** (референс-макет был Dark). Компонент не пиннит variable-режим — наследует контекст экрана.

- **Прозрачность / блюр — нет (решение 2026-11-05).** Фон бара сплошной `Background/Secondary` — **как у `FAB Bar`** (у него тоже сплошная поверхность, без effect-стиля и блюра). Floating-бар и FAB держим консистентными: блюр-материал не вводим ни в Figma, ни в коде. (Референс-макет был полупрозрачным поверх фото — от этого отказались ради консистентности с FAB.)

- **Счётчики на табах — не нужны (решение 2026-11-05).** Числовой Badge-counter во floating не вводим; индикатор непрочитанного — `Pin` (точка `Accent/Negative`).

---

## 8. Code Connect

Компонент привязан к коду как **`AppFloatingTabBar`** (label Compose) — в Dev Mode показывает имя компонента (по аналогии с anchored `AppTabBar`).

Рекомендуемый Compose-API (финальные имена иконок и компонента — за разработкой; active/inactive fill-swap делает сам компонент):

```kotlin
AppFloatingTabBar(
    items = listOf(
        AppTabBarItem(icon = Icons.House, label = "Home"),
        AppTabBarItem(icon = Icons.Favorite, label = "Favorite"),
        AppTabBarItem(icon = Icons.Add, label = "New ad"),
        AppTabBarItem(icon = Icons.Chats, label = "Messages"),
        AppTabBarItem(icon = Icons.Person, label = "Profile"),
    ),
    selectedIndex = 0,
    onSelect = {},
)
```

Реальный blur-материал не вводим (см. §7).

---

## 9. Связанные документы

- [tab-bar-spec.md](./tab-bar-spec.md) — anchored (прижатый) Tab Bar, общий контекст семейства
- [elevation-spec.md](./elevation-spec.md) — `Elevation/Floating`
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — `Background/Secondary`, `Background/Tertiary`, `Text&Icon/*`, `Accent/Negative`
- [TYPOGRAPHY.md](./TYPOGRAPHY.md) — лейбл fs10 (`Caption`)
- [tabs-spec.md](./tabs-spec.md) — in-page навигация (не root)

---

## 10. История

**2026-11-05 — вынесен в отдельный файл.** Контент перенесён из `tab-bar-spec.md §7a` (теперь там указатель сюда). Триггер — хендофф в разработку (CD-6705) и буквальное совпадение с KR OKR Skailer goal 4888 «tab-bar-floating-spec.md опубликована». Добавлены: таблица переводов (5 языков), секция Code Connect (`AppFloatingTabBar`), зафиксированы решения 2026-11-05 (блюр нет / каунтер не нужен).

**2026-11-05 — решения к хендоффу:** блюр/прозрачности нет (фон сплошной, как у FAB Bar); числовой каунтер не нужен (индикатор — `Pin`); переводы на 5 языков зашиты в компонент; UI Kit опубликован.

**2026-10-28 — пересборка по эталону (`12070:1292`).** Старая сборка `11700:454` удалена, floating пересобран по эталонной ноде продукта `11922:1477`. Бар fill → `Background/Secondary`, `min-width 344`, `cornerRadius 999`, `clipsContent=false` (тень `Elevation/Floating` не обрезается).

**2026-09-28 — первый сбор (новый компонент).** По запросу продукта собран плавающий вариант таб-бара (`11700:454`), ось `Active` (5 табов), реюз building blocks. Активный индикатор — pill `Background/Tertiary`; контейнер — pill + `Elevation/Floating`; адаптив по теме.
