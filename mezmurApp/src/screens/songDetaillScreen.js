/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Languages, BookOpen } from 'lucide-react';
import { Song, Language } from '../types';

interface SongDetailScreenProps {
  song: Song;
  language: Language;
  setLanguage: (lang: Language) => void;
  onBack: () => void;
}

export default function SongDetailScreen({
  song,
  language,
  setLanguage,
  onBack
}: SongDetailScreenProps) {
  const title = song.title[language];
  const altTitle = song.title[language === 'am' ? 'en' : 'am'];
  const lyrics = song.lyrics[language];
  const author = song.author ? song.author[language] : '';
  const album = song.album ? song.album[language] : '';
  const category = song.category[language];

  const lyricStanzas = lyrics.split('\n\n');

  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {/* Top Action Header */}
      <div className="flex items-center justify-between">
        <button
          id="detail-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 font-sans text-xs font-semibold text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-2">
          <button
            id="detail-lang-toggle"
            onClick={() => setLanguage(language === 'am' ? 'en' : 'am')}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 font-sans text-xs font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            title="Switch Language"
          >
            <Languages className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>{language === 'am' ? 'English' : 'አማርኛ'}</span>
          </button>
        </div>
      </div>

      {/* Song Header Card */}
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-sans text-xs font-bold text-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
              Hymn #{song.number}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 font-sans text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              <BookOpen className="h-3.5 w-3.5 text-amber-600" />
              {category}
            </span>
          </div>

          <h1 className="font-sans text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">
            {title}
          </h1>

          <p className="font-sans text-sm text-zinc-400 dark:text-zinc-500 font-medium italic">
            {altTitle}
          </p>
        </div>

        {(author || album) && (
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 font-sans text-xs">
            {author && (
              <div>
                <span className="text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider block mb-0.5">Author</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-bold">{author}</span>
              </div>
            )}
            {album && (
              <div>
                <span className="text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider block mb-0.5">Album</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-bold">{album}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lyrics Paper/Board */}
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none text-zinc-950 dark:text-white">
          <svg className="w-80 h-80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2h2v7h7v2h-7v11h-2v-11H4V9h7V2z" />
          </svg>
        </div>

        <div
          id="lyrics-body"
          className="relative z-10 space-y-8 font-sans text-zinc-800 dark:text-zinc-100 leading-relaxed text-center mx-auto max-w-xl transition-all duration-200 text-lg md:text-xl font-medium"
        >
          {lyricStanzas.map((stanza, idx) => (
            <div key={idx} className="whitespace-pre-line py-1 border-amber-500/10 dark:border-amber-500/5">
              {stanza}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}