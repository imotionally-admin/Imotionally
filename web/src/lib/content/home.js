import { picsum } from "@/utils/placeholder";

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";
const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const HERO_IMAGE = picsum("imotionally-hero", 1000, 1100);
export const SHOWCASE_IMAGE = picsum("imotionally-showcase", 1200, 1000);

export const FEATURES = [
  { title: "Lorem ipsum", text: LOREM, icon: "pencil", href: "/about" },
  { title: "Dolor sit amet", text: LOREM, icon: "book", href: "/about" },
  { title: "Consectetur", text: LOREM, icon: "heart", href: "/about" },
  { title: "Adipiscing elit", text: LOREM, icon: "gift", href: "/about" },
];

export const AUDIENCES = [
  { label: "Babies", image: picsum("audience-babies", 600, 750) },
  { label: "Kids", image: picsum("audience-kids", 600, 750) },
  { label: "Siblings", image: picsum("audience-siblings", 600, 750) },
  { label: "Dad", image: picsum("audience-dad", 600, 750) },
  { label: "Mum", image: picsum("audience-mum", 600, 750) },
  { label: "Grandparents", image: picsum("audience-grandparents", 600, 750) },
];

export const OCCASIONS = [
  { label: "Diwali", image: picsum("occasion-diwali", 600, 750) },
  { label: "Mother's Day", image: picsum("occasion-mothers-day", 600, 750) },
  { label: "Father's Day", image: picsum("occasion-fathers-day", 600, 750) },
  { label: "Birthday", image: picsum("occasion-birthday", 600, 750) },
  { label: "Christmas", image: picsum("occasion-christmas", 600, 750) },
  { label: "New Year", image: picsum("occasion-new-year", 600, 750) },
];

export const STEPS = [
  { title: "Build your character", text: LOREM_SHORT, icon: "character" },
  { title: "Choose your cover", text: LOREM_SHORT, icon: "cover" },
  { title: "Add your message", text: LOREM_SHORT, icon: "message" },
  { title: "Review & order", text: LOREM_SHORT, icon: "review" },
];

export const BOOK_STEPS = [
  {
    title: "1. Enter Name & Choose Avatar",
    text: "We customize the character’s hair, skin tone, and gender to match your child.",
    icon: "pencil",
  },
  {
    title: "2. Dynamic Story Generation",
    text: "Each letter of the name triggers a specific, beautifully written chapter in the book.",
    icon: "heart",
  },
  {
    title: "3. Locally Printed with Love",
    text: "We print on premium certified eco-friendly matte paper and ship straight to your door.",
    icon: "printer",
  },
];

export const REVIEWS = [
  { name: "Lorem Ipsum", rating: 5, text: LOREM },
  { name: "Dolor Sit", rating: 5, text: LOREM },
  { name: "Amet Elit", rating: 4, text: LOREM },
  { name: "Sed Eiusmod", rating: 5, text: LOREM },
  { name: "Tempor Labore", rating: 5, text: LOREM },
  { name: "Magna Aliqua", rating: 4, text: LOREM },
];

export const FAQS = [
  { id: "q1", question: "Lorem ipsum dolor sit amet, consectetur?", answer: LOREM },
  { id: "q2", question: "Sed do eiusmod tempor incididunt ut labore?", answer: LOREM },
  { id: "q3", question: "Ut enim ad minim veniam, quis nostrud?", answer: LOREM },
  { id: "q4", question: "Duis aute irure dolor in reprehenderit?", answer: LOREM },
  { id: "q5", question: "Excepteur sint occaecat cupidatat non proident?", answer: LOREM },
];