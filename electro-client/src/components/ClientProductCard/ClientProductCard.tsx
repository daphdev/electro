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
  ClientCartRequest,
  ClientListedProductResponse,
  ClientPreorderRequest,
  ClientWishRequest,
  UpdateQuantityType
} from 'types';
import { BellPlus, HeartPlus, ShoppingCartPlus } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';
import NotifyUtils from 'utils/NotifyUtils';
import useAuthStore from 'stores/use-auth-store';
import useCreateWishApi from 'hooks/use-create-wish-api';
import useCreatePreorderApi from 'hooks/use-create-preorder-api';
import useSaveCartApi from 'hooks/use-save-cart-api';

interface ClientProductCardProps {
  product: ClientListedProductResponse;
  search?: string;
}

function ClientProductCard({ product, search }: ClientProductCardProps) {
  const theme = useMantineTheme();

  const [opened, handlers] = useDisclosure(false);

  const createWishApi = useCreateWishApi();
  const createPreorderApi = useCreatePreorderApi();
  const saveCartApi = useSaveCartApi();

  const { user, currentCartId } = useAuthStore();

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

  const handleAddToCartButton = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!user) {
      NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
    } else {
      const cartRequest: ClientCartRequest = {
        cartId: currentCartId,
        userId: user.id,
        cartItems: [
          {
            variantId: product.productVariants[0].variantId,
            quantity: 1,
          },
        ],
        status: 1,
        updateQuantityType: UpdateQuantityType.INCREMENTAL,
      };
      saveCartApi.mutate(cartRequest, {
        onSuccess: () => NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>Đã thêm 1 sản phẩm {product.productName} (phiên bản mặc định) vào </span>
            <Anchor component={Link} to="/cart" inherit>giỏ hàng</Anchor>
          </Text>
        ),
      });
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
            radius="md"
            src={product.productThumbnail || undefined}
            alt={product.productName}
            styles={{ image: { aspectRatio: '1 / 1' } }}
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
                  onClick={handleAddToCartButton}
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
            {product.productPriceRange
              .map(price => product.productPromotion
                ? MiscUtils.calculateDiscountedPrice(price, product.productPromotion.promotionPercent)
                : price)
              .map(MiscUtils.formatPrice).join('–') + '\u00A0₫'}
          </Text>
          {product.productPromotion && (
            <Group spacing="xs">
              <Text size="sm" sx={{ textDecoration: 'line-through' }}>
                {product.productPriceRange.map(MiscUtils.formatPrice).join('–') + '\u00A0₫'}
              </Text>
              <Badge color="pink" variant="filled">
                -{product.productPromotion.promotionPercent}%
              </Badge>
            </Group>
          )}
          <Text size="sm" color="dimmed">
            {product.productVariants.length} phiên bản
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ClientProductCard;
