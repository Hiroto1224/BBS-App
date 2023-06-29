import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ChatRoom from './ChatRoom/index';

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<ChatRoom />} />
              <Route path={'/register/'} element={<Register />} />
              <Route path={'/login/'} element={<Login />} />
              <Route path={'/ChatRoom/'} element={<ChatRoom />} />
          </Routes>
      </BrowserRouter>

  )

}

export default App;
