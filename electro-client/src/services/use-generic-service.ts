import FetchUtils from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

export default function useGenericService<I, O>() {

  const create = async (resourceUrl: string, requestBody: I) => {
    const [responseStatus] = await FetchUtils.create<I, O>(resourceUrl, requestBody);
    if (responseStatus === 201) {
      NotifyUtils.simpleSuccess('Tạo thành công');
    }
    if (responseStatus === 500) {
      NotifyUtils.simpleFailed('Tạo không thành công');
    }
  };

  return { create };
}
