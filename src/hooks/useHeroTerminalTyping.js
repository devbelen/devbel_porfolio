import { useEffect, useRef, useState } from "react";

const HERO_LINES = {
  es: ["Hola,", "soy Belén", "Developer."],
  en: ["Hello,", "I'm Belén", "Developer."],
};

export function useHeroTerminalTyping(language = "es") {
  const [lines, setLines] = useState(["", "", ""]);
  const [activeLine, setActiveLine] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const selectedLines = HERO_LINES[language] ?? HERO_LINES.es;

    setLines(["", "", ""]);
    setActiveLine(0);
    setIsDone(false);

    let lineIdx = 0;
    let charIdx = 0;

    const typeNext = () => {
      if (lineIdx >= selectedLines.length) {
        setActiveLine(-1);
        setIsDone(true);
        return;
      }

      const fullLine = selectedLines[lineIdx];
      setActiveLine(lineIdx);
      setLines((prev) => {
        const next = [...prev];
        next[lineIdx] = fullLine.slice(0, charIdx + 1);
        return next;
      });

      if (charIdx + 1 < fullLine.length) {
        charIdx += 1;
        timeoutRef.current = setTimeout(typeNext, 70);
      } else {
        lineIdx += 1;
        charIdx = 0;
        timeoutRef.current = setTimeout(typeNext, 220);
      }
    };

    timeoutRef.current = setTimeout(typeNext, 260);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [language]);

  return { lines, activeLine, isDone };
}
