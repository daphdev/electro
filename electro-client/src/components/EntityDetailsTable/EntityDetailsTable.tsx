import React from 'react';
import { Table } from '@mantine/core';
import { ProvinceResponse } from 'models/Province';
import { EntityPropertyType } from 'models/EntityProperty';
import DateUtils from 'utils/DateUtils';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';

interface EntityDetailsTableProps {
  entityData: ProvinceResponse;
}

function EntityDetailsTable({
  entityData,
}: EntityDetailsTableProps) {

  const entityDetailsTableHeadsFragment = (
    <tr>
      <th>Thuộc tính</th>
      <th>Giá trị</th>
    </tr>
  );

  const entityDetailsTableRowsFragment = entityData &&
    Object.entries(entityData).map(([propertyName, propertyValue]) => (
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

export default EntityDetailsTable;
