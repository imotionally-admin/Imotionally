import { cacheLife, cacheTag } from "next/cache";
import { getCatalogBooks } from "@/lib/books/repository";

export async function getPublishedBooks() {
  "use cache";
  cacheLife("hours");
  cacheTag("books");
  return getCatalogBooks().filter((book) => book.published);
}

export async function getFeaturedBooks(limit = 3) {
  const books = await getPublishedBooks();
  return books.filter((book) => book.featured).slice(0, limit);
}

export async function getBookBySlug(slug) {
  const books = await getPublishedBooks();
  return books.find((book) => book.slug === slug) ?? null;
}
