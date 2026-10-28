import SectionHeader from "@/components/ui/SectionHeader";
import { HOW_IT_WORKS_STEPS } from "@/lib/content/home";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section--tint" aria-labelledby="how-it-works-title">
      <div className="container">
        <SectionHeader
          id="how-it-works-title"
          title="How Personalization Works"
          subtitle="Creating a custom storybook only takes a few minutes, and the result lasts a lifetime."
        />
        <ol role="list" className={styles.steps}>
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li key={step.title} className={`${styles.step} reveal`}>
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}