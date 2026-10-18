export type Theme = "day" | "night";

const STORAGE_KEY = "theme";
const EVENT = "themechange";

/** Inlined in <head> so a stored Night Protocol applies before first paint. */
export const themeScript = `try{if(localStorage.getItem("${STORAGE_KEY}")==="night")document.documentElement.dataset.theme="night"}catch(e){}`;

export const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "night" ? "night" : "day";

export function setTheme(theme: Theme) {
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    window.dispatchEvent(new Event(EVENT));
  };
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduced) document.startViewTransition(apply);
  else apply();
}

export const toggleTheme = () => setTheme(getTheme() === "night" ? "day" : "night");

export function subscribeTheme(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}
