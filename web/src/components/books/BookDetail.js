import Image from "next/image";
import Link from "next/link";
import Accordion from "@/components/ui/Accordian";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";
import Steps from "@/components/home/Steps";
import faqStyles from "@/components/home/Faq.module.css";
import storyCtaStyles from "@/components/home/StoryCta.module.css";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { formatPrice } from "@/utils/formatPrice";
import BookGallery from "./BookGallery";
import PersonalizeButton from "./PersonalizeButton";
import styles from "./BookDetail.module.css";

const BENEFITS = [
  "Personalized with their name",
  "A story made to feel like theirs",
  "Printed on premium paper",
];

const PROMISES = [
  {
    icon: "user",
    title: "Real people, ready to help",
    text: "Get a personal response from our team whenever you need a hand.",
  },
  {
    icon: "book",
    title: "Preview every page",
    text: "See your personalized story before it goes to print.",
  },
  {
    icon: "heart",
    title: "Made with care",
    text: "If something isn't right, we'll work with you to make it right.",
  },
];

const BOOK_FAQS = [
  {
    id: "personalize",
    question: "How is the book personalised?",
    answer:
      "Add the recipient's name and choose their character details in the personalization flow. You'll be able to review the story before placing your order.",
  },
  {
    id: "story",
    question: "What's the story?",
    answer:
      "This book is designed to make the recipient the heart of a warm, memorable adventure. The story details will be shown here as the book catalogue is connected to its full content.",
  },
  {
    id: "quality",
    question: "Size & quality",
    answer:
      "Books are printed on premium paper in A4 landscape format. The final page count can vary with the personalized story.",
  },
];

const ADDITIONAL_BOOK_FAQS = (book) => [
  {
    id: "preview",
    question: "Can I preview the personalized story?",
    answer: "Yes. You can review your book before it goes to print.",
  },
  {
    id: "delivery",
    question: "When will my book arrive?",
    answer: "Delivery options and estimated timings are shown during checkout.",
  },
  {
    id: "dedication",
    question: "Can I include a personal message?",
    answer: "Available personalization options are shown when you start creating your book.",
  },
  {
    id: "age",
    question: "What age is this book for?",
    answer: `This book is designed for ${book.ageGroup.toLowerCase()}.`,
  },
  {
    id: "gift",
    question: "Can I send this book as a gift?",
    answer: "Yes. You can enter the recipient's delivery details when placing your order.",
  },
  {
    id: "support",
    question: "Who can help me with my order?",
    answer: "Our team can help with personalization, previews, and order questions.",
  },
];

export default function BookDetail({ book }) {
  return (
    <article className={styles.page}>
      <div className={`container ${styles.container}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol role="list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/books">Books</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{book.title}</li>
          </ol>
        </nav>

        <section className={styles.product} aria-labelledby="book-title">
          <div className={styles.galleryArea}>
            <BookGallery title={book.title} />
          </div>

          <div className={styles.summary}>
            <div className={styles.productIntro}>
              <p className={styles.eyebrow}>A personalized storybook</p>
              <h1 id="book-title" className={styles.title}>
                {book.title}
              </h1>
              <p className={styles.description}>{book.description}</p>
            </div>

            <div className={styles.summaryDetails}>
              <ul className={styles.benefits} aria-label="Book highlights">
                {BENEFITS.map((benefit) => (
                  <li key={benefit}>
                    <Icon name="check" size="sm" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <p className={styles.price}>
                <span>From</span>
                <strong>{formatPrice(book.priceFrom)}</strong>
              </p>
              <div className={styles.personalizeArea}>
                <PersonalizeButton />
              </div>
              <div id="product-faqs" className={styles.productFaqs}>
                <Accordion items={BOOK_FAQS} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Steps />

      <section className={styles.promiseSection} aria-labelledby="promise-title">
        <div className={`container ${styles.promiseGrid}`}>
          <div className={styles.promiseContent}>
            <h1 id="promise-title">A real person is always within reach</h1>
            <ul role="list" className={styles.promises}>
              {PROMISES.map((promise) => (
                <li key={promise.title}>
                  <span className={styles.promiseIcon}>
                    <Icon name={promise.icon} size="sm" />
                  </span>
                  <div>
                    <h2><u>{promise.title}</u></h2>
                    <p>{promise.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.promiseImage}>
            <Image
              src="/herobg.webp"
              alt="A parent and child sharing a story together"
              fill
              sizes="(min-width: 56em) 42vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="book-faq-title">
        <div className={`container ${faqStyles.container}`}>
          <SectionHeader
            id="book-faq-title"
            title={<strong className="hl">{book.title} FAQs</strong>}
          />
          <div className="reveal">
            <Accordion items={ADDITIONAL_BOOK_FAQS(book)} />
          </div>
        </div>
      </section>

      <section
        className={`section ${storyCtaStyles.section}`}
        aria-labelledby="newsletter-title"
      >
        <div className="container">
          <div className={`${storyCtaStyles.box} ${styles.newsletterBox}`}>
            <h2 id="newsletter-title" className={storyCtaStyles.title}>
              Subscribe to our newsletter
            </h2>
            <p className={styles.newsletterText}>
              Get 10% off your first order and hear about new stories.
            </p>
            <div className={styles.newsletterForm}>
              <NewsletterForm variant="storyCta" />
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
