const themeToggle = document.querySelector('.theme-toggle');
const themeButtons = themeToggle.querySelectorAll('[data-theme-choice]');
const pageUrl = new URL(location.href);
const systemAppearance = matchMedia('(prefers-color-scheme: dark)');
const requestedTheme = pageUrl.searchParams.get('theme');
let themeOverride = requestedTheme === 'day' || requestedTheme === 'night' ? requestedTheme : null;

function showTheme() {
  const theme = themeOverride ?? (systemAppearance.matches ? 'night' : 'day');
  document.documentElement.dataset.theme = theme;
  for (const button of themeButtons) {
    button.setAttribute('aria-pressed', button.dataset.themeChoice === theme);
  }
}

showTheme();
themeToggle.hidden = false;
systemAppearance.addEventListener('change', showTheme);

for (const button of themeButtons) {
  button.addEventListener('click', () => {
    themeOverride = button.dataset.themeChoice;
    pageUrl.searchParams.set('theme', themeOverride);
    pageUrl.hash = location.hash;
    history.replaceState(null, '', pageUrl);
    showTheme();
  });
}
