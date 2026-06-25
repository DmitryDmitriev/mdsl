# Motion — токены анимации

Слой движения Larixon Mobile DS: длительности и кривые для переходов, появления/исчезновения и микроинтеракций. До этого motion нигде не был зафиксирован — каждый разработчик подбирал тайминги сам.

**Figma:** коллекция переменных **«Motion»** хранит только `duration/*` (FLOAT, мс). Easing-кривые переменными в Figma не хранятся — задаются в прототипе через Smart Animate / custom bezier, а каноничные значения — в этой спеке. Визуальный референс — страница-док `4334:52`, фрейм «Motion — токены анимации».

---

## 1. Durations (`duration/*`, мс)

| Токен | мс | Когда |
|---|---|---|
| `duration/instant` | 0 | Без анимации (мгновенно) |
| `duration/fast` | 100 | Микро: switch, checkbox, radio, state-layer, нажатия |
| `duration/base` | 200 | Дефолт: fade, мелкие перемещения, Snackbar/Tooltip/Popover |
| `duration/slow` | 300 | Sheet / Dialog вход, крупные панели |
| `duration/slower` | 400 | Полноэкранные переходы, Stories |

При сомнении — `duration/base` (200).

---

## 2. Easings (cubic-bezier)

| Токен | cubic-bezier | Когда |
|---|---|---|
| `easing/standard` | `(0.2, 0, 0, 1)` | Большинство переходов, переключения состояний |
| `easing/decelerate` | `(0, 0, 0, 1)` | Появление / вход (входит и тормозит) |
| `easing/accelerate` | `(0.3, 0, 1, 1)` | Уход / выход (разгоняется и улетает) |

**Правило осей входа/выхода:** вход элемента — `decelerate`, выход — `accelerate`, изменение на месте (toggle, state) — `standard`.

**Figma:** в Smart Animate выбирается Custom (bezier) с этими значениями. Линейный easing (`linear`) — только для непрерывных индикаторов (Progress, Skeleton shimmer).

---

## 3. Что чем анимируется

| Паттерн | Duration | Easing |
|---|---|---|
| Sheet / Dialog — вход | `slow` (300) | `decelerate` |
| Sheet / Dialog — выход | `base` (200) | `accelerate` |
| Snackbar / Tooltip / Popover — появление | `base` (200) | `standard` |
| Snackbar / Tooltip / Popover — закрытие | `fast` (100) | `accelerate` |
| Switch / Checkbox / Radio / state-layer | `fast` (100) | `standard` |
| Полноэкранные (Stories, переход экранов) | `slower` (400) | `standard` |
| Progress fill / Skeleton shimmer | непрерывно | `linear` |

---

## 4. Доступность

- Уважать `prefers-reduced-motion` (iOS Reduce Motion / Android remove animations): крупные перемещения и авто-переходы заменять на мгновенный показ (`instant`) или короткий fade (`fast`), убирать parallax/spring.
- Анимация не должна нести единственный смысл (не полагаться на движение для передачи состояния — дублировать цветом/иконкой/текстом).

---

## 5. Связанные документы

- [stories-spec.md](./stories-spec.md) — полноэкранные переходы (`slower`), reduce-motion для авто-перелистывания.
- [sheets-spec.md](./sheets-spec.md), [dialog-spec.md](./dialog-spec.md) — вход/выход панелей.
- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — primitive-токены (motion стоит рядом как foundation-слой).
