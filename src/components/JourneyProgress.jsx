import { motion } from "framer-motion";
import {
  JOURNEY_MILESTONES,
} from "../constants/journey.js";

function getPosition(index) {
  return (index / (JOURNEY_MILESTONES.length - 1)) * 100;
}

function getCurrentIndex(days) {
  return JOURNEY_MILESTONES.reduce((currentIndex, milestone, index) => {
    return days >= milestone.day ? index : currentIndex;
  }, 0);
}

export default function JourneyProgress({ days }) {
  const currentIndex = getCurrentIndex(days);
  const completedIndex =
    currentIndex === JOURNEY_MILESTONES.length - 1
      ? currentIndex
      : Math.max(currentIndex - 1, 0);
  const progress = getPosition(completedIndex);

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

      {JOURNEY_MILESTONES.map((milestone, index) => {
        const isComplete =
          currentIndex === JOURNEY_MILESTONES.length - 1
            ? index <= currentIndex
            : index < currentIndex;
        const isCurrent =
          currentIndex !== JOURNEY_MILESTONES.length - 1 &&
          index === currentIndex;

        return (
          <span
            key={milestone.day}
            className={[
              "journey-progress__marker",
              isComplete ? "is-complete" : "",
              isCurrent ? "is-current" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ left: `${getPosition(index)}%` }}
            aria-hidden="true"
            title={milestone.label}
          />
        );
      })}
    </motion.div>
  );
}
