import { Group, Stack, Text, Title } from '@mantine/core';
import { Receipt } from 'tabler-icons-react';
import React from 'react';
import { ClientProductResponse } from 'types';

interface ClientProductDescriptionProps {
  product: ClientProductResponse;
}

function ClientProductDescription({ product }: ClientProductDescriptionProps) {
  return (
    <Stack>
      <Group spacing="xs">
        <Receipt/>
        <Title order={2}>Mô tả sản phẩm</Title>
      </Group>
      <Text>{product.productDescription}</Text>
    </Stack>
  );
}

export default ClientProductDescription;
