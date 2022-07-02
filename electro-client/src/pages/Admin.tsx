import React from 'react';
import { AppShell } from '@mantine/core';
import { DefaultHeader } from 'components/DefaultHeader/DefaultHeader';
import { DefaultNavbar } from 'components/DefaultNavbar/DefaultNavbar';
import { Outlet } from 'react-router-dom';

function Admin() {
  return (
    <AppShell
      fixed
      header={<DefaultHeader/>}
      navbar={<DefaultNavbar/>}
      styles={theme => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          maxWidth: '100%',
        },
      })}
    >
      <Outlet/>
    </AppShell>
  );
}

export default Admin;
