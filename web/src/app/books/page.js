import { Suspense } from "react";
import BooksCatalog from "@/components/books/BooksCatalog";
import WhoFor from "@/components/home/WhoFor";
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
      <WhoFor
        title={
          <>
            Who is <strong className="hl">this Book</strong> for?
          </>
        }
        subtitle="Pick a story. Add their name. Give them a memory."
      />
    </>
  );
}
