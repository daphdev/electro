import React from 'react';
import { Link } from 'react-router-dom';
import { ActionIcon, Checkbox, Group, Highlight, Table } from '@mantine/core';
import { Edit, Eye, Trash } from 'tabler-icons-react';
import DateUtils from 'utils/DateUtils';
import useManageTableStyles from 'components/ManageTable/ManageTable.styles';
import useManageTableViewModel from 'components/ManageTable/ManageTable.vm';

function ManageTable() {
  const { classes, cx } = useManageTableStyles();

  const {
    selection,
    listResponse,
    searchToken,
    handleToggleAllRowsCheckbox,
    handleToggleRowCheckbox,
    handleViewEntityButton,
    handleDeleteEntityButton,
  } = useManageTableViewModel();

  const entitiesTableHeadsFragment = (
    <tr>
      <th style={{ width: 40 }}>
        <Checkbox
          onChange={handleToggleAllRowsCheckbox}
          checked={selection.length === listResponse.content.length}
          indeterminate={selection.length > 0 && selection.length !== listResponse.content.length}
          transitionDuration={0}
        />
      </th>
      <th>ID</th>
      <th>Ngày tạo</th>
      <th>Ngày cập nhật</th>
      <th>Tên tỉnh thành</th>
      <th>Mã tỉnh thành</th>
      <th style={{ width: 120 }}>Thao tác</th>
    </tr>
  );

  const entitiesTableRowsFragment = listResponse.content.map((entity) => {
    const selected = selection.includes(entity.id);

    return (
      <tr
        key={entity.id}
        className={cx({
          [classes.rowSelected]: selected,
        })}
      >
        <td>
          <Checkbox
            checked={selection.includes(entity.id)}
            onChange={() => handleToggleRowCheckbox(entity.id)}
            transitionDuration={0}
          />
        </td>
        <td>{entity.id}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
        <td>
          <Highlight highlight={searchToken} highlightColor="blue">
            {entity.name}
          </Highlight>
        </td>
        <td>
          <Highlight highlight={searchToken} highlightColor="blue">
            {entity.code}
          </Highlight>
        </td>
        <td>
          <Group spacing="xs">
            <ActionIcon
              color="blue"
              variant="outline"
              size={24}
              title="Xem"
              onClick={() => handleViewEntityButton(entity.id)}
            >
              <Eye size={16}/>
            </ActionIcon>
            <ActionIcon
              component={Link}
              to={'update/' + entity.id}
              color="teal"
              variant="outline"
              size={24}
              title="Cập nhật"
            >
              <Edit size={16}/>
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="outline"
              size={24}
              title="Xóa"
              onClick={() => handleDeleteEntityButton(entity.id)}
            >
              <Trash size={16}/>
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <Table
      horizontalSpacing="sm"
      verticalSpacing="sm"
      highlightOnHover
      striped
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        overflow: 'hidden',
      })}
    >
      <thead>{entitiesTableHeadsFragment}</thead>
      <tbody>{entitiesTableRowsFragment}</tbody>
    </Table>
  );
}

export default ManageTable;
