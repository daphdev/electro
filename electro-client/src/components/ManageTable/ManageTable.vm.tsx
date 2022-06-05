import React from 'react';
import { Text, useMantineTheme } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import useGenericService from 'services/use-generic-service';
import useAppStore from 'stores/use-app-store';
import FetchUtils, { ListResponse } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';
import { EntityDetailsTable } from 'components/index';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';

function useManageTableViewModel() {
  const theme = useMantineTheme();
  const modals = useModals();

  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  const {
    setLoading,
    selection, setSelection,
    listResponse: rawListResponse,
    searchToken,
    activePage, setActivePage,
  } = useAppStore();

  const listResponse = rawListResponse as ListResponse<ProvinceResponse>;

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
      modals.openModal({
        size: 'md',
        overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        title: <strong>Thông tin chi tiết</strong>,
        children: <EntityDetailsTable entityData={data}/>,
      });
    }
  };

  const handleDeleteEntityButton = (entityId: number) => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Xác nhận xóa</strong>,
      children: <Text size="sm">Xóa phần tử có ID {entityId}?</Text>,
      labels: {
        cancel: 'Không xóa',
        confirm: 'Xóa',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => handleConfirmedDeleteEntityButton(entityId),
    });
  };

  const handleConfirmedDeleteEntityButton = async (entityId: number) => {
    const status = await FetchUtils.deleteById(ProvinceConfigs.resourceUrl, entityId);
    if (status === 204) {
      NotifyUtils.simpleSuccess('Xóa thành công');
      if (listResponse.content.length === 1) {
        setActivePage(activePage - 1 || 1);
      }
      setLoading(true);
    }
    if (status === 500) {
      NotifyUtils.simpleFailed('Xóa không thành công');
    }
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
