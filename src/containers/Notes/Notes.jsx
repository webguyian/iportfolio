import React from 'react';
import { Route } from 'react-router-dom';

import Button from 'components/Button/Button';
import CountText from 'components/Text/CountText';
import Text from 'components/Text/Text';
import Note from './Note';
import NotePreview from './NotePreview';

import { useNotes, useRefFocus } from 'modules/notes/hooks';

const Notes = () => {
  const [notes, activeNote, setActiveNote, eventHandlers] = useNotes();
  const addNoteButton = useRefFocus(!notes.length);
  const noteCount = notes.length;
  const baseClass = 'notes-app';

  if (activeNote) {
    return (
      <Route path="/notes/:id">
        <Note
          {...activeNote}
          onAdd={eventHandlers.onAdd}
          onBack={eventHandlers.onBack}
          onChange={eventHandlers.onChange.bind(null, activeNote.id)}
          onDelete={eventHandlers.onDelete.bind(null, activeNote.id)}
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
                onDelete={eventHandlers.deleteNote}
              />
            </li>
          ))}
        </ul>
      ) : null}
      <div className={`${baseClass}-bottom-bar`}>
        <CountText count={noteCount} element="p">
          Notes
        </CountText>
        <Button icon="edit" onClick={eventHandlers.onAdd} ref={addNoteButton}>
          New note
        </Button>
      </div>
    </div>
  );
};

export default Notes;
