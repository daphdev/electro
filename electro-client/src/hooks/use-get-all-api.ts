import { useQuery } from 'react-query';
import useAppStore from 'stores/use-app-store';
import FilterUtils from 'utils/FilterUtils';
import FetchUtils, { ErrorMessage, ListResponse, RequestParams } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useGetAllApi<O>(resourceUrl: string, resourceKey: string) {
  const {
    activePage,
    activePageSize,
    activeFilter,
    searchToken,
    setQueryKey,
  } = useAppStore();

  const requestParams = {
    page: activePage,
    size: activePageSize,
    sort: FilterUtils.convertToSortRSQL(activeFilter),
    filter: FilterUtils.convertToFilterRSQL(activeFilter),
    search: searchToken,
  };

  const queryKey = [resourceKey, 'getAll', requestParams];

  return useQuery<ListResponse<O>, ErrorMessage>(
    queryKey,
    () => getAll<O>(resourceUrl, requestParams),
    {
      keepPreviousData: true,
      onSuccess: () => setQueryKey(queryKey),
      onError: (error) => NotifyUtils.simpleFailed(`Lỗi ${error.statusCode || 404}: Lấy dữ liệu không thành công`),
    }
  );
}

async function getAll<O>(resourceUrl: string, requestParams?: RequestParams): Promise<ListResponse<O>> {
  const response = await fetch(FetchUtils.concatParams(resourceUrl, requestParams));
  if (!response.ok) {
    throw await response.json();
  }
  return await response.json();
}

export default useGetAllApi;
