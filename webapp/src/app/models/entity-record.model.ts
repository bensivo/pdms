/**
 * Represents a single record (instance) of a configurable entity.
 */
export interface EntityRecord {
    id: string;
    entityId: string;
    // Keyed by EntityField.id, values are always strings
    data: Record<string, string>;
}
