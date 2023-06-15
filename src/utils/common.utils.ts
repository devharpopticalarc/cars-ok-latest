
/**
 * Generates a random hexadecimal string of the specified length.
 * @param { number } len - The length of the random hexadecimal string to generate.
 * @returns { string } - A random hexadecimal string.
 */
function randomHexString(len: number): string {
  return [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

/**
 * Checks if a given number is within a specified range.
 *
 * @param { number } number - The number to check.
 * @param { number } min - The minimum value of the range (inclusive).
 * @param { number } max - The maximum value of the range (inclusive).
 * @returns { boolean } - `true` if the number is within the range, `false` otherwise.
 */
function isInRange(number: number, min: number, max: number): boolean {
  return number >= min && number <= max;
}




export const CommonUtilities = { randomHexString, isInRange }
