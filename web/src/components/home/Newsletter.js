"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";
import { isValidEmail } from "@/lib/validation/email";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const toast = useToast();
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
    <section className="section section--soft" aria-labelledby="newsletter-title">
      <div className={`container container--narrow ${styles.inner} reveal`}>
        <span className={styles.icon} aria-hidden="true">
          <Icon name="mail" size="lg" />
        </span>
        <h2 id="newsletter-title">Join the Imotionally Family</h2>
        <p className={styles.text}>
          Get 10% off your first order, plus updates on new storybook releases, parenting tips and special
          Pitara Studio promotions.
        </p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            className={styles.field}
            type="email"
            name="email"
            label="Email address"
            hideLabel
            placeholder="Enter your email address"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={error}
          />
          <Button type="submit">Subscribe</Button>
        </form>
        <p className={styles.fine}>We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  );
}