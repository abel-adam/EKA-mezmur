import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Star, Music, BookOpen } from "lucide-react-native";

/**
 * SongCard Component (React Native)
 * 
 * Renders a card for an individual hymn in a mobile layout.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.song - Song detail object.
 * @param {boolean} props.isFavorite - Favorite flag.
 * @param {Function} props.onToggleFavorite - Toggle callback.
 * @param {Function} props.onClick - Navigation callback.
 */
export default function SongCard({
  song,
  isFavorite,
  onToggleFavorite,
  onClick,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={styles.card}
    >
      <View style={styles.cardContent}>
        {/* Song Number Badge */}
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>#{song.number}</Text>
        </View>

        {/* Info Column */}
        <View style={styles.infoContainer}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <BookOpen size={12} color="#b45309" />
              <Text style={styles.categoryText}>{song.category}</Text>
            </View>

            {song.audioUrl && (
              <View style={styles.audioBadge}>
                <Music size={12} color="#b45309" />
                <Text style={styles.audioText}>ዜማ አለው</Text>
              </View>
            )}
          </View>

          <Text style={styles.titleText} numberOfLines={2}>
            {song.title}
          </Text>

          {song.author && (
            <Text style={styles.authorText} numberOfLines={1}>
              • {song.author}
            </Text>
          )}
        </View>

        {/* Favorite Button */}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={(e) => {
            onToggleFavorite();
          }}
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
        >
          <Star
            size={20}
            color={isFavorite ? "#d97706" : "#a1a1aa"}
            fill={isFavorite ? "#d97706" : "transparent"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  numberBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  numberText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#b45309",
  },
  infoContainer: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 6,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4b5563",
  },
  audioBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  audioText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#b45309",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#18181b",
    lineHeight: 20,
  },
  authorText: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 4,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f5",
    marginLeft: 8,
  },
  favoriteButtonActive: {
    backgroundColor: "#fef3c7",
  },
});
