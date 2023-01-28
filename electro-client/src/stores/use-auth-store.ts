import { UserResponse } from 'models/User';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';

interface AuthState {
  jwtToken: string | null;
  user: UserResponse | null;
}

interface AuthAction {
  updateJwtToken: (value: string) => void;
  updateUser: (value: UserResponse) => void;
  resetAuthState: () => void;
}

const initialAuthState: AuthState = {
  jwtToken: null,
  user: null,
};

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialAuthState,
        updateJwtToken: (value) => set(() => ({ jwtToken: value }), false, 'AuthStore/updateJwtToken'),
        updateUser: (value) => set(() => ({ user: value }), false, 'AuthStore/updateUser'),
        resetAuthState: () => set(initialAuthState, false, 'AuthStore/resetAuthState'),
      }),
      {
        name: 'electro-auth-store',
        getStorage: () => localStorage,
      }
    ),
    {
      name: 'AuthStore',
      anonymousActionType: 'AuthStore',
    }
  )
);

export default createTrackedSelector(useAuthStore);
