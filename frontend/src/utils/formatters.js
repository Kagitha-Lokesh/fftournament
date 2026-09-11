// ──────────────────────────────────────────────────────────────────────────────
// FF WAR — Utility Formatters
// Clean formatting helpers for currency, dates, numbers, and status labels.
// ──────────────────────────────────────────────────────────────────────────────

export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '—'
  return new Intl.NumberFormat('en-IN').format(num)
}

export function formatDate(dateString) {
  if (!dateString) return '—'
  return dateString
}

export function getGreeting(name = 'Player') {
  const hour = new Date().getHours()
  let timeGreeting = 'Good evening'
  if (hour < 12) timeGreeting = 'Good morning'
  else if (hour < 18) timeGreeting = 'Good afternoon'
  return `${timeGreeting}, ${name}`
}
