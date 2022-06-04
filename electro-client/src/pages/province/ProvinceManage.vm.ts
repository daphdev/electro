import { useCallback, useEffect } from 'react';
import FilterUtils from 'utils/FilterUtils';
import FetchUtils, { ListResponse, RequestParams } from 'utils/FetchUtils';
import { ProvinceResponse } from 'models/Province';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import useAppStore from 'stores/use-app-store';
import { useLocation } from 'react-router-dom';

function useProvinceManageViewModel() {
  const {
    selection, setSelection,
    activeEntityIdsToDelete, setActiveEntityIdsToDelete,
    openedDeleteBatchEntitiesModal, setOpenedDeleteBatchEntitiesModal,
    filters, setFilters,
    activeFilter,
    searchToken, setSearchToken,
    loading, setLoading,
    activePage, setActivePage,
    activeFilterPanel, setActiveFilterPanel,
    listResponse, setListResponse,
    setOpenedDeleteEntityModal,
    activeEntityIdToDelete,
    setOpenedViewEntityModal,
    openedDeleteEntityModal,
    openedViewEntityModal,
    activeEntityToView,
    activePageSize,
  } = useAppStore();
  
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
  }, [location, setLoading]);

  const handleCancelDeleteEntityButton = () => {
    setOpenedDeleteEntityModal(false);
  };

  const handleConfirmedDeleteEntityButton = () => {
    if (activeEntityIdToDelete) {
      FetchUtils.deleteById(ResourceURL.PROVINCE, activeEntityIdToDelete)
        .then((responseStatus) => {
          if (responseStatus === 204) {
            NotifyUtils.simpleSuccess('Xóa thành công');
            if (listResponse.content.length === 1) {
              setActivePage(activePage - 1 || 1);
            }
            setLoading(true);
          }
          if (responseStatus === 500) {
            NotifyUtils.simpleFailed('Xóa không thành công');
          }
        });
    }
    setOpenedDeleteEntityModal(false);
  };

  const handleCancelDeleteBatchEntitiesButton = () => {
    setOpenedDeleteBatchEntitiesModal(false);
  };

  const handleConfirmedDeleteBatchEntitiesButton = () => {
    if (activeEntityIdsToDelete.length > 0) {
      FetchUtils.deleteByIds(ResourceURL.PROVINCE, activeEntityIdsToDelete)
        .then((responseStatus) => {
          if (responseStatus === 204) {
            NotifyUtils.simpleSuccess('Xóa thành công');
            if (listResponse.content.length === selection.length) {
              setActivePage(activePage - 1 || 1);
            }
            setSelection([]);
            setLoading(true);
          }
          if (responseStatus === 500) {
            NotifyUtils.simpleFailed('Xóa không thành công');
          }
        });
    }
    setOpenedDeleteBatchEntitiesModal(false);
  };

  const handleCancelViewEntityButton = () => {
    setOpenedViewEntityModal(false);
  };


  const getProvinces = useCallback(async () => {
    if (loading) {
      const requestParams: RequestParams = {
        page: activePage,
        size: activePageSize,
        sort: FilterUtils.convertToSortRSQL(activeFilter),
        filter: FilterUtils.convertToFilterRSQL(activeFilter),
        search: searchToken,
      };
      const [responseStatus, responseBody] = await FetchUtils.getAll<ProvinceResponse>(ResourceURL.PROVINCE, requestParams);
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

  return {
    listResponse, setListResponse,
    activePage, setActivePage,
    activePageSize,
    selection,
    loading, setLoading,
    searchToken, setSearchToken,
    activeFilterPanel, setActiveFilterPanel,
    filters, setFilters,
    setOpenedDeleteEntityModal,
    activeEntityIdToDelete,
    openedDeleteBatchEntitiesModal, setOpenedDeleteBatchEntitiesModal,
    activeEntityIdsToDelete, setActiveEntityIdsToDelete,
    setOpenedViewEntityModal,
    handleCancelDeleteEntityButton,
    handleConfirmedDeleteEntityButton,
    handleCancelDeleteBatchEntitiesButton,
    handleConfirmedDeleteBatchEntitiesButton,
    handleCancelViewEntityButton,
    getProvinces,
    openedDeleteEntityModal,
    openedViewEntityModal,
    activeEntityToView,
  };
}

export default useProvinceManageViewModel;
