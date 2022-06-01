import { SliceCreator } from 'stores/use-store';

export interface AdminSiteState {
  opened: boolean;
  toggleOpened: () => void;
}

const initialAdminSiteState = {
  opened: false,
};

const toggleOpened = (state: AdminSiteState) => ({ opened: !state.opened });

const createAdminSiteSlice: SliceCreator<AdminSiteState> = (set) => ({
  opened: initialAdminSiteState.opened,
  toggleOpened: () => set(toggleOpened),
});

export default createAdminSiteSlice;
