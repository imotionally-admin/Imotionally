"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import styles from "./BookGallery.module.css";

const FALLBACK_IMAGES = [{ src: "/CoverBook.jpg", alt: "Book cover preview" }];

export default function BookGallery({ title, images = FALLBACK_IMAGES }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const galleryImages = images.length ? images : FALLBACK_IMAGES;
  const currentImage = galleryImages[activeIndex] ?? galleryImages[0];

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % galleryImages.length);
  }

  return (
    <>
      <div className={styles.gallery}>
        <ul className={styles.thumbnails} aria-label="Book preview images">
          {galleryImages.map((image, index) => (
            <li key={`${image.src}-${index}`}>
              <button
                type="button"
                className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
                aria-label={`View image ${index + 1} of ${galleryImages.length}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 40em) 18vw, 4.5rem"
                  className={styles.thumbnailImage}
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
              alt={currentImage.alt || `${title} book preview, image ${activeIndex + 1} of ${galleryImages.length}`}
              fill
              loading="eager"
              sizes="(min-width: 56em) 42vw, 100vw"
              src={currentImage.src}
              className={styles.coverImage}
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
            {galleryImages.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
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
            src={currentImage.src}
            alt={`${currentImage.alt || title} enlarged`}
            fill
            sizes="(min-width: 56em) 38rem, 90vw"
            className={styles.coverImage}
          />
        </div>
      </Modal>
    </>
  );
}
