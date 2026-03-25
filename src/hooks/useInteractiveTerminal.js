import { useEffect, useState } from "react";

const TERMINAL_SEQUENCES = {
  es: [
    { type: "val", text: "Hola, soy Belen, Junior Developer." },
    {
      type: "val",
      text: "Construyo experiencias web funcionales y elegantes, con foco en codigo limpio y proyectos de impacto.",
    },
    {
      type: "val",
      text: "Stack principal: HTML, CSS, JavaScript, React, TypeScript, Node.js, MySQL y Java.",
    },
    {
      type: "val",
      text: "Tambien trabajo con MongoDB y Prisma para construir soluciones full stack mantenibles.",
    },
    {
      type: "val",
      text: "En el flujo diario aplico Vite, ESLint y GitHub Actions para mejorar velocidad, calidad y despliegue continuo.",
    },
    {
      type: "val",
      text: "Fortalezas: resolucion de problemas, trabajo en equipo y metodologia agil (Scrum).",
    },
    {
      type: "val",
      text: "Ingles intermedio para leer documentacion tecnica y comunicarme en entornos de trabajo.",
    },
  ],
  en: [
    { type: "val", text: "Hi, I'm Belen, Junior Developer." },
    {
      type: "val",
      text: "I build functional and elegant web experiences, focused on clean code and high-impact projects.",
    },
    {
      type: "val",
      text: "Main stack: HTML, CSS, JavaScript, React, TypeScript, Node.js, MySQL, and Java.",
    },
    {
      type: "val",
      text: "I also work with MongoDB and Prisma to build maintainable full-stack solutions.",
    },
    {
      type: "val",
      text: "In daily workflows I apply Vite, ESLint, and GitHub Actions to improve speed, quality, and continuous delivery.",
    },
    {
      type: "val",
      text: "Strengths: problem-solving, teamwork, and agile methodology (Scrum).",
    },
    {
      type: "val",
      text: "Intermediate English for reading technical docs and communicating in work environments.",
    },
  ],
};

export function useInteractiveTerminal(language = "es", shouldStart = true) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!shouldStart) {
      setHistory([]);
      return undefined;
    }

    const terminalSequence =
      TERMINAL_SEQUENCES[language] ?? TERMINAL_SEQUENCES.es;

    if (terminalSequence.length === 0) {
      setHistory([]);
      return undefined;
    }

    setHistory([{ type: terminalSequence[0].type, text: "" }]);

    let lineIndex = 0;
    let charIndex = 0;
    let timerId;

    const typeNext = () => {
      if (lineIndex >= terminalSequence.length) {
        return;
      }

      const currentLine = terminalSequence[lineIndex];
      const fullLine = currentLine.text;

      if (fullLine.length === 0) {
        lineIndex += 1;
        if (lineIndex < terminalSequence.length) {
          setHistory((prev) => [
            ...prev,
            { type: terminalSequence[lineIndex].type, text: "" },
          ]);
          timerId = setTimeout(typeNext, 40);
        }
        return;
      }

      charIndex += 1;
      const partial = fullLine.slice(0, charIndex);

      setHistory((prev) => {
        const next = [...prev];
        next[next.length - 1] = { type: currentLine.type, text: partial };
        return next;
      });

      if (charIndex < fullLine.length) {
        timerId = setTimeout(typeNext, currentLine.type === "cmd" ? 10 : 6);
        return;
      }

      lineIndex += 1;
      charIndex = 0;

      if (lineIndex < terminalSequence.length) {
        setHistory((prev) => [
          ...prev,
          { type: terminalSequence[lineIndex].type, text: "" },
        ]);
        timerId = setTimeout(typeNext, 70);
      }
    };

    timerId = setTimeout(typeNext, 90);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [language, shouldStart]);

  return {
    history,
  };
}
