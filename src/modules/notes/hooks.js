import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import { useStorageCache } from 'modules/browser/hooks';
import { dateSort } from 'modules/notes/helpers';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const cache = useStorageCache('notes', notes, n => !n.length);
  const [activeNote, setActiveNote] = useState(null);
  const history = useHistory();
  const deleteNote = id => {
    const updatedNotes = notes.filter(note => note.id !== id);

    setNotes(updatedNotes);

    return updatedNotes;
  };
  const onAdd = () => {
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
  const onBack = () => setActiveNote(null);
  const onChange = (id, key, value) => {
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
  const onDelete = id => {
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

  useEffect(() => {
    if (cache && cache.length) {
      const filteredNotes = cache.filter(n => n.title || n.text);

      setNotes(filteredNotes);
    }
  }, []);

  const eventHandlers = {
    deleteNote,
    onAdd,
    onBack,
    onChange,
    onDelete
  };

  return [notes, activeNote, setActiveNote, eventHandlers];
};

export const useRefFocus = (condition = true, initial = null) => {
  const ref = useRef(initial);

  useEffect(() => {
    const element = ref && ref.current;

    if (condition && element) {
      // Add focus to element
      element.focus();
    }
  }, [condition, ref]);

  return ref;
};

export const useSwipeOffset = (initial = 0) => {
  const [offset, setOffset] = useState(initial);
  const maxOffset = -30;

  const handleSwipe = eventInfo => {
    if (eventInfo.dir !== 'Down') {
      // Exit early if not down swipe
      return false;
    }

    setOffset(eventInfo.deltaY);
  };

  const handleSwipeUp = () => {
    if (!offset) {
      // Exit early with no offset
      return false;
    }

    setOffset(0);
  };

  const handlers = useSwipeable({
    onSwipedUp: handleSwipeUp,
    onSwiping: handleSwipe,
    trackMouse: true
  });

  return [handlers, offset < maxOffset, setOffset];
};
