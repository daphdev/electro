import { FilterOperator, FilterPropertyType, FilterPropertyTypes } from 'utils/FilterUtils';
import useFilterPanelStore from 'components/FilterPanel/use-filter-panel-store';

const filterPropertyTypes: FilterPropertyTypes = {
  id: FilterPropertyType.NUMBER,
  createdAt: FilterPropertyType.DATE,
  updatedAt: FilterPropertyType.DATE,
  name: FilterPropertyType.STRING,
  code: FilterPropertyType.STRING,
};

function useFilterCriteriaRowViewModel() {
  const {
    filterCriteriaList, setFilterCriteriaList,
    filterPropertySelectList,
  } = useFilterPanelStore();

  const handleFilterPropertySelect = (propertyValue: string | null, filterCriteriaIndex: number) => {
    const currentFilterCriteriaList = filterCriteriaList.map((item, index) => {
      const currentFilterPropertyType = propertyValue ? filterPropertyTypes[propertyValue] : null;
      const currentFilterOperator = (propertyValue && currentFilterPropertyType === item.type) ? item.operator : null;
      return (index === filterCriteriaIndex) ? {
        ...item,
        property: propertyValue,
        type: currentFilterPropertyType,
        operator: currentFilterOperator,
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

  const handleDeleteFilterCriteriaButton = (filterCriteriaIndex: number) => {
    setFilterCriteriaList(filterCriteriaList.filter((_, index) => index !== filterCriteriaIndex));
  };

  return {
    filterPropertySelectList,
    handleFilterPropertySelect,
    handleFilterOperatorSelect,
    handleDeleteFilterCriteriaButton,
  };
}

export default useFilterCriteriaRowViewModel;
