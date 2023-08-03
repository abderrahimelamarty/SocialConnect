import React from 'react';
import Login from './pages/login/Login';
import Hello from './components/Hello';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/register/register';
import Home from './pages/home/Home';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/NavBar/Navbar';
import { Profile } from './pages/Profile/Profile';
import "./App.css"

function App() {
  return (
    <Routes>

    <Route
      path="/"
      element={
       
        <PrivateRoute>
        <Home />
      </PrivateRoute>
       
      }
    />
    <Route path="/home" element={ <PrivateRoute>
        <Home />
      </PrivateRoute>} />
      <Route path="/profile" element={<Profile />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
  );
}

export default App;
