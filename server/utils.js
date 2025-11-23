// Server-side utility functions
// Used by API routes and server-side code

import { customAlphabet } from 'nanoid';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateCode = customAlphabet(alphabet, 6);

/**
 * Generate a random 6-character short code
 * @returns {string} Random alphanumeric code
 */
export function generateShortCode() {
  return generateCode();
}

/**
 * Validate that a code follows the required format (6-8 alphanumeric characters)
 * @param {string} code - The code to validate
 * @returns {boolean} True if valid
 */
export function validateCode(code) {
  // Codes must be 6-8 characters, alphanumeric
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}

/**
 * Validate that a URL is properly formatted
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid HTTP/HTTPS URL
 */
export function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

