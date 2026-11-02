import Link from "next/link";
import Icon from "./Icon";
import Spinner from "./Spinner";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  href,
  loading = false,
  fullWidth = false,
  arrow = true,
  className = "",
  type = "button",
  disabled = false,
  ...rest
}) {
  const classes = [styles.button, styles[variant], fullWidth ? styles.full : "", className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <Spinner size="sm" label="" />}
      <span>{children}</span>
      {arrow && !loading && <Icon name="arrow" size="sm" className={styles.arrow} />}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}