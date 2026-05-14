package com.larixon.prototype.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.staticCompositionLocalOf

private val LocalLarColors = staticCompositionLocalOf<LarColors> {
    error("LarColors not provided")
}
private val LocalLarTypography = staticCompositionLocalOf { LarTypography() }
private val LocalLarSpacing = staticCompositionLocalOf { LarSpacing() }
private val LocalLarStack = staticCompositionLocalOf { LarStack() }
private val LocalLarRadius = staticCompositionLocalOf { LarRadius() }
private val LocalLarBorderWidth = staticCompositionLocalOf { LarBorderWidth() }
private val LocalLarControlHeight = staticCompositionLocalOf { LarControlHeight() }
private val LocalLarSize = staticCompositionLocalOf { LarSize() }

object LarTheme {
    val colors: LarColors
        @Composable @ReadOnlyComposable get() = LocalLarColors.current
    val typography: LarTypography
        @Composable @ReadOnlyComposable get() = LocalLarTypography.current
    val spacing: LarSpacing
        @Composable @ReadOnlyComposable get() = LocalLarSpacing.current
    val stack: LarStack
        @Composable @ReadOnlyComposable get() = LocalLarStack.current
    val radius: LarRadius
        @Composable @ReadOnlyComposable get() = LocalLarRadius.current
    val borderWidth: LarBorderWidth
        @Composable @ReadOnlyComposable get() = LocalLarBorderWidth.current
    val controlHeight: LarControlHeight
        @Composable @ReadOnlyComposable get() = LocalLarControlHeight.current
    val size: LarSize
        @Composable @ReadOnlyComposable get() = LocalLarSize.current
}

@Composable
fun LarixonTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    val colors = if (darkTheme) LarDarkColors else LarLightColors

    // Mirror to Material3 so out-of-the-box M3 components don't fight the palette.
    val m3 = if (darkTheme) {
        darkColorScheme(
            background = colors.background.primary,
            surface = colors.surface.primary,
            primary = colors.accent.primary,
            onPrimary = colors.textIcon.invertedWB,
            onBackground = colors.textIcon.primary,
            onSurface = colors.textIcon.primary,
            outline = colors.border.default,
        )
    } else {
        lightColorScheme(
            background = colors.background.primary,
            surface = colors.surface.primary,
            primary = colors.accent.primary,
            onPrimary = colors.textIcon.invertedWB,
            onBackground = colors.textIcon.primary,
            onSurface = colors.textIcon.primary,
            outline = colors.border.default,
        )
    }

    CompositionLocalProvider(
        LocalLarColors provides colors,
        LocalContentColor provides colors.textIcon.primary,
    ) {
        MaterialTheme(colorScheme = m3, content = content)
    }
}
