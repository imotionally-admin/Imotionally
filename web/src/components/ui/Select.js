import { useId } from "react";
import Icon from "./Icon";
import styles from "./Field.module.css";

export default function Select({
  label,
  hint,
  error,
  id,
  options = [],
  placeholder,
  className = "",
  ...rest
}) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const hintId = hint && !error ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = hintId ?? errorId;

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectWrap}>
        <select
          id={selectId}
          className={`${styles.control} ${styles.select}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="chevron" size="sm" className={styles.chevron} />
      </div>
      {hintId && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {errorId && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}