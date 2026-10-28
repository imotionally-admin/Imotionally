import Accordion from "@/components/ui/Accordian";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/lib/content/home";

export default function Faq() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <SectionHeader id="faq-title" title="Frequently Asked Questions" />
        <div className="reveal">
          <Accordion items={FAQS} defaultOpenId="printing" />
        </div>
      </div>
    </section>
  );
}