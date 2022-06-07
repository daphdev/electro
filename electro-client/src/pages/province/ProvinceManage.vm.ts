import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { ProvinceResponse } from 'models/Province';
import useGetAll from 'hooks/use-get-all';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';

function useProvinceManageViewModel() {
  useGetAll<ProvinceResponse>(ProvinceConfigs.resourceUrl, ProvinceConfigs.resourceKey);
  useInitFilterPanelState(ProvinceConfigs.properties);

  return {};
}

export default useProvinceManageViewModel;
