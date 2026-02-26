export type FieldType = 'short-text' | 'long-text' | 'number' | 'reference' | 'backlink' | 'option';

export interface EntityField {
  id: string;
  name: string;
  type: FieldType;
  referenceEntityId?: string;       // only when type === 'reference'
  backlinkSourceEntityId?: string;  // only when type === 'backlink'
  backlinkSourceFieldId?: string;   // only when type === 'backlink'
  optionValues?: string[];          // only when type === 'option'
}

export interface Entity {
  id: string;
  name: string;
  pluralName: string;
  fields: EntityField[];
  displayNameFieldId?: string; // field used as display label when referenced
}
