import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ForestBackground from "./components/ForestBackground.jsx";
import HeroCounter from "./components/HeroCounter.jsx";
import JourneyProgress from "./components/JourneyProgress.jsx";
import Onboarding from "./components/Onboarding.jsx";
import StatisticsPanel from "./components/StatisticsPanel.jsx";
import { computeStats } from "./utils/computeStats.js";
import { storage } from "./utils/storage.js";

function getInitialStartDate() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("reset")) {
    storage.clear();
    return null;
  }

  return storage.get();
}

export default function App() {
  const [startDate, setStartDate] = useState(getInitialStartDate);
  const [stats, setStats] = useState(() => computeStats(startDate));

  useEffect(() => {
    setStats(computeStats(startDate));

    if (!startDate) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setStats(computeStats(startDate));
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [startDate]);

  const formattedDate = useMemo(() => {
    if (!startDate) {
      return "";
    }

    return new Intl.DateTimeFormat("ru-RU", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${startDate}T00:00:00`));
  }, [startDate]);

  function handleStart(date) {
    storage.set(date);
    if (new URLSearchParams(window.location.search).has("reset")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setStartDate(date);
    setStats(computeStats(date));
  }

  return (
    <main className="app-shell" aria-label="Lost Signal">
      <ForestBackground />

      <section className="experience" aria-live="polite">
        <motion.header
          className="brand-zone"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="brand">LOST SIGNAL</h1>
          <p className="signal-line">ещё один день дальше от шума</p>
        </motion.header>

        <div className="center-stage">
          <HeroCounter days={stats.days} />
          <StatisticsPanel
            hours={stats.hours}
            location={stats.location}
            startDate={formattedDate}
          />
          <JourneyProgress days={stats.days} />
        </div>

        <div aria-hidden="true" />
      </section>

      {!startDate && <Onboarding onStart={handleStart} />}
    </main>
  );
}
