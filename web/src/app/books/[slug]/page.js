import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBookBySlug, getPublishedBooks } from "@/lib/data/books";

export async function generateStaticParams() {
  const books = await getPublishedBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export default function BookPage({ params }) {
  return (
    <Suspense fallback={null}>
      <BookPageContent params={params} />
    </Suspense>
  );
}

async function BookPageContent({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return <h1>{book.title}</h1>;
}
