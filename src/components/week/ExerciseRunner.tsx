"use client";

import { useEffect, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";
import type { WeekExercise } from "@/content/weekTemplates";

interface ExerciseRunnerProps {
  weekNumber: number;
  exercises: WeekExercise[];
}

type ExerciseState = Record<string, string>;

export default function ExerciseRunner({
  weekNumber,
  exercises,
}: ExerciseRunnerProps) {
  const storageKey = `mm_week:${weekNumber}:exercises`;
  const [state, setState] = useState<ExerciseState>({});

  useEffect(() => {
    setState(getJSON<ExerciseState>(storageKey, {}));
  }, [storageKey]);

  useEffect(() => {
    setJSON(storageKey, state);
  }, [state, storageKey]);

  return (
    <section className="week-toolkit">
      <h2>Exercise Runner</h2>
      <div className="infra-grid">
        {exercises.map((exercise) => (
          <label key={exercise.id} className="infra-field">
            <span>{exercise.prompt}</span>
            <textarea
              rows={5}
              value={state[exercise.id] ?? ""}
              onChange={(e) =>
                setState((prev) => ({ ...prev, [exercise.id]: e.target.value }))
              }
              placeholder="Write your response"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
