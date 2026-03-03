import PlaceholderPage from "@/components/PlaceholderPage";

export default function MasterIndexPage() {
  return (
    <article>
      <div className="page-header">
        <span className="tag">Home</span>
        <h1>Master Index</h1>
      </div>
      <p>
        Welcome to <strong>Mirror Mentor — Short Film Lab</strong>. This workspace
        organises every stage of your short film development: weekly coursework,
        script analysis, visual references, and archived conversations.
      </p>
      <p>
        Use the sidebar to navigate between weeks, the Script Lab, the Reference
        Board, and the project infrastructure pages. Each section contains
        structured placeholders ready for your notes and uploads.
      </p>
      <h2>Quick Links</h2>
      <ul className="quick-links">
        {[
          ["/project-infrastructure", "Project Infrastructure"],
          ["/week-1", "Week 1 — Start Here"],
          ["/script-lab", "Script Lab"],
          ["/reference-board", "Reference Board"],
          ["/archive", "Archive"],
        ].map(([href, label]) => (
          <li key={href}>
            <a href={href}>→ {label}</a>
          </li>
        ))}
      </ul>
    </article>
  );
}
