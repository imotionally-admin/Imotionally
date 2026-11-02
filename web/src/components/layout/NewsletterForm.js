"use client";

import { useId, useState } from "react";
import Icon from "@/components/ui/Icon";
import { useToast } from "@/context/ToastContext";
import { isValidEmail } from "@/lib/validation/email";
import styles from "./NewsletterForm.module.css";

export default function NewsletterForm() {
  const toast = useToast();
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setEmail("");
    toast.info("Newsletter signup is opening soon. Thanks for your interest!");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId} className="visually-hidden">
        Email address
      </label>
      <div className={styles.row}>
        <input
          id={inputId}
          type="email"
          name="email"
          className={styles.input}
          placeholder="Enter your email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={error ? true : undefined}
        />
        <button type="submit" className={styles.submit} aria-label="Subscribe">
          <Icon name="arrow" size="sm" />
        </button>
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}