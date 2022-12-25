import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useGetByIdApi<O>(
  resourceUrl: string,
  resourceKey: string,
  entityId: number,
  successCallback?: (data: O) => void,
  options?: { enabled: boolean }
) {
  return useQuery<O, ErrorMessage>(
    [resourceKey, 'getById', entityId],
    () => FetchUtils.getById<O>(resourceUrl, entityId),
    {
      onSuccess: successCallback,
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      ...options,
    }
  );
}

export default useGetByIdApi;
