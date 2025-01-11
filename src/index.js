import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MainApp } from './MainApp.js';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'font-awesome/css/font-awesome.min.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp/>
  </React.StrictMode>,
  //document.getElementById('root')
);