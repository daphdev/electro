import DateUtils from 'utils/DateUtils';
import { FilterCriteria, Filter } from 'utils/FilterUtils';
import useAppStore from 'stores/use-app-store';
import useFilterPanelStore from 'components/FilterPanel/use-filter-panel-store';
import { FilterPanelHeaderRightProps } from 'components/FilterPanelHeaderRight/FilterPanelHeaderRight';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { getUntrackedObject } from 'react-tracked';

const CURRENT_USER_ID = 1;

function useFilterPanelHeaderRightViewModel({
  filterNameInputRef,
  filterCriteriaValueInputRefs,
}: FilterPanelHeaderRightProps) {
  const {
    activeFilterPanel, setActiveFilterPanel,
    setFilters,
  } = useAppStore();

  const {
    sortCriteriaList, setSortCriteriaList,
    setSortPropertySelectList,
    filterCriteriaList, setFilterCriteriaList,
  } = useFilterPanelStore();

  const handleCancelCreateFilterButton = () => {
    if (activeFilterPanel) {
      setSortCriteriaList([]);
      setSortPropertySelectList(ProvinceConfigs.initialPropertySelectList);
      setFilterCriteriaList([]);
      setActiveFilterPanel(false);
    }
  };

  const handleCreateFilterButton = () => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const filterId = 'filter-' + randomNumber;
    const filterName = filterNameInputRef.current?.value || ('Bộ lọc ' + randomNumber);

    const assignValueForFilterCriteria = (filterCriteriaList: FilterCriteria[]) => {
      return filterCriteriaList.map(item => {
        const filterCriteriaValueInputRefValue = filterCriteriaValueInputRefs.current.get(getUntrackedObject(item) as FilterCriteria)?.value;
        return filterCriteriaValueInputRefValue ? { ...item, value: filterCriteriaValueInputRefValue } : item;
      });
    };

    const filter: Filter = {
      id: filterId,
      createdAt: DateUtils.now(),
      updatedAt: DateUtils.now(),
      createdBy: CURRENT_USER_ID,
      updatedBy: CURRENT_USER_ID,
      name: filterName,
      sortCriteriaList: sortCriteriaList,
      filterCriteriaList: assignValueForFilterCriteria(filterCriteriaList),
    };

    setFilters(prevState => [...prevState, filter]);
    setSortCriteriaList([]);
    setSortPropertySelectList(ProvinceConfigs.initialPropertySelectList);
    setFilterCriteriaList([]);
    setActiveFilterPanel(false);
  };

  return {
    handleCancelCreateFilterButton,
    handleCreateFilterButton,
  };
}

export default useFilterPanelHeaderRightViewModel;
