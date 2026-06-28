/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

export function MermaidRenderer() {
  useEffect(() => {
    // 1. Check if there are any mermaid blocks on the page
    const codeBlocks = document.querySelectorAll("pre code.language-mermaid");
    if (codeBlocks.length === 0) return;

    let active = true;

    const loadMermaid = () => {
      return new Promise<any>((resolve, reject) => {
        if ((window as any).mermaid) {
          resolve((window as any).mermaid);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js";
        script.type = "text/javascript";
        script.onload = () => resolve((window as any).mermaid);
        script.onerror = (err) => reject(err);
        document.head.appendChild(script);
      });
    };

    async function initMermaid() {
      try {
        // 2. Load mermaid script dynamically
        const mermaid = await loadMermaid();

        if (!active) return;

        // 3. Initialize mermaid matching the active theme
        const isDark = document.documentElement.classList.contains("dark");
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
        });

        // 4. Transform all code blocks into div.mermaid elements
        codeBlocks.forEach((codeEl, index) => {
          const preEl = codeEl.parentElement;
          if (!preEl) return;

          const codeText = codeEl.textContent || "";
          
          const container = document.createElement("div");
          container.className = "mermaid flex justify-center my-6 w-full overflow-x-auto";
          container.id = `mermaid-chart-${index}`;
          container.textContent = codeText;

          // Replace the pre element
          preEl.parentNode?.replaceChild(container, preEl);
        });

        // 5. Run mermaid rendering
        await mermaid.run();
      } catch (err) {
        console.error("Failed to load or run mermaid", err);
      }
    }

    initMermaid();

    return () => {
      active = false;
    };
  }, []);

  return null;
}
