const p = (text) => ({ type: "p", text });
const q = (text) => ({ type: "blockquote", text });
const promise = (text) => ({ type: "p", text, className: "promise" });

// All letters are real text, separate from the scene markup, so James can edit
// them without touching the interaction or animation code.
export const letters = [
  {
    title: "The Universe Begins With You",
    blocks: [
      p(
        "My baby Julie, I made this little universe because ordinary words sometimes feel too small for what I want to tell you. A simple “I love you” is something I mean with my whole heart, but there are days when I wish I could place every feeling gently in your hands and let you see how much is inside it. So I tried giving those feelings a sky.",
      ),
      p(
        "Every star here is a little thank you. Every planet is a place for a thought of you. Every quiet space is somewhere you can rest without having to be anything other than yourself. I wanted to make something you could return to whenever you wanted a reminder that someone is grateful you exist.",
      ),
      p(
        "You have become one of the most beautiful parts of my life. I am grateful for your presence, for the kindness you carry, for the time you share with me, and for the little things you do that might seem ordinary to you. I notice them. I may not always express that as well as I should, but they matter to me more than you know.",
      ),
      p(
        "Sometimes I think about how many people there are in this world, how many different paths our lives could have taken, and how easily we might have remained strangers. Then I remember that God allowed our paths to meet. That is something I do not want to treat casually. Knowing you is a blessing I want to appreciate with more than a passing thought.",
      ),
      q(
        "Even if the universe has billions of stars, my eyes will always search for you.",
      ),
      p(
        "And baby, you do not have to shine every second for me to appreciate you. You are allowed to have quiet days, tired days, uncertain days. I want to keep learning how to be gentle in those moments, how to listen without rushing, and how to make room for what you feel. A beautiful little website means less if I do not bring that same care into ordinary life.",
      ),
      p(
        "I know I have fallen short lately, and I am sorry. This universe is not a way to cover that with pretty stars. It is a little place to be honest, to say thank you, and to remind myself of the kind of person I want to become: more patient, more responsible, and more consistent in the way I care for you.",
      ),
      p(
        "For now, take your time here, my baby Julie. Open the little secrets. Follow the stars. Smile at the slightly dramatic boy who apparently needed an entire galaxy to tell you that he likes you very, very much. There is no hurry. I am simply happy to share this little piece of my heart with you.",
      ),
      promise(
        "And if I could choose where my universe begins and ends, I would choose wherever you are, my baby Julie.",
      ),
    ],
  },
  {
    title: "If I Could Keep Every Beautiful Moment",
    blocks: [
      p(
        "My baby Julie, if I could save moments the way the night saves starlight, I would keep so many little pieces of time with you. Not only the moments someone would think to photograph, but the quieter ones too: a conversation that stays in my mind, a laugh I wish I could hear again, the happiness of having a little of your attention.",
      ),
      p(
        "I treasure the time we share because it is something you choose to give. I want to remember that, even on an ordinary day. Your presence is not something I am entitled to. It is something I am thankful for. Even the simplest moments become meaningful because I get to experience them with you.",
      ),
      p(
        "That is why these planets are not filled with invented perfect memories. They are little spaces for our real photographs, our real dates, and the stories that only we can tell properly. I want this part of the universe to hold something honest. A slightly blurry picture can mean more than a perfect image when it brings back a real feeling.",
      ),
      p(
        "I hope we get to create more memories together. I want to explore new places with you, find something that makes us laugh, take pictures we will be happy to find later, and discover the little adventures hidden inside ordinary plans. I want to learn what you enjoy, what makes a day feel special to you, and what kind of moments you would like us to make time for.",
      ),
      p(
        "And when a day does not go the way we hoped, I want to meet it with more patience. I am sorry for the times my own behavior has made things harder than they needed to be. I want to become someone who helps a difficult moment feel more manageable, someone who can listen, take responsibility, and make a better choice instead of insisting on being right.",
      ),
      p(
        "I am thankful to God for the memories we already have and hopeful about the ones we have not made. There is so much life still to discover. Maybe some adventures will be exciting. Maybe some will be very simple: a peaceful walk, something good to eat, an afternoon without a big plan. I would love the chance to find out with you.",
      ),
      p(
        "When you look at these five little photo spaces, baby, I hope you see room rather than pressure. We do not need a perfect story for it to be worth remembering. We just need to treat the moments we are given with care, and let the next ones arrive honestly, one at a time.",
      ),
      promise(
        "I don't need every day to be perfect. I just want more ordinary days with you that become extraordinary memories.",
      ),
    ],
  },
  {
    title: "I Could Spend Forever Discovering You",
    blocks: [
      p(
        "My baby Julie, I could have made this page a list and called it finished. Your smile. Your kindness. Your laughter. Your beautiful heart. But every time I think I have named a reason I love you, I notice another detail hiding inside it. It turns out that twenty stars are a very small beginning.",
      ),
      p(
        "Loving someone is not only about the big, unforgettable moments. It is about paying attention when the day is quiet. It is about learning the little things that bring you comfort, noticing when you need space, remembering what matters to you, and asking instead of assuming that I already understand. I want to stay curious about you in that thoughtful, everyday way.",
      ),
      p(
        "There is a whole person behind the smile I admire. You have your own thoughts, hopes, worries, opinions, and dreams. I do not want to reduce you to the way you make me feel, even though you do make my heart very happy. I want to appreciate who you are, including the parts I still have the privilege of getting to know.",
      ),
      p(
        "I know that means choosing patience. It means listening carefully when we see something differently. It means letting understanding matter more than winning a conversation. I am sorry for the times I have not done that well. I want to keep learning how to care for you without letting my own impatience take up all the room.",
      ),
      q(
        "If loving you were a galaxy, I would happily spend eternity getting lost in it.",
      ),
      p(
        "Now, baby, I do need to raise one very serious concern. Your smile is making it unnecessarily difficult for me to act normal. I am trying to be a calm, responsible person, and then I think of you and suddenly I am the boy smiling at absolutely nothing. If this is your secret plan, I regret to inform you that it is working beautifully.",
      ),
      p(
        "But even beneath the teasing, my affection is something I want to treat with care. I do not need you to be cheerful all the time. You do not have to provide a reason every day for me to be kind. Love should not become a performance you have to keep up. I want you to feel appreciated as yourself, not as an impossible version of a perfect girl.",
      ),
      p(
        "So these stars are little reminders of what I see, and a promise to keep looking with attention rather than taking you for granted. I hope we keep having conversations that surprise us. I hope I keep learning what makes you feel cared for. I hope that, as we grow, I become better at turning all these reasons into patient, thoughtful actions.",
      ),
      promise(
        "A thousand reasons would still be a beginning, my baby Julie. And the sweetest part is that I get to keep discovering you.",
      ),
    ],
  },
  {
    title: "A Letter From Someone Who Wants to Become Better",
    blocks: [
      p(
        "My baby Julie, this is the part where I want to put the beautiful words down for a moment and speak to you plainly. I know I have been disobedient lately, and I am genuinely sorry. I have not always acted the way I should. I have made choices that did not show the care, responsibility, and consideration you deserve.",
      ),
      p(
        "I understand that my actions can affect your feelings. When I do not listen properly, when I act carelessly, or when I do not follow through on something I should have respected, it can leave you disappointed and unheard. I am sorry for the moments when I disappointed you. I do not want to brush them aside because my intentions were different from the effect of what I did.",
      ),
      p(
        "I do not want to make excuses for my mistakes. Being tired, distracted, or caught up in my own feelings does not remove my responsibility. You should not have to carry the work of explaining the same hurt over and over before I take it seriously. My mistakes belong to me, and becoming better is work I need to choose for myself.",
      ),
      p(
        "When I say that I want to become more responsible, patient, understanding, and obedient, I mean being more faithful to the thoughtful things we agree on, respecting the boundaries you express, and following through on my commitments. I want to pause before reacting, think about how a choice will affect you, and respond with care instead of making you manage my impatience.",
      ),
      p(
        "I never want you to feel that your feelings do not matter. They do. I want to listen more carefully and understand you better, including when what you need to say is difficult for me to hear. Listening should not mean waiting for my chance to defend myself. It should mean giving your words the attention and respect they deserve.",
      ),
      q(
        "I cannot promise that I will never make mistakes again, but I can promise that I will take responsibility, learn from them, and make a genuine effort to become better.",
      ),
      p(
        "I know apologies mean more when they are followed by genuine changes. I want my actions to show that I am learning and improving: being clearer when I communicate, keeping the promises I make, admitting a mistake without turning it into an argument, and choosing patience when it would be easier to react. Those are things to practice consistently, not simply to say once in a letter.",
      ),
      p(
        "You are not responsible for making me better, and you do not owe me immediate forgiveness because I made something romantic. Please take whatever time you need. You can feel what you feel. You can tell me what did not feel okay, and you can have space without being made to feel guilty for it. I would rather respect your pace than turn this apology into another expectation.",
      ),
      p(
        "I pray that God helps me become more humble, more attentive, and more willing to do the quiet work of changing. I care about you, baby. I want that care to become something you can see in the way I behave, especially when nobody is watching and no beautiful music is playing.",
      ),
      promise(
        "I'm sorry, my baby. You deserve love that is not only expressed through beautiful words but also shown through consistent actions.",
      ),
    ],
  },
  {
    title: "If God Allows Me to Spend My Future With You",
    blocks: [
      p(
        "My baby Julie, there is something tender about looking at a constellation. The stars are separate, yet a line between them helps us imagine a story. That is how I think about the future: not something I can declare on my own, but a possibility we can approach with care, faith, and choices that belong to both of us.",
      ),
      p(
        "I want to continue courting you. Not only with grand gestures when I want to say something important, but with the little things that make a person feel valued: attention, honesty, thoughtfulness, and time. I want to keep learning how to love you better instead of assuming that affection alone means I already know how.",
      ),
      p(
        "I want to support your dreams. I want to hear about what you hope for, celebrate your victories without making them about me, and be happy to see you become more fully yourself. I hope I can be someone who cheers for you with a full heart, whether a victory is something the whole world sees or something only you know was difficult.",
      ),
      p(
        "And during difficult days, I want to be there in ways that actually help. Sometimes that may mean listening. Sometimes it may mean asking what you need, helping with something practical, or respecting your wish for a little space. I want to build a peaceful and loving relationship where care does not disappear when things become inconvenient.",
      ),
      p(
        "I am sorry for the ways my recent behavior has fallen short of that hope. I do not want to talk about a beautiful future while avoiding the work of the present. Learning to keep my word, respect your feelings, and respond with patience is part of what makes any future worth imagining. I want to practice those things now.",
      ),
      p(
        "I want us to grow together in faith. I pray that God continues to guide our relationship, helps us speak truthfully and kindly, and gives us the wisdom to make choices that are good for both of us. I want to be thankful for what we have without trying to rush what has not arrived.",
      ),
      q(
        "If God allows our paths to continue together, I hope that one day we will look back at this little universe and smile because we never stopped choosing to grow together.",
      ),
      p(
        "Someday, I hope to call you my wife. I say that as a dream held with respect, not as a future you have already promised me. It would be a privilege to build that life with you if we both freely choose it, in the right time, with the care and readiness it deserves. Until then, I want to appreciate who you are today rather than love only an imagined tomorrow.",
      ),
      promise(
        "Whatever beautiful things the future may hold, my baby Julie, I hope I keep meeting the present with gratitude. One honest conversation. One kept promise. One more day of learning how to love you with a steadier heart.",
      ),
    ],
  },
  {
    title: "My Last Letter Across the Universe",
    blocks: [
      p(
        "My baby Julie, you made it to the quiet edge of this little universe. Before you close the last envelope, I want to sit here with you in words for a little longer. No more planets to explain. No grand mystery to solve. Just me, your slightly dramatic James, trying to tell my favorite girl something that matters to him very much.",
      ),
      p(
        "This website is only a small universe I created to express feelings that I sometimes cannot explain properly. I can arrange stars, give a moon a soft glow, and make a little galaxy turn pink. But none of those things can fully hold the happiness of knowing you, the gratitude I feel for you, or the care I want to put into loving you better. They are little messengers. You are the reason I sent them.",
      ),
      p(
        "I am thankful for your existence. Not only because of what you bring into my life, but because you are a whole, beautiful person with a life that deserves kindness, peace, and room to grow. I am thankful for every moment we share, every conversation you give your time to, and every little opportunity to understand you a little more. I hope I never become too used to your presence to remember that it is a blessing.",
      ),
      p(
        "I often come back to the thought that God allowed our paths to meet. There were so many ways life could have unfolded, and somehow I got to know you. I cannot explain every part of that, but I can be grateful for it. I pray that God continues to guide us, keeps our intentions honest, and teaches us to care for each other with patience, faith, and humility.",
      ),
      p(
        "I also want to say, again and without hiding behind the stars, that I am sorry for my shortcomings. I am sorry I have been disobedient lately, and for the moments my actions made you feel disappointed or unheard. You should not have to read a long love letter to find out that your feelings matter. I want to make that clear in my choices, in my listening, and in the way I take responsibility when I get something wrong.",
      ),
      p(
        "I want to keep improving myself. That work is mine to do. I want to become more responsible with what I promise, more patient in how I respond, and more willing to understand before I speak. I know that saying I will do better is the beginning of the work, not proof that it is finished. You do not owe me quick forgiveness or reassurance. I want to respect your pace and let genuine changes speak in their own time.",
      ),
      p(
        "And through all that learning, I want to continue courting you. I want to keep making you feel appreciated in ways that suit the person you are. I want to ask about your day and listen to the answer. I want to remember the things that matter to you. I want to support your dreams, celebrate your victories, and bring a little calm instead of more noise when the day has already been difficult.",
      ),
      q(
        "Baby, if kisses were shooting stars, I would make a whole galaxy fall just to give you one.",
      ),
      p(
        "Yes, I know. I gave myself access to an entire universe and immediately used it to flirt with you. What can I say, baby? You are the only gravity I never want to escape. If cuddling you were a planet, I would happily move there and never ask for a return ticket. I would probably need snacks, though. Even a hopeless romantic should arrive prepared.",
      ),
      p(
        "Careful, baby. Your smile has enough gravitational pull to make me forget the entire universe. There are times when the thought of spending a little more time with you makes me happier than any grand plan could. I miss you. I look forward to seeing you, hearing your voice, and being close enough that I do not have to put every affectionate thought into a message.",
      ),
      p(
        "One day, I hope I can hold you close, kiss your forehead, steal a few kisses, and remind you that you are my favorite place to be. Only the kisses you want to give, of course. The sweetest closeness is the kind that feels welcome on both sides. Until then, please accept this very carefully delivered imaginary forehead kiss and the fact that I am almost certainly smiling while thinking about you.",
      ),
      p(
        "I hope to experience many more adventures with you. New places, silly pictures, little celebrations, peaceful afternoons, and stories that begin with “Do you remember when…” I dream of a future where we can look back at these little memories together, laugh at how earnest this universe was, and be thankful that we kept learning to treat each other well.",
      ),
      p(
        "Someday, if God allows and if it is a future we both choose, I hope I can call you my wife. I do not want that dream to become pressure on your present. I want to care for what is real now: you, your feelings, the trust we build, and the opportunities we have to grow. A beautiful future should be approached with respect, not assumed because someone wishes for it deeply.",
      ),
      p(
        "I will never stop finding reasons to love you. There is always another little thing to notice, another part of your world to understand, another chance to be thankful. More than that, I want to keep finding ways to turn affection into something useful and steady: a kept promise, an honest apology, a moment of patience, a choice that makes you feel heard.",
      ),
      p(
        "So if this universe leaves you with anything, baby, I hope it is not a feeling that you need to answer perfectly. I hope it is warmth. I hope it is the knowledge that someone is grateful to know you, sincerely sorry for where he has fallen short, and willing to do the everyday work of becoming better. You deserve care that exists after the screen goes dark, too.",
      ),
      promise(
        "Even if the stars stop shining, galaxies disappear, and the universe changes its shape, I hope you will always remember that there is someone here who is grateful to love you.",
      ),
      promise(
        "I don't know everything that tomorrow will bring, but I know that today, I choose to love you, appreciate you, and become someone better.",
      ),
      promise(
        "And if I could create one universe just for you, I would fill it with every beautiful thing you deserve.",
      ),
      promise(
        "I love you, my baby Julie. More than these words, more than these stars, and more than this little universe could ever show.",
      ),
      promise(
        "Forever courting you, forever choosing to grow with you, and forever grateful for you.",
      ),
      promise("With all my love,"),
      promise("Traigo 💗"),
    ],
  },
];

