"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "../content/site";

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
      <nav
        id="site-navigation"
        className={`site-navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Primary navigation"
      >
        {navigation.map((item, index) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              className={active ? "is-active" : ""}
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
              data-cursor=""
            >
              <span className="nav-index">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
