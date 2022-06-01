import React from 'react';
import { AppShell } from '@mantine/core';
import { DefaultHeader } from '../components/DefaultHeader/DefaultHeader';
import { DefaultNavbar } from '../components/DefaultNavbar/DefaultNavbar';
import { useAdminSiteStore } from 'stores/use-admin-site-store';
import { Outlet } from 'react-router-dom';

export default function Admin() {
  const { opened } = useAdminSiteStore();

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
