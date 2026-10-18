(function () {
  const pages = [
    { title: 'Welcome to RiiMail', section: 'Start here', url: '/', terms: 'overview private email macOS local artificial intelligence IMAP' },
    { title: 'Getting started', section: 'Start here', url: '/getting-started/', terms: 'install download requirements apple silicon macOS 14 model run clone' },
    { title: 'Your first run', section: 'Using RiiMail', url: '/guide/first-run/', terms: 'setup login Gmail Yahoo Outlook app password inbox sent sync' },
    { title: 'Spam & phishing checks', section: 'Using RiiMail', url: '/guide/spam-detection/', terms: 'rating local model phishing spam suspicious message safety' },
    { title: 'Privacy & local data', section: 'Using RiiMail', url: '/guide/privacy/', terms: 'SQLite Keychain credentials telemetry privacy offline data storage' },
    { title: 'Development setup', section: 'For developers', url: '/developers/setup/', terms: 'Rust Tauri npm Python model Git LFS development environment' },
    { title: 'Architecture', section: 'For developers', url: '/developers/architecture/', terms: 'frontend backend Rust Tauri IMAP SQLite worker commands PyO3' },
    { title: 'Testing & packaging', section: 'For developers', url: '/developers/testing/', terms: 'test frontend backend llm Python DMG build macOS arm64' },
    { title: 'Troubleshooting', section: 'Reference', url: '/reference/troubleshooting/', terms: 'error login keychain model setup sync build fix' },
    { title: 'Contributing', section: 'Reference', url: '/contributing/', terms: 'pull request issue contribution style tests' },
    { title: 'Security', section: 'Reference', url: '/security/', terms: 'vulnerability report disclosure email private' }
  ];
  const canonical = document.querySelector('link[rel="canonical"]');
  const base = canonical ? new URL(canonical.href).origin : '';
  const basePath = document.documentElement.dataset.baseurl || '';
  const currentPath = (window.location.pathname.slice(basePath.length).replace(/index\.html$/, '') || '/');

  document.querySelectorAll('[data-nav-path]').forEach((link) => {
    if (link.dataset.navPath === currentPath) link.setAttribute('aria-current', 'page');
  });

  const menuButton = document.querySelector('.menu-button');
  const desktop = window.matchMedia('(min-width: 761px)');
  const sidebarIsOpen = () => desktop.matches
    ? !document.body.classList.contains('sidebar-collapsed')
    : document.body.classList.contains('nav-open');
  const setNavigation = (open) => {
    if (desktop.matches) {
      document.body.classList.remove('nav-open');
      document.body.classList.toggle('sidebar-collapsed', !open);
    } else {
      document.body.classList.toggle('nav-open', open);
    }
    if (menuButton) {
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close chapters' : 'Open chapters');
    }
  };
  if (menuButton) {
    menuButton.addEventListener('click', () => setNavigation(!sidebarIsOpen()));
    menuButton.setAttribute('aria-expanded', String(sidebarIsOpen()));
    menuButton.setAttribute('aria-label', sidebarIsOpen() ? 'Close chapters' : 'Open chapters');
  }
  document.querySelectorAll('.sidebar-close, .sidebar-scrim').forEach((button) => button.addEventListener('click', () => setNavigation(false)));
  desktop.addEventListener('change', () => setNavigation(desktop.matches));

  const themeButton = document.querySelector('.theme-toggle');
  if (themeButton) themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('riimail-theme', theme);
  });

  document.querySelectorAll('pre').forEach((pre) => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.type = 'button';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(pre.querySelector('code')?.textContent || pre.textContent);
      button.textContent = 'Copied';
      window.setTimeout(() => { button.textContent = 'Copy'; }, 1400);
    });
    pre.appendChild(button);
  });

  const dialog = document.querySelector('.search-dialog');
  const input = document.querySelector('#book-search');
  const results = document.querySelector('#search-results');
  const openSearch = () => {
    if (!dialog) return;
    dialog.showModal();
    window.setTimeout(() => input?.focus(), 30);
  };
  document.querySelector('.search-trigger')?.addEventListener('click', openSearch);
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
  });
  if (dialog) dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  if (input && results) input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.innerHTML = '<p class="search-hint">Try “privacy”, “Gmail”, “model”, or “testing”.</p>';
      return;
    }
    const matches = pages.filter((page) => `${page.title} ${page.section} ${page.terms}`.toLowerCase().includes(query));
    results.innerHTML = matches.length
      ? matches.map((page) => `<a class="search-result" href="${base}${basePath}${page.url}"><strong>${page.title}</strong><small>${page.section}</small></a>`).join('')
      : '<p class="search-hint">No chapter found. Try a broader word.</p>';
  });
})();
