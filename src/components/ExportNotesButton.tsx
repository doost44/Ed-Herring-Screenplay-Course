"use client";

import { useState } from "react";
import { getJSON } from "@/lib/storage";

type NotePayload = {
  slug?: string;
  content?: string;
  updatedAt?: string;
};

export default function ExportNotesButton() {
  const [message, setMessage] = useState("");

  function handleExport() {
    const keys = Object.keys(window.localStorage).filter((key) =>
      key.startsWith("mm_notes:"),
    );

    const notesBySlug: Record<string, string> = {};

    for (const key of keys) {
      const slug = key.replace("mm_notes:", "");
      const data = getJSON<NotePayload | string | null>(key, null);

      if (typeof data === "string") {
        notesBySlug[slug] = data;
        continue;
      }

      if (data && typeof data.content === "string") {
        notesBySlug[slug] = data.content;
      }
    }

    const blob = new Blob([JSON.stringify(notesBySlug, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);

    anchor.href = url;
    anchor.download = `mirror-mentor-notes-${stamp}.json`;
    anchor.click();
    URL.revokeObjectURL(url);

    setMessage(`Exported ${Object.keys(notesBySlug).length} note page(s).`);
  }

  return (
    <section className="export-notes">
      <h2>Export Notes</h2>
      <p>Download all saved notes as a single JSON file keyed by page slug.</p>
      <button type="button" className="export-notes-btn" onClick={handleExport}>
        Export notes JSON
      </button>
      {message && <p className="export-notes-msg">{message}</p>}
    </section>
  );
}
