import React from 'react';

const NewNote = ({ note, saveNote, saveNoteGlobal, cancel }) => {
  return (
    <div className="container--New">
      <input
        value={note}
        onChange={saveNote}
        placeholder="Write a new note..."
      />
      <button onClick={saveNoteGlobal} className='apply'>Save</button>
      <button onClick={cancel} className='cancel'>Cancel</button>
    </div>
  );
};

export default NewNote;
