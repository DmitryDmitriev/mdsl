# List Item — расширение Left Side: Checkbox + Brand

**Статус:** proposal, ждёт ответа разработки. После апрува — правки в `list-item-spec.md` + публикация компонентов.

**Контекст:** запрос возник на задаче мультиселекта марок (PB-876), но проблема системная. На row нужно **два** элемента слева одновременно: чекбокс выбора **и** визуальный маркер бренда (логотип).

**Текущее состояние компонента:** `List Item / Left Side` поддерживает ровно один `Type` на ряд (Checkbox **или** Avatar **или** Icon). Нет варианта «checkbox + что-то ещё».

---

## Связанные proposal'ы

- [brand-mark-atom.md](./brand-mark-atom.md) — новый атом `Brand Mark`, на котором строится этот variant. Идут пакетом.

---

## Предложение

Расширить `List Item / Left Side`, добавив composite-вариант:

| Новый variant | Состав | Кейсы |
|---|---|---|
| `Type=Checkbox + Brand` | `[Checkbox 24]` + gap + `[Brand Mark 40]` | Выбор марок авто, категорий с лого, любых брендированных сущностей |
| `Type=Checkbox + Icon` *(на будущее)* | `[Checkbox 24]` + gap + `[Icon 24]` | Выбор категорий, опций с иконкой |
| `Type=Checkbox + Avatar` *(на будущее)* | `[Checkbox 24]` + gap + `[Avatar 40]` | Выбор пользователей с фото/инициалами |

**Внутреннее устройство Left Side (Checkbox + Brand):**

```
Left Side (HORIZONTAL auto-layout)
├── Checkbox 24×24
├── gap = row/gap-default (8)
└── Brand Mark 40×40
```

Высота — 40 (по Brand Mark). Ширина — 72 (24 + 8 + 40).

**Композиция всей row не меняется:** Left Side остаётся одним слотом с одной property `Type`. Для разработки — это всё ещё один `LeftSide`-композит, просто внутри две view'хи.

---

## Почему Brand Mark, а не Avatar

Изначально предлагал переиспользовать Avatar для брендов. **Откатил**, потому что:

- В Figma **нет нативной IMAGE component property**. Только TEXT / BOOLEAN / INSTANCE_SWAP / VARIANT.
- Avatar `Type=Photo` имеет image fill «зашитым» в инстанс — чтобы заменить, дизайнер должен зайти внутрь инстанса и поменять fill вручную (3 клика, не через property panel).
- Это плохой UX при работе со списками брендов, где image надо менять часто.

**Решение:** отдельный атом `Brand Mark` с INSTANCE_SWAP property `Logo` — designer свапает бренд через property panel (один клик). Каждый бренд = отдельный мини-компонент `brand/*`.

Также: семантически `Brand ≠ Avatar`. Brand — это марка/компания, Avatar — человек. В коде разные API (`BrandMark(brandId)` vs `Avatar(initials, photo?)`). Лучше отразить и в DS.

Подробности атома → [brand-mark-atom.md](./brand-mark-atom.md).

---

## Почему не отдельный List Item

- Форк = двойная поддержка, расхождения токенов/стейтов со временем
- Сегодня — Brand. Завтра — `Checkbox + Icon`, `Radio + Avatar`, `Checkbox + Initials`. Через год — 8 параллельных листайтемов
- Правки самого List Item (новые стейты, изменения паддингов, новые токены) придётся применять везде вручную

---

## Что нужно от разработки

1. Подтвердить, что **расширение** Left Side (новый composite variant `Type=Checkbox + Brand`) реализуемо без переписывания всей цепочки компонента
2. Подтвердить, что **Brand Mark** как отдельный атом — приемлемо со стороны имплементации (вместо параметризации Avatar)
3. Если есть «сложно» по любому из пунктов — что именно? Скорее всего речь про связку `checkbox state ↔ row click` в Compose. Это инженерная задача, не повод форкать компонент или возвращаться к Avatar

---

## Что НЕ входит в компонент

- **Divider между rows** — НЕ часть List Item. Composition-уровень: дивайдер ставится снаружи между rows экрана, если нужен. По умолчанию — пустота 0 между rows, без дивайдера (см. [composition-rules.md](../composition-rules.md), §7).

---

## Что делаем со стороны дизайна

После апрува со стороны разработки:

1. Создаём атом `Brand Mark` в Mobile DS (Figma) — см. brand-mark-atom proposal
2. Создаём стартовый набор `brand/*` компонентов (топ-20 авто-марок: BMW, Toyota, Mercedes, Mazda, Nissan, Honda, Audi, ...)
3. Обновляем компонент `List Item / Left Side` — добавляем variant `Type=Checkbox + Brand`
4. Обновляем `list-item-spec.md` в этом репо
5. Перепубликовываем library

---

## Прототип (для визуальной проверки)

В UI-Kit-Mobile уже собран draft:
- Brand Mark атом — page `🟢 Brand Mark`, node `9264:13`
- Placeholder logo — node `9264:11`
- Новый Left Side variant — node `9264:18` (внутри `List Item / Left Side` COMPONENT_SET)

⚠️ **Library пока НЕ перепубликована.** Изменения локальны в UI-Kit-Mobile, для консьюмеров недоступны до апрува разработки и финальной публикации.

---

## Референс использования

Скриншот экрана с использованием — в чате PB-876, дата 2026-05-19. Brand logos: BMW, Mazda, Nissan, counter справа, chevron справа.

Связанные правила композиции: см. [composition-rules.md](../composition-rules.md).
