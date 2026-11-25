"use client";

import Link from "next/link";

export default function BookCardLink({ href, className, children }) {
  return (
    <Link
      href={href}
      className={className}
      scroll={false}
      onNavigate={() => window.scrollTo(0, 0)}
    >
      {children}
    </Link>
  );
}
