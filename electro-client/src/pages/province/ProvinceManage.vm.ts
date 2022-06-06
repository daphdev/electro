import { useEffect } from 'react';
import useAppStore from 'stores/use-app-store';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useGenericService from 'services/use-generic-service';
import useFilterPanelStore from 'stores/use-filter-panel-store';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';

function useProvinceManageViewModel() {
  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  const {
    loading, setLoading,
    searchToken,
    setListResponse,
    getRequestParams,
  } = useAppStore();

  const { initFilterPanelState } = useFilterPanelStore();

  useEffect(() => {
    initFilterPanelState(ProvinceConfigs.properties);
  }, [initFilterPanelState]);

  const getProvinces = async () => {
    if (loading) {
      const { data } = await provinceService.getAll(ProvinceConfigs.resourceUrl, getRequestParams());
      if (data) {
        setTimeout(() => {
          setListResponse(data);
          setLoading(false);
        }, 100);
      }
    }
  };

  return {
    searchToken,
    getProvinces,
  };
}

export default useProvinceManageViewModel;
