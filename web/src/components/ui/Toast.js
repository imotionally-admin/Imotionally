import Icon from "./Icon";
import styles from "./Toast.module.css";

const ICON_BY_TYPE = { success: "check", error: "alert", info: "info" };

export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className={styles.viewport} aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role={toast.type === "error" ? "alert" : "status"}
        >
          <Icon name={ICON_BY_TYPE[toast.type]} />
          <p className={styles.message}>{toast.message}</p>
          <button
            type="button"
            className={styles.close}
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            <Icon name="close" size="sm" />
          </button>
        </div>
      ))}
    </div>
  );
}