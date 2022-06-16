import { useMutation } from 'react-query';
import { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useCreateApi<I, O>(resourceUrl: string) {
  return useMutation<O, ErrorMessage, I>(
    (requestBody) => create<I, O>(resourceUrl, requestBody),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Tạo thành công'),
      onError: () => NotifyUtils.simpleFailed('Tạo không thành công'),
    });
}

async function create<I, O>(resourceUrl: string, requestBody: I): Promise<O> {
  const response = await fetch(resourceUrl, {
    method: 'POST',
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

export default useCreateApi;
