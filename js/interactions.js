import { memories, reasons, constellation } from "./universe.js";

const dialog = () => document.getElementById("secret-dialog");
let toastTimer;
const activeParticles = new Set();
const motion = matchMedia("(prefers-reduced-motion: reduce)");

export function showToast(message) {
  const toast = document.getElementById("toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 4200);
}

export function showMessage(
  title,
  message,
  { eyebrow = "A LITTLE PIECE OF MY HEART", image, date } = {},
) {
  const modal = dialog();
  document.getElementById("dialog-title").textContent = title;
  document.getElementById("dialog-eyebrow").textContent = eyebrow;
  const body = document.getElementById("dialog-message");
  body.replaceChildren(
    ...message.split("\n\n").map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    }),
  );
  const photo = document.getElementById("dialog-image");
  photo.hidden = !image;
  photo.style.backgroundImage = image ? `url("${image}")` : "";
  if (image)
    photo.setAttribute(
      "aria-label",
      `A replaceable photograph space for ${title}`,
    );
  else photo.removeAttribute("aria-label");
  const dateElement = document.getElementById("dialog-date");
  dateElement.hidden = !date;
  dateElement.textContent = date || "";
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
}

/** Web animations are capped, removed on completion, and omitted for reduced motion. */
export function burst(x, y, count = 18, palette = "pink") {
  if (motion.matches || document.hidden) return;
  const layer = document.getElementById("particle-layer");
  const available = Math.max(0, 85 - activeParticles.size);
  for (let i = 0; i < Math.min(count, available); i++) {
    const particle = document.createElement("span");
    particle.className = "burst-particle";
    particle.textContent = i % 5 === 0 ? "♡" : i % 3 === 0 ? "✧" : "·";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty(
      "--particle-color",
      palette === "gold"
        ? ["#f4d5a0", "#fff0cd", "#edb9d1"][i % 3]
        : ["#efa9d7", "#c0a2f6", "#f8dbef"][i % 3],
    );
    particle.style.setProperty(
      "--particle-size",
      `${8 + Math.random() * 13}px`,
    );
    layer.append(particle);
    const angle = Math.random() * Math.PI * 2,
      distance = 40 + Math.random() * 170;
    const animation = particle.animate(
      [
        { opacity: 0, transform: "translate(0,0) scale(.2)" },
        { opacity: 1, offset: 0.15 },
        {
          opacity: 0,
          transform: `translate(${Math.cos(angle) * distance}px,${Math.sin(angle) * distance - 40}px) rotate(${Math.random() * 90}deg) scale(.5)`,
        },
      ],
      {
        duration: 1100 + Math.random() * 900,
        easing: "cubic-bezier(.15,.6,.25,1)",
      },
    );
    const item = { particle, animation };
    activeParticles.add(item);
    const remove = () => {
      particle.remove();
      activeParticles.delete(item);
    };
    animation.onfinish = remove;
    animation.oncancel = remove;
  }
}

