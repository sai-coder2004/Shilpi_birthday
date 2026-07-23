import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CandleNav from "./components/CandleNav";
import Home from "./pages/Home";
import Letter from "./pages/Letter";
import Wishes from "./pages/Wishes";
import Cake from "./pages/Cake";

function FadeRoute({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <div className="night-sky" aria-hidden="true" />
      <CandleNav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<FadeRoute><Home /></FadeRoute>} />
          <Route path="/letter" element={<FadeRoute><Letter /></FadeRoute>} />
          <Route path="/wishes" element={<FadeRoute><Wishes /></FadeRoute>} />
          <Route path="/cake" element={<FadeRoute><Cake /></FadeRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
