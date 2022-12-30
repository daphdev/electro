import React from 'react';
import { Button, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { List } from 'tabler-icons-react';
import { ClientProductCard } from 'components';
import { ProductLink } from 'types';

const productLinks: ProductLink[] = [
  {
    productName: 'Lenovo Legion 5 Pro 2022',
    productSlug: 'lenovo-legion-5-pro-2022',
    productThumbnail: 'https://dummyimage.com/400x400/e8e8e8/6e6e6e.png',
    productPrice: 12_000_000,
  },
];

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
        {Array(8).fill(productLinks[0]).map((productLink, index) => (
          <Grid.Col key={index} span={6} sm={4} md={3}>
            <ClientProductCard productLink={productLink}/>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

export default ClientHomeLatestProducts;
