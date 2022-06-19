import { useMutation, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useDeleteByIdsApi(resourceUrl: string, resourceKey: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorMessage, number[]>(
    (entityIds) => FetchUtils.deleteByIds(resourceUrl, entityIds),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Xóa thành công');
        void queryClient.invalidateQueries([resourceKey, 'getAll']);
      },
      onError: () => NotifyUtils.simpleFailed('Xóa không thành công'),
    }
  );
}

export default useDeleteByIdsApi;
