import create from 'zustand';

interface ToggleNavbarState {
  opened: boolean;
  toggleOpened: () => void;
}

export const useToggleNavbarStore = create<ToggleNavbarState>(set => ({
  opened: false,
  toggleOpened: () => set(state => ({ opened: !state.opened }))
}));
