import { DEFAULT_TARGET_ID, getTargetById } from "../constants/targets.js";
import { DEFAULT_THEME_ID, getThemeById } from "../constants/themes.js";
import { getTodayDateString } from "./dates.js";

const SIGNAL_PROFILE_STORAGE_KEY = "lost_signal_profile";
const LEGACY_START_DATE_KEYS = ["lost_signal_start"];

const FALLBACK_SIGNAL_PROFILE = {
  target: DEFAULT_TARGET_ID,
  dailyUsageMinutes: 90,
  goalDays: 30,
  theme: DEFAULT_THEME_ID,
};

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function getLegacyStartDate() {
  if (!canUseStorage()) {
    return null;
  }

  return (
    LEGACY_START_DATE_KEYS.map((key) => window.localStorage.getItem(key)).find(Boolean) ??
    null
  );
}

function normalizePositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function normalizeText(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function normalizeSignalProfile(profile = {}) {
  const target = getTargetById(
    normalizeText(profile.target, FALLBACK_SIGNAL_PROFILE.target),
  );
  const theme = getThemeById(
    normalizeText(profile.theme, FALLBACK_SIGNAL_PROFILE.theme),
  );

  return {
    startDate: normalizeText(profile.startDate, getTodayDateString()),
    target: target.id,
    dailyUsageMinutes: normalizePositiveNumber(
      profile.dailyUsageMinutes,
      FALLBACK_SIGNAL_PROFILE.dailyUsageMinutes,
    ),
    goalDays: normalizePositiveNumber(
      profile.goalDays,
      FALLBACK_SIGNAL_PROFILE.goalDays,
    ),
    theme: theme.id,
  };
}

function readProfileFromStorage() {
  if (!canUseStorage()) {
    return null;
  }

  const rawProfile = window.localStorage.getItem(SIGNAL_PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return null;
  }

  try {
    return normalizeSignalProfile(JSON.parse(rawProfile));
  } catch {
    return null;
  }
}

export function getSignalProfile() {
  const storedProfile = readProfileFromStorage();

  if (storedProfile) {
    return storedProfile;
  }

  const legacyStartDate = getLegacyStartDate();

  if (!legacyStartDate) {
    return null;
  }

  const migratedProfile = normalizeSignalProfile({
    ...FALLBACK_SIGNAL_PROFILE,
    startDate: legacyStartDate,
  });

  saveSignalProfile(migratedProfile);
  return migratedProfile;
}

export function saveSignalProfile(profile) {
  if (!canUseStorage()) {
    return normalizeSignalProfile(profile);
  }

  const normalizedProfile = normalizeSignalProfile(profile);
  window.localStorage.setItem(
    SIGNAL_PROFILE_STORAGE_KEY,
    JSON.stringify(normalizedProfile),
  );
  return normalizedProfile;
}

export function resetSignalProfile() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(SIGNAL_PROFILE_STORAGE_KEY);
  LEGACY_START_DATE_KEYS.forEach((key) => window.localStorage.removeItem(key));
}

export function hasSignalProfile() {
  return Boolean(getSignalProfile());
}

export const storage = {
  get: () => getSignalProfile()?.startDate ?? null,
  set: (date) => saveSignalProfile({ startDate: date }),
  clear: resetSignalProfile,
};
