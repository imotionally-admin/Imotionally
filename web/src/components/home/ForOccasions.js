import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";
import { OCCASIONS } from "@/lib/content/home";
import styles from "./ForOccasions.module.css";

export default function ForOccasions() {
  return (
    <section className="section" aria-labelledby="occasions-title">
      <div className="container">
        <Carousel
          id="occasions-title"
          title={
            <>
              Stories for <strong className="hl">every occasion</strong>
            </>
          }
          label="Browse occasions"
          align="center"
        >
          {OCCASIONS.map((occasion) => (
            <li key={occasion.label}>
              <Link href="/books" className={styles.frame}>
                <Image
                  src={occasion.image}
                  alt=""
                  fill
                  sizes="(min-width: 75em) 22vw, (min-width: 40em) 40vw, 75vw"
                  className={styles.image}
                />
                <span className={styles.label}>{occasion.label}</span>
              </Link>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
