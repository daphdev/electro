import useAppStore from 'stores/use-app-store';
import { useEffect } from 'react';

function useResetManagePageState() {
  const { resetManagePageState } = useAppStore();

  useEffect(() => {
    resetManagePageState();
  }, [resetManagePageState]);
}

export default useResetManagePageState;
