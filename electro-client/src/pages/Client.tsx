import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ActionIcon, Affix, Anchor, Button, Card, Group, useMantineColorScheme } from '@mantine/core';
import { ClientFooter, ClientHeader, LoadingMiddleware } from 'components';
import { MoonStars, Sun } from 'tabler-icons-react';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import { useIsFetching } from 'react-query';
import useAuthStore from 'stores/use-auth-store';

function Client() {
  const isLoading = useIsFetching();

  return (
    <>
      <LoadingMiddleware isLoading={!!isLoading}>
        <ClientHeader/>
        <Outlet/>
        <ClientFooter/>
      </LoadingMiddleware>
      <Shortcut/>
    </>
  );
}

function Shortcut() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [opened, handlers] = useDisclosure(true);

  useHotkeys([
    ['alt+Q', () => handlers.toggle()],
  ]);

  const { resetAuthState } = useAuthStore();

  return (
    <Affix position={{ bottom: 20, right: 20 }} sx={{ display: opened ? 'block' : 'none' }}>
      <Card shadow="sm" p="sm">
        <Group>
          <Anchor component={Link} to="/">Client</Anchor>
          <Anchor component={Link} to="/admin">Admin</Anchor>
          <Button color="teal" variant="light" compact onClick={resetAuthState}>
            ResetAuthState
          </Button>
          <ActionIcon
            size="sm"
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Thay đổi chế độ màu"
          >
            {dark ? <Sun size={14}/> : <MoonStars size={14}/>}
          </ActionIcon>
        </Group>
      </Card>
    </Affix>
  );
}

export default Client;
