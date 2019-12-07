import React from 'react';
import { act, create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { mockTime } from 'utilities/test';

import Notes from './Notes';
import Note from './Note';
import NotePreview from './NotePreview';
import * as hooks from './hooks';
import * as remindersHooks from 'containers/Reminders/hooks';

describe('<Notes />', () => {
  const useRefFocusHook = hooks.useRefFocus;
  const useLocalStorageHook = remindersHooks.useLocalStorage;

  hooks.useRefFocus = jest.fn();
  remindersHooks.useLocalStorage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useRefFocus.mockImplementation(useRefFocusHook);
    remindersHooks.useLocalStorage.mockImplementation(useLocalStorageHook);
  });

  it('renders correctly', () => {
    const component = create(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });

  it('handles add note', () => {
    const component = create(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );
    const button = component.root.findByProps({ icon: 'edit' });

    act(() => {
      button.props.onClick();
    });

    expect(component).toMatchSnapshot();
  });

  it('handles delete note', () => {
    const component = create(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );
    const button = component.root.findByProps({ icon: 'edit' });

    act(() => {
      button.props.onClick();
    });

    const note = component.root.findByType(Note);

    expect(note.props.onDelete).toBeDefined();

    act(() => {
      note.props.onDelete();
    });
  });

  it('handles delete for multiple notes', () => {
    const anotherTime = Number(new Date('2019-11-11T09:33:00'));
    const notes = [
      {
        id: 'k2uj0rc0',
        date: anotherTime,
        title: 'Another note',
        text: 'This is another note'
      },
      {
        id: 'k17zbp9c',
        date: mockTime,
        title: 'Example note',
        text: 'This is a note'
      }
    ];

    remindersHooks.useLocalStorage.mockReturnValue([notes, jest.fn()]);
    const component = create(
      <MemoryRouter initialEntries={['/notes/k2uj0rc0']} initialIndex={0}>
        <Notes />
      </MemoryRouter>
    );

    const [notePreview] = component.root.findAllByType(NotePreview);

    act(() => {
      notePreview.props.onClick(notePreview.props.note);
    });
    const note = component.root.findByType(Note);

    expect(note.props.onDelete).toBeDefined();

    act(() => {
      note.props.onDelete();
    });

    expect(component).toMatchSnapshot();
  });

  it('handles change note', () => {
    const component = create(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );
    const button = component.root.findByProps({ icon: 'edit' });

    act(() => {
      button.props.onClick();
    });

    const note = component.root.findByType(Note);

    expect(note.props.onChange).toBeDefined();

    act(() => {
      note.props.onChange('title', 'Updated note');
    });

    expect(component).toMatchSnapshot();
  });

  it('handles change for multiple notes', () => {
    const anotherTime = Number(new Date('2019-11-11T09:33:00'));
    const notes = [
      {
        id: 'k2uj0rc0',
        date: anotherTime,
        title: 'Another note',
        text: 'This is another note'
      },
      {
        id: 'k17zbp9c',
        date: mockTime,
        title: 'Example note',
        text: 'This is a note'
      }
    ];

    remindersHooks.useLocalStorage.mockReturnValue([notes, jest.fn()]);
    const component = create(
      <MemoryRouter initialEntries={['/notes/k2uj0rc0']} initialIndex={0}>
        <Notes />
      </MemoryRouter>
    );

    const [notePreview] = component.root.findAllByType(NotePreview);

    act(() => {
      notePreview.props.onClick(notePreview.props.note);
    });
    const note = component.root.findByType(Note);

    expect(note.props.onChange).toBeDefined();

    act(() => {
      note.props.onChange('text', 'Updated note body');
    });

    expect(component).toMatchSnapshot();
  });

  it('handles back to notes', () => {
    const notes = [
      {
        id: 'k17zbp9c',
        date: mockTime,
        title: 'Example note',
        text: 'This is a note'
      }
    ];

    remindersHooks.useLocalStorage.mockReturnValue([notes, jest.fn()]);
    const component = create(
      <MemoryRouter initialEntries={['/notes/k17zbp9c']} initialIndex={0}>
        <Notes />
      </MemoryRouter>
    );

    const notePreview = component.root.findByType(NotePreview);

    expect(notePreview.props.onClick).toBeDefined();

    act(() => {
      notePreview.props.onClick(notePreview.props.note);
    });

    expect(component).toMatchSnapshot();
    const note = component.root.findByType(Note);

    expect(note.props.onBack).toBeDefined();

    act(() => {
      note.props.onBack();
    });

    expect(component).toMatchSnapshot();
  });
});
