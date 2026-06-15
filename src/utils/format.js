function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".0", "");
}

function getPluralForm(value, one, few, many) {
  const absoluteValue = Math.abs(Math.trunc(value));
  const lastDigit = absoluteValue % 10;
  const lastTwoDigits = absoluteValue % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return many;
  }

  if (lastDigit === 1) {
    return one;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }

  return many;
}

export function formatReturnedTime(minutes) {
  const safeMinutes = Math.max(0, Number(minutes) || 0);

  if (safeMinutes < 60) {
    const roundedMinutes = Math.round(safeMinutes);
    return `${roundedMinutes} ${getPluralForm(
      roundedMinutes,
      "минута",
      "минуты",
      "минут",
    )}`;
  }

  const hours = safeMinutes / 60;
  const roundedHours = Math.round(hours * 10) / 10;
  const label = Number.isInteger(roundedHours)
    ? getPluralForm(roundedHours, "час", "часа", "часов")
    : roundedHours < 5
      ? "часа"
      : "часов";

  return `${formatNumber(roundedHours)} ${label}`;
}

export function formatDaysLabel(days) {
  const safeDays = Math.max(0, Math.trunc(Number(days) || 0));
  return `${safeDays} ${getPluralForm(safeDays, "день", "дня", "дней")}`;
}

export function formatGoalDays(goalDays) {
  return formatDaysLabel(goalDays);
}
