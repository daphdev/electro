import React from 'react';
import { Card, Container, Grid, Stack, Title } from '@mantine/core';
import { ClientUserNavbar } from 'components';
import useTitle from 'hooks/use-title';

function ClientChat() {
  useTitle();

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col md={3}>
            <ClientUserNavbar/>
          </Grid.Col>

          <Grid.Col md={9}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>
                  Yêu cầu tư vấn
                </Title>


              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientChat;
