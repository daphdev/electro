import React from 'react';
import { AppShell } from '@mantine/core';
import { DefaultHeader } from 'components/DefaultHeader/DefaultHeader';
import { DefaultNavbar } from 'components/DefaultNavbar/DefaultNavbar';
import { Outlet } from 'react-router-dom';
import useTitle from 'hooks/use-title';
import useAdminAuthStore from 'stores/use-admin-auth-store';
import AdminSignin from 'pages/admin-signin';

function Admin() {
  useTitle();

  const { user } = useAdminAuthStore();

  if (!user) {
    return <AdminSignin/>;
  }

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
