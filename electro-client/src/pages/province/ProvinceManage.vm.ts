import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import FilterUtils from 'utils/FilterUtils';
import { RequestParams } from 'utils/FetchUtils';
import useAppStore from 'stores/use-app-store';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useGenericService from 'services/use-generic-service';
import useFilterPanelStore from 'stores/use-filter-panel-store';
import { useEffect } from 'react';

function useProvinceManageViewModel() {
  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  const {
    loading, setLoading,
    activePage,
    activePageSize,
    activeFilter,
    searchToken,
    setListResponse,
  } = useAppStore();

  const {
    initialPropertySelectList, setInitialPropertySelectList,
    initialFilterPropertyTypes, setInitialFilterPropertyTypes,
    setSortPropertySelectList,
    setFilterPropertySelectList,
  } = useFilterPanelStore();

  useEffect(() => {
    if (initialPropertySelectList.length === 0) {
      setInitialPropertySelectList(ProvinceConfigs.initialPropertySelectList);
      setSortPropertySelectList(ProvinceConfigs.initialPropertySelectList);
      setFilterPropertySelectList(ProvinceConfigs.initialPropertySelectList);
    }
    if (Object.keys(initialFilterPropertyTypes).length === 0) {
      setInitialFilterPropertyTypes(ProvinceConfigs.initialFilterPropertyTypes);
    }
  }, [
    initialPropertySelectList,
    setFilterPropertySelectList,
    setInitialPropertySelectList,
    setSortPropertySelectList,
    initialFilterPropertyTypes,
    setInitialFilterPropertyTypes,
  ]);

  const getProvinces = async () => {
    if (loading) {
      const requestParams: RequestParams = {
        page: activePage,
        size: activePageSize,
        sort: FilterUtils.convertToSortRSQL(activeFilter),
        filter: FilterUtils.convertToFilterRSQL(activeFilter),
        search: searchToken,
      };
      const { data } = await provinceService.getAll(ProvinceConfigs.resourceUrl, requestParams);
      if (data) {
        setTimeout(() => {
          setListResponse(data);
          setLoading(false);
        }, 100);
      }
    }
  };

  return { getProvinces };
}

export default useProvinceManageViewModel;
