import { useMutation, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useDeleteByIdApi(resourceUrl: string, resourceKey: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorMessage, number>(
    (entityId) => FetchUtils.deleteById(resourceUrl, entityId),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Xóa thành công');
        void queryClient.invalidateQueries([resourceKey, 'getAll']);
      },
      onError: () => NotifyUtils.simpleFailed('Xóa không thành công'),
    }
  );
}

export default useDeleteByIdApi;
