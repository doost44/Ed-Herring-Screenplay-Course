"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navTree, NavItem } from "@/content/nav";
import styles from "./Sidebar.module.css";

function NavNode({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li>
      <Link
        href={item.href}
        className={`${styles.link} ${isActive ? styles.active : ""} ${depth > 0 ? styles.child : styles.parent}`}
      >
        {item.label}
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className={styles.subList}>
          {item.children.map((child) => (
            <NavNode key={child.href} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar() {
  return (
    <nav className={styles.sidebar} aria-label="Main navigation">
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
  );
}
