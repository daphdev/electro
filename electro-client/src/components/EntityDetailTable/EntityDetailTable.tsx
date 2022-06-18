import React from 'react';
import { Table } from '@mantine/core';
import useGetByIdApi from 'hooks/use-get-by-id-api';

interface EntityDetailTableProps<T> {
  entityDetailTableRowsFragment: (entity: T) => React.ReactNode;
  resourceUrl: string;
  resourceKey: string;
  entityId: number;
}

function EntityDetailTable<T>({
  entityDetailTableRowsFragment,
  resourceUrl,
  resourceKey,
  entityId,
}: EntityDetailTableProps<T>) {
  const { isLoading, isError, data } = useGetByIdApi<T>(resourceUrl, resourceKey, entityId);

  if (isLoading) {
    return <>Đang tải...</>;
  }

  if (isError) {
    return <>Đã có lỗi truy vấn</>;
  }

  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Thuộc tính</th>
          <th>Giá trị</th>
        </tr>
      </thead>
      <tbody>{entityDetailTableRowsFragment(data as T)}</tbody>
    </Table>
  );
}

export default EntityDetailTable;