const secrets = {
  little: [
    "A Little Secret for You.",
    "I made this universe hoping that, somewhere between the stars and these words, you would feel how much you matter to me.\n\nAnd the secret? No matter how carefully I place every planet, my favorite part will always be the girl looking at them. You, my baby Julie.",
  ],
  planet: [
    "The center of my little universe.",
    "I cannot give you a real planet, baby. But I can give you a place in my life where your thoughts are heard, your dreams are welcomed, and your presence is never treated as ordinary.\n\nEven in a sky full of wonders, you are the one I would look for.",
  ],
  shooting: [
    "A wish I keep making.",
    "If this shooting star could carry a wish, mine would be simple: more time with you, more reasons for your smile, and the patience to love you in the ways that make you feel cared for.",
  ],
  heart: [
    "You found my heart.",
    "I tried hiding it among the constellations. It was not very good at staying hidden, because every line of it kept spelling your name.\n\nMy confession: being grateful for you has become one of my favorite daily habits.",
  ],
  asteroid: [
    "A tiny heart behind a little rock.",
    "Even the quiet, slightly awkward corners of my universe have something soft waiting for you. Just like me, baby: sometimes clumsy with my words, always hoping to make you feel cherished.",
  ],
  miss: [
    "Do you know how much I miss you?",
    "Enough that even this enormous universe feels a little too quiet without you. I miss the sound of your voice, your smile, and the little happiness of spending time with you.\n\nI am excited for the next time we get to be together. No grand plan required. Just a little time, your company, and maybe an excuse to sit a little closer. ♡",
  ],
  forgive: [
    "Thank you for reading my heart.",
    "Thank you for taking the time to read my heart. You don't have to rush anything. I just want you to know that I am sincerely trying to become better.",
  ],
  hiding: [
    "What my heart has been hiding.",
    "I miss you a little more than I know how to say, and I get quietly excited just imagining more time with you. My heart has a very obvious favorite person.\n\nIf you catch me smiling for no reason, baby, there is a fairly good chance the reason is you. I hope I get to tell you that in person, with my full attention and a very happy heart.",
  ],
  moon: [
    "A moonlit confession.",
    "Even on nights when I am not sure how to put everything into words, I hope you know this: I am thinking of you with tenderness, and I am learning that caring means listening, too.\n\nAlso, the moon and I agree. You look very good in the role of my favorite person.",
  ],
  all: [
    "You visited every part of my heart.",
    "You found all five universes, baby. The secret they have been keeping is this: I did not need a thousand galaxies to know what I wanted to say.\n\nThank you for existing. Thank you for letting me know you. I hope I can keep earning your trust through patience, kindness, and the ordinary choices that make love feel safe.\n\nEvery little universe led here. To gratitude. To hope. To you.",
  ],
};

const randomNotes = [
  "Somewhere in my day, there is always a little thought of you. ♡",
  "You are my favorite reason to look up at the stars and say thank you.",
  "Baby, your smile should come with a warning: very strong gravitational pull.",
  "One ordinary day with you sounds like a very beautiful adventure.",
  "I hope something makes you smile today. If this did, I am keeping that little victory.",
  "A reminder from this tiny universe: your feelings matter. Your dreams matter. You matter.",
  "You are the only gravity I never want to escape.",
  "I would choose a little time with you over a whole sky of wishes.",
  "I am sending you a pocket-sized galaxy and one very gentle forehead kiss.",
  "No matter how full the sky gets, there is only one Julie.",
];

