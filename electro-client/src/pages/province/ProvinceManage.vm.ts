import { useEffect } from 'react';
import useAppStore from 'stores/use-app-store';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useGenericService from 'services/use-generic-service';
import useFilterPanelStore from 'stores/use-filter-panel-store';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import { useQuery } from 'react-query';
import { ErrorMessage, ListResponse, RequestParams } from 'utils/FetchUtils';
import { useFetchList } from 'pages/province/use-fetch-list';

async function getAll<O>(url: string, requestParams?: RequestParams): Promise<ListResponse<O>> {
  const response = await fetch(url);
  return await response.json();
}

function useProvinceManageViewModel() {
  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  // const provinces = useQuery<ListResponse<ProvinceResponse>, ErrorMessage>('provinces',
  //   () => getAll(ProvinceConfigs.resourceUrl)
  // );
  // useFetchList<ProvinceResponse>('provinces',
  //   () => getAll<ProvinceResponse>(ProvinceConfigs.resourceUrl)
  // );

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
    // if (loading) {
    //   const { data } = await provinceService.getAll(ProvinceConfigs.resourceUrl, getRequestParams());
    //   if (data) {
    //     setTimeout(() => {
    //       setListResponse(data);
    //       setLoading(false);
    //     }, 100);
    //   }
    // }


  };

  return {
    searchToken,
    getProvinces,
  };
}

export default useProvinceManageViewModel;
