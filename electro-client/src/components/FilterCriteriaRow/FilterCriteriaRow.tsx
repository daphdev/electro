import React from 'react';
import { ActionIcon, Group, Select } from '@mantine/core';
import { AB, CircleX, DragDrop, Filter } from 'tabler-icons-react';
import { SelectOption } from 'types';
import { FilterCriteria } from 'utils/FilterUtils';
import useFilterCriteriaRowViewModel from 'components/FilterCriteriaRow/FilterCriteriaRow.vm';

interface FilterCriteriaRowProps {
  filterCriteria: FilterCriteria;
  index: number;
  isSelectedFilterProperty: boolean;
  filterOperatorSelectList: SelectOption[];
  filterValueInputFragment: React.ReactNode;
}

function FilterCriteriaRow({
  filterCriteria,
  index,
  isSelectedFilterProperty,
  filterOperatorSelectList,
  filterValueInputFragment,
}: FilterCriteriaRowProps) {
  const {
    filterPropertySelectList,
    handleFilterPropertySelect,
    handleFilterOperatorSelect,
    handleDeleteFilterCriteriaButton,
  } = useFilterCriteriaRowViewModel();

  return (
    <Group
      spacing="sm"
      sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}
    >
      <ActionIcon
        color="blue"
        variant="hover"
        size={36}
        title="Di chuyển tiêu chí lọc"
      >
        <DragDrop/>
      </ActionIcon>
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thuộc tính"
        icon={<AB size={14}/>}
        clearable
        value={filterCriteria.property}
        data={filterPropertySelectList}
        onChange={propertyValue => handleFilterPropertySelect(propertyValue, index)}
      />
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn cách lọc"
        icon={<Filter size={14}/>}
        clearable
        value={filterCriteria.operator}
        data={filterOperatorSelectList}
        onChange={operatorValue => handleFilterOperatorSelect(operatorValue, index)}
        disabled={!isSelectedFilterProperty}
      />
      {filterValueInputFragment}
      <ActionIcon
        color="red"
        variant="hover"
        size={36}
        title="Xóa tiêu chí lọc"
        onClick={() => handleDeleteFilterCriteriaButton(index)}
      >
        <CircleX/>
      </ActionIcon>
    </Group>
  );
}

export default FilterCriteriaRow;
