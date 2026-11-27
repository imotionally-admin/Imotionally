import SARA_BOOK from "@/content/books/sara-and-the-little-fairy/book";

const BOOKS = [SARA_BOOK];

export function getCatalogBooks() {
  return BOOKS.map((book) => ({
    id: book.id,
    slug: book.slug,
    title: book.title,
    description: book.description,
    ageGroup: book.ageGroup,
    recipients: book.recipients,
    theme: book.theme,
    occasions: book.occasions,
    priceFrom: book.priceFrom,
    coverImage: book.coverImage,
    galleryImages: book.galleryImages,
    featured: book.featured,
    published: book.published,
  }));
}

export function getBookManifest(slug) {
  return BOOKS.find((book) => book.slug === slug) ?? null;
}

export function getPersonalizableBookSlugs() {
  return BOOKS.map((book) => book.slug);
}
