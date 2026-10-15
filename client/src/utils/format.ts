const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** 42000 -> '₹42,000' (Indian digit grouping: 120000 -> '₹1,20,000'). */
export function formatRupees(amount: number): string {
  return rupees.format(amount);
}
