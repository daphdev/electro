import { Dispatch, SetStateAction } from 'react';
import { extractValue, SliceCreator } from 'stores/use-app-store';
import FilterUtils, { Filter } from 'utils/FilterUtils';
import { RequestParams } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';

export interface ManagePageState {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  activePageSize: number;
  setActivePageSize: Dispatch<SetStateAction<number>>;
  activeFilter: Filter | null;
  setActiveFilter: Dispatch<SetStateAction<Filter | null>>;
  searchToken: string;
  setSearchToken: Dispatch<SetStateAction<string>>;
  selection: number[];
  setSelection: Dispatch<SetStateAction<number[]>>;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  activeFilterPanel: boolean;
  setActiveFilterPanel: Dispatch<SetStateAction<boolean>>;
  getRequestParams: () => RequestParams;
  resetManagePageState: () => void;
}

const initialManagePageState = {
  activePage: PageConfigs.initialListResponse.page,
  activePageSize: PageConfigs.initialListResponse.size,
  activeFilter: null,
  searchToken: '',
  selection: [],
  filters: [],
  activeFilterPanel: false,
};

const createManagePageSlice: SliceCreator<ManagePageState> = (set, get) => ({
  ...initialManagePageState,
  setActivePage: (value) => set((state) => extractValue(state, value, 'activePage'), false, 'AppStore/activePage'),
  setActivePageSize: (value) => set((state) => extractValue(state, value, 'activePageSize'), false, 'AppStore/activePageSize'),
  setActiveFilter: (value) => set((state) => extractValue(state, value, 'activeFilter'), false, 'AppStore/activeFilter'),
  setSearchToken: (value) => set((state) => extractValue(state, value, 'searchToken'), false, 'AppStore/searchToken'),
  setSelection: (value) => set((state) => extractValue(state, value, 'selection'), false, 'AppStore/selection'),
  setFilters: (value) => set((state) => extractValue(state, value, 'filters'), false, 'AppStore/filters'),
  setActiveFilterPanel: (value) => set((state) => extractValue(state, value, 'activeFilterPanel'), false, 'AppStore/activeFilterPanel'),
  getRequestParams: () => ({
    page: get().activePage,
    size: get().activePageSize,
    sort: FilterUtils.convertToSortRSQL(get().activeFilter),
    filter: FilterUtils.convertToFilterRSQL(get().activeFilter),
    search: get().searchToken,
  }),
  resetManagePageState: () => set(initialManagePageState),
});

export default createManagePageSlice;
