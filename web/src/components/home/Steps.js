import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import { BOOK_STEPS, STEPS } from "@/lib/content/home";
import styles from "./Steps.module.css";

const STEP_ICONS = {
  character: "/1.png",
  cover: "/2.png",
  message: "/3.png",
  review: "/4.png",
};

function StepIcon({ type, variant }) {
  if (variant === "book") {
    return (
      <span className={styles.bookIcon}>
        <Icon name={type} size="lg" />
      </span>
    );
  }

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

export default function Steps({ variant = "home" }) {
  const isBookVariant = variant === "book";
  const steps = isBookVariant ? BOOK_STEPS : STEPS;

  return (
    <section
      id="how-it-works"
      className={`${styles.section} ${isBookVariant ? styles.bookSection : ""}`}
      aria-labelledby="steps-title"
    >
      <div className="container">
        <SectionHeader
          id="steps-title"
          className={isBookVariant ? styles.bookHeader : ""}
          title={isBookVariant
            ? "How Imotionally Books Are Made"
            : <>Create your book in <strong className="hl">4 easy steps</strong></>}
        />
      </div>
      <div className={styles.band}>
        <ol role="list" className={styles.steps}>
          {steps.map((step) => (
            <li key={step.title} className={`${styles.step} reveal`}>
              <StepIcon type={step.icon} variant={variant} />
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