"use client";

import { useEffect, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

interface WeekCompleteToggleProps {
  weekNumber: number;
}

export default function WeekCompleteToggle({ weekNumber }: WeekCompleteToggleProps) {
  const storageKey = `mm_week:${weekNumber}:completed`;
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(getJSON<boolean>(storageKey, false));
  }, [storageKey]);

  useEffect(() => {
    setJSON(storageKey, completed);
  }, [completed, storageKey]);

  return (
    <section className="week-complete">
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <span>Week Complete</span>
      </label>
    </section>
  );
}
