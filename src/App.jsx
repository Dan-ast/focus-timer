import {useEffect, useRef, useState} from 'react';
import './App.css';
import './index.css';
import { flushSync } from 'react-dom';

function App() {
  const [mode, setMode] = useState('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0); //how many focus sessions completed
  const [autoContinue, setAutoContinue] = useState(true); //i will make it a toggle

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

  useEffect(() => {
    //only for pomodoro + break, not stopwatch
    if (mode === "stopwatch") return; 

    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      playDing();

      //update counter and next mode
      if (mode === "pomodoro") {
        setPomodoroCount((prev) => prev + 1);
        if (autoContinue) {
          setMode("short-break");
          setSecondsLeft(getInitialSeconds("short-break"));
          setIsRunning(true);
        }
      } else if (mode === "short-break") {
        if (autoContinue) {
          setMode("pomodoro");
          setSecondsLeft(getInitialSeconds("pomodoro"));
          setIsRunning(true);
        }
      }
    }
  }, [secondsLeft, isRunning, mode, autoContinue]);

  const playDing = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext) ();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = 880;

      gain.gain.value = 0.0001;
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch (e) {

    }
  };

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
          <p className="timer-subtitle" style={{ marginTop: 10}}>
            Completed focus sessions: {pomodoroCount}
          </p>
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
