import React from 'react';
import { ActionIcon, Group, Input, NumberInput, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { AB, DragDrop, Filter, Keyboard, PlaystationX } from 'tabler-icons-react';
import { EntityPropertyType, SelectOption } from 'types';
import FilterUtils, { FilterCriteria } from 'utils/FilterUtils';
import useFilterCriteriaRowViewModel from 'components/FilterCriteriaRow/FilterCriteriaRow.vm';

interface FilterCriteriaRowProps {
  filterCriteria: FilterCriteria;
  index: number;
}

function FilterCriteriaRow({
  filterCriteria,
  index,
}: FilterCriteriaRowProps) {
  const {
    filterPropertySelectList,
    handleFilterPropertySelect,
    handleFilterOperatorSelect,
    handleFilterValueInput,
    handleDeleteFilterCriteriaButton,
  } = useFilterCriteriaRowViewModel();

  const isSelectedFilterProperty = filterCriteria.property && filterCriteria.type;

  const isDisabledFilterValueInput = !(isSelectedFilterProperty && filterCriteria.operator)
    || FilterUtils.filterOperatorIsNullAndIsNotNullList.includes(filterCriteria.operator);

  let filterOperatorSelectList: SelectOption[];
  let filterValueInputFragment;

  switch (filterCriteria.type) {
  case EntityPropertyType.STRING:
    filterOperatorSelectList = FilterUtils.filterStringOperatorSelectList;
    filterValueInputFragment = (
      <TextInput
        sx={{ width: '100%' }}
        placeholder="Nhập giá trị"
        icon={<Keyboard size={14}/>}
        value={filterCriteria.value || undefined}
        onChange={value => handleFilterValueInput(value, index)}
        disabled={isDisabledFilterValueInput}
      />
    );
    break;
  case EntityPropertyType.NUMBER:
    filterOperatorSelectList = FilterUtils.filterNumberOperatorSelectList;
    filterValueInputFragment = (
      <NumberInput
        sx={{ width: '100%' }}
        placeholder="Nhập giá trị"
        icon={<Keyboard size={14}/>}
        value={filterCriteria.value ? Number(filterCriteria.value) : undefined}
        onChange={value => handleFilterValueInput(value, index)}
        disabled={isDisabledFilterValueInput}
        min={0}
        max={1_000_000_000}
      />
    );
    break;
  case EntityPropertyType.DATE:
    filterOperatorSelectList = FilterUtils.filterDateOperatorSelectList;
    filterValueInputFragment = (
      <DatePicker
        sx={{ width: '100%' }}
        placeholder="Nhập giá trị"
        icon={<Keyboard size={14}/>}
        value={filterCriteria.value ? new Date(filterCriteria.value) : undefined}
        onChange={value => handleFilterValueInput(value, index)}
        disabled={isDisabledFilterValueInput}
        locale="vi"
        inputFormat="DD/MM/YYYY"
      />
    );
    break;
  default:
    filterOperatorSelectList = [];
    filterValueInputFragment = (
      <Input
        sx={{ width: '100%' }}
        placeholder="Nhập giá trị"
        icon={<Keyboard size={14}/>}
        disabled={isDisabledFilterValueInput}
      />
    );
  }

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
        <PlaystationX/>
      </ActionIcon>
    </Group>
  );
}

export default FilterCriteriaRow;
