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
  const [isResetOpen, setIsResetOpen] = useState(false);

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

  function handleResetConfirm() {
    resetSignalProfile();
    setIsResetOpen(false);
    setProfile(null);
    setStats(computeStats(null));
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
          <OverviewCard
            profile={profile}
            stats={stats}
            onResetRequest={() => setIsResetOpen(true)}
          />
        </div>

        <div aria-hidden="true" />
      </section>

      {isResetOpen && (
        <div className="reset-dialog-layer" role="presentation">
          <section
            className="reset-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-dialog-title"
          >
            <p className="reset-dialog__eyebrow">Новый путь</p>
            <h2 id="reset-dialog-title">Начать заново?</h2>
            <p>
              Текущий путь будет очищен на этом устройстве. После этого можно
              будет выбрать другой шум и новый рубеж.
            </p>
            <div className="reset-dialog__actions">
              <button
                className="reset-dialog__button reset-dialog__button--quiet"
                type="button"
                onClick={() => setIsResetOpen(false)}
              >
                Остаться
              </button>
              <button
                className="reset-dialog__button"
                type="button"
                onClick={handleResetConfirm}
              >
                Начать заново
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
