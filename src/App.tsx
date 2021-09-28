import "./App.css";
// import axios from "axios";
import { useEffect, useState } from "react";
import DUMMY_NOTES from './DUMMY_NOTES';
import Note from './components/Note/Note';
import INote from "./interfaces/note.interface";

function App() {
  const [notesList, setNotesList] = useState<Array<any>>([]);

  // App componenets renders the first time
  useEffect(() => {
    const listFromStorageString = localStorage.getItem("my-note");
    if (listFromStorageString) {
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNotesList(listFromStorageArray);
    } else
    setNotesList(DUMMY_NOTES);
  }, []);

  useEffect(() => {

    console.log("saving localStorage");
    const notesListString =JSON.stringify(notesList);
    localStorage.setItem("my-notes", notesListString);
  }, [notesList]);

  // get notes method
  // async function getNotes() {
  // try {
  //    const response = await axios.get("http://localhost:5000/notes");
  //    setNotesList(response.data.notes);
  //  } catch (error){
  //    console.error(error);
  //  }
  // }
  console.log("rerendering")
  console.log(notesList);

  const updateNoteItem = (updatedNote:  INote) => {
    console.log("alue updated in the app component");
    console.log(updatedNote);

    // temporary variable
    const updateList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem;
    });
    setNotesList(updateList); //updating the state of notes list
  };

  return (
    <div className="App">
      <div>Notes Application</div>
      <div className="notes-list">
          {notesList.map((noteItem, index) => {
              return (
                <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index} />
             );  
          })}
      </div>
    </div>
  );
}

export default App;
