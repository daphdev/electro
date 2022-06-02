import { Group, Pagination, Select, Text } from '@mantine/core';
import React from 'react';
import { ListResponse } from 'utils/FetchUtils';
import { ProvinceResponse } from 'models/Province';
import { SelectOption } from 'types';

interface ManageTablePaginationProps {
  listResponse: ListResponse<ProvinceResponse>;
  activePage: number;
  handlePaginationButton: (page: number) => void;
  pageSizeSelectList: SelectOption[];
  activePageSize: number;
  handlePageSizeSelect: (size: string) => void;
}

function ManageTablePagination({
  listResponse,
  activePage,
  handlePaginationButton,
  pageSizeSelectList,
  activePageSize,
  handlePageSizeSelect,
}: ManageTablePaginationProps) {

  if (listResponse.totalElements === 0) {
    return null;
  }

  return (
    <Group position="apart">
      <Text>
        <Text component="span" weight={500}>Trang {activePage}</Text>
        <span> / {listResponse.totalPages} </span>
        <Text component="span" color="gray" size="sm">({listResponse.totalElements})</Text>
      </Text>
      <Pagination page={activePage} onChange={handlePaginationButton} total={listResponse.totalPages}/>
      <Group>
        <Text size="sm">Số hàng trên trang</Text>
        <Select
          styles={{ root: { width: 72 } }}
          variant="filled"
          data={pageSizeSelectList}
          value={String(activePageSize)}
          onChange={handlePageSizeSelect}
        />
      </Group>
    </Group>
  );
}

export default ManageTablePagination;
