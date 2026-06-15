import { useEffect, useRef, useState } from "react";

const DURATION = 1500;

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

export default function HeroCounter({ days, label }) {
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
    <div className="hero-counter">
      <div className="hero-counter__number">{displayDays}</div>
      <div className="hero-counter__label">{label}</div>
    </div>
  );
}
