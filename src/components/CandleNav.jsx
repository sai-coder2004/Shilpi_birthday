import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const CHAPTERS = [
  { path: "/", label: "Arrival" },
  { path: "/letter", label: "The Letter" },
  { path: "/wishes", label: "The Wishes" },
  { path: "/cake", label: "The Wish" },
];

export default function CandleNav() {
  const { pathname } = useLocation();
  const activeIndex = CHAPTERS.findIndex((c) => c.path === pathname);

  return (
    <nav className="candle-nav" aria-label="Chapters">
      <div className="candle-nav__row">
        {CHAPTERS.map((c, i) => {
          const lit = i <= activeIndex;
          const isActive = i === activeIndex;
          return (
            <NavLink
              key={c.path}
              to={c.path}
              className="candle-nav__item"
              aria-current={isActive ? "page" : undefined}
            >
              <span className="candle-nav__stick" data-lit={lit}>
                {lit && (
                  <motion.span
                    className="candle-nav__flame"
                    animate={{
                      scaleY: [1, 1.15, 0.95, 1.08, 1],
                      scaleX: [1, 0.92, 1.05, 0.97, 1],
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </span>
              <span className="candle-nav__label">{c.label}</span>
            </NavLink>
          );
        })}
      </div>

      <style>{`
        .candle-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          justify-content: center;
          padding: 1.1rem 1rem;
          background: linear-gradient(180deg, rgba(26,15,38,0.92), rgba(26,15,38,0));
          backdrop-filter: blur(2px);
        }
        .candle-nav__row {
          display: flex;
          gap: clamp(1.1rem, 4vw, 2.4rem);
        }
        .candle-nav__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          text-decoration: none;
          opacity: 0.55;
          transition: opacity 0.3s ease;
        }
        .candle-nav__item:hover,
        .candle-nav__item[aria-current="page"] {
          opacity: 1;
        }
        .candle-nav__stick {
          position: relative;
          width: 6px;
          height: 22px;
          border-radius: 2px;
          background: var(--gold-deep);
          opacity: 0.35;
        }
        .candle-nav__stick[data-lit="true"] {
          opacity: 1;
          box-shadow: 0 0 10px rgba(243, 198, 107, 0.55);
        }
        .candle-nav__flame {
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 13px;
          border-radius: 50% 50% 50% 50% / 65% 65% 35% 35%;
          background: radial-gradient(circle at 50% 70%, #fff3c4, var(--gold) 55%, var(--pink) 100%);
          filter: blur(0.2px);
        }
        .candle-nav__label {
          font-family: var(--body);
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--cream);
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .candle-nav__label { display: none; }
        }
      `}</style>
    </nav>
  );
}
