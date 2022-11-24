import React from 'react';
import { Box, Button, Grid, Stack } from '@mantine/core';
import { FilterCriteriaRow } from 'components';
import useFilterPanelStyles from 'components/FilterPanel/FilterPanel.styles';
import useFilterPanelMainRightViewModel from 'components/FilterPanelMainRight/FilterPanelMainRight.vm';

function FilterPanelMainRight() {
  const { classes } = useFilterPanelStyles();

  const {
    filterCriteriaList,
    isDisabledCreateFilterCriteriaButton,
    handleCreateFilterCriteriaButton,
  } = useFilterPanelMainRightViewModel();

  const filterCriteriaListFragment = filterCriteriaList.map((filterCriteria, index) => (
    <FilterCriteriaRow
      key={index}
      filterCriteria={filterCriteria}
      index={index}
    />
  ));

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
