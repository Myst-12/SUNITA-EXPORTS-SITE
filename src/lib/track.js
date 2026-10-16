// Sends a Google Analytics event. Does nothing until the visitor has accepted analytics cookies
// (gtag only exists after consent), so it is safe to call from anywhere.
export function track(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, { transport_type: 'beacon', ...params });
  }
}
