import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AppHeader from "./components/AppHeader.jsx";
import ForestBackground from "./components/ForestBackground.jsx";
import HeroCounter from "./components/HeroCounter.jsx";
import JourneyProgress from "./components/JourneyProgress.jsx";
import Onboarding from "./components/Onboarding.jsx";
import StatisticsPanel from "./components/StatisticsPanel.jsx";
import { computeStats } from "./utils/computeStats.js";
import { formatStartDate } from "./utils/formatDate.js";
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

  const formattedDate = formatStartDate(startDate);

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
        <AppHeader />

        <div className="center-stage">
          <motion.section
            className="dashboard-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dashboard-panel__grid">
              <div className="counter-column">
                <HeroCounter days={stats.days} />
              </div>

              <StatisticsPanel
                hours={stats.hours}
                location={stats.location}
                startDate={formattedDate}
              />
            </div>

            <JourneyProgress days={stats.days} />
          </motion.section>

          <motion.p
            className="quiet-line"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
          >
            Тишина — это не отсутствие звуков, а присутствие себя.
          </motion.p>
        </div>

        <div aria-hidden="true" />
      </section>

      {!startDate && <Onboarding onStart={handleStart} />}
    </main>
  );
}
