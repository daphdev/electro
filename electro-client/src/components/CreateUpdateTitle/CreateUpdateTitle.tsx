import React from 'react';
import { ActionIcon, Group, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'tabler-icons-react';

interface CreateUpdateTitleProps {
  managerPath: string;
  title: string;
}

export default function CreateUpdateTitle({ managerPath, title }: CreateUpdateTitleProps) {
  return (
    <Group spacing="xs">
      <ActionIcon
        component={Link}
        to={'../' + managerPath}
        color="blue"
        variant="filled"
      >
        <ChevronLeft/>
      </ActionIcon>
      <Title order={3}>{title}</Title>
    </Group>
  );
}
