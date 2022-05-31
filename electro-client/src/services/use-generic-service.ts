import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

export default function useGenericService<I, O>() {

  const getById = async (resourceUrl: string, entityId: number) => {
    const [responseStatus, responseBody] = await FetchUtils.getById<O>(resourceUrl, entityId);
    const ret = { result: null, error: null, status: responseStatus };
    if (responseStatus === 200) {
      return { ...ret, result: responseBody as O };
    }
    if (responseStatus === 404) {
      NotifyUtils.simpleFailed('Lấy dữ liệu không thành công');
      return { ...ret, error: responseBody as ErrorMessage };
    }
    return ret;
  };

  const create = async (resourceUrl: string, requestBody: I) => {
    const [responseStatus] = await FetchUtils.create<I, O>(resourceUrl, requestBody);
    if (responseStatus === 201) {
      NotifyUtils.simpleSuccess('Tạo thành công');
    }
    if (responseStatus === 500) {
      NotifyUtils.simpleFailed('Tạo không thành công');
    }
  };

  const update = async (resourceUrl: string, entityId: number, requestBody: I) => {
    const [responseStatus] = await FetchUtils.update<I, O>(resourceUrl, entityId, requestBody);
    if (responseStatus === 200) {
      NotifyUtils.simpleSuccess('Cập nhật thành công');
    }
    if (responseStatus === 500) {
      NotifyUtils.simpleFailed('Cập nhật không thành công');
    }
  };

  return { create, update, getById };
}
