import React from "react";
import type { ContentBlock } from "@/content/courseCopy";

interface SectionBlocksProps {
  blocks: ContentBlock[];
}

export default function SectionBlocks({ blocks }: SectionBlocksProps) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "paragraph":
            return <p key={i}>{block.text}</p>;

          case "heading":
            return <h2 key={i}>{block.text}</h2>;

          case "bullets":
            return (
              <ul key={i} className="block-bullets">
                {block.items?.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case "checklist":
            return (
              <ul key={i} className="checklist">
                {block.items?.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case "template-fields":
            return (
              <table key={i}>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {block.fields?.map((field, j) => (
                    <tr key={j}>
                      <td>{field}</td>
                      <td className="template-placeholder">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
