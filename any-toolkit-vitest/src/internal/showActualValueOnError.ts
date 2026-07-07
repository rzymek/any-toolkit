import { onTestFailed } from "vitest";

export function showActualValueOnError<T>(
  name: string,
  parameters: unknown[],
  actualValue: T,
): T {
  const stack = new Error().stack;
  onTestFailed((taskResult) => {
    if (taskResult.task.result?.errors && stack) {
      const at = stack.split(/\n/)[3];
      const entryAt = `${name}: ${actualValue}\n${at}`;
      const entry = `- ${pretty(name, parameters).padEnd(32, " ")} | ${actualValue}`;
      const error = taskResult.task.result.errors[0];
      const regex = /^any-toolkit: $/m;
      const marker = regex.exec(error.stack ?? "");
      if (marker) {
        error.stack = error.stack!.replace(regex, `any-toolkit: \n${entryAt}`);
        error.message = error.message.replace(regex, `any-toolkit: \n${entry}`);
      } else {
        error.stack += `\nany-toolkit: \n${entryAt}`;
        error.message += `\n\nany-toolkit: \n${entry}`;
      }
    }
  });
  return actualValue;
}

function prettyObj(it: object): string {
  return Object.entries(it)
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");
}

function pretty(name: string, parameters: unknown[]): string {
  const args = parameters
    .map((it) => {
      if (it === null || it === undefined) {
        return undefined;
      } else if (typeof it === "object") {
        return prettyObj(it);
      } else {
        return String(it);
      }
    })
    .filter((it) => it && it !== "{}")
    .join(",");
  if (args.length > 0) {
    return `${name}(${args})`;
  } else return name;
}
