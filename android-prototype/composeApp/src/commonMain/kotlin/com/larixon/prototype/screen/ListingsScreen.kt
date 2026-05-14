package com.larixon.prototype.screen

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.horizontalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import com.larixon.prototype.components.LarFilterChip
import com.larixon.prototype.components.LarSearchField
import com.larixon.prototype.components.LarTopAppBar
import com.larixon.prototype.components.Listing
import com.larixon.prototype.components.ListingCard
import com.larixon.prototype.theme.LarTheme

private val sampleListings = listOf(
    Listing(
        title = "1-комнатная квартира в центре, рядом с метро",
        price = "32 000 ₽/мес",
        location = "Москва, Хамовники",
        timeAgo = "2 ч назад",
        badge = "Срочно",
    ),
    Listing(
        title = "iPhone 15 Pro 256 GB, Natural Titanium, как новый",
        price = "78 500 ₽",
        location = "Санкт-Петербург",
        timeAgo = "сегодня",
        badge = "Торг",
    ),
    Listing(
        title = "Велосипед Trek Marlin 7, размер L, 2024",
        price = "45 000 ₽",
        location = "Москва, Сокольники",
        timeAgo = "вчера",
        badge = null,
    ),
    Listing(
        title = "Диван-кровать IKEA Friheten, тёмно-серый",
        price = "18 000 ₽",
        location = "Москва, Митино",
        timeAgo = "3 дня назад",
        badge = "Самовывоз",
    ),
    Listing(
        title = "Услуги репетитора по математике, ОГЭ/ЕГЭ",
        price = "от 1 500 ₽/час",
        location = "Москва, онлайн",
        timeAgo = "неделя назад",
        badge = null,
    ),
)

private val filters = listOf("Все", "Недвижимость", "Электроника", "Транспорт", "Услуги", "Работа")

@Composable
fun ListingsScreen() {
    val colors = LarTheme.colors
    val stack = LarTheme.stack
    val spacing = LarTheme.spacing

    var query by remember { mutableStateOf("") }
    var selectedFilter by remember { mutableStateOf("Все") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colors.background.primary)
            .windowInsetsPadding(WindowInsets.systemBars),
    ) {
        LarTopAppBar(title = "Объявления")

        Column(
            modifier = Modifier
                .padding(horizontal = spacing.s4)
                .padding(top = spacing.s2),
            verticalArrangement = Arrangement.spacedBy(stack.sm),
        ) {
            LarSearchField(
                value = query,
                onValueChange = { query = it },
                placeholder = "Что ищем?",
                modifier = Modifier.fillMaxWidth(),
            )

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(spacing.s2),
            ) {
                filters.forEach { f ->
                    LarFilterChip(
                        label = f,
                        selected = f == selectedFilter,
                        onToggle = { selectedFilter = f },
                    )
                }
            }
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = stack.sm),
            contentPadding = PaddingValues(
                start = spacing.s4,
                end = spacing.s4,
                bottom = stack.lg,
            ),
            verticalArrangement = Arrangement.spacedBy(stack.sm),
        ) {
            items(sampleListings) { listing ->
                ListingCard(listing = listing, onClick = {})
            }
        }
    }
}
