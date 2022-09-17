import React from 'react';
import './App.css';

function App() {
  return (
    <div>{process.env.REACT_APP_BACKEND_PORT}</div>
  );
}

export default App;
