import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./style_note.css";

interface NoteType {
  id: number;
  text: string;
}

const Note: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([
    { id: 1, text: "# Привіт 👋\nТут можна писати **Markdown**" },
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.altKey) {
        setNotes((prev) => [
          ...prev,
          { id: prev.length + 1, text: "" },
        ]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleDelete = (
    noteId: number,
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Delete") {
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    }
  };

  const handleChange = (noteId: number, value: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId ? { ...n, text: value } : n
      )
    );
  };

  const getStyle = (index: number) => {
    const directions = ["right", "down", "left", "up"];
    let x = 0,
      y = 0,
      w = window.innerWidth,
      h = window.innerHeight;

    for (let i = 0; i <= index; i++) {
      const dir = directions[i % 4];
      if (i === index) {
        return {
          position: "absolute" as const,
          left: `${x}px`,
          top: `${y}px`,
          width: `${w}px`,
          height: `${h}px`,
          display: "flex",
        };
      }

      if (dir === "right") {
        x += w / 2;
        w /= 2;
      } else if (dir === "down") {
        y += h / 2;
        h /= 2;
      } else if (dir === "left") {
        w /= 2;
      } else if (dir === "up") {
        h /= 2;
      }
    }
  };

  return (
    <div className="container_for_note">
      {notes.map((note, index) => (
        <div key={note.id} className="note_area" style={getStyle(index)}>
          {/* textarea */}
          <textarea
            className="text_area"
            placeholder={`Напиши свою нотатку...`}
            value={note.text}
            onChange={(e) => handleChange(note.id, e.target.value)}
            onKeyDown={(e) => handleDelete(note.id, e)}
            style={{ flex: 1, marginRight: "10px" }}
          />
          {/* Markdown preview */}
          <div
            className="markdown_preview"
            style={{
              flex: 1,
              border: "1px solid #ccc",
              padding: "10px",
              overflowY: "auto",
              background: "#fafafa",
              borderRadius: "6px",
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note.text || "*Нічого не написано...*"}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Note;
