import { NotificationResponse } from 'models/Notification';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';

interface ClientSiteState {
  newNotifications: NotificationResponse[];
}

interface ClientSiteAction {
  pushNewNotification: (value: NotificationResponse) => void;
}

const initialClientSiteState: ClientSiteState = {
  newNotifications: [],
};

const useClientSiteStore = create<ClientSiteState & ClientSiteAction>()(
  devtools(
    (set, get) => ({
      ...initialClientSiteState,
      pushNewNotification: (value) => set(
        () => ({ newNotifications: [...get().newNotifications, value] }),
        false,
        'ClientSiteStore/pushNewNotification'),
    }),
    {
      name: 'ClientSiteStore',
      anonymousActionType: 'ClientSiteStore',
    }
  )
);

export default createTrackedSelector(useClientSiteStore);
