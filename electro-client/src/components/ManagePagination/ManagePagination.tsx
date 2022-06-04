import React from 'react';
import { Group, Pagination, Select, Text } from '@mantine/core';
import useManagePaginationViewModel from 'components/ManagePagination/ManagePagination.vm';

function ManagePagination() {
  const {
    listResponse,
    activePage,
    activePageSize,
    pageSizeSelectList,
    handlePaginationButton,
    handlePageSizeSelect,
  } = useManagePaginationViewModel();

  if (listResponse.totalElements === 0) {
    return null;
  }

  return (
    <Group position="apart">
      <Text>
        <Text
          component="span"
          weight={500}
        >
          Trang {activePage}
        </Text>
        <span> / {listResponse.totalPages} </span>
        <Text
          component="span"
          color="gray"
          size="sm"
        >
          ({listResponse.totalElements})
        </Text>
      </Text>
      <Pagination
        page={activePage}
        total={listResponse.totalPages}
        onChange={handlePaginationButton}
      />
      <Group>
        <Text size="sm">Số hàng trên trang</Text>
        <Select
          sx={{ width: 72 }}
          variant="filled"
          data={pageSizeSelectList}
          value={String(activePageSize)}
          onChange={handlePageSizeSelect}
        />
      </Group>
    </Group>
  );
}

export default ManagePagination;
