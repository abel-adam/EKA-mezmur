import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { BookOpen, Home, Music, Star, Sun, Moon } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SONGS_DATA } from "./data/songs.js";
import HomeScreen from "./screens/HomeScreen.jsx";
import SongListScreen from "./screens/SongListScreen.jsx";
import SongDetailScreen from "./screens/SongDetailScreen.jsx";

/**
 * App Root Component (React Native)
 * 
 * Root container for the Ethiopian Orthodox Tewahedo Hymnal mobile app (የመዝሙር ደብተር).
 * 
 * @component
 */
export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(22);

  // Load saved state from AsyncStorage
  useEffect(() => {
    async function loadSavedData() {
      try {
        const savedFavs = await AsyncStorage.getItem("mezmur_favorites");
        if (savedFavs) {
          setFavorites(JSON.parse(savedFavs));
        }
        const savedTheme = await AsyncStorage.getItem("mezmur_theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
        const savedFont = await AsyncStorage.getItem("mezmur_font_size");
        if (savedFont) {
          setFontSize(parseInt(savedFont, 10));
        }
      } catch (err) {
        console.log("AsyncStorage load error:", err);
      }
    }
    loadSavedData();
  }, []);

  // Save favorites to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem("mezmur_favorites", JSON.stringify(favorites)).catch(
      (err) => console.log(err),
    );
  }, [favorites]);

  // Save settings
  useEffect(() => {
    AsyncStorage.setItem("mezmur_theme", theme).catch((err) =>
      console.log(err),
    );
    AsyncStorage.setItem("mezmur_font_size", fontSize.toString()).catch(
      (err) => console.log(err),
    );
  }, [theme, fontSize]);

  const currentSong = SONGS_DATA.find((s) => s.id === selectedSongId);

  const handleToggleFavorite = (songId) => {
    setFavorites((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId],
    );
  };

  const handleSelectSong = (songId) => {
    setSelectedSongId(songId);
    setActiveScreen("detail");
  };

  const handleNavigateToSongs = () => {
    setActiveScreen("songs");
  };

  const handleNavigateToFavorites = () => {
    setActiveScreen("favorites");
  };

  const handleNavigateToHome = () => {
    setActiveScreen("home");
    setSelectedSongId(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleNavigateToHome}
          style={styles.headerTitleGroup}
        >
          <View style={styles.logoBadge}>
            <BookOpen size={20} color="#ffffff" />
          </View>
          <View>
            <Text style={styles.headerTitle}>የመዝሙር ደብተር</Text>
            <Text style={styles.headerSubtitle}>የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መዝሙራት</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.countChip}>
          <Text style={styles.countChipText}>{SONGS_DATA.length} መዝሙራት</Text>
        </View>
      </View>

      {/* Screen Router Body */}
      <View style={styles.mainContainer}>
        {activeScreen === "home" && (
          <HomeScreen
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToSongs={handleNavigateToSongs}
            onNavigateToFavorites={handleNavigateToFavorites}
            onSelectSong={handleSelectSong}
          />
        )}

        {activeScreen === "songs" && (
          <SongListScreen
            favorites={favorites}
            initialFavoritesFilter={false}
            onToggleFavorite={handleToggleFavorite}
            onSelectSong={handleSelectSong}
          />
        )}

        {activeScreen === "favorites" && (
          <SongListScreen
            favorites={favorites}
            initialFavoritesFilter={true}
            onToggleFavorite={handleToggleFavorite}
            onSelectSong={handleSelectSong}
          />
        )}

        {activeScreen === "detail" && currentSong && (
          <SongDetailScreen
            song={currentSong}
            isFavorite={favorites.includes(currentSong.id)}
            onToggleFavorite={() => handleToggleFavorite(currentSong.id)}
            onBack={handleNavigateToSongs}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        )}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNavigateToHome}
          style={[
            styles.navItem,
            activeScreen === "home" && styles.navItemActive,
          ]}
        >
          <Home
            size={20}
            color={activeScreen === "home" ? "#b45309" : "#71717a"}
          />
          <Text
            style={[
              styles.navText,
              activeScreen === "home" && styles.navTextActive,
            ]}
          >
            መነሻ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNavigateToSongs}
          style={[
            styles.navItem,
            activeScreen === "songs" && styles.navItemActive,
          ]}
        >
          <Music
            size={20}
            color={activeScreen === "songs" ? "#b45309" : "#71717a"}
          />
          <Text
            style={[
              styles.navText,
              activeScreen === "songs" && styles.navTextActive,
            ]}
          >
            መዝሙራት
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNavigateToFavorites}
          style={[
            styles.navItem,
            activeScreen === "favorites" && styles.navItemActive,
          ]}
        >
          <View>
            <Star
              size={20}
              color={activeScreen === "favorites" ? "#b45309" : "#71717a"}
              fill={activeScreen === "favorites" ? "#b45309" : "transparent"}
            />
            {favorites.length > 0 && (
              <View style={styles.badgeCounter}>
                <Text style={styles.badgeCounterText}>{favorites.length}</Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.navText,
              activeScreen === "favorites" && styles.navTextActive,
            ]}
          >
            የተወደዱ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleTheme}
          style={styles.navItem}
        >
          {theme === "light" ? (
            <Moon size={20} color="#71717a" />
          ) : (
            <Sun size={20} color="#f59e0b" />
          )}
          <Text style={styles.navText}>
            {theme === "light" ? "ጨለማ" : "ብርሃን"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    backgroundColor: "#ffffff",
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#d97706",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#18181b",
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#b45309",
  },
  countChip: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  countChipText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#92400e",
  },
  mainContainer: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e4e4e7",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: "#fef3c7",
  },
  navText: {
    fontSize: 11,
    color: "#71717a",
    marginTop: 2,
  },
  navTextActive: {
    fontWeight: "800",
    color: "#b45309",
  },
  badgeCounter: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#d97706",
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeCounterText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#ffffff",
  },
});
