import React from 'react';
import { Box, Button, Grid, Input, NumberInput, Stack, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Keyboard } from 'tabler-icons-react';
import { SelectOption } from 'types';
import FilterUtils, { FilterCriteria, FilterPropertyType } from 'utils/FilterUtils';
import { FilterCriteriaRow } from 'components/index';
import useFilterPanelStyles from 'components/FilterPanel/FilterPanel.styles';
import useFilterPanelMainRightViewModel from 'components/FilterPanelMainRight/FilterPanelMainRight.vm';
import { getUntrackedObject } from 'react-tracked';

interface FilterPanelMainRightProps {
  filterCriteriaValueInputRefs: React.MutableRefObject<WeakMap<FilterCriteria, HTMLInputElement | HTMLButtonElement | null>>;
}

function FilterPanelMainRight({
  filterCriteriaValueInputRefs,
}: FilterPanelMainRightProps) {
  const { classes } = useFilterPanelStyles();

  const {
    filterCriteriaList,
    isDisabledCreateFilterCriteriaButton,
    handleCreateFilterCriteriaButton,
  } = useFilterPanelMainRightViewModel();

  const filterCriteriaListFragment = filterCriteriaList.map((filterCriteria, index) => {
    const isSelectedFilterProperty = Boolean(filterCriteria.property && filterCriteria.type);

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
          ref={inputRef => filterCriteriaValueInputRefs.current.set(getUntrackedObject(filterCriteria) as FilterCriteria, inputRef)}
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
          ref={inputRef => filterCriteriaValueInputRefs.current.set(getUntrackedObject(filterCriteria) as FilterCriteria, inputRef)}
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
          ref={inputRef => filterCriteriaValueInputRefs.current.set(getUntrackedObject(filterCriteria) as FilterCriteria, inputRef)}
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
      <FilterCriteriaRow
        key={index}
        filterCriteria={filterCriteria}
        index={index}
        isSelectedFilterProperty={isSelectedFilterProperty}
        filterOperatorSelectList={filterOperatorSelectList}
        filterValueInputFragment={filterValueInputFragment}
      />
    );
  });

  return (
    <Grid.Col span={3}>
      <Stack spacing="sm">
        <Box className={classes.titleFilterPanel}>
          Lọc
        </Box>
        {filterCriteriaListFragment}
        <Button
          variant="outline"
          onClick={handleCreateFilterCriteriaButton}
          disabled={isDisabledCreateFilterCriteriaButton}
        >
          Thêm tiêu chí lọc
        </Button>
      </Stack>
    </Grid.Col>
  );
}

export default React.memo(FilterPanelMainRight);
