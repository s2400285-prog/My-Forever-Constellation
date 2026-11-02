export const JOURNEY_DURATION = 10_000;

export const journeys = [
  {
    kind: "wormhole",
    name: "THE VIOLET WORMHOLE",
    color: [163, 105, 240],
    phrases: [
      "Every universe has a beginning...",
      "But mine became brighter when you arrived...",
      "Ready to discover another part of my heart?",
    ],
  },
  {
    kind: "nebula",
    name: "THE PINK NEBULA TUNNEL",
    color: [255, 139, 213],
    phrases: [
      "Some memories become stars...",
      "Some moments become planets...",
      "And some people become our favorite universe.",
    ],
  },
  {
    kind: "shooting",
    name: "A SHOOTING STAR JOURNEY",
    color: [185, 173, 255],
    phrases: [
      "If I had a thousand reasons...",
      "I would still find a thousand more...",
      "Because every reason leads me back to you.",
    ],
  },
  {
    kind: "moonlight",
    name: "THE MOONLIGHT PORTAL",
    color: [174, 212, 255],
    phrases: [
      "Even the brightest stars have imperfect moments...",
      "Even the moon has its shadows...",
      "But genuine love keeps learning to shine.",
    ],
  },
  {
    kind: "golden",
    name: "THE GOLDEN GALAXY PORTAL",
    color: [244, 205, 139],
    phrases: [
      "Every journey deserves a beautiful ending...",
      "But some stories are meant to continue...",
      "Welcome to the universe of my forever.",
    ],
  },
];

/** One deadline owns each journey. Skipping and normal completion share a guarded finish. */
export class TransitionController {
  constructor({ onStart, onArrive }) {
    this.overlay = document.getElementById("transition-overlay");
    this.shell = document.getElementById("app-shell");
    this.canvas = document.getElementById("transition-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.skip = document.getElementById("transition-skip");
    this.phrase = document.getElementById("transition-phrase");
    this.countdown = document.getElementById("transition-countdown");
    this.progress = document.getElementById("transition-progress");
    this.onStart = onStart;
    this.onArrive = onArrive;
    this.active = false;
    this.motion = matchMedia("(prefers-reduced-motion: reduce)");
    this.abort = new AbortController();
    const options = { signal: this.abort.signal };
    this.skip.addEventListener("click", () => this.finish(true), options);
    document.addEventListener(
      "keydown",
      (event) => {
        if (!this.active) return;
        if (event.key === "Tab") {
          event.preventDefault();
          this.skip.focus();
        }
        if (event.key === "Escape") this.finish(true);
      },
      options,
    );
    document.addEventListener(
      "visibilitychange",
      () => {
        if (!this.active) return;
        cancelAnimationFrame(this.frame);
        if (!document.hidden) this.tick(performance.now());
      },
      options,
    );
    window.addEventListener(
      "resize",
      () => {
        if (this.active) this.resize();
      },
      options,
    );
  }

  travel(from, to) {
    if (this.active || from === to || to < 0 || to > 5) return false;
    this.active = true;
    this.from = from;
    this.to = to;
    this.journey = journeys[Math.min(from, 4)];
    this.start = performance.now();
    this.lastPhrase = -1;
    this.previousOverflow = document.body.style.overflow;
    this.shell.inert = true;
    document.body.style.overflow = "hidden";
    this.overlay.dataset.kind = this.journey.kind;
    this.overlay.dataset.phase = "darken";
    this.overlay.style.setProperty("--portal-open", "0");
    this.overlay.style.setProperty("--portal-zoom", "1");
    document.getElementById("transition-title").textContent = this.journey.name;
    this.phrase.textContent =
      this.journey.kind === "wormhole"
        ? "A little journey into my heart..."
        : this.journey.phrases[0];
    this.countdown.textContent = "10";
    this.progress.style.width = "0%";
    this.overlay.hidden = false;
    this.skip.focus({ preventScroll: true });
    this.resize();
    this.stars = Array.from({ length: this.motion.matches ? 45 : 170 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random(),
      size: Math.random() * 1.7 + 0.4,
      offset: Math.random(),
    }));
    this.onStart?.();
    // The deadline is independent of rendering, so a slow frame never adds a second timer.
    this.deadline = setTimeout(() => this.finish(false), JOURNEY_DURATION);
    this.tick(this.start);
    return true;
  }

