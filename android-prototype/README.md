# Larixon Mobile — Android-прототип

Compose Multiplatform-прототип, проверяющий перенос токенов и компонентов из `docs/` в Kotlin/Compose. Сейчас включён один таргет — **Android**. Структура KMP оставлена, чтобы позже без переписывания добавить iOS / Desktop.

## Что внутри

```
android-prototype/
├── settings.gradle.kts           # KMP/Compose plugin management + единственный модуль composeApp
├── build.gradle.kts              # alias-плагины на корне
├── gradle.properties             # JVM args, AndroidX, kotlin.code.style=official
├── gradle/libs.versions.toml     # version catalog: Kotlin, AGP, Compose MP
└── composeApp/
    ├── build.gradle.kts          # KMP-конфиг, только androidTarget()
    └── src/
        ├── androidMain/
        │   ├── AndroidManifest.xml
        │   ├── kotlin/com/larixon/prototype/MainActivity.kt
        │   └── res/values/{strings,themes}.xml
        └── commonMain/kotlin/com/larixon/prototype/
            ├── App.kt
            ├── theme/                  # токены: Color, Typography, Spacing, Radius, ControlHeight, Size
            ├── components/             # LarButton, LarChip, LarSearchField, LarTopAppBar, ListingCard
            └── screen/ListingsScreen.kt
```

## Соответствие токенам

- `theme/Spacing.kt` — `LarSpacing` (Core spacing/0…16), `LarStack` (sm/md/lg/xl/xxl), `LarControlHeight` (xs/sm/md/lg), `LarSize` (xxs…xxxl), `LarRadius` (control-sm/md/lg, surface, overlay, pill), `LarBorderWidth` (default/emphasis). Имена с `2xs`/`2xl` переименованы на `xxs`/`xxl` по правилу из `docs/DESIGN-TOKENS.md` §«Naming в Kotlin / Swift».
- `theme/Color.kt` — семантические группы из `docs/COLOR-PALETTE.md`: `background`, `tinted`, `surface`, `border`, `accent`, `button`, `textIcon`, `textIconOnTinted`. Свои Light/Dark-значения через `LarLightColors` / `LarDarkColors`. Material 3 `ColorScheme` синхронизирован — стандартные M3-компоненты подцепляют корректные фоны/контент.
- `theme/Typography.kt` — стили из `docs/TYPOGRAPHY.md` (H1…H4, Body Dense, Body 1, Body 2, Caption L, Caption, Caption sm) с весами 400/500/700 и `letterSpacing = 0`.

> Шрифт **Inter** в прототипе не подключён — `FontFamily.SansSerif` как fallback. При первой реальной сборке добавь `Inter` через `compose.components.resources`.

## Демо-экран

`ListingsScreen.kt` — лента объявлений: top app bar + поиск + чипы-фильтры + список карточек. Использует все слои токенов и набор примитивов из `components/`.

## Как запустить

> Gradle wrapper **не закоммичен** (бинарь). Сгенерируй его один раз локально:

1. Из репо: `cd android-prototype`
2. Сгенерировать wrapper (если есть локальный Gradle ≥ 8.10):
   ```bash
   gradle wrapper --gradle-version 8.10
   ```
   После этого появятся `gradlew`, `gradlew.bat`, `gradle/wrapper/`.
3. Открыть `android-prototype/` в Android Studio (Hedgehog или новее, с поддержкой Kotlin 2.1) — он сам подхватит KMP-проект.
4. Запустить конфигурацию `composeApp` на эмуляторе или устройстве (minSdk 24, targetSdk 35).

## Добавить iOS позднее

В `composeApp/build.gradle.kts` добавить таргеты и iosMain-исходники:

```kotlin
kotlin {
    androidTarget { /* ... */ }
    listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach { it.binaries.framework { baseName = "ComposeApp" } }
    sourceSets {
        iosMain.dependencies { /* ... */ }
    }
}
```

И создать `iosApp/` с `App.swift`, подключающим `ComposeUIViewController { App() }`.
