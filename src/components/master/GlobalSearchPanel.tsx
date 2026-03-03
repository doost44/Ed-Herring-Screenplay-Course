"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchNotebook } from "@/lib/notebookSearch";

export default function GlobalSearchPanel() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchNotebook(query), [query]);

  return (
    <section className="infra-panel">
      <h2>Global Search</h2>
      <p>
        Search across notes, decisions, exercises, revision logs, and archive
        excerpts.
      </p>

      <label className="infra-field">
        <span>Search</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a keyword..."
        />
      </label>

      {query.trim().length === 0 ? (
        <p>Enter a query to search your notebook data.</p>
      ) : results.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul className="global-search-results">
          {results.map((result) => (
            <li key={result.id}>
              <div className="global-search-title">
                <strong>{result.title}</strong>
                <span className="global-search-type">{result.type}</span>
              </div>
              <p>{result.snippet}</p>
              <Link href={result.href}>Open {result.pageTitle}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
