import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { STEPS } from "@/lib/content/home";
import styles from "./Steps.module.css";

const STEP_ICONS = {
  character: "/1.png",
  cover: "/2.png",
  message: "/3.png",
  review: "/4.png",
};

function StepIcon({ type }) {
  return (
    <Image
      src={STEP_ICONS[type]}
      className={styles.icon}
      width={64}
      height={64}
      unoptimized
      aria-hidden="true"
      alt=""
    />
  );
}

export default function Steps() {
  return (
    <section
      id="how-it-works"
      className={styles.section}
      aria-labelledby="steps-title"
    >
      <div className="container">
        <SectionHeader
          id="steps-title"
          title={
            <>
              Create your book in <strong className="hl">4 easy steps</strong>
            </>
          }
        />
      </div>
      <div className={styles.band}>
        <ol role="list" className={styles.steps}>
          {STEPS.map((step) => (
            <li key={step.title} className={`${styles.step} reveal`}>
              <StepIcon type={step.icon} />
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