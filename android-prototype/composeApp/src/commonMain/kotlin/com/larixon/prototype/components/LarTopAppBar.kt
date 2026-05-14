package com.larixon.prototype.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import com.larixon.prototype.theme.LarTheme

@Composable
fun LarTopAppBar(
    title: String,
    modifier: Modifier = Modifier,
    trailing: @Composable (() -> Unit)? = null,
) {
    val colors = LarTheme.colors
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp)
            .background(colors.background.primary)
            .padding(horizontal = LarTheme.spacing.s4),
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text(
                text = title,
                style = LarTheme.typography.h3Bold,
                color = colors.textIcon.primary,
            )
            if (trailing != null) {
                trailing()
            } else {
                LarIconButton(icon = Icons.Filled.MoreVert, onClick = {})
            }
        }
    }
}

@Composable
fun LarIconButton(icon: ImageVector, onClick: () -> Unit) {
    val colors = LarTheme.colors
    IconButton(onClick = onClick, modifier = Modifier.size(LarTheme.controlHeight.md)) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = colors.textIcon.primary,
            modifier = Modifier.size(LarTheme.size.sm),
        )
    }
}
