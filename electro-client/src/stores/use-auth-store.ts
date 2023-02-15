import { UserResponse } from 'models/User';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';

interface AuthState {
  jwtToken: string | null;
  user: UserResponse | null;
  currentCartId: number | null;
  currentTotalCartItems: number;
  currentPaymentMethod: 'cod' | 'paypal';
}

interface AuthAction {
  updateJwtToken: (value: string) => void;
  updateUser: (value: UserResponse) => void;
  resetAuthState: () => void;
  updateCurrentCartId: (value: number | null) => void;
  updateCurrentTotalCartItems: (value: number) => void;
  updateCurrentPaymentMethod: (value: 'cod' | 'paypal') => void;
}

const initialAuthState: AuthState = {
  jwtToken: null,
  user: null,
  currentCartId: null,
  currentTotalCartItems: 0,
  currentPaymentMethod: 'cod',
};

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialAuthState,
        updateJwtToken: (value) => set(() => ({ jwtToken: value }), false, 'AuthStore/updateJwtToken'),
        updateUser: (value) => set(() => ({ user: value }), false, 'AuthStore/updateUser'),
        resetAuthState: () => set(initialAuthState, false, 'AuthStore/resetAuthState'),
        updateCurrentCartId: (value) => set(() => ({ currentCartId: value }), false, 'AuthStore/updateCurrentCartId'),
        updateCurrentTotalCartItems: (value) => set(
          () => ({ currentTotalCartItems: value }), false, 'AuthStore/updateCurrentTotalCartItems'),
        updateCurrentPaymentMethod: (value) => set(
          () => ({ currentPaymentMethod: value }), false, 'AuthStore/updateCurrentPaymentMethod'),
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
