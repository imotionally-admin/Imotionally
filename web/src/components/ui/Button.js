import Link from "next/link";
import Spinner from "./Spinner";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  loading = false,
  fullWidth = false,
  className = "",
  type = "button",
  disabled = false,
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
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
      {loading && <Spinner size="sm" label="" />}
      {children}
    </button>
  );
}