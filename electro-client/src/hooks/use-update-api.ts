import { useMutation } from 'react-query';
import { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useUpdateApi<I, O>(resourceUrl: string, entityId: number) {
  return useMutation<O, ErrorMessage, I>(
    (requestBody) => update<I, O>(resourceUrl, entityId, requestBody),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Cập nhật thành công'),
      onError: () => NotifyUtils.simpleFailed('Cập nhật không thành công'),
    }
  );
}

async function update<I, O>(resourceUrl: string, entityId: number, requestBody: I): Promise<O> {
  const response = await fetch(resourceUrl + '/' + entityId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw await response.json();
  }
  return await response.json();
}

export default useUpdateApi;
