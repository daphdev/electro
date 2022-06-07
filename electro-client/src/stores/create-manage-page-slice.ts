import { Dispatch, SetStateAction } from 'react';
import { extractValue, SliceCreator } from 'stores/use-app-store';
import FilterUtils, { Filter } from 'utils/FilterUtils';
import { ListResponse, RequestParams } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';

export interface ManagePageState {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  activePageSize: number;
  setActivePageSize: Dispatch<SetStateAction<number>>;
  activeFilter: Filter | null;
  setActiveFilter: Dispatch<SetStateAction<Filter | null>>;
  searchToken: string;
  setSearchToken: Dispatch<SetStateAction<string>>;
  listResponse: ListResponse<unknown>;
  setListResponse: Dispatch<SetStateAction<ListResponse<unknown>>>;
  selection: number[];
  setSelection: Dispatch<SetStateAction<number[]>>;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  activeFilterPanel: boolean;
  setActiveFilterPanel: Dispatch<SetStateAction<boolean>>;
  getRequestParams: () => RequestParams;
  triggerRefetchList: boolean;
  setTriggerRefetchList: Dispatch<SetStateAction<boolean>>;
}

const initialManagePageState = {
  loading: true,
  activePage: PageConfigs.initialListResponse.page,
  activePageSize: PageConfigs.initialListResponse.size,
  activeFilter: null,
  searchToken: '',
  listResponse: PageConfigs.initialListResponse,
  selection: [],
  filters: [],
  activeFilterPanel: false,
  triggerRefetchList: false,
};

const createManagePageSlice: SliceCreator<ManagePageState> = (set, get) => ({
  ...initialManagePageState,
  setLoading: (value) => set((state) => extractValue(state, value, 'loading'), false, 'AppStore/loading'),
  setActivePage: (value) => set((state) => extractValue(state, value, 'activePage'), false, 'AppStore/activePage'),
  setActivePageSize: (value) => set((state) => extractValue(state, value, 'activePageSize'), false, 'AppStore/activePageSize'),
  setActiveFilter: (value) => set((state) => extractValue(state, value, 'activeFilter'), false, 'AppStore/activeFilter'),
  setSearchToken: (value) => set((state) => extractValue(state, value, 'searchToken'), false, 'AppStore/searchToken'),
  setListResponse: (value) => set((state) => extractValue(state, value, 'listResponse'), false, 'AppStore/listResponse'),
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
  setTriggerRefetchList: (value) => set((state) => extractValue(state, value, 'triggerRefetchList'), false, 'AppStore/triggerRefetchList'),
});

export default createManagePageSlice;
