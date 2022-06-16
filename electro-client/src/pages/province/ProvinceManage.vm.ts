import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { ProvinceResponse } from 'models/Province';
import useGetAllApi from 'hooks/use-get-all-api';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';

function useProvinceManageViewModel() {
  useGetAllApi<ProvinceResponse>(ProvinceConfigs.resourceUrl, ProvinceConfigs.resourceKey);
  useInitFilterPanelState(ProvinceConfigs.properties);

  return {};
}

export default useProvinceManageViewModel;
