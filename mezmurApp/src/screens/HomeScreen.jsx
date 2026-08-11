import React, { useState, useMemo } from "react";
import { Flame, Layers, Search, Star } from "lucide-react";
import { SONGS_DATA } from "../data/songs.js";
import SongCard from "../components/SongCard.jsx";

/**
 * HomeScreen Component
 * 
 * Serves as the landing dashboard for the application.
 * Highlights:
 * - A dynamic hero card displaying favorites count and application title.
 * - Interactive search input matching hymn titles, lyrics, numbers, categories, or composers.
 * - Category filter tabs extracted dynamically from the songs dataset.
 * - Grid display of filtered hymns.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<string>} props.favorites - Array of favorited song IDs.
 * @param {Function} props.onToggleFavorite - Callback to toggle favorite status of a song.
 * @param {Function} props.onNavigateToSongs - Callback to navigate to the full song list screen.
 * @param {Function} props.onNavigateToFavorites - Callback to navigate to the favorites filter view.
 * @param {Function} props.onSelectSong - Callback to select a song and open its detail view.
 * @returns {React.ReactElement} The dashboard view.
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
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 p-6 sm:p-8 text-white shadow-xl dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 dark:border dark:border-zinc-800/80">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
              <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
              የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መዝሙራት
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-black tracking-tight">
              የመዝሙር ደብተር
            </h1>
            <p className="text-amber-100/90 text-xs sm:text-sm font-medium font-sans leading-relaxed">
              የቅዱስ ያሬድ፣ የካቴድራሎችና የመንፈሳዊ መዝሙራት ግጥሞችና ዜማዎች ስብስብ።
            </p>
          </div>

          <button
            id="hero-favs-quick-btn"
            onClick={onNavigateToFavorites}
            className="self-start sm:self-auto shrink-0 inline-flex items-center gap-2 rounded-2xl bg-amber-900/60 border border-amber-500/30 px-4 py-2.5 text-xs font-bold text-amber-200 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-amber-800/70 hover:scale-[1.02] cursor-pointer"
          >
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            የተወደዱ ({favorites.length})
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4 dark:border-zinc-800/80 dark:bg-zinc-900">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            id="home-song-search-input"
            type="text"
            placeholder="በመዝሙር ርዕስ፣ በቁጥር ወይም በግጥም ይፈልጉ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-12 pr-4 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-amber-500 dark:focus:bg-zinc-950"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 px-1">
            <span>መደቦች (Categories)</span>
            <span>{displayedSongs.length} መዝሙራት</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              id="home-category-tab-all"
              onClick={() => setSelectedCategory(null)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === null
                  ? "bg-amber-600 text-white shadow-sm dark:bg-amber-500 dark:text-zinc-950"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700/60"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              ሁሉም (All)
            </button>

            {categories.map((cat) => (
              <button
                id={`home-category-tab-${cat}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-600 text-white shadow-sm dark:bg-amber-500 dark:text-zinc-950"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {displayedSongs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {displayedSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isFavorite={favorites.includes(song.id)}
                onToggleFavorite={() => onToggleFavorite(song.id)}
                onClick={() => onSelectSong(song.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4 border border-dashed border-zinc-200 rounded-3xl dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <p className="font-sans text-sm font-bold text-zinc-700 dark:text-zinc-300">
              በዚህ መደብ ምንም መዝሙር አልተገኘም
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-amber-700 dark:bg-amber-500 dark:text-zinc-950 cursor-pointer"
            >
              ሁሉንም መዝሙራት አሳይ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
