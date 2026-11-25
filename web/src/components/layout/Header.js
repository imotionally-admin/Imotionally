"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import Icon from "@/components/ui/Icon";
import BrandLogo from "@/components/ui/BrandLogo";
import MobileNav from "./MobileNav";
import SearchPanel from "./SearchPanel";
import { NAV_LINKS } from "@/utils/constants";
import styles from "./Header.module.css";

export default function Header({ cartCount = 0 }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const isActive = (href) => {
    if (href === "/#home") return pathname === "/";
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.offerBar}>
          <p>Offers and promotions</p>
        </div>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo}>
            <BrandLogo priority />
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
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Search books"
              aria-expanded={searchOpen}
              aria-controls="store-search"
              onClick={() => setSearchOpen(true)}
            >
              <Icon name="search" />
            </button>
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
      <SearchPanel id="store-search" open={searchOpen} onClose={closeSearch} />
    </>
  );
}