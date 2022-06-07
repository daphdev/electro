import React from 'react';
import { Text, useMantineTheme } from '@mantine/core';
import { useModals } from '@mantine/modals';
import useAppStore from 'stores/use-app-store';
import { EntityDetailsTable } from 'components/index';
import BaseResponse from 'models/BaseResponse';
import useGenericService from 'services/use-generic-service';
import { ManageTableProps } from 'components/ManageTable/ManageTable';
import useListResponse from 'hooks/use-list-response';

function useManageTableViewModel<T extends BaseResponse>({
  properties,
  resourceUrl,
  entityDetailsTableRowsFragment,
}: ManageTableProps<T>) {
  const theme = useMantineTheme();
  const modals = useModals();

  const service = useGenericService();
  const { listResponse } = useListResponse<T>();

  const {
    selection, setSelection,
    activePage, setActivePage,
  } = useAppStore();

  const tableHeads = Object.values(properties)
    .flatMap((propertySpec) => !propertySpec.isShowInTable ? [] : propertySpec.label);

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
    const { data } = await service.getById(resourceUrl, entityId);
    if (data) {
      modals.openModal({
        size: 'md',
        overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        title: <strong>Thông tin chi tiết</strong>,
        children: <EntityDetailsTable entityDetailsTableRowsFragment={entityDetailsTableRowsFragment(data as T)}/>,
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
    const { status } = await service.deleteById(resourceUrl, entityId);
    if (status === 204) {
      if (listResponse.content.length === 1) {
        setActivePage(activePage - 1 || 1);
      }
    }
  };

  return {
    listResponse,
    selection,
    tableHeads,
    handleToggleAllRowsCheckbox,
    handleToggleRowCheckbox,
    handleViewEntityButton,
    handleDeleteEntityButton,
  };
}

export default useManageTableViewModel;
