import { useMutation, useQueryClient } from 'react-query';
import { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';
import useAppStore from 'stores/use-app-store';

function useDeleteByIdsApi(resourceUrl: string) {
  const queryClient = useQueryClient();
  const { queryKey } = useAppStore();

  return useMutation<void, ErrorMessage, number[]>(
    (entityIds) => deleteByIds(resourceUrl, entityIds),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Xóa thành công');
        void queryClient.invalidateQueries(queryKey);
      },
      onError: () => NotifyUtils.simpleFailed('Xóa không thành công'),
    });
}

async function deleteByIds(resourceUrl: string, entityIds: number[]) {
  const response = await fetch(resourceUrl, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entityIds),
  });
  if (!response.ok) {
    throw await response.json();
  }
}

export default useDeleteByIdsApi;
