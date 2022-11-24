import React, { useRef } from 'react';
import { Divider, Paper, Stack } from '@mantine/core';
import {
  FilterPanelHeader,
  FilterPanelHeaderLeft,
  FilterPanelHeaderRight,
  FilterPanelMain,
  FilterPanelMainLeft,
  FilterPanelMainRight
} from 'components';
import useAppStore from 'stores/use-app-store';

function FilterPanel() {
  const { activeFilterPanel } = useAppStore();

  const filterNameInputRef = useRef<HTMLInputElement | null>(null);

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
          />
        </FilterPanelHeader>

        <Divider/>

        <FilterPanelMain>
          <FilterPanelMainLeft/>
          <FilterPanelMainRight/>
        </FilterPanelMain>
      </Stack>
    </Paper>
  );
}

export default React.memo(FilterPanel);
