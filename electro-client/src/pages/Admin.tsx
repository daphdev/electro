import React from 'react';
import { AppShell } from '@mantine/core';
import { DefaultHeader } from 'components/DefaultHeader/DefaultHeader';
import { DefaultNavbar } from 'components/DefaultNavbar/DefaultNavbar';
import { Outlet } from 'react-router-dom';
import useStore from 'stores/use-store';

function Admin() {
  const { opened } = useStore();

  return (
    <AppShell
      header={<DefaultHeader/>}
      navbar={!opened ? <DefaultNavbar/> : <div/>}
      styles={theme => ({
        body: {
          flexDirection: 'column',
          [theme.fn.largerThan('sm')]: {
            flexDirection: 'row',
          }
        },
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Outlet/>
    </AppShell>
  );
}

export default Admin;
