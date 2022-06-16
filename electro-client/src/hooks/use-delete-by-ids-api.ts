import { useMutation, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';
import useAppStore from 'stores/use-app-store';

function useDeleteByIdsApi(resourceUrl: string) {
  const queryClient = useQueryClient();
  const { queryKey } = useAppStore();

  return useMutation<void, ErrorMessage, number[]>(
    (entityIds) => FetchUtils.deleteByIds(resourceUrl, entityIds),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Xóa thành công');
        void queryClient.invalidateQueries(queryKey);
      },
      onError: () => NotifyUtils.simpleFailed('Xóa không thành công'),
    });
}

export default useDeleteByIdsApi;
