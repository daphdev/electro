import { SliceCreator } from 'stores/use-store';

export interface AdminSiteState {
  opened: boolean;
  toggleOpened: () => void;
}

const initialAdminSiteState = {
  opened: false,
};

const createAdminSiteSlice: SliceCreator<AdminSiteState> = (set) => ({
  ...initialAdminSiteState,
  toggleOpened: () => set((state) => ({ opened: !state.opened })),
});

export default createAdminSiteSlice;
