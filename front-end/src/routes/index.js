import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register, Tasks } from '../pages';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default AppRoutes;
