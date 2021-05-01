import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation";
import NotesList from "./components/Note/NotesList";
import CreateditUser from "./components/User/CreateditUser";
import CreateNote from "./components/Note/CreateNote";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/edit/:id">
          <CreateNote />
        </Route>
        <Route path="/create">
          <CreateNote />
        </Route>
        <Route path="/user">
          <CreateditUser />
        </Route>
        <Route path="/" exact>
          <NotesList />
        </Route>
      </div>
    </Router>
  );
}

export default App;
