import { motion } from "framer-motion";

function StatIcon({ type }) {
  const paths = {
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.5 V12 L15.5 14" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21 C12 21 18 15.7 18 10.5 C18 7.2 15.3 4.5 12 4.5 C8.7 4.5 6 7.2 6 10.5 C6 15.7 12 21 12 21 Z" />
        <circle cx="12" cy="10.5" r="2.1" />
      </>
    ),
    calendar: (
      <>
        <rect x="5" y="6.5" width="14" height="13" rx="1.4" />
        <path d="M8.5 4.5 V8.5" />
        <path d="M15.5 4.5 V8.5" />
        <path d="M5 10.5 H19" />
      </>
    ),
  };

  return (
    <span className="stat-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        {paths[type]}
      </svg>
    </span>
  );
}

export default function StatisticsPanel({ hours, location, startDate }) {
  return (
    <motion.section
      className="statistics-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-row">
        <StatIcon type="clock" />
        <p className="hours">
          <strong>{hours.toLocaleString("ru-RU")}</strong>
          <span>часов возвращено</span>
        </p>
      </div>

      <div className="stat-divider" aria-hidden="true" />

      <div className="stat-row">
        <StatIcon type="pin" />
        <div>
          <p className="location-label">Текущая локация</p>
          <p className="location-name">{location}</p>
        </div>
      </div>

      <div className="stat-divider" aria-hidden="true" />

      {startDate && (
        <div className="stat-row">
          <StatIcon type="calendar" />
          <p className="started">начало {startDate}</p>
        </div>
      )}
    </motion.section>
  );
}
