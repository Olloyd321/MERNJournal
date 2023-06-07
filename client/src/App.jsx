import React from 'react';
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//adding apollo dependencies

//graphql 
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROFILES, QUERY_SINGLE_PROFILE, QUERY_ME } from './utils/queries';



function App() {
  //const { loading, data } = useQuery(QUERY_PROFILES);
  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: {profileUsername:'abcdefg'}
  }
    );
  const testNotes = data?.profile?.entries || [];
  console.log("data",data);
  console.log("test",testNotes);
  // const [notes, setNotes] = useState(
  //   localStorage.notes ? JSON.parse(localStorage.notes) : []
  // );

  const [activeNote, setActiveNote] = useState(false);
 
  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);
  
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    // setNotes([newNote, ...notes]);
    //todo: trigger the mutation 

    setActiveNote(newNote._id);
  };
  const onDeleteNote = (noteId) => {
    // setNotes(notes.filter(({ id }) => id !== noteId));
    //toDo : remove entry mutation
  };
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = testNotes.map((note) => {
      if (note._id === updatedNote._id) {
        return updatedNote;
      }
      return note;
    });
    // setNotes(updatedNotesArr);
    //todo: edit entry mutation
  };
  const getActiveNote = () => {
    return testNotes.find(({ _id }) => _id === activeNote);
  };
  return (
    //wrapping app child components into apollo container
    
      <Router>
        <Routes>
          <Route
           path='/'
           element={<Navbar />}
           />
        
      <Route
          path='/homepage'
          element=
        {<div className="App">
        <Sidebar
          notes={testNotes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>}
      />
      </Routes>
      </Router>
  
  );
}
export default App;