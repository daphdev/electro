import { Dispatch, SetStateAction } from 'react';
import { SliceCreator } from 'stores/use-store';

export interface ManagePageState {
  selection: number[];
  setSelection: Dispatch<SetStateAction<number[]>>;
  activeEntityIdsToDelete: number[];
  setActiveEntityIdsToDelete: Dispatch<SetStateAction<number[]>>;
  openedDeleteBatchEntitiesModal: boolean;
  setOpenedDeleteBatchEntitiesModal: Dispatch<SetStateAction<boolean>>;
}

const initialManagePageState = {
  selection: [],
  activeEntityIdsToDelete: [],
  openedDeleteBatchEntitiesModal: false,
};

const createManagePageSlice: SliceCreator<ManagePageState> = (set) => ({
  selection: initialManagePageState.selection,
  setSelection: (value) => set((state) => ({
    selection: typeof value === 'function'
      ? value(state.selection)
      : value,
  })),
  activeEntityIdsToDelete: initialManagePageState.activeEntityIdsToDelete,
  setActiveEntityIdsToDelete: (value) => set((state) => ({
    activeEntityIdsToDelete: typeof value === 'function'
      ? value(state.activeEntityIdsToDelete)
      : value,
  })),
  openedDeleteBatchEntitiesModal: initialManagePageState.openedDeleteBatchEntitiesModal,
  setOpenedDeleteBatchEntitiesModal: (value) => set((state) => ({
    openedDeleteBatchEntitiesModal: typeof value === 'function'
      ? value(state.openedDeleteBatchEntitiesModal)
      : value,
  })),
});

export default createManagePageSlice;
