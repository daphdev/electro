import React from 'react';
import { Grid } from '@mantine/core';

interface FilterPanelMainProps {
  children: React.ReactNode;
}

function FilterPanelMain({
  children,
}: FilterPanelMainProps) {
  return (
    <Grid grow p="sm" gutter="sm">
      {children}
    </Grid>
  );
}

export default FilterPanelMain;
