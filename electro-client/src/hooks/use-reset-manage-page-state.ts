import useAppStore from 'stores/use-app-store';
import { useEffect } from 'react';

function useResetManagePageState() {
  const { reset } = useAppStore();

  useEffect(() => {
    reset();
  }, [reset]);
}

export default useResetManagePageState;
