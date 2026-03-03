"use client";

import { useEffect, useState } from "react";
import { getJSON, setJSON } from "@/lib/storage";
import {
  LLM_KEY_STORAGE,
  LLM_MODEL_STORAGE,
  LLM_BASE_URL_STORAGE,
} from "@/lib/clientLlm";

export default function LlmSettings() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [baseUrl, setBaseUrl] = useState("https://api.openai.com/v1");
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    setApiKey(getJSON<string>(LLM_KEY_STORAGE, ""));
    setModel(getJSON<string>(LLM_MODEL_STORAGE, "gpt-4o-mini"));
    setBaseUrl(
      getJSON<string>(LLM_BASE_URL_STORAGE, "https://api.openai.com/v1"),
    );
  }, []);

  function handleSave() {
    setJSON(LLM_KEY_STORAGE, apiKey.trim());
    setJSON(LLM_MODEL_STORAGE, model.trim() || "gpt-4o-mini");
    setJSON(
      LLM_BASE_URL_STORAGE,
      baseUrl.trim() || "https://api.openai.com/v1",
    );
    setSaved(true);
    setTestResult(null);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleTest() {
    setTesting(true);
    setTestResult(null);

    try {
      const key = apiKey.trim();
      const url = (baseUrl.trim() || "https://api.openai.com/v1").replace(
        /\/$/,
        "",
      );
      const mdl = model.trim() || "gpt-4o-mini";

      if (!key) {
        setTestResult("No API key entered.");
        return;
      }

      const response = await fetch(`${url}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: mdl,
          messages: [
            { role: "system", content: "Reply with exactly: OK" },
            { role: "user", content: "Test" },
          ],
          temperature: 0,
          max_tokens: 5,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        setTestResult(`Error ${response.status}: ${text.slice(0, 200)}`);
        return;
      }

      setTestResult("Connection successful!");
    } catch (err) {
      setTestResult(
        `Network error: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="llm-settings">
      <h3 style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>
        AI Chat Configuration
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
        Enter your OpenAI API key (or any OpenAI-compatible provider) so Ed can
        respond with real AI answers. Your key is stored only in your browser
        — it is never sent to our servers.
      </p>

      <div className="llm-field">
        <label htmlFor="llm-key">API Key</label>
        <input
          id="llm-key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          autoComplete="off"
        />
      </div>

      <div className="llm-field">
        <label htmlFor="llm-model">Model</label>
        <input
          id="llm-model"
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="gpt-4o-mini"
        />
      </div>

      <div className="llm-field">
        <label htmlFor="llm-base">Base URL</label>
        <input
          id="llm-base"
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://api.openai.com/v1"
        />
        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
          Change for OpenRouter, Groq, local Ollama, etc.
        </span>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
        <button type="button" onClick={handleSave} className="llm-btn">
          {saved ? "Saved ✓" : "Save"}
        </button>
        <button
          type="button"
          onClick={handleTest}
          className="llm-btn llm-btn-secondary"
          disabled={testing}
        >
          {testing ? "Testing…" : "Test Connection"}
        </button>
      </div>

      {testResult && (
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.85rem",
            color: testResult.startsWith("Connection")
              ? "var(--accent)"
              : "#f87171",
          }}
        >
          {testResult}
        </p>
      )}
    </div>
  );
}
