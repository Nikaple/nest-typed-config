/**
 * Iterates over elements of collection invoking iteratee for each element.
 * The iteratee is invoked with three arguments: (value, path).
 * path is an array containing keys of current value
 *
 * @param obj object to iterate over
 * @param iteratee The function invoked per iteration.
 */
export function forEachDeep(
  obj: Record<string, any>,
  iteratee: (value: any, path: string[]) => void,
): void {
  const helper = (obj: any, path: string[]) => {
    Object.entries(obj).forEach(([key, value]) => {
      iteratee(value, [...path, key]);

      if (typeof value === 'object' && value && !Array.isArray(value)) {
        return helper(value, [...path, key]);
      }
    });
  };
  helper(obj, []);
  return;
}