/** Type existing text nodes, never HTML; one animation frame is owned at a time. */
export class LetterWriter {
  constructor(container, skipButton) {
    this.container = container;
    this.skipButton = skipButton;
    this.abort = new AbortController();
    this.motion = matchMedia("(prefers-reduced-motion: reduce)");
    const options = { signal: this.abort.signal };
    skipButton.addEventListener("click", () => this.complete(), options);
    document.addEventListener(
      "visibilitychange",
      () => {
        cancelAnimationFrame(this.frame);
        if (this.active && !document.hidden) {
          this.lastTime = performance.now();
          this.frame = requestAnimationFrame((time) => this.tick(time));
        }
      },
      options,
    );
    this.motion.addEventListener(
      "change",
      () => {
        if (this.motion.matches && this.active) this.complete();
      },
      options,
    );
  }

  write(blocks, { typed = false, onComplete } = {}) {
    this.cancel();
    this.onComplete = onComplete;
    this.blocks = blocks;
    this.elements = blocks.map((block) => {
      const element = document.createElement(block.type);
      if (block.className) element.className = block.className;
      if (!typed || this.motion.matches) element.textContent = block.text;
      return element;
    });
    this.container.replaceChildren(...this.elements);
    this.active = typed && !this.motion.matches;
    this.container.setAttribute("aria-busy", String(this.active));
    this.skipButton.hidden = !this.active;
    if (!this.active) {
      this.onComplete?.();
      return;
    }
    this.blockIndex = 0;
    this.position = 0;
    this.credit = 0;
    this.lastTime = performance.now();
    this.frame = requestAnimationFrame((time) => this.tick(time));
  }

