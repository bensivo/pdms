export type FieldType = 'short-text' | 'long-text' | 'number' ;

export interface EntityField {
  id: string;
  name: string;
  type: FieldType;
}

export interface Entity {
  id: string;
  name: string;
  pluralName: string;
  fields: EntityField[];
}
