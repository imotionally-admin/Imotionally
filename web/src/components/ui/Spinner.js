import styles from "./Spinner.module.css";

export default function Spinner({ size = "md", label = "Loading" }) {
  return (
    <span
      className={`${styles.spinner} ${styles[size]}`}
      role={label ? "status" : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label && <span className="visually-hidden">{label}</span>}
    </span>
  );
}