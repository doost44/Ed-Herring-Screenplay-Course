"use client";

import { useEffect, useMemo, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

const STORAGE_KEY = "mm_revisionLog";

const CATEGORIES = [
  "Structure",
  "Schedule",
  "Resources",
  "Drafting",
  "Blocking",
  "Production",
  "Other",
] as const;

type RevisionCategory = (typeof CATEGORIES)[number];

type RevisionEntry = {
  id: string;
  date: string;
  category: RevisionCategory;
  description: string;
};

export default function RevisionLog() {
  const [entries, setEntries] = useState<RevisionEntry[]>([]);
  const [category, setCategory] = useState<RevisionCategory>("Structure");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setEntries(getJSON<RevisionEntry[]>(STORAGE_KEY, []));
  }, []);

  useEffect(() => {
    setJSON(STORAGE_KEY, entries);
  }, [entries]);

  const autoDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    const clean = description.trim();
    if (!clean) return;

    const entry: RevisionEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      category,
      description: clean,
    };

    setEntries((prev) => [entry, ...prev]);
    setDescription("");
  }

  return (
    <section className="infra-panel">
      <h2>Revision Log Entries</h2>

      <form className="revision-form" onSubmit={addEntry}>
        <label className="infra-field">
          <span>Date</span>
          <input type="text" value={autoDate} readOnly />
        </label>

        <label className="infra-field">
          <span>Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as RevisionCategory)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="infra-field revision-desc">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what changed and why"
            rows={4}
          />
        </label>

        <button type="submit" className="infra-btn">
          Add Log Entry
        </button>
      </form>

      <div className="revision-list">
        {entries.length === 0 ? (
          <p>No revision entries yet.</p>
        ) : (
          <ul className="block-bullets">
            {entries.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.date}</strong> — [{entry.category}]{" "}
                {entry.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
