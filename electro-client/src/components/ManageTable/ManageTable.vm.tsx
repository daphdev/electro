import React from 'react';
import { Text, useMantineTheme } from '@mantine/core';
import { useModals } from '@mantine/modals';
import useAppStore from 'stores/use-app-store';
import { EntityDetailTable } from 'components';
import BaseResponse from 'models/BaseResponse';
import { ManageTableProps } from 'components/ManageTable/ManageTable';
import useDeleteByIdApi from 'hooks/use-delete-by-id-api';

function useManageTableViewModel<T extends BaseResponse>({
  listResponse,
  properties,
  resourceUrl,
  resourceKey,
  entityDetailTableRowsFragment,
}: ManageTableProps<T>) {
  const theme = useMantineTheme();
  const modals = useModals();

  const deleteByIdApi = useDeleteByIdApi(resourceUrl, resourceKey);

  const {
    selection, setSelection,
    activePage, setActivePage,
  } = useAppStore();

  const tableHeads = Object.values(properties)
    .flatMap((propertySpec) => propertySpec.isShowInTable ? propertySpec.label : []);

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

  const handleViewEntityButton = (entityId: number) => {
    modals.openModal({
      size: 'lg',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      title: <strong>Thông tin chi tiết</strong>,
      children: (
        <EntityDetailTable
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
          resourceUrl={resourceUrl}
          resourceKey={resourceKey}
          entityId={entityId}
        />
      ),
    });
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

  const handleConfirmedDeleteEntityButton = (entityId: number) => {
    deleteByIdApi.mutate(entityId, {
      onSuccess: () => {
        if (listResponse.content.length === 1) {
          setActivePage(activePage - 1 || 1);
        }
      },
    });
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
