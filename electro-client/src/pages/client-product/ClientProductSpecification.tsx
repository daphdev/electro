import { Box, Group, Stack, Table, Title, useMantineTheme } from '@mantine/core';
import { Apps } from 'tabler-icons-react';
import React from 'react';
import { ClientProductResponse } from 'types';

interface ClientProductSpecificationProps {
  product: ClientProductResponse;
}

function ClientProductSpecification({ product }: ClientProductSpecificationProps) {
  const theme = useMantineTheme();

  return (
    <Stack>
      <Group spacing="xs">
        <Apps/>
        <Title order={2}>Thông số sản phẩm</Title>
      </Group>
      <Box
        sx={{
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
          borderRadius: theme.radius.md,
          [theme.fn.largerThan('md')]: { width: 500 },
        }}
      >
        <Table>
          <thead>
            <tr>
              <th>Thông số</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            {product.productSpecifications?.content.map(specification => (
              <tr key={specification.id}>
                <td>{specification.name}</td>
                <td>{specification.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Stack>
  );
}

export default ClientProductSpecification;
