"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/books/BookCard";
import { AUDIENCES, OCCASIONS } from "@/lib/content/home";
import styles from "./BooksCatalog.module.css";

const INITIAL_VISIBLE_BOOKS = 9;
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-ascending", label: "Price: low to high" },
  { value: "price-descending", label: "Price: high to low" },
  { value: "title", label: "Name" },
];
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
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("recipient");
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

  const activeFilterGroup = filterGroups.find((group) => group.key === activeFilterTab) ?? filterGroups[0];

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

  function renderFilterGroup(group) {
    return (
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
    );
  }

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="books-title">
      <div className="container">
        <h1 id="books-title" className={styles.title}>
          <strong className="hl">Our Books</strong>
        </h1>
        <p className={styles.p}>Books for all ages and every occasion</p>

        <div className={styles.catalog}>
          <aside className={styles.filters} aria-label="Filter books">
            <button
              type="button"
              className={styles.filterToggle}
              aria-expanded={filtersOpen}
              aria-controls="book-catalog-filters"
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 4h18l-7 8v7l-4 2v-9L3 4Z" />
              </svg>
              <span>Filter</span>
            </button>

            <div
              id="book-catalog-filters"
              className={`${styles.filterContent} ${filtersOpen ? styles.filterContentOpen : ""}`}
            >
              <div className={styles.filterHeader}>
                <h2 className={styles.filterHeading}>Filters</h2>
                <button type="button" className={styles.clearButton} onClick={clearFilters}>
                  Clear filters
                </button>
              </div>

              <div className={styles.desktopFilterGroups}>{filterGroups.map(renderFilterGroup)}</div>

              <div className={styles.mobileFilterGroups}>
                <div className={styles.filterTabs} role="tablist" aria-label="Filter categories">
                  {filterGroups.map((group, index) => (
                    <button
                      key={group.key}
                      id={`book-filter-tab-${group.key}`}
                      type="button"
                      role="tab"
                      className={`${styles.filterTab} ${activeFilterTab === group.key ? styles.filterTabActive : ""}`}
                      aria-selected={activeFilterTab === group.key}
                      aria-controls="book-filter-tab-panel"
                      tabIndex={activeFilterTab === group.key ? 0 : -1}
                      onClick={() => setActiveFilterTab(group.key)}
                      onKeyDown={(event) => {
                        let nextIndex = index;
                        if (event.key === "ArrowRight") nextIndex = (index + 1) % filterGroups.length;
                        else if (event.key === "ArrowLeft") {
                          nextIndex = (index - 1 + filterGroups.length) % filterGroups.length;
                        } else if (event.key === "Home") nextIndex = 0;
                        else if (event.key === "End") nextIndex = filterGroups.length - 1;
                        else return;

                        event.preventDefault();
                        const nextGroup = filterGroups[nextIndex];
                        event.currentTarget.parentElement
                          .querySelectorAll('[role="tab"]')
                          [nextIndex].focus();
                        setActiveFilterTab(nextGroup.key);
                      }}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>
                <div
                  id="book-filter-tab-panel"
                  role="tabpanel"
                  aria-labelledby={`book-filter-tab-${activeFilterGroup.key}`}
                  className={styles.mobileFilterPanel}
                  tabIndex={0}
                >
                  {renderFilterGroup(activeFilterGroup)}
                </div>
              </div>
            </div>
          </aside>

          <div className={styles.toolbar}>
            <label className={styles.sortControl}>
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.mobileSort}>
              <button
                type="button"
                className={styles.mobileSortToggle}
                aria-expanded={sortMenuOpen}
                aria-controls="book-catalog-sort-options"
                onClick={() => setSortMenuOpen((open) => !open)}
              >
                <span>Sort by</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                id="book-catalog-sort-options"
                className={`${styles.sortMenu} ${sortMenuOpen ? styles.sortMenuOpen : ""}`}
                role="group"
                aria-label="Sort options"
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={sortBy === option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortMenuOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.results}>
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
