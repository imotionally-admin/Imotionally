import Button from "@/components/ui/Button";
import styles from "./StoryCta.module.css";

export default function StoryCta() {
  return (
    <section
      id="story-cta"
      className={`section ${styles.section}`}
      aria-labelledby="cta-title"
    >
      <div className="container">
        <div className={`${styles.box} reveal`}>
          <h2 id="cta-title" className={styles.title}>
            Got your own story? <strong className="hl">Let&apos;s get that illustrated.</strong>
          </h2>
          <Button href="/contact">Get in touch</Button>
        </div>
      </div>
    </section>
  );
}