// Percentages for the W / L / Neutral bar. Always sums to 100 (or 0 with no votes).
export function votePercents({ w = 0, l = 0, n = 0 }) {
  const total = w + l + n
  if (!total) return { w: 0, l: 0, n: 0, total: 0 }
  const pw = Math.round((w / total) * 100)
  const pl = Math.round((l / total) * 100)
  return { w: pw, l: pl, n: Math.max(0, 100 - pw - pl), total }
}
