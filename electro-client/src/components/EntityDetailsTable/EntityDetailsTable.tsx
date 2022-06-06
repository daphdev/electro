import React from 'react';
import { Table } from '@mantine/core';

interface EntityDetailsTableProps {
  entityDetailsTableRowsFragment: React.ReactNode;
}

function EntityDetailsTable({
  entityDetailsTableRowsFragment,
}: EntityDetailsTableProps) {

  const entityDetailsTableHeadsFragment = (
    <tr>
      <th>Thuộc tính</th>
      <th>Giá trị</th>
    </tr>
  );

  return (
    <Table striped highlightOnHover>
      <thead>{entityDetailsTableHeadsFragment}</thead>
      <tbody>{entityDetailsTableRowsFragment}</tbody>
    </Table>
  );
}

export default EntityDetailsTable;
