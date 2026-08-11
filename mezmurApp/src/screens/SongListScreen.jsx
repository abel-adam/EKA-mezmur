import React, { useState, useMemo } from "react";
import { Search, Star, Filter, RefreshCw, Layers } from "lucide-react";
import { SONGS_DATA } from "../data/songs.js";
import SongCard from "../components/SongCard.jsx";

/**
 * SongListScreen Component
 * 
 * Provides a dedicated screen for browsing, searching, and filtering all hymns.
 * Features:
 * - Text-based search across titles, lyrics, categories, and composers.
 * - Exact-match search when inputting numeric values (matches song index).
 * - Categorization tabs.
 * - Quick toggle to display only favorited hymns.
 * - An option to reset all filters.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<string>} props.favorites - Array of favorited song IDs.
 * @param {boolean} [props.initialFavoritesFilter=false] - Initial state for the favorites-only filter.
 * @param {Function} props.onToggleFavorite - Callback to toggle favorite status.
 * @param {Function} props.onSelectSong - Callback to select a song and navigate to details.
 * @returns {React.ReactElement} The list browsing view.
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
        const numQuery = parseInt(query);

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
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4 dark:border-zinc-800/80 dark:bg-zinc-900">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            id="song-search-input"
            type="text"
            placeholder="በመዝሙር ርዕስ፣ በቁጥር ወይም በግጥም ይፈልጉ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3.5 pl-12 pr-4 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-amber-500 dark:focus:bg-zinc-950"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0 max-w-full sm:max-w-[75%]">
            <button
              id="category-tab-all"
              onClick={() => setSelectedCategory(null)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === null
                  ? "bg-amber-600 text-white shadow-sm dark:bg-amber-500 dark:text-zinc-950"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700/60"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              ሁሉንም መደቦች
            </button>

            {categories.map((cat) => (
              <button
                id={`category-tab-${cat}`}
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

          <button
            id="toggle-favs-only-btn"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 font-sans text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 ${
              showFavoritesOnly
                ? "border-amber-500 bg-amber-50 text-amber-800 dark:border-amber-500/50 dark:bg-amber-950/40 dark:text-amber-400"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/40"
            }`}
          >
            <Star
              className={`h-4 w-4 ${showFavoritesOnly ? "fill-current text-amber-500" : ""}`}
            />
            የተወደዱ ብቻ
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <span className="font-sans text-xs font-bold text-zinc-500 dark:text-zinc-400">
          {filteredSongs.length} መዝሙራት ተገኝተዋል
        </span>

        {(selectedCategory || searchQuery || showFavoritesOnly) && (
          <button
            onClick={handleClearFilters}
            className="font-sans text-xs font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            ማጣሪያዎችን አጽዳ
          </button>
        )}
      </div>

      {filteredSongs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredSongs.map((song) => (
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
        <div className="text-center py-16 px-4 border border-dashed border-zinc-200 rounded-3xl dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4 dark:bg-amber-950/30">
            <Filter className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="font-sans text-lg font-bold text-zinc-900 dark:text-zinc-50">
            ምንም መዝሙር አልተገኘም
          </h3>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
            እባክዎ ሌላ ቃል ይሞክሩ ወይም ማጣሪያዎቹን ያጽዱ።
          </p>
          {(selectedCategory || searchQuery || showFavoritesOnly) && (
            <button
              onClick={handleClearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-600 text-white px-5 py-2.5 text-xs font-bold transition-all duration-200 hover:bg-amber-700 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400 cursor-pointer"
            >
              ማጣሪያዎችን አጽዳ
            </button>
          )}
        </div>
      )}
    </div>
  );
}
