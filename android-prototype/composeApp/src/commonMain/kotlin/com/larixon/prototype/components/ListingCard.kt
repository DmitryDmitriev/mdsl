package com.larixon.prototype.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.outlined.LocationOn
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.larixon.prototype.theme.LarTheme

data class Listing(
    val title: String,
    val price: String,
    val location: String,
    val timeAgo: String,
    val badge: String? = null,
)

@Composable
fun ListingCard(
    listing: Listing,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val colors = LarTheme.colors
    val spacing = LarTheme.spacing

    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(LarTheme.radius.surface),
        color = colors.surface.primary,
        border = BorderStroke(LarTheme.borderWidth.default, colors.border.default),
        modifier = modifier.fillMaxWidth(),
    ) {
        Row(
            modifier = Modifier.padding(spacing.s3),
            horizontalArrangement = Arrangement.spacedBy(spacing.s3),
        ) {
            PhotoPlaceholder()
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(spacing.s1),
            ) {
                Text(
                    text = listing.title,
                    style = LarTheme.typography.bodyDenseMedium,
                    color = colors.textIcon.primary,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                )
                Text(
                    text = listing.price,
                    style = LarTheme.typography.body1Bold,
                    color = colors.textIcon.primary,
                )
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(spacing.s1),
                ) {
                    Icon(
                        imageVector = Icons.Outlined.LocationOn,
                        contentDescription = null,
                        tint = colors.textIcon.secondary,
                        modifier = Modifier.size(LarTheme.size.xxs),
                    )
                    Text(
                        text = listing.location,
                        style = LarTheme.typography.captionL,
                        color = colors.textIcon.secondary,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                    )
                    Text(
                        text = " · ${listing.timeAgo}",
                        style = LarTheme.typography.captionL,
                        color = colors.textIcon.tertiary,
                    )
                }
                if (listing.badge != null) {
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(LarTheme.radius.pill))
                            .background(colors.tinted.info)
                            .padding(horizontal = spacing.s2, vertical = 2.dp),
                    ) {
                        Text(
                            text = listing.badge,
                            style = LarTheme.typography.captionMedium,
                            color = colors.textIconOnTinted.info,
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun PhotoPlaceholder() {
    val colors = LarTheme.colors
    Box(
        modifier = Modifier
            .size(96.dp)
            .clip(RoundedCornerShape(LarTheme.radius.controlLg))
            .background(colors.background.secondary)
            .border(
                LarTheme.borderWidth.default,
                colors.border.default,
                RoundedCornerShape(LarTheme.radius.controlLg),
            ),
        contentAlignment = Alignment.Center,
    ) {
        Icon(
            imageVector = Icons.Filled.Image,
            contentDescription = null,
            tint = colors.textIcon.tertiary,
            modifier = Modifier.size(LarTheme.size.md),
        )
    }
}

