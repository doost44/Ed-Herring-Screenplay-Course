"use client";

import { useEffect, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

interface DecisionsTemplateProps {
  weekNumber: number;
  fields: string[];
}

type DecisionsState = Record<string, string>;

export default function DecisionsTemplate({
  weekNumber,
  fields,
}: DecisionsTemplateProps) {
  const storageKey = `mm_week:${weekNumber}:decisions`;
  const [state, setState] = useState<DecisionsState>({});
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  useEffect(() => {
    setState(getJSON<DecisionsState>(storageKey, {}));
    setSaveState("saved");
  }, [storageKey]);

  useEffect(() => {
    setSaveState("saving");
    const timer = window.setTimeout(() => {
      setJSON(storageKey, state);
      setSaveState("saved");
    }, 300);
    return () => window.clearTimeout(timer);
  }, [state, storageKey]);

  return (
    <section className="week-toolkit">
      <div className="week-toolkit-head">
        <h2>Decisions Template</h2>
        <span className="week-save-state">
          {saveState === "saving" ? "Saving…" : "Saved"}
        </span>
      </div>
      <div className="infra-grid">
        {fields.map((field) => (
          <label key={field} className="infra-field">
            <span>{field}</span>
            <textarea
              value={state[field] ?? ""}
              onChange={(e) =>
                setState((prev) => ({ ...prev, [field]: e.target.value }))
              }
              rows={3}
              placeholder="Write your decision notes"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
