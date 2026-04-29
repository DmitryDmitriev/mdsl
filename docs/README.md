# Документация для разработки

Папка `docs/` — **спеки и фундамент** дизайн-системы для кода и Storybook. Материалы исключительно для **Figma** в репозиторий не выкладываются.

## Фундамент

| Файл | Назначение |
|------|------------|
| [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) | Отступы, радиусы, высоты, border, правила токенов |
| [COLOR-PALETTE.md](./COLOR-PALETTE.md) | Цветовая семантика |
| [TYPOGRAPHY.md](./TYPOGRAPHY.md) | Шрифт, стили текста |
| [elevation-spec.md](./elevation-spec.md) | Elevation (3 токена: Top / Floating / Bottom) |

## Спеки и готовность компонентов

Легенда: ✅ готов (код + Storybook) · 📝 спека · ⏳ нет спеки

| Компонент | Спека | Код | Storybook | Сложность |
|-----------|-------|-----|-----------|-----------|
| Button | [spec](./button-spec.md) | ✅ | ✅ | M |
| Avatar | [spec](./avatar-spec.md) | ✅ | ✅ | S |
| Badge | [spec](./badge-spec.md) | ✅ | ✅ | S |
| Sheets | [spec](./sheets-spec.md) | ✅ | ✅ | L |
| Divider | [spec](./divider-spec.md) | 📝 | — | XS |
| Switch | [spec](./switch-spec.md) | 📝 | — | S |
| Checkbox | [spec](./checkbox-spec.md) | 📝 | — | S |
| Radio | [spec](./radio-spec.md) | 📝 | — | S |
| Chips | [spec](./chips-spec.md) | 📝 | — | M |
| List Item | [spec](./list-item-spec.md) | 📝 | — | M |
| FAB Bar | [spec](./fab-bar-spec.md) | 📝 | — | M |
| Input v2 | [spec](./input-v2-spec.md) | 📝 | — | L |
| Search v2 | [spec](./search-spec.md) | 📝 | — | L (зависит от Input) |
| Top App Bar v2 | [spec](./top-app-bar-spec.md) | 📝 | — | L |
| Dialog | [spec](./dialog-spec.md) | 📝 (✅ Figma) | — | L |
| Tabs | [spec](./tabs-spec.md) | 📝 (✅ Figma) | — | M |
| Alert | [spec](./alert-spec.md) | 📝 (✅ Figma) | — | S |
| Segment Control (Android M3) | — | — | — | копия M3 на странице 🟢 Segment Control |
| ~~DialogIllustration~~ | [redirect](./dialog-illustration-spec.md) | superseded → Dialog | — | — |

**Итого:** 4 / 15 готово в коде (27%). В Figma готовы как ComponentSets: Dialog `6632:39`, Tabs `6793:696` на странице 🟢 Tabs (с building block `.=Tab Item` `6760:13377`), Android Segment Control `888:7950` на странице 🟢 Segment Control. iOS Apple-native Segment Control упразднён — заменён на Tabs (Radix-стиль). `DialogIllustration` упразднён — это use-case основного `Dialog` (`Image=true`).

## Очередь реализации (по скорости)

Логика: сначала атомарные контролы без зависимостей — они дают быстрый прирост покрытия и нужны для составных компонентов (List Item, Dialog, Sheets-контент).

1. **Divider** — XS, один токен-цвет, 2–3 варианта.
2. **Switch** — S, изолированный контрол, без слотов.
3. **Checkbox** — S, пара состояний, общий паттерн с Radio.
4. **Radio** — S, переиспользует решения Checkbox.
5. **Chips** — M, после атомов; даёт visible win в фильтрах/поиске.
6. **List Item** — M, разблокирует контент Sheets и меню.
7. **FAB Bar** — M, использует готовый Button.
8. **Input v2** → **Search v2** — L, Search строится на Input.
9. **Top App Bar v2** — L, использует Button/Avatar/Badge.
10. **Dialog** — L, в конце (составной; Figma уже финален, остаётся код).
