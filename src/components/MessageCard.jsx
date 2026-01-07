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

  // 🎉 Your personalized message 🎉
  const message = `[Sania],

Assalamu Alaikum! 🌸

On this special day, I pray that Allah blesses you with endless happiness, health, and success.
May every moment of your life be filled with smiles, love, and beautiful memories.

You are truly a blessing, and I hope this birthday brings you joy as bright as your smile.
Always keep shining, stay strong, and remember someone is wishing you the best today and always 💖

May Allah guide you, protect you, and make all your dreams come true. ✨

Happy Birthday, Sania! 🎉

— From Your Secret Admirer`;

  // Handle page transitions
  useEffect(() => {
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    if (!isActive && prevIsActive.current) {
      setTimeout(() => {
        setCurtainsOpened(false);
        if (curtainLeftRef.current && curtainRightRef.current) {
          const resetTimeline = gsap.timeline();
          resetTimeline.to([curtainLeftRef.current, curtainRightRef.current], {
            opacity: 1,
            duration: 0.3,
          });
          resetTimeline.to(
            [curtainLeftRef.current, curtainRightRef.current],
            { x: "0%", rotationY: 0, duration: 0.5, ease: "power2.inOut" },
            0.3
          );
        }
        if (messageContentRef.current) {
          gsap.to(messageContentRef.current, { opacity: 0, scale: 0.9, duration: 0.3 });
        }
      }, 300);
    }

    prevIsActive.current = isActive;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (!curtainsOpened) {
      setCurtainsOpened(true);

      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;
      const duration = isSmallMobile ? 1.2 : isMobile ? 1.4 : 1.5;
      const rotationAngle = isSmallMobile ? 10 : isMobile ? 12 : 15;

      gsap.to(curtainHintRef.current, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power2.in" });

      const timeline = gsap.timeline();
      timeline.to(curtainLeftRef.current, { x: "-100%", rotationY: -rotationAngle, duration, ease: "power3.inOut" }, 0);
      timeline.to(curtainRightRef.current, { x: "100%", rotationY: rotationAngle, duration, ease: "power3.inOut" }, 0);
      timeline.to([curtainLeftRef.current, curtainRightRef.current], { opacity: 0, duration: 0.5, delay: isMobile ? 0.8 : 1 }, 0);
      timeline.to(messageContentRef.current, { opacity: 1, scale: 1, duration: isMobile ? 0.8 : 1, ease: "back.out(1.2)", delay: isMobile ? 0.6 : 0.8 }, 0);
    }
  };

  const handleTouchStart = () => {
    if (!curtainsOpened) gsap.to(curtainHintRef.current, { scale: 0.95, duration: 0.1 });
  };

  const handleTouchEnd = () => {
    if (!curtainsOpened) gsap.to(curtainHintRef.current, { scale: 1, duration: 0.1 });
  };

  return (
    <section className="message">
      <h2>💌 A Message From My Heart</h2>

      <div className="curtain-container">
        <div className="curtain-rod"></div>

        <div
          className={`curtain-wrapper ${curtainsOpened ? "opened opening" : ""}`}
          onClick={handleOpenCurtains}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={curtainsOpened ? -1 : 0}
          aria-label="Click or tap to open the curtains and reveal the birthday message"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !curtainsOpened) {
              e.preventDefault();
              handleOpenCurtains();
            }
          }}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left"></div>
          <div ref={curtainRightRef} className="curtain curtain-right"></div>
          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ {window.innerWidth <= 768 ? "Tap" : "Click"} to Open ✨
            </div>
          )}
        </div>

        <div ref={messageContentRef} className="message-content" role="article" aria-label="Birthday message">
          <p className="typed-text">{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;

