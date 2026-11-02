import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import NewsletterForm from "./NewsletterForm";
import { COPYRIGHT_YEAR, FOOTER_COLUMNS, SOCIAL_LINKS, STUDIO_NAME } from "@/utils/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="Imotionally" fill sizes="10rem" />
          </Link>
          <div className={styles.subscribe}>
            <h2 className={styles.subscribeTitle}>Subscribe to our newsletter</h2>
            <NewsletterForm />
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className={styles.columnTitle}>{column.title}</h2>
            <ul role="list" className={styles.links}>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <ul role="list" className={styles.socials}>
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                className={styles.socialLink}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                <Icon name={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          &copy; {COPYRIGHT_YEAR} {STUDIO_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}