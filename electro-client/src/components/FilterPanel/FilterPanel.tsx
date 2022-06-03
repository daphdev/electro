import React, { useRef } from 'react';
import { Divider, Paper, Stack } from '@mantine/core';
import { FilterCriteria } from 'utils/FilterUtils';
import {
  FilterPanelHeader,
  FilterPanelHeaderLeft,
  FilterPanelHeaderRight,
  FilterPanelMain,
  FilterPanelMainLeft,
  FilterPanelMainRight
} from 'components/index';
import useAppStore from 'stores/use-app-store';

function FilterPanel() {
  const { activeFilterPanel } = useAppStore();

  const filterNameInputRef = useRef<HTMLInputElement | null>(null);
  const filterCriteriaValueInputRefs = useRef<WeakMap<FilterCriteria, HTMLInputElement | HTMLButtonElement | null>>(new WeakMap());

  if (!activeFilterPanel) {
    return null;
  }

  return (
    <Paper shadow="xs">
      <Stack spacing={0}>
        <FilterPanelHeader>
          <FilterPanelHeaderLeft
            filterNameInputRef={filterNameInputRef}
          />
          <FilterPanelHeaderRight
            filterNameInputRef={filterNameInputRef}
            filterCriteriaValueInputRefs={filterCriteriaValueInputRefs}
          />
        </FilterPanelHeader>

        <Divider/>

        <FilterPanelMain>
          <FilterPanelMainLeft/>
          <FilterPanelMainRight
            filterCriteriaValueInputRefs={filterCriteriaValueInputRefs}
          />
        </FilterPanelMain>
      </Stack>
    </Paper>
  );
}

export default React.memo(FilterPanel);
