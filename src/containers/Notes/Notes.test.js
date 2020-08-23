import React from 'react';
import { act, create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { mockTime } from 'utilities/test';
import * as hooks from 'modules/notes/hooks';

import Notes from './Notes';
import Note from './Note';

describe('<Notes />', () => {
  const useRefFocus = hooks.useRefFocus;
  const useNotes = hooks.useNotes;

  hooks.useRefFocus = jest.fn();
  hooks.useNotes = jest.fn();

  const eventHandlers = {
    deleteNote: jest.fn(),
    onAdd: jest.fn(),
    onBack: jest.fn(),
    onChange: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useRefFocus.mockImplementation(useRefFocus);
    hooks.useNotes.mockImplementation(useNotes);
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

    hooks.useNotes.mockReturnValue([notes, notes[1], jest.fn(), eventHandlers]);
    const component = create(
      <MemoryRouter initialEntries={['/notes/k2uj0rc0']} initialIndex={0}>
        <Notes />
      </MemoryRouter>
    );

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

  it('handles back to notes', () => {
    const notes = [
      {
        id: 'k17zbp9c',
        date: mockTime,
        title: 'Example note',
        text: 'This is a note'
      }
    ];

    hooks.useNotes.mockReturnValue([notes, notes[0], jest.fn(), eventHandlers]);
    const component = create(
      <MemoryRouter initialEntries={['/notes/k17zbp9c']} initialIndex={0}>
        <Notes />
      </MemoryRouter>
    );

    const note = component.root.findByType(Note);

    expect(note.props.onBack).toBeDefined();

    act(() => {
      note.props.onBack();
    });

    expect(component).toMatchSnapshot();
  });
});
