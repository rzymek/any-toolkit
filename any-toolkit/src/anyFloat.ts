export function anyFloat({
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE,
} = {}): number {
  return Math.random() * (max - min) + min;
}

export function anyPercentage(): number {
  return anyFloat({ min: 0, max: 1 });
}
