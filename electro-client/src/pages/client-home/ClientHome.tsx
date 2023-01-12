import React from 'react';
import { Container, Stack, useMantineTheme } from '@mantine/core';
import ClientHomeBanner from 'pages/client-home/ClientHomeBanner';
import ClientHomeFeaturedCategories from 'pages/client-home/ClientHomeFeaturedCategories';
import ClientHomeLatestProducts from 'pages/client-home/ClientHomeLatestProducts';
import ClientHomeNewsletter from 'pages/client-home/ClientHomeNewsletter';
import useTitle from 'hooks/use-title';

function ClientHome() {
  useTitle();

  const theme = useMantineTheme();

  return (
    <main>
      <Container size="xl">
        <Stack spacing={theme.spacing.xl * 1.5}>
          <ClientHomeBanner/>
          <ClientHomeFeaturedCategories/>
          <ClientHomeLatestProducts/>
          <ClientHomeNewsletter/>
        </Stack>
      </Container>
    </main>
  );
}

export default ClientHome;
