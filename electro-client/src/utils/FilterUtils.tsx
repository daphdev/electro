export enum StringOperator {
  EQUALS = 'str_eq',
  NOT_EQUALS = 'str_neq',
  CONTAINS = 'str_ct',
  NOT_CONTAINS = 'str_nct',
  STARTS_WITH = 'str_sw',
  ENDS_WITH = 'str_ew',
  IN = 'str_in',
  NOT_IN = 'str_nin',
  IS_NULL = 'str_n',
  IS_NOT_NULL = 'str_nn',
}

export enum NumberOperator {
  EQUALS,
  NOT_EQUALS,
  LESS_THAN,
  LESS_THAN_OR_EQUAL_TO,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  BETWEEN,
  NOT_BETWEEN,
  IS_NULL,
  IS_NOT_NULL,
}

export enum BooleanOperator {
  EQUALS,
  NOT_EQUALS,
  IS_NULL,
  IS_NOT_NULL,
}

export enum DateOperator {
  EQUALS,
  NOT_EQUALS,
  BEFORE,
  AFTER,
  BETWEEN,
  NOT_BETWEEN,
  IS_NULL,
  IS_NOT_NULL,
}

export enum FilterPropertyType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export interface FilterPropertyTypes {
  [property: string]: FilterPropertyType
}

export interface SortCriteria {
  property: string | null;
  order: OrderType | null;
}

export interface FilterCriteria {
  property: string | null;
  type: FilterPropertyType | null;
  operator: StringOperator | null;
  value: string | null;
}

export interface FilterObject {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  name: string;
  sortCriteriaList: SortCriteria[];
  filterCriteriaList: FilterCriteria[];
}

export default class FilterUtils {
  static convertToSortRSQL = (filter: FilterObject | null) => {
    if (filter) {
      return filter.sortCriteriaList
        .filter(item => item.property !== null && item.order !== null)
        .map(item => item.property + ',' + item.order)
        .join(';');
    }
    return '';
  };

  static convertToFilterRSQL = (filter: FilterObject | null) => {
    if (filter) {
      return '';
    }
    return '';
  };
}
