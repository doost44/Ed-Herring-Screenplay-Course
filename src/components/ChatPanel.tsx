"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getPageByHref } from "@/content/courseStructure";
import type { ChatMessage } from "@/lib/agentTypes";
import { getJSON, setJSON } from "@/lib/storage";
import { usePathname } from "next/navigation";
import styles from "./ChatPanel.module.css";

const STORAGE_KEY = "mm_chat";

const COMMAND_CHIPS = [
  "Teaching only",
  "Feedback only",
  "Plan only",
  "Questions only",
  "No questions",
  "Stop steering",
];

export default function ChatPanel() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isMockThinking, setIsMockThinking] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const context = useMemo(() => {
    const node = getPageByHref(pathname);
    const slug = pathname;
    const title = node?.title ?? titleFromPath(pathname);
    return { slug, title };
  }, [pathname]);

  useEffect(() => {
    const saved = getJSON<ChatMessage[]>(STORAGE_KEY, []);
    if (saved.length > 0) {
      setHistory(saved);
      return;
    }

    setHistory([
      {
        role: "assistant",
        content:
          "Ready when you are. Ask for templates, feedback, plans, or questions for this page.",
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  useEffect(() => {
    setJSON(STORAGE_KEY, history);
  }, [history]);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, isMockThinking, open]);

  function addCommandChip(text: string) {
    setInput((prev) => (prev.trim().length === 0 ? text : `${prev}\n${text}`));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isMockThinking) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsMockThinking(true);

    await new Promise((resolve) => setTimeout(resolve, 260));

    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: mockAssistantReply(trimmed, context.title),
      createdAt: new Date().toISOString(),
    };

    setHistory((prev) => [...prev, assistantMessage]);
    setIsMockThinking(false);
  }

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

      <aside
        className={`${styles.panel} ${open ? styles.open : ""}`}
        aria-label="Chat panel"
      >
        <div className={styles.header}>
          <span className={styles.headerTitle}>Chat</span>
          <span className={styles.contextLine}>
            Context: {context.title} ({context.slug})
          </span>
        </div>
        <div ref={bodyRef} className={styles.body}>
          {history.map((message, index) => (
            <div
              key={`${message.createdAt ?? "t"}-${index}`}
              className={`${styles.msg} ${
                message.role === "user" ? styles.user : styles.assistant
              }`}
            >
              <span className={styles.msgRole}>{message.role}</span>
              <p className={styles.msgText}>{message.content}</p>
            </div>
          ))}
          {isMockThinking && (
            <div className={`${styles.msg} ${styles.assistant}`}>
              <span className={styles.msgRole}>assistant</span>
              <p className={styles.msgText}>Thinking…</p>
            </div>
          )}
        </div>
        <div className={styles.inputArea}>
          <div className={styles.chips}>
            {COMMAND_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className={styles.chip}
                onClick={() => addCommandChip(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
          <textarea
            className={styles.input}
            placeholder="Type a message… (Enter to send, Shift+Enter for newline)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
          />
          <button type="button" className={styles.sendBtn} onClick={handleSend}>
            Send
          </button>
        </div>
      </aside>
    </>
  );
}

function titleFromPath(path: string): string {
  const leaf = path.split("/").filter(Boolean).at(-1) ?? "page";
  return leaf.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function mockAssistantReply(userInput: string, pageTitle: string): string {
  const firstLine = userInput.split("\n")[0]?.trim() ?? "";
  return `Acknowledged for ${pageTitle}.\n\nI stored your message locally and a provider can be connected next.\n\nReceived: ${firstLine}`;
}
