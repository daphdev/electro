import React from 'react';
import { Group } from '@mantine/core';

interface FilterPanelHeaderProps {
  children: React.ReactNode;
}

function FilterPanelHeader({
  children,
}: FilterPanelHeaderProps) {

  return (
    <Group position="apart" p="sm">
      {children}
    </Group>
  );
}

export default FilterPanelHeader;
