export type FieldType = 'short-text' | 'long-text' | 'number' | 'reference';

export interface EntityField {
  id: string;
  name: string;
  type: FieldType;
  referenceEntityId?: string; // only when type === 'reference'
}

export interface Entity {
  id: string;
  name: string;
  pluralName: string;
  fields: EntityField[];
  displayNameFieldId?: string; // field used as display label when referenced
}
