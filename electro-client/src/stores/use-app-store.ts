import { SetStateAction } from 'react';
import create, { SetState, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { State } from 'zustand/vanilla';
import { createTrackedSelector } from 'react-tracked';
import createAdminSiteSlice, { AdminSiteState } from 'stores/create-admin-site-slice';
import createManagePageSlice, { ManagePageState } from 'stores/create-manage-page-slice';
import { FilterPanelState } from 'components/FilterPanel/use-filter-panel-store';

export type AppState = AdminSiteState & ManagePageState;

export type SliceCreator<T extends State> = StateCreator<AppState, [
  ['zustand/devtools', never]
], [], T>;

/**
 * !!! TEMPORARY SOLUTION TO TRANSIT useState TO zustand !!!
 */
type TotalState = AppState & FilterPanelState;

export const setState = <T>(set: SetState<TotalState>, value: SetStateAction<T>, key: string) => {
  set(
    (state) => ({
      [key]: typeof value === 'function'
        ? (value as (prevState: T) => T)(state[key as keyof TotalState] as unknown as T)
        : value,
    })
  );
};

const useAppStore = create<AppState>()(
  devtools(
    (...methods) => ({
      ...createAdminSiteSlice(...methods),
      ...createManagePageSlice(...methods),
    }),
    {
      name: 'AppStore',
      anonymousActionType: 'AppStore',
    }
  )
);

export default createTrackedSelector(useAppStore);
