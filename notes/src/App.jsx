import { useState, useEffect } from "react";
import { Note } from "./Components/Note";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect rendered");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);

  console.log(`render ${notes.length} notes`);

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
