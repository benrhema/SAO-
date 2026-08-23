const KEY = 'sao_show_public_nav';
const EVENT = 'sao-nav-visibility-changed';

export function getShowPublicNav(): boolean {
  const v = localStorage.getItem(KEY);
  return v === null ? true : v === '1';
}

export function setShowPublicNav(show: boolean) {
  localStorage.setItem(KEY, show ? '1' : '0');
  window.dispatchEvent(new Event(EVENT));
}

export function onNavVisibilityChange(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}
