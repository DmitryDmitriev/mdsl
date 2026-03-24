# Sheets — описание компонента для сборки в Figma

Нижняя или верхняя выезжающая панель (bottom / top sheet). Все значения — из **docs/sheets-spec.md** и токенов дизайн-системы. Используйте эту таблицу при сборке компонента в Figma.

---

## 1. Варианты (Variant / Properties)

Рекомендуемые свойства компонента в Figma:

| Свойство | Варианты | Описание |
|----------|----------|----------|
| **Anchor** | Bottom, Top | Сторона появления панели |
| **Size** | Full, Half, Auto | Высота: 100%, 50%, по контенту (max 90dvh) |
| **Handle** | Yes, No | Показывать ручку сверху |
| **Header** | Yes, No | Показывать хедер с заголовком и кнопкой закрытия |

---

## 2. Размерности и токены

### 2.1 Подложка (Backdrop)

| Параметр | Токен / значение |
|----------|------------------|
| Заливка | semantic.background.overlay |
| Цвет (референс) | `rgba(10, 10, 10, 0.4)` |
| Размер | На весь артборд / экран (100% × 100%) |

### 2.2 Панель (Panel)

| Параметр | Токен / значение |
|----------|------------------|
| Заливка | semantic.surface.primary |
| Цвет (референс) | `#FFFFFF` |
| Скругление (открытый край) | radius.overlay = **16 px** (только два угла со стороны открытия) |
| Скругление (прижатый край) | 0 |
| Тень (опционально) | 0 -4px 24px rgba(0,0,0,0.12) |

**Anchor = Bottom:** скруглены только **верхние** левый и правый углы (16 px).
**Anchor = Top:** скруглены только **нижние** левый и правый углы (16 px).

### 2.3 Ручка (Handle)

| Параметр | Токен / значение |
|----------|------------------|
| Ширина | 40 px (spacing/10) |
| Высота | 4 px (spacing/1) |
| Радиус | radius.pill (999 px) |
| Заливка | semantic.text.tertiary |
| Цвет (референс) | `#D4D4D8` (zinc 300) |
| Отступ сверху | stack-sm = **16 px** |
| Отступ снизу | stack-sm = **16 px** |
| Выравнивание | По центру по горизонтали |

### 2.4 Хедер (при Header = Yes)

| Параметр | Токен / значение |
|----------|------------------|
| Padding horizontal | spacing/4 = **16 px** |
| Padding vertical | spacing/3 = **12 px** |
| Gap между заголовком и кнопкой закрытия | spacing/2 = **8 px** |
| Разделитель под хедером | Высота 1 px, цвет semantic.border.default (`#E4E4E7`) |
| Заголовок: шрифт | 17 px (или 16–18), line-height 22 px, weight 600 |
| Заголовок: цвет | semantic.text.primary (`#09090B`) |
| Кнопка закрытия (иконка) | 24×24 px, цвет semantic.text.secondary (`#A1A1AA`) |

### 2.5 Контент (Body)

| Параметр | Токен / значение |
|----------|------------------|
| Padding top | stack-md = **24 px** |
| Padding bottom | stack-md = **24 px** |
| Padding left/right | spacing/4 = **16 px** |
| Цвет текста | semantic.text.primary (по умолчанию) |

### 2.6 Высота панели по Size

| Size | Высота панели |
|------|----------------|
| **Full** | 100% (высота фрейма = высота экрана) |
| **Half** | 50% (высота фрейма = 50% высоты экрана) |
| **Auto** | По контенту; max-height = 90dvh (в Figma можно задать max 90% от высоты артборда или фиксированный запас сверху) |

---

## 3. Сводная таблица токенов (для Variables в Figma)

| Элемент | Переменная / токен | Значение (px / цвет) |
|---------|--------------------|----------------------|
| Backdrop fill | background.overlay | rgba(10,10,10,0.4) |
| Panel fill | surface.primary | #FFFFFF |
| Panel radius (открытый край) | radius.overlay | 16 |
| Handle size | — | 40×4 |
| Handle fill | text.tertiary | #D4D4D8 |
| Handle radius | radius.pill | 999 |
| Handle margin top/bottom | stack-sm | 16 |
| Header padding H | spacing/4 | 16 |
| Header padding V | spacing/3 | 12 |
| Header gap | spacing/2 | 8 |
| Divider | border.default | 1 px, #E4E4E7 |
| Body padding vertical | stack-md | 24 |
| Body padding horizontal | spacing/4 | 16 |
| Title | text.primary, 17/22, 600 | #09090B |
| Close icon | 24×24, text.secondary | #A1A1AA |

---

## 4. Рекомендации по сборке в Figma

1. **Структура фрейма**
   - Корневой фрейм: экран (или полный размер).
   - Внутри: слой Backdrop (на весь экран) + слой Panel (прижат к bottom или top, высота по Size).
   - В Panel: опционально Handle → опционально Header (заголовок + кнопка закрытия) → разделитель → область контента (Body).

2. **Auto Layout**
   - Panel: Auto Layout, направление Vertical, выравнивание по горизонтали Stretch.
   - Handle: центр по горизонтали, отступы сверху/снизу 16 px.
   - Header: Auto Layout Horizontal, Space between или gap 8 px, padding 16 H / 12 V.
   - Body: padding 24 V / 16 H.

3. **Компонент и варианты**
   - Создайте Component с вариантами: Anchor (Bottom, Top), Size (Full, Half, Auto), Handle (On, Off), Header (On, Off).
   - Заголовок и контент — текстовые слои или слоты (если используете подстановку контента).

4. **Токены в Figma**
   - Если в файле настроены Variables, привяжите заливки и отступы к семантическим переменным (surface.primary, stack-sm, spacing/4, radius.overlay и т.д.) — так при смене темы значения обновятся централизованно.

5. **Прототип**
   - Для демонстрации открытия/закрытия можно использовать интерактивность: по клику на триггер — переход на кадр с открытым Sheets; по клику на Backdrop или кнопку закрытия — возврат на кадр с закрытым состоянием.

---

## 5. Ссылки

- Спецификация компонента: **docs/sheets-spec.md**
- Токены: **docs/DESIGN-TOKENS.md**
- Цвета: **docs/COLOR-PALETTE.md**
