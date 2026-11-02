import Carousel from "@/components/ui/Carousel";
import Icon from "@/components/ui/Icon";
import { REVIEWS } from "@/lib/content/home";
import styles from "./Reviews.module.css";

const STAR_COUNT = 5;

export default function Reviews() {
  return (
    <section className="section" aria-labelledby="reviews-title">
      <div className="container">
        <Carousel
          id="reviews-title"
          title={
            <>
              Loved by <strong className="hl">people like you</strong>
            </>
          }
          label="Customer reviews"
          size="lg"
        >
          {REVIEWS.map((review) => (
            <li key={review.name}>
              <figure className={styles.card}>
                <blockquote className={styles.quote}>
                  <p>{review.text}</p>
                </blockquote>
                <figcaption className={styles.footer}>
                  <div className={styles.reviewer}>
                    <span className={styles.avatar} aria-hidden="true">
                      <Icon name="user" size="sm" />
                    </span>
                    <span className={styles.name}>{review.name}</span>
                  </div>
                  <span
                    className={styles.stars}
                    role="img"
                    aria-label={`${review.rating} out of ${STAR_COUNT} stars`}
                  >
                    {Array.from({ length: STAR_COUNT }, (_, index) => (
                      <Icon
                        key={index}
                        name="star"
                        size="sm"
                        className={index < review.rating ? styles.starOn : styles.starOff}
                      />
                    ))}
                  </span>
                  <span className={styles.source}>Google review</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}