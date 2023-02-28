import { UserResponse } from 'models/User';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';

interface AdminAuthState {
  jwtToken: string | null;
  user: UserResponse | null;
}

interface AdminAuthAction {
  updateJwtToken: (value: string) => void;
  updateUser: (value: UserResponse) => void;
  resetAdminAuthState: () => void;
  isOnlyEmployee: () => boolean;
}

const initialAuthState: AdminAuthState = {
  jwtToken: null,
  user: null,
};

const useAdminAuthStore = create<AdminAuthState & AdminAuthAction>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialAuthState,
        updateJwtToken: (value) => set(() => ({ jwtToken: value }), false, 'AdminAuthStore/updateJwtToken'),
        updateUser: (value) => set(() => ({ user: value }), false, 'AdminAuthStore/updateUser'),
        resetAdminAuthState: () => set(initialAuthState, false, 'AdminAuthStore/resetAdminAuthState'),
        isOnlyEmployee: () => {
          const user = get().user;
          return !!(user && !user.roles.map(role => role.code).includes('ADMIN'));
        },
      }),
      {
        name: 'electro-admin-auth-store',
        getStorage: () => localStorage,
      }
    ),
    {
      name: 'AdminAuthStore',
      anonymousActionType: 'AdminAuthStore',
    }
  )
);

// Reference: https://docs.pmnd.rs/zustand/integrations/persisting-store-data#how-can-i-rehydrate-on-storage-event?
const withStorageDOMEvents = (store: typeof useAdminAuthStore) => {
  const storageEventCallback = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      store.persist.rehydrate();
    }
  };

  window.addEventListener('storage', storageEventCallback);

  return () => {
    window.removeEventListener('storage', storageEventCallback);
  };
};

withStorageDOMEvents(useAdminAuthStore);

export default createTrackedSelector(useAdminAuthStore);
