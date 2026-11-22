// Web Audio API based Dreamy Music Box & Sound Effects
// Completely self-contained, no external assets required, crystal-clear audio!

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a celestial music box note with warm harmonics and gentle decay
  playCelestaNote(freq: number, time: number, duration: number = 2.2, volume: number = 0.35) {
    if (!this.ctx || !this.musicGain) return;

    // Fundamental sine
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Subtle bell overtone
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, time);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(volume, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(volume * 0.4, time + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    gain2.gain.setValueAtTime(0.001, time);
    gain2.gain.exponentialRampToValueAtTime(volume * 0.22, time + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.6);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(this.musicGain);
    gain2.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration);
    osc2.start(time);
    osc2.stop(time + duration * 0.6);
  }

  // Soft sparkle sound effect
  playSparkle() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const notes = [1046.5, 1318.5, 1567.98, 2093.0, 2637.0]; // C6, E6, G6, C7, E7
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.4);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.45);
    });
  }

  // Soft gift box / gate unlock fanfare
  playUnlock() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    // Dreamy major chords: F4, A4, C5, E5, G5, C6
    const chord = [349.23, 440.0, 523.25, 659.25, 783.99, 1046.5];
    chord.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.001, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.25, now + i * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.1 + 1.2);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 1.25);
    });
  }

  // Candle blowing sound: gentle whoosh + chime
  playBlowCandle() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Pink noise puff
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.18));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.5);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(now);

    // Followed by celebratory fairy chime
    setTimeout(() => {
      this.playSparkle();
    }, 450);
  }

  // Flower bloom bell
  playBloom() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const freqs = [587.33, 880.0, 1174.66]; // D5, A5, D6
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.0);
    });
  }

  // Background Dreamy Birthday & Fairytale Melody Loop
  startMusic() {
    this.init();
    if (this.isPlayingMusic || !this.ctx) return;
    this.isPlayingMusic = true;

    // Melody: Dreamy Fairytale Birthday arrangement in F Major / D Minor
    // Pitch frequencies (Hz)
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46;

    // Array of [note, duration in beats]
    const song: [number, number][] = [
      // "Happy Birthday to you" (Gentle Celesta style)
      [C4, 0.75], [C4, 0.25], [D4, 1.0], [C4, 1.0], [F4, 1.0], [E4, 2.0],
      [C4, 0.75], [C4, 0.25], [D4, 1.0], [C4, 1.0], [G4, 1.0], [F4, 2.0],
      [C4, 0.75], [C4, 0.25], [C5, 1.0], [A4, 1.0], [F4, 1.0], [E4, 1.0], [D4, 2.0],
      [Bb4, 0.75], [Bb4, 0.25], [A4, 1.0], [F4, 1.0], [G4, 1.0], [F4, 2.5],

      // Dreamy Arpeggios & Fairytale Interlude
      [A4, 0.5], [C5, 0.5], [F5, 1.0], [E5, 0.5], [D5, 0.5], [C5, 1.0],
      [D4, 0.5], [F4, 0.5], [Bb4, 1.0], [A4, 0.5], [G4, 0.5], [F4, 1.5],
      [G4, 0.5], [A4, 0.5], [C5, 1.0], [D5, 1.0], [C5, 2.0]
    ];

    const beatDuration = 0.55; // Gentle dreamy tempo

    const playSequence = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      let currentTime = this.ctx.currentTime + 0.05;

      song.forEach(([freq, beats]) => {
        const noteDuration = beats * beatDuration;
        this.playCelestaNote(freq, currentTime, noteDuration * 1.5, 0.28);
        
        // Add subtle warm bass root note on major phrases
        if (beats >= 1.5) {
          this.playCelestaNote(freq / 2, currentTime, noteDuration * 1.8, 0.18);
        }

        currentTime += noteDuration;
      });

      const totalTime = song.reduce((acc, [, beats]) => acc + beats * beatDuration, 0);
      this.musicInterval = window.setTimeout(playSequence, totalTime * 1000);
    };

    playSequence();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }
}

export const sound = new SoundSystem();
