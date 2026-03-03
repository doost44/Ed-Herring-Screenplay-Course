"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navTree, NavItem } from "@/content/nav";
import styles from "./Sidebar.module.css";

function NavNode({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded =
    hasChildren &&
    (pathname === item.href ||
      item.children!.some(
        (c) => pathname === c.href || pathname.startsWith(c.href + "/")
      ));
  const [open, setOpen] = useState(isExpanded);

  return (
    <li>
      <div className={styles.nodeRow}>
        <Link
          href={item.href}
          className={`${styles.link} ${isActive ? styles.active : ""} ${
            depth > 0 ? styles.child : styles.parent
          }`}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            className={styles.toggle}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Collapse" : "Expand"}
          >
            {open ? "▾" : "▸"}
          </button>
        )}
      </div>
      {hasChildren && open && (
        <ul className={styles.subList}>
          {item.children!.map((child) => (
            <NavNode key={child.href} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      <nav
        className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}
        aria-label="Main navigation"
      >
        <div className={styles.brand}>
          <span className={styles.brandTitle}>Mirror Mentor</span>
          <span className={styles.brandSub}>Short Film Lab</span>
        </div>
        <ul className={styles.rootList}>
          {navTree.map((item) => (
            <NavNode key={item.href} item={item} />
          ))}
        </ul>
      </nav>

      {mobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
