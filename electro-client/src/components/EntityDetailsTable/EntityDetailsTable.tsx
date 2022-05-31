import { Table } from '@mantine/core';
import React from 'react';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { EntityPropertyType } from 'models/EntityProperty';
import DateUtils from 'utils/DateUtils';
import { ProvinceResponse } from 'models/Province';

interface EntityDetailsTableProps {
  activeEntityToView: ProvinceResponse | null;
}

export default function EntityDetailsTable({
  activeEntityToView,
}: EntityDetailsTableProps) {

  const entityDetailsTableHeadsFragment = (
    <tr>
      <th>Thuộc tính</th>
      <th>Giá trị</th>
    </tr>
  );

  const entityDetailsTableRowsFragment = activeEntityToView &&
    Object.entries(activeEntityToView).map(([propertyName, propertyValue]) => (
      <tr key={propertyName}>
        <td>{ProvinceConfigs.properties[propertyName].label}</td>
        <td>
          {ProvinceConfigs.properties[propertyName].type === EntityPropertyType.DATE
            ? DateUtils.isoDateToString(propertyValue)
            : propertyValue}
        </td>
      </tr>
    ));

  return (
    <Table striped highlightOnHover>
      <thead>{entityDetailsTableHeadsFragment}</thead>
      <tbody>{entityDetailsTableRowsFragment}</tbody>
    </Table>
  );
}
