import {useState} from 'react';
import './App.css';
import './index.css';

function App() {
  const [mode, setMode] = useState('pomodoro');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  return (
    <div className="app">
      <div className="glow-orb glow-orb--top" />
      <div className="glow-orb glow-orb--bottom"/>

      <main className="timer-shell">
        <header className="timer-header">
          <p className="timer-tag">focus timer &#183; v0.1</p>
          <h1 className="timer-title">Deep Focus Session</h1>
          <p className="timer-subtitle">
            Your space for Pomodoro sessions and calm, intentional work.
          </p>
        </header>

        <section className="mode-switch">
          <button className={`mode-btn ${mode === 'pomodoro' ? 'mode-btn--active' : ''}`} 
          onClick={() => setMode('pomodoro')}>
            Pomodoro
          </button>
          <button className={`mode-btn ${mode === 'short-break' ? 'mode-btn--active' : ''}`} 
          onClick={() => setMode('short-break')}>
            Short break
          </button>
          <button className={`mode-btn ${mode === 'stopwatch' ? 'mode-btn--active' : ''}`} 
          onClick={() => setMode('stopwatch')}>
            Stopwatch
          </button>
        </section>

        <section className="timer-display">
          <div className="timer-circle">
            <span className="timer-minutes">
              {String(minutes).padStart(2, '0')}
            </span>
            <span className="timer-colon">:</span>
            <span className="timer-seconds">
              {String(seconds).padStart(2, '0')}
            </span>
          </div>
        </section>

        <section className="timer-controls">
          <button className="primary-btn">Start</button>
          <button className="ghost-btn">Reset</button>
        </section>

      </main>
    </div>
  );
}

export default App;
