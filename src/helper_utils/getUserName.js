export function getUserName() {
  const name = process.argv[2] ? process.argv[2].slice(11) : 'Anonim';
  return name;
}
