import DateUtils from 'utils/DateUtils';
import { Filter } from 'utils/FilterUtils';
import useAppStore from 'stores/use-app-store';
import useFilterPanelStore from 'stores/use-filter-panel-store';
import { FilterPanelHeaderRightProps } from 'components/FilterPanelHeaderRight/FilterPanelHeaderRight';

const CURRENT_USER_ID = 1;

function useFilterPanelHeaderRightViewModel({
  filterNameInputRef,
}: FilterPanelHeaderRightProps) {
  const {
    activeFilterPanel, setActiveFilterPanel,
    setFilters,
  } = useAppStore();

  const {
    initialPropertySelectList,
    sortCriteriaList, setSortCriteriaList,
    setSortPropertySelectList,
    filterCriteriaList, setFilterCriteriaList,
  } = useFilterPanelStore();

  const handleCancelCreateFilterButton = () => {
    if (activeFilterPanel) {
      setSortCriteriaList([]);
      setSortPropertySelectList(initialPropertySelectList);
      setFilterCriteriaList([]);
      setActiveFilterPanel(false);
    }
  };

  const handleCreateFilterButton = () => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const filterId = 'filter-' + randomNumber;
    const filterName = filterNameInputRef.current?.value || ('Bộ lọc ' + randomNumber);

    const filter: Filter = {
      id: filterId,
      createdAt: DateUtils.now(),
      updatedAt: DateUtils.now(),
      createdBy: CURRENT_USER_ID,
      updatedBy: CURRENT_USER_ID,
      name: filterName,
      sortCriteriaList: sortCriteriaList,
      filterCriteriaList: filterCriteriaList,
    };

    setFilters(prevState => [...prevState, filter]);
    setSortCriteriaList([]);
    setSortPropertySelectList(initialPropertySelectList);
    setFilterCriteriaList([]);
    setActiveFilterPanel(false);
  };

  return {
    handleCancelCreateFilterButton,
    handleCreateFilterButton,
  };
}

export default useFilterPanelHeaderRightViewModel;
