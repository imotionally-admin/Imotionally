"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import Icon from "@/components/ui/Icon";
import MobileNav from "./MobileNav";
import { NAV_LINKS, SITE_NAME } from "@/utils/constants";
import styles from "./Header.module.css";

export default function Header({ cartCount = 0 }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isActive = (href) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo}>
            {SITE_NAME}
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul role="list" className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link href="/books" className={styles.iconButton} aria-label="Search books">
              <Icon name="search" />
            </Link>
            <Link href="/login" className={styles.iconButton} aria-label="Account">
              <Icon name="user" />
            </Link>
            <Link
              href="/cart"
              className={styles.iconButton}
              aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            >
              <Icon name="cart" />
              {cartCount > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className={`${styles.iconButton} ${styles.menuButton}`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav id="mobile-nav" open={menuOpen} onClose={closeMenu} links={NAV_LINKS} />
    </>
  );
}