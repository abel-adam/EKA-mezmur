import React, { useState, useEffect } from "react";
import { Sun, Moon, BookOpen, Star, Home, Music } from "lucide-react";
import { SONGS_DATA } from "./data/songs.js";
import HomeScreen from "./screens/HomeScreen.jsx";
import SongListScreen from "./screens/SongListScreen.jsx";
import SongDetailScreen from "./screens/SongDetailScreen.jsx";

/**
 * App Root Component
 * 
 * Manages the global state of the Ethiopian Orthodox Tewahedo Hymnal application (የመዝሙር ደብተር).
 * Responsibilities include:
 * - Routing between active screens (Home, Songs List, Favorites, Details).
 * - Persisting user favorites and settings (theme, font size) in localStorage.
 * - Applying global document theme classes (dark/light) dynamically.
 * 
 * @component
 * @returns {React.ReactElement} The main application view.
 */
export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [selectedSongId, setSelectedSongId] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("mezmur_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("mezmur_theme");
      const savedFont = localStorage.getItem("mezmur_font_size");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      return {
        theme: savedTheme || (prefersDark ? "dark" : "light"),
        fontSize: savedFont ? parseInt(savedFont, 10) : 22,
      };
    } catch {
      return {
        theme: "light",
        fontSize: 22,
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("mezmur_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("mezmur_theme", settings.theme);
    localStorage.setItem("mezmur_font_size", settings.fontSize.toString());
  }, [settings]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToSongs = () => {
    setActiveScreen("songs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToFavorites = () => {
    setActiveScreen("favorites");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToHome = () => {
    setActiveScreen("home");
    setSelectedSongId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const setFontSize = (size) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-900/80 dark:bg-zinc-950/90 shadow-xs">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div
            onClick={handleNavigateToHome}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-md transition-transform duration-200 group-hover:scale-105 dark:bg-amber-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="font-sans text-lg font-black tracking-tight text-zinc-950 dark:text-zinc-50 block leading-tight">
                የመዝሙር ደብተር
              </span>
              <span className="font-sans text-[10px] font-bold text-amber-700 dark:text-amber-400 block -mt-0.5">
                የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መዝሙራት
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
              {SONGS_DATA.length} መዝሙራት
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6">
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
            fontSize={settings.fontSize}
            setFontSize={setFontSize}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav
        id="footer-bottom-navigation"
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200/90 bg-white/95 backdrop-blur-md dark:border-zinc-800/90 dark:bg-zinc-950/95 shadow-lg"
      >
        <div className="mx-auto flex max-w-md items-center justify-around py-2 px-3">
          <button
            id="footer-tab-home"
            onClick={handleNavigateToHome}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-2xl transition-all ${
              activeScreen === "home"
                ? "text-amber-700 dark:text-amber-400 font-extrabold bg-amber-50/80 dark:bg-amber-950/40"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="font-sans text-[11px]">መነሻ</span>
          </button>

          <button
            id="footer-tab-songs"
            onClick={handleNavigateToSongs}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-2xl transition-all ${
              activeScreen === "songs"
                ? "text-amber-700 dark:text-amber-400 font-extrabold bg-amber-50/80 dark:bg-amber-950/40"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400"
            }`}
          >
            <Music className="h-5 w-5" />
            <span className="font-sans text-[11px]">መዝሙራት</span>
          </button>

          <button
            id="footer-tab-favorites"
            onClick={handleNavigateToFavorites}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-2xl transition-all relative ${
              activeScreen === "favorites"
                ? "text-amber-700 dark:text-amber-400 font-extrabold bg-amber-50/80 dark:bg-amber-950/40"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400"
            }`}
          >
            <div className="relative">
              <Star
                className={`h-5 w-5 ${activeScreen === "favorites" ? "fill-current" : ""}`}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-extrabold text-white">
                  {favorites.length}
                </span>
              )}
            </div>
            <span className="font-sans text-[11px]">የተወደዱ</span>
          </button>

          <button
            id="footer-tab-theme"
            onClick={toggleTheme}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-2xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400"
          >
            {settings.theme === "light" ? (
              <Moon className="h-5 w-5 text-amber-800 dark:text-amber-400" />
            ) : (
              <Sun className="h-5 w-5 text-amber-400" />
            )}
            <span className="font-sans text-[11px]">
              {settings.theme === "light" ? "ጨለማ" : "ብርሃን"}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
