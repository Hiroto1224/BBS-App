import React, {useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const url = "https://bboard.azurewebsites.net/test"
const GetData = async () => {
  const res = await fetch(url);
  const data = await res.text();
  return data;
}

function App() {
  const [todo, setTodos] = useState<string>();
  useEffect(() => {
    GetData().then(fetchData => {

      setTodos(fetchData)
    });

  }, [setTodos]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p> {todo}</p>
      </header>
    </div>
  );
}

export default App;
