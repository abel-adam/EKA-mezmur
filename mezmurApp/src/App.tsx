/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BookOpen, Languages, Home, Music, Sun, Moon } from "lucide-react";
import { Language, AppSettings } from "./types";
import { SONGS_DATA } from "./data/songs";
import HomeScreen from "./screens/HomeScreen";
import SongListScreen from "./screens/SongListScreen";
import SongDetailScreen from "./screens/SongDetailScreen";

type ScreenType = "home" | "songs" | "detail";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("home");
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const savedTheme = localStorage.getItem("mezmur_theme") as
        | "light"
        | "dark"
        | null;
      const savedLang = localStorage.getItem(
        "mezmur_language",
      ) as Language | null;

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      return {
        theme: savedTheme || (prefersDark ? "dark" : "light"),
        language: savedLang || "am",
      };
    } catch {
      return {
        theme: "light",
        language: "am",
      };
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("mezmur_theme", settings.theme);
    localStorage.setItem("mezmur_language", settings.language);
  }, [settings]);

  const currentSong = SONGS_DATA.find((s) => s.id === selectedSongId);

  const handleSelectSong = (songId: string) => {
    setSelectedSongId(songId);
    setActiveScreen("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToSongs = () => {
    setActiveScreen("songs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToHome = () => {
    setActiveScreen("home");
    setSelectedSongId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setLanguage = (lang: Language) => {
    setSettings((prev) => ({ ...prev, language: lang }));
  };

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const t = {
    brandName: settings.language === "am" ? "የመዝሙር ደብተር" : "Mezmur App",
    home: settings.language === "am" ? "ዋና ገጽ" : "Home",
    browse: settings.language === "am" ? "መዝሙራት" : "Browse Songs",
    footerText:
      settings.language === "am"
        ? "© ፪፲፲፰ የመዝሙር ደብተር። ሁሉም መብቱ የተጠበቀ ነው።"
        : "© 2026 Mezmur App. All rights reserved.",
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col font-sans">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-900/80 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div
            onClick={handleNavigateToHome}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shadow-md transition-transform duration-200 group-hover:scale-105 dark:bg-amber-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-sans text-lg font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              {t.brandName}
            </span>
          </div>

          <nav className="flex items-center gap-1">
            <button
              id="nav-home-tab"
              onClick={handleNavigateToHome}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeScreen === "home"
                  ? "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">{t.home}</span>
            </button>

            <button
              id="nav-songs-tab"
              onClick={handleNavigateToSongs}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeScreen === "songs"
                  ? "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Music className="h-4 w-4" />
              <span>{t.browse}</span>
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              id="header-lang-swap-btn"
              onClick={() =>
                setLanguage(settings.language === "am" ? "en" : "am")
              }
              className="flex h-10 px-3 items-center gap-1.5 rounded-xl border border-zinc-100 bg-white text-xs font-bold text-zinc-500 transition-colors hover:bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
              title="Change Language"
            >
              <Languages className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
              <span className="font-sans">
                {settings.language === "am" ? "EN" : "አማ"}
              </span>
            </button>

            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-100 bg-white text-zinc-500 transition-all hover:bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
              title={
                settings.theme === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
            >
              {settings.theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {activeScreen === "home" && (
          <HomeScreen
            language={settings.language}
            setLanguage={setLanguage}
            onNavigateToSongs={handleNavigateToSongs}
            onSelectSong={handleSelectSong}
          />
        )}

        {activeScreen === "songs" && (
          <SongListScreen
            language={settings.language}
            onSelectSong={handleSelectSong}
          />
        )}

        {activeScreen === "detail" && currentSong && (
          <SongDetailScreen
            song={currentSong}
            language={settings.language}
            setLanguage={setLanguage}
            onBack={handleNavigateToSongs}
          />
        )}
      </main>

      <footer className="w-full border-t border-zinc-200/60 bg-white py-6 dark:border-zinc-900/60 dark:bg-zinc-950/40 text-center font-sans text-xs text-zinc-400 dark:text-zinc-500">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-amber-600/60" />
            <span>{t.brandName}</span>
          </div>
          <p>{t.footerText}</p>
        </div>
      </footer>
    </div>
  );
}
