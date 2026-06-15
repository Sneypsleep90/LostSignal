import { getTargetById } from "../constants/targets.js";
import { formatReturnedTime } from "./format.js";
import { getDaysAway } from "./dates.js";
import {
  getCurrentJourneyStage,
  getJourneyProgress,
  getRemainingDays,
  hasReachedGoal,
} from "./progress.js";

export function computeStats(profile) {
  if (!profile?.startDate) {
    return {
      days: 0,
      returnedMinutes: 0,
      returnedTime: formatReturnedTime(0),
      hours: 0,
      currentStage: getCurrentJourneyStage(0, 30),
      location: getCurrentJourneyStage(0, 30).ruName,
      progress: 0,
      remainingDays: 30,
      hasReachedGoal: false,
      target: getTargetById(),
    };
  }

  const days = getDaysAway(profile.startDate);
  const returnedMinutes = days * profile.dailyUsageMinutes;
  const stage = getCurrentJourneyStage(days, profile.goalDays);

  return {
    days,
    returnedMinutes,
    returnedTime: formatReturnedTime(returnedMinutes),
    hours: returnedMinutes / 60,
    currentStage: stage,
    location: stage.ruName,
    progress: getJourneyProgress(days, profile.goalDays),
    remainingDays: getRemainingDays(days, profile.goalDays),
    hasReachedGoal: hasReachedGoal(days, profile.goalDays),
    target: getTargetById(profile.target),
  };
}
