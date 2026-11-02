import SectionHeader from "@/components/ui/SectionHeader";
import { STEPS } from "@/lib/content/home";
import styles from "./Steps.module.css";

export default function Steps() {
  return (
    <section
      id="how-it-works"
      className={`section ${styles.section}`}
      aria-labelledby="steps-title"
    >
      <div className="container">
        <SectionHeader
          id="steps-title"
          title={
            <>
              Create your Book in <strong className="hl">4 easy steps</strong>
            </>
          }
        />
      </div>
      <div className={styles.band}>
        <ol role="list" className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={`${styles.step} reveal`}>
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}