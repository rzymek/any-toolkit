#!/usr/bin/env node
const fs = require("node:fs/promises");

async function readStdin() {
  let data = "";
  for await (const chunk of process.stdin) {
    data += chunk;
  }
  return data;
}

async function expectedAnyCalls() {
  const source = await fs.readFile(process.argv[2], "utf-8");
  return source.split(/\n/)
    .filter(line => line.match(/any[a-zA-Z]+\s*[(]/))
    .map(line => line.replace(/.*(any[a-zA-z]+).*/,"$1"))
}

function expectEqual(a, b, context = "") {
  if (a !== b) {
    throw new Error(`Expected ${JSON.stringify(a)} to equal ${JSON.stringify(b)}:\n${context}`);
  }
}

async function main() {
  const { testResults } = JSON.parse(await readStdin());
  expectEqual(1, testResults.length);
  const testResult = testResults[0];
  expectEqual(1, testResult.assertionResults.length);
  const assertionResult = testResult.assertionResults[0];
  expectEqual("failed", assertionResult.status);
  const { failureMessages } = assertionResult;
  expectEqual(1, failureMessages.length);
  const failureMessage = assertionResult.failureMessages[0];
  const marker = "any-toolkit: \n";
  const index = failureMessage.indexOf(marker);
  expectEqual(true, index > 0, failureMessage);
  const expected = await expectedAnyCalls();
  const actual = failureMessage
    .substring(index + marker.length)
    .split(/\n/)
    .filter(line => line.startsWith("any"))
    .map(line => line.split(/:/)[0]);
  expectEqual(expected.join(), actual.join())
}

main();
