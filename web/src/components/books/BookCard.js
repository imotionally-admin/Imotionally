import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaFrame from "@/components/ui/MediaFrame";
import { formatPrice } from "@/utils/formatPrice";
import styles from "./BookCard.module.css";

const TAG_VARIANTS = ["primary", "secondary", "tertiary"];
const COVER_SIZES = "(min-width: 75em) 25vw, (min-width: 40em) 45vw, 100vw";

export default function BookCard({ book }) {
  const href = `/books/${book.slug}`;
  const tags = [book.ageGroup, book.theme, book.occasion].filter(Boolean);

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.coverLink} tabIndex={-1} aria-hidden="true">
        <MediaFrame src={book.coverImage} ratio="cover" label={book.title} sizes={COVER_SIZES} className={styles.cover} />
      </Link>
      <div className={styles.body}>
        <ul role="list" className={styles.tags}>
          {tags.map((tag, index) => (
            <li key={tag}>
              <Badge variant={TAG_VARIANTS[index % TAG_VARIANTS.length]}>{tag}</Badge>
            </li>
          ))}
        </ul>
        <h3 className={styles.title}>
          <Link href={href} className={styles.titleLink}>
            {book.title}
          </Link>
        </h3>
        <p className={styles.description}>{book.description}</p>
        <div className={styles.footer}>
          <p className={styles.price}>
            <span className={styles.from}>From</span> {formatPrice(book.priceFrom)}
          </p>
          <Button href={href} size="sm">
            Personalize
          </Button>
        </div>
      </div>
    </article>
  );
}