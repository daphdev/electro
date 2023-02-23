import { EntityPropertyType, SelectOption } from 'types';

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
  EQUALS = 'num_eq',
  NOT_EQUALS = 'num_neq',
  LESS_THAN = 'num_lt',
  LESS_THAN_OR_EQUAL_TO = 'num_lte',
  GREATER_THAN = 'num_gt',
  GREATER_THAN_OR_EQUAL_TO = 'num_gte',
  BETWEEN = 'num_bw',
  NOT_BETWEEN = 'num_nbw',
  IS_NULL = 'num_n',
  IS_NOT_NULL = 'num_nn',
}

export enum BooleanOperator {
  EQUALS = 'bool_eq',
  NOT_EQUALS = 'bool_neq',
  IS_NULL = 'bool_n',
  IS_NOT_NULL = 'bool_nn',
}

export enum DateOperator {
  EQUALS = 'date_eq',
  NOT_EQUALS = 'date_neq',
  BEFORE = 'date_bf',
  AFTER = 'date_af',
  BETWEEN = 'date_bw',
  NOT_BETWEEN = 'date_nbw',
  IS_NULL = 'date_n',
  IS_NOT_NULL = 'date_nn',
}

export type FilterOperator = StringOperator | NumberOperator | BooleanOperator | DateOperator;

export type FilterPropertyTypes = Record<string, EntityPropertyType>;

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortCriteria {
  property: string | null;
  order: OrderType | null;
}

export interface FilterCriteria {
  property: string | null;
  type: EntityPropertyType | null;
  operator: FilterOperator | null;
  value: string | null;
}

export interface Filter {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  name: string;
  sortCriteriaList: SortCriteria[];
  filterCriteriaList: FilterCriteria[];
}

class FilterUtils {
  static sortOrderSelectList: SelectOption[] = [
    {
      value: 'asc',
      label: 'Tăng dần',
    },
    {
      value: 'desc',
      label: 'Giảm dần',
    },
  ];

  static filterStringOperatorSelectList: SelectOption[] = [
    {
      value: StringOperator.EQUALS,
      label: 'Bằng với',
    },
    {
      value: StringOperator.NOT_EQUALS,
      label: 'Không bằng với',
    },
    {
      value: StringOperator.CONTAINS,
      label: 'Chứa chuỗi',
    },
    {
      value: StringOperator.NOT_CONTAINS,
      label: 'Không chứa chuỗi',
    },
    {
      value: StringOperator.STARTS_WITH,
      label: 'Bắt đầu với',
    },
    {
      value: StringOperator.ENDS_WITH,
      label: 'Kết thúc với',
    },
    {
      value: StringOperator.IS_NULL,
      label: 'Là rỗng',
    },
    {
      value: StringOperator.IS_NOT_NULL,
      label: 'Là không rỗng',
    },
  ];

  static filterNumberOperatorSelectList: SelectOption[] = [
    {
      value: NumberOperator.EQUALS,
      label: 'Bằng với',
    },
    {
      value: NumberOperator.NOT_EQUALS,
      label: 'Không bằng với',
    },
    {
      value: NumberOperator.LESS_THAN,
      label: 'Nhỏ hơn',
    },
    {
      value: NumberOperator.LESS_THAN_OR_EQUAL_TO,
      label: 'Nhỏ hơn hoặc bằng',
    },
    {
      value: NumberOperator.GREATER_THAN,
      label: 'Lớn hơn',
    },
    {
      value: NumberOperator.GREATER_THAN_OR_EQUAL_TO,
      label: 'Lớn hơn hoặc bằng',
    },
    {
      value: NumberOperator.IS_NULL,
      label: 'Là rỗng',
    },
    {
      value: NumberOperator.IS_NOT_NULL,
      label: 'Là không rỗng',
    },
  ];

