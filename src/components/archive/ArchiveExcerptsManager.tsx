"use client";

import { useEffect, useMemo, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

type ArchiveExcerpt = {
  id: string;
  date: string;
  title: string;
  content: string;
};

interface ArchiveExcerptsManagerProps {
  week: string;
}

function buildExcerpt(): ArchiveExcerpt {
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString().slice(0, 10),
    title: "",
    content: "",
  };
}

export default function ArchiveExcerptsManager({
  week,
}: ArchiveExcerptsManagerProps) {
  const storageKey = useMemo(() => `mm_archive:${week}`, [week]);
  const [excerpts, setExcerpts] = useState<ArchiveExcerpt[]>([]);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  useEffect(() => {
    setExcerpts(getJSON<ArchiveExcerpt[]>(storageKey, []));
    setSaveState("saved");
  }, [storageKey]);

  useEffect(() => {
    setSaveState("saving");
    const timer = window.setTimeout(() => {
      setJSON(storageKey, excerpts);
      setSaveState("saved");
    }, 300);

    return () => window.clearTimeout(timer);
  }, [excerpts, storageKey]);

  function updateExcerpt(id: string, patch: Partial<ArchiveExcerpt>) {
    setExcerpts((prev) =>
      prev.map((excerpt) =>
        excerpt.id === id ? { ...excerpt, ...patch } : excerpt,
      ),
    );
  }

  function removeExcerpt(id: string) {
    setExcerpts((prev) => prev.filter((excerpt) => excerpt.id !== id));
  }

  return (
    <section className="infra-panel">
      <div className="infra-head-row">
        <h2>Chat Excerpts</h2>
        <span className="infra-save-state">
          {saveState === "saving" ? "Saving…" : "Saved"}
        </span>
      </div>

      <button
        type="button"
        className="infra-btn"
        onClick={() => setExcerpts((prev) => [buildExcerpt(), ...prev])}
      >
        Add Excerpt
      </button>

      <div className="archive-excerpts">
        {excerpts.length === 0 ? (
          <p>No excerpts yet.</p>
        ) : (
          excerpts.map((excerpt) => (
            <article key={excerpt.id} className="archive-excerpt-card">
              <label className="infra-field">
                <span>Date</span>
                <input
                  type="date"
                  value={excerpt.date}
                  onChange={(e) =>
                    updateExcerpt(excerpt.id, { date: e.target.value })
                  }
                />
              </label>

              <label className="infra-field">
                <span>Excerpt Title</span>
                <input
                  value={excerpt.title}
                  onChange={(e) =>
                    updateExcerpt(excerpt.id, { title: e.target.value })
                  }
                  placeholder="What this excerpt is about"
                />
              </label>

              <label className="infra-field">
                <span>Content</span>
                <textarea
                  rows={6}
                  value={excerpt.content}
                  onChange={(e) =>
                    updateExcerpt(excerpt.id, { content: e.target.value })
                  }
                  placeholder="Paste chat excerpt content"
                />
              </label>

              <button
                type="button"
                className="infra-btn reference-remove"
                onClick={() => removeExcerpt(excerpt.id)}
              >
                Remove
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
