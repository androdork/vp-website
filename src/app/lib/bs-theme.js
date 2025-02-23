// This script is used to change the theme of the website from dark to light and vice versa.


const THEMES = ["light", "dark"];
const PREFERED_THEME = "dark";
const LOCALSTORAGE_PREFIX = "bsTheme"

function getPreferredTheme() {
  return PREFERED_THEME;
}

function getOtherTheme() {
  return THEMES.find((theme) => theme !== getPreferredTheme());
}

function getLocalStoragePrefix() {
  return LOCALSTORAGE_PREFIX || "bsTheme";
}

function getSystemTheme() {
  const preferdTheme = getPreferredTheme();
  const otherTheme = getOtherTheme();
  return window.matchMedia(`(prefers-color-scheme: ${preferdTheme})`).matches ? preferdTheme : otherTheme;
}

function getStoredTheme() {
  return localStorage.getItem(`${getLocalStoragePrefix()}-theme_mode`) || null;
};

function storeTheme(theme) {
  localStorage.setItem(`${getLocalStoragePrefix()}-theme_mode`, theme);
}


const themeMode = getStoredTheme() || getPreferredTheme() || getSystemTheme();

const html = document.querySelector("html");
html.dataset.bsTheme = themeMode;
storeTheme(themeMode);

const triggerThemeChange = document.querySelector("#triggerThemeChange");
const mode = getStoredTheme()

function setButtonIcon(mode) {
  if (mode === "dark") {
    triggerThemeChange.innerHTML = '<i class="fas fa-sun"></i>';
    triggerThemeChange.classList.remove("btn-light");
    triggerThemeChange.classList.add("btn-dark");
  }
  else {
    triggerThemeChange.innerHTML = '<i class="fas fa-moon"></i>';
    triggerThemeChange.classList.remove("btn-dark");
    triggerThemeChange.classList.add("btn-light");
  }
}

function themeChangeHandler() {
  const html = document.querySelector("html");

  const mode = html.dataset.bsTheme
  if (mode === "dark") html.dataset.bsTheme = "light";
  else html.dataset.bsTheme = "dark";

  setButtonIcon(html.dataset.bsTheme);
  storeTheme(html.dataset.bsTheme);
}

if (triggerThemeChange) {
  setButtonIcon(mode);
  triggerThemeChange.addEventListener("click", themeChangeHandler);
}
