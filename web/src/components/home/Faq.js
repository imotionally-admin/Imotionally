import Accordion from "@/components/ui/Accordian";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/lib/content/home";
import styles from "./Faq.module.css";

export default function Faq() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className={`container ${styles.container}`}>
        <SectionHeader id="faq-title" title={<strong className="hl">FAQ&apos;s</strong>} />
        <div className="reveal">
          <Accordion items={FAQS} defaultOpenId={FAQS[0].id} />
        </div>
      </div>
    </section>
  );
}