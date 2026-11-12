import Link from "next/link";
import MediaFrame from "@/components/ui/MediaFrame";
import { formatPrice } from "@/utils/formatPrice";
import styles from "./BookCard.module.css";

const COVER_SIZES = "(min-width: 75em) 25vw, (min-width: 40em) 45vw, 100vw";

export default function BookCard({ book }) {
  const href = `/books/${book.slug}`;

  return (
    <Link href={href} className={styles.cardLink}>
      <article className={styles.card}>
        <MediaFrame
          src="/CoverBook.jpg"
          ratio="square"
          label={book.title}
          sizes={COVER_SIZES}
          className={styles.cover}
        />
        <div className={styles.body}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.description}>{book.description}</p>
          <div className={styles.footer}>
            <p className={styles.price}>
              <span className={styles.from}>From</span> {formatPrice(book.priceFrom)}
            </p>
            <span className={styles.button}>Personalize</span>
          </div>
        </div>
      </article>
    </Link>
  );
}