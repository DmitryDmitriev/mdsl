package com.larixon.prototype.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import com.larixon.prototype.theme.LarTheme

enum class LarButtonVariant { Primary, Secondary, Outline, Ghost, Negative, SoftNegative }
enum class LarButtonSize { Xs, Sm, Md, Lg }

@Composable
fun LarButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: LarButtonVariant = LarButtonVariant.Primary,
    size: LarButtonSize = LarButtonSize.Md,
    enabled: Boolean = true,
) {
    val colors = LarTheme.colors
    val typo = LarTheme.typography
    val spacing = LarTheme.spacing

    val height: Dp = when (size) {
        LarButtonSize.Xs -> LarTheme.controlHeight.xs
        LarButtonSize.Sm -> LarTheme.controlHeight.sm
        LarButtonSize.Md -> LarTheme.controlHeight.md
        LarButtonSize.Lg -> LarTheme.controlHeight.lg
    }
    val radius = if (size == LarButtonSize.Xs) LarTheme.radius.controlMd else LarTheme.radius.controlLg
    val textStyle = when (size) {
        LarButtonSize.Xs -> typo.captionMedium
        LarButtonSize.Sm, LarButtonSize.Md -> typo.body2Medium
        LarButtonSize.Lg -> typo.body1Medium
    }

    val bg: Color
    val content: Color
    val border: BorderStroke?

    if (!enabled) {
        when (variant) {
            LarButtonVariant.Outline -> {
                bg = Color.Transparent
                content = colors.textIcon.disabled
                border = BorderStroke(LarTheme.borderWidth.default, colors.border.disabled)
            }
            LarButtonVariant.Ghost -> {
                bg = Color.Transparent
                content = colors.textIcon.disabled
                border = null
            }
            else -> {
                bg = colors.background.disabled
                content = colors.textIcon.disabled
                border = null
            }
        }
    } else when (variant) {
        LarButtonVariant.Primary -> {
            bg = colors.button.primaryBg
            content = colors.textIcon.invertedWB
            border = null
        }
        LarButtonVariant.Secondary -> {
            bg = colors.button.secondaryBg
            content = colors.textIcon.primary
            border = null
        }
        LarButtonVariant.Outline -> {
            bg = Color.Transparent
            content = colors.textIcon.primary
            val w = if (size == LarButtonSize.Xs) LarTheme.borderWidth.default else LarTheme.borderWidth.emphasis
            border = BorderStroke(w, colors.border.default)
        }
        LarButtonVariant.Ghost -> {
            bg = Color.Transparent
            content = colors.textIcon.primary
            border = null
        }
        LarButtonVariant.Negative -> {
            bg = colors.button.negativeBg
            content = colors.textIcon.invertedWB
            border = null
        }
        LarButtonVariant.SoftNegative -> {
            bg = colors.button.softNegativeBg
            content = colors.textIconOnTinted.negative
            border = null
        }
    }

    Surface(
        onClick = onClick,
        enabled = enabled,
        shape = RoundedCornerShape(radius),
        color = bg,
        contentColor = content,
        border = border,
        modifier = modifier.heightIn(min = height),
    ) {
        Row(
            modifier = Modifier
                .defaultMinSize(minHeight = height)
                .padding(horizontal = spacing.s4, vertical = spacing.s3),
            horizontalArrangement = Arrangement.spacedBy(spacing.s2, Alignment.CenterHorizontally),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(text = text, style = textStyle)
        }
    }
}
