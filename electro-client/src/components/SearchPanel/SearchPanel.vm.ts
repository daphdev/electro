import React, { useRef, useState } from 'react';
import useStore from 'stores/use-store';
import { FilterObject } from 'utils/FilterUtils';
import { SelectOption } from 'types';

function useSearchPanelViewModel() {
  const {
    filters,
    activeFilter, setActiveFilter,
    searchToken, setSearchToken,
    setLoading,
    setActivePage,
    activeFilterPanel, setActiveFilterPanel,
  } = useStore();

  const [prevActiveFilter, setPrevActiveFilter] = useState<FilterObject | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const filterSelectList: SelectOption[] = filters.map(item => ({ value: item.id, label: item.name }));

  const handleSearchButton = () => {
    const currentSearchToken = searchInputRef.current?.value ?? '';
    if (currentSearchToken !== searchToken || activeFilter?.id !== prevActiveFilter?.id) {
      setLoading(true);
      setActivePage(1);
      setSearchToken(currentSearchToken);
      setPrevActiveFilter(activeFilter);
    }
  };

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchButton();
    }
  };

  const handleFilterSelect = (filterIdValue: string | null) => {
    setActiveFilter(prevState => {
      setPrevActiveFilter(prevState ?? null);
      return filters.find(item => item.id === filterIdValue) ?? null;
    });
  };

  const handleAddFilterButton = () => {
    if (!activeFilterPanel) {
      setActiveFilterPanel(true);
    }
  };

  const handleResetButton = () => {
    if (searchInputRef.current?.value) {
      searchInputRef.current.value = '';
    }
    if (activeFilter !== null) {
      setActiveFilter(null);
    }
  };

  return {
    filterSelectList,
    activeFilter,
    handleSearchButton,
    handleSearchInput,
    handleFilterSelect,
    handleAddFilterButton,
    handleResetButton,
    searchInputRef,
  };
}

export default useSearchPanelViewModel;
