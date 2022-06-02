import React, { useRef, useState } from 'react';
import useStore from 'stores/use-store';
import { FilterObject } from 'utils/FilterUtils';
import { SelectOption } from 'types';

function useSearchPanelViewModel() {
  const {
    filters,
    activeFilter, setActiveFilter,
    activeFilterPanel, setActiveFilterPanel,
    setLoading,
    setActivePage,
    searchToken, setSearchToken,
  } = useStore();

  const [prevActiveFilter, setPrevActiveFilter] = useState<FilterObject | null>(null);

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
  };

  const handleSearchButton = () => {
    const currentSearchToken = searchInputRef.current ? searchInputRef.current.value : '';
    if (currentSearchToken !== searchToken || activeFilter !== prevActiveFilter) {
      setLoading(true);
      setActivePage(1);
      setSearchToken(currentSearchToken);
      setPrevActiveFilter(activeFilter);
    }
  };

  return {
    searchInputRef,
    handleSearchInput,
    filterSelectList,
    activeFilterId,
    handleFilterSelect,
    handleAddFilterButton,
    handleResetButton,
    handleSearchButton,
  };
}

export default useSearchPanelViewModel;
