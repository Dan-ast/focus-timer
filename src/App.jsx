import './App.css';
import './index.css';

function App() {

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
          <button className="mode-btn mode-btn--active">Pomodoro</button>
          <button className="mode-btn">Short break</button>
          <button className="mode-btn">Stopwatch</button>
        </section>

        <section className="timer-display">
          <div className="timer-circle">
            <span className="timer-minutes">25</span>
            <span className="timer-colon">:</span>
            <span className="timer-seconds">00</span>
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
