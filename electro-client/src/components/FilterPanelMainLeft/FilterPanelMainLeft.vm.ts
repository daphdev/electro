import { OrderType } from 'utils/FilterUtils';
import useFilterPanelStore from 'components/FilterPanel/use-filter-panel-store';

function useFilterPanelMainLeftViewModel() {
  const {
    sortCriteriaList, setSortCriteriaList,
    sortPropertySelectList,
  } = useFilterPanelStore();

  const isDisabledDeleteSortCriteriaButton = sortCriteriaList.length === sortPropertySelectList.length;

  const handleCreateSortCriteriaButton = () => {
    if (sortCriteriaList.length < sortPropertySelectList.length) {
      setSortCriteriaList(prevState => [...prevState, { property: null, order: OrderType.ASC }]);
    }
  };

  return {
    sortCriteriaList,
    isDisabledDeleteSortCriteriaButton,
    handleCreateSortCriteriaButton,
  };
}

export default useFilterPanelMainLeftViewModel;
