import React from 'react';
import { Link } from 'react-router-dom';
import { ActionIcon, Box, Card, Group, Image, Stack, Text, useMantineTheme } from '@mantine/core';
import MiscUtils from 'utils/MiscUtils';
import { ProductLink } from 'types';
import { HeartPlus, ShoppingCartPlus } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';

interface ClientProductCardProps {
  productLink: ProductLink;
}

function ClientProductCard({ productLink }: ClientProductCardProps) {
  const theme = useMantineTheme();

  const [opened, handlers] = useDisclosure(false);

  return (
    <Card
      radius="md"
      shadow="sm"
      p="lg"
      component={Link}
      to={'/product/' + productLink.productSlug}
      sx={{ '&:hover': { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0] } }}
      onMouseEnter={handlers.open}
      onMouseLeave={handlers.close}
    >
      <Stack spacing="xs">
        <Box sx={{ position: 'relative' }}>
          <Image
            radius="md"
            src={productLink.productThumbnail}
            alt={productLink.productName}
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
          <Text weight={500}>{productLink.productName}</Text>
          <Text weight={500} color="pink">{MiscUtils.formatPrice(productLink.productPrice) + ' ₫'}</Text>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ClientProductCard;
