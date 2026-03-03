"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getJSON } from "@/lib/storage";

type WeekStatus = "Complete" | "In Progress";

function hasAnyWeekInput(weekNumber: number): boolean {
  const decisions = getJSON<Record<string, string>>(
    `mm_week:${weekNumber}:decisions`,
    {},
  );
  const exercises = getJSON<Record<string, string>>(
    `mm_week:${weekNumber}:exercises`,
    {},
  );
  const deliverables = getJSON<Record<string, boolean>>(
    `mm_week:${weekNumber}:deliverables`,
    {},
  );

  const hasText = (obj: Record<string, string>) =>
    Object.values(obj).some((value) => value.trim().length > 0);
  const hasChecked = (obj: Record<string, boolean>) =>
    Object.values(obj).some((value) => value);

  return hasText(decisions) || hasText(exercises) || hasChecked(deliverables);
}

export default function WeekProgressPanel() {
  const [statuses, setStatuses] = useState<Record<number, WeekStatus>>({});

  useEffect(() => {
    const next: Record<number, WeekStatus> = {};
    for (let week = 1; week <= 5; week++) {
      const completed = getJSON<boolean>(`mm_week:${week}:completed`, false);
      if (completed) {
        next[week] = "Complete";
      } else {
        next[week] = hasAnyWeekInput(week) ? "In Progress" : "In Progress";
      }
    }
    setStatuses(next);
  }, []);

  return (
    <section className="week-progress-panel">
      <h2>Week Progress</h2>
      <ul className="week-progress-list">
        {[1, 2, 3, 4, 5].map((week) => (
          <li key={week}>
            <Link href={`/week/${week}`}>Week {week}</Link>
            <span
              className={`week-progress-pill ${
                statuses[week] === "Complete" ? "complete" : "inprogress"
              }`}
            >
              {statuses[week] ?? "In Progress"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
