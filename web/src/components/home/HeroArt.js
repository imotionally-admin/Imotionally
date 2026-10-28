import styles from "./HeroArt.module.css";

const SPARKLE = "M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4Z";
const BOOK_LEFT = "M0 15 L70 0 L70 72 L0 87Z";
const BOOK_RIGHT = "M70 0 L140 15 L140 87 L70 72Z";

export default function HeroArt() {
  return (
    <svg
      viewBox="0 0 400 320"
      className={styles.art}
      role="img"
      aria-label="A smiling heart character surrounded by open storybooks and stars"
    >
      <ellipse className={styles.ground} cx="200" cy="292" rx="160" ry="18" />

      <g className={styles.bookA}>
        <g transform="translate(10 190)">
          <path className={styles.page} d={BOOK_LEFT} />
          <path className={styles.page} d={BOOK_RIGHT} />
        </g>
      </g>

      <g className={styles.bookB}>
        <g transform="translate(250 150) scale(0.8)">
          <path className={styles.pageAlt} d={BOOK_LEFT} />
          <path className={styles.pageAlt} d={BOOK_RIGHT} />
        </g>
      </g>

      <g className={styles.float}>
        <path
          className={styles.heart}
          d="M200 250 C90 170 105 70 165 70 C185 70 200 85 200 100 C200 85 215 70 235 70 C295 70 310 170 200 250Z"
        />
        <circle className={styles.eye} cx="175" cy="135" r="7" />
        <circle className={styles.eye} cx="225" cy="135" r="7" />
        <path className={styles.smile} d="M178 165 Q200 190 222 165" />
        <circle className={styles.cheek} cx="158" cy="158" r="9" />
        <circle className={styles.cheek} cx="242" cy="158" r="9" />
      </g>

      <path className={styles.sparkle} d={SPARKLE} transform="translate(330 70)" />
      <path className={styles.sparkleAlt} d={SPARKLE} transform="translate(65 85) scale(0.7)" />
      <path className={styles.sparkleAlt} d={SPARKLE} transform="translate(355 190) scale(0.5)" />
    </svg>
  );
}