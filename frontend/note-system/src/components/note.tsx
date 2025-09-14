import React, { useState, useEffect } from "react";
import './style_note.css';


const Note: React.FC = () => {
    const [notes, setNotes] = useState<number[]>([1]);

    useEffect (() => {
        const handleKeyDown = (event:KeyboardEvent) => {
            if (event.key === "Enter" && event.altKey) {
                setNotes((prev) => [...prev, prev.length + 1]);
            }
        };



        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, []);
    const handleDelete = (noteId: number, event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Delete") {
            setNotes((prev) => prev.filter((n) =>  n !== noteId));
        }
    };
    return (
        <div className = "container_for_note">
            {notes.map((note) => (
                <div key = {note} className = "note_area">
                    <textarea 
                        className = "text_area" 
                        placeholder = {`Напиши свою нотатку...`} 
                        onKeyDown = {(e) => handleDelete(note, e)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Note;
