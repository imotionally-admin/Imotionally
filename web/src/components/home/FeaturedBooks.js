import Link from "next/link";
import BookCard from "@/components/books/BookCard";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import styles from "./FeaturedBooks.module.css";

export default function FeaturedBooks({ books }) {
  return (
    <section className="section" aria-labelledby="collection-title">
      <div className="container">
        <SectionHeader
          id="collection-title"
          align="split"
          className={styles.sectionHeader}
          title="Our Personalized Collection"
          subtitle="Stories tailored to different age groups and meaningful life moments."
        >
          <Link href="/books" className={styles.viewAll}>
            View all books
          </Link>
        </SectionHeader>

        <ul role="list" className={styles.grid}>
          {books.map((book) => (
            <li key={book.id} className="reveal">
              <BookCard book={book} />
            </li>
          ))}
        </ul>

        <div className={styles.more}>
          <Button href="/books" variant="outline">
            Browse All Stories
          </Button>
        </div>
      </div>
    </section>
  );
}