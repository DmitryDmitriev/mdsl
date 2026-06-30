# PB-1580 — Discovery: Tooltip / Coach Mark / Popover (Context Menu) / Slider

**Тикет:** [PB-1580](https://larixon.atlassian.net/browse/PB-1580) `[DS Phase 2] Figma Components`, Design sub-task под [PB-1453](https://larixon.atlassian.net/browse/PB-1453) (умбрелла Mobile DS). Статус In Progress.

**Дата discovery:** 2026-06-30. Источники: Larixon Web DS (через `search_design_system`), наш Mobile DS (UI-Kit-Mobile + специи), индустрия (Material 3 / HIG).

---

## 1. Инвентарь по экосистеме

| Компонент | Larixon Web DS | Наш Mobile DS | Индустрия |
|---|---|---|---|
| **Tooltip** | ✅ `Tooltip` (component_set, обновл. 2026-03-06) | ✅ собран 2026-06-29 (`UI Kit Mobile / Tooltip`, COMPONENT_SET, 4 placement, WIP стр. `4334:52`) | M3 Plain/Rich; на тач — long-press (hover нет) |
| **Popover / Context Menu** | ✅ `DropdownMenu` + `DropdownMenu / Item` (обновл. 2026-06-25). Отдельного «Popover» нет | Context Menu — спека [context-menu-spec.md](./context-menu-spec.md) + нода `10417:41`, реестр ⏳. Popover — draft-база [popover-spec.md](./popover-spec.md) | M3 Menu; HIG context menu (long-press). «Popover» — iOS-термин для плавающего контейнера |
| **Slider** | ✅ `Slider` (component_set, обновл. 2026-02-11) | ✗ **greenfield** (реестр: Range Slider ⏳) | M3 continuous/discrete + range (two-thumb). Цена «от-до» = range |
| **Coach Mark** | ✗ **нет** | ✗ нет | Нет в наших DS; только сторонние onboarding-либы |

**Web DS reference keys** (для инспекции в момент спеки):
- Tooltip — componentKey `1ec8afbc1cc7ca3e399cfbb444c4739b98bc30c8`
- DropdownMenu — componentKey `114aa2015ad10aa372d9e5f501ced21e77b31560`
- Slider — componentKey `e8521af059d0a84e3774e1a39d43d43c9f48ff5b`
- Web DS libraryKey — `lk-6408f377...`

---

## 2. Выводы

1. **Tooltip — не discovery, а сверка.** Есть и в Web DS, и у нас (свежий). Перед финализацией свериться с Web DS Tooltip на анатомию/токены, с поправкой на тач (long-press вместо hover). Web DS = эталон сверки.

2. **Slider — единственный реальный greenfield с готовым эталоном.** Брать Web DS `Slider` за основу: single + range (two-thumb). Наш кейс «цена от-до» = range. Discovery = «эталон найден», дальше — спека.

3. **Coach Mark — нет прецедента нигде** (ни Web DS, ни Mobile, ни продукты). Greenfield + организм + правило «организмы после dev-sign-off базы». Тройной сигнал отложить: макс. дизайн-риск, нет референса, стоит на Popover.

---

## 3. Принятые решения

- **Naming:** держим своё мобильное именование — **Context Menu** (idiom long-press) + **Popover** (overlay-foundation контейнер-база). Web DS `DropdownMenu` — НЕ выравниваем (у нас уже спроектирована overlay-семья; «Popover» как база — мобильная абстракция, которой в Web DS нет). _(подтверждено 2026-06-30)_
- **Coach Mark — до спеки, не до сборки.** В рамках PB-1580 довести до спеки/discovery, финальную Figma-сборку держать до dev-sign-off overlay-базы (Popover/Tooltip/Context Menu). Иначе риск переделки.
- **Slider** — основа = Web DS Slider; обязателен range-режим (price от-до).

---

## 4. Порядок сборки (PB-1580)

1. **Tooltip** — финализация (ближе всех к готовому): сверка с Web DS → перенос на components-страницу → ревью variant/токенов → publish → запись в Confluence-реестр.
2. **Popover / Context Menu** — доработать Popover base-контейнер (placement, caret) + выровнять существующий Context Menu под overlay-foundation §1 → собрать → publish.
3. **Slider** — инспекция Web DS Slider → `slider-spec.md` (single + range) → сборка.
4. **Coach Mark** — спека/discovery, **сборку hold** до dev-sign-off базы.

---

## 5. Связанные документы

- [popover-spec.md](./popover-spec.md) — overlay-foundation §1, Popover, Tooltip §3, Coach mark §4.
- [context-menu-spec.md](./context-menu-spec.md) — Context Menu.
- [motion-spec.md](./motion-spec.md) — тайминги появления/закрытия оверлеев.
- Статусы компонентов — Confluence «🎨 Design System», реестр Molecules.
