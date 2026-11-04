import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";
import { AUDIENCES } from "@/lib/content/home";
import styles from "./WhoFor.module.css";

export default function WhoFor() {
  return (
    <section className="section" aria-labelledby="who-title">
      <div className="container">
        <Carousel
          id="who-title"
          title={
            <>
              Who&apos;s <strong className="hl">it for?</strong>
            </>
          }
          label="Who is it for"
          align="center"
        >
          {AUDIENCES.map((audience) => (
            <li key={audience.label}>
              <Link href="/books" className={styles.frame}>
                <Image
                  src={audience.image}
                  alt=""
                  fill
                  sizes="(min-width: 75em) 22vw, (min-width: 40em) 40vw, 75vw"
                  className={styles.image}
                />
                <span className={styles.label}>{audience.label}</span>
              </Link>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}