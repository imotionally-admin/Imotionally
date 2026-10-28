import Image from "next/image";
import Icon from "./Icon";
import styles from "./MediaFrame.module.css";

export default function MediaFrame({
  src,
  alt = "",
  ratio = "landscape",
  label,
  sizes,
  priority = false,
  className = "",
}) {
  return (
    <div className={`${styles.frame} ${styles[ratio]} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>
          <Icon name="heart" size="lg" />
          {label && <span className={styles.label}>{label}</span>}
        </div>
      )}
    </div>
  );
}