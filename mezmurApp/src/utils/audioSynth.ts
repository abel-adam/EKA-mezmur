/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A high-craftsmanship Web Audio API Liturgical Organ & Flute Synthesizer.
// Synthesizes authentic Ethiopian-inspired traditional pentatonic church scales (Tizita, Anchihoye, Bati, Ambassel).

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isPlaying = false;
let currentTimeoutId: number | null = null;
let currentScheduleIndex = 0;
let synthOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];

// Ethiopian traditional scales frequencies (base octave 4/5)
const SCALES = [
  // Tizita (Major) - Peaceful, bright
  [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25], // C4, D4, E4, G4, A4, C5, D5, E5
  // Anchihoye - Mysterious, liturgical
  [261.63, 277.18, 349.23, 392.0, 415.3, 523.25, 554.37, 698.46], // C4, C#4, F4, G4, G#4, C5, C#5, F5
  // Bati (Major/Lydian style) - Joyous
  [261.63, 329.63, 392.0, 440.0, 493.88, 523.25, 659.25, 783.99], // C4, E4, G4, A4, B4, C5, E5, G5
  // Ambassel - Reflective, prayerful
  [220.0, 246.94, 293.66, 329.63, 392.0, 440.0, 493.88, 587.33], // A3, B3, D4, E4, G4, A4, B4, D5
  // Yared's Ge'ez - Solemn, chant-like
  [261.63, 293.66, 349.23, 392.0, 440.0, 523.25, 587.33, 698.46], // C4, D4, F4, G4, A4, C5, D5, F5
];

// Note name translations for the UI visualizer
const NOTE_NAMES = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do+"];

// Beautiful traditional hymn sequence (pattern of indices in the scale)
const HYMN_PATTERNS = [
  [0, 2, 4, 3, 2, 4, 5, 4, 3, 2, 1, 0, 2, 0],
  [0, 1, 3, 4, 3, 4, 6, 5, 4, 3, 1, 0, 1, 0],
  [0, 1, 2, 4, 3, 4, 2, 1, 2, 4, 5, 4, 2, 0],
  [2, 4, 5, 4, 3, 2, 1, 0, 2, 3, 2, 1, 0, 0],
];

interface PlaybackCallbacks {
  onNotePlay: (noteName: string, frequency: number) => void;
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onEnded: () => void;
}

export const AudioSynth = {
  init() {
    if (!audioCtx) {
      // Create audio context (compatible with older browsers)
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AudioContextClass();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.2, audioCtx.currentTime); // default comfortable volume
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  },

  setVolume(volume: number) {
    this.init();
    if (masterGain && audioCtx) {
      // Smooth volume transition
      masterGain.gain.setValueAtTime(volume * 0.3, audioCtx.currentTime);
    }
  },

  isPlaying() {
    return isPlaying;
  },

  play(melodyIndex: number, callbacks: PlaybackCallbacks) {
    this.init();
    if (isPlaying) {
      this.stop();
    }

    isPlaying = true;
    currentScheduleIndex = 0;
    const scale = SCALES[melodyIndex % SCALES.length];
    const pattern = HYMN_PATTERNS[melodyIndex % HYMN_PATTERNS.length];
    const totalDuration = pattern.length * 1.2; // approx 1.2s per note

    const playSequence = () => {
      if (!isPlaying || !audioCtx || !masterGain) return;

      const noteIdxInPattern = currentScheduleIndex % pattern.length;
      const noteScaleIdx = pattern[noteIdxInPattern];
      const freq = scale[noteScaleIdx % scale.length];
      const noteName = NOTE_NAMES[noteScaleIdx % NOTE_NAMES.length];

      // Play note
      this.playNote(freq, 1.0);

      // Trigger callbacks
      callbacks.onNotePlay(noteName, freq);
      callbacks.onTimeUpdate(currentScheduleIndex * 1.2, totalDuration);

      currentScheduleIndex++;

      if (currentScheduleIndex >= pattern.length) {
        // Finished playing the hymn sequence
        isPlaying = false;
        callbacks.onEnded();
      } else {
        // Schedule next note
        currentTimeoutId = window.setTimeout(playSequence, 1200);
      }
    };

    playSequence();
  },

  playNote(frequency: number, durationSeconds: number) {
    if (!audioCtx || !masterGain) return;

    const now = audioCtx.currentTime;

    // Create twin oscillators for a beautiful rich church organ/flute effect
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();

    // Soft low-pass filter to sound warm and spiritual
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + durationSeconds);

    // Osc 1: Warm Triangle wave (church organ flute base)
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(frequency, now);

    // Osc 2: Sub-octave or gentle sine to add warmth (slightly detuned by 3 cents)
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(frequency * 0.5, now);
    osc2.detune.setValueAtTime(3, now);

    // Envelope generator
    oscGain.gain.setValueAtTime(0, now);
    // Smooth attack to avoid clicking, sounding like a blown flute/organ
    oscGain.gain.linearRampToValueAtTime(0.5, now + 0.15);
    // Sustain
    oscGain.gain.setValueAtTime(0.5, now + durationSeconds - 0.3);
    // Exponential decay/release
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

    // Connect nodes
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + durationSeconds);
    osc2.stop(now + durationSeconds);

    // Track active oscillators so we can kill them instantly if stopped
    const trackItem = { osc: osc1, gain: oscGain };
    synthOscillators.push(trackItem);

    // Clean up track item
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

    // Stop all ringing oscillators smoothly
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
      } catch (err) {
        // Node might already be disposed
      }
    });
    synthOscillators = [];
  },
};
