import { anyPrintableString } from './anyString';
import { showValuesOnFailure } from './showValuesOnFailure';

export function anyError(message = anyPrintableString()): Error {
  return showValuesOnFailure('anyError()',
    new Error(message)
  );
}
