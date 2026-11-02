import Hero from "@/components/home/Hero";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import WhatMakesSpecial from "@/components/home/WhatMakesSpecial";
import WhoFor from "@/components/home/WhoFor";
import Showcase from "@/components/home/Showcase";
import ForOccasions from "@/components/home/ForOccasions";
import Steps from "@/components/home/Steps";
import Reviews from "@/components/home/Reviews";
import StoryCta from "@/components/home/StoryCta";
import Faq from "@/components/home/Faq";
import { getFeaturedBooks } from "@/lib/data/books";

export const metadata = {
  title: "Personalized Storybooks for Every Age",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const featured = await getFeaturedBooks(4);

  return (
    <>
      <Hero />
      <FeaturedBooks books={featured} />
      <WhatMakesSpecial />
      <WhoFor />
      <Showcase />
      <ForOccasions />
      <Steps />
      <Reviews />
      <StoryCta />
      <Faq />
    </>
  );
}