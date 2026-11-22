const themeToggle = document.querySelector('.theme-toggle');
const themeButtons = themeToggle.querySelectorAll('[data-theme-choice]');
const pageUrl = new URL(location.href);

function showTheme(theme) {
  document.documentElement.dataset.theme = theme;
  for (const button of themeButtons) {
    button.setAttribute('aria-pressed', button.dataset.themeChoice === theme);
  }
}

showTheme(pageUrl.searchParams.get('theme') === 'night' ? 'night' : 'day');
themeToggle.hidden = false;

for (const button of themeButtons) {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice;
    if (theme === 'night') {
      pageUrl.searchParams.set('theme', 'night');
    } else {
      pageUrl.searchParams.delete('theme');
    }
    pageUrl.hash = location.hash;
    history.replaceState(null, '', pageUrl);
    showTheme(theme);
  });
}
