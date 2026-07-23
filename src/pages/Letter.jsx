import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* Edit the paragraphs below to personalize the letter — this is the
   one page on the site that most benefits from your own words. */
const PARAGRAPHS = [
  "Dear Shilpi,",
  "Another year has come around for you, and somehow it still feels like the right moment to stop and say — I'm really glad you exist.",
  "You've got a way of making ordinary days feel a little more alive, whether it's showing up for the people around you, laughing at something ridiculous, or just being completely, unmistakably yourself.",
  "I hope this year hands you everything you've been quietly hoping for, and a fair few things you haven't even thought to ask for yet.",
  "So here's to you, Shilpi — happy birthday. This little site has a couple more surprises before it's done.",
];

export default function Letter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="page letter">
      <div className="container letter__content">
        <p className="eyebrow">Chapter Two</p>
        <h2 className="letter__heading">A letter, sealed just for you</h2>

        <div className="envelope-wrap">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.button
                key="envelope"
                className="envelope"
                onClick={() => setOpen(true)}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                aria-label="Open the letter"
              >
                <svg viewBox="0 0 220 150" width="100%" height="100%">
                  <rect x="4" y="4" width="212" height="142" rx="6" fill="var(--panel)" stroke="var(--gold)" strokeWidth="1.5" />
                  <path d="M4 10 L110 90 L216 10" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
                  <circle cx="110" cy="78" r="16" fill="var(--pink-deep)" />
                  <path d="M110 70 l3 6 h-6z" fill="var(--cream)" opacity="0.85" />
                </svg>
                <span className="envelope__hint">tap to open</span>
              </motion.button>
            ) : (
              <motion.div
                key="paper"
                className="paper"
                initial={{ y: 40, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {PARAGRAPHS.map((p, i) => (
                  <motion.p
                    key={i}
                    className={i === 0 ? "paper__greeting" : "paper__line"}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 + i * 0.35 }}
                  >
                    {p}
                  </motion.p>
                ))}
                <motion.p
                  className="paper__sign"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 + PARAGRAPHS.length * 0.35 }}
                >
                  — with love, always
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ delay: 0.25 + PARAGRAPHS.length * 0.35 + 0.4, duration: 0.6 }}
        >
          <Link to="/wishes" className="btn btn--pink">
            Keep going →
          </Link>
        </motion.div>
      </div>

      <style>{`
        .letter__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.4rem;
        }
        .letter__heading {
          font-size: clamp(1.8rem, 5vw, 2.6rem);
          max-width: 20ch;
        }
        .envelope-wrap {
          width: 100%;
          max-width: 420px;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem 0;
        }
        .envelope {
          width: 100%;
          max-width: 300px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          transition: transform 0.3s var(--ease-out);
        }
        .envelope:hover {
          transform: translateY(-4px) scale(1.02);
        }
        .envelope__hint {
          font-family: var(--body);
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .paper {
          width: 100%;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 2.4rem 2rem;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5);
        }
        .paper__greeting,
        .paper__line,
        .paper__sign {
          font-family: var(--hand);
          color: var(--cream);
          font-size: 1.6rem;
          line-height: 1.5;
          margin: 0 0 0.9rem;
        }
        .paper__greeting {
          font-size: 1.9rem;
          color: var(--gold);
        }
        .paper__sign {
          margin-top: 1.2rem;
          color: var(--pink);
        }
      `}</style>
    </div>
  );
}