export class Interactions {
  constructor({ getCurrent, hasVisitedAll, openMoon, openEnvelope, music }) {
    this.getCurrent = getCurrent;
    this.hasVisitedAll = hasVisitedAll;
    this.openMoon = openMoon;
    this.openEnvelope = openEnvelope;
    this.music = music;
    this.discovered = new Set();
    this.lastNote = -1;
    this.abort = new AbortController();
    const options = { signal: this.abort.signal };
    document.addEventListener(
      "click",
      (event) => this.handleClick(event),
      options,
    );
    document.addEventListener(
      "dblclick",
      (event) => {
        if (event.target.closest("[data-moon]")) {
          clearTimeout(this.moonClick);
          this.secret("moon");
        }
      },
      options,
    );
    document
      .getElementById("dialog-close")
      .addEventListener("click", () => this.closeDialog(), options);
    dialog().addEventListener(
      "click",
      (event) => {
        if (event.target !== dialog()) return;
        const rect = dialog().getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          this.closeDialog();
      },
      options,
    );
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) this.clearParticles();
      },
      options,
    );
  }

  handleClick(event) {
    const button = event.target.closest("button");
    if (!button || button.disabled) return;
    if (
      button.dataset.reason !== undefined ||
      button.dataset.constellation !== undefined
    )
      this.music.effect("star");
    else if (!button.closest(".music-player") && button.id !== "sound-toggle")
      this.music.effect("click");
    const rect = button.getBoundingClientRect();
    const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
    const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
    if (button.hasAttribute("data-julie")) {
      burst(x, y, 35);
      showToast("Julie. My favorite name in every universe. ♡");
    } else if (button.dataset.secret) {
      this.secret(button.dataset.secret);
      burst(x, y, 15);
    } else if (button.dataset.memory !== undefined) {
      const memory = memories[Number(button.dataset.memory)];
      if (!memory) return;
      showMessage(memory.title, memory.description, {
        eyebrow: "A MEMORY WITH ITS OWN LITTLE ORBIT",
        image: memory.image,
        date: memory.date,
      });
      burst(x, y, 15);
    } else if (button.dataset.reason !== undefined) {
      this.revealReason(Number(button.dataset.reason), x, y);
    } else if (button.dataset.constellation !== undefined) {
      this.revealConstellation(Number(button.dataset.constellation), x, y);
    } else if (button.hasAttribute("data-moon")) {
      clearTimeout(this.moonClick);
      if (event.detail === 0) this.openMoon();
      else this.moonClick = setTimeout(() => this.openMoon(), 260);
    } else if (button.hasAttribute("data-envelope")) {
      this.openEnvelope(button);
    } else if (button.id === "random-note") {
      let next = Math.floor(Math.random() * randomNotes.length);
      if (next === this.lastNote) next = (next + 1) % randomNotes.length;
      this.lastNote = next;
      showMessage("A little note found you.", randomNotes[next]);
      burst(x, y, 15);
    } else if (button.hasAttribute("data-surprise")) {
      burst(innerWidth / 2, innerHeight / 2, 75, "gold");
      showMessage(
        "Meet me in our next little adventure.",
        "The surprise is not another universe, baby. It is a little invitation.\n\nWhen you feel like it, tell me one place you would love to go, one thing you would love us to try, or one ordinary afternoon you would like us to share. I would love to plan something thoughtful with you.\n\nUntil then: one imaginary forehead kiss, a pocket full of stars, and all my love.\n\nP.S. You are still my favorite view. — Traigo 💗",
        { eyebrow: "ONE LAST LITTLE SURPRISE" },
      );
    }
  }

  secret(key) {
    if (key === "all" && !this.hasVisitedAll()) {
      showToast(
        "There is a little secret waiting after you visit all five universes. ♡",
      );
      return;
    }
    const entry = secrets[key];
    if (entry) showMessage(entry[0], entry[1]);
  }

  revealReason(index, x, y) {
    const reason = reasons[index];
    if (!reason) return;
    this.discovered.add(index);
    this.restoreDiscoveries();
    const reveal = document.getElementById("reason-reveal");
    if (reveal) {
      reveal.querySelector(".reason-message").textContent = reason[0];
      reveal.querySelector(".reason-detail").textContent = reason[1];
      reveal.classList.remove("revealed");
      void reveal.offsetWidth;
      reveal.classList.add("revealed");
      if (innerWidth < 600)
        reveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else
      showMessage(reason[0], reason[1], {
        eyebrow: `REASON ${String(index + 1).padStart(2, "0")} · JUST THE BEGINNING`,
      });
    burst(x, y, 18);
    if (this.discovered.size === 20)
      showToast("Twenty stars found. And I am still finding more reasons. ♡");
  }

  revealConstellation(index, x, y) {
    const node = constellation[index];
    if (!node) return;
    const note = document.getElementById("constellation-note");
    if (note) {
      note.textContent = node.text;
      note.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else
      showMessage(node.label, node.text, {
        eyebrow: "OUR CONSTELLATION · A HOPE I HOLD CLOSE",
      });
    burst(x, y, 16, "gold");
  }

  restoreDiscoveries() {
    const count = document.getElementById("reason-count");
    if (count) count.textContent = String(this.discovered.size);
    document.querySelectorAll("[data-reason]").forEach((star) => {
      const found = this.discovered.has(Number(star.dataset.reason));
      star.classList.toggle("discovered", found);
      star.setAttribute("aria-pressed", String(found));
    });
  }

  closeDialog() {
    clearTimeout(this.moonClick);
    if (dialog().open) dialog().close();
  }
  clearParticles() {
    for (const item of [...activeParticles]) item.animation.cancel();
  }
  destroy() {
    this.abort.abort();
    this.clearParticles();
    clearTimeout(toastTimer);
    this.closeDialog();
  }
}
