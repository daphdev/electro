import React, { useEffect } from 'react';
import 'dayjs/locale/vi';
import { Link } from 'react-router-dom';
import { Button, Center, Group, LoadingOverlay, Modal, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { Plus, Trash } from 'tabler-icons-react';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import {
  EntityDetailsTable,
  FilterPanel,
  ManageTable,
  ManageTablePagination,
  ManageTitle,
  SearchPanel
} from 'components';
import useProvinceManageViewModel from 'pages/province/ProvinceManage.vm';

export default function ProvinceManage() {
  const theme = useMantineTheme();
  const {
    searchInputRef, filterNameInputRef, filterCriteriaValueInputRefs,
    listResponse, setListResponse,
    activePage, setActivePage,
    activePageSize, setActivePageSize,
    selection, setSelection,
    loading, setLoading,
    searchToken, setSearchToken,
    activeFilterPanel, setActiveFilterPanel,
    sortCriteriaList, setSortCriteriaList,
    sortPropertySelectList, setSortPropertySelectList,
    filterCriteriaList, setFilterCriteriaList,
    filterPropertySelectList, setFilterPropertySelectList,
    filters, setFilters,
    activeFilter, setActiveFilter,
    prevActiveFilter, setPrevActiveFilter,
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
    handleSearchButton,
    handleSearchInput,
    handleResetButton,
    handleAddFilterButton,
    handleCancelCreateFilterButton,
    handleCreateSortCriteriaButton,
    handleSortPropertySelect,
    handleSortOrderSelect,
    handleDeleteSortCriteriaButton,
    handleCreateFilterCriteriaButton,
    handleFilterPropertySelect,
    handleFilterOperatorSelect,
    handleDeleteFilterCriteriaButton,
    handleCreateFilterButton,
    filterSelectList,
    handleFilterSelect,
    handleDeleteEntityButton,
    handleCancelDeleteEntityButton,
    handleConfirmedDeleteEntityButton,
    handleDeleteBatchEntitiesButton,
    handleCancelDeleteBatchEntitiesButton,
    handleConfirmedDeleteBatchEntitiesButton,
    handleViewEntityButton,
    handleCancelViewEntityButton,
    pageSizeSelectList,
    getProvinces,
  } = useProvinceManageViewModel();

  useEffect(() => {
    getProvinces();
  }, [getProvinces]);

  console.log('re-render: ', listResponse, {
    filterCriteriaList,
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
      <Group position="apart">
        <ManageTitle titleLinks={ProvinceConfigs.manageTitleLinks} title={ProvinceConfigs.manageTitle}/>

        <Group spacing="xs">
          <Button
            component={Link}
            to="create"
            variant="outline"
            leftIcon={<Plus/>}
          >
            Thêm mới
          </Button>
          <Button
            variant="outline"
            color="red"
            leftIcon={<Trash/>}
            onClick={handleDeleteBatchEntitiesButton}
          >
            Xóa hàng loạt
          </Button>
        </Group>
      </Group>

      <SearchPanel
        filterSelectList={filterSelectList}
        activeFilter={activeFilter}
        searchInputRef={searchInputRef}
        handleSearchInput={handleSearchInput}
        handleFilterSelect={handleFilterSelect}
        handleAddFilterButton={handleAddFilterButton}
        handleResetButton={handleResetButton}
        handleSearchButton={handleSearchButton}
      />

      <FilterPanel
        activeFilterPanel={activeFilterPanel}
        filterNameInputRef={filterNameInputRef}
        handleCancelCreateFilterButton={handleCancelCreateFilterButton}
        handleCreateFilterButton={handleCreateFilterButton}
        sortCriteriaList={sortCriteriaList}
        sortPropertySelectList={sortPropertySelectList}
        handleSortPropertySelect={handleSortPropertySelect}
        handleSortOrderSelect={handleSortOrderSelect}
        handleDeleteSortCriteriaButton={handleDeleteSortCriteriaButton}
        handleCreateSortCriteriaButton={handleCreateSortCriteriaButton}
        filterCriteriaList={filterCriteriaList}
        filterCriteriaValueInputRefs={filterCriteriaValueInputRefs}
        filterPropertySelectList={filterPropertySelectList}
        handleFilterPropertySelect={handleFilterPropertySelect}
        handleFilterOperatorSelect={handleFilterOperatorSelect}
        handleDeleteFilterCriteriaButton={handleDeleteFilterCriteriaButton}
        handleCreateFilterCriteriaButton={handleCreateFilterCriteriaButton}
      />

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