  static filterDateOperatorSelectList: SelectOption[] = [
    {
      value: DateOperator.EQUALS,
      label: 'Bằng với',
    },
    {
      value: DateOperator.NOT_EQUALS,
      label: 'Không bằng với',
    },
    {
      value: DateOperator.BEFORE,
      label: 'Trước ngày',
    },
    {
      value: DateOperator.AFTER,
      label: 'Sau ngày',
    },
    {
      value: DateOperator.IS_NULL,
      label: 'Là rỗng',
    },
    {
      value: DateOperator.IS_NOT_NULL,
      label: 'Là không rỗng',
    },
  ];

  static filterOperatorIsNullAndIsNotNullList: FilterOperator[] = [
    StringOperator.IS_NULL,
    StringOperator.IS_NOT_NULL,
    NumberOperator.IS_NULL,
    NumberOperator.IS_NOT_NULL,
    DateOperator.IS_NULL,
    DateOperator.IS_NOT_NULL,
  ];

  static convertToSortRSQL = (filter: Filter | null) => {
    if (filter) {
      return filter.sortCriteriaList
        .filter(item => item.property !== null && item.order !== null)
        .map(item => item.property + ',' + item.order)
        .join(';');
    }
    return '';
  };

  static convertToFilterRSQL = (filter: Filter | null) => {
    if (filter) {
      return filter.filterCriteriaList
        .map(this.convertFilterCriteriaToRSQL)
        .filter(Boolean)
        .join(';');
    }
    return '';
  };

  private static convertFilterCriteriaToRSQL = (filterCriteria: FilterCriteria) => {
    if (filterCriteria.property && filterCriteria.operator) {
      if (filterCriteria.value) {
        switch (filterCriteria.operator) {
        case StringOperator.EQUALS:
          return filterCriteria.property + '==\'' + filterCriteria.value + '\'';
        case StringOperator.NOT_EQUALS:
          return filterCriteria.property + '!=\'' + filterCriteria.value + '\'';
        case StringOperator.CONTAINS:
          return filterCriteria.property + '=like=\'' + filterCriteria.value + '\'';
        case StringOperator.NOT_CONTAINS:
          return filterCriteria.property + '=notlike=\'' + filterCriteria.value + '\'';
        case StringOperator.STARTS_WITH:
          return filterCriteria.property + '==\'' + filterCriteria.value + '*\'';
        case StringOperator.ENDS_WITH:
          return filterCriteria.property + '==\'*' + filterCriteria.value + '\'';

        case NumberOperator.EQUALS:
        case DateOperator.EQUALS:
          return filterCriteria.property + '==' + filterCriteria.value;
        case NumberOperator.NOT_EQUALS:
        case DateOperator.NOT_EQUALS:
          return filterCriteria.property + '!=' + filterCriteria.value;
        case NumberOperator.LESS_THAN:
          return filterCriteria.property + '=lt=' + filterCriteria.value;
        case NumberOperator.LESS_THAN_OR_EQUAL_TO:
        case DateOperator.BEFORE:
          return filterCriteria.property + '=le=' + filterCriteria.value;
        case NumberOperator.GREATER_THAN:
          return filterCriteria.property + '=gt=' + filterCriteria.value;
        case NumberOperator.GREATER_THAN_OR_EQUAL_TO:
        case DateOperator.AFTER:
          return filterCriteria.property + '=ge=' + filterCriteria.value;
        }
      } else {
        switch (filterCriteria.operator) {
        case StringOperator.IS_NULL:
        case NumberOperator.IS_NULL:
        case DateOperator.IS_NULL:
          return filterCriteria.property + '=isnull=\'\'';
        case StringOperator.IS_NOT_NULL:
        case NumberOperator.IS_NOT_NULL:
        case DateOperator.IS_NOT_NULL:
          return filterCriteria.property + '=isnotnull=\'\'';
        default:
          return '';
        }
      }
    }
    return '';
  };
}

export default FilterUtils;
