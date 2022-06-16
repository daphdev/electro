import { useQuery } from 'react-query';
import { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useGetByIdApi<O>(resourceUrl: string, resourceKey: string, entityId: number) {
  return useQuery<O, ErrorMessage>(
    [resourceKey, 'getById', entityId],
    () => getById<O>(resourceUrl, entityId),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
    }
  );
}

async function getById<O>(resourceUrl: string, entityId: number): Promise<O> {
  const response = await fetch(resourceUrl + '/' + entityId);
  if (!response.ok) {
    throw await response.json();
  }
  return await response.json();
}

export default useGetByIdApi;
