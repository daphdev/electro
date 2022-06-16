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
  isNotAddToSortCriteria?: boolean,
  isNotAddToFilterCriteria?: boolean,
}

export type EntityPropertySchema<T = unknown> = Record<string | keyof T, EntityPropertySpec>;