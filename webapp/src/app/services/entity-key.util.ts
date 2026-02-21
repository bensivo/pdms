/**
 * Generate a URL-friendly key from an entity name
 * Converts to lowercase and replaces whitespace with hyphens
 */
export function generateEntityKey(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
