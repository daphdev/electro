import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import useGenericService from 'services/use-generic-service';
import useAppStore from 'stores/use-app-store';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';

function useManageTableViewModel() {
  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  const {
    selection, setSelection,
    listResponse,
    searchToken,
    setActiveEntityToView,
    setOpenedViewEntityModal,
    setActiveEntityIdToDelete,
    setOpenedDeleteEntityModal,
  } = useAppStore();

  const handleToggleAllRowsCheckbox = () => {
    setSelection((current) => {
      return current.length === listResponse.content.length ? [] : listResponse.content.map(entity => entity.id);
    });
  };

  const handleToggleRowCheckbox = (entityId: number) => {
    setSelection((current) => {
      return current.includes(entityId) ? current.filter(item => item !== entityId) : [...current, entityId];
    });
  };

  const handleViewEntityButton = async (entityId: number) => {
    const { data } = await provinceService.getById(ProvinceConfigs.resourceUrl, entityId);
    if (data) {
      setActiveEntityToView(data);
      setOpenedViewEntityModal(true);
    }
  };

  const handleDeleteEntityButton = (entityId: number) => {
    setActiveEntityIdToDelete(entityId);
    setOpenedDeleteEntityModal(true);
  };

  return {
    selection,
    listResponse,
    searchToken,
    handleToggleAllRowsCheckbox,
    handleToggleRowCheckbox,
    handleViewEntityButton,
    handleDeleteEntityButton,
  };
}

export default useManageTableViewModel;
