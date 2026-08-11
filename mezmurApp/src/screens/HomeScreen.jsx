import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Flame, Layers, Search, Star } from "lucide-react-native";
import { SONGS_DATA } from "../data/songs.js";
import SongCard from "../components/SongCard.jsx";

/**
 * HomeScreen Component (React Native)
 * 
 * Main dashboard screen for browsing and searching traditional hymns.
 * 
 * @component
 */
export default function HomeScreen({
  favorites,
  onToggleFavorite,
  onNavigateToSongs,
  onNavigateToFavorites,
  onSelectSong,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const list = SONGS_DATA.map((s) => s.category);
    return Array.from(new Set(list));
  }, []);

  const displayedSongs = useMemo(() => {
    return SONGS_DATA.filter((song) => {
      if (selectedCategory && song.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const num = parseInt(q, 10);
        if (!isNaN(num) && song.number === num) return true;

        return (
          song.title.toLowerCase().includes(q) ||
          song.lyrics.toLowerCase().includes(q) ||
          song.category.toLowerCase().includes(q) ||
          (song.author || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Flame size={14} color="#fcd34d" />
          <Text style={styles.heroBadgeText}>የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መዝሙራት</Text>
        </View>

        <Text style={styles.heroTitle}>የመዝሙር ደብተር</Text>
        <Text style={styles.heroSubtitle}>
          የቅዱስ ያሬድ፣ የካቴድራሎችና የመንፈሳዊ መዝሙራት ግጥሞችና ዜማዎች ስብስብ።
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onNavigateToFavorites}
          style={styles.favQuickButton}
        >
          <Star size={16} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.favQuickText}>የተወደዱ ({favorites.length})</Text>
        </TouchableOpacity>
      </View>

      {/* Search & Category Filter Section */}
      <View style={styles.filterSection}>
        {/* Search Bar */}
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

        {/* Categories Horizontal Scroll */}
        <View style={styles.categoryHeaderRow}>
          <Text style={styles.categoryTitle}>መደቦች (Categories)</Text>
          <Text style={styles.categoryCount}>{displayedSongs.length} መዝሙራት</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedCategory(null)}
            style={[
              styles.categoryChip,
              selectedCategory === null && styles.categoryChipActive,
            ]}
          >
            <Layers
              size={12}
              color={selectedCategory === null ? "#ffffff" : "#4b5563"}
            />
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === null && styles.categoryChipTextActive,
              ]}
            >
              ሁሉም (All)
            </Text>
          </TouchableOpacity>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(cat)}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isActive && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Song List Grid */}
      <View style={styles.songListSection}>
        {displayedSongs.length > 0 ? (
          displayedSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isFavorite={favorites.includes(song.id)}
              onToggleFavorite={() => onToggleFavorite(song.id)}
              onClick={() => onSelectSong(song.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>በዚህ መደብ ምንም መዝሙር አልተገኘም</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>ሁሉንም መዝሙራት አሳይ</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  heroCard: {
    backgroundColor: "#78350f",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(251, 191, 36, 0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    marginBottom: 8,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fde68a",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: "#fef3c7",
    lineHeight: 18,
    marginBottom: 16,
  },
  favQuickButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(120, 53, 15, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(251, 191, 36, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 6,
  },
  favQuickText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fef3c7",
  },
  filterSection: {
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
  categoryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
  },
  categoriesScroll: {
    flexDirection: "row",
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: "#d97706",
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4b5563",
  },
  categoryChipTextActive: {
    color: "#ffffff",
  },
  songListSection: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: 12,
  },
  resetButton: {
    backgroundColor: "#d97706",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  resetButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
});
