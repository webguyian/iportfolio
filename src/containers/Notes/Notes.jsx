import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Button from 'components/Button/Button';
import CountText from 'components/Text/CountText';
import Text from 'components/Text/Text';
import Note from './Note';
import NotePreview from './NotePreview';

import { dateSort } from 'containers/Notes/helpers';
import { useRefFocus } from 'containers/Notes/hooks';
import { useLocalStorage } from 'containers/Reminders/hooks';

const Notes = () => {
  const baseClass = 'notes-app';
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [activeNote, setActiveNote] = useState(null);
  const history = useHistory();
  const addNoteButton = useRefFocus(!notes.length);
  const noteCount = notes.length;

  const addNote = () => {
    const date = Date.now();
    const newNote = {
      date,
      id: date.toString(36),
      title: '',
      text: ''
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    history.push({
      pathname: `/notes/${newNote.id}`,
      state: { id: newNote.id }
    });
  };

  const deleteNote = id => {
    const updatedNotes = notes.filter(note => note.id !== id);

    setNotes(updatedNotes);

    return updatedNotes;
  };

  const handleChange = (id, key, value) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          date: Date.now(),
          [key]: value
        };
      }

      return note;
    });

    setActiveNote({ ...activeNote, [key]: value });
    setNotes(updatedNotes.sort(dateSort));
  };

  const handleDelete = id => {
    const noteIndex = notes.findIndex(note => note.id === id);
    const updatedNotes = deleteNote(id);
    const updatedNoteCount = updatedNotes.length;
    const updatedIndex =
      noteIndex === updatedNoteCount ? updatedNoteCount - 1 : noteIndex;

    if (updatedNoteCount) {
      setActiveNote(updatedNotes[updatedIndex]);
    } else {
      setActiveNote(null);
    }
  };

  if (activeNote) {
    return (
      <Route path="/notes/:id">
        <Note
          {...activeNote}
          onAdd={addNote}
          onBack={() => setActiveNote(null)}
          onChange={handleChange.bind(null, activeNote.id)}
          onDelete={handleDelete.bind(null, activeNote.id)}
        />
      </Route>
    );
  }

  return (
    <div className={baseClass}>
      <Text element="h1" type="display">
        Notes
      </Text>
      {noteCount ? (
        <ul className={`${baseClass}-list`}>
          {notes.map(note => (
            <li key={note.id} className={`${baseClass}-list-item`}>
              <NotePreview
                note={note}
                onClick={setActiveNote}
                onDelete={deleteNote}
              />
            </li>
          ))}
        </ul>
      ) : null}
      <div className={`${baseClass}-bottom-bar`}>
        <CountText count={noteCount} element="p">
          Notes
        </CountText>
        <Button icon="edit" onClick={addNote} ref={addNoteButton}>
          New note
        </Button>
      </div>
    </div>
  );
};

export default Notes;
