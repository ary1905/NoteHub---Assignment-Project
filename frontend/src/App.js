import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './containers/Home';
import Notes from './containers/Notes';
import AddNote from './containers/AddNote';
import ViewNote from './containers/ViewNote';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/addNote" element={<AddNote />} />
          <Route path="/viewNote/:noteId" element={<ViewNote />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
