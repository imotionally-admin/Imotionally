import Image from "next/image";
import styles from "./BrandLogo.module.css";

export default function BrandLogo({ className, priority = false }) {
  return (
    <Image
      src="/logo-transparent.png"
      alt="Imotionally"
      width={397}
      height={108}
      priority={priority}
      className={`${styles.image} ${className ?? ""}`}
    />
  );
}
