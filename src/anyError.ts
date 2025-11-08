import { anyPrintableString } from './anyString';
import { showValuesOnFailure } from './internal/showValuesOnFailure';

export function anyError(message = anyPrintableString()): Error {
  return showValuesOnFailure('anyError()',
    new Error(message)
  );
}
