/**
 * Generates a unique identifier string.
 *
 * The identifier is composed of a base-36 encoded timestamp and a random string.
 *
 * @returns {string} A unique identifier string.
 */
export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
  const randomPart = Math.random().toString(36).substring(2, 10); // Generate a random string
  return `${timestamp}-${randomPart}`;
};
