export const THEMES = [
  {
    id: "noisy_forest",
    label: "Шумный лес",
    description:
      "Туман, хвоя и слабый сигнал. Чем дальше идёшь, тем тише становится шум.",
  },
];

export const DEFAULT_THEME_ID = "noisy_forest";

export function getThemeById(id) {
  return THEMES.find((theme) => theme.id === id) ?? getDefaultTheme();
}

export function getDefaultTheme() {
  return THEMES.find((theme) => theme.id === DEFAULT_THEME_ID);
}
