import RandExp from 'randexp';

export function anyString(matching: RegExp) {
  return anyStringMatchingRegExp(matching);
}

export function anyStringOfLength(length: number) {
  return anyStringMatchingRegExp(new RegExp(`.{${length}}`));
}

function anyStringMatchingRegExp(matching: RegExp) {
  return new RandExp(matching).gen();
}

export function anyPrintableString() {
  return anyStringMatchingRegExp(/[ -~]+/);
}

export function anyIdentifier(length = 16) {
  return anyStringMatchingRegExp(
    new RegExp(`[a-zA-Z_][a-zA-Z0-9_]{${length - 1}}`),
  );
}
