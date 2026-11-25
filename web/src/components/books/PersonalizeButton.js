"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import styles from "./PersonalizeButton.module.css";

export default function PersonalizeButton() {
  const toast = useToast();
  const personalizeRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const price = document.getElementById("book-price");
    if (!price) return;

    let fixedHeight = 0;

    function setStopped(stopped) {
      const element = personalizeRef.current;
      if (!element || element.classList.contains(styles.stopped) === stopped) return;

      const currentTop = element.getBoundingClientRect().top;
      animationRef.current?.cancel();
      element.classList.toggle(styles.stopped, stopped);
      const targetTop = element.getBoundingClientRect().top;
      const offset = currentTop - targetTop;

      if (Math.abs(offset) > 1) {
        animationRef.current = element.animate(
          [{ transform: `translateY(${offset}px)` }, { transform: "translateY(0)" }],
          { duration: 140, easing: "ease-out" },
        );
      }
    }

    function measureFixedHeight(element) {
      const wasStopped = element.classList.contains(styles.stopped);
      if (wasStopped) element.classList.remove(styles.stopped);
      const height = element.getBoundingClientRect().height;
      if (wasStopped) element.classList.add(styles.stopped);
      return height;
    }

    function updatePosition(remeasure = false) {
      const element = personalizeRef.current;
      if (!element) return;

      if (!window.matchMedia("(max-width: 39.999em)").matches) {
        setStopped(false);
        return;
      }

      const isStopped = element.classList.contains(styles.stopped);
      if (!isStopped || remeasure) {
        fixedHeight = measureFixedHeight(element);
      }

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const priceTop = price.getBoundingClientRect().top;
      setStopped(priceTop <= viewportHeight - fixedHeight);
    }

    function handleResize() {
      updatePosition(true);
    }

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => {
      animationRef.current?.cancel();
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", updatePosition);
    };
  }, []);

  return (
    <div
      ref={personalizeRef}
      className={styles.personalize}
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
