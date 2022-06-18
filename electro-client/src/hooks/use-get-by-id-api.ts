import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useGetByIdApi<O>(resourceUrl: string, resourceKey: string, entityId: number) {
  return useQuery<O, ErrorMessage>(
    [resourceKey, 'getById', entityId],
    () => FetchUtils.getById<O>(resourceUrl, entityId),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
    }
  );
}

export default useGetByIdApi;
