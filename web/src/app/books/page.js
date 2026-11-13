import { Suspense } from "react";
import BooksCatalog from "@/components/books/BooksCatalog";
import StoryCta from "@/components/home/StoryCta";
import { getPublishedBooks } from "@/lib/data/books";

export const metadata = {
  title: "Books",
  alternates: { canonical: "/books" },
};

export default async function BooksPage() {
  const books = await getPublishedBooks();

  return (
    <>
      <Suspense fallback={null}>
        <BooksCatalog books={books} />
      </Suspense>
      <StoryCta />
    </>
  );
}
