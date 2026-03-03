"use client";

import { useEffect, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

interface DeliverablesChecklistProps {
  weekNumber: number;
  items: string[];
}

type DeliverablesState = Record<string, boolean>;

export default function DeliverablesChecklist({
  weekNumber,
  items,
}: DeliverablesChecklistProps) {
  const storageKey = `mm_week:${weekNumber}:deliverables`;
  const [state, setState] = useState<DeliverablesState>({});

  useEffect(() => {
    setState(getJSON<DeliverablesState>(storageKey, {}));
  }, [storageKey]);

  useEffect(() => {
    setJSON(storageKey, state);
  }, [state, storageKey]);

  function toggle(id: string) {
    setState((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="week-toolkit">
      <h2>Deliverables Checklist</h2>
      <ul className="checklist week-deliverables-list">
        {items.map((item, index) => {
          const id = `deliverable-${index}`;
          return (
            <li key={id} className="milestone-item">
              <label>
                <input
                  type="checkbox"
                  checked={!!state[id]}
                  onChange={() => toggle(id)}
                />
                <span>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
