import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          
          <h1 id="hero-title" className={styles.title}>
            Give someone a story where they are the hero
          </h1>
          <p className={`lead ${styles.lead}`}>
            Beautifully crafted, deeply personalized storybooks for kids and adults. <br/> Celebrate
            birthdays, anniversaries, milestones and <strong className="hl"> every relationship <br/> that matters.</strong>
          </p>
          <div className={styles.actions}>
            <Button href="/books" arrow={false}>
              Explore all stories
            </Button>
            <Button href="/#how-it-works" variant="ghost" arrow={false}>
              See how it works
            </Button>
          </div>
        </div>
        <div className={styles.mediaWrap}>
          <Image
            src="/herobg.webp"
            alt="A mother reading a personalized storybook to her child"
            width={626}
            height={398}
            priority
            sizes="(min-width: 56em) 50vw, 100vw"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}