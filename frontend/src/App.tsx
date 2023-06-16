import React, {useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import ChatRoom from './ChatRoom/index';

const url = "https://bboard.azurewebsites.net/test"


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/register/'} element={<Register />} />
              <Route path={'/login/'} element={<Login />} />
              <Route path={'/ChatRoom/'} element={<ChatRoom />} />
          </Routes>
      </BrowserRouter>

  )

}

export default App;
