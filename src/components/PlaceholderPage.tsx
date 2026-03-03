import React from "react";

interface PlaceholderPageProps {
  section: string;
  title: string;
  description: string;
  details?: string;
}

export default function PlaceholderPage({
  section,
  title,
  description,
  details,
}: PlaceholderPageProps) {
  return (
    <article>
      <div className="page-header">
        <span className="tag">{section}</span>
        <h1>{title}</h1>
      </div>
      <p>{description}</p>
      {details && <p>{details}</p>}
      <p>
        This section is ready for your content. Add notes, uploads, or
        structured data here as the project progresses.
      </p>
    </article>
  );
}
