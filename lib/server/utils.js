import { customAlphabet } from 'nanoid';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateCode = customAlphabet(alphabet, 6);

export function generateShortCode() {
  return generateCode();
}

export function validateCode(code) {
  // Codes must be 6-8 characters, alphanumeric
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}

export function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

export function truncateUrl(url, maxLength = 50) {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + '...';
}






