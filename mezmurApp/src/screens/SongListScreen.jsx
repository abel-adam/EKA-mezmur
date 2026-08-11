import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Search, Star, Filter, RefreshCw, Layers } from "lucide-react-native";
import { SONGS_DATA } from "../data/songs.js";
import SongCard from "../components/SongCard.jsx";

/**
 * SongListScreen Component (React Native)
 * 
 * Screen for browsing, searching, and filtering all hymns.
 * 
 * @component
 */
export default function SongListScreen({
  favorites,
  initialFavoritesFilter = false,
  onToggleFavorite,
  onSelectSong,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(
    initialFavoritesFilter,
  );

  const categories = useMemo(() => {
    const list = SONGS_DATA.map((song) => song.category);
    return Array.from(new Set(list));
  }, []);

  const filteredSongs = useMemo(() => {
    return SONGS_DATA.filter((song) => {
      if (showFavoritesOnly && !favorites.includes(song.id)) {
        return false;
      }

      if (selectedCategory && song.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const numQuery = parseInt(query, 10);

        if (!isNaN(numQuery) && song.number === numQuery) {
          return true;
        }

        const title = song.title.toLowerCase();
        const lyrics = song.lyrics.toLowerCase();
        const category = song.category.toLowerCase();
        const author = (song.author || "").toLowerCase();

        return (
          title.includes(query) ||
          lyrics.includes(query) ||
          category.includes(query) ||
          author.includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, showFavoritesOnly, favorites]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setShowFavoritesOnly(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Search & Filter Box */}
      <View style={styles.filterCard}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="በመዝሙር ርዕስ፣ በቁጥር ወይም በግጥም ይፈልጉ..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Scroll & Fav Switch */}
        <View style={styles.filterRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(null)}
              style={[
                styles.chip,
                selectedCategory === null && styles.chipActive,
              ]}
            >
              <Layers
                size={12}
                color={selectedCategory === null ? "#ffffff" : "#4b5563"}
              />
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === null && styles.chipTextActive,
                ]}
              >
                ሁሉንም መደቦች
              </Text>
            </TouchableOpacity>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  activeOpacity={0.7}
                  onPress={() => setSelectedCategory(cat)}
                  style={[styles.chip, isActive && styles.chipActive]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isActive && styles.chipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
            style={[
              styles.favToggleChip,
              showFavoritesOnly && styles.favToggleChipActive,
            ]}
          >
            <Star
              size={14}
              color={showFavoritesOnly ? "#d97706" : "#4b5563"}
              fill={showFavoritesOnly ? "#d97706" : "transparent"}
            />
            <Text
              style={[
                styles.favToggleText,
                showFavoritesOnly && styles.favToggleTextActive,
              ]}
            >
              የተወደዱ ብቻ
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Status Row */}
      <View style={styles.statusRow}>
        <Text style={styles.statusCount}>
          {filteredSongs.length} መዝሙራት ተገኝተዋል
        </Text>

        {(selectedCategory || searchQuery || showFavoritesOnly) && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleClearFilters}
            style={styles.clearButton}
          >
            <RefreshCw size={12} color="#b45309" />
            <Text style={styles.clearButtonText}>ማጣሪያዎችን አጽዳ</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Song List Items */}
      {filteredSongs.length > 0 ? (
        filteredSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isFavorite={favorites.includes(song.id)}
            onToggleFavorite={() => onToggleFavorite(song.id)}
            onClick={() => onSelectSong(song.id)}
          />
        ))
      ) : (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconCircle}>
            <Filter size={24} color="#b45309" />
          </View>
          <Text style={styles.emptyTitle}>ምንም መዝሙር አልተገኘም</Text>
          <Text style={styles.emptySubtitle}>
            እባክዎ ሌላ ቃል ይሞክሩ ወይም ማጣሪያዎቹን ያጽዱ።
          </Text>

          {(selectedCategory || searchQuery || showFavoritesOnly) && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleClearFilters}
              style={styles.emptyClearButton}
            >
              <Text style={styles.emptyClearButtonText}>ማጣሪያዎችን አጽዳ</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  filterCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#18181b",
  },
  filterRow: {
    gap: 8,
  },
  categoryScroll: {
    flexDirection: "row",
    marginBottom: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    gap: 6,
  },
  chipActive: {
    backgroundColor: "#d97706",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4b5563",
  },
  chipTextActive: {
    color: "#ffffff",
  },
  favToggleChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4e4e7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  favToggleChipActive: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
  },
  favToggleText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4b5563",
  },
  favToggleTextActive: {
    color: "#b45309",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  statusCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#71717a",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#b45309",
  },
  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  emptyIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fef3c7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#18181b",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#71717a",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyClearButton: {
    backgroundColor: "#d97706",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  emptyClearButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
});
