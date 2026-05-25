# Badge — добавить `Fill = Filled / Outline`

**Статус:** ✅ **RATIFIED 2026-05-25.** Финальная спека — [badge-spec.md](../badge-spec.md) §2 «Цвет» + §7 «Варианты (120 шт.)» + §История миграций. Figma: Badge COMPONENT_SET расширен до 120 вариантов. Этот документ оставлен как trail обсуждения.

**Контекст:** в недавней задаче (карточки объявлений / grid эксперимент A/B/C) понадобились outline-бейджи. На цветной картинке / image-фоне tinted-плашка сливается, а semantic-tint не всегда уместен (см. отдельный proposal про decorative-палитру). Outline даёт второй визуальный регистр — компактнее, тише, лучше работает на любом фоне.

---

## Предложение

Добавить новый axis в Badge:

| Axis | Values | Default |
|---|---|---|
| **Fill** *(новый)* | `Filled` / `Outline` | `Filled` |

Существующие axis'ы остаются:
- `Type` — 5 значений (good / info / warning / negative / neutral)
- `Size` — 6 (2xs / xs / sm / md / lg / xl)
- `Shape` — 2 (Pill / Rounded)

**Новая матрица:** 2 × 5 × 6 × 2 = **120 вариантов** (было 60).

---

## Внешний вид Outline

```
┌─────────────────┐
│ ✓ Verified  3   │   ← border 1px в цвете text&icon
└─────────────────┘     bg прозрачный
```

| Layer | Filled (текущий) | Outline (новый) |
|---|---|---|
| Background | `Background/Tinted/{type}` | `transparent` |
| Border | — (нет) | 1px solid `Text&Icon/on Tinted/{type}` |
| Text | `Text&Icon/on Tinted/{type}` | `Text&Icon/on Tinted/{type}` |
| Icon | `Text&Icon/on Tinted/{type}` | `Text&Icon/on Tinted/{type}` |

**Почему `Text&Icon/on Tinted/*` как border (а не отдельный `Border/Tinted/*`):**
- Coherent: border, text, icon — один тон, бейдж читается как монохромная плашка
- Не требует заводить новые токены в палитре (минимальное вторжение в DS)
- Контраст border'а на Surface/Primary — 6:1+ (по логике этих токенов; см. COLOR-PALETTE §2.8)

**Что не делаем:**
- ❌ Border = `Accent/{type}` — слишком ярко, conflicts с filled
- ❌ Border = `Border/Default` (Zinc/200) — теряется семантика (все outline-бейджи одинаковые)
- ❌ Background = `Surface/Primary` (white) — тогда outline не работает на тёмных фонах. Прозрачный bg универсальнее

---

## Spec-update в badge-spec.md

### §2 Токены — добавить раздел Border

```
### Border (только для Fill=Outline)
- **Filled**: border нет
- **Outline**: 1px solid `Text&Icon/on Tinted/{type}`, stroke align INSIDE
```

### §3 Размеры — указать что не меняются

Размеры контейнера в Outline идентичны Filled — высота, padding, типографика, иконки. Inside-stroke означает, что **визуальные границы плашки не растут на 2px**.

### §7 Figma — обновить variant count

`Type × Size × Shape × Fill = 5 × 6 × 2 × 2 = **120 вариантов**`

### Аудит покрытия — после реализации

Покрытие токенами должно остаться **100%** — Outline использует существующие токены палитры (`Text&Icon/on Tinted/*`), новых не вводит.

---

## Когда Filled vs Outline (guidance для дизайнеров)

| Сценарий | Filled | Outline |
|---|---|---|
| Бейдж на нейтральной поверхности (Card, List) | ✅ | OK |
| Бейдж на цветной картинке / image (ad card) | ⚠️ сливается | ✅ |
| Несколько бейджей подряд (visual rhythm) | первый — ✅ | следующие — ✅ |
| Иерархия «primary + secondary метки» | primary | secondary |
| Counter / notification dot | ✅ | ⚠️ слабо заметен |
| Dark mode на ярком фоне | ⚠️ | ✅ |

Решение в каждом конкретном случае — за дизайнером. Правило: **если непонятно — выбрать Filled** (исторически дефолт, нет визуального трения).

---

## Что нужно от разработки

1. Подтвердить, что добавление axis `Fill` в Badge — реализуемо без переписывания цепочки наследования
2. На Android (Compose) — это просто новый параметр компонента (`outlined: Boolean = false`) или нужно отдельный композитный API?
3. На iOS (SwiftUI) — то же самое

---

## Что НЕ входит в этот proposal

- **Decorative-палитра** (purple/orange/pink/cyan для VIP, Most viewed и т.п.) — отдельный proposal, идёт следующим шагом
- **Outline для chips, alerts** — отдельные компоненты; сначала Badge, прецедент, потом обобщаем
- **Borderless вариант** (только текст без border, transparent bg) — не вводим, нет реального use-case на сегодня (используется plain text вместо badge)

---

## Прототип

Пока не собран в Figma. После апрува — добавлю variant в COMPONENT_SET `Badge` в UI-Kit-Mobile, протестирую на нескольких размерах.

## Связано

- [badge-spec.md](../badge-spec.md) — текущая спека
- [COLOR-PALETTE.md](../COLOR-PALETTE.md) §2.4 Border, §2.8 Text & Icon / on Tinted
- Следующий proposal: `decorative-color-palette.md` — для решения проблемы «VIP как warning»
