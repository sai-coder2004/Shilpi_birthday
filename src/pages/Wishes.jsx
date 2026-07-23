import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WISHES = [
  { face: "🍀", text: "May your coffee stay strong and your Mondays stay rare." },
  { face: "😂", text: "May you laugh until it's hard to breathe — at least once a week." },
  { face: "🌱", text: "May every risk you take this year land you somewhere good." },
  { face: "💛", text: "May the people who love you actually say so, out loud, often." },
  { face: "🌙", text: "May you rest without guilt and dream without limits." },
  { face: "✨", text: "May this be the year you quietly surprise yourself." },
];

function WishCard({ face, text, index }) {
  const [flipped, setFlipped] = useState(false);
  const rotation = (index - (WISHES.length - 1) / 2) * 4;

  return (
    <motion.button
      className="wish-card"
      style={{ rotate: `${rotation}deg` }}
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      aria-label={flipped ? text : "Tap to reveal a wish"}
    >
      <motion.div
        className="wish-card__inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="wish-card__face wish-card__front">
          <span className="wish-card__emoji">{face}</span>
        </div>
        <div className="wish-card__face wish-card__back">
          <p>{text}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function Wishes() {
  return (
    <div className="page wishes">
      <div className="container wishes__content">
        <p className="eyebrow">Chapter Three</p>
        <h2 className="wishes__heading">Six wishes, tucked into cards</h2>
        <p className="wishes__sub">Tap each one to open it.</p>

        <div className="wish-grid">
          {WISHES.map((w, i) => (
            <WishCard key={i} {...w} index={i} />
          ))}
        </div>

        <Link to="/cake" className="btn">
          One more thing →
        </Link>
      </div>

      <style>{`
        .wishes__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.6rem;
        }
        .wishes__heading {
          font-size: clamp(1.8rem, 5vw, 2.6rem);
          margin-top: 0.4rem;
        }
        .wishes__sub {
          margin-bottom: 1rem;
        }
        .wish-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.1rem;
          width: 100%;
          max-width: 620px;
          margin: 1.5rem 0 2.5rem;
          perspective: 1000px;
        }
        @media (max-width: 640px) {
          .wish-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .wish-card {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          aspect-ratio: 3 / 4;
        }
        .wish-card__inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .wish-card__face {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem;
          backface-visibility: hidden;
        }
        .wish-card__front {
          background: linear-gradient(160deg, var(--panel), var(--bg-3));
        }
        .wish-card__emoji {
          font-size: 2.2rem;
        }
        .wish-card__back {
          background: linear-gradient(160deg, var(--pink-deep), var(--bg-3));
          transform: rotateY(180deg);
        }
        .wish-card__back p {
          color: var(--cream);
          font-size: 0.82rem;
          line-height: 1.4;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
