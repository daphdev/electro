export enum EntityPropertyType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  ARRAY = 'array',
  OPTION = 'option',
  COLLECTION = 'collection',
  PLACEHOLDER = 'placeholder',
}

export interface EntityPropertySpec {
  label: string,
  tableLabel?: string,
  type: EntityPropertyType,
  isShowInTable?: boolean,
  isNotAddToSortCriteria?: boolean,
  isNotAddToFilterCriteria?: boolean,
}

export type EntityPropertySchema<T = unknown> = Record<string | keyof T, EntityPropertySpec>;
