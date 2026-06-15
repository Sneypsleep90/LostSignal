export const JOURNEY_MILESTONES = [
  { day: 0, label: "Опушка леса" },
  { day: 7, label: "Глухие сосны" },
  { day: 30, label: "Старая хижина" },
  { day: 100, label: "Туманное озеро" },
  { day: 180, label: "Тихая долина" },
  { day: 365, label: "Lost Signal" },
];

export function getJourneyLocation(days) {
  return [...JOURNEY_MILESTONES]
    .reverse()
    .find((milestone) => days >= milestone.day).label;
}

export function getJourneyProgress(days) {
  return Math.min((days / 365) * 100, 100);
}
