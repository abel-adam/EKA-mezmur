/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Languages, Flame, Compass, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { SONGS_DATA } from '../data/songs';

interface HomeScreenProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateToSongs: () => void;
  onSelectSong: (songId: string) => void;
}

export default function HomeScreen({
  language,
  setLanguage,
  onNavigateToSongs,
  onSelectSong
}: HomeScreenProps) {
  const t = {
    welcome: language === 'am' ? 'የመዝሙር ደብተር' : 'Mezmur App',
    subtitle: language === 'am' ? 'የቅዱስ ያሬድና መንፈሳዊ መዝሙራት ስብስብ' : 'A Collection of Sacred Liturgical Church Songs',
    browseAll: language === 'am' ? 'ሁሉንም መዝሙራት እይ' : 'Browse All Songs',
    statsTitle: language === 'am' ? 'የመዝሙር ስታቲስቲክስ' : 'App Overview',
    totalSongs: language === 'am' ? 'ጠቅላላ መዝሙራት' : 'Total Songs',
    activeLang: language === 'am' ? 'ንቁ ቋንቋ' : 'Active Language',
    selectLang: language === 'am' ? 'ቋንቋ ይምረጡ' : 'Select Lyric Language',
    featured: language === 'am' ? 'የተመረጡ መዝሙራት' : 'Featured Mezmurs',
    recentDescription: language === 'am' ? 'ለዛሬ የተመረጡ መንፈሳዊ መዝሙሮች' : 'Handpicked spiritual hymns for your day',
  };

  const featuredSongs = SONGS_DATA.filter(s => s.number === 1 || s.number === 4 || s.number === 2);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 p-8 text-white shadow-xl dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 dark:border dark:border-zinc-800/80">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Flame className="h-4.5 w-4.5 animate-pulse" />
              Orthodox & Christian Songs
            </span>
            <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight">
              {t.welcome}
            </h1>
            <p className="text-zinc-200/90 text-sm md:text-base font-light font-sans leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onNavigateToSongs}
            className="self-start md:self-auto shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-amber-900 shadow-md transition-all duration-200 hover:bg-amber-50 hover:scale-[1.02] active:scale-[0.98] dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
          >
            {t.browseAll}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid: Language Selection & Stats */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Language Selector Card */}
        <div className="md:col-span-7 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900">
          <h2 className="font-sans text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1 flex items-center gap-2">
            <Languages className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            {t.selectLang}
          </h2>
          <p className="font-sans text-xs text-zinc-400 dark:text-zinc-500 mb-5">
            Switch lyrics and content translations instantly
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              id="lang-btn-am"
              onClick={() => setLanguage('am')}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 ${
                language === 'am'
                  ? 'border-amber-600 bg-amber-50/40 text-amber-900 dark:border-amber-500 dark:bg-amber-950/20 dark:text-amber-300'
                  : 'border-zinc-100 hover:border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800/60 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/30'
              }`}
            >
              <span className="font-sans text-2xl font-bold mb-1">አማርኛ</span>
              <span className="font-sans text-xs opacity-80">Amharic</span>
            </button>

            <button
              id="lang-btn-en"
              onClick={() => setLanguage('en')}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 ${
                language === 'en'
                  ? 'border-amber-600 bg-amber-50/40 text-amber-900 dark:border-amber-500 dark:bg-amber-950/20 dark:text-amber-300'
                  : 'border-zinc-100 hover:border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800/60 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/30'
              }`}
            >
              <span className="font-sans text-xl font-bold mb-1">English</span>
              <span className="font-sans text-xs opacity-80">Anglicized</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="md:col-span-5 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900">
          <h2 className="font-sans text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-5">
            {t.statsTitle}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>
                <span className="font-sans text-sm text-zinc-600 dark:text-zinc-400 font-medium">{t.totalSongs}</span>
              </div>
              <span className="font-mono text-base font-bold text-zinc-900 dark:text-zinc-100">{SONGS_DATA.length}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                  <Languages className="h-4.5 w-4.5" />
                </div>
                <span className="font-sans text-sm text-zinc-600 dark:text-zinc-400 font-medium">{t.activeLang}</span>
              </div>
              <span className="font-sans text-sm font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-0.5 rounded-md">
                {language === 'am' ? 'አማርኛ' : 'English'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Songs Section */}
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="font-sans text-xl font-extrabold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <Compass className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              {t.featured}
            </h2>
            <p className="font-sans text-xs text-zinc-400 dark:text-zinc-500">
              {t.recentDescription}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featuredSongs.map((song) => {
            const title = song.title[language];
            const altTitle = song.title[language === 'am' ? 'en' : 'am'];
            const category = song.category[language];

            return (
              <div
                id={`featured-card-${song.id}`}
                key={song.id}
                onClick={() => onSelectSong(song.id)}
                className="group p-5 rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-200 hover:border-amber-200 hover:shadow-md cursor-pointer flex flex-col justify-between h-40 dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <div>
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase mb-1.5 block">
                    {category}
                  </span>
                  <h3 className="font-sans text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200 line-clamp-2">
                    {title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 dark:text-zinc-500 italic mt-0.5 line-clamp-1">
                    {altTitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-50 dark:border-zinc-800/50">
                  <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    Hymn #{song.number}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform duration-200">
                    Read Lyrics <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}