  tick(time) {
    if (!this.active || document.hidden) return;
    this.credit += Math.min(80, time - this.lastTime) * 0.19;
    this.lastTime = time;
    let characters = Math.floor(this.credit);
    this.credit -= characters;
    while (characters > 0 && this.blockIndex < this.blocks.length) {
      const text = this.blocks[this.blockIndex].text;
      const take = Math.min(characters, text.length - this.position);
      this.position += take;
      characters -= take;
      this.elements[this.blockIndex].textContent = text.slice(0, this.position);
      if (this.position >= text.length) {
        this.blockIndex++;
        this.position = 0;
      }
    }
    if (this.blockIndex >= this.blocks.length) {
      this.complete();
      return;
    }
    this.frame = requestAnimationFrame((now) => this.tick(now));
  }

  complete() {
    if (!this.active) return;
    cancelAnimationFrame(this.frame);
    this.blocks.forEach((block, index) => {
      this.elements[index].textContent = block.text;
    });
    this.active = false;
    this.skipButton.hidden = true;
    this.container.setAttribute("aria-busy", "false");
    const callback = this.onComplete;
    this.onComplete = null;
    callback?.();
  }

  cancel() {
    cancelAnimationFrame(this.frame);
    this.active = false;
    this.onComplete = null;
    this.skipButton.hidden = true;
    this.container.setAttribute("aria-busy", "false");
  }

  destroy() {
    this.cancel();
    this.abort.abort();
  }
}
