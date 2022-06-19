import React from 'react';
import DateUtils from 'utils/DateUtils';
import { FilterOperator } from 'utils/FilterUtils';
import useFilterPanelStore from 'stores/use-filter-panel-store';

function useFilterCriteriaRowViewModel() {
  const {
    initialFilterPropertyTypes,
    filterCriteriaList, setFilterCriteriaList,
    filterPropertySelectList,
  } = useFilterPanelStore();

  const handleFilterPropertySelect = (propertyValue: string | null, filterCriteriaIndex: number) => {
    const currentFilterCriteriaList = filterCriteriaList.map((item, index) => {
      const currentFilterPropertyType = propertyValue ? initialFilterPropertyTypes[propertyValue] : null;
      const currentFilterOperator = (propertyValue && currentFilterPropertyType === item.type) ? item.operator : null;
      const currentFilterValue = (propertyValue && currentFilterPropertyType === item.type) ? item.value : null;
      return (index === filterCriteriaIndex) ? {
        ...item,
        property: propertyValue,
        type: currentFilterPropertyType,
        operator: currentFilterOperator,
        value: currentFilterValue,
      } : item;
    });

    setFilterCriteriaList(currentFilterCriteriaList);
  };

  const handleFilterOperatorSelect = (operatorValue: string | null, filterCriteriaIndex: number) => {
    const currentFilterCriteriaList = filterCriteriaList.map((item, index) => {
      return (index === filterCriteriaIndex) ? { ...item, operator: operatorValue as FilterOperator } : item;
    });

    setFilterCriteriaList(currentFilterCriteriaList);
  };

  const handleFilterValueInput = (
    value: React.ChangeEvent<HTMLInputElement> | number | Date | null | undefined,
    filterCriteriaIndex: number
  ) => {
    let valueString = '';

    if (value && typeof value === 'object' && 'nativeEvent' in value) {
      valueString = value.currentTarget.value;
    }

    if (typeof value === 'number') {
      valueString = value.toString();
    }

    if (value instanceof Date) {
      valueString = DateUtils.toIso(value);
    }

    const currentFilterCriteriaList = filterCriteriaList.map((item, index) => {
      return (index === filterCriteriaIndex) ? { ...item, value: valueString } : item;
    });

    setFilterCriteriaList(currentFilterCriteriaList);
  };

  const handleDeleteFilterCriteriaButton = (filterCriteriaIndex: number) => {
    setFilterCriteriaList(filterCriteriaList.filter((_, index) => index !== filterCriteriaIndex));
  };

  return {
    filterPropertySelectList,
    handleFilterPropertySelect,
    handleFilterOperatorSelect,
    handleFilterValueInput,
    handleDeleteFilterCriteriaButton,
  };
}

export default useFilterCriteriaRowViewModel;
