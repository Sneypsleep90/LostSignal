const DAY_IN_MS = 86_400_000;

function toLocalDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDateString(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : toLocalDate(date);
}

export function getTodayDateString() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

export function getDaysAway(startDate) {
  const start = parseDateString(startDate);

  if (!start) {
    return 0;
  }

  const today = toLocalDate(new Date());
  const diff = today.getTime() - start.getTime();

  return Math.max(0, Math.floor(diff / DAY_IN_MS));
}

export function formatStartDate(startDate) {
  const date = parseDateString(startDate);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
