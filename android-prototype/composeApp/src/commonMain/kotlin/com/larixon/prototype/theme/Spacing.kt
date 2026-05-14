package com.larixon.prototype.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Immutable
data class LarSpacing(
    val s0: Dp = 0.dp,
    val s1: Dp = 4.dp,
    val s2: Dp = 8.dp,
    val s3: Dp = 12.dp,
    val s4: Dp = 16.dp,
    val s5: Dp = 20.dp,
    val s6: Dp = 24.dp,
    val s8: Dp = 32.dp,
    val s10: Dp = 40.dp,
    val s12: Dp = 48.dp,
    val s14: Dp = 56.dp,
    val s16: Dp = 64.dp,
)

@Immutable
data class LarStack(
    val sm: Dp = 16.dp,
    val md: Dp = 24.dp,
    val lg: Dp = 32.dp,
    val xl: Dp = 48.dp,
    val xxl: Dp = 64.dp,
)

@Immutable
data class LarRadius(
    val controlSm: Dp = 4.dp,
    val controlMd: Dp = 8.dp,
    val controlLg: Dp = 12.dp,
    val surface: Dp = 12.dp,
    val overlay: Dp = 16.dp,
    val pill: Dp = 999.dp,
)

@Immutable
data class LarBorderWidth(
    val default: Dp = 1.dp,
    val emphasis: Dp = 2.dp,
)

@Immutable
data class LarControlHeight(
    val xs: Dp = 32.dp,
    val sm: Dp = 40.dp,
    val md: Dp = 48.dp,
    val lg: Dp = 56.dp,
)

@Immutable
data class LarSize(
    val xxs: Dp = 16.dp,
    val xs: Dp = 20.dp,
    val sm: Dp = 24.dp,
    val md: Dp = 32.dp,
    val lg: Dp = 40.dp,
    val xl: Dp = 48.dp,
    val xxl: Dp = 56.dp,
    val xxxl: Dp = 80.dp,
)
