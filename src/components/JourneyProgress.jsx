import { JOURNEY_STAGES } from "../constants/journey.js";
import { getJourneyProgress } from "../utils/progress.js";

function getPosition(index) {
  return (index / (JOURNEY_STAGES.length - 1)) * 100;
}

function getPointOffset(index) {
  const progress = index / (JOURNEY_STAGES.length - 1);
  return 43 - progress * 86;
}

function getCurrentIndex(days, goalDays) {
  const progress = getJourneyProgress(days, goalDays);
  const lastIndex = JOURNEY_STAGES.length - 1;

  return progress >= 1 ? lastIndex : Math.floor(progress * lastIndex);
}

export default function JourneyProgress({ days, goalDays = 30 }) {
  const currentIndex = getCurrentIndex(days, goalDays);
  const progress = getJourneyProgress(days, goalDays);
  const progressPercent = progress * 100;
  const fillOffset = progress * 86;

  return (
    <div
      className="journey-progress"
      style={{
        "--journey-progress": `calc(${progressPercent}% - ${fillOffset}px)`,
      }}
      aria-label={`Пройдено ${Math.round(progressPercent)} процентов пути`}
    >
      <div className="journey-progress__track" aria-hidden="true" />
      <div
        className="journey-progress__fill"
        aria-hidden="true"
      />

      {JOURNEY_STAGES.map((stage, index) => {
        const position = getPosition(index);
        const isComplete =
          currentIndex === JOURNEY_STAGES.length - 1
            ? index <= currentIndex
            : index < currentIndex;
        const isCurrent =
          index === currentIndex;

        return (
          <div
            key={stage.id}
            className={[
              "journey-progress__point",
              isComplete ? "is-complete" : "",
              isCurrent ? "is-current" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ left: `calc(${position}% + ${getPointOffset(index)}px)` }}
          >
            <span className="journey-progress__marker" aria-hidden="true" />
            <span className="journey-progress__label">{stage.ruName}</span>
          </div>
        );
      })}
    </div>
  );
}
