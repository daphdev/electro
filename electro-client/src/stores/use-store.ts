import { SetStateAction } from 'react';
import create, { SetState, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { State } from 'zustand/vanilla';
import createAdminSiteSlice, { AdminSiteState } from 'stores/create-admin-site-slice';
import createManagePageSlice, { ManagePageState } from 'stores/create-manage-page-slice';

export type AppState = AdminSiteState & ManagePageState;

export type SliceCreator<T extends State> = StateCreator<AppState, [
  ['zustand/devtools', never]
], [], T>;

export const setState = <T>(set: SetState<AppState>, value: SetStateAction<T>, key: string) => {
  set(
    (state) => ({
      [key]: typeof value === 'function'
        ? (value as (prevState: T) => T)(state[key as keyof AppState] as unknown as T)
        : value,
    })
  );
};

const useStore = create<AppState>()(
  devtools(
    (...methods) => ({
      ...createAdminSiteSlice(...methods),
      ...createManagePageSlice(...methods),
    })
  )
);

export default useStore;
