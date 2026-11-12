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
      <BooksCatalog books={books} />
      <WhoFor
        title={
          <>
            Who is this <strong className="hl">Book</strong> for?
          </>
        }
        subtitle="Pick a story. Add their name. Give them a memory."
      />
    </>
  );
}
