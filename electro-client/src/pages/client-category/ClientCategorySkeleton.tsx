import React from 'react';
import { Container, Skeleton, Stack } from '@mantine/core';

function ClientCategorySkeleton() {
  return (
    <main>
      <Container size="xl">
        <Stack>
          {Array(5).fill(0).map((_, index) => (
            <Skeleton key={index} height={50} radius="md"/>
          ))}
        </Stack>
      </Container>
    </main>
  );
}

export default ClientCategorySkeleton;
