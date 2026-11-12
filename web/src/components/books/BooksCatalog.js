"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/books/BookCard";
import { AUDIENCES, OCCASIONS } from "@/lib/content/home";
import styles from "./BooksCatalog.module.css";

const INITIAL_VISIBLE_BOOKS = 9;
const FILTER_GROUPS = [
  {
    key: "recipient",
    label: "By Recipient",
    field: "recipients",
    values: AUDIENCES.map(({ label }) => label),
  },
  {
    key: "occasion",
    label: "By Occasion",
    field: "occasions",
    values: OCCASIONS.map(({ label }) => label),
  },
  { key: "vibe", label: "By Vibe", field: "theme" },
];

const EMPTY_FILTERS = {
  recipient: [],
  occasion: [],
  vibe: [],
};

export default function BooksCatalog({ books }) {
  const searchParams = useSearchParams();
  const selectedRecipient = searchParams.get("recipient");
  const selectedOccasion = searchParams.get("occasion");

  return (
    <BooksCatalogContent
      key={`${selectedRecipient ?? ""}:${selectedOccasion ?? ""}`}
      books={books}
      selectedRecipient={selectedRecipient}
      selectedOccasion={selectedOccasion}
    />
  );
}

function BooksCatalogContent({ books, selectedRecipient, selectedOccasion }) {
  const [filters, setFilters] = useState(() => ({
    ...EMPTY_FILTERS,
    recipient: FILTER_GROUPS[0].values.includes(selectedRecipient) ? [selectedRecipient] : [],
    occasion: FILTER_GROUPS[1].values.includes(selectedOccasion) ? [selectedOccasion] : [],
  }));
  const [sortBy, setSortBy] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_BOOKS);

  const filterGroups = useMemo(
    () =>
      FILTER_GROUPS.map((group) => ({
        ...group,
        values:
          group.values ??
          [...new Set(books.map((book) => book[group.field]).filter(Boolean))].sort((first, second) =>
            first.localeCompare(second),
          ),
      })),
    [books],
  );

  const filteredBooks = useMemo(() => {
    const matchesFilters = books.filter((book) =>
      filterGroups.every((group) => {
        const selected = filters[group.key];
        const value = book[group.field];
        return (
          selected.length === 0 ||
          (Array.isArray(value) ? selected.some((filter) => value.includes(filter)) : selected.includes(value))
        );
      }),
    );

    if (sortBy === "price-ascending") {
      return [...matchesFilters].sort((first, second) => first.priceFrom - second.priceFrom);
    }

    if (sortBy === "price-descending") {
      return [...matchesFilters].sort((first, second) => second.priceFrom - first.priceFrom);
    }

    if (sortBy === "title") {
      return [...matchesFilters].sort((first, second) => first.title.localeCompare(second.title));
    }

    return matchesFilters;
  }, [books, filterGroups, filters, sortBy]);

  function toggleFilter(group, value) {
    setFilters((current) => {
      const selected = new Set(current[group]);
      if (selected.has(value)) selected.delete(value);
      else selected.add(value);

      return { ...current, [group]: [...selected] };
    });
    setVisibleCount(INITIAL_VISIBLE_BOOKS);
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS);
    setVisibleCount(INITIAL_VISIBLE_BOOKS);
  }

  function loadMoreBooks() {
    setVisibleCount((count) => Math.min(count + INITIAL_VISIBLE_BOOKS, filteredBooks.length));
  }

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="books-title">
      <div className="container">
        <h1 id="books-title" className={styles.title}>
          <strong className="hl">Books</strong>
        </h1>

        <div className={styles.catalog}>
          <aside className={styles.filters} aria-label="Filter books">
            <div className={styles.filterHeader}>
              <h2 className={styles.filterHeading}>Filters</h2>
              <button type="button" className={styles.clearButton} onClick={clearFilters}>
                Clear filters
              </button>
            </div>

            {filterGroups.map((group) => (
              <fieldset key={group.key} className={styles.filterGroup}>
                <legend className={styles.filterTitle}>{group.label}</legend>
                <ul role="list" className={styles.filterOptions}>
                  {group.values.map((value) => (
                    <li key={value}>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          checked={filters[group.key].includes(value)}
                          onChange={() => toggleFilter(group.key, value)}
                        />
                        <span>{value}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            ))}
          </aside>

          <div className={styles.results}>
            <div className={styles.toolbar}>
              <label className={styles.sortControl}>
                <span>Sort by</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-ascending">Price: low to high</option>
                  <option value="price-descending">Price: high to low</option>
                  <option value="title">Name</option>
                </select>
              </label>
            </div>

            {visibleBooks.length > 0 ? (
              <ul role="list" className={styles.grid}>
                {visibleBooks.map((book) => (
                  <li key={book.id} className="reveal">
                    <BookCard book={book} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyState} role="status">
                No books match these filters. Try clearing one or more options.
              </p>
            )}

            {visibleBooks.length === INITIAL_VISIBLE_BOOKS && visibleBooks.length < filteredBooks.length && (
              <button
                type="button"
                className={styles.viewMore}
                onClick={loadMoreBooks}
              >
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
