import {
  universes,
  renderHero,
  renderDiscovery,
  SpaceRenderer,
} from "./universe.js";
import { letters, LetterWriter } from "./letters.js";
import { TransitionController } from "./transitions.js";
import { Interactions, burst, showToast } from "./interactions.js";
import { MusicPlayer } from "./music.js";

const $ = (id) => document.getElementById(id);
const state = { current: 0, visited: new Set([0]), entered: false };
const music = new MusicPlayer();
const space = new SpaceRenderer($("space-canvas"));
const writer = new LetterWriter($("letter-body"), $("typing-skip"));
let arrivalTimer;
let endSurpriseTimer;

const transitions = new TransitionController({
  onStart() {
    document.querySelectorAll("[data-nav]").forEach((button) => {
      button.disabled = true;
    });
    music.setMood("travel");
  },
  onArrive(destination) {
    showUniverse(destination);
    music.setMood(destination === 5 ? "final" : "normal");
  },
});

const interactions = new Interactions({
  getCurrent: () => state.current,
  hasVisitedAll: () => [0, 1, 2, 3, 4].every((id) => state.visited.has(id)),
  openMoon: revealMoon,
  openEnvelope,
  music,
});

function renderNavigation() {
  $("chapter-stops").replaceChildren(
    ...universes.map((universe, index) => {
      const button = document.createElement("button");
      button.className = `chapter-stop${index === state.current ? " current" : ""}`;
      button.dataset.nav = String(index);
      button.disabled = !state.visited.has(index);
      if (index === state.current) button.setAttribute("aria-current", "step");
      const number = document.createElement("span");
      number.className = "stop-number";
      number.textContent = String(index + 1).padStart(2, "0");
      const name = document.createElement("span");
      name.textContent = universe.shortName;
      button.append(number, name);
      if (button.disabled) {
        button.setAttribute(
          "aria-label",
          `${universe.shortName}. Discover this chapter as you continue the journey.`,
        );
        const lock = document.createElement("span");
        lock.className = "lock-icon";
        lock.setAttribute("aria-hidden", "true");
        lock.textContent = "·";
        button.append(lock);
      }
      return button;
    }),
  );
}

function renderLetter({ typed = false } = {}) {
  const letter = letters[state.current];
  $("letter-title").textContent = letter.title;
  $("letter-number").textContent =
    state.current === 5
      ? "THE LAST LETTER · AN ENDLESS LOVE"
      : `LETTER NO. ${String(state.current + 1).padStart(2, "0")}`;
  $("letter-signature").hidden = state.current === 5;
  $("letter-actions").replaceChildren();
  $("letter-section").hidden = false;
  writer.write(letter.blocks, {
    typed,
    onComplete: () => {
      if (state.current === 5) addFinalSurprise();
    },
  });
  if (state.current === 0)
    addLetterButton("A Little Secret for You.", "little");
  if (state.current === 3) addLetterButton("Forgive Me? 💗", "forgive");
  if (state.current === 4)
    addLetterButton("See What My Heart Has Been Hiding.", "hiding");
}

function addLetterButton(label, secret) {
  const button = document.createElement("button");
  button.className = "outline-button";
  button.dataset.secret = secret;
  button.textContent = label;
  $("letter-actions").append(button);
}

function addFinalSurprise() {
  if ($("final-surprise")) return;
  const closing = document.createElement("p");
  closing.className = "final-words";
  closing.textContent =
    "THE END OF THIS UNIVERSE, BUT NEVER THE END OF MY LOVE.";
  const wrap = document.createElement("div");
  wrap.className = "final-surprise-wrap";
  const button = document.createElement("button");
  button.className = "primary-button";
  button.id = "final-surprise";
  button.dataset.surprise = "";
  button.textContent = "One last thing, my baby Julie. ♡";
  wrap.append(button);
  $("letter-actions").append(closing, wrap);
  if ([0, 1, 2, 3, 4].every((id) => state.visited.has(id))) {
    const secret = document.createElement("button");
    secret.className = "text-button";
    secret.dataset.secret = "all";
    secret.textContent =
      "✧ You found every part of my heart. Open your secret.";
    $("letter-actions").append(secret);
  }
}

