package com.larixon.prototype.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

// Replace with Inter when shipping; san-serif fallback for the prototype.
private val LarFontFamily: FontFamily = FontFamily.SansSerif

private fun text(
    size: Int,
    lineHeight: Int,
    weight: FontWeight,
): TextStyle = TextStyle(
    fontFamily = LarFontFamily,
    fontSize = size.sp,
    lineHeight = lineHeight.sp,
    fontWeight = weight,
    letterSpacing = 0.sp,
)

@Immutable
data class LarTypography(
    val h1: TextStyle = text(30, 40, FontWeight.W400),
    val h1Bold: TextStyle = text(30, 40, FontWeight.W700),
    val h2: TextStyle = text(24, 32, FontWeight.W400),
    val h2Bold: TextStyle = text(24, 32, FontWeight.W700),
    val h3: TextStyle = text(20, 28, FontWeight.W400),
    val h3Medium: TextStyle = text(20, 28, FontWeight.W500),
    val h3Bold: TextStyle = text(20, 28, FontWeight.W700),
    val h4: TextStyle = text(18, 24, FontWeight.W400),
    val h4Medium: TextStyle = text(18, 24, FontWeight.W500),
    val h4Bold: TextStyle = text(18, 24, FontWeight.W700),
    val bodyDense: TextStyle = text(16, 20, FontWeight.W400),
    val bodyDenseMedium: TextStyle = text(16, 20, FontWeight.W500),
    val bodyDenseBold: TextStyle = text(16, 20, FontWeight.W700),
    val body1: TextStyle = text(16, 24, FontWeight.W400),
    val body1Medium: TextStyle = text(16, 24, FontWeight.W500),
    val body1Bold: TextStyle = text(16, 24, FontWeight.W700),
    val body2: TextStyle = text(14, 20, FontWeight.W400),
    val body2Medium: TextStyle = text(14, 20, FontWeight.W500),
    val body2Bold: TextStyle = text(14, 20, FontWeight.W700),
    val captionL: TextStyle = text(14, 16, FontWeight.W400),
    val caption: TextStyle = text(12, 16, FontWeight.W400),
    val captionMedium: TextStyle = text(12, 16, FontWeight.W500),
    val captionBold: TextStyle = text(12, 16, FontWeight.W700),
    val captionSm: TextStyle = text(10, 12, FontWeight.W500),
)
