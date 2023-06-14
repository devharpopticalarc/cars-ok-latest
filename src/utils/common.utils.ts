
/**
 * Generates a random hexadecimal string of the specified length.
 * @param { number } len - The length of the random hexadecimal string to generate.
 * @returns { string } - A random hexadecimal string.
 */
function randomHexString(len: number): string {
  return [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}



export const CommonUtilities = { randomHexString }
