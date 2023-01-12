import React from 'react';
import { Link } from 'react-router-dom';
import { ActionIcon, Box, Card, Group, Highlight, Image, Stack, Text, useMantineTheme } from '@mantine/core';
import MiscUtils from 'utils/MiscUtils';
import { ClientListedProductResponse } from 'types';
import { HeartPlus, ShoppingCartPlus } from 'tabler-icons-react';
import { useDisclosure, useElementSize } from '@mantine/hooks';

interface ClientProductCardProps {
  product: ClientListedProductResponse;
  search?: string;
}

function ClientProductCard({ product, search }: ClientProductCardProps) {
  const theme = useMantineTheme();

  const [opened, handlers] = useDisclosure(false);

  const { ref: refImage, width: widthImage } = useElementSize();

  return (
    <Card
      radius="md"
      shadow="sm"
      p="lg"
      component={Link}
      to={'/product/' + product.productSlug}
      sx={{
        height: '100%',
        transition: 'box-shadow .2s ease-in',
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'unset',
          boxShadow: theme.shadows.lg,
        },
      }}
      onMouseEnter={handlers.open}
      onMouseLeave={handlers.close}
    >
      <Stack spacing="xs">
        <Box sx={{ position: 'relative' }}>
          <Image
            ref={refImage}
            radius="md"
            width={widthImage}
            height={widthImage}
            src={product.productThumbnail || undefined}
            alt={product.productName}
            withPlaceholder
          />
          <Group
            spacing="xs"
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              marginBottom: theme.spacing.sm,
              opacity: opened ? 1 : 0,
              transition: 'opacity .2s ease-in',
            }}
          >
            <ActionIcon
              color="pink"
              size="lg"
              radius="xl"
              variant="filled"
              onClick={(event: React.MouseEvent<HTMLElement>) => event.preventDefault()}
            >
              <HeartPlus size={18}/>
            </ActionIcon>
            <ActionIcon
              color="blue"
              size="lg"
              radius="xl"
              variant="filled"
              onClick={(event: React.MouseEvent<HTMLElement>) => event.preventDefault()}
            >
              <ShoppingCartPlus size={18}/>
            </ActionIcon>
          </Group>
        </Box>
        <Stack spacing={theme.spacing.xs / 2}>
          <Text weight={500}>
            <Highlight highlight={search || ''}>
              {product.productName}
            </Highlight>
          </Text>
          <Text weight={500} color="pink">
            {product.productPriceRange.map(MiscUtils.formatPrice).join('–') + '\u00A0₫'}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ClientProductCard;
