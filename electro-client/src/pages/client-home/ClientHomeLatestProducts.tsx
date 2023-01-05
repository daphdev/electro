import React from 'react';
import { Button, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { List } from 'tabler-icons-react';
import { ClientProductCard } from 'components';
import MockUtils from 'utils/MockUtils';

function ClientHomeLatestProducts() {
  return (
    <Stack>
      <Group position="apart">
        <Title order={2}>
          <Text
            color="orange"
            inherit
          >
            Sản phẩm mới nhất
          </Text>
        </Title>
        <Button variant="light" leftIcon={<List size={16}/>} radius="md">
          Xem tất cả
        </Button>
      </Group>
      <Grid>
        {Array(8).fill(MockUtils.sampleProduct).map((product, index) => (
          <Grid.Col key={index} span={6} sm={4} md={3}>
            <ClientProductCard product={product}/>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

export default ClientHomeLatestProducts;
