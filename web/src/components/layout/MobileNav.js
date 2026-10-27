"use client";

import Link from "next/link";
import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import styles from "./MobileNav.module.css";

export default function MobileNav({ id, open, onClose, links }) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div id={id} className={`${styles.root} ${open ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.scrim}
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
      />
      <nav className={styles.drawer} aria-label="Mobile">
        <div className={styles.top}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
        <ul role="list" className={styles.list}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link} onClick={onClose}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <Button href="/login" fullWidth onClick={onClose}>
            Log in
          </Button>
        </div>
      </nav>
    </div>
  );
}