import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Load global styles
import App from './App'; // Load the main App component

// Identify the 'root' element from index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main <App /> component into the 'root' element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

