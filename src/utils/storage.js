const STORAGE_KEY = "lost_signal_start";

export const storage = {
  get: () => window.localStorage.getItem(STORAGE_KEY),
  set: (date) => window.localStorage.setItem(STORAGE_KEY, date),
  clear: () => window.localStorage.removeItem(STORAGE_KEY),
};
