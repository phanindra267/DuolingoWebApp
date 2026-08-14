export type NodeKind = "lesson" | "chest" | "trophy" | "story" | "practice";

export interface PathNode {
  id: string;
  kind: NodeKind;
  title: string;
  index: number;
  xp: number;
  gems?: number;
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  color: "primary" | "duo-blue" | "duo-gold" | "duo-purple" | "duo-red" | "duo-orange" | "duo-teal";
  icon: string;
  guidebook: string;
  nodes: PathNode[];
  vocab: { es: string; en: string; emoji: string }[];
  sentences: { es: string; en: string }[];
}

interface UnitSeed {
  title: string;
  description: string;
  color: Unit["color"];
  icon: string;
  vocab: [string, string, string][];
  sentences: [string, string][];
  lessons: number;
}

const SEEDS: UnitSeed[] = [
  {
    title: "Basics",
    description: "Form basic sentences, greet people",
    color: "primary",
    icon: "🌱",
    lessons: 5,
    vocab: [
      ["el hombre", "the man", "👨"],
      ["la mujer", "the woman", "👩"],
      ["el niño", "the boy", "👦"],
      ["la niña", "the girl", "👧"],
      ["el pan", "the bread", "🍞"],
      ["el agua", "the water", "💧"],
    ],
    sentences: [
      ["yo soy un niño", "I am a boy"],
      ["la mujer come pan", "the woman eats bread"],
      ["el hombre bebe agua", "the man drinks water"],
      ["ella es una niña", "she is a girl"],
    ],
  },
  {
    title: "Greetings",
    description: "Say hello and introduce yourself",
    color: "duo-blue",
    icon: "👋",
    lessons: 5,
    vocab: [
      ["hola", "hello", "👋"],
      ["buenos días", "good morning", "🌅"],
      ["adiós", "goodbye", "🚪"],
      ["gracias", "thank you", "🙏"],
      ["por favor", "please", "✨"],
      ["¿cómo estás?", "how are you?", "🤔"],
    ],
    sentences: [
      ["hola, ¿cómo estás?", "hello, how are you?"],
      ["buenos días, señora", "good morning, ma'am"],
      ["muchas gracias, adiós", "thank you very much, goodbye"],
      ["me llamo Ana", "my name is Ana"],
    ],
  },
  {
    title: "Food",
    description: "Order food and drinks",
    color: "duo-gold",
    icon: "🍎",
    lessons: 6,
    vocab: [
      ["la manzana", "the apple", "🍎"],
      ["el arroz", "the rice", "🍚"],
      ["la leche", "the milk", "🥛"],
      ["el café", "the coffee", "☕"],
      ["el pescado", "the fish", "🐟"],
      ["la sopa", "the soup", "🍲"],
    ],
    sentences: [
      ["quiero arroz y agua, por favor", "I want rice and water, please"],
      ["yo bebo café", "I drink coffee"],
      ["la manzana es roja", "the apple is red"],
      ["nosotros comemos pescado", "we eat fish"],
    ],
  },
  {
    title: "Family",
    description: "Talk about your family",
    color: "duo-purple",
    icon: "👨‍👩‍👧",
    lessons: 5,
    vocab: [
      ["la madre", "the mother", "👩"],
      ["el padre", "the father", "👨"],
      ["la hermana", "the sister", "👧"],
      ["el hermano", "the brother", "👦"],
      ["el abuelo", "the grandfather", "👴"],
      ["la familia", "the family", "👪"],
    ],
    sentences: [
      ["mi madre es doctora", "my mother is a doctor"],
      ["tengo dos hermanos", "I have two brothers"],
      ["mi familia es grande", "my family is big"],
      ["el abuelo lee un libro", "the grandfather reads a book"],
    ],
  },
  {
    title: "Everyday Life",
    description: "Describe your daily routine",
    color: "duo-teal",
    icon: "🏠",
    lessons: 6,
    vocab: [
      ["la casa", "the house", "🏠"],
      ["dormir", "to sleep", "😴"],
      ["trabajar", "to work", "💼"],
      ["la mañana", "the morning", "🌄"],
      ["la noche", "the night", "🌙"],
      ["el perro", "the dog", "🐶"],
    ],
    sentences: [
      ["yo trabajo por la mañana", "I work in the morning"],
      ["el perro duerme en la casa", "the dog sleeps in the house"],
      ["ella lee por la noche", "she reads at night"],
      ["nosotros vivimos aquí", "we live here"],
    ],
  },
  {
    title: "Travel",
    description: "Get around a new city",
    color: "duo-orange",
    icon: "✈️",
    lessons: 6,
    vocab: [
      ["el aeropuerto", "the airport", "✈️"],
      ["el tren", "the train", "🚆"],
      ["el hotel", "the hotel", "🏨"],
      ["el mapa", "the map", "🗺️"],
      ["la playa", "the beach", "🏖️"],
      ["el billete", "the ticket", "🎫"],
    ],
    sentences: [
      ["¿dónde está el hotel?", "where is the hotel?"],
      ["quiero un billete, por favor", "I want a ticket, please"],
      ["el tren llega a las ocho", "the train arrives at eight"],
      ["vamos a la playa", "we go to the beach"],
    ],
  },
  {
    title: "Shopping",
    description: "Buy things and ask for prices",
    color: "duo-red",
    icon: "🛍️",
    lessons: 5,
    vocab: [
      ["la tienda", "the store", "🏪"],
      ["el dinero", "the money", "💰"],
      ["barato", "cheap", "🪙"],
      ["caro", "expensive", "💎"],
      ["la camisa", "the shirt", "👕"],
      ["los zapatos", "the shoes", "👟"],
    ],
    sentences: [
      ["¿cuánto cuesta la camisa?", "how much does the shirt cost?"],
      ["los zapatos son caros", "the shoes are expensive"],
      ["yo compro en la tienda", "I buy at the store"],
      ["no tengo dinero", "I do not have money"],
    ],
  },
  {
    title: "Hobbies",
    description: "Share what you love doing",
    color: "duo-purple",
    icon: "🎸",
    lessons: 6,
    vocab: [
      ["la música", "the music", "🎵"],
      ["bailar", "to dance", "💃"],
      ["nadar", "to swim", "🏊"],
      ["el fútbol", "the soccer", "⚽"],
      ["pintar", "to paint", "🎨"],
      ["el libro", "the book", "📚"],
    ],
    sentences: [
      ["me gusta bailar", "I like to dance"],
      ["ellos juegan al fútbol", "they play soccer"],
      ["yo escucho música", "I listen to music"],
      ["nosotros nadamos los domingos", "we swim on Sundays"],
    ],
  },
  {
    title: "Work & School",
    description: "Talk about study and jobs",
    color: "duo-blue",
    icon: "🎓",
    lessons: 6,
    vocab: [
      ["la escuela", "the school", "🏫"],
      ["el maestro", "the teacher", "🧑‍🏫"],
      ["estudiar", "to study", "📖"],
      ["la oficina", "the office", "🏢"],
      ["el examen", "the exam", "📝"],
      ["la computadora", "the computer", "💻"],
    ],
    sentences: [
      ["estudio español en la escuela", "I study Spanish at school"],
      ["el maestro escribe en la pizarra", "the teacher writes on the board"],
      ["trabajo en una oficina", "I work in an office"],
      ["el examen es difícil", "the exam is difficult"],
    ],
  },
  {
    title: "Conversation",
    description: "Hold a real conversation",
    color: "primary",
    icon: "💬",
    lessons: 7,
    vocab: [
      ["quizás", "maybe", "🤷"],
      ["siempre", "always", "🔁"],
      ["porque", "because", "❓"],
      ["también", "also", "➕"],
      ["pero", "but", "↔️"],
      ["entonces", "then", "⏩"],
    ],
    sentences: [
      ["quiero ir, pero estoy cansado", "I want to go, but I am tired"],
      ["siempre estudio porque me gusta", "I always study because I like it"],
      ["quizás vamos mañana", "maybe we go tomorrow"],
      ["yo también hablo inglés", "I also speak English"],
    ],
  },
];

function buildNodes(unitIndex: number, seed: UnitSeed): PathNode[] {
  const nodes: PathNode[] = [];
  let i = 0;
  const push = (kind: NodeKind, title: string, xp: number, gems?: number) => {
    nodes.push({
      id: `u${unitIndex + 1}-n${i}`,
      kind,
      title,
      index: i,
      xp,
      ...(gems === undefined ? {} : { gems }),
    });
    i += 1;
  };
  for (let l = 0; l < seed.lessons; l++) {
    push("lesson", `Lesson ${l + 1}`, 10 + (l % 3) * 5);
    if (l === 1) push("chest", "Reward chest", 0, 10 + unitIndex * 2);
    if (l === 3) push("story", `Story: ${seed.title}`, 20);
    if (l === 4 && seed.lessons > 5) push("practice", "Practice", 15);
  }
  push("chest", "Unit chest", 0, 25 + unitIndex * 3);
  push("trophy", `${seed.title} trophy`, 40);
  return nodes;
}

export const UNITS: Unit[] = SEEDS.map((seed, idx) => ({
  id: `unit-${idx + 1}`,
  number: idx + 1,
  title: seed.title,
  description: seed.description,
  color: seed.color,
  icon: seed.icon,
  guidebook: `In this unit you will learn ${seed.vocab.length} key words and build sentences about ${seed.title.toLowerCase()}.`,
  nodes: buildNodes(idx, seed),
  vocab: seed.vocab.map(([es, en, emoji]) => ({ es, en, emoji })),
  sentences: seed.sentences.map(([es, en]) => ({ es, en })),
}));

export const ALL_NODES: { unit: Unit; node: PathNode }[] = UNITS.flatMap((unit) =>
  unit.nodes.map((node) => ({ unit, node })),
);

export function findNode(nodeId: string) {
  return ALL_NODES.find((n) => n.node.id === nodeId);
}

/* ------------------------- Exercises ------------------------- */

export type Exercise =
  | {
      kind: "select";
      instruction: string;
      prompt: string;
      options: { text: string; emoji: string }[];
      answer: string;
      speak?: string;
    }
  | {
      kind: "wordbank";
      instruction: string;
      source: string;
      speak?: string;
      answer: string[];
      bank: string[];
    }
  | { kind: "type"; instruction: string; source: string; speak?: string; answer: string }
  | {
      kind: "blank";
      instruction: string;
      before: string;
      after: string;
      options: string[];
      answer: string;
      hint: string;
    }
  | { kind: "match"; instruction: string; pairs: { a: string; b: string }[] }
  | {
      kind: "listen";
      instruction: string;
      speak: string;
      answer: string[];
      bank: string[];
      translation: string;
    }
  | { kind: "speak"; instruction: string; phrase: string; translation: string };

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

const at = <T,>(arr: T[], i: number): T => arr[i % arr.length] as T;

const DISTRACTORS = ["mañana", "verde", "grande", "rápido", "ahora", "mucho", "otro", "bien"];

export function buildExercises(unit: Unit, nodeIndex: number): Exercise[] {
  const seed = unit.number * 31 + nodeIndex;
  const vocab = shuffle(unit.vocab, seed);
  const sentences = shuffle(unit.sentences, seed + 5);
  const ex: Exercise[] = [];

  const v0 = at(vocab, 0);
  ex.push({
    kind: "select",
    instruction: "Which one of these is “" + v0.en + "”?",
    prompt: v0.en,
    speak: v0.es,
    options: shuffle(
      [v0, at(vocab, 1), at(vocab, 2), at(vocab, 3)].map((v) => ({ text: v.es, emoji: v.emoji })),
      seed + 1,
    ),
    answer: v0.es,
  });

  const s0 = at(sentences, 0);
  ex.push({
    kind: "wordbank",
    instruction: "Write this in English",
    source: s0.es,
    speak: s0.es,
    answer: s0.en.split(" "),
    bank: shuffle([...s0.en.split(" "), ...shuffle(DISTRACTORS, seed).slice(0, 3)], seed + 2),
  });

  ex.push({
    kind: "match",
    instruction: "Tap the matching pairs",
    pairs: vocab.slice(0, 4).map((v) => ({ a: v.es, b: v.en })),
  });

  const s1 = at(sentences, 1);
  ex.push({
    kind: "listen",
    instruction: "Tap what you hear",
    speak: s1.es,
    translation: s1.en,
    answer: s1.es.replace(/[¿?,.]/g, "").split(" "),
    bank: shuffle(
      [
        ...s1.es.replace(/[¿?,.]/g, "").split(" "),
        ...shuffle(DISTRACTORS, seed + 7).slice(0, 3),
      ],
      seed + 3,
    ),
  });

  const v1 = at(vocab, 1);
  ex.push({
    kind: "blank",
    instruction: "Fill in the blank",
    before: "Yo quiero",
    after: ", por favor.",
    options: shuffle([v1.es, at(vocab, 2).es, at(vocab, 3).es], seed + 4),
    answer: v1.es,
    hint: `I want ${v1.en}, please.`,
  });

  const s2 = at(sentences, 2);
  ex.push({
    kind: "type",
    instruction: "Write this in Spanish",
    source: s2.en,
    speak: s2.es,
    answer: s2.es,
  });

  const s3 = at(sentences, 3);
  ex.push({
    kind: "wordbank",
    instruction: "Write this in Spanish",
    source: s3.en,
    answer: s3.es.replace(/[¿?,.]/g, "").split(" "),
    bank: shuffle(
      [...s3.es.replace(/[¿?,.]/g, "").split(" "), ...shuffle(DISTRACTORS, seed + 9).slice(0, 3)],
      seed + 6,
    ),
  });

  ex.push({
    kind: "speak",
    instruction: "Speak this sentence",
    phrase: s0.es,
    translation: s0.en,
  });

  return ex;
}

/* ------------------------- Static mock content ------------------------- */

export const CHARACTERS = [
  {
    name: "Duo",
    role: "The owl",
    blurb: "Encouraging, persistent and always ready for one more lesson.",
    color: "primary" as const,
    emoji: "🦉",
  },
  {
    name: "Lily",
    role: "The teen",
    blurb: "Unimpressed by everything except a perfect lesson.",
    color: "duo-purple" as const,
    emoji: "😑",
  },
  {
    name: "Zari",
    role: "The optimist",
    blurb: "Loves music, dancing and celebrating your streak.",
    color: "duo-orange" as const,
    emoji: "🎧",
  },
  {
    name: "Oscar",
    role: "The professor",
    blurb: "Formal grammar fan. Will correct your accents.",
    color: "duo-blue" as const,
    emoji: "🎩",
  },
  {
    name: "Eddy",
    role: "The athlete",
    blurb: "Fitness first, vocabulary second.",
    color: "duo-teal" as const,
    emoji: "🏃",
  },
  {
    name: "Bea",
    role: "The friend",
    blurb: "Always up for a chat and a chest.",
    color: "duo-red" as const,
    emoji: "🌸",
  },
];

export const LEADERBOARD = [
  { name: "Marta R.", xp: 1420, avatar: "🦊" },
  { name: "Kenji T.", xp: 1310, avatar: "🐼" },
  { name: "Sofia L.", xp: 1180, avatar: "🐨" },
  { name: "Ahmed K.", xp: 990, avatar: "🦁" },
  { name: "Priya S.", xp: 870, avatar: "🐧" },
  { name: "Lucas M.", xp: 720, avatar: "🐢" },
  { name: "Nora B.", xp: 640, avatar: "🐝" },
  { name: "Ivan D.", xp: 520, avatar: "🐺" },
  { name: "Chen W.", xp: 410, avatar: "🐬" },
  { name: "Ella F.", xp: 300, avatar: "🦄" },
];

export const SHOP_ITEMS = [
  {
    id: "heart-refill",
    title: "Heart Refill",
    desc: "Refill your hearts and keep learning.",
    price: 350,
    emoji: "❤️",
    color: "duo-red" as const,
  },
  {
    id: "streak-freeze",
    title: "Streak Freeze",
    desc: "Protect your streak for one missed day.",
    price: 200,
    emoji: "🧊",
    color: "duo-blue" as const,
  },
  {
    id: "double-xp",
    title: "Double or Nothing",
    desc: "Wager 50 gems for a 7 day XP challenge.",
    price: 50,
    emoji: "⚡",
    color: "duo-gold" as const,
  },
  {
    id: "outfit",
    title: "Duo's Fancy Outfit",
    desc: "Dress up your owl for special occasions.",
    price: 500,
    emoji: "🎩",
    color: "duo-purple" as const,
  },
];

export const ACHIEVEMENTS = [
  { id: "wildfire", name: "Wildfire", desc: "Reach a 3 day streak", emoji: "🔥", goal: 3, metric: "streak" as const },
  { id: "sage", name: "Sage", desc: "Earn 300 XP", emoji: "🧙", goal: 300, metric: "xp" as const },
  { id: "scholar", name: "Scholar", desc: "Complete 10 lessons", emoji: "📚", goal: 10, metric: "lessons" as const },
  { id: "champion", name: "Champion", desc: "Finish 2 units", emoji: "🏆", goal: 2, metric: "units" as const },
  { id: "collector", name: "Collector", desc: "Open 3 chests", emoji: "🎁", goal: 3, metric: "chests" as const },
  { id: "sharpshooter", name: "Sharpshooter", desc: "Answer 50 questions", emoji: "🎯", goal: 50, metric: "answers" as const },
];

export const MORE_PAGES: Record<string, { title: string; body: string[] }> = {
  about: {
    title: "About",
    body: [
      "Lingua is a study project that recreates the feel of a modern gamified language app.",
      "Every screen is frontend-only: progress lives in your browser and resets whenever you want.",
    ],
  },
  blog: {
    title: "Blog",
    body: [
      "How streaks change study habits — a look at why a small daily goal beats a long weekend cram.",
      "Designing playful feedback: the science of a happy owl.",
    ],
  },
  store: {
    title: "Store",
    body: ["Plushies, posters and stickers of your favourite characters. Coming soon."],
  },
  efficacy: {
    title: "Efficacy",
    body: [
      "Independent studies suggest short daily practice sessions outperform infrequent long ones.",
      "This demo mirrors that idea with a daily XP goal and streak mechanics.",
    ],
  },
  careers: {
    title: "Careers",
    body: ["We are not hiring — this is a college assignment. But thanks for looking!"],
  },
  investors: {
    title: "Investors",
    body: ["No funding rounds here. Just React state and a lot of green."],
  },
  terms: {
    title: "Terms",
    body: ["Use this demo freely. No data leaves your browser."],
  },
  privacy: {
    title: "Privacy",
    body: ["No accounts, no tracking, no servers. Progress is stored in localStorage only."],
  },
  help: {
    title: "Help & Support",
    body: [
      "Stuck on a lesson? Hearts refill from the shop, and you can reset all progress in Settings.",
    ],
  },
};
