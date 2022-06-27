import React from 'react';
import { Link } from 'react-router-dom';
import { ActionIcon, Group, Menu, Title } from '@mantine/core';
import { Hash } from 'tabler-icons-react';
import { TitleLink } from 'types';

interface ManageHeaderTitleProps {
  titleLinks: TitleLink[];
  title: string;
}

function ManageHeaderTitle({
  titleLinks,
  title,
}: ManageHeaderTitleProps) {

  const titleLinksFragment = titleLinks.map(titleLink => (
    <Menu.Item key={titleLink.label} component={Link} to={titleLink.link}>
      {titleLink.label}
    </Menu.Item>
  ));

  return (
    <Group spacing="xs">
      <Menu
        size={225}
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
  );
}

export default React.memo(ManageHeaderTitle);
