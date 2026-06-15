const DAY_IN_MS = 86_400_000;

const LOCATION_TIERS = [
  { min: 365, name: "Lost Signal" },
  { min: 180, name: "Тихая долина" },
  { min: 100, name: "Туманное озеро" },
  { min: 30, name: "Старая хижина" },
  { min: 7, name: "Глухие сосны" },
  { min: 0, name: "Опушка леса" },
];

export function getLocation(days) {
  return LOCATION_TIERS.find((tier) => days >= tier.min).name;
}

export function computeStats(startDate) {
  if (!startDate) {
    return {
      days: 0,
      hours: 0,
      location: getLocation(0),
    };
  }

  const start = new Date(`${startDate}T00:00:00`);
  const elapsed = Date.now() - start.getTime();
  const days = Math.max(0, Math.floor(elapsed / DAY_IN_MS));

  return {
    days,
    hours: days * 2,
    location: getLocation(days),
  };
}
