import styles from "./Skeleton.module.css";

export default function Skeleton({ width, height, radius, className = "" }) {
  const style = {};
  if (width) style["--skeleton-width"] = width;
  if (height) style["--skeleton-height"] = height;
  if (radius) style["--skeleton-radius"] = radius;

  return <span className={`${styles.skeleton} ${className}`} style={style} aria-hidden="true" />;
}