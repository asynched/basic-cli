/**
 * @template T Type of the source array
 * @param { T[] } source Source array
 * @returns { T[] } Array containing all items that are unique
 */
export function unique(source) {
  const set = new Set(source)
  return Array.from(set)
}

/**
 * @template T
 * @param { T[] } source
 * @returns { boolean }
 */
export function isEmpty(source) {
  if (!source) {
    return true
  }

  if (source.length === 0) {
    return true
  }

  return false
}
