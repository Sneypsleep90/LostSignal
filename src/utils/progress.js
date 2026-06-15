import { JOURNEY_STAGES } from "../constants/journey.js";

function normalizePositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

export function getJourneyProgress(daysAway, goalDays) {
  const safeGoalDays = normalizePositiveNumber(goalDays, 1);
  const safeDaysAway = Math.max(0, Number(daysAway) || 0);
  return Math.min(safeDaysAway / safeGoalDays, 1);
}

export function getCurrentJourneyStage(daysAway, goalDays) {
  const progress = getJourneyProgress(daysAway, goalDays);
  const lastIndex = JOURNEY_STAGES.length - 1;
  const stageIndex =
    progress >= 1 ? lastIndex : Math.floor(progress * lastIndex);

  return JOURNEY_STAGES[stageIndex];
}

export function getRemainingDays(daysAway, goalDays) {
  const safeGoalDays = normalizePositiveNumber(goalDays, 1);
  const safeDaysAway = Math.max(0, Number(daysAway) || 0);
  return Math.max(0, safeGoalDays - safeDaysAway);
}

export function hasReachedGoal(daysAway, goalDays) {
  return getRemainingDays(daysAway, goalDays) === 0;
}
