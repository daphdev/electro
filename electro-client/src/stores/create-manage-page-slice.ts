import { Dispatch, SetStateAction } from 'react';
import { setState, SliceCreator } from 'stores/use-app-store';
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
  setSelection: (value) => setState(set, value, 'selection'),
  setFilters: (value) => setState(set, value, 'filters'),
  setActiveFilter: (value) => setState(set, value, 'activeFilter'),
  setSearchToken: (value) => setState(set, value, 'searchToken'),
  setLoading: (value) => setState(set, value, 'loading'),
  setActivePage: (value) => setState(set, value, 'activePage'),
  setActivePageSize: (value) => setState(set, value, 'activePageSize'),
  setActiveFilterPanel: (value) => setState(set, value, 'activeFilterPanel'),
  setListResponse: (value) => setState(set, value, 'listResponse'),
});

export default createManagePageSlice;
