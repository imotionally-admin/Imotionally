import Image from "next/image";
import Button from "@/components/ui/Button";
import { SHOWCASE_IMAGE } from "@/lib/content/home";
import styles from "./Showcase.module.css";

export default function Showcase() {
  return (
    <section className={styles.showcase} aria-labelledby="showcase-title">
      <div className={styles.media}>
        <Image src={SHOWCASE_IMAGE} alt="" fill sizes="(min-width: 56em) 50vw, 100vw" className={styles.image} />
      </div>
      <div className={styles.panel}>
        <div className={styles.content}>
          <h1 id="showcase-title">A Book that no one in the world has</h1>
          <p className="lead">
            Because it has their name on the cover and your words inside, it&apos;s truly one of a kind.
          </p>
          <Button href="/books">Explore our Books</Button>
        </div>
      </div>
    </section>
  );
}