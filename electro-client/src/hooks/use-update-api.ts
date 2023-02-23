import { useMutation, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useUpdateApi<I, O>(resourceUrl: string, resourceKey: string, entityId: number) {
  const queryClient = useQueryClient();

  return useMutation<O, ErrorMessage, I>(
    (requestBody) => FetchUtils.update<I, O>(resourceUrl, entityId, requestBody),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Cập nhật thành công');
        void queryClient.invalidateQueries([resourceKey, 'getById', entityId]);
        void queryClient.invalidateQueries([resourceKey, 'getAll']);
      },
      onError: () => NotifyUtils.simpleFailed('Cập nhật không thành công'),
    }
  );
}

export default useUpdateApi;
