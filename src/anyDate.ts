import { showValuesOnFailure } from './internal/showValuesOnFailure';

export function anyDate(from: Date = new Date(0), to: Date = new Date()): Date {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  const randomTime = Math.random() * (toTime - fromTime) + fromTime;
  return showValuesOnFailure(`anyDate()`, new Date(randomTime));
}
