export function getDuplicatesFromArrayByKey<T, K extends keyof T>(
  array: T[],
  key: K
): T[] {
  const seen = new Set<T[K]>();
  return array.filter((item) => {
    if (seen.has(item[key])) return true;
    seen.add(item[key]);
    return false;
  });
}
