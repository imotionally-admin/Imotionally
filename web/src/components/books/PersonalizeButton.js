"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import styles from "./PersonalizeButton.module.css";

export default function PersonalizeButton() {
  const toast = useToast();
  const [stoppedAtFooter, setStoppedAtFooter] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("book-page-end");
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setStoppedAtFooter(
        entry.isIntersecting || entry.boundingClientRect.top < 0,
      );
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.personalize} ${stoppedAtFooter ? styles.stopped : ""}`}>
      <Button
        arrow={false}
        fullWidth
        onClick={() => toast.info("Book personalization is coming soon.")}
      >
        Personalize my book
      </Button>
    </div>
  );
}
