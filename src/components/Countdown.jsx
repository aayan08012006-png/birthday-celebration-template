import { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown({ onBirthdayReached, birthdayReached }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [prevTime, setPrevTime] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    if (birthdayReached) return;

    const targetDate = new Date("2025-12-18T00:00:00"); // Set birthday date here

    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ hours, minutes, seconds });

      if (diff <= 0 && !birthdayReached) {
        onBirthdayReached();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [onBirthdayReached, birthdayReached]);

  useEffect(() => {
    setPrevTime(time);
  }, [time]);

  const Digit = ({ value, label, prevValue }) => {
    const shouldFlip = prevValue !== null && prevValue !== value;
    return (
      <div className="digit">
        <div className={`card ${shouldFlip ? "flip" : ""}`}>
          <div className="text">{String(value).padStart(2, "0")}</div>
        </div>
        <div className="label">{label}</div>
      </div>
    );
  };

  // ✅ CUSTOM FIRST PAGE TEXT
  if (birthdayReached) {
    return (
      <section className="countdown">
        <div className="flip-timer">
          <span className="birthday-celebration">
            💖 Happy Birthday Sania! 💖
            <br />
            Assalamu Alaikum! 🌸
            <br />
            Something magical is waiting for you today ✨
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="countdown">
      <div className="flip-timer">
        <Digit value={time.hours} label="Hours" prevValue={prevTime.hours} />
        <Digit value={time.minutes} label="Minutes" prevValue={prevTime.minutes} />
        <Digit value={time.seconds} label="Seconds" prevValue={prevTime.seconds} />
      </div>

      {/* ⚠️ TEST BUTTON - delete it before going live ⚠️ */}
      <button
        className="test-button"
        onClick={onBirthdayReached}
        title="Skip countdown and see celebration"
      >
        🎉 Test Celebration
      </button>
      {/* ⚠️ END TEST BUTTON */}
    </section>
  );
}

export default Countdown;
