import { Dispatch, SetStateAction } from 'react';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';
import { SelectOption } from 'types';
import { FilterCriteria, FilterPropertyTypes, SortCriteria } from 'utils/FilterUtils';
import { extractValue } from 'stores/use-app-store';

interface FilterPanelState {
  initialPropertySelectList: SelectOption[];
  setInitialPropertySelectList: Dispatch<SetStateAction<SelectOption[]>>;
  initialFilterPropertyTypes: FilterPropertyTypes;
  setInitialFilterPropertyTypes: Dispatch<SetStateAction<FilterPropertyTypes>>;
  sortCriteriaList: SortCriteria[];
  setSortCriteriaList: Dispatch<SetStateAction<SortCriteria[]>>;
  sortPropertySelectList: SelectOption[];
  setSortPropertySelectList: Dispatch<SetStateAction<SelectOption[]>>;
  filterCriteriaList: FilterCriteria[];
  setFilterCriteriaList: Dispatch<SetStateAction<FilterCriteria[]>>;
  filterPropertySelectList: SelectOption[];
  setFilterPropertySelectList: Dispatch<SetStateAction<SelectOption[]>>;
}

const initialFilterPanelState = {
  initialPropertySelectList: [],
  initialFilterPropertyTypes: {},
  sortCriteriaList: [],
  sortPropertySelectList: [],
  filterCriteriaList: [],
  filterPropertySelectList: [],
};

const useFilterPanelStore = create<FilterPanelState>()(
  devtools(
    (set) => ({
      ...initialFilterPanelState,
      setInitialPropertySelectList: (value) => set((state) => extractValue(state, value, 'initialPropertySelectList'), false, 'FilterPanelStore/initialPropertySelectList'),
      setInitialFilterPropertyTypes: (value) => set((state) => extractValue(state, value, 'initialFilterPropertyTypes'), false, 'FilterPanelStore/initialFilterPropertyTypes'),
      setSortCriteriaList: (value) => set((state) => extractValue(state, value, 'sortCriteriaList'), false, 'FilterPanelStore/sortCriteriaList'),
      setSortPropertySelectList: (value) => set((state) => extractValue(state, value, 'sortPropertySelectList'), false, 'FilterPanelStore/sortPropertySelectList'),
      setFilterCriteriaList: (value) => set((state) => extractValue(state, value, 'filterCriteriaList'), false, 'FilterPanelStore/filterCriteriaList'),
      setFilterPropertySelectList: (value) => set((state) => extractValue(state, value, 'filterPropertySelectList'), false, 'FilterPanelStore/filterPropertySelectList'),
    }),
    {
      name: 'FilterPanelStore',
      anonymousActionType: 'FilterPanelStore',
    }
  )
);

export default createTrackedSelector(useFilterPanelStore);
