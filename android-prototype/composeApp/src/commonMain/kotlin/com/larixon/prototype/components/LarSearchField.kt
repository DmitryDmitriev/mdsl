package com.larixon.prototype.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.TextStyle
import com.larixon.prototype.theme.LarTheme

@Composable
fun LarSearchField(
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    modifier: Modifier = Modifier,
) {
    val colors = LarTheme.colors
    val spacing = LarTheme.spacing

    Row(
        modifier = modifier
            .heightIn(min = LarTheme.controlHeight.md)
            .clip(RoundedCornerShape(LarTheme.radius.controlLg))
            .background(colors.background.secondary)
            .border(
                width = LarTheme.borderWidth.default,
                color = colors.border.default,
                shape = RoundedCornerShape(LarTheme.radius.controlLg),
            )
            .padding(horizontal = spacing.s4),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Icon(
            imageVector = Icons.Filled.Search,
            contentDescription = null,
            tint = colors.textIcon.secondary,
            modifier = Modifier.size(LarTheme.size.sm),
        )
        Box(
            modifier = Modifier
                .padding(start = spacing.s3)
                .heightIn(min = LarTheme.controlHeight.md),
            contentAlignment = Alignment.CenterStart,
        ) {
            if (value.isEmpty()) {
                Text(
                    text = placeholder,
                    style = LarTheme.typography.body1,
                    color = colors.textIcon.tertiary,
                )
            }
            BasicTextField(
                value = value,
                onValueChange = onValueChange,
                singleLine = true,
                textStyle = TextStyle(
                    color = colors.textIcon.primary,
                    fontSize = LarTheme.typography.body1.fontSize,
                    lineHeight = LarTheme.typography.body1.lineHeight,
                ),
                cursorBrush = androidx.compose.ui.graphics.SolidColor(colors.textIcon.primary),
            )
        }
    }
}
