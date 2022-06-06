export enum EntityPropertyType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

export interface EntityPropertySpec {
  label: string,
  type: EntityPropertyType,
  isShowInTable?: boolean,
}

export type EntityPropertySchema = Record<string, EntityPropertySpec>;
