const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
};

/** Audio is opt-in. A missing/blocked track never blocks the story. */
export class MusicPlayer {
  constructor() {
    this.audio = document.getElementById("background-music");
    this.playButton = document.getElementById("music-play");
    this.toggle = document.getElementById("sound-toggle");
    this.progress = document.getElementById("music-progress");
    this.volume = document.getElementById("music-volume");
    this.status = document.getElementById("music-status");
    this.disc = document.getElementById("galaxy-disc");
    this.enabled = false;
    this.pending = false;
    this.mood = 0.8;
    this.available = true;
    this.abort = new AbortController();
    this.fadeFrame = 0;
    this.audio.volume = 0.35 * this.mood;
    const options = { signal: this.abort.signal };
    this.playButton.addEventListener(
      "click",
      () => this.togglePlayback(),
      options,
    );
    this.toggle.addEventListener("click", () => this.togglePlayback(), options);
    this.volume.addEventListener(
      "input",
      () => this.fadeTo(this.targetVolume(), 180),
      options,
    );
    this.progress.addEventListener(
      "input",
      () => {
        if (Number.isFinite(this.audio.duration))
          this.audio.currentTime =
            (Number(this.progress.value) / 100) * this.audio.duration;
        this.updateProgress();
      },
      options,
    );
    this.audio.addEventListener(
      "loadedmetadata",
      () => {
        document.getElementById("music-duration").textContent = formatTime(
          this.audio.duration,
        );
        this.progress.disabled = !Number.isFinite(this.audio.duration);
        this.updateProgress();
      },
      options,
    );
    this.audio.addEventListener(
      "timeupdate",
      () => this.updateProgress(),
      options,
    );
    this.audio.addEventListener(
      "canplaythrough",
      () => this.ensureSeekable(),
      options,
    );
    this.audio.addEventListener("play", () => this.render(), options);
    this.audio.addEventListener("pause", () => this.render(), options);
    this.audio.addEventListener("error", () => this.unavailable(), options);
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          this.resumeOnVisible = this.enabled && !this.audio.paused;
          this.audio.pause();
          cancelAnimationFrame(this.fadeFrame);
        } else {
          this.audio.volume = this.targetVolume();
          if (this.resumeOnVisible && this.enabled)
            this.audio.play().catch(() => {
              this.enabled = false;
              this.render();
            });
          this.resumeOnVisible = false;
        }
      },
      options,
    );
    if (this.audio.readyState >= 1) {
      document.getElementById("music-duration").textContent = formatTime(
        this.audio.duration,
      );
      this.progress.disabled = false;
    }
    if (this.audio.readyState >= 3) this.ensureSeekable();
    if (this.audio.error) this.unavailable();
    else this.render();
  }

  async togglePlayback() {
    if (!this.available || this.pending) return;
    if (this.enabled) {
      this.enabled = false;
      this.resumeOnVisible = false;
      this.audio.pause();
      this.render();
      return;
    }
    this.pending = true;
    try {
      // Both methods run only from a deliberate play/toggle click.
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext && !this.context) {
        try {
          this.context = new AudioContext();
        } catch {
          /* Sound effects are optional. */
        }
      }
      if (this.context?.state === "suspended")
        this.context.resume().catch(() => {});
      this.enabled = true;
      this.audio.volume = 0;
      await this.audio.play();
      this.fadeTo(this.targetVolume(), 1400);
      this.status.textContent = "A LITTLE MUSIC FOR OUR JOURNEY";
    } catch {
      this.enabled = false;
      if (this.audio.error) this.unavailable();
      else this.status.textContent = "TAP PLAY TO TRY THE MUSIC AGAIN";
    } finally {
      this.pending = false;
      this.render();
    }
  }

  targetVolume() {
    return (Number(this.volume.value) / 100) * this.mood;
  }

  async ensureSeekable() {
    // Simple static servers may not support HTTP byte ranges. A local Blob URL
    // gives the fully downloaded track a seekable timeline on those servers too.
    if (
      this.preparingSeek ||
      this.blobURL ||
      !this.available ||
      !Number.isFinite(this.audio.duration)
    )
      return;
    if (
      this.audio.seekable.length &&
      this.audio.seekable.end(this.audio.seekable.length - 1) >=
        this.audio.duration - 0.1
    )
      return;
    this.preparingSeek = true;
    try {
      const response = await fetch("assets/music.mp3", {
        signal: this.abort.signal,
      });
      if (!response.ok) return;
      const blob = await response.blob();
      if (this.abort.signal.aborted) return;
      const position = this.audio.currentTime;
      const playing = this.enabled && !this.audio.paused;
      this.blobURL = URL.createObjectURL(blob);
      this.audio.addEventListener(
        "loadedmetadata",
        () => {
          this.audio.currentTime = Math.min(position, this.audio.duration || 0);
          if (playing && this.enabled)
            this.audio.play().catch(() => {
              this.enabled = false;
              this.render();
            });
        },
        { once: true, signal: this.abort.signal },
      );
      this.audio.src = this.blobURL;
      this.audio.load();
    } catch {
      /* Native playback remains available when this optional fallback fails. */
    } finally {
      this.preparingSeek = false;
    }
  }

  setMood(mood) {
    this.mood =
      { normal: 0.8, travel: 0.55, letter: 0.38, final: 0.65 }[mood] ?? 0.8;
    this.fadeTo(this.targetVolume(), 1600);
    if (mood === "travel") this.effect("travel");
  }

  fadeTo(target, duration) {
    cancelAnimationFrame(this.fadeFrame);
    if (document.hidden) {
      this.audio.volume = target;
      return;
    }
    const from = this.audio.volume,
      start = performance.now();
    const update = (now) => {
      const t = Math.min(1, (now - start) / duration);
      this.audio.volume = Math.max(
        0,
        Math.min(1, from + (target - from) * (t * (2 - t))),
      );
      if (t < 1) this.fadeFrame = requestAnimationFrame(update);
    };
    this.fadeFrame = requestAnimationFrame(update);
  }

  effect(kind) {
    if (
      !this.enabled ||
      !this.context ||
      this.context.state !== "running" ||
      document.hidden
    )
      return;
    const now = this.context.currentTime;
    const gain = this.context.createGain(),
      oscillator = this.context.createOscillator();
    const settings = {
      click: [660, 480, 0.065, 0.018],
      star: [880, 1320, 0.35, 0.035],
      enter: [392, 784, 0.8, 0.035],
      travel: [196, 523.25, 1.7, 0.025],
    }[kind] || [660, 480, 0.08, 0.015];
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(settings[0], now);
    oscillator.frequency.exponentialRampToValueAtTime(
      settings[1],
      now + settings[2],
    );
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(
      (settings[3] * Number(this.volume.value)) / 100,
      now + 0.015,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, now + settings[2]);
    oscillator.connect(gain);
    gain.connect(this.context.destination);
    oscillator.start(now);
    oscillator.stop(now + settings[2] + 0.03);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  }

  updateProgress() {
    document.getElementById("music-current").textContent = formatTime(
      this.audio.currentTime,
    );
    const duration = this.audio.duration;
    this.progress.value =
      Number.isFinite(duration) && duration > 0
        ? String((this.audio.currentTime / duration) * 100)
        : "0";
    this.progress.setAttribute(
      "aria-valuetext",
      `${formatTime(this.audio.currentTime)} of ${formatTime(duration)}`,
    );
  }

  render() {
    const playing = this.enabled && !this.audio.paused;
    this.playButton.setAttribute(
      "aria-label",
      playing ? "Pause background music" : "Play background music",
    );
    this.playButton.setAttribute("aria-pressed", String(playing));
    this.playButton
      .querySelector("use")
      .setAttribute("href", playing ? "#icon-pause" : "#icon-play");
    this.toggle.setAttribute("aria-pressed", String(playing));
    this.toggle.querySelector("span").textContent = playing
      ? "Sound on"
      : "Sound off";
    this.disc.classList.toggle("playing", playing);
  }

  unavailable() {
    this.available = false;
    this.enabled = false;
    this.audio.pause();
    this.status.textContent = "MUSIC UNAVAILABLE · THE STORY CONTINUES";
    this.playButton.disabled = true;
    this.toggle.disabled = true;
    this.toggle.title =
      "The optional music file could not be loaded. The whole journey still works.";
    this.progress.disabled = true;
    this.volume.disabled = true;
    this.render();
  }

  destroy() {
    this.abort.abort();
    cancelAnimationFrame(this.fadeFrame);
    this.audio.pause();
    if (this.blobURL) URL.revokeObjectURL(this.blobURL);
    this.context?.close().catch(() => {});
  }
}
