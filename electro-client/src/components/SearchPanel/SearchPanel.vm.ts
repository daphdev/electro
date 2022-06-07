import React, { useRef, useState } from 'react';
import useAppStore from 'stores/use-app-store';
import { Filter } from 'utils/FilterUtils';
import { SelectOption } from 'types';

function useSearchPanelViewModel() {
  const {
    filters,
    activeFilter, setActiveFilter,
    activeFilterPanel, setActiveFilterPanel,
    setLoading,
    setActivePage,
    searchToken, setSearchToken,
  } = useAppStore();

  const [localActiveFilter, setLocalActiveFilter] = useState<Filter | null>(null);
  const [prevActiveFilter, setPrevActiveFilter] = useState<Filter | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const filterSelectList: SelectOption[] = filters.map(item => ({ value: item.id, label: item.name }));
  const localActiveFilterId = localActiveFilter ? localActiveFilter.id : null;

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchButton();
    }
  };

  const handleFilterSelect = (filterIdValue: string | null) => {
    setLocalActiveFilter(prevState => {
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
    if (localActiveFilter) {
      setLocalActiveFilter(null);
    }
  };

  const handleSearchButton = () => {
    const currentSearchToken = searchInputRef.current ? searchInputRef.current.value : '';
    if (currentSearchToken !== searchToken || localActiveFilter !== prevActiveFilter) {
      setLoading(true);
      setActivePage(1);
      setActiveFilter(localActiveFilter);
      setSearchToken(currentSearchToken);
      setPrevActiveFilter(localActiveFilter);
    }
  };

  return {
    searchInputRef,
    filterSelectList,
    localActiveFilterId,
    handleSearchInput,
    handleFilterSelect,
    handleAddFilterButton,
    handleResetButton,
    handleSearchButton,
  };
}

export default useSearchPanelViewModel;
