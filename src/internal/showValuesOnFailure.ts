import { onTestFailed } from 'vitest';

export function showValuesOnFailure<T>(name: string, actualValue: T): T {
  const stack = new Error().stack;
  onTestFailed((taskResult) => {
    if (taskResult.task.result?.errors && stack) {
      const at = stack.split(/\n/)[3];
      const entryAt = `${name}: ${actualValue}\n${at}`;
      const entry = `- ${name.padEnd(32,' ')} | ${actualValue}`;
      const error = taskResult.task.result.errors[0];
      const regex = /^any-toolkit: $/m;
      const marker = regex.exec(error.stack ?? '')
      if(marker) {
        error.stack = error.stack!.replace(regex, `any-toolkit: \n${entryAt}`)
        error.message = error.message.replace(regex, `any-toolkit: \n${entry}`)
      }else{
        error.stack += `\nany-toolkit: \n${entryAt}`;
        error.message += `\n\nany-toolkit: \n${entry}`;
      }
    }
  });
  return actualValue;
}
