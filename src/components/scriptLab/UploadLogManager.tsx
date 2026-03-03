"use client";

import { useEffect, useMemo, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

const STORAGE_KEY = "mm_scriptUploads";

export interface ScriptUploadEntry {
  name: string;
  type: string;
  size: number;
  date: string;
  notes: string;
}

export default function UploadLogManager() {
  const [entries, setEntries] = useState<ScriptUploadEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("text/plain");
  const [size, setSize] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setEntries(getJSON<ScriptUploadEntry[]>(STORAGE_KEY, []));
  }, []);

  useEffect(() => {
    setJSON(STORAGE_KEY, entries);
  }, [entries]);

  const computed = useMemo(() => {
    if (!selectedFile) {
      return {
        name,
        type,
        size,
      };
    }

    return {
      name: selectedFile.name,
      type: selectedFile.type || type,
      size: selectedFile.size,
    };
  }, [name, selectedFile, size, type]);

  function onFileChange(file: File | null) {
    setSelectedFile(file);
    if (!file) return;

    setName(file.name);
    setType(file.type || "application/octet-stream");
    setSize(file.size);
  }

  function addEntry(e: React.FormEvent) {
    e.preventDefault();

    const cleanName = computed.name.trim();
    if (!cleanName) return;

    const entry: ScriptUploadEntry = {
      name: cleanName,
      type: computed.type.trim() || "text/plain",
      size: Number.isFinite(computed.size) ? Math.max(0, computed.size) : 0,
      date: new Date().toISOString(),
      notes: notes.trim(),
    };

    setEntries((prev) => [entry, ...prev]);
    setSelectedFile(null);
    setName("");
    setType("text/plain");
    setSize(0);
    setNotes("");
  }

  return (
    <section className="infra-panel">
      <h2>Upload Log</h2>
      <form className="revision-form" onSubmit={addEntry}>
        <label className="infra-field">
          <span>Upload PDF/TXT (optional)</span>
          <input
            type="file"
            accept=".pdf,.txt,text/plain,application/pdf"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
        </label>

        <label className="infra-field">
          <span>Name</span>
          <input
            value={computed.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Script name"
          />
        </label>

        <label className="infra-field">
          <span>Type</span>
          <input
            value={computed.type}
            onChange={(e) => setType(e.target.value)}
            placeholder="application/pdf or text/plain"
          />
        </label>

        <label className="infra-field">
          <span>Size (bytes)</span>
          <input
            type="number"
            min={0}
            value={computed.size}
            onChange={(e) => setSize(Number(e.target.value || 0))}
          />
        </label>

        <label className="infra-field revision-desc">
          <span>Notes</span>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Purpose, source, usage notes"
          />
        </label>

        <button type="submit" className="infra-btn">
          Add Upload Entry
        </button>
      </form>

      <div className="revision-list">
        {entries.length === 0 ? (
          <p>No uploads logged yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={`${entry.name}-${entry.date}-${index}`}>
                  <td>{entry.name}</td>
                  <td>{entry.type}</td>
                  <td>{entry.size}</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
