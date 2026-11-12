import { cacheLife, cacheTag } from "next/cache";

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.";

const PLACEHOLDER_BOOKS = [
  { id: "book-01", slug: "lorem-ipsum-one", title: "Lorem Ipsum One", ageGroup: "Ages 2–5", recipients: ["Babies"], theme: "Bedtime", occasions: ["New Year"], priceFrom: 89900, featured: true },
  { id: "book-02", slug: "dolor-sit-two", title: "Dolor Sit Two", ageGroup: "Ages 5–8", recipients: ["Kids"], theme: "Adventure", occasions: ["Birthday"], priceFrom: 99900, featured: true },
  { id: "book-03", slug: "amet-elit-three", title: "Amet Elit Three", ageGroup: "Ages 3–7", recipients: ["Siblings"], theme: "Fantasy", occasions: ["Diwali", "Birthday"], priceFrom: 109900, featured: true },
  { id: "book-04", slug: "sed-do-four", title: "Sed Do Four", ageGroup: "All ages", recipients: ["Grandparents", "Dad"], theme: "Family", occasions: ["Christmas", "Father's Day"], priceFrom: 99900, featured: true },
  { id: "book-05", slug: "tempor-five", title: "Tempor Five", ageGroup: "Adults", recipients: ["Mum", "Dad"], theme: "Romance", occasions: ["Mother's Day"], priceFrom: 119900, featured: false },
].map((book) => ({
  ...book,
  description: LOREM,
  published: true,
}));

export async function getPublishedBooks() {
  "use cache";
  cacheLife("hours");
  cacheTag("books");
  return PLACEHOLDER_BOOKS.filter((book) => book.published);
}

export async function getFeaturedBooks(limit = 3) {
  const books = await getPublishedBooks();
  return books.filter((book) => book.featured).slice(0, limit);
}

export async function getBookBySlug(slug) {
  const books = await getPublishedBooks();
  return books.find((book) => book.slug === slug) ?? null;
}