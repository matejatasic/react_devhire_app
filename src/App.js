import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DeveloperList from './components/DeveloperList';
import HireList from './components/HireList';
import DeveloperDetails from './components/DeveloperDetails';
import LandingPage from './components/LandingPage';
import Form from './components/Form';
import Modal from './components/Modal';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<LandingPage /> } />
          <Route exact path="/developers" element={<DeveloperList /> }></Route>
          <Route exact path="/hires" element={<HireList /> }></Route>
          <Route exact path="/developer" element={<DeveloperDetails /> }></Route>
          <Route exact path="/add" element={<Form pageTitle="Add Developer" /> }></Route>
          <Route exact path="/edit" element={<Form pageTitle="Edit Developer" /> }></Route>
        </Routes>
        <Modal />
      </div>
    </React.Fragment>
  );
}

export default App;
