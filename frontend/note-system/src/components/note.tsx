import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./style_note.css";

const Note: React.FC = () => {
  const [text, setText] = useState<string>("# Привіт 👋\nТут можна писати **Markdown**");
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [terminalText, setTerminalText] = useState<string>("");

  // Alt+Enter → toggle "terminal"
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.altKey) {
        event.preventDefault();
        setShowTerminal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="note_area">
      {/* Left side */}
      <div className="left_side">
        <textarea
          className="text_area"
          placeholder="Напиши свою нотатку..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {showTerminal && (
          <textarea
            className="terminal_area"
            placeholder="Terminal..."
            value={terminalText}
            onChange={(e) => setTerminalText(e.target.value)}
          />
        )}
      </div>

      {/* Right side */}
      <div className="markdown_preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text || "*Нічого не написано...*"}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Note;
