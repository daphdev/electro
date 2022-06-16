import { useMutation, useQueryClient } from 'react-query';
import { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';
import useAppStore from 'stores/use-app-store';

function useDeleteByIdApi(resourceUrl: string) {
  const queryClient = useQueryClient();
  const { queryKey } = useAppStore();

  return useMutation<void, ErrorMessage, number>(
    (entityId) => deleteById(resourceUrl, entityId),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Xóa thành công');
        void queryClient.invalidateQueries(queryKey);
      },
      onError: () => NotifyUtils.simpleFailed('Xóa không thành công'),
    });
}

async function deleteById(resourceUrl: string, entityId: number) {
  const response = await fetch(resourceUrl + '/' + entityId, { method: 'DELETE' });
  if (!response.ok) {
    throw await response.json();
  }
}

export default useDeleteByIdApi;
