import { showValuesOnFailure } from './internal/showValuesOnFailure';

export function anyBoolean(): boolean {
  return showValuesOnFailure('anyBoolean()', Math.random() > 0.5);
}
