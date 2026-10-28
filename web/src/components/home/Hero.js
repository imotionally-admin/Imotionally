import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import HeroArt from "./HeroArt";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <Badge variant="tertiary" className={styles.badge}>
            <Icon name="heart" size="sm" />
            Personalized stories &amp; gifts for every age
          </Badge>
          <h1 id="hero-title" className={styles.title}>
            Give someone a story where they are the hero
          </h1>
          <p className={styles.lead}>
            Beautifully crafted, deeply personalized storybooks for kids and adults. Celebrate birthdays,
            anniversaries, milestones and every relationship that matters.
          </p>
          <div className={styles.actions}>
            <Button href="/books" size="lg">
              Explore All Stories
            </Button>
            <Button href="#how-it-works" variant="outline" size="lg">
              See How It Works
            </Button>
          </div>
        </div>
        <div className={styles.art}>
          <HeroArt />
        </div>
      </div>
    </section>
  );
}