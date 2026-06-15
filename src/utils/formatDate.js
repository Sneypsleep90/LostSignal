export function formatStartDate(startDate) {
  if (!startDate) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${startDate}T00:00:00`));
}
