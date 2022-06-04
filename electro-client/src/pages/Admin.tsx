import React from 'react';
import { AppShell } from '@mantine/core';
import { DefaultHeader } from 'components/DefaultHeader/DefaultHeader';
import { DefaultNavbar } from 'components/DefaultNavbar/DefaultNavbar';
import { Outlet } from 'react-router-dom';
import useAppStore from 'stores/use-app-store';

function Admin() {
  const { opened } = useAppStore();

  return (
    <AppShell
      header={<DefaultHeader/>}
      navbar={!opened ? <DefaultNavbar/> : <div/>}
      styles={theme => ({
        body: {
          flexDirection: 'column',
          [theme.fn.largerThan('sm')]: {
            flexDirection: 'row',
          },
        },
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Outlet/>
    </AppShell>
  );
}

export default Admin;
