import React, { useRef, useState } from 'react';
import useAppStore from 'stores/use-app-store';
import { Filter } from 'utils/FilterUtils';
import { SelectOption } from 'types';

function useSearchPanelViewModel() {
  const {
    filters,
    activeFilter, setActiveFilter,
    activeFilterPanel, setActiveFilterPanel,
    setActivePage,
    searchToken, setSearchToken,
  } = useAppStore();

  const [prevActiveFilter, setPrevActiveFilter] = useState<Filter | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const filterSelectList: SelectOption[] = filters.map(item => ({ value: item.id, label: item.name }));
  const activeFilterId = activeFilter ? activeFilter.id : null;

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchButton();
    }
  };

  const handleFilterSelect = (filterIdValue: string | null) => {
    setActiveFilter(prevState => {
      setPrevActiveFilter(prevState);
      return filters.find(item => item.id === filterIdValue) ?? null;
    });
  };

  const handleAddFilterButton = () => {
    if (!activeFilterPanel) {
      setActiveFilterPanel(true);
    }
  };

  const handleResetButton = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    if (activeFilter) {
      setActiveFilter(null);
    }
    setSearchToken('');
  };

  const handleSearchButton = () => {
    const currentSearchToken = searchInputRef.current ? searchInputRef.current.value : '';
    if (currentSearchToken !== searchToken || activeFilter !== prevActiveFilter) {
      setActivePage(1);
      setActiveFilter(activeFilter);
      setSearchToken(currentSearchToken);
      setPrevActiveFilter(activeFilter);
    }
  };

  return {
    searchInputRef,
    filterSelectList,
    activeFilterId,
    handleSearchInput,
    handleFilterSelect,
    handleAddFilterButton,
    handleResetButton,
    handleSearchButton,
  };
}

export default useSearchPanelViewModel;
