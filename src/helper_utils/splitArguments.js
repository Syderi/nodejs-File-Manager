export function splitArguments(str) {
  const regex = /'([^']*)'|\S+/g;
  const matches = str.match(regex);
  const values = matches.map((match) => match.replace(/['"`]/g, '').trim());
  return values;
}
