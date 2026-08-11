import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Star,
  Play,
  Pause,
  Square,
  Volume2,
  Type,
  Music,
  BookOpen,
} from "lucide-react";
import { AudioSynth } from "../utils/audioSynth";

/**
 * SongDetailScreen Component
 * 
 * Displays the full view of a hymn, including lyrics, details, font-size adjustment,
 * and an interactive synthesizer player.
 * Features:
 * - Back button navigation.
 * - Toggle favorite status within detail view.
 * - Font-size adjustment controls (incremental +/-) for high readability.
 * - Synthesizer player control (play, pause, stop, volume adjustment) running the Web Audio API.
 * - Interactive visualizer overlay showing the current note being played (e.g. Do, Re, Mi) and frequency.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.song - Song detail object.
 * @param {string} props.song.id - Unique ID of the song.
 * @param {number} props.song.number - The hymnal index number.
 * @param {string} props.song.title - The title of the hymn.
 * @param {string} props.song.category - The category of the hymn.
 * @param {string} props.song.lyrics - The full lyric string (newline separated).
 * @param {number} props.song.melodyIndex - The index mapping to the pentatonic scale/hymn pattern.
 * @param {string} [props.song.author] - Optional composer/source.
 * @param {string} [props.song.album] - Optional album information.
 * @param {boolean} props.isFavorite - Flag indicating if this song is a favorite.
 * @param {Function} props.onToggleFavorite - Callback to toggle favorite status.
 * @param {Function} props.onBack - Callback to navigate back to list screen.
 * @param {number} props.fontSize - The current active font size in pixels.
 * @param {Function} props.setFontSize - Setter function for the font size state.
 * @returns {React.ReactElement} The hymn detail screen.
 */
export default function SongDetailScreen({
  song,
  isFavorite,
  onToggleFavorite,
  onBack,
  fontSize,
  setFontSize,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentFreq, setCurrentFreq] = useState(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    return () => {
      AudioSynth.stop();
    };
  }, [song.id]);

  useEffect(() => {
    AudioSynth.setVolume(volume);
  }, [volume]);

  const handlePlayPause = () => {
    if (isPlaying) {
      AudioSynth.stop();
      setIsPlaying(false);
      setCurrentNote(null);
      setCurrentFreq(null);
    } else {
      setIsPlaying(true);
      AudioSynth.play(song.melodyIndex, {
        onNotePlay: (noteName, frequency) => {
          setCurrentNote(noteName);
          setCurrentFreq(Math.round(frequency));
        },
        onTimeUpdate: (current, total) => {
          setCurrentTime(current);
          setDuration(total);
        },
        onEnded: () => {
          setIsPlaying(false);
          setCurrentNote(null);
          setCurrentFreq(null);
          setCurrentTime(0);
        },
      });
    }
  };

  const handleStop = () => {
    AudioSynth.stop();
    setIsPlaying(false);
    setCurrentNote(null);
    setCurrentFreq(null);
    setCurrentTime(0);
  };

  const adjustFontSize = (increment) => {
    const newSize = Math.max(14, Math.min(38, fontSize + increment));
    setFontSize(newSize);
  };

  const lyricStanzas = song.lyrics.split("\n\n");

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="max-w-3xl mx-auto pb-40 space-y-6">
      <div className="flex items-center justify-between">
        <button
          id="detail-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 font-sans text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          ተመለስ
        </button>

        <div className="flex items-center gap-2">
          <button
            id="detail-favorite-toggle"
            onClick={onToggleFavorite}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isFavorite
                ? "border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            <Star
              className="h-4 w-4"
              fill={isFavorite ? "currentColor" : "none"}
            />
            <span>{isFavorite ? "ከተወደዱት አውጣ" : "ወደተወደዱት አክል"}</span>
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 font-sans text-xs font-bold text-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
              መዝሙር #{song.number}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2.5 py-1 font-sans text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              <BookOpen className="h-3.5 w-3.5 text-amber-600" />
              {song.category}
            </span>
          </div>

          <h1 className="font-sans text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 leading-tight">
            {song.title}
          </h1>
        </div>

        {(song.author || song.album) && (
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 font-sans text-xs">
            {song.author && (
              <div>
                <span className="text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider block mb-0.5">
                  ደራሲ / አቀናባሪ
                </span>
                <span className="text-zinc-800 dark:text-zinc-200 font-bold">
                  {song.author}
                </span>
              </div>
            )}
            {song.album && (
              <div>
                <span className="text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider block mb-0.5">
                  አልበም
                </span>
                <span className="text-zinc-800 dark:text-zinc-200 font-bold">
                  {song.album}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-sans text-xs font-bold">
          <Type className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          የፊደል መጠን ማስተካከያ
        </div>

        <div className="flex items-center gap-2">
          <button
            id="font-size-dec"
            onClick={() => adjustFontSize(-2)}
            disabled={fontSize <= 14}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-zinc-200 font-sans text-xs font-bold text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
            title="አንስስ"
          >
            A-
          </button>

          <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300 px-1">
            {fontSize}px
          </span>

          <button
            id="font-size-inc"
            onClick={() => adjustFontSize(2)}
            disabled={fontSize >= 38}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-zinc-200 font-sans text-xs font-bold text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
            title="አልቅስ"
          >
            A+
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900 overflow-hidden relative">
        <div
          className="relative z-10 space-y-8 font-sans text-zinc-900 dark:text-zinc-100 leading-relaxed text-center mx-auto max-w-xl transition-all duration-200"
          style={{ fontSize: `${fontSize}px` }}
        >
          {lyricStanzas.map((stanza, idx) => (
            <div key={idx} className="whitespace-pre-line py-1 font-medium">
              {stanza}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-sm ${isPlaying ? "animate-pulse" : ""}`}
            >
              <Music className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                የመዝሙር ዜማ እያጫወተ ነው
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {isPlaying && currentNote
                  ? `ድምፅ: ${currentNote} (${currentFreq}Hz)`
                  : "የቅዱስ ያሬድ ቤተክርስቲያን ዜማ"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              id="synth-play-pause-btn"
              onClick={handlePlayPause}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 font-sans text-xs font-bold text-white shadow hover:bg-amber-700 transition-colors dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 fill-current" />
                  <span>አቁም</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  <span>ዜማውን አጫውት</span>
                </>
              )}
            </button>

            {isPlaying && (
              <button
                id="synth-stop-btn"
                onClick={handleStop}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 cursor-pointer"
                title="አቁም"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            )}
          </div>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-3 pt-2 border-t border-amber-200/50 dark:border-zinc-800">
            <span className="font-mono text-[11px] font-bold text-amber-800 dark:text-amber-400">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-2 rounded-full bg-amber-200/60 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-amber-600 dark:bg-amber-500 rounded-full transition-all duration-300"
                style={{
                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-amber-800 dark:text-amber-400">
              {formatTime(duration)}
            </span>

            <div className="flex items-center gap-1.5 ml-2">
              <Volume2 className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              <input
                id="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 accent-amber-600 dark:accent-amber-500 cursor-pointer h-1.5 rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
