"use client";

import { useEffect, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

const STORAGE_KEY = "mm_scriptTemplateNotes";

const TEMPLATE_KEYS = [
  "Behavior cues",
  "Silence/space cues",
  "Blocking cues",
  "Sound cues",
] as const;

type TemplateNotesState = Record<string, string>;

export default function TemplateNotesManager() {
  const [notesByTemplate, setNotesByTemplate] = useState<TemplateNotesState>({});

  useEffect(() => {
    setNotesByTemplate(getJSON<TemplateNotesState>(STORAGE_KEY, {}));
  }, []);

  useEffect(() => {
    setJSON(STORAGE_KEY, notesByTemplate);
  }, [notesByTemplate]);

  return (
    <section className="infra-panel">
      <h2>Annotation Templates</h2>
      <div className="infra-grid">
        {TEMPLATE_KEYS.map((template) => (
          <label key={template} className="infra-field">
            <span>{template}</span>
            <textarea
              rows={5}
              value={notesByTemplate[template] ?? ""}
              onChange={(e) =>
                setNotesByTemplate((prev) => ({
                  ...prev,
                  [template]: e.target.value,
                }))
              }
              placeholder="Template notes"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
