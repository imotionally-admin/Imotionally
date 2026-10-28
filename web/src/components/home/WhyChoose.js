import Icon from "@/components/ui/Icon";
import MediaFrame from "@/components/ui/MediaFrame";
import { WHY_CHOOSE_POINTS } from "@/lib/content/home";
import styles from "./WhyChoose.module.css";

export default function WhyChoose() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className={`container ${styles.grid}`}>
        <div className="reveal">
          <MediaFrame ratio="landscape" label="Emotional book showcase" className={styles.media} />
        </div>
        <div className={`${styles.content} reveal`}>
          <h2 id="why-title">Why Choose an Imotionally Storybook?</h2>
          <p className={styles.intro}>
            Unlike generic children&apos;s books, Imotionally stories place your child directly at the center
            of the narrative. We combine high-quality printing standards with emotionally intelligent stories
            that make every reading session meaningful.
          </p>
          <ul role="list" className={styles.points}>
            {WHY_CHOOSE_POINTS.map((point) => (
              <li key={point.title} className={styles.point}>
                <span className={styles.check} aria-hidden="true">
                  <Icon name="check" size="sm" />
                </span>
                <div>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointText}>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}