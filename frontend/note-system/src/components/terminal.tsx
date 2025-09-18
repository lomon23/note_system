import React from "react";
import "./style_note.css";

interface TerminalProps {
  value: string;
  onChange: (value: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ value, onChange }) => {
  return (
    <textarea
      className="terminal_area"
      placeholder="Terminal..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Terminal;

