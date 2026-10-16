// Numbers for the per-form dashboard, worked out from the responses.
const istDay = (iso) => new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); // YYYY-MM-DD

function top(values, n) {
  const counts = new Map();
  for (const v of values) if (v) counts.set(v, (counts.get(v) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

export function formStats(responses) {
  const today = istDay(new Date().toISOString());
  const byDay = top(responses.map((r) => istDay(r.created_at)), 999).sort((a, b) => a[0].localeCompare(b[0])).slice(-7);
  return {
    total: responses.length,
    today: responses.filter((r) => istDay(r.created_at) === today).length,
    withPhone: responses.filter((r) => r.data.phone).length,
    byDay: byDay.map(([d, c]) => [new Date(`${d}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), c]),
    countries: top(responses.map((r) => r.data.country), 5),
    products: top(responses.flatMap((r) => String(r.data.products || '').split(',').map((p) => p.trim())), 6),
    business: top(responses.map((r) => r.data.businessType), 4),
  };
}
