import React, { useState, useEffect } from "react";
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
  Play,
  Pause,
  Square,
  Type,
  Music,
  BookOpen,
} from "lucide-react-native";
import { AudioSynth } from "../utils/audioSynth";

/**
 * SongDetailScreen Component (React Native)
 * 
 * Displays full details, lyric verses, font-size adjustment, and audio synthesis controls.
 * 
 * @component
 */
export default function SongDetailScreen({
  song,
  isFavorite,
  onToggleFavorite,
  onBack,
  fontSize,
  setFontSize,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentFreq, setCurrentFreq] = useState(null);

  useEffect(() => {
    return () => {
      AudioSynth.stop();
    };
  }, [song.id]);

  const handlePlayPause = () => {
    if (isPlaying) {
      AudioSynth.stop();
      setIsPlaying(false);
      setCurrentNote(null);
      setCurrentFreq(null);
    } else {
      setIsPlaying(true);
      AudioSynth.play(song.melodyIndex, {
        onNotePlay: (noteName, frequency) => {
          setCurrentNote(noteName);
          setCurrentFreq(Math.round(frequency));
        },
        onTimeUpdate: (current, total) => {
          setCurrentTime(current);
          setDuration(total);
        },
        onEnded: () => {
          setIsPlaying(false);
          setCurrentNote(null);
          setCurrentFreq(null);
          setCurrentTime(0);
        },
      });
    }
  };

  const handleStop = () => {
    AudioSynth.stop();
    setIsPlaying(false);
    setCurrentNote(null);
    setCurrentFreq(null);
    setCurrentTime(0);
  };

  const adjustFontSize = (increment) => {
    const newSize = Math.max(14, Math.min(38, fontSize + increment));
    setFontSize(newSize);
  };

  const lyricStanzas = song.lyrics.split("\n\n");

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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
            style={[styles.favButtonText, isFavorite && styles.favButtonTextActive]}
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
            style={[styles.fontButton, fontSize <= 14 && styles.fontButtonDisabled]}
          >
            <Text style={styles.fontButtonText}>A-</Text>
          </TouchableOpacity>

          <Text style={styles.fontSizeValue}>{fontSize}px</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => adjustFontSize(2)}
            disabled={fontSize >= 38}
            style={[styles.fontButton, fontSize >= 38 && styles.fontButtonDisabled]}
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

      {/* Synthesizer Audio Player Card */}
      <View style={styles.playerCard}>
        <View style={styles.playerTopRow}>
          <View style={styles.playerInfoRow}>
            <View style={styles.musicIconCircle}>
              <Music size={18} color="#ffffff" />
            </View>
            <View style={styles.playerTextContainer}>
              <Text style={styles.playerTitle}>የመዝሙር ዜማ እያጫወተ ነው</Text>
              <Text style={styles.playerSubtitle}>
                {isPlaying && currentNote
                  ? `ድምፅ: ${currentNote} (${currentFreq}Hz)`
                  : "የቅዱስ ያሬድ ቤተክርስቲያን ዜማ"}
              </Text>
            </View>
          </View>

          <View style={styles.playerButtonsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePlayPause}
              style={styles.playButton}
            >
              {isPlaying ? (
                <Pause size={16} color="#ffffff" fill="#ffffff" />
              ) : (
                <Play size={16} color="#ffffff" fill="#ffffff" />
              )}
              <Text style={styles.playButtonText}>
                {isPlaying ? "አቁም" : "ዜማውን አጫውት"}
              </Text>
            </TouchableOpacity>

            {isPlaying && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleStop}
                style={styles.stopButton}
              >
                <Square size={14} color="#3f3f46" fill="#3f3f46" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isPlaying && (
          <View style={styles.progressSection}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${
                      duration > 0 ? (currentTime / duration) * 100 : 0
                    }%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
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
    marginBottom: 16,
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
  playerCard: {
    backgroundColor: "#fffbeb",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  playerTopRow: {
    flexDirection: "column",
    gap: 12,
  },
  playerInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  musicIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#d97706",
    alignItems: "center",
    justifyContent: "center",
  },
  playerTextContainer: {
    flex: 1,
  },
  playerTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#78350f",
  },
  playerSubtitle: {
    fontSize: 11,
    color: "#4b5563",
  },
  playerButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-end",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d97706",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  playButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
  stopButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4e4e7",
    justifyContent: "center",
    alignItems: "center",
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(245, 158, 11, 0.2)",
    gap: 8,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#78350f",
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fef3c7",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#d97706",
    borderRadius: 3,
  },
});
