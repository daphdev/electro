import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';

interface ClientCategoryState {
  totalProducts: number;
  activePage: number;
  activeBrandFilter: null | string;
  activePriceFilter: null | string;
  activeSort: null | 'lowest-price' | 'highest-price';
  activeSearch: null | string;
  activeSaleable: boolean;
}

interface ClientCategoryAction {
  updateTotalProducts: (value: number) => void;
  updateActivePage: (value: number) => void;
  updateActiveBrandFilter: (value: null | string) => void;
  updateActivePriceFilter: (value: null | string) => void;
  updateActiveSort: (value: null | 'lowest-price' | 'highest-price') => void;
  updateActiveSearch: (value: null | string) => void;
  updateActiveSaleable: (value: boolean) => void;
  resetClientCategoryState: () => void;
}

const initialClientCategoryState: Omit<ClientCategoryState, 'totalProducts'> = {
  activePage: 1,
  activeBrandFilter: null,
  activePriceFilter: null,
  activeSort: null,
  activeSearch: null,
  activeSaleable: false,
};

const useClientCategoryStore = create<ClientCategoryState & ClientCategoryAction>()(
  devtools(
    (set) => ({
      totalProducts: 0,
      ...initialClientCategoryState,
      updateTotalProducts: (value) => set(
        () => ({ totalProducts: value }), false, 'ClientCategoryStore/updateTotalProducts'),
      updateActivePage: (value) => set(
        () => ({ activePage: value }), false, 'ClientCategoryStore/updateActivePage'),
      updateActiveBrandFilter: (value) => set(
        () => ({ activeBrandFilter: value }), false, 'ClientCategoryStore/updateActiveBrandFilter'),
      updateActivePriceFilter: (value) => set(
        () => ({ activePriceFilter: value }), false, 'ClientCategoryStore/updateActivePriceFilter'),
      updateActiveSort: (value) => set(
        () => ({ activeSort: value }), false, 'ClientCategoryStore/updateActiveSort'),
      updateActiveSearch: (value) => set(
        () => ({ activeSearch: value }), false, 'ClientCategoryStore/updateActiveSearch'),
      updateActiveSaleable: (value) => set(
        () => ({ activeSaleable: value }), false, 'ClientCategoryStore/updateActiveSaleable'),
      resetClientCategoryState: () => set(
        initialClientCategoryState, false, 'ClientCategoryStore/resetClientCategoryState'),
    }),
    {
      name: 'ClientCategoryStore',
      anonymousActionType: 'ClientCategoryStore',
    }
  )
);

export default createTrackedSelector(useClientCategoryStore);
