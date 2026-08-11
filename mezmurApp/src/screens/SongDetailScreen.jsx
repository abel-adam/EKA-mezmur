import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  ArrowLeft,
  Star,
  Type,
  BookOpen,
} from "lucide-react-native";

/**
 * SongDetailScreen Component (React Native)
 *
 * Displays full details, lyric verses, and font-size adjustment.
 *
 * @component
 * @param {Object} props.song - Song detail object.
 * @param {boolean} props.isFavorite - Favorite flag.
 * @param {Function} props.onToggleFavorite - Toggle callback.
 * @param {Function} props.onBack - Navigate back callback.
 * @param {number} props.fontSize - Current font size in px.
 * @param {Function} props.setFontSize - Setter for font size.
 */
export default function SongDetailScreen({
  song,
  isFavorite,
  onToggleFavorite,
  onBack,
  fontSize,
  setFontSize,
}) {
  const adjustFontSize = (increment) => {
    const newSize = Math.max(14, Math.min(38, fontSize + increment));
    setFontSize(newSize);
  };

  const lyricStanzas = song.lyrics.split("\n\n");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Navigation & Actions Row */}
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
        >
          <ArrowLeft size={16} color="#3f3f46" />
          <Text style={styles.backButtonText}>ተመለስ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleFavorite}
          style={[styles.favButton, isFavorite && styles.favButtonActive]}
        >
          <Star
            size={16}
            color={isFavorite ? "#d97706" : "#71717a"}
            fill={isFavorite ? "#d97706" : "transparent"}
          />
          <Text
            style={[
              styles.favButtonText,
              isFavorite && styles.favButtonTextActive,
            ]}
          >
            {isFavorite ? "ከተወደዱት አውጣ" : "ወደተወደዱት አክል"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Header Info Card */}
      <View style={styles.headerCard}>
        <View style={styles.badgeRow}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberBadgeText}>መዝሙር #{song.number}</Text>
          </View>
          <View style={styles.categoryBadge}>
            <BookOpen size={12} color="#b45309" />
            <Text style={styles.categoryBadgeText}>{song.category}</Text>
          </View>
        </View>

        <Text style={styles.titleText}>{song.title}</Text>

        {(song.author || song.album) && (
          <View style={styles.metaGrid}>
            {song.author && (
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>ደራሲ / አቀናባሪ</Text>
                <Text style={styles.metaValue}>{song.author}</Text>
              </View>
            )}
            {song.album && (
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>አልበም</Text>
                <Text style={styles.metaValue}>{song.album}</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Font Size Adjuster Toolbar */}
      <View style={styles.fontSizeToolbar}>
        <View style={styles.fontSizeTitleRow}>
          <Type size={16} color="#d97706" />
          <Text style={styles.fontSizeTitle}>የፊደል መጠን ማስተካከያ</Text>
        </View>

        <View style={styles.fontSizeControls}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => adjustFontSize(-2)}
            disabled={fontSize <= 14}
            style={[
              styles.fontButton,
              fontSize <= 14 && styles.fontButtonDisabled,
            ]}
          >
            <Text style={styles.fontButtonText}>A-</Text>
          </TouchableOpacity>

          <Text style={styles.fontSizeValue}>{fontSize}px</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => adjustFontSize(2)}
            disabled={fontSize >= 38}
            style={[
              styles.fontButton,
              fontSize >= 38 && styles.fontButtonDisabled,
            ]}
          >
            <Text style={styles.fontButtonText}>A+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lyric Body Card */}
      <View style={styles.lyricsCard}>
        {lyricStanzas.map((stanza, idx) => (
          <View key={idx} style={styles.stanzaBlock}>
            <Text style={[styles.stanzaText, { fontSize: fontSize }]}>
              {stanza}
            </Text>
          </View>
        ))}
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
    paddingBottom: 60,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4e4e7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  backButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3f3f46",
  },
  favButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4e4e7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  favButtonActive: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
  },
  favButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#71717a",
  },
  favButtonTextActive: {
    color: "#b45309",
  },
  headerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  numberBadge: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  numberBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#b45309",
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#52525b",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#18181b",
    lineHeight: 28,
    marginBottom: 12,
  },
  metaGrid: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f4f4f5",
    paddingTop: 12,
    gap: 24,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#a1a1aa",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#27272a",
  },
  fontSizeToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4f4f5",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  fontSizeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  fontSizeTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4b5563",
  },
  fontSizeControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fontButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4e4e7",
    justifyContent: "center",
    alignItems: "center",
  },
  fontButtonDisabled: {
    opacity: 0.4,
  },
  fontButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3f3f46",
  },
  fontSizeValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#52525b",
  },
  lyricsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  stanzaBlock: {
    marginBottom: 20,
  },
  stanzaText: {
    fontWeight: "500",
    color: "#18181b",
    lineHeight: 32,
    textAlign: "center",
  },
});
