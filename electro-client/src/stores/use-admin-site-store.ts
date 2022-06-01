import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

interface AdminSiteState {
  opened: boolean;
  toggleOpened: () => void;
}

const initialOpened = false;

const toggleOpened = produce<AdminSiteState>((state) => {
  state.opened = !state.opened;
});

export const useAdminSiteStore = create<AdminSiteState>()(
  devtools(
    (set) => ({
      opened: initialOpened,
      toggleOpened: () => set(toggleOpened),
    })
  )
);
