import Hero from "@/components/home/Hero";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import Newsletter from "@/components/home/Newsletter";
import { getFeaturedBooks, getPublishedBooks } from "@/lib/data/books";

export const metadata = {
  title: "Personalized Storybooks for Every Age",
  alternates: { canonical: "/" },
};


export default async function Home() {
  const [featured, allBooks] = await Promise.all([getFeaturedBooks(3), getPublishedBooks()]);

  return (
    <>
      <Hero />
      <FeaturedBooks books={featured} totalCount={allBooks.length} />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <Faq />
      <Newsletter />
    </>
  );
}