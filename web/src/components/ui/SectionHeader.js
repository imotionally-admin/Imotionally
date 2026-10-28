import styles from "./SectionHeader.module.css";

export default function SectionHeader({ id, title, subtitle, align = "center", as: Heading = "h2", children }) {
  return (
    <div className={`${styles.header} ${styles[align]} reveal`}>
      <div className={styles.text}>
        <Heading id={id} className={styles.title}>
          {title}
        </Heading>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {children && <div className={styles.extra}>{children}</div>}
    </div>
  );
}