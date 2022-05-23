enum StringOperator {
  EQUALS,
  NOT_EQUALS,
  CONTAINS,
  NOT_CONTAINS,
  STARTS_WITH,
  ENDS_WITH,
  IN,
  NOT_IN,
  IS_NULL,
  IS_NOT_NULL,
}

enum NumberOperator {
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

enum BooleanOperator {
  EQUALS,
  NOT_EQUALS,
  IS_NULL,
  IS_NOT_NULL,
}

enum DateOperator {
  EQUALS,
  NOT_EQUALS,
  BEFORE,
  AFTER,
  BETWEEN,
  NOT_BETWEEN,
  IS_NULL,
  IS_NOT_NULL,
}

interface SortCriteria {
  property: string;
  order: 'asc' | 'desc';
}

interface FilterCriteria {
  property: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  operator: StringOperator | NumberOperator | BooleanOperator | DateOperator;
  value: string;
}

export interface Filter {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  sortCriteriaList: SortCriteria[];
  filterCriteriaList: FilterCriteria[];
}
