import { Dispatch, SetStateAction } from 'react';
import { setState, SliceCreator } from 'stores/use-store';
import { FilterObject } from 'utils/FilterUtils';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';

export interface ManagePageState {
  selection: number[];
  setSelection: Dispatch<SetStateAction<number[]>>;
  activeEntityIdsToDelete: number[];
  setActiveEntityIdsToDelete: Dispatch<SetStateAction<number[]>>;
  openedDeleteBatchEntitiesModal: boolean;
  setOpenedDeleteBatchEntitiesModal: Dispatch<SetStateAction<boolean>>;
  filters: FilterObject[];
  setFilters: Dispatch<SetStateAction<FilterObject[]>>;
  activeFilter: FilterObject | null;
  setActiveFilter: Dispatch<SetStateAction<FilterObject | null>>;
  searchToken: string;
  setSearchToken: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  activeFilterPanel: boolean;
  setActiveFilterPanel: Dispatch<SetStateAction<boolean>>;
}

const initialManagePageState = {
  selection: [],
  activeEntityIdsToDelete: [],
  openedDeleteBatchEntitiesModal: false,
  filters: [],
  activeFilter: null,
  searchToken: '',
  loading: true,
  activePage: ProvinceConfigs.initialListResponse.page,
  activeFilterPanel: false,
};

const createManagePageSlice: SliceCreator<ManagePageState> = (set) => ({
  ...initialManagePageState,
  setSelection: (value) => setState(set, value, 'selection'),
  setActiveEntityIdsToDelete: (value) => setState(set, value, 'activeEntityIdsToDelete'),
  setOpenedDeleteBatchEntitiesModal: (value) => setState(set, value, 'openedDeleteBatchEntitiesModal'),
  setFilters: (value) => setState(set, value, 'filters'),
  setActiveFilter: (value) => setState(set, value, 'activeFilter'),
  setSearchToken: (value) => setState(set, value, 'searchToken'),
  setLoading: value => setState(set, value, 'loading'),
  setActivePage: value => setState(set, value, 'activePage'),
  setActiveFilterPanel: value => setState(set, value, 'activeFilterPanel'),
});

export default createManagePageSlice;
