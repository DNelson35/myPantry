import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Provider from './context/userContext';
import { BrowserRouter as Router } from 'react-router-dom'

const el = document.getElementById('root')

const root = ReactDOM.createRoot(el);

root.render(
  <Router>
    <Provider>
      <App/>
    </Provider>
  </Router>
  
)

