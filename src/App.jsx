import {useEffect, useRef, useState} from 'react';
import './App.css';
import './index.css';

function App() {
  const [mode, setMode] = useState('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const getInitialSeconds = (currentMode) => {
    if (currentMode === "pomodoro") return 25 * 60;
    if (currentMode === "short-break") return 5 * 60;
    return 0;
  };

  useEffect(() => {
    if(!isRunning) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (mode === "stopwatch") return prev + 1;

        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode]);

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
          onClick={() => {
            setMode('pomodoro');
            setIsRunning(false);
            setSecondsLeft(getInitialSeconds("pomodoro"));
          }}>
            Pomodoro
          </button>

          <button className={`mode-btn ${mode === 'short-break' ? 'mode-btn--active' : ''}`} 
          onClick={() => {
            setMode('short-break');
            setIsRunning(false);
            setSecondsLeft(getInitialSeconds("short-break"));
            }}>
            Short break
          </button>

          <button className={`mode-btn ${mode === 'stopwatch' ? 'mode-btn--active' : ''}`} 
          onClick={() => {
            setMode('stopwatch');
            setIsRunning(false);
            setSecondsLeft(getInitialSeconds("stopwatch"));
            }}>
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
          <button className="primary-btn" onClick={() => setIsRunning((prev) => !prev)}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="ghost-btn" onClick={() => {
            setIsRunning(false);
            setSecondsLeft(mode === "pomodoro" ? 25 * 60 : mode === "short-break" ? 5 * 60 : 0);
            }}>
              Reset
          </button>
        </section>

      </main>
    </div>
  );
}

export default App;
