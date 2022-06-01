import create, { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { State } from 'zustand/vanilla';
import createAdminSiteSlice, { AdminSiteState } from 'stores/create-admin-site-slice';
import createManagePageSlice, { ManagePageState } from 'stores/create-manage-page-slice';

type AppState = AdminSiteState & ManagePageState;

export type SliceCreator<T extends State> = StateCreator<AppState, [
  ['zustand/devtools', never]
], [], T>;

const useStore = create<AppState>()(
  devtools(
    (...methods) => ({
      ...createAdminSiteSlice(...methods),
      ...createManagePageSlice(...methods),
    })
  )
);

export default useStore;
