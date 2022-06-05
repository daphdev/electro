import { useCallback } from 'react';
import { ProvinceResponse } from 'models/Province';
import FilterUtils from 'utils/FilterUtils';
import NotifyUtils from 'utils/NotifyUtils';
import FetchUtils, { ListResponse, RequestParams } from 'utils/FetchUtils';
import useAppStore from 'stores/use-app-store';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';

function useProvinceManageViewModel() {
  const {
    loading, setLoading,
    activePage,
    activePageSize,
    activeFilter,
    searchToken,
    setListResponse,
  } = useAppStore();

  const getProvinces = useCallback(async () => {
    if (loading) {
      const requestParams: RequestParams = {
        page: activePage,
        size: activePageSize,
        sort: FilterUtils.convertToSortRSQL(activeFilter),
        filter: FilterUtils.convertToFilterRSQL(activeFilter),
        search: searchToken,
      };
      const [responseStatus, responseBody] = await FetchUtils.getAll<ProvinceResponse>(ProvinceConfigs.resourceUrl, requestParams);
      if (responseStatus === 200) {
        setTimeout(() => {
          setListResponse(responseBody as ListResponse<ProvinceResponse>);
          setLoading(false);
        }, 100);
      }
      if (responseStatus === 500) {
        NotifyUtils.simpleFailed('Lấy dữ liệu không thành công');
      }
    }
  }, [loading, activePage, activePageSize, activeFilter, searchToken, setListResponse, setLoading]);

  return { getProvinces };
}

export default useProvinceManageViewModel;
