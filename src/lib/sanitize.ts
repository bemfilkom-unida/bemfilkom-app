/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize text for safe display
 */
export function sanitizeText(text: string): string {
  return sanitizeHtml(text);
}
