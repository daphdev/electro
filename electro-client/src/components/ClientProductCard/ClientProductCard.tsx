import React from 'react';
import { Link } from 'react-router-dom';
import { ActionIcon, Anchor, Box, Card, Group, Highlight, Image, Stack, Text, useMantineTheme } from '@mantine/core';
import MiscUtils from 'utils/MiscUtils';
import { ClientListedProductResponse, ClientWishRequest, ClientWishResponse } from 'types';
import { HeartPlus, ShoppingCartPlus } from 'tabler-icons-react';
import { useDisclosure, useElementSize } from '@mantine/hooks';
import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import useAuthStore from 'stores/use-auth-store';

interface ClientProductCardProps {
  product: ClientListedProductResponse;
  search?: string;
}

function ClientProductCard({ product, search }: ClientProductCardProps) {
  const theme = useMantineTheme();

  const [opened, handlers] = useDisclosure(false);

  const { ref: refImage, width: widthImage } = useElementSize();

  const createWishApi = useCreateWishApi();

  const { user } = useAuthStore();

  const handleCreateWishButton = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!user) {
      NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
    } else {
      const clientWishRequest: ClientWishRequest = {
        userId: user.id,
        productId: product.productId,
      };
      createWishApi.mutate(clientWishRequest);
    }
  };

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
              onClick={handleCreateWishButton}
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

function useCreateWishApi() {
  return useMutation<ClientWishResponse, ErrorMessage, ClientWishRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_WISH, requestBody),
    {
      onSuccess: (response) =>
        NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>Đã thêm sản phẩm {response.wishProduct.productName} vào </span>
            <Anchor component={Link} to="/user/wishlist" inherit>danh sách yêu thích</Anchor>
          </Text>
        ),
      onError: () => NotifyUtils.simpleFailed('Không thêm được sản phẩm vào danh sách yêu thích'),
    }
  );
}

export default ClientProductCard;