function showUniverse(index, { initial = false } = {}) {
  writer.cancel();
  document.body.classList.remove("entering");
  clearTimeout(arrivalTimer);
  clearTimeout(endSurpriseTimer);
  interactions.closeDialog();
  state.current = index;
  state.visited.add(index);
  const universe = universes[index];
  document.body.dataset.universe = String(index);
  document.title = `${universe.pageTitle} · A Universe Made for Julie`;
  $("chapter-label").textContent =
    index === 5
      ? "THE FINAL UNIVERSE"
      : `UNIVERSE ${String(index + 1).padStart(2, "0")}`;
  $("chapter-name").textContent = universe.chapter;
  $("universe-title").innerHTML = universe.heading;
  $("hero-description").textContent = universe.description;
  $("hero-action").innerHTML =
    `<span>${universe.action}</span><svg class="icon" aria-hidden="true"><use href="#icon-${index === 0 ? "heart" : "arrow"}"/></svg>${index === 0 ? '<span class="button-divider"></span><svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg>' : ""}`;
  $("hero-footnote").innerHTML =
    `<span class="mini-star" aria-hidden="true">✧</span> ${universe.footnote}`;
  $("hero-art").innerHTML = renderHero(index);
  $("discovery-title").textContent = universe.discoveryTitle || "";
  $("discovery-eyebrow").textContent = universe.discoveryEyebrow || "";
  $("discovery-description").textContent = universe.discoveryDescription || "";
  $("interactive-scene").innerHTML = renderDiscovery(index);
  $("discovery").hidden = index === 0 || index === 3;
  $("letter-section").hidden = true;
  $("letter-body").replaceChildren();
  $("letter-actions").replaceChildren();
  const ungatedLetter =
    index === 1 || index === 2 || index === 4 || (index === 0 && state.entered);
  if (ungatedLetter) renderLetter();
  $("next-section").hidden = index === 5 || (index === 0 && !state.entered);
  $("next-title").textContent =
    index === 4
      ? "One more infinity, just for you."
      : "Shall we keep exploring?";
  $("next-universe").querySelector("span").textContent =
    index === 4 ? "The final universe" : "Next universe";
  $("next-universe").disabled = false;
  renderNavigation();
  interactions.restoreDiscoveries();
  space.setUniverse(index);
  document.body.classList.remove("chapter-arriving");
  // Restart one arrival animation without retaining animation listeners.
  void $("hero-art").offsetWidth;
  document.body.classList.add("chapter-arriving");
  arrivalTimer = setTimeout(
    () => document.body.classList.remove("chapter-arriving"),
    1600,
  );
  if (!initial) {
    window.scrollTo({ top: 0, behavior: "instant" });
    $("universe-title").focus({ preventScroll: true });
    showToast(
      index === 5
        ? "Welcome to the universe of my forever. ♡"
        : `You arrived in universe ${index + 1}. A little more of my heart awaits.`,
    );
  }
  document.dispatchEvent(
    new CustomEvent("universechange", {
      detail: { index, visited: [...state.visited] },
    }),
  );
}

function enterUniverse() {
  if (state.entered) {
    $("letter-section").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  state.entered = true;
  document.body.classList.add("entering");
  const bounds = $("hero-art").getBoundingClientRect();
  burst(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2, 55);
  music.effect("enter");
  renderLetter();
  $("next-section").hidden = false;
  $("hero-action").querySelector("span").textContent = "READ MY FIRST LETTER";
  $("letter-section").scrollIntoView({ behavior: "smooth", block: "start" });
  clearTimeout(endSurpriseTimer);
  endSurpriseTimer = setTimeout(
    () => document.body.classList.remove("entering"),
    1500,
  );
}

function revealMoon() {
  if (state.current !== 3) return;
  const wasHidden = $("discovery").hidden;
  $("discovery").hidden = false;
  if (wasHidden) music.effect("star");
  $("discovery").scrollIntoView({ behavior: "smooth", block: "center" });
  const envelope = $("interactive-scene").querySelector("[data-envelope]");
  if (envelope) envelope.focus({ preventScroll: true });
}

function openEnvelope(button) {
  if (state.current !== 3 && state.current !== 5) return;
  button?.classList.add("opened");
  button?.setAttribute("aria-expanded", "true");
  if (!$("letter-section").hidden) {
    $("letter-section").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const bounds = (button || $("hero-art")).getBoundingClientRect();
  burst(
    bounds.left + bounds.width / 2,
    bounds.top + bounds.height / 2,
    45,
    state.current === 5 ? "gold" : "pink",
  );
  music.setMood("letter");
  music.effect("enter");
  renderLetter({ typed: true });
  $("letter-section").scrollIntoView({ behavior: "smooth", block: "start" });
}

$("hero-action").addEventListener("click", () => {
  if (transitions.active) return;
  if (state.current === 0) enterUniverse();
  else if (state.current === 3) revealMoon();
  else if (state.current === 5)
    openEnvelope($("interactive-scene").querySelector("[data-envelope]"));
  else $("discovery").scrollIntoView({ behavior: "smooth", block: "start" });
});

$("next-universe").addEventListener("click", () => {
  if (state.current < 5 && !transitions.active)
    transitions.travel(state.current, state.current + 1);
});
$("chapter-stops").addEventListener("click", (event) => {
  const button = event.target.closest("[data-nav]");
  if (!button || button.disabled || transitions.active) return;
  const destination = Number(button.dataset.nav);
  if (destination === state.current) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    $("universe-title").focus({ preventScroll: true });
    return;
  }
  if (state.visited.has(destination))
    transitions.travel(state.current, destination);
});
$("brand").addEventListener("click", () => {
  if (transitions.active) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
  $("universe-title").focus({ preventScroll: true });
});
$("journey-link").addEventListener("click", () =>
  $("journey-map").scrollIntoView({ behavior: "smooth", block: "center" }),
);

window.addEventListener("pagehide", (event) => {
  if (event.persisted) return;
  clearTimeout(arrivalTimer);
  clearTimeout(endSurpriseTimer);
  writer.destroy();
  transitions.destroy();
  interactions.destroy();
  space.destroy();
  music.destroy();
});

showUniverse(0, { initial: true });
