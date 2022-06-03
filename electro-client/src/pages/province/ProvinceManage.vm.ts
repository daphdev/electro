import { useCallback, useEffect, useState } from 'react';
import FilterUtils from 'utils/FilterUtils';
import FetchUtils, { ListResponse, RequestParams } from 'utils/FetchUtils';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
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
  } = useAppStore();

  const [listResponse, setListResponse] = useState<ListResponse<ProvinceResponse>>(ProvinceConfigs.initialListResponse);
  const [activePageSize, setActivePageSize] = useState(listResponse.size);

  const [openedDeleteEntityModal, setOpenedDeleteEntityModal] = useState(false);
  const [activeEntityIdToDelete, setActiveEntityIdToDelete] = useState<number | null>(null);

  const [openedViewEntityModal, setOpenedViewEntityModal] = useState(false);
  const [activeEntityToView, setActiveEntityToView] = useState<ProvinceResponse | null>(null);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
  }, [location, setLoading]);

  const handleToggleRowCheckbox = (entityId: number) =>
    setSelection(current =>
      current.includes(entityId) ? current.filter(item => item !== entityId) : [...current, entityId]
    );

  const handleToggleAllRowsCheckbox = () =>
    setSelection(current =>
      current.length === listResponse.content.length ? [] : listResponse.content.map(entity => entity.id)
    );

  const handlePaginationButton = (page: number) => {
    if (page !== activePage) {
      setLoading(true);
      setSelection([]);
      setActivePage(page);
    }
  };

  const handlePageSizeSelect = (size: string) => {
    const pageSize = Number(size);
    if (pageSize !== activePageSize) {
      setLoading(true);
      setSelection([]);
      setActivePage(1);
      setActivePageSize(pageSize);
    }
  };

  const handleDeleteEntityButton = (entityId: number) => {
    setActiveEntityIdToDelete(entityId);
    setOpenedDeleteEntityModal(true);
  };

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

  const handleViewEntityButton = (entityId: number) => {
    FetchUtils.getById<ProvinceResponse>(ResourceURL.PROVINCE, entityId)
      .then(([responseStatus, responseBody]) => {
        if (responseStatus === 200) {
          setActiveEntityToView(responseBody as ProvinceResponse);
          setOpenedViewEntityModal(true);
        }
        if (responseStatus === 404) {
          console.error(responseStatus, responseBody);
        }
      });
  };

  const handleCancelViewEntityButton = () => {
    setOpenedViewEntityModal(false);
  };

  const pageSizeSelectList = ProvinceConfigs.initialPageSizeSelectList.map(pageSize =>
    (Number(pageSize.value) > listResponse.totalElements) ? { ...pageSize, disabled: true } : pageSize
  );

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
  }, [loading, activePage, activePageSize, activeFilter, searchToken, setLoading]);

  return {
    listResponse, setListResponse,
    activePage, setActivePage,
    activePageSize, setActivePageSize,
    selection,
    loading, setLoading,
    searchToken, setSearchToken,
    activeFilterPanel, setActiveFilterPanel,
    filters, setFilters,
    openedDeleteEntityModal, setOpenedDeleteEntityModal,
    activeEntityIdToDelete, setActiveEntityIdToDelete,
    openedDeleteBatchEntitiesModal, setOpenedDeleteBatchEntitiesModal,
    activeEntityIdsToDelete, setActiveEntityIdsToDelete,
    openedViewEntityModal, setOpenedViewEntityModal,
    activeEntityToView, setActiveEntityToView,
    handleToggleRowCheckbox,
    handleToggleAllRowsCheckbox,
    handlePaginationButton,
    handlePageSizeSelect,
    handleDeleteEntityButton,
    handleCancelDeleteEntityButton,
    handleConfirmedDeleteEntityButton,
    handleCancelDeleteBatchEntitiesButton,
    handleConfirmedDeleteBatchEntitiesButton,
    handleViewEntityButton,
    handleCancelViewEntityButton,
    pageSizeSelectList,
    getProvinces,
  };
}

export default useProvinceManageViewModel;
