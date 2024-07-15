import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Home from './components/Home';
import Mechanics from './components/Mechanics';
import Login from './components/Login';
import Register from './components/Register';
import AddGarage from './components/AddGarage';
import AddMechanic from './components/AddMechanic';
import EditGarage from './components/EditGarage';
import EditMechanic from './components/EditMechanic';

import 'bootstrap/dist/css/bootstrap.min.css';

// Bazinis URL visoms axios užklausoms
axios.defaults.baseURL = 'http://localhost:5000';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mechanics" element={<Mechanics />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-garage" element={<AddGarage />} />
      <Route path="/add-mechanic" element={<AddMechanic />} />
      <Route path="/edit-garage/:id" element={<EditGarage />} />
      <Route path="/edit-mechanic/:id" element={<EditMechanic />} />
    </Routes>
  </Router>
);

export default App;
