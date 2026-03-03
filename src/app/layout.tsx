import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mirror Mentor — Short Film Lab",
  description: "A course-style app for developing short film screenplays.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Sidebar />
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
