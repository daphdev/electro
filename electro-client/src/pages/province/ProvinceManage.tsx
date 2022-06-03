import React, { useEffect } from 'react';
import { Button, Center, Group, LoadingOverlay, Modal, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useProvinceManageViewModel from 'pages/province/ProvinceManage.vm';
import {
  EntityDetailsTable,
  FilterPanel,
  ManageHeader,
  ManageHeaderButtons,
  ManageHeaderTitle,
  ManageTable,
  ManageTablePagination,
  SearchPanel
} from 'components';

function ProvinceManage() {
  const theme = useMantineTheme();
  const {
    listResponse, setListResponse,
    activePage, setActivePage,
    activePageSize, setActivePageSize,
    selection,
    loading, setLoading,
    searchToken, setSearchToken,
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
  } = useProvinceManageViewModel();

  useEffect(() => {
    void getProvinces();
  }, [getProvinces]);

  console.log('re-render: ', listResponse, {
    // filterCriteriaList,
    // sortCriteriaList,
    // filters,
    // sortPropertySelectList,
    // activePage,
    // activePageSize,
    // selection,
    // filters,
    loading,
    // activeEntityIdToDelete,
    // openedDeleteEntityModal,
    activeEntityIdsToDelete,
    openedDeleteBatchEntitiesModal,
    // searchToken,
    // activeFilter,
    // prevActiveFilter,
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

      <Paper shadow="xs" style={{
        position: 'relative',
        height: listResponse.totalElements === 0 ? '250px' : 'auto'
      }}
      >
        <LoadingOverlay visible={loading}/>
        {listResponse.totalElements === 0 ? (
          <Center sx={{ height: '100%' }}>
            <Text color="dimmed">Không có gì hết :)</Text>
          </Center>
        ) : (
          <ManageTable
            handleToggleAllRowsCheckbox={handleToggleAllRowsCheckbox}
            selection={selection}
            listResponse={listResponse}
            handleToggleRowCheckbox={handleToggleRowCheckbox}
            searchToken={searchToken}
            handleViewEntityButton={handleViewEntityButton}
            handleDeleteEntityButton={handleDeleteEntityButton}
          />
        )}
      </Paper>

      <ManageTablePagination
        listResponse={listResponse}
        activePage={activePage}
        handlePaginationButton={handlePaginationButton}
        pageSizeSelectList={pageSizeSelectList}
        activePageSize={activePageSize}
        handlePageSizeSelect={handlePageSizeSelect}
      />

    </Stack>
  );
}

export default ProvinceManage;
