package com.larixon.prototype.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.larixon.prototype.theme.LarTheme

@Composable
fun LarFilterChip(
    label: String,
    selected: Boolean,
    onToggle: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val colors = LarTheme.colors
    val bg = if (selected) colors.background.invertedPrimary else Color.Transparent
    val border = if (selected) null else BorderStroke(LarTheme.borderWidth.default, colors.border.default)
    val content = if (selected) colors.textIcon.invertedWB else colors.textIcon.primary

    Surface(
        onClick = onToggle,
        shape = RoundedCornerShape(LarTheme.radius.pill),
        color = bg,
        contentColor = content,
        border = border,
        modifier = modifier.heightIn(min = LarTheme.controlHeight.xs),
    ) {
        Row(
            modifier = Modifier.padding(horizontal = LarTheme.spacing.s3, vertical = LarTheme.spacing.s2),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(LarTheme.spacing.s2),
        ) {
            if (selected) {
                Icon(
                    imageVector = Icons.Filled.Check,
                    contentDescription = null,
                    modifier = Modifier.size(LarTheme.size.xxs),
                )
            }
            Text(text = label, style = LarTheme.typography.body2Medium)
        }
    }
}
