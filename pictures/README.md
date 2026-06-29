# Pictures — фото по категориям и форматам

Фотографии для дизайна Larixon Mobile DS, разложенные **по категориям** и нарезанные **в стандартные форматы** (соотношения сторон компонента `Image`). Источник — пул `_Claude_/image-pool/` (Bazaraki UGC).

## ⚠️ Internal placeholder only

User-generated content из объявлений Bazaraki. Только для **internal-дизайна** (Figma, ревью, передача в PB-тикетах). НЕ для marketing / App Store / публичных демо. См. `_Claude_/image-pool/CLAUDE.md`.

## Структура

```
Pictures/
└── <category>/
    ├── original/   ← исходники (родной формат, ~1600px)
    ├── 1x1/        ← квадрат
    ├── 4x3/
    ├── 3x2/
    ├── 16x9/       ← wide
    └── 3x4/        ← портрет
```

Каждый формат — **центр-кроп** исходника, ресайз до ширины 1200 px. Имена файлов внутри форматов совпадают с исходником (`luxury-1.jpg` и т.д.).

## Категории (11)

`new-buildings` · `cars-luxury` · `cars-regular` · `cars-trucks` · `cars-motorcycle` · `real-estate-sale` · `real-estate-rent` · `electronics-phones` · `electronics-laptops` · `electronics-tvs` · `generic`

## Форматы

| Формат | Соотношение | Размер (px) | Применение |
|---|---|---|---|
| `1x1`  | 1:1  | 1200×1200 | грид, аватар-тайл |
| `4x3`  | 4:3  | 1200×900  | карточка, грид |
| `3x2`  | 3:2  | 1200×800  | карточка |
| `16x9` | 16:9 | 1200×675  | wide-листинг, hero |
| `3x4`  | 3:4  | 1200×1600 | портретный листинг |

Соответствуют variant-пропу **Ratio** компонента `Image` (см. `DSL/docs/image-spec.md`).

## Обновление

Источник — `image-pool`. При добавлении фото в пул — перегенерировать кропы тем же скриптом (центр-кроп через `sips -c` + `--resampleWidth 1200`). Итого 56 оригиналов × 5 форматов = 336 файлов.
