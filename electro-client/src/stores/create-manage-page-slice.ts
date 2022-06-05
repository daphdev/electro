import { Dispatch, SetStateAction } from 'react';
import { extractValue, SliceCreator } from 'stores/use-app-store';
import { Filter } from 'utils/FilterUtils';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { ListResponse } from 'utils/FetchUtils';
import { ProvinceResponse } from 'models/Province';

export interface ManagePageState {
  selection: number[];
  setSelection: Dispatch<SetStateAction<number[]>>;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  activeFilter: Filter | null;
  setActiveFilter: Dispatch<SetStateAction<Filter | null>>;
  searchToken: string;
  setSearchToken: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  activePageSize: number;
  setActivePageSize: Dispatch<SetStateAction<number>>;
  activeFilterPanel: boolean;
  setActiveFilterPanel: Dispatch<SetStateAction<boolean>>;
  listResponse: ListResponse<ProvinceResponse>;
  setListResponse: Dispatch<SetStateAction<ListResponse<ProvinceResponse>>>;
}

const initialManagePageState = {
  selection: [],
  filters: [],
  activeFilter: null,
  searchToken: '',
  loading: true,
  activePage: ProvinceConfigs.initialListResponse.page,
  activePageSize: ProvinceConfigs.initialListResponse.size,
  activeFilterPanel: false,
  listResponse: ProvinceConfigs.initialListResponse,
};

const createManagePageSlice: SliceCreator<ManagePageState> = (set) => ({
  ...initialManagePageState,
  setSelection: (value) => set((state) => extractValue(state, value, 'selection'), false, 'AppStore/selection'),
  setFilters: (value) => set((state) => extractValue(state, value, 'filters'), false, 'AppStore/filters'),
  setActiveFilter: (value) => set((state) => extractValue(state, value, 'activeFilter'), false, 'AppStore/activeFilter'),
  setSearchToken: (value) => set((state) => extractValue(state, value, 'searchToken'), false, 'AppStore/searchToken'),
  setLoading: (value) => set((state) => extractValue(state, value, 'loading'), false, 'AppStore/loading'),
  setActivePage: (value) => set((state) => extractValue(state, value, 'activePage'), false, 'AppStore/activePage'),
  setActivePageSize: (value) => set((state) => extractValue(state, value, 'activePageSize'), false, 'AppStore/activePageSize'),
  setActiveFilterPanel: (value) => set((state) => extractValue(state, value, 'activeFilterPanel'), false, 'AppStore/activeFilterPanel'),
  setListResponse: (value) => set((state) => extractValue(state, value, 'listResponse'), false, 'AppStore/listResponse'),
});

export default createManagePageSlice;
