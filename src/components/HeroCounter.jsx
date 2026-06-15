import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const DURATION = 1500;

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

export default function HeroCounter({ days }) {
  const [displayDays, setDisplayDays] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const startedAt = performance.now();

    function tick(now) {
      const progress = Math.min((now - startedAt) / DURATION, 1);
      setDisplayDays(Math.round(days * easeOutCubic(progress)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [days]);

  return (
    <motion.div
      className="hero-counter"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-counter__number">{displayDays}</div>
      <div className="hero-counter__label">дней вдали</div>
    </motion.div>
  );
}
