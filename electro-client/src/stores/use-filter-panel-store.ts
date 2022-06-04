import { Dispatch, SetStateAction } from 'react';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';
import { SelectOption } from 'types';
import { FilterCriteria, SortCriteria } from 'utils/FilterUtils';
import { setState } from 'stores/use-app-store';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';

export interface FilterPanelState {
  sortCriteriaList: SortCriteria[];
  setSortCriteriaList: Dispatch<SetStateAction<SortCriteria[]>>;
  sortPropertySelectList: SelectOption[];
  setSortPropertySelectList: Dispatch<SetStateAction<SelectOption[]>>;
  filterCriteriaList: FilterCriteria[];
  setFilterCriteriaList: Dispatch<SetStateAction<FilterCriteria[]>>;
  filterPropertySelectList: SelectOption[];
  setFilterPropertySelectList: Dispatch<SetStateAction<SelectOption[]>>;

  counter: number;
  increment: () => void;
}

const initialFilterPanelState = {
  sortCriteriaList: [],
  sortPropertySelectList: ProvinceConfigs.initialPropertySelectList,
  filterCriteriaList: [],
  filterPropertySelectList: ProvinceConfigs.initialPropertySelectList,
};

const useFilterPanelStore = create<FilterPanelState>()(
  devtools(
    (set) => ({
      ...initialFilterPanelState,
      setSortCriteriaList: (value) => setState(set, value, 'sortCriteriaList'),
      setSortPropertySelectList: (value) => setState(set, value, 'sortPropertySelectList'),
      setFilterCriteriaList: (value) => setState(set, value, 'filterCriteriaList'),
      setFilterPropertySelectList: (value) => setState(set, value, 'filterPropertySelectList'),

      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
    }),
    {
      name: 'FilterPanelStore',
      anonymousActionType: 'FilterPanelStore',
    }
  )
);

export default createTrackedSelector(useFilterPanelStore);
