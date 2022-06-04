import useFilterPanelStore from 'stores/use-filter-panel-store';

const MAX_FILTER_CRITERIA_NUMBER = 10;

function useFilterPanelMainRightViewModel() {
  const {
    filterCriteriaList, setFilterCriteriaList,
  } = useFilterPanelStore();

  const isDisabledCreateFilterCriteriaButton = filterCriteriaList.length === MAX_FILTER_CRITERIA_NUMBER;

  const handleCreateFilterCriteriaButton = () => {
    if (filterCriteriaList.length < MAX_FILTER_CRITERIA_NUMBER) {
      setFilterCriteriaList(prevState => [...prevState, {
        property: null,
        type: null,
        operator: null,
        value: null,
      }]);
    }
  };

  return {
    filterCriteriaList,
    isDisabledCreateFilterCriteriaButton,
    handleCreateFilterCriteriaButton,
  };
}

export default useFilterPanelMainRightViewModel;
