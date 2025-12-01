import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className="app">
      <h1>Focus Timer</h1>
      <p>Choose a mode to get started:</p>
      <div className="modes">
        <button>Stopwatch</button>
        <button>Pomodoro</button>
      </div>
    </div>
  );
}

export default App;