  resize() {
    this.width = innerWidth;
    this.height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  tick(now) {
    if (!this.active) return;
    const elapsed = Math.min(now - this.start, JOURNEY_DURATION);
    const t = elapsed / JOURNEY_DURATION;
    this.countdown.textContent = String(
      Math.max(0, Math.ceil((JOURNEY_DURATION - elapsed) / 1000)),
    );
    this.progress.style.width = `${t * 100}%`;
    const phases = ["darken", "open", "orbit", "zoom", "phrases"];
    this.overlay.dataset.phase =
      phases[Math.min(4, Math.floor(elapsed / 2000))];
    this.overlay.style.setProperty(
      "--portal-open",
      this.motion.matches
        ? ".2"
        : String(Math.max(0, Math.min(1, (elapsed - 2000) / 2000))),
    );
    this.overlay.style.setProperty(
      "--portal-zoom",
      this.motion.matches
        ? "1"
        : String(1 + Math.max(0, elapsed - 6000) / 1600),
    );
    this.overlay.style.setProperty("--portal-opacity", String(0.12 + t * 0.6));
    // The wormhole reserves 0–8 seconds for its cinematic sequence; its three phrases
    // appear one at a time during 8–10 seconds. Other journeys use three full acts.
    const phraseIndex =
      this.journey.kind === "wormhole"
        ? elapsed < 8000
          ? -1
          : Math.min(2, Math.floor((elapsed - 8000) / (2000 / 3)))
        : Math.min(2, Math.floor(elapsed / (JOURNEY_DURATION / 3)));
    if (phraseIndex !== this.lastPhrase) {
      this.lastPhrase = phraseIndex;
      this.phrase.textContent =
        phraseIndex < 0
          ? "A little journey into my heart..."
          : this.journey.phrases[phraseIndex];
      this.phrase.classList.remove("phrase-arriving");
      void this.phrase.offsetWidth;
      this.phrase.classList.add("phrase-arriving");
    }
    this.draw(elapsed);
    if (elapsed >= JOURNEY_DURATION) {
      this.finish(false);
      return;
    }
    if (!document.hidden)
      this.frame = requestAnimationFrame((time) => this.tick(time));
  }

  draw(elapsed) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.width,
      h = this.height;
    ctx.clearRect(0, 0, w, h);
    const [r, g, b] = this.journey.color;
    const still = this.motion.matches;
    const seconds = still ? 0 : elapsed / 1000;
    const strength = still ? 0.18 : Math.min(1, elapsed / 4000);
    const radius = Math.hypot(w, h) * 0.6;
    const glow = ctx.createRadialGradient(
      w / 2,
      h / 2,
      5,
      w / 2,
      h / 2,
      radius * 0.6,
    );
    glow.addColorStop(0, `rgba(${r},${g},${b},${strength * 0.12})`);
    glow.addColorStop(0.4, `rgba(${r},${g},${b},${strength * 0.045})`);
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    for (const star of this.stars) {
      const speed = this.journey.kind === "nebula" ? 0.36 : 0.18;
      const depth = (star.radius + seconds * speed) % 1;
      let angle =
        star.angle +
        (this.journey.kind === "wormhole"
          ? seconds * (0.13 + seconds * 0.015)
          : seconds * 0.04);
      let x = w / 2 + Math.cos(angle) * depth * radius;
      let y = h / 2 + Math.sin(angle) * depth * radius;
      ctx.strokeStyle = `rgba(${r},${g},${b},${depth * 0.65})`;
      ctx.fillStyle = `rgba(${r},${g},${b},${0.2 + depth * 0.65})`;
      if (this.journey.kind === "shooting" && !still) {
        x = ((star.offset * w + seconds * 250) % (w + 250)) - 100;
        y = ((star.radius * h + seconds * 160) % (h + 150)) - 75;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 65 * depth, y - 42 * depth);
        ctx.stroke();
      } else if (
        (this.journey.kind === "wormhole" || this.journey.kind === "nebula") &&
        !still
      ) {
        const trail =
          this.journey.kind === "nebula"
            ? 1 - depth * 0.15
            : 1 - Math.max(0, seconds - 4) * 0.02;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(w / 2 + (x - w / 2) * trail, h / 2 + (y - h / 2) * trail);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(
          x,
          y,
          star.size * (this.journey.kind === "golden" ? 1.3 : 1),
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      // Small orbiting rocks during the wormhole's 4–6 second acceleration.
      if (
        this.journey.kind === "wormhole" &&
        star.offset > 0.965 &&
        elapsed >= 4000 &&
        elapsed < 8000 &&
        !still
      ) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * 3);
        ctx.fillStyle = "#5d4772";
        ctx.fillRect(-5, -3, 10, 7);
        ctx.restore();
      }
    }
  }

  finish(skipped) {
    if (!this.active) return;
    this.active = false;
    clearTimeout(this.deadline);
    cancelAnimationFrame(this.frame);
    const elapsed = performance.now() - this.start;
    this.overlay.hidden = true;
    this.shell.inert = false;
    document.body.style.overflow = this.previousOverflow;
    this.ctx?.clearRect(0, 0, this.width, this.height);
    this.stars = [];
    this.onArrive?.(this.to);
    document.dispatchEvent(
      new CustomEvent("journeyend", {
        detail: {
          from: this.from,
          to: this.to,
          skipped,
          elapsed,
          duration: JOURNEY_DURATION,
        },
      }),
    );
  }

  destroy() {
    clearTimeout(this.deadline);
    cancelAnimationFrame(this.frame);
    this.active = false;
    this.shell.inert = false;
    document.body.style.overflow = this.previousOverflow || "";
    this.abort.abort();
  }
}
