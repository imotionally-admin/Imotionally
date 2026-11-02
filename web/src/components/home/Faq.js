import Accordion from "@/components/ui/Accordian";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/lib/content/home";

export default function Faq() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <SectionHeader id="faq-title" title={<strong className="hl">FAQ&apos;s</strong>} />
        <div className="reveal">
          <Accordion items={FAQS} defaultOpenId={FAQS[0].id} />
        </div>
      </div>
    </section>
  );
}