import Hero from "@/components/home/Hero";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import Newsletter from "@/components/home/Newsletter";
import { getFeaturedBooks } from "@/lib/data/books";

export const metadata = {
  title: "Imotionally",
  alternates: { canonical: "/" },
};


export default async function Home() {
  const books = await getFeaturedBooks(3);

  return (
    <>
      <Hero />
      <FeaturedBooks books={books} />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <Faq />
      <Newsletter />
    </>
  );
}