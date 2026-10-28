import SectionHeader from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/content/home";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className="section section--tint" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeader
          id="testimonials-title"
          title="Loved by Parents & Children"
          subtitle="Read honest experiences from families who cherish their personalized storybooks."
        />
        <ul role="list" className={styles.grid}>
          {TESTIMONIALS.map((item) => (
            <li key={item.name} className="reveal">
              <figure className={styles.card}>
                <blockquote className={styles.quote}>
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className={styles.author}>
                  <span className={styles.avatar} aria-hidden="true">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <strong className={styles.name}>{item.name}</strong>
                    <span className={styles.role}>{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}