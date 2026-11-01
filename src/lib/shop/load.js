// Rough container fit for an order: carton gross weight × the space a tonne of that kind of product takes
// (the m³ per tonne figures are on the Categories sheet of the product list). Shown to buyers as an estimate only.
const SPACE = { '20 ft': 28, '40 ft': 58 }; // usable m³, allowing for stowage gaps

export function orderLoad(lines) {
  let kg = 0, m3 = 0;
  for (const l of lines) {
    const q = Number(l.qty) || 0;
    if (l.wt) { kg += q * l.wt; m3 += ((q * l.wt) / 1000) * (l.vol || 2.5); }
  }
  return { kg: Math.round(kg), m3 };
}

/** "≈ 31% of a 20 ft container", or the short form for small screens ("≈ 31% of 20 ft"). */
export function fillLabel(m3, short = false) {
  if (!m3) return '';
  const of = short ? 'of' : 'of a';
  const box = short ? '' : ' container';
  if (m3 <= SPACE['20 ft']) return `≈ ${Math.max(1, Math.round((m3 / SPACE['20 ft']) * 100))}% ${of} 20 ft${box}`;
  if (m3 <= SPACE['40 ft']) return `≈ ${Math.round((m3 / SPACE['40 ft']) * 100)}% ${of} 40 ft${box}`;
  return `≈ ${(m3 / SPACE['40 ft']).toFixed(1)} × 40 ft${short ? '' : ' containers'}`;
}
