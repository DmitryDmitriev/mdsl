package com.larixon.prototype.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.graphics.Color

private object Zinc {
    val z50 = Color(0xFFFAFAFA)
    val z100 = Color(0xFFF4F4F5)
    val z200 = Color(0xFFE4E4E7)
    val z300 = Color(0xFFD4D4D8)
    val z400 = Color(0xFFA1A1AA)
    val z500 = Color(0xFF71717A)
    val z600 = Color(0xFF52525B)
    val z700 = Color(0xFF3F3F46)
    val z800 = Color(0xFF27272A)
    val z900 = Color(0xFF18181B)
    val z950 = Color(0xFF09090B)
}

private object Red {
    val r50 = Color(0xFFFEF2F2)
    val r400 = Color(0xFFF87171)
    val r500 = Color(0xFFEF4444)
    val r600 = Color(0xFFDC2626)
    val r800 = Color(0xFF991B1B)
    val r900 = Color(0xFF7F1D1D)
}

private object Blue {
    val b50 = Color(0xFFEFF6FF)
    val b400 = Color(0xFF60A5FA)
    val b500 = Color(0xFF3B82F6)
    val b800 = Color(0xFF1E40AF)
    val b900 = Color(0xFF1E3A8A)
}

private object Green {
    val g50 = Color(0xFFF0FDF4)
    val g400 = Color(0xFF4ADE80)
    val g500 = Color(0xFF22C55E)
    val g600 = Color(0xFF16A34A)
    val g800 = Color(0xFF166534)
    val g900 = Color(0xFF14532D)
}

private object Amber {
    val a400 = Color(0xFFFBBF24)
    val a500 = Color(0xFFF59E0B)
}

private object Orange {
    val o50 = Color(0xFFFFF7ED)
    val o500 = Color(0xFFF97316)
    val o800 = Color(0xFF9A3412)
    val o900 = Color(0xFF7C2D12)
}

private val White = Color(0xFFFFFFFF)

@Immutable
data class LarBackground(
    val primary: Color,
    val secondary: Color,
    val tertiary: Color,
    val invertedPrimary: Color,
    val overlay: Color,
    val onPhoto: Color,
    val disabled: Color,
)

@Immutable
data class LarTinted(
    val good: Color,
    val info: Color,
    val warning: Color,
    val negative: Color,
    val neutral: Color,
)

@Immutable
data class LarSurface(
    val primary: Color,
    val secondary: Color,
)

@Immutable
data class LarBorder(
    val default: Color,
    val disabled: Color,
    val active: Color,
    val negative: Color,
    val positive: Color,
    val warning: Color,
    val focus: Color,
)

@Immutable
data class LarAccent(
    val primary: Color,
    val secondary: Color,
    val link: Color,
    val negative: Color,
    val positive: Color,
    val warning: Color,
)

@Immutable
data class LarButtonColors(
    val primaryBg: Color,
    val secondaryBg: Color,
    val negativeBg: Color,
    val softNegativeBg: Color,
)

@Immutable
data class LarTextIcon(
    val primary: Color,
    val secondary: Color,
    val tertiary: Color,
    val disabled: Color,
    val invertedWB: Color,
    val invertedBW: Color,
    val positive: Color,
    val negative: Color,
    val warning: Color,
    val link: Color,
)

@Immutable
data class LarTextIconOnTinted(
    val good: Color,
    val info: Color,
    val warning: Color,
    val negative: Color,
    val neutral: Color,
)

@Immutable
data class LarColors(
    val background: LarBackground,
    val tinted: LarTinted,
    val surface: LarSurface,
    val border: LarBorder,
    val accent: LarAccent,
    val button: LarButtonColors,
    val textIcon: LarTextIcon,
    val textIconOnTinted: LarTextIconOnTinted,
    val isLight: Boolean,
)

internal val LarLightColors = LarColors(
    background = LarBackground(
        primary = White,
        secondary = Zinc.z100,
        tertiary = Zinc.z200,
        invertedPrimary = Zinc.z900,
        overlay = Color(0x66000000), // alpha Black/40
        onPhoto = Color(0x66000000),
        disabled = Zinc.z100,
    ),
    tinted = LarTinted(
        good = Green.g50,
        info = Blue.b50,
        warning = Orange.o50,
        negative = Red.r50,
        neutral = Zinc.z100,
    ),
    surface = LarSurface(
        primary = White,
        secondary = White,
    ),
    border = LarBorder(
        default = Zinc.z200,
        disabled = Zinc.z100,
        active = Zinc.z900, // = Accent/Primary (Light)
        negative = Red.r600,
        positive = Green.g600,
        warning = Amber.a400,
        focus = Blue.b500,
    ),
    accent = LarAccent(
        primary = Zinc.z900,
        secondary = Zinc.z200,
        link = Blue.b500,
        negative = Red.r600,
        positive = Green.g600,
        warning = Amber.a400,
    ),
    button = LarButtonColors(
        primaryBg = Zinc.z900,
        secondaryBg = Zinc.z200,
        negativeBg = Red.r600,
        softNegativeBg = Red.r50,
    ),
    textIcon = LarTextIcon(
        primary = Zinc.z950,
        secondary = Zinc.z500,
        tertiary = Zinc.z300,
        disabled = Zinc.z300,
        invertedWB = White,
        invertedBW = Zinc.z950,
        positive = Green.g600,
        negative = Red.r600,
        warning = Amber.a400,
        link = Blue.b500,
    ),
    textIconOnTinted = LarTextIconOnTinted(
        good = Green.g800,
        info = Blue.b800,
        warning = Orange.o800,
        negative = Red.r800,
        neutral = Zinc.z800,
    ),
    isLight = true,
)

internal val LarDarkColors = LarColors(
    background = LarBackground(
        primary = Zinc.z950,
        secondary = Zinc.z900,
        tertiary = Zinc.z600,
        invertedPrimary = Zinc.z50,
        overlay = Color(0x4D000000), // alpha Black/30
        onPhoto = Color(0x80FFFFFF), // alpha White/50
        disabled = Zinc.z800,
    ),
    tinted = LarTinted(
        good = Green.g900,
        info = Blue.b900,
        warning = Orange.o900,
        negative = Red.r900,
        neutral = Zinc.z800,
    ),
    surface = LarSurface(
        primary = Zinc.z800,
        secondary = Zinc.z600,
    ),
    border = LarBorder(
        default = Zinc.z500,
        disabled = Zinc.z700,
        active = Zinc.z200,
        negative = Red.r400,
        positive = Green.g400,
        warning = Amber.a400,
        focus = Blue.b400,
    ),
    accent = LarAccent(
        primary = Zinc.z200,
        secondary = Zinc.z800,
        link = Blue.b400,
        negative = Red.r400,
        positive = Green.g400,
        warning = Amber.a400,
    ),
    button = LarButtonColors(
        primaryBg = Zinc.z200,
        secondaryBg = Zinc.z800,
        negativeBg = Red.r400,
        softNegativeBg = Red.r900,
    ),
    textIcon = LarTextIcon(
        primary = Zinc.z50,
        secondary = Zinc.z400,
        tertiary = Zinc.z500,
        disabled = Zinc.z600,
        invertedWB = Zinc.z950,
        invertedBW = White,
        positive = Green.g400,
        negative = Red.r400,
        warning = Amber.a400,
        link = Blue.b400,
    ),
    textIconOnTinted = LarTextIconOnTinted(
        good = Green.g50,
        info = Blue.b50,
        warning = Orange.o50,
        negative = Red.r50,
        neutral = Zinc.z50,
    ),
    isLight = false,
)
