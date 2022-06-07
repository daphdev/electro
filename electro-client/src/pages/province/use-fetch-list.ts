import { useQuery } from 'react-query';
import { useEffect } from 'react';
import useAppStore from 'stores/use-app-store';
import { ErrorMessage, ListResponse } from 'utils/FetchUtils';

export function useFetchList<O>(queryKey: string, queryFn: () => Promise<ListResponse<O>>) {
  const { setListResponse, setLoading } = useAppStore();
  const queryResult = useQuery<ListResponse<O>, ErrorMessage>(queryKey, queryFn);
  console.log('ddddd');
  useEffect(() => {
    if (queryResult.isSuccess) {
      // setListResponse(queryResult.data);
      setLoading(false);
    }
  }, [queryResult.isSuccess, queryResult.data, setListResponse, setLoading]);
  return queryResult;
}
