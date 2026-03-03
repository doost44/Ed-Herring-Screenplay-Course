"use client";

import { useEffect, useMemo, useState } from "react";
import { pageCopy } from "@/content/courseCopy";
import { getJSON, setJSON } from "@/lib/storage";

const STORAGE_KEY = "mm_milestones";

type MilestonesState = Record<string, boolean>;

type DeliverableGroup = {
  week: number;
  items: string[];
};

function getWeekDeliverables(): DeliverableGroup[] {
  const groups: DeliverableGroup[] = [];

  for (let week = 1; week <= 5; week++) {
    const copy = pageCopy[`/week/${week}/deliverables`];
    const checklist = copy?.blocks.find((b) => b.kind === "checklist");
    groups.push({ week, items: checklist?.items ?? [] });
  }

  return groups;
}

export default function MilestonesTracker() {
  const deliverables = useMemo(() => getWeekDeliverables(), []);
  const [state, setState] = useState<MilestonesState>({});

  useEffect(() => {
    setState(getJSON<MilestonesState>(STORAGE_KEY, {}));
  }, []);

  useEffect(() => {
    setJSON(STORAGE_KEY, state);
  }, [state]);

  function toggle(id: string) {
    setState((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="infra-panel">
      <h2>Week Deliverables Progress</h2>
      <div className="milestone-groups">
        {deliverables.map((group) => (
          <div key={group.week} className="milestone-group">
            <h3>Week {group.week}</h3>
            <ul className="checklist milestone-list">
              {group.items.map((item, index) => {
                const id = `week-${group.week}-${index}`;
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
          </div>
        ))}
      </div>
    </section>
  );
}
