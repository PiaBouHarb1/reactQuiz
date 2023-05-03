// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from '../NoteList/NoteList';
import Button from '../Button/Button';
import '../Button/Button.css';
import './SignIn.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    // Retrieve all notes from the server when the component mounts
    axios.get('http://localhost:5000/api/notes')
      .then((response) => {
        setNotes(response.data);
      }) }, []);

      const handleNewNoteChange = (event) => {
        setNewNoteText(event.target.value);
      };
    
      const handleNewNoteSubmit = (event) => {
        event.preventDefault();
        // Create a new note on the server and add it to the notes array
        axios.post('http://localhost:5000/api/notes', { text: newNoteText })
          .then((response) => {
            setNotes([...notes, response.data]);
            setNewNoteText('');
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      const handleNoteDelete = (noteId) => {
        // Delete a note from the server and remove it from the notes array
        axios.delete(`http://localhost:5000/api/notes/${noteId}`)
          .then(() => {
            setNotes(notes.filter((note) => note._id !== noteId));
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      const handleNoteEdit = (noteId, newText) => {
        // Update the text of a note on the server and in the notes array
        axios.put(`http://localhost:5000/api/notes/${noteId}`, { text: newText })
          .then((response) => {
            setNotes(notes.map((note) =>
              note._id === noteId ? { ...note, text: response.data.text } : note
            ));
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      return (
        <div className="welcome-page">
            <h1>Welcome</h1>
          <h2 className="mt-5">Notes</h2>
          <form onSubmit={handleNewNoteSubmit} className="form-wrapper mt-4">
            <input type="text" value={newNoteText} onChange={handleNewNoteChange} />
            <Button tag="input" className="primaryBtn" type="submit">Add note</Button>
          </form>
          <NoteList notes={notes} onDelete={handleNoteDelete} onEdit={handleNoteEdit} />
        </div>
      );
    }
    
    export default App;
    
