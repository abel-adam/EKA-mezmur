import React from "react";
import { Star, Music, BookOpen } from "lucide-react";

/**
 * SongCard Component
 * 
 * Displays a summarized card view for an individual hymn.
 * Features include displaying the song number, category indicator, 
 * audio availability badge, title, author/composer, and a favorite toggle button.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.song - The song details object.
 * @param {string} props.song.id - Unique ID of the song.
 * @param {number} props.song.number - The hymnal index number.
 * @param {string} props.song.title - The title of the hymn.
 * @param {string} props.song.category - The category/type of the hymn.
 * @param {string} [props.song.author] - Optional composer/source.
 * @param {string} [props.song.audioUrl] - Optional URL or indicator of audio presence.
 * @param {boolean} props.isFavorite - Flag indicating if this song is in the user's favorites.
 * @param {Function} props.onToggleFavorite - Callback function executed when toggling favorite status.
 * @param {Function} props.onClick - Callback function executed when the card is clicked.
 * @returns {React.ReactElement} Individual song card view.
 */
export default function SongCard({
  song,
  isFavorite,
  onToggleFavorite,
  onClick,
}) {
  return (
    <div
      id={`song-card-${song.id}`}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 font-mono text-sm font-bold text-amber-800 ring-4 ring-amber-50/60 transition-colors duration-300 group-hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-950/20 dark:group-hover:bg-amber-900/50">
          #{song.number}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 font-sans text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              <BookOpen className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              {song.category}
            </span>
            {song.audioUrl && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 font-sans text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                <Music className="h-3 w-3" />
                ዜማ አለው
              </span>
            )}
          </div>

          <h3 className="font-sans text-base font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200 line-clamp-2">
            {song.title}
          </h3>

          {song.author && (
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 flex items-center gap-1">
              <span className="text-amber-600 dark:text-amber-400">•</span>{" "}
              {song.author}
            </p>
          )}
        </div>

        <button
          id={`fav-btn-${song.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
            isFavorite
              ? "bg-amber-50 text-amber-500 dark:bg-amber-950/50 dark:text-amber-400 scale-105"
              : "text-zinc-300 hover:bg-zinc-100 hover:text-zinc-500 dark:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          }`}
          title={isFavorite ? "ከተወደዱት አስወግድ" : "ወደተወደዱት አክል"}
        >
          <Star
            className="h-5 w-5"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}
