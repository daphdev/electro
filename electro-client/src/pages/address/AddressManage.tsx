import React from 'react';
import create, { StoreApi } from 'zustand';
import createContext from 'zustand/context';

interface IStore {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const { Provider, useStore } = createContext<StoreApi<IStore>>();

const createStore = () => {
  return create<IStore>((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }));
};

const Button = () => {
  return (
    <Provider createStore={createStore}>
      <ButtonChild/>
    </Provider>
  );
};

const ButtonChild = () => {
  const state = useStore();
  return (
    <div>
      {state.bears}
      <button onClick={state.increasePopulation}>
        +
      </button>
    </div>
  );
};

function AddressManage() {
  return (
    <div>
      AddressManager
      <Button/>
      <Button/>
    </div>
  );
}

export default AddressManage;
