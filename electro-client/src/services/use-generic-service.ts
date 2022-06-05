import FetchUtils, { ErrorMessage, ListResponse, RequestParams } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useGenericService<I, O>() {

  const getAll = async (resourceUrl: string, requestParams: RequestParams) => {
    const [responseStatus, responseBody] = await FetchUtils.getAll<O>(resourceUrl, requestParams);
    const ret = { data: null, error: null, status: responseStatus };
    if (responseStatus === 200) {
      return { ...ret, data: responseBody as ListResponse<O> };
    }
    if (responseStatus === 500) {
      NotifyUtils.simpleFailed('Lấy dữ liệu không thành công');
      return { ...ret, error: responseBody as ErrorMessage };
    }
    return ret;
  };

  const getById = async (resourceUrl: string, entityId: number) => {
    const [responseStatus, responseBody] = await FetchUtils.getById<O>(resourceUrl, entityId);
    const ret = { data: null, error: null, status: responseStatus };
    if (responseStatus === 200) {
      return { ...ret, data: responseBody as O };
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

  const deleteByIds = async (resourceUrl: string, entityIds: number[]) => {
    const responseStatus = await FetchUtils.deleteByIds(resourceUrl, entityIds);
    const ret = { data: null, error: null, status: responseStatus };
    if (responseStatus === 204) {
      NotifyUtils.simpleSuccess('Xóa thành công');
    }
    if (responseStatus === 500) {
      NotifyUtils.simpleFailed('Xóa không thành công');
    }
    return ret;
  };

  return { getAll, getById, create, update, deleteByIds };
}

export default useGenericService;
