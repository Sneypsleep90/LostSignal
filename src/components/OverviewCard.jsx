import HeroCounter from "./HeroCounter.jsx";
import JourneyProgress from "./JourneyProgress.jsx";
import { formatStartDate } from "../utils/dates.js";
import { formatDaysLabel, formatGoalDays } from "../utils/format.js";

function OverviewIcon({ type }) {
  const paths = {
    time: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.5v4.7l3.2 2" />
      </>
    ),
    noise: (
      <>
        <path d="M5 9.5h3.2l4.6-4.1v13.2l-4.6-4.1H5z" />
        <path d="M17 9.2c.8.8 1.2 1.7 1.2 2.8s-.4 2-1.2 2.8" />
        <path d="M19.8 7c1.3 1.4 2 3 2 5s-.7 3.6-2 5" />
      </>
    ),
    start: (
      <>
        <rect x="5" y="6.5" width="14" height="13" rx="1.4" />
        <path d="M8.5 4.5v4" />
        <path d="M15.5 4.5v4" />
        <path d="M5 10.5h14" />
      </>
    ),
    threshold: (
      <>
        <path d="M6 19V5" />
        <path d="M6 6.2h9.8l-1.6 3 1.6 3H6" />
        <path d="M6 19h10" />
      </>
    ),
  };

  return (
    <span className="overview-metric__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        {paths[type]}
      </svg>
    </span>
  );
}

function getDashboardCopy({ days, returnedTime, remainingDays, hasReachedGoal }) {
  if (days === 0) {
    return {
      stateText: "Путь только начался.",
      returnedLabel: "первое время вернётся завтра",
      remainingText: `До рубежа — ${formatDaysLabel(remainingDays)}`,
      footerText: "Первый шаг за границу шума.",
    };
  }

  if (hasReachedGoal) {
    return {
      stateText: "Lost Signal достигнут",
      returnedLabel: returnedTime,
      remainingText: "Сигнал почти исчез.",
      footerText: "Сигнал почти исчез. Путь продолжается.",
    };
  }

  return {
    stateText: "Шум стал тише.",
    returnedLabel: returnedTime,
    remainingText: `До рубежа — ${formatDaysLabel(remainingDays)}`,
    footerText: "Шум стал тише. Лес гуще.",
  };
}

function MetricItem({ icon, label, value, index }) {
  return (
    <div className="overview-metric" style={{ "--metric-index": index }}>
      <OverviewIcon type={icon} />
      <div>
        <p className="overview-metric__label">{label}</p>
        <p className="overview-metric__value">{value}</p>
      </div>
    </div>
  );
}

export default function OverviewCard({ profile, stats, onResetRequest }) {
  const target = stats.target;
  const stage = stats.currentStage;
  const copy = getDashboardCopy(stats);
  const daysPhrase = `${formatDaysLabel(stats.days)} без ${target.valueLabel}`;
  const startDate = formatStartDate(profile.startDate);

  return (
    <>
      <section className="overview-card" aria-label="Твой путь">
        <div className="overview-card__header">
          <p className="overview-eyebrow">Твой путь</p>
          <p className="overview-state">{copy.stateText}</p>
        </div>

        <div className="overview-card__grid">
          <div className="overview-hero">
            <HeroCounter days={stats.days} label={daysPhrase} />
          </div>

          <section className="overview-location" aria-label="Текущая локация">
            <p className="overview-section-label">Текущая локация</p>
            <h2>{stage.ruName}</h2>
            <p className="overview-location__description">{stage.description}</p>
            <p className="overview-location__remaining">{copy.remainingText}</p>
          </section>
        </div>

        <section className="overview-metrics" aria-label="Сводка пути">
          <MetricItem
            icon="time"
            label="Время вернулось"
            value={copy.returnedLabel}
            index={0}
          />
          <MetricItem
            icon="noise"
            label="Шум позади"
            value={target.label.toLowerCase()}
            index={1}
          />
          <MetricItem
            icon="start"
            label="Начало пути"
            value={startDate}
            index={2}
          />
          <MetricItem
            icon="threshold"
            label="Первый рубеж"
            value={formatGoalDays(profile.goalDays)}
            index={3}
          />
        </section>

        <section className="overview-route" aria-label="Твой маршрут">
          <p className="overview-section-label">Твой маршрут</p>
          <JourneyProgress days={stats.days} goalDays={profile.goalDays} />
        </section>

        <div className="overview-card__actions">
          <button
            className="overview-reset"
            type="button"
            onClick={onResetRequest}
          >
            Начать заново
          </button>
        </div>
      </section>

      <p className="quiet-line">{copy.footerText}</p>
    </>
  );
}
