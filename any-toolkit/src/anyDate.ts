export function anyDate({ from = new Date(0), to = new Date() } = {}): Date {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  const randomTime = Math.random() * (toTime - fromTime) + fromTime;
  return new Date(randomTime);
}
