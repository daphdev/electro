import React, { useEffect } from 'react';
import { Button, Group, Modal, Stack, Text, useMantineTheme } from '@mantine/core';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useProvinceManageViewModel from 'pages/province/ProvinceManage.vm';
import {
  EntityDetailsTable,
  FilterPanel,
  ManageHeader,
  ManageHeaderButtons,
  ManageHeaderTitle,
  ManageMain,
  ManagePagination,
  SearchPanel
} from 'components';

function ProvinceManage() {
  const theme = useMantineTheme();
  const {
    listResponse,
    loading,
    activeEntityIdToDelete,
    openedDeleteBatchEntitiesModal,
    activeEntityIdsToDelete,
    handleCancelDeleteEntityButton,
    handleConfirmedDeleteEntityButton,
    handleCancelDeleteBatchEntitiesButton,
    handleConfirmedDeleteBatchEntitiesButton,
    handleCancelViewEntityButton,
    getProvinces,
    openedDeleteEntityModal,
    openedViewEntityModal, activeEntityToView,
  } = useProvinceManageViewModel();

  useEffect(() => {
    void getProvinces();
  }, [getProvinces]);

  console.log('re-render: ', listResponse, {
    loading,
    activeEntityIdsToDelete,
    openedDeleteBatchEntitiesModal,
  });

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={ProvinceConfigs.manageTitleLinks}
          title={ProvinceConfigs.manageTitle}
        />
        <ManageHeaderButtons/>
      </ManageHeader>

      <SearchPanel/>

      <FilterPanel/>

      <ManageMain/>

      <ManagePagination/>

      <Modal
        size="xs"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        closeOnClickOutside={false}
        opened={openedDeleteEntityModal}
        onClose={handleCancelDeleteEntityButton}
        title={<strong>Xác nhận xóa</strong>}
      >
        <Stack>
          <Text>Xóa phần tử có ID {activeEntityIdToDelete}?</Text>
          <Group grow>
            <Button variant="default" onClick={handleCancelDeleteEntityButton}>Không xóa</Button>
            <Button color="red" onClick={handleConfirmedDeleteEntityButton}>Xóa</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        size="xs"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        closeOnClickOutside={false}
        opened={openedDeleteBatchEntitiesModal}
        onClose={handleCancelDeleteBatchEntitiesButton}
        title={<strong>Xác nhận xóa</strong>}
      >
        <Stack>
          <Text>Xóa (các) phần tử có ID {activeEntityIdsToDelete.join(', ')}?</Text>
          <Group grow>
            <Button variant="default" onClick={handleCancelDeleteBatchEntitiesButton}>Không xóa</Button>
            <Button color="red" onClick={handleConfirmedDeleteBatchEntitiesButton}>Xóa</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        size="md"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={openedViewEntityModal}
        onClose={handleCancelViewEntityButton}
        title={<strong>Thông tin chi tiết</strong>}
      >
        <EntityDetailsTable activeEntityToView={activeEntityToView}/>
      </Modal>
    </Stack>
  );
}

export default ProvinceManage;
