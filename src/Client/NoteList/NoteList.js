// NoteList.js
import React, { useState } from 'react';
import Button from '../Button/Button';
import '../Button/Button.css';
import './NoteList.css';

function NoteList({ notes, onDelete, onEdit }) {
  const [editableNoteId, setEditableNoteId] = useState(null);
  const [editableNoteText, setEditableNoteText] = useState('');

  const handleEditButtonClick = (noteId, noteText) => {
    setEditableNoteId(noteId);
    setEditableNoteText(noteText);
  };

  const handleEditNoteSubmit = (event, noteId, newText) => {
    event.preventDefault();
    onEdit(noteId, newText);
    setEditableNoteId(null);
  };

  const handleEditNoteCancel = () => {
    setEditableNoteId(null);
  };

  return (
    <div className="notes-list">
      <ul className="notes">
        {notes.map((note) => (
          <li key={note._id}>
            {editableNoteId === note._id ? (
              <form onSubmit={(event) => handleEditNoteSubmit(event, note._id, editableNoteText)}>
                <input
                  type="text"
                  value={editableNoteText}
                  onChange={(event) => setEditableNoteText(event.target.value)}
                />
                 <div className='buttons-wrapper'>
                  <Button tag="button" className="save primaryBtn" type="submit">Save</Button>
                  <Button tag="button" className="cancel ms-3" onClick={handleEditNoteCancel}>Cancel</Button>
                </div>
              </form>
            ) : (
              <>
                <span>{note.text}</span>
                <div className='buttons-wrapper'>
                  <Button tag="button" className="edit secondaryBtn" onClick={() => handleEditButtonClick(note._id, note.text)}>Edit</Button>
                  <Button tag="button" className="delete ms-3" onClick={() => onDelete(note._id)}>Delete</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
