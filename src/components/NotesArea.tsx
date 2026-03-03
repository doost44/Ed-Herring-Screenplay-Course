"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getJSON, removeKey, setJSON } from "@/lib/storage";

type NotePayload = {
  slug: string;
  content: string;
  updatedAt: string;
};

interface NotesAreaProps {
  slug: string;
}

export default function NotesArea({ slug }: NotesAreaProps) {
  const storageKey = useMemo(() => `mm_notes:${slug}`, [slug]);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    const existing = getJSON<NotePayload | string | null>(storageKey, null);

    if (typeof existing === "string") {
      setContent(existing);
      setLastSaved(null);
    } else if (existing && typeof existing.content === "string") {
      setContent(existing.content);
      setLastSaved(existing.updatedAt ?? null);
    } else {
      setContent("");
      setLastSaved(null);
    }

    setStatus("saved");
    hasHydratedRef.current = true;
  }, [storageKey]);

  useEffect(() => {
    if (!hasHydratedRef.current) return;

    setStatus("saving");
    const handle = window.setTimeout(() => {
      if (content.trim().length === 0) {
        removeKey(storageKey);
        setLastSaved(new Date().toISOString());
        setStatus("saved");
        return;
      }

      const payload: NotePayload = {
        slug,
        content,
        updatedAt: new Date().toISOString(),
      };
      setJSON(storageKey, payload);
      setLastSaved(payload.updatedAt);
      setStatus("saved");
    }, 450);

    return () => window.clearTimeout(handle);
  }, [content, slug, storageKey]);

  return (
    <section className="notes-area">
      <div className="notes-head">
        <h2>Notes</h2>
        <span className="notes-status">
          {status === "saving" ? "Saving…" : "Saved"}
          {lastSaved && status !== "saving" ? ` • ${new Date(lastSaved).toLocaleTimeString()}` : ""}
        </span>
      </div>
      <p className="notes-help">Use Markdown formatting in this field for headings, bullets, and checklists.</p>
      <textarea
        className="notes-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write notes for this page..."
        rows={14}
      />
    </section>
  );
}
