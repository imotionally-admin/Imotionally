import Link from "next/link";
import BookCard from "@/components/books/BookCard";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";
import styles from "./FeaturedBooks.module.css";

export default function FeaturedBooks({ books }) {
  return (
    <section id="books" className="section" aria-labelledby="stories-title">
      <div className="container">
        <SectionHeader
          id="stories-title"
          align="split"
          title={
            <>
              <strong className="hl">Stories</strong> to explore
            </>
          }
        >
          <Link href="/books" className={styles.viewAll}>
            View all books
            <Icon name="arrow" size="sm" className={styles.arrow} />
          </Link>
        </SectionHeader>

        <ul role="list" className={styles.grid}>
          {books.map((book) => (
            <li key={book.id} className="reveal">
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}