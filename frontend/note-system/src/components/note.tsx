import React, { useState, useEffect } from "react";
import "./style_note.css";

const Note: React.FC = () => {
  const [notes, setNotes] = useState<number[]>([1]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.altKey) {
        setNotes((prev) => [...prev, prev.length + 1]);
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
      setNotes((prev) => prev.filter((n) => n !== noteId));
    }
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
        <div key={note} className="note_area" style={getStyle(index)}>
          <textarea
            className="text_area"
            placeholder={`Напиши свою нотатку...`}
            onKeyDown={(e) => handleDelete(note, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default Note;
