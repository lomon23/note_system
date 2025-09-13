import react from 'react';
import './style_note.css';


const Note: React.FC = () => {
    return (
        <div className = "container_for_note">
            <div className = "note_area">
                <textarea className = "text_area" placeholder = "Напиши свою нотатку..." />
            </div>
        </div>
    );
};
export default Note;
