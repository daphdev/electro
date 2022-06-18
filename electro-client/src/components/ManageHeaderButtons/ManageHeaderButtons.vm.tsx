import React from 'react';
import { Text, useMantineTheme } from '@mantine/core';
import { useModals } from '@mantine/modals';
import NotifyUtils from 'utils/NotifyUtils';
import useAppStore from 'stores/use-app-store';
import { ManageHeaderButtonsProps } from 'components/ManageHeaderButtons/ManageHeaderButtons';
import useDeleteByIdsApi from 'hooks/use-delete-by-ids-api';

function useManageHeaderButtonsViewModel({
  listResponse,
  resourceUrl,
  resourceKey,
}: ManageHeaderButtonsProps) {
  const theme = useMantineTheme();
  const modals = useModals();

  const deleteByIdsApi = useDeleteByIdsApi(resourceUrl, resourceKey);

  const {
    selection, setSelection,
    activePage, setActivePage,
  } = useAppStore();

  const handleDeleteBatchEntitiesButton = () => {
    if (selection.length > 0) {
      modals.openConfirmModal({
        size: 'xs',
        overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        closeOnClickOutside: false,
        title: <strong>Xác nhận xóa</strong>,
        children: <Text size="sm">Xóa (các) phần tử có ID {selection.join(', ')}?</Text>,
        labels: {
          cancel: 'Không xóa',
          confirm: 'Xóa',
        },
        confirmProps: { color: 'red' },
        onConfirm: () => handleConfirmedDeleteBatchEntitiesButton(selection),
      });
    } else {
      NotifyUtils.simple('Vui lòng chọn ít nhất một phần tử để xóa');
    }
  };

  const handleConfirmedDeleteBatchEntitiesButton = (entityIds: number[]) => {
    if (entityIds.length > 0) {
      deleteByIdsApi.mutate(entityIds, {
        onSuccess: () => {
          if (listResponse.content.length === selection.length) {
            setActivePage(activePage - 1 || 1);
          }
          setSelection([]);
        },
      });
    }
  };

  return { handleDeleteBatchEntitiesButton };
}

export default useManageHeaderButtonsViewModel;
