/**
 * Web Audio API Traditional Ethiopian Liturgical Organ & Flute Synthesizer
 * 
 * Synthesizes traditional pentatonic scales (Tizita, Anchihoye, Bati, Ambassel, Ge'ez)
 * on the fly. Utilizes dual oscillators (Triangle and Sine waves) with detuning,
 * lowpass filter envelope, and custom ADSR envelope simulation to produce
 * a warm, church-organ style wind instrument sound.
 */

let audioCtx = null;
let masterGain = null;
let isPlaying = false;
let currentTimeoutId = null;
let currentScheduleIndex = 0;
let synthOscillators = [];

/**
 * Traditional Ethiopian pentatonic scale frequencies (mapped to base octaves 4 & 5).
 * Scales in order:
 * - 0: Tizita (Major style) - Peaceful, bright
 * - 1: Anchihoye - Mysterious, liturgical
 * - 2: Bati (Lydian style) - Joyous
 * - 3: Ambassel - Reflective, prayerful
 * - 4: Yared's Ge'ez - Solemn, chant-like
 */
const SCALES = [
  [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25],
  [261.63, 277.18, 349.23, 392.0, 415.3, 523.25, 554.37, 698.46],
  [261.63, 329.63, 392.0, 440.0, 493.88, 523.25, 659.25, 783.99],
  [220.0, 246.94, 293.66, 329.63, 392.0, 440.0, 493.88, 587.33],
  [261.63, 293.66, 349.23, 392.0, 440.0, 523.25, 587.33, 698.46],
];

/** Note name representations for UI visualization */
const NOTE_NAMES = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do+"];

/** Traditional hymn note patterns (indices of notes in the pentatonic scale) */
const HYMN_PATTERNS = [
  [0, 2, 4, 3, 2, 4, 5, 4, 3, 2, 1, 0, 2, 0],
  [0, 1, 3, 4, 3, 4, 6, 5, 4, 3, 1, 0, 1, 0],
  [0, 2, 4, 3, 5, 4, 6, 5, 4, 2, 1, 0, 2, 0],
  [2, 4, 5, 4, 3, 2, 1, 0, 2, 3, 2, 1, 0, 0],
];

export const AudioSynth = {
  init() {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  },

  setVolume(volume) {
    this.init();
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(volume * 0.3, audioCtx.currentTime);
    }
  },

  isPlaying() {
    return isPlaying;
  },

  play(melodyIndex, callbacks) {
    this.init();
    if (isPlaying) {
      this.stop();
    }

    isPlaying = true;
    currentScheduleIndex = 0;
    const scale = SCALES[melodyIndex % SCALES.length];
    const pattern = HYMN_PATTERNS[melodyIndex % HYMN_PATTERNS.length];
    const totalDuration = pattern.length * 1.2;

    const playSequence = () => {
      if (!isPlaying || !audioCtx || !masterGain) return;

      const noteIdxInPattern = currentScheduleIndex % pattern.length;
      const noteScaleIdx = pattern[noteIdxInPattern];
      const freq = scale[noteScaleIdx % scale.length];
      const noteName = NOTE_NAMES[noteScaleIdx % NOTE_NAMES.length];

      this.playNote(freq, 1.0);

      callbacks.onNotePlay(noteName, freq);
      callbacks.onTimeUpdate(currentScheduleIndex * 1.2, totalDuration);

      currentScheduleIndex++;

      if (currentScheduleIndex >= pattern.length) {
        isPlaying = false;
        callbacks.onEnded();
      } else {
        currentTimeoutId = window.setTimeout(playSequence, 1200);
      }
    };

    playSequence();
  },

  playNote(frequency, durationSeconds) {
    if (!audioCtx || !masterGain) return;

    const now = audioCtx.currentTime;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + durationSeconds);

    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(frequency, now);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(frequency * 0.5, now);
    osc2.detune.setValueAtTime(3, now);

    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.5, now + 0.15);
    oscGain.gain.setValueAtTime(0.5, now + durationSeconds - 0.3);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + durationSeconds);
    osc2.stop(now + durationSeconds);

    const trackItem = { osc: osc1, gain: oscGain };
    synthOscillators.push(trackItem);

    setTimeout(
      () => {
        synthOscillators = synthOscillators.filter((item) => item.osc !== osc1);
      },
      durationSeconds * 1000 + 500,
    );
  },

  stop() {
    isPlaying = false;
    if (currentTimeoutId !== null) {
      clearTimeout(currentTimeoutId);
      currentTimeoutId = null;
    }

    synthOscillators.forEach(({ osc, gain }) => {
      try {
        if (audioCtx) {
          gain.gain.cancelScheduledValues(audioCtx.currentTime);
          gain.gain.setValueAtTime(gain.gain.value, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioCtx.currentTime + 0.1,
          );
          setTimeout(() => osc.disconnect(), 150);
        }
      } catch (err) {}
    });
    synthOscillators = [];
  },
};
