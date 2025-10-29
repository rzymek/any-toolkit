import { anyPrintableString } from './anyString';

export function anyError(message = anyPrintableString()): Error {
  return new Error(message);
}
