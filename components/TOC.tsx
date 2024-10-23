"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const TOC = () => {
  const [headings, setHeadings] = useState<
    { text: string; id: string; level: string }[]
  >([]);

  useEffect(() => {
    const articleElement = document.getElementById("article");
    if (!articleElement) return;

    const extractedHeadings = Array.from(
      articleElement.querySelectorAll("h2, h3")
    ).map((heading) => ({
      text: heading.textContent || "",
      id: heading.id || "",
      level: heading.nodeName, // 'H2' or 'H3'
    }));

    setHeadings(extractedHeadings);
  }, []);

  return (
    <nav className="sticky top-16 right-0 mt-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
      <h2 className="text-lg font-semibold mb-4">目录</h2>
      <ul className="space-y-2">
        {headings.map(({ text, id, level }) => (
          <li key={id} className={`${level === "H3" ? "ml-4" : ""}`}>
            <Link
              href={`#${id}`}
              title={text}
              className="link-hover text-sm hover:text-primary transition-colors duration-200"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
