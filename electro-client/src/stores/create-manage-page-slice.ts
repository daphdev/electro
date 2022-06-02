import { Dispatch, SetStateAction } from 'react';
import { SetState } from 'zustand';
import { AppState, SliceCreator } from 'stores/use-store';

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

const setState = <T>(set: SetState<AppState>, value: SetStateAction<T>, key: string) => {
  set(
    (state) => ({
      [key]: typeof value === 'function'
        ? (value as (prevState: T) => T)(state[key as keyof AppState] as unknown as T)
        : value,
    })
  );
};

const createManagePageSlice: SliceCreator<ManagePageState> = (set) => ({
  selection: initialManagePageState.selection,
  setSelection: (value) => setState(set, value, 'selection'),
  activeEntityIdsToDelete: initialManagePageState.activeEntityIdsToDelete,
  setActiveEntityIdsToDelete: (value) => setState(set, value, 'activeEntityIdsToDelete'),
  openedDeleteBatchEntitiesModal: initialManagePageState.openedDeleteBatchEntitiesModal,
  setOpenedDeleteBatchEntitiesModal: (value) => setState(set, value, 'openedDeleteBatchEntitiesModal'),
});

export default createManagePageSlice;
