import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useUpdateApi<I, O>(resourceUrl: string, entityId: number) {
  return useMutation<O, ErrorMessage, I>(
    (requestBody) => FetchUtils.update<I, O>(resourceUrl, entityId, requestBody),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Cập nhật thành công'),
      onError: () => NotifyUtils.simpleFailed('Cập nhật không thành công'),
    }
  );
}

export default useUpdateApi;
