import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const CANDLE_X = [78, 110, 142];

function fireConfetti() {
  const colors = ["#ff6a9e", "#f3c66b", "#c9a9e8", "#fdf6ea"];
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 42,
    origin: { y: 0.65 },
    colors,
  });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors,
    });
  }, 250);
}

export default function Cake() {
  const [blown, setBlown] = useState(false);

  const handleBlow = useCallback(() => {
    if (blown) return;
    setBlown(true);
    fireConfetti();
  }, [blown]);

  return (
    <div className="page cake">
      <div className="container cake__content">
        <p className="eyebrow">Chapter Four</p>
        <h2 className="cake__heading">Make a wish, Shilpi</h2>
        <p className="cake__sub">
          {blown
            ? "Whatever you wished for — I hope it finds its way to you."
            : "Go on, blow them out."}
        </p>

        <svg viewBox="0 0 220 200" width="260" height="236" className="cake__svg">
          {/* plate */}
          <ellipse cx="110" cy="178" rx="88" ry="12" fill="var(--bg-3)" />
          {/* bottom tier */}
          <rect x="35" y="130" width="150" height="46" rx="8" fill="var(--pink-deep)" />
          <rect x="35" y="130" width="150" height="10" rx="5" fill="var(--pink)" />
          {/* top tier */}
          <rect x="60" y="92" width="100" height="42" rx="8" fill="var(--panel)" />
          <rect x="60" y="92" width="100" height="10" rx="5" fill="var(--lavender)" />
          {/* drips */}
          <circle cx="70" cy="132" r="5" fill="var(--gold)" />
          <circle cx="110" cy="132" r="5" fill="var(--gold)" />
          <circle cx="150" cy="132" r="5" fill="var(--gold)" />

          {CANDLE_X.map((x, i) => (
            <g key={i}>
              <rect x={x - 3} y="66" width="6" height="26" rx="2" fill="var(--gold)" />
              {!blown && (
                <motion.ellipse
                  cx={x}
                  cy="60"
                  rx="4.5"
                  ry="7"
                  fill="url(#flameGrad)"
                  animate={{
                    scaleY: [1, 1.18, 0.9, 1.1, 1],
                    scaleX: [1, 0.9, 1.05, 0.95, 1],
                    opacity: [1, 0.9, 1, 0.95, 1],
                  }}
                  transition={{ duration: 1.4 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: `${x}px 64px` }}
                />
              )}
              {blown && (
                <motion.g
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.9 }}
                >
                  <path
                    d={`M${x - 1} 58 q3 -6 5 -10`}
                    stroke="rgba(230,220,230,0.55)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.g>
              )}
            </g>
          ))}

          <defs>
            <radialGradient id="flameGrad" cx="50%" cy="70%" r="70%">
              <stop offset="0%" stopColor="#fff3c4" />
              <stop offset="55%" stopColor="var(--gold)" />
              <stop offset="100%" stopColor="var(--pink)" />
            </radialGradient>
          </defs>
        </svg>

        {!blown ? (
          <button className="btn btn--pink" onClick={handleBlow}>
            Blow out the candles
          </button>
        ) : (
          <motion.div
            className="cake__finale"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="cake__finale-title">Happy Birthday, Shilpi 🎂</h3>
            <p className="cake__finale-text">
              Here's to another year of you being exactly, wonderfully
              yourself. Go do something today that makes you feel it's
              actually your birthday.
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        .cake__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }
        .cake__heading {
          font-size: clamp(1.8rem, 5vw, 2.6rem);
          margin-top: 0.4rem;
        }
        .cake__sub {
          margin-bottom: 1rem;
          min-height: 1.6em;
        }
        .cake__svg {
          margin: 0.5rem 0 1.8rem;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.35));
        }
        .cake__finale {
          max-width: 46ch;
        }
        .cake__finale-title {
          font-size: clamp(1.5rem, 4.2vw, 2.1rem);
          color: var(--gold);
          margin-bottom: 0.7rem;
        }
      `}</style>
    </div>
  );
}
