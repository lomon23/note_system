import React, { useState } from "react";
import "./style_note.css";

const PROMPT = "[terminal ~]$";

type CommandHandler = (args: string[]) => string | null;

const commands: Record<string, CommandHandler> = {
  help: () =>
    "Доступні команди:\n - help: список команд\n - clear: очистити екран\n - echo: повторити текст\n - date: показати поточну дату\n - about: інформація про додаток",
  clear: () => null, // обробляється окремо
  echo: (args) => args.join(" "),
  date: () => new Date().toString(),
  about: () => "Це кастомний React-термінал ✨",
};

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([PROMPT + " "]);
  const [currentInput, setCurrentInput] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const [cmd, ...args] = currentInput.trim().split(" ");
      const newLines = [...lines.slice(0, -1), PROMPT + " " + currentInput];

      if (cmd) {
        if (commands[cmd]) {
          if (cmd === "clear") {
            setLines([PROMPT + " "]);
            setCurrentInput("");
            return;
          }
          const result = commands[cmd](args);
          if (result) newLines.push(result);
        } else {
          newLines.push(`Command not found: ${cmd}`);
        }
      }

      newLines.push(PROMPT + " ");
      setLines(newLines);
      setCurrentInput("");
    }
  };

  return (
    <div className="terminal_area">
      {lines.map((line, idx) => (
        <div key={idx} className="terminal_line">
          {line.startsWith(PROMPT) && idx === lines.length - 1 ? (
            <>
              <span className="prompt">{PROMPT}</span>
              <input
                className="terminal_input"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </>
          ) : (
            <pre>{line}</pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default Terminal;
