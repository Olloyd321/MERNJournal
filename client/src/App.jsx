import React from 'react';
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./components/Navbar";
//adding apollo dependencies
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//graphql 
import { gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROFILES, QUERY_SINGLE_PROFILE, QUERY_ME } from './utils/queries';

// create client to talk to graphql
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

function App() {

  const { loading, error, data } = useQuery(QUERY_ME);
  const [createNote] = useMutation(ADD_ENTRY);
  const [updateNote] = useMutation(EDIT_ENTRY);
  const [deleteNote] = useMutation(REMOVE_ENTRY);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setNotes(data.notes);
    }
  }, [loading, data]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: 'Untitled Note',
      body: '',
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    //wrapping app child components into apollo container
    <ApolloProvider client={client}>
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
          notes={notes}
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
    </ApolloProvider>
  );
}

export default App;
