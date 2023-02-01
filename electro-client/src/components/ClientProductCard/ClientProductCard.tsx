import React from 'react';
import { Link } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Card,
  Group,
  Highlight,
  Image,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import MiscUtils from 'utils/MiscUtils';
import {
  ClientListedProductResponse,
  ClientPreorderRequest,
  ClientPreorderResponse,
  ClientWishRequest,
  ClientWishResponse
} from 'types';
import { BellPlus, HeartPlus, ShoppingCartPlus } from 'tabler-icons-react';
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
  const createPreorderApi = useCreatePreorderApi();

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

  const handleCreatePreorderButton = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!user) {
      NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
    } else {
      const clientPreorderRequest: ClientPreorderRequest = {
        userId: user.id,
        productId: product.productId,
        status: 1,
      };
      createPreorderApi.mutate(clientPreorderRequest);
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
              title="Thêm vào danh sách yêu thích"
              onClick={handleCreateWishButton}
            >
              <HeartPlus size={18}/>
            </ActionIcon>
            {product.productSaleable
              ? (
                <ActionIcon
                  color="blue"
                  size="lg"
                  radius="xl"
                  variant="filled"
                  title="Thêm vào giỏ hàng"
                  onClick={(event: React.MouseEvent<HTMLElement>) => event.preventDefault()}
                >
                  <ShoppingCartPlus size={18}/>
                </ActionIcon>
              )
              : (
                <ActionIcon
                  color="teal"
                  size="lg"
                  radius="xl"
                  variant="filled"
                  title="Thông báo khi có hàng"
                  onClick={handleCreatePreorderButton}
                >
                  <BellPlus size={18}/>
                </ActionIcon>
              )}
          </Group>
        </Box>
        <Stack spacing={theme.spacing.xs / 2}>
          <Group spacing="xs">
            <Text weight={500}>
              <Highlight highlight={search || ''}>
                {product.productName}
              </Highlight>
            </Text>
            {!product.productSaleable && <Badge size="xs" color="red" variant="filled">Hết hàng</Badge>}
          </Group>
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

function useCreatePreorderApi() {
  return useMutation<ClientPreorderResponse, ErrorMessage, ClientPreorderRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_PREORDER, requestBody),
    {
      onSuccess: (response) =>
        NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>Đã thêm sản phẩm {response.preorderProduct.productName} vào </span>
            <Anchor component={Link} to="/user/preorder" inherit>danh sách đặt trước</Anchor>
          </Text>
        ),
      onError: () => NotifyUtils.simpleFailed('Không thêm được sản phẩm vào danh sách đặt trước'),
    }
  );
}

export default ClientProductCard;
