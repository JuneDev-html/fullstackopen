import React from "react";
import { Note } from "./Components/Note";

function App(props) {
  const [notes, setNotes] = React.useState(props.notes);
  const [newNote, setNewNote] = React.useState("");
  const [showAll, setShowAll] = React.useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const allNotes = notesToShow.map((note) => (
    <Note key={note.id} note={note} />
  ));
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>{allNotes}</ul>
    </div>
  );
}

export default App;
