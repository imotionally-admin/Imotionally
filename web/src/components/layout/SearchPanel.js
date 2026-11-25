"use client";

import { useEffect, useRef } from "react";
import Icon from "@/components/ui/Icon";
import BrandLogo from "@/components/ui/BrandLogo";
import styles from "./SearchPanel.module.css";

const SUGGESTED_SEARCHES = ["where", "christmas", "grandma", "mother", "birthday"];
const POPULAR_BOOKS = [
  "Lorem Ipsum One",
  "Dolor Sit Two",
  "Amet Elit Three",
  "Sed Do Four",
];

export default function SearchPanel({ id, open, onClose }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      id={id}
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="store-search-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <h1 id="store-search-title" className="visually-hidden">
          Search our store
        </h1>
        <div className={styles.toolbar}>
          <form className={styles.searchForm} onSubmit={(event) => event.preventDefault()}>
            <Icon name="search" className={styles.leadingIcon} />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search our store"
              aria-label="Search our store"
            />
            <button type="submit" className={styles.submit} aria-label="Search" disabled>
              <Icon name="search" />
            </button>
          </form>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close search"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className={styles.content}>
          <section aria-labelledby="suggested-searches-title">
            <h2 id="suggested-searches-title" className={styles.sectionTitle}>
              Suggested searches
            </h2>
            <ul className={styles.suggestions} role="list">
              {SUGGESTED_SEARCHES.map((search) => (
                <li key={search}>
                  <span className={styles.suggestion}>{search}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="popular-books-title">
            <h2 id="popular-books-title" className={styles.sectionTitle}>
              Popular books
            </h2>
            <ul className={styles.popularBooks} role="list">
              {POPULAR_BOOKS.map((book) => (
                <li key={book}>{book}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </dialog>
  );
}
