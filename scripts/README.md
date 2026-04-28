# Scripts & Automation

Автоматизация дизайн-системы. Три уровня запуска: вручную (скрипт), по кнопке (Figma plugin), по расписанию (cron).

---

## 1. Figma Plugin — `figma-plugin/ds-audit-scanner/`

Полноценный плагин с UI. **Один клик — отчёт по всем COMPONENT_SET'ам на странице.**

### Установка (development)

1. Figma → меню **Plugins → Development → Import plugin from manifest…**
2. Выбрать файл `DSL/figma-plugin/ds-audit-scanner/manifest.json`
3. Запуск: **Plugins → Development → DS Audit Scanner**

### Что умеет

- **Scope:** текущая страница / выделенные SET'ы / весь документ
- **Таблица результатов** с цветовыми метками: 🟢 ≥90%, 🟡 70–89%, 🔴 <70%
- **Клик по строке** — фокус на компонент в Figma (выделяет + scrollAndZoom)
- **JSON-кнопка** — копирует полный отчёт в буфер
- **Список проблем** (топ-30 на компонент) — в раскрывающемся блоке

### Публикация в команду

Когда стабилизируется — опубликовать как private plugin для воркспейса:
1. Plugins → Development → DS Audit Scanner → **Publish new release**
2. Workspace = Larixon → доступен всем дизайнерам команды

---

## 2. Скрипт — `figma-audit-scanner.js`

Та же логика, но как голая функция для вызова через MCP `use_figma` или будущую CLI-обёртку.

### Использование (через MCP)

```js
// Вставить функцию auditComponents целиком, затем:
const report = await auditComponents(null);                     // вся текущая страница
const report = await auditComponents(["6632:39", "4603:900"]);  // конкретные SET'ы
```

### Формат отчёта

```json
[{
  "id": "6632:39",
  "name": "Dialog",
  "color": 100, "token": 82, "type": 100, "overall": 86,
  "counts": { "color": {...}, "token": {...}, "type": {...} },
  "problems": ["Dialog: width 328 no token", "Image: height 180 no token"]
}]
```

Отсортировано по `overall` возрастанию.

---

## 3. Cron — еженедельный авто-аудит

Расписание создаётся через `CronCreate` в активной Claude-сессии: **каждый понедельник 09:37**.

### Что делает cron

1. Открывает Figma через MCP, прогоняет сканер
2. Сравнивает с прошлым прогоном (`last-audit.json`)
3. Если регрессия ≥5% или overall<70% — присылает сводку
4. Если стабильно — короткое «OK, средний overall X%»

### ⚠️ Ограничения cron в текущем окружении

- Работает **только пока активна Claude-сессия**. Когда сессия закрыта — задача не выполняется.
- Авто-экспирация **через 7 дней** — пересоздавать вручную (или через прокидывание в `.claude/scheduled_tasks.json` с `durable: true`, но это всё равно session-bound).

### Что нужно для production-надёжного cron

Текущее решение — proof-of-concept для регулярного контроля внутри активной работы. Для настоящей независимости от сессии:

- **Вариант A:** GitHub Action раз в неделю, дёргает Figma REST API → постит отчёт в issue
- **Вариант B:** Vercel Cron / Cloudflare Worker → тот же Figma REST API → Slack webhook
- **Вариант C:** Figma Plugin с `relaunchData` + ручной триггер раз в неделю (без сервера)

Если важно — собрать вариант A: один YAML-файл в `.github/workflows/`, без серверов.

---

## Правила исключения (общие для plugin и script)

См. [`figma_audit_rules.md`](../../.claude/projects/-Users-partyzan-Yandex-Disk-localized--Claude-/memory/figma_audit_rules.md) (memory rule). Кратко:

| # | Исключаем |
|---|-----------|
| 1 | Свойства корневого COMPONENT_SET |
| 2 | Width/height корневого COMPONENT-варианта |
| 3 | Иконки: VECTOR / BOOLEAN_OPERATION / `ic_*` / `24 / ic_*` / INSTANCE 16-24-32 |
| 4 | Элементы вне COMPONENT_SET |
| 5 | HUG/FILL размеры |
| 6 | Вертикальный padding при FIXED height + center align |
| 7 | Building blocks с префиксом `.=` |
| 8 | Системные компоненты (Status Bar, Tab Bar, Keyboard) |

---

## Что считается

| Категория | Что измеряет |
|---|---|
| **Color** | Solid fills и strokes с привязкой к color-переменным |
| **Token** | width/height (FIXED), padding, itemSpacing, cornerRadius, strokeWeight |
| **Type** | TEXT-узлы с привязанным textStyleId |

---

## Roadmap

- [x] Plugin: scope page/selection/document, click-to-focus, JSON copy
- [x] Cron: weekly с регрессионной проверкой
- [ ] Plugin: автообновление таблицы аудита (node `6139:4359`) после прогона
- [ ] CLI через Figma REST API (для GitHub Action — не нужен plugin runtime)
- [ ] Diff-режим: сравнение двух прогонов
- [ ] Pre-publish hook: блокировать публикацию библиотеки при overall < threshold
- [ ] GitHub Action workflow для еженедельного аудита (production cron)
