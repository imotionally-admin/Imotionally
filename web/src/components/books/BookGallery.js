"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import styles from "./BookGallery.module.css";

const COVER_IMAGE = "/CoverBook.jpg";
const IMAGE_POSITIONS = ["75% 50%", "25% 50%", "50% 50%", "50% 25%", "50% 75%"];

export default function BookGallery({ title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imagePosition = IMAGE_POSITIONS[activeIndex];

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + IMAGE_POSITIONS.length) % IMAGE_POSITIONS.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % IMAGE_POSITIONS.length);
  }

  return (
    <>
      <div className={styles.gallery}>
        <ul className={styles.thumbnails} aria-label="Book preview images">
          {IMAGE_POSITIONS.map((position, index) => (
            <li key={position + index}>
              <button
                type="button"
                className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
                aria-label={`View image ${index + 1} of ${IMAGE_POSITIONS.length}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={COVER_IMAGE}
                  alt=""
                  fill
                  sizes="(max-width: 40em) 18vw, 4.5rem"
                  className={styles.thumbnailImage}
                  style={{ objectPosition: position }}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.cover}>
          <button
            type="button"
            className={styles.coverView}
            aria-label={`View larger image of ${title}`}
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={COVER_IMAGE}
              alt={`${title} book preview, image ${activeIndex + 1} of ${IMAGE_POSITIONS.length}`}
              fill
              loading="eager"
              sizes="(min-width: 56em) 42vw, 100vw"
              className={styles.coverImage}
              style={{ objectPosition: imagePosition }}
            />
          </button>

          <button
            type="button"
            className={`${styles.arrow} ${styles.previous}`}
            aria-label="Previous image"
            onClick={showPrevious}
          >
            <Icon name="chevron" />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            aria-label="Next image"
            onClick={showNext}
          >
            <Icon name="chevron" />
          </button>

          <div className={styles.dots} aria-label="Choose image">
            {IMAGE_POSITIONS.map((position, index) => (
              <button
                key={position + index}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal open={lightboxOpen} onClose={() => setLightboxOpen(false)} title={`${title} preview`}>
        <div className={styles.lightboxImage}>
          <Image
            src={COVER_IMAGE}
            alt={`${title} book preview, enlarged`}
            fill
            sizes="(min-width: 56em) 38rem, 90vw"
            className={styles.coverImage}
            style={{ objectPosition: imagePosition }}
          />
        </div>
      </Modal>
    </>
  );
}
