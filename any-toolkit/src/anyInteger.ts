export function anyInteger({
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
} = {}): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function anyPositiveInteger({
  max = Number.MAX_SAFE_INTEGER,
} = {}): number {
  return anyInteger({ min: 1, max });
}

export function anyNegativeInteger({
  min = Number.MIN_SAFE_INTEGER,
} = {}): number {
  return anyInteger({ min, max: -1 });
}
