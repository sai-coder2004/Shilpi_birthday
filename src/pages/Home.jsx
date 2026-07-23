import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Ambient from "../components/Ambient";

const NAME = "Shilpi";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
};

const letter = {
  hidden: { y: 40, opacity: 0, rotate: -6 },
  show: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// A few hand-placed balloons — irregular, not a grid, like they were
// actually let go into the sky.
const BALLOONS = [
  { x: "8%", color: "var(--pink)", delay: 0, size: 46, drift: 14 },
  { x: "20%", color: "var(--gold)", delay: 1.4, size: 34, drift: -10 },
  { x: "78%", color: "var(--lavender)", delay: 0.6, size: 40, drift: 10 },
  { x: "90%", color: "var(--pink)", delay: 2.1, size: 30, drift: -16 },
  { x: "62%", color: "var(--gold)", delay: 3, size: 26, drift: 8 },
];

function Balloon({ x, color, delay, size, drift }) {
  return (
    <motion.div
      className="balloon"
      style={{ left: x }}
      initial={{ y: "115vh", opacity: 0 }}
      animate={{ y: "-30vh", opacity: [0, 1, 1, 0.9], x: [0, drift, 0, drift] }}
      transition={{ duration: 16, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size * 1.25} viewBox="0 0 40 50" fill="none">
        <ellipse cx="20" cy="20" rx="20" ry="22" fill={color} />
        <path d="M20 42 L20 50" stroke={color} strokeWidth="1" opacity="0.6" />
        <path
          d="M17 40 Q20 45 23 40"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
}

export default function Home() {
  const [begun, setBegun] = useState(false);

  return (
    <div className="page home">
      <Ambient />
      {BALLOONS.map((b, i) => (
        <Balloon key={i} {...b} />
      ))}

      <div className="container home__content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          July 29 · a little corner of the internet, just for you
        </motion.p>

        <h1 className="home__title">
          <span className="home__title-line">Happy Birthday,</span>
          <motion.span
            className="home__name"
            variants={container}
            initial="hidden"
            animate="show"
            onAnimationComplete={() => setBegun(true)}
          >
            {NAME.split("").map((ch, i) => (
              <motion.span key={i} variants={letter} className="home__name-letter">
                {ch}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          className="home__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: begun ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          Someone went and built you an entire tiny website, because a text
          message felt like nowhere near enough for a day like this.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: begun ? 1 : 0, y: begun ? 0 : 12 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Link to="/letter" className="btn">
            Begin the surprise →
          </Link>
        </motion.div>
      </div>

      <style>{`
        .home {
          justify-content: center;
          text-align: center;
          min-height: 100vh;
        }
        .home__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
        }
        .home__title {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
        }
        .home__title-line {
          font-family: var(--body);
          font-weight: 600;
          font-size: clamp(1rem, 2.4vw, 1.4rem);
          color: var(--lavender);
          letter-spacing: 0.02em;
          margin-bottom: 0.6rem;
        }
        .home__name {
          display: inline-flex;
          font-family: var(--display);
          font-optical-sizing: auto;
          font-weight: 700;
          font-size: clamp(3.2rem, 15vw, 8rem);
          background: linear-gradient(180deg, var(--cream), var(--gold) 120%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .home__name-letter {
          display: inline-block;
        }
        .home__sub {
          max-width: 42ch;
          font-size: 1.05rem;
          margin: 0.5rem 0 0.75rem;
        }
        .balloon {
          position: fixed;
          bottom: 0;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
