import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import ForestBackground from "./components/ForestBackground.jsx";
import Onboarding from "./components/Onboarding.jsx";
import OverviewCard from "./components/OverviewCard.jsx";
import { computeStats } from "./utils/computeStats.js";
import {
  getSignalProfile,
  resetSignalProfile,
  saveSignalProfile,
} from "./utils/storage.js";

function getInitialProfile() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("reset")) {
    resetSignalProfile();
    return null;
  }

  return getSignalProfile();
}

export default function App() {
  const [profile, setProfile] = useState(getInitialProfile);
  const [stats, setStats] = useState(() => computeStats(profile));

  useEffect(() => {
    setStats(computeStats(profile));

    if (!profile?.startDate) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setStats(computeStats(profile));
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [profile]);

  function handleComplete(profileDraft) {
    const nextProfile = saveSignalProfile(profileDraft);
    if (new URLSearchParams(window.location.search).has("reset")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setProfile(nextProfile);
    setStats(computeStats(nextProfile));
  }

  if (!profile) {
    return (
      <main className="app-shell app-shell--entry" aria-label="Lost Signal">
        <ForestBackground />
        <Onboarding onComplete={handleComplete} />
      </main>
    );
  }

  return (
    <main className="app-shell" aria-label="Lost Signal">
      <ForestBackground />

      <section className="experience" aria-live="polite">
        <AppHeader />

        <div className="center-stage">
          <OverviewCard profile={profile} stats={stats} />
        </div>

        <div aria-hidden="true" />
      </section>
    </main>
  );
}
