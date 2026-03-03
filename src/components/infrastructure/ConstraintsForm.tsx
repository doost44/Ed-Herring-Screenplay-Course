"use client";

import { useEffect, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";

const STORAGE_KEY = "mm_constraints";

type ConstraintsData = {
  locations: string;
  props: string;
  castAvailability: string;
  sound: string;
  lighting: string;
  schedule: string;
};

const EMPTY_DATA: ConstraintsData = {
  locations: "",
  props: "",
  castAvailability: "",
  sound: "",
  lighting: "",
  schedule: "",
};

export default function ConstraintsForm() {
  const [data, setData] = useState<ConstraintsData>(EMPTY_DATA);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    const saved = getJSON<ConstraintsData>(STORAGE_KEY, EMPTY_DATA);
    setData(saved);
    setStatus("saved");
  }, []);

  useEffect(() => {
    setStatus("saving");
    const timer = window.setTimeout(() => {
      setJSON(STORAGE_KEY, data);
      setStatus("saved");
    }, 350);

    return () => window.clearTimeout(timer);
  }, [data]);

  function onChange(field: keyof ConstraintsData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <section className="infra-panel">
      <div className="infra-head-row">
        <h2>Constraints & Resources Form</h2>
        <span className="infra-save-state">
          {status === "saving" ? "Saving…" : "Saved"}
        </span>
      </div>

      <div className="infra-grid">
        <label className="infra-field">
          <span>Locations Available</span>
          <textarea
            value={data.locations}
            onChange={(e) => onChange("locations", e.target.value)}
            placeholder="List confirmed and potential locations"
            rows={3}
          />
        </label>

        <label className="infra-field">
          <span>Props / Objects on Hand</span>
          <textarea
            value={data.props}
            onChange={(e) => onChange("props", e.target.value)}
            placeholder="List available props and missing items"
            rows={3}
          />
        </label>

        <label className="infra-field">
          <span>Cast Availability</span>
          <textarea
            value={data.castAvailability}
            onChange={(e) => onChange("castAvailability", e.target.value)}
            placeholder="Availability windows, conflicts, constraints"
            rows={3}
          />
        </label>

        <label className="infra-field">
          <span>Sound Constraints</span>
          <textarea
            value={data.sound}
            onChange={(e) => onChange("sound", e.target.value)}
            placeholder="Noise limitations, recording gear, environment issues"
            rows={3}
          />
        </label>

        <label className="infra-field">
          <span>Lighting Constraints</span>
          <textarea
            value={data.lighting}
            onChange={(e) => onChange("lighting", e.target.value)}
            placeholder="Natural light windows, practicals, gear limits"
            rows={3}
          />
        </label>

        <label className="infra-field">
          <span>Time & Schedule Constraints</span>
          <textarea
            value={data.schedule}
            onChange={(e) => onChange("schedule", e.target.value)}
            placeholder="Weekly time budget, deadlines, scheduling blockers"
            rows={3}
          />
        </label>
      </div>
    </section>
  );
}
