import { motion } from "framer-motion";

const MILESTONES = [
  { day: 0, label: "Опушка леса" },
  { day: 7, label: "Глухие сосны" },
  { day: 30, label: "Старая хижина" },
  { day: 100, label: "Туманное озеро" },
  { day: 180, label: "Тихая долина" },
  { day: 365, label: "Lost Signal" },
];

function getPosition(day) {
  return Math.min((day / 365) * 100, 100);
}

export default function JourneyProgress({ days }) {
  const progress = Math.min((days / 365) * 100, 100);

  return (
    <motion.div
      className="journey-progress"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`Пройдено ${Math.round(progress)} процентов пути`}
    >
      <div className="journey-progress__track" aria-hidden="true" />
      <motion.div
        className="journey-progress__fill"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      {MILESTONES.map((milestone) => (
        <span
          key={milestone.day}
          className={`journey-progress__marker${
            days >= milestone.day ? " is-reached" : ""
          }`}
          style={{ left: `${getPosition(milestone.day)}%` }}
          aria-hidden="true"
          title={milestone.label}
        />
      ))}
    </motion.div>
  );
}
