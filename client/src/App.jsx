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
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, createHttpLink } from '@apollo/client';
import { QUERY_PROFILES, QUERY_SINGLE_PROFILE, QUERY_ME } from './utils/queries';
import { ADD_ENTRY,EDIT_ENTRY,REMOVE_ENTRY } from './utils/mutations';
import { setContext } from '@apollo/client/link/context';
import ReactDOM from "react-dom";


const httpLink = createHttpLink({
  uri: '/graphql', // Replace with your GraphQL endpoint
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

function App() {
  const [notes, setNotes] = useState([]);

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileUsername: 'abcdefg' },
  });

  useEffect(() => {
    if (!loading && data) {
      setNotes(data.profile.entries);
    }
  }, [loading, data]);

  const testNotes = data?.profile?.entries || [];

  console.log("testNotes",testNotes);

  const [activeNote, setActiveNote] = useState(false);

  const [createNote] = useMutation(ADD_ENTRY, {
    onCompleted: () => {
      refetchProfile();
    },
    onError(error) {
      console.error('Error creating note:', error);
    },
  });

  const refetchProfile = () => {
    client
      .query({
        query: QUERY_SINGLE_PROFILE,
        variables: { profileUsername: 'abcdefg' },
      })
      .then(({ data }) => {
        console.log("data",data);
        if (data && data.profile) {
          setNotes(data.profile.entries);
        }
      })
      .catch((error) => {
        console.error('Error refetching profile:', error);
      });
  };

  const onAddNote = (entryTitle, entryContent) => {
    const newNote = {
      _id: uuid(),
      entryTitle: entryTitle,
      entryContent: entryContent,
      createdAt: Date.now(),
    };
    console.log("newnote", newNote);
    createNote({
      variables: {
        entryTitle: newNote.entryTitle,
        entryContent: newNote.entryContent,
        createdAt: newNote.createdAt.toString(),
      },
    })
      .then(({ data }) => {
        console.log('New note created',data);
        setActiveNote(newNote._id);
      })
      .catch((error) => {
        console.error('Error creating note:', error);
      });
  };


  const onDeleteNote = (noteId) => {
    // setNotes(notes.filter(({ id }) => id !== noteId));
    //toDo : remove entry mutation
  };

  const [editEntry] = useMutation(EDIT_ENTRY);

  const onUpdateNote = (updatedNote) => {
    console.log("updatedlog", updatedNote);
    editEntry({
      variables: {
        entryId: updatedNote._id,
        editEntryEntryTitle: updatedNote.entryTitle,
        editEntryEntryContent: updatedNote.entryContent,
      },
      // You can also add an `onCompleted` or `onError` callback if needed
    });
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
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={activeNote} 
        onUpdateNote={onUpdateNote} />
      </div>}
      />
      </Routes>
      </Router>
  
  );
}
export default App;