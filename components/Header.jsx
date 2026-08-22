"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, site } from "../content/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={`${site.name}, home`} onClick={() => setMenuOpen(false)}>
        <span>{site.name}</span>
        <span className="wordmark-mark" aria-hidden="true" />
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span>{menuOpen ? "Close" : "Menu"}</span>
      </button>

      <nav
        id="site-navigation"
        className={`site-navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Primary navigation"
      >
        {navigation.map((item, index) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link className={active ? "is-active" : ""} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              <span className="nav-index">0{index + 1}</span>
              {item.label}
            </Link>
          );
        })}
        <a className="nav-contact" href={`mailto:${site.email}`}>
          Contact <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
