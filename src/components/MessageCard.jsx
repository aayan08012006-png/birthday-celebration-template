import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);

  const message = `[Sania],

Assalamu Alaikum! 🌸

On this special day, I pray that Allah blesses you with endless happiness, health, and success.
May every moment of your life be filled with smiles, love, and beautiful memories.

You are truly a blessing, and I hope this birthday brings you joy as bright as your smile.
Always keep shining, stay strong, and remember someone is wishing you the best today and always 💖

May Allah guide you, protect you, and make all your dreams come true. ✨

Happy Birthday, Sania! 🎉

— From Your Secret Admirer`;

  useEffect(() => {
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    if (!isActive && prevIsActive.current) {
      setTimeout(() => setCurtainsOpened(false), 300);
    }

    prevIsActive.current = isActive;
    return undefined;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (!curtainsOpened) {
      setCurtainsOpened(true);
      gsap.to(curtainHintRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(curtainLeftRef.current, { x: "-100%", duration: 1, ease: "power3.inOut" });
      gsap.to(curtainRightRef.current, { x: "100%", duration: 1, ease: "power3.inOut" });
      gsap.to(messageContentRef.current, { opacity: 1, scale: 1, duration: 1, delay: 0.8 });
    }
  };

  return (
    <section className="message">
      <h2>💌 A Message From My Heart</h2>

      <div className="curtain-container">
        <div className="curtain-rod"></div>

        <div
          className={`curtain-wrapper ${curtainsOpened ? "opened" : ""}`}
          onClick={handleOpenCurtains}
          onTouchStart={handleOpenCurtains}
          role="button"
          tabIndex={0}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left"></div>
          <div ref={curtainRightRef} className="curtain curtain-right"></div>
          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ Click or Tap to Open ✨
            </div>
          )}
        </div>

        <div ref={messageContentRef} className="message-content">
          <p>{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;
