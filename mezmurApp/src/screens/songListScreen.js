/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Filter, RefreshCw, Layers } from 'lucide-react';
import { Song, Language } from '../types';
import { SONGS_DATA } from '../data/songs';
import SongCard from '../components/SongCard';

interface SongListScreenProps {
  language: Language;
  onSelectSong: (songId: string) => void;
}

export default function SongListScreen({
  language,
  onSelectSong
}: SongListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const t = {
    searchPlaceholder: language === 'am' ? 'በመዝሙር ርዕስ ወይም በግጥም ይፈልጉ...' : 'Search by title or lyrics keywords...',
    allCategories: language === 'am' ? 'ሁሉንም መደቦች' : 'All Categories',
    totalFound: language === 'am' ? 'ተገኝተዋል' : 'songs found',
    noSongs: language === 'am' ? 'ምንም መዝሙር አልተገኘም' : 'No songs found',
    noSongsDesc: language === 'am' ? 'እባክዎ ሌላ ቃል ይሞክሩ ወይም ማጣሪያዎቹን ያጽዱ።' : 'Try searching for something else or clear the filters.',
    clearFilters: language === 'am' ? 'ማጣሪያዎችን አጽዳ' : 'Reset Filters',
  };

  const categories = useMemo(() => {
    const list = SONGS_DATA.map(song => song.category[language]);
    return Array.from(new Set(list));
  }, [language]);

  const filteredSongs = useMemo(() => {
    return SONGS_DATA.filter((song) => {
      if (selectedCategory && song.category[language] !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const numQuery = parseInt(query);

        if (!isNaN(numQuery) && song.number === numQuery) {
          return true;
        }

        const titleAm = song.title.am.toLowerCase();
        const titleEn = song.title.en.toLowerCase();
        const lyricsAm = song.lyrics.am.toLowerCase();
        const lyricsEn = song.lyrics.en.toLowerCase();

        return (
          titleAm.includes(query) ||
          titleEn.includes(query) ||
          lyricsAm.includes(query) ||
          lyricsEn.includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, language]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Search and Filters Section */}
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4 dark:border-zinc-800/80 dark:bg-zinc-900">
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            id="song-search-input"
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3.5 pl-12 pr-4 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-amber-500 dark:focus:bg-zinc-950"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0 max-w-full">
            <button
              id="category-tab-all"
              onClick={() => setSelectedCategory(null)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500 dark:text-zinc-950'
                  : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700/60'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              {t.allCategories}
            </button>

            {categories.map((cat) => (
              <button
                id={`category-tab-${cat}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500 dark:text-zinc-950'
                    : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <span className="font-sans text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          {filteredSongs.length} {t.totalFound}
        </span>

        {(selectedCategory || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="font-sans text-xs font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {t.clearFilters}
          </button>
        )}
      </div>

      {filteredSongs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              language={language}
              onClick={() => onSelectSong(song.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 border border-dashed border-zinc-200 rounded-3xl dark:border-zinc-800">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4 dark:bg-amber-950/30">
            <Filter className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="font-sans text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {t.noSongs}
          </h3>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
            {t.noSongsDesc}
          </p>
          {(selectedCategory || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-50 text-amber-800 px-4 py-2 text-xs font-semibold transition-all duration-200 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-900/30"
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      )}
    </div>
  );
}