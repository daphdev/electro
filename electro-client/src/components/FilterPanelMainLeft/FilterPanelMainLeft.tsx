import React from 'react';
import { Box, Button, Grid, Stack } from '@mantine/core';
import { SortCriteriaRow } from 'components';
import useFilterPanelStyles from 'components/FilterPanel/FilterPanel.styles';
import useFilterPanelMainLeftViewModel from 'components/FilterPanelMainLeft/FilterPanelMainLeft.vm';

function FilterPanelMainLeft() {
  const { classes } = useFilterPanelStyles();

  const {
    sortCriteriaList,
    isDisabledCreateSortCriteriaButton,
    handleCreateSortCriteriaButton,
  } = useFilterPanelMainLeftViewModel();

  const sortCriteriaListFragment = sortCriteriaList.map((sortCriteria, index) => (
    <SortCriteriaRow
      key={index}
      sortCriteria={sortCriteria}
      index={index}
    />
  ));

  return (
    <Grid.Col span={1}>
      <Stack spacing="sm">
        <Box className={classes.titleFilterPanel}>
          Sắp xếp
        </Box>
        {sortCriteriaListFragment}
        <Button
          variant="outline"
          onClick={handleCreateSortCriteriaButton}
          disabled={isDisabledCreateSortCriteriaButton}
        >
          Thêm tiêu chí sắp xếp
        </Button>
      </Stack>
    </Grid.Col>
  );
}

export default React.memo(FilterPanelMainLeft);
