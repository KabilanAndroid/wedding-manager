const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** 42000 -> '₹42,000' (Indian digit grouping: 120000 -> '₹1,20,000'). */
export function formatRupees(amount: number): string {
  return rupees.format(amount);
}

const dateTime = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

/** '2026-10-19T23:14:59.000Z' -> '20 Oct 2026, 4:44 am' (in the viewer's time zone). */
export function formatDateTime(iso: string): string {
  return dateTime.format(new Date(iso));
}
