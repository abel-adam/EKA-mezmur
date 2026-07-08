/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen } from 'lucide-react';
import { Song, Language } from '../types';

interface SongCardProps {
  song: Song;
  language: Language;
  onClick: () => void;
}

export default function SongCard({
  song,
  language,
  onClick
}: SongCardProps) {
  const title = song.title[language];
  const alternateTitle = song.title[language === 'am' ? 'en' : 'am'];
  const category = song.category[language];
  const author = song.author ? song.author[language] : '';

  return (
    <div
      id={`song-card-${song.id}`}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 via-amber-50/0 to-amber-50/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-amber-950/5" />

      <div className="relative flex items-start gap-4">
        {/* Song Number Circle */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 font-mono text-sm font-semibold text-amber-700 ring-4 ring-amber-50/50 transition-colors duration-300 group-hover:bg-amber-100 group-hover:text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-950/20 dark:group-hover:bg-amber-900/40">
          #{song.number}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 font-sans text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              <BookOpen className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              {category}
            </span>
          </div>

          <h3 className="font-sans text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200 truncate">
            {title}
          </h3>

          <p className="font-sans text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5 font-medium italic">
            {alternateTitle}
          </p>

          {author && (
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-1">
              <span className="text-zinc-300 dark:text-zinc-700">•</span> {author}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}