const ART_ROOT = "/book";

const skinTones = [
  { id: "s1", code: "S1", label: "Light", color: "#DCACA9" },
  { id: "s2", code: "S2", label: "Medium", color: "#B58C8A" },
];

const hairColours = [
  { id: "hc1", code: "HC1", label: "Brown", color: "#49352F" },
  { id: "hc2", code: "HC2", label: "Black", color: "#211D1E" },
];

const defaultVariant = "H1_S1_HC1";

const galleryImages = [1, 2, 3, 4, 5].map((page) => ({
  src: `${ART_ROOT}/${defaultVariant}/${defaultVariant}/${page}.jpg`,
  alt: `Illustration from Sara and the Little Fairy, page ${page}`,
}));

const storyPages = [
  {
    id: "p01",
    artwork: 1,
    text: "{{c1.name}} loved fairy stories.",
  },
  {
    id: "p02",
    artwork: 2,
    text: "Every night, she looked out of her window and wished, “Maybe a fairy will visit me someday.”",
  },
  {
    id: "p03",
    artwork: 3,
    text: "One morning, {{c1.name}} found something tiny shining in the grass. It was a little fairy!",
  },
  {
    id: "p04",
    artwork: 4,
    text: "The fairy had tiny wings and a sparkly pink dress. But she looked sad. “My magic is gone,” she whispered. {{c1.name}} gently asked, “Can I help you?” The fairy nodded. “Yes! I need to find my lost sparkle.”",
  },
  {
    id: "p05",
    artwork: 5,
    text: "{{c1.name}} and the fairy searched the garden. They looked under the big green leaves, behind the flowers, and inside a little mushroom. Then {{c1.name}} heard a tiny sound. “Chirp, chirp!” A little bird was stuck in a bush.",
  },
  {
    id: "p06",
    artwork: 6,
    text: "{{c1.name}} carefully moved the branches. “Don’t worry, little bird,” she said. The bird flew away happily. The fairy smiled. Suddenly… TWINKLE! A tiny golden sparkle appeared on her wing. “Look!” cried {{c1.name}}. “My magic is coming back!”",
  },
  {
    id: "p07",
    artwork: 7,
    text: "They kept walking. Soon they found a little bunny sitting all alone. {{c1.name}} shared her carrot with the bunny. The bunny hopped happily away. TWINKLE! Another golden sparkle appeared. The fairy’s wings began to glow.",
  },
  {
    id: "p08",
    artwork: 8,
    text: "The fairy looked at {{c1.name}} with a big smile. “I know where my magic was hiding!” “Where?” {{c1.name}} asked. “In your kind heart!” The fairy waved her little wand. POOF! The whole garden filled with tiny glowing stars.",
  },
  {
    id: "p09",
    artwork: 9,
    text: "That evening, {{c1.name}} sat by her window. The little fairy flew up into the moonlight. “Will you come back?” {{c1.name}} asked. “Of course!” said the fairy. “Magic always comes back to a kind heart.” {{c1.name}} smiled. And from that night on, she always looked for a little sparkle in her garden. The End.",
  },
];

const SARA_BOOK = {
  id: "book-sara-and-the-little-fairy",
  slug: "sara-and-the-little-fairy",
  title: "Sara and the Little Fairy",
  titleTemplate: "{{c1.name}} and the Little Fairy",
  description:
    "A kind-hearted child helps a little fairy find her lost sparkle in a magical garden.",
  ageGroup: "Ages 3–7",
  recipients: ["Kids"],
  theme: "Fantasy",
  occasions: ["Birthday"],
  priceFrom: 20000,
  featured: true,
  published: true,
  coverImage: `${ART_ROOT}/${defaultVariant}/${defaultVariant}/${defaultVariant}.jpg`,
  galleryImages,
  cover: {
    label: "Pink cover",
    color: "#E78AB2",
  },
  artwork: {
    root: ART_ROOT,
    variantFolder: "{variant}/{variant}",
    pageFile: "{page}.jpg",
    portraitFile: "{variant}.jpg",
  },
  characters: [
    {
      id: "c1",
      label: "Child",
      nameField: {
        minLength: 2,
        maxLength: 14,
      },
      skinTones,
      hairColours,
      hairStyles: [
        { id: "bob", label: "Bob", code: "H1" },
        { id: "layer-cut", label: "Layer cut", code: "H1" },
      ],
      appearance: ["skinTone", "hairColour", "hairStyle"],
    },
  ],
  storyPages,
};

export default SARA_BOOK;
