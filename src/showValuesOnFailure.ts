import { onTestFailed } from 'vitest';

export function showValuesOnFailure<T>(name: string, v: T): T {
  const stack = new Error().stack;
  onTestFailed((taskResult) => {
    if (taskResult.errors && stack) {
      const at = stack.split(/\n/)[3];
      taskResult.errors[0].stack += `\n${name}: ${v}\n${at}`;
    }
  });
  return v;
}
