import {
  ActionIcon,
  Box,
  Button,
  Code,
  Divider,
  Grid,
  Group, Input, NumberInput,
  Paper, Select,
  Stack,
  Text,
  TextInput,
  Tooltip
} from '@mantine/core';
import { AB, ArrowsDownUp, CircleX, DragDrop, Filter, FilterOff, Keyboard } from 'tabler-icons-react';
import React from 'react';
import { useFilterPanelStyles } from 'components/FilterPanel/FilterPanel.styles';
import FilterUtils, { FilterCriteria, FilterPropertyType, SortCriteria } from 'utils/FilterUtils';
import { SelectOption } from 'types';
import { DatePicker } from '@mantine/dates';

interface FilterPanelProps {
  activeFilterPanel: boolean;
  filterNameInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleCancelCreateFilterButton: () => void;
  handleCreateFilterButton: () => void;
  sortCriteriaList: SortCriteria[];
  sortPropertySelectList: SelectOption[];
  handleSortPropertySelect: (propertyValue: string | null, sortCriteriaIndex: number) => void;
  handleSortOrderSelect: (orderValue: string | null, sortCriteriaIndex: number) => void;
  handleDeleteSortCriteriaButton: (sortCriteriaIndex: number) => void;
  handleCreateSortCriteriaButton: () => void;
  filterCriteriaList: FilterCriteria[];
  filterCriteriaValueInputRefs: React.MutableRefObject<WeakMap<FilterCriteria, HTMLInputElement | HTMLButtonElement | null>>;
  filterPropertySelectList: SelectOption[];
  handleFilterPropertySelect: (propertyValue: string | null, filterCriteriaIndex: number) => void;
  handleFilterOperatorSelect: (operatorValue: string | null, filterCriteriaIndex: number) => void;
  handleDeleteFilterCriteriaButton: (filterCriteriaIndex: number) => void;
  handleCreateFilterCriteriaButton: () => void;
}

const MAX_FILTER_CRITERIA_NUMBER = 10;

export default function FilterPanel({
  activeFilterPanel,
  filterNameInputRef,
  handleCancelCreateFilterButton,
  handleCreateFilterButton,
  sortCriteriaList,
  sortPropertySelectList,
  handleSortPropertySelect,
  handleSortOrderSelect,
  handleDeleteSortCriteriaButton,
  handleCreateSortCriteriaButton,
  filterCriteriaList,
  filterCriteriaValueInputRefs,
  filterPropertySelectList,
  handleFilterPropertySelect,
  handleFilterOperatorSelect,
  handleDeleteFilterCriteriaButton,
  handleCreateFilterCriteriaButton,
}: FilterPanelProps) {
  const { classes } = useFilterPanelStyles();

  const sortCriteriaListFragment = sortCriteriaList.map((sortCriteria, index) => (
    <Group key={index} spacing="sm" sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}>
      <ActionIcon color="blue" variant="hover" size={36} title="Di chuyển tiêu chí sắp xếp">
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
        <CircleX/>
      </ActionIcon>
    </Group>
  ));

  const filterCriteriaListFragment = filterCriteriaList.map((filterCriteria, index) => {
    const isSelectedFilterProperty = filterCriteria.property && filterCriteria.type;

    const disabledFilterValueInput = !(isSelectedFilterProperty && filterCriteria.operator)
      || FilterUtils.filterOperatorIsNullAndIsNotNullList.includes(filterCriteria.operator);

    let filterOperatorSelectList: SelectOption[];
    let filterValueInputFragment;

    switch (filterCriteria.type) {
    case FilterPropertyType.STRING:
      filterOperatorSelectList = FilterUtils.filterStringOperatorSelectList;
      filterValueInputFragment = (
        <TextInput
          sx={{ width: '100%' }}
          placeholder="Nhập giá trị"
          icon={<Keyboard size={14}/>}
          ref={inputRef => filterCriteriaValueInputRefs.current.set(filterCriteria, inputRef)}
          disabled={disabledFilterValueInput}
        />
      );
      break;
    case FilterPropertyType.NUMBER:
      filterOperatorSelectList = FilterUtils.filterNumberOperatorSelectList;
      filterValueInputFragment = (
        <NumberInput
          sx={{ width: '100%' }}
          placeholder="Nhập giá trị"
          icon={<Keyboard size={14}/>}
          ref={inputRef => filterCriteriaValueInputRefs.current.set(filterCriteria, inputRef)}
          disabled={disabledFilterValueInput}
        />
      );
      break;
    case FilterPropertyType.DATE:
      filterOperatorSelectList = FilterUtils.filterDateOperatorSelectList;
      filterValueInputFragment = (
        <DatePicker
          sx={{ width: '100%' }}
          placeholder="Nhập giá trị"
          icon={<Keyboard size={14}/>}
          ref={inputRef => filterCriteriaValueInputRefs.current.set(filterCriteria, inputRef)}
          disabled={disabledFilterValueInput}
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
          disabled={disabledFilterValueInput}
        />
      );
    }

    return (
      <Group key={index} spacing="sm" sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}>
        <ActionIcon color="blue" variant="hover" size={36} title="Di chuyển tiêu chí lọc">
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
  });

  if (!activeFilterPanel) {
    return null;
  }

  return (
    <Paper shadow="xs">
      <Stack spacing={0}>
        <Group position="apart" p="sm">
          <Group>
            <TextInput
              placeholder="Bộ lọc 1"
              icon={<Filter size={14}/>}
              styles={{ root: { width: 250 } }}
              ref={filterNameInputRef}
            />
            <Text size="sm">Ngày tạo: <Code color="blue">__/__/____</Code></Text>
            <Text size="sm">Ngày sửa: <Code color="blue">__/__/____</Code></Text>
          </Group>
          <Group spacing="sm">
            <Tooltip label="Hủy tạo bộ lọc" withArrow>
              <ActionIcon color="red" variant="light" size={36} onClick={handleCancelCreateFilterButton}>
                <FilterOff/>
              </ActionIcon>
            </Tooltip>
            <Button variant="light" onClick={handleCreateFilterButton}>
              Tạo bộ lọc
            </Button>
          </Group>
        </Group>

        <Divider/>

        <Grid grow p="sm" gutter="sm">
          <Grid.Col span={1}>
            <Stack spacing="sm">
              <Box className={classes.titleFilterPanel}>
                Sắp xếp
              </Box>
              {sortCriteriaListFragment}
              <Button
                variant="outline"
                onClick={handleCreateSortCriteriaButton}
                disabled={sortCriteriaList.length === sortPropertySelectList.length}
              >
                Thêm tiêu chí sắp xếp
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={3}>
            <Stack spacing="sm">
              <Box className={classes.titleFilterPanel}>
                Lọc
              </Box>
              {filterCriteriaListFragment}
              <Button
                variant="outline"
                onClick={handleCreateFilterCriteriaButton}
                disabled={filterCriteriaList.length === MAX_FILTER_CRITERIA_NUMBER}
              >
                Thêm tiêu chí lọc
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
