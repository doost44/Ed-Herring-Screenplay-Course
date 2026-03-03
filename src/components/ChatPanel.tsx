"use client";

import { useState } from "react";
import styles from "./ChatPanel.module.css";

export default function ChatPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className={styles.mobileToggle}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "✕" : "💬"}
      </button>

      <aside className={`${styles.panel} ${open ? styles.open : ""}`} aria-label="Chat panel">
        <div className={styles.header}>
          <span className={styles.headerTitle}>Chat</span>
        </div>
        <div className={styles.body}>
          <p className={styles.placeholder}>
            Chat panel placeholder — AI assistant integration coming soon.
          </p>
        </div>
        <div className={styles.inputArea}>
          <input
            type="text"
            className={styles.input}
            placeholder="Type a message…"
            disabled
          />
        </div>
      </aside>
    </>
  );
}
