"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import styles from "./Carousel.module.css";

export default function Carousel({
  id,
  title,
  subtitle,
  label,
  align = "left",
  size = "md",
  children,
}) {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const maxScroll = node.scrollWidth - node.clientWidth;
    setEdges({ start: node.scrollLeft <= 1, end: node.scrollLeft >= maxScroll - 1 });
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(node);
    return () => observer.disconnect();
  }, [updateEdges]);

  function scrollByItem(direction) {
    const node = trackRef.current;
    if (!node?.firstElementChild) return;
    const gap = parseFloat(getComputedStyle(node).columnGap) || 0;
    const step = node.firstElementChild.getBoundingClientRect().width + gap;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div
      className={`${styles.carousel} ${styles[size]}`}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={id}
    >
      <div className={`${styles.header} ${align === "center" ? styles.center : ""}`}>
        {align === "center" && <span aria-hidden="true" />}
        <div className={styles.text}>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollByItem(-1)}
            disabled={edges.start}
            aria-label="Previous"
          >
            <Icon name="arrow-left" size="sm" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollByItem(1)}
            disabled={edges.end}
            aria-label="Next"
          >
            <Icon name="arrow" size="sm" />
          </button>
        </div>
      </div>
      <ul role="list" ref={trackRef} className={styles.track} tabIndex={0} aria-label={label} onScroll={updateEdges}>
        {children}
      </ul>
    </div>
  );
}