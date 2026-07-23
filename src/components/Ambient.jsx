import { motion } from "framer-motion";

// A handful of soft drifting sparks — deliberately few, so it reads as
// atmosphere rather than a snow-globe of effects.
const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: (i * 97) % 100,
  delay: (i * 1.7) % 8,
  duration: 9 + ((i * 3) % 6),
  size: 3 + (i % 3) * 2,
  hue: i % 2 === 0 ? "var(--gold)" : "var(--pink)",
}));

export default function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      {SPARKS.map((s) => (
        <motion.span
          key={s.id}
          className="ambient__spark"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.hue,
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <style>{`
        .ambient {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .ambient__spark {
          position: absolute;
          border-radius: 50%;
          filter: blur(0.3px);
        }
      `}</style>
    </div>
  );
}
