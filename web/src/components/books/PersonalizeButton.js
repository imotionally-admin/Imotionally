"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import styles from "./PersonalizeButton.module.css";

export default function PersonalizeButton() {
  const toast = useToast();
  const [stoppedAtFaq, setStoppedAtFaq] = useState(false);
  const personalizeRef = useRef(null);

  useEffect(() => {
    const faq = document.getElementById("product-faqs");
    if (!faq) return;

    function updatePosition() {
      if (!window.matchMedia("(max-width: 39.999em)").matches || window.scrollY === 0) {
        setStoppedAtFaq(false);
        return;
      }

      const faqTop = faq.getBoundingClientRect().top;
      const buttonHeight = personalizeRef.current?.getBoundingClientRect().height ?? 0;
      setStoppedAtFaq(faqTop <= window.innerHeight - buttonHeight);
    }

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <div
      ref={personalizeRef}
      className={`${styles.personalize} ${stoppedAtFaq ? styles.stopped : ""}`}
    >
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
