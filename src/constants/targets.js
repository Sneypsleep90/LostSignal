export const TARGETS = [
  {
    id: "short_videos",
    label: "Короткие видео",
    valueLabel: "коротких видео",
    defaultDailyUsageMinutes: 90,
    defaultGoalDays: 30,
  },
  {
    id: "social_media",
    label: "Соцсети",
    valueLabel: "соцсетей",
    defaultDailyUsageMinutes: 60,
    defaultGoalDays: 30,
  },
  {
    id: "news",
    label: "Новости",
    valueLabel: "новостей",
    defaultDailyUsageMinutes: 30,
    defaultGoalDays: 14,
  },
  {
    id: "games",
    label: "Игры",
    valueLabel: "игр",
    defaultDailyUsageMinutes: 90,
    defaultGoalDays: 30,
  },
  {
    id: "custom",
    label: "Другое",
    valueLabel: "шума",
    defaultDailyUsageMinutes: 60,
    defaultGoalDays: 30,
  },
];

export const DEFAULT_TARGET_ID = "short_videos";

export function getTargetById(id) {
  return TARGETS.find((target) => target.id === id) ?? getDefaultTarget();
}

export function getDefaultTarget() {
  return TARGETS.find((target) => target.id === DEFAULT_TARGET_ID);
}
