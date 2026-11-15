import SectionHeader from "@/components/ui/SectionHeader";
import { STEPS } from "@/lib/content/home";
import styles from "./Steps.module.css";

const STEP_ICONS = {
  character: (
    <>
      <path d="M5.3 8.1c1-.7 2.3-.4 2.9.6l2.1 3.7c1.2 2.1 3.5 3.4 5.7 3.4s4.5-1.3 5.7-3.4l2.1-3.7c.6-1 1.9-1.3 2.9-.6s1.3 1.9.7 2.9l-2.1 3.7c-1.3 2.3-3.2 4.1-5.3 5.2V31h-8V19.9c-2.1-1.1-4-2.9-5.3-5.2l-2.1-3.7c-.6-1-.3-2.3.7-2.9Z" />
      <circle cx="16" cy="10.5" r="5.1" />
    </>
  ),
  cover: (
    <>
      <path d="m8.2 6.5 14.6-1.4a1.2 1.2 0 0 1 1.3 1.1l1.5 19.2a1.2 1.2 0 0 1-1.1 1.3L10 28.1a1.2 1.2 0 0 1-1.3-1.1L7.1 7.8a1.2 1.2 0 0 1 1.1-1.3Z" />
      <path d="M16.1 22.1 12 18.4c-3.1-2.8-1.1-7.5 2.4-7.5 1.2 0 2.2.6 2.9 1.5.7-.9 1.7-1.5 2.9-1.5 3.5 0 5.5 4.7 2.4 7.5l-4.1 3.7a1.8 1.8 0 0 1-2.4 0Z" fill="var(--color-a102)" />
    </>
  ),
  message: (
    <path
      d="M4.6 7.2c4.6-1.2 9.1-.9 13.4.8v18c-4.3-1.7-8.8-2-13.4-.8V7.2Zm13.4.8c4.3-1.7 8.8-2 13.4-.8v18c-4.6-1.2-9.1-.9-13.4.8V8Zm-10.7 3.1c2.7-.5 5.3-.3 7.8.5m-7.8 3.2c2.7-.5 5.3-.3 7.8.5m-7.8 3.2c2.7-.5 5.3-.3 7.8.5"
      fill="none"
      stroke="var(--color-a102)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  ),
  review: (
    <path d="M7.2 15.5h4.2l3.5-4c.8-.9 1-2.2 1.1-3.5.1-1 .9-1.8 1.9-1.8 1.1 0 1.9.9 1.8 2l-.4 4.3h5.3c1.2 0 2.2 1 2.2 2.2 0 .7-.3 1.3-.8 1.7 1.2.7 1.3 2.4.1 3.3.7 1.1.1 2.6-1.1 3 .3 1.3-.7 2.5-2 2.5h-7.5c-1.1 0-2.2-.3-3.1-.9l-2.2-1.3H7.2v-7.5Z" />
  ),
};

function StepIcon({ type }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 32 32"
      role="presentation"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="var(--color-p101)" />
      <g fill="var(--color-a102)">{STEP_ICONS[type]}</g>
    </svg>
  );
}

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