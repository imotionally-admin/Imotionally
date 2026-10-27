import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { FOOTER_COLUMNS, SITE_NAME, SOCIAL_LINKS, STUDIO_NAME } from "@/utils/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = 2026;
  const socials = SOCIAL_LINKS.filter((social) => social.href);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            {SITE_NAME}
          </Link>
          <p className={styles.tagline}>
            Premium personalized storybooks that make every reader the hero of their own story.
          </p>
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

        {socials.length > 0 && (
          <div>
            <h2 className={styles.columnTitle}>Follow Us</h2>
            <ul role="list" className={styles.socials}>
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <Icon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          &copy; {year} {STUDIO_NAME}. All rights reserved.
        </p>
        <ul role="list" className={styles.legal}>
          <li>
            <Link href="/privacy-policy" className={styles.link}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className={styles.link}>
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}