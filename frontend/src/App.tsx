import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatRoom from './ChatRoom/index';

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<ChatRoom />} />
          </Routes>
      </BrowserRouter>

  )

}

export default App;
