import React from 'react';
import { ActionIcon, Button, Group, Menu, Title } from '@mantine/core';
import { Hash, Plus, Trash } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { TitleLink } from 'types';

interface ManageHeaderProps {
  titleLinks: TitleLink[];
  title: string;
  handleDeleteBatchEntitiesButton: () => void;
}

function ManageHeader({
  titleLinks,
  title,
  handleDeleteBatchEntitiesButton
}: ManageHeaderProps) {

  const titleLinksFragment = titleLinks.map(titleLink => (
    <Menu.Item key={titleLink.label} component={Link} to={titleLink.link}>
      {titleLink.label}
    </Menu.Item>
  ));

  return (
    <Group position="apart">
      <Group spacing="xs">
        <Menu
          control={(
            <ActionIcon color="blue" variant="filled">
              <Hash/>
            </ActionIcon>
          )}
        >
          {titleLinksFragment}
        </Menu>
        <Title order={3}>{title}</Title>
      </Group>

      <Group spacing="xs">
        <Button
          component={Link}
          to="create"
          variant="outline"
          leftIcon={<Plus/>}
        >
          Thêm mới
        </Button>
        <Button
          variant="outline"
          color="red"
          leftIcon={<Trash/>}
          onClick={handleDeleteBatchEntitiesButton}
        >
          Xóa hàng loạt
        </Button>
      </Group>
    </Group>
  );
}

export default React.memo(ManageHeader);
