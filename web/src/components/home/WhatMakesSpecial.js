import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";
import { FEATURES } from "@/lib/content/home";
import styles from "./WhatMakesSpecial.module.css";

export default function WhatMakesSpecial() {
  return (
    <section id="about" className="section section--white" aria-labelledby="special-title">
      <div className="container">
        <SectionHeader
          id="special-title"
          align="split"
          title={
            <>
              What makes <strong className="hl">it special</strong>?
            </>
          }
        >
        </SectionHeader>

        <ul role="list" className={styles.grid}>
          {FEATURES.map((feature) => (
            <li key={feature.title} className="reveal">
              <article className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={feature.icon} size="lg" />
                </span>
                <div className={styles.content}>
                  <h3 className={styles.title}>{feature.title}</h3>
                  <p className={styles.text}>{feature.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}