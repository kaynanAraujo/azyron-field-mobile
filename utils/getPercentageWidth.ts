export function getPercentageWidth(percentage: number): `${number}%` {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return `${safePercentage}%`;
}
