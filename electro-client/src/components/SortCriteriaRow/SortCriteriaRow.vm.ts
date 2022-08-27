import { OrderType } from 'utils/FilterUtils';
import useFilterPanelStore from 'stores/use-filter-panel-store';

function useSortCriteriaRowViewModel() {
  const {
    sortCriteriaList, setSortCriteriaList,
    sortPropertySelectList, setSortPropertySelectList,
  } = useFilterPanelStore();

  const handleSortPropertySelect = (propertyValue: string | null, sortCriteriaIndex: number) => {
    const currentSortCriteriaList = sortCriteriaList.map((item, index) => {
      return (index === sortCriteriaIndex) ? { ...item, property: propertyValue } : item;
    });

    setSortCriteriaList(currentSortCriteriaList);

    const sortCriteriaPropertyList = currentSortCriteriaList.map(item => item.property);

    setSortPropertySelectList(sortPropertySelectList.map((option) => {
      if (option.disabled === true && !sortCriteriaPropertyList.includes(option.value)) {
        return { ...option, disabled: false };
      }
      if (option.value === propertyValue) {
        return { ...option, disabled: true };
      }
      return option;
    }));
  };

  const handleSortOrderSelect = (orderValue: string | null, sortCriteriaIndex: number) => {
    setSortCriteriaList(sortCriteriaList.map((item, index) => {
      return (index === sortCriteriaIndex) ? { ...item, order: orderValue as OrderType } : item;
    }));
  };

  const handleDeleteSortCriteriaButton = (sortCriteriaIndex: number) => {
    setSortCriteriaList(sortCriteriaList.filter((_, index) => index !== sortCriteriaIndex));
    setSortPropertySelectList(sortPropertySelectList.map(option => {
      if (option.disabled === true && option.value === sortCriteriaList[sortCriteriaIndex].property) {
        return { ...option, disabled: false };
      }
      return option;
    }));
  };

  return {
    sortPropertySelectList,
    handleSortPropertySelect,
    handleSortOrderSelect,
    handleDeleteSortCriteriaButton,
  };
}

export default useSortCriteriaRowViewModel;
