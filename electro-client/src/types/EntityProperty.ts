export enum EntityPropertyType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

export interface EntityPropertyNames {
  [propertyName: string]: {
    label: string,
    type: EntityPropertyType,
    isShowInTable?: boolean,
  };
}
