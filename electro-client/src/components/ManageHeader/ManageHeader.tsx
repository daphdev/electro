import React from 'react';
import { Group } from '@mantine/core';

interface ManageHeaderProps {
  children: React.ReactNode;
}

function ManageHeader({
  children,
}: ManageHeaderProps) {

  return (
    <Group position="apart">
      {children}
    </Group>
  );
}

export default ManageHeader;
