import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
