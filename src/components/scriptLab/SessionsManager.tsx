"use client";

import { useEffect, useMemo, useState } from "react";
import type { AppState, ChatMessage } from "@/lib/agentTypes";
import { getJSON, setJSON } from "@/lib/storage";
import type { ScriptUploadEntry } from "@/components/scriptLab/UploadLogManager";

const SESSIONS_KEY = "mm_scriptSessions";
const UPLOADS_KEY = "mm_scriptUploads";

type ScriptSession = {
  id: string;
  date: string;
  scriptRef: string;
  goal: string;
  notes: string;
  excerpt: string;
  edReply?: string;
};

export default function SessionsManager() {
  const [sessions, setSessions] = useState<ScriptSession[]>([]);
  const [scriptOptions, setScriptOptions] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [scriptRef, setScriptRef] = useState("Manual entry");
  const [goal, setGoal] = useState("");
  const [notes, setNotes] = useState("");
  const [sendingId, setSendingId] = useState<string | null>(null);

  useEffect(() => {
    setSessions(getJSON<ScriptSession[]>(SESSIONS_KEY, []));

    const uploads = getJSON<ScriptUploadEntry[]>(UPLOADS_KEY, []);
    const options = Array.from(new Set(uploads.map((u) => u.name))).filter(Boolean);
    setScriptOptions(options);
  }, []);

  useEffect(() => {
    setJSON(SESSIONS_KEY, sessions);
  }, [sessions]);

  const dropdownOptions = useMemo(
    () => ["Manual entry", ...scriptOptions],
    [scriptOptions],
  );

  function createSession(e: React.FormEvent) {
    e.preventDefault();

    const cleanGoal = goal.trim();
    if (!cleanGoal) return;

    const session: ScriptSession = {
      id: crypto.randomUUID(),
      date,
      scriptRef,
      goal: cleanGoal,
      notes: notes.trim(),
      excerpt: "",
    };

    setSessions((prev) => [session, ...prev]);
    setGoal("");
    setNotes("");
  }

  function updateSession(id: string, patch: Partial<ScriptSession>) {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, ...patch } : session,
      ),
    );
  }

  async function sendToEd(session: ScriptSession) {
    if (!session.excerpt.trim()) return;

    setSendingId(session.id);

    const userContent = [
      "Teaching only",
      "Analysis Mode",
      `Session goal: ${session.goal}`,
      `Script reference: ${session.scriptRef}`,
      "User excerpt:",
      session.excerpt,
    ].join("\n\n");

    const payload = {
      messages: [{ role: "user", content: userContent } as ChatMessage],
      appState: buildAnalysisAppState(),
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { reply?: string; error?: string };
      updateSession(session.id, {
        edReply: result.reply ?? result.error ?? "No response returned.",
      });
    } catch {
      updateSession(session.id, {
        edReply: "Failed to send to Ed.",
      });
    } finally {
      setSendingId(null);
    }
  }

  return (
    <section className="infra-panel">
      <h2>Analysis Sessions</h2>

      <form className="revision-form" onSubmit={createSession}>
        <label className="infra-field">
          <span>Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label className="infra-field">
          <span>Script Reference</span>
          <select value={scriptRef} onChange={(e) => setScriptRef(e.target.value)}>
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="infra-field">
          <span>Goal</span>
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Session goal"
          />
        </label>

        <label className="infra-field revision-desc">
          <span>Notes</span>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Session notes"
          />
        </label>

        <button type="submit" className="infra-btn">
          Create Session
        </button>
      </form>

      <div className="revision-list">
        {sessions.length === 0 ? (
          <p>No sessions yet.</p>
        ) : (
          sessions.map((session) => (
            <article key={session.id} className="script-session-card">
              <h3>
                {session.date} — {session.scriptRef}
              </h3>
              <p>
                <strong>Goal:</strong> {session.goal}
              </p>
              {session.notes && (
                <p>
                  <strong>Notes:</strong> {session.notes}
                </p>
              )}

              <label className="infra-field">
                <span>Excerpt to send to Ed</span>
                <textarea
                  rows={5}
                  value={session.excerpt}
                  onChange={(e) =>
                    updateSession(session.id, { excerpt: e.target.value })
                  }
                  placeholder="Paste user-provided excerpt"
                />
              </label>

              <button
                type="button"
                className="infra-btn"
                onClick={() => sendToEd(session)}
                disabled={sendingId === session.id}
              >
                {sendingId === session.id ? "Sending..." : "Send to Ed"}
              </button>

              {session.edReply && (
                <pre className="script-ed-reply">{session.edReply}</pre>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function buildAnalysisAppState(): AppState {
  const constraints = getJSON<Record<string, string>>("mm_constraints", {});

  return {
    currentSlug: "/script-lab/sessions",
    analysisMode: true,
    weekCompletion: {
      week1: getJSON<boolean>("mm_week:1:completed", false),
      week2: getJSON<boolean>("mm_week:2:completed", false),
      week3: getJSON<boolean>("mm_week:3:completed", false),
      week4: getJSON<boolean>("mm_week:4:completed", false),
      week5: getJSON<boolean>("mm_week:5:completed", false),
    },
    constraintsSummary: {
      locations: constraints.locations,
      props: constraints.props,
      castAvailability: constraints.castAvailability,
      sound: constraints.sound,
      lighting: constraints.lighting,
      schedule: constraints.schedule,
    },
  };
}
