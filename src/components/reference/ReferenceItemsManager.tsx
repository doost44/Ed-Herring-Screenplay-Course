"use client";

import { useEffect, useMemo, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

type ReferenceItem = {
  id: string;
  title: string;
  url: string;
  notes: string;
  tags: string[];
};

interface ReferenceItemsManagerProps {
  slug: string;
  heading?: string;
}

function buildItem(): ReferenceItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    url: "",
    notes: "",
    tags: [],
  };
}

export default function ReferenceItemsManager({
  slug,
  heading = "Reference Items",
}: ReferenceItemsManagerProps) {
  const storageKey = useMemo(() => `mm_reference:${slug}`, [slug]);
  const [items, setItems] = useState<ReferenceItem[]>([]);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  useEffect(() => {
    setItems(getJSON<ReferenceItem[]>(storageKey, []));
    setSaveState("saved");
  }, [storageKey]);

  useEffect(() => {
    setSaveState("saving");
    const timer = window.setTimeout(() => {
      setJSON(storageKey, items);
      setSaveState("saved");
    }, 300);

    return () => window.clearTimeout(timer);
  }, [items, storageKey]);

  function updateItem(id: string, patch: Partial<ReferenceItem>) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <section className="infra-panel">
      <div className="infra-head-row">
        <h2>{heading}</h2>
        <span className="infra-save-state">
          {saveState === "saving" ? "Saving…" : "Saved"}
        </span>
      </div>

      <button
        type="button"
        className="infra-btn"
        onClick={() => setItems((prev) => [buildItem(), ...prev])}
      >
        Add Item
      </button>

      <div className="reference-items">
        {items.length === 0 ? (
          <p>No reference items yet.</p>
        ) : (
          items.map((item) => (
            <article key={item.id} className="reference-item-card">
              <label className="infra-field">
                <span>Title</span>
                <input
                  value={item.title}
                  onChange={(e) =>
                    updateItem(item.id, { title: e.target.value })
                  }
                  placeholder="Item title"
                />
              </label>

              <label className="infra-field">
                <span>URL</span>
                <input
                  value={item.url}
                  onChange={(e) => updateItem(item.id, { url: e.target.value })}
                  placeholder="https://..."
                />
              </label>

              <label className="infra-field">
                <span>Tags (optional, comma-separated)</span>
                <input
                  value={item.tags.join(", ")}
                  onChange={(e) =>
                    updateItem(item.id, {
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="lighting, texture"
                />
              </label>

              <label className="infra-field">
                <span>Notes</span>
                <textarea
                  rows={4}
                  value={item.notes}
                  onChange={(e) =>
                    updateItem(item.id, { notes: e.target.value })
                  }
                  placeholder="Why this reference matters"
                />
              </label>

              <button
                type="button"
                className="infra-btn reference-remove"
                onClick={() => removeItem(item.id)}
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
