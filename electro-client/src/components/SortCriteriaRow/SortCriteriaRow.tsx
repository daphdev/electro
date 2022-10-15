import React from 'react';
import { ActionIcon, Group, Select } from '@mantine/core';
import { AB, ArrowsDownUp, DragDrop, PlaystationX } from 'tabler-icons-react';
import FilterUtils, { SortCriteria } from 'utils/FilterUtils';
import useSortCriteriaRowViewModel from 'components/SortCriteriaRow/SortCriteriaRow.vm';

interface SortCriteriaRowProps {
  sortCriteria: SortCriteria;
  index: number;
}

function SortCriteriaRow({
  sortCriteria,
  index,
}: SortCriteriaRowProps) {
  const {
    sortPropertySelectList,
    handleSortPropertySelect,
    handleSortOrderSelect,
    handleDeleteSortCriteriaButton,
  } = useSortCriteriaRowViewModel();

  return (
    <Group
      spacing="sm"
      sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}
    >
      <ActionIcon
        color="blue"
        variant="hover"
        size={36}
        title="Di chuyển tiêu chí sắp xếp"
      >
        <DragDrop/>
      </ActionIcon>
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thuộc tính"
        icon={<AB size={14}/>}
        clearable
        value={sortCriteria.property}
        data={sortPropertySelectList}
        onChange={propertyValue => handleSortPropertySelect(propertyValue, index)}
      />
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thứ tự sắp xếp"
        icon={<ArrowsDownUp size={14}/>}
        clearable
        value={sortCriteria.order}
        data={FilterUtils.sortOrderSelectList}
        onChange={orderValue => handleSortOrderSelect(orderValue, index)}
      />
      <ActionIcon
        color="red"
        variant="hover"
        size={36}
        title="Xóa tiêu chí sắp xếp"
        onClick={() => handleDeleteSortCriteriaButton(index)}
      >
        <PlaystationX/>
      </ActionIcon>
    </Group>
  );
}

export default SortCriteriaRow;
