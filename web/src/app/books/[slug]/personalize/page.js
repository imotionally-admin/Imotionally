import { Suspense } from "react";
import { notFound } from "next/navigation";
import PersonalizationWizard from "@/components/personalization/PersonalizationWizard";
import {
  getBookManifest,
  getPersonalizableBookSlugs,
} from "@/lib/books/repository";

export async function generateStaticParams() {
  return getPersonalizableBookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = getBookManifest(slug);

  return book ? { title: `Personalize ${book.title}` } : {};
}

export default function PersonalizeBookPage({ params }) {
  return (
    <Suspense fallback={null}>
      <PersonalizeBookPageContent params={params} />
    </Suspense>
  );
}

async function PersonalizeBookPageContent({ params }) {
  const { slug } = await params;
  const book = getBookManifest(slug);

  if (!book) {
    notFound();
  }

  return <PersonalizationWizard book={book} />;
}
