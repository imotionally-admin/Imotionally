import { cacheLife, cacheTag } from "next/cache";

const PLACEHOLDER_BOOKS = [
  {
    id: "book-01",
    slug: "the-sleepy-little-star",
    title: "The Sleepy Little Star",
    ageGroup: "Ages 2–5",
    theme: "Bedtime",
    occasion: "Everyday",
    coverImage: null,
    priceFrom: 89900,
    featured: true,
    published: true,
  },
  {
    id: "book-02",
    slug: "the-cosmic-adventure",
    title: "The Cosmic Adventure",
    ageGroup: "Ages 5–8",
    theme: "Adventure",
    occasion: "Birthday",
    coverImage: null,
    priceFrom: 99900,
    featured: true,
    published: true,
  },
  {
    id: "book-03",
    slug: "the-magic-in-my-name",
    title: "The Magic in My Name",
    ageGroup: "Ages 3–7",
    theme: "Fantasy",
    occasion: "Birthday",
    coverImage: null,
    priceFrom: 109900,
    featured: true,
    published: true,
  },
  {
    id: "book-04",
    slug: "grandmas-garden-of-stories",
    title: "Grandma's Garden of Stories",
    ageGroup: "All ages",
    theme: "Family",
    occasion: "Grandparents",
    coverImage: null,
    priceFrom: 99900,
    featured: false,
    published: true,
  },
  {
    id: "book-05",
    slug: "our-love-story",
    title: "Our Love Story",
    ageGroup: "Adults",
    theme: "Romance",
    occasion: "Anniversary",
    coverImage: null,
    priceFrom: 119900,
    featured: false,
    published: true,
  },
  {
    id: "book-06",
    slug: "the-brave-little-explorer",
    title: "The Brave Little Explorer",
    ageGroup: "Ages 4–8",
    theme: "Adventure",
    occasion: "Everyday",
    coverImage: null,
    priceFrom: 99900,
    featured: true,
    published: true,
  },
  {
    id: "book-07",
    slug: "the-day-we-met",
    title: "The Day We Met",
    ageGroup: "Adults",
    theme: "Romance",
    occasion: "Anniversary",
    coverImage: null,
    priceFrom: 119900,
    featured: true,
    published: true,
  },
];

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
