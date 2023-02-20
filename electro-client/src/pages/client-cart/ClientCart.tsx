import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  NumberInput,
  NumberInputHandlers,
  Radio,
  RadioGroup,
  ScrollArea,
  Skeleton,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import React, { useRef } from 'react';
import { AlertTriangle, Home, InfoCircle, Marquee, ShoppingCart, Trash } from 'tabler-icons-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ClientCartRequest,
  ClientCartResponse,
  ClientCartVariantKeyRequest,
  ClientCartVariantResponse,
  ClientPaymentMethodResponse,
  CollectionWrapper,
  Empty,
  UpdateQuantityType
} from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import useTitle from 'hooks/use-title';
import { Link } from 'react-router-dom';
import MiscUtils from 'utils/MiscUtils';
import useAuthStore from 'stores/use-auth-store';
import { useModals } from '@mantine/modals';
import ApplicationConstants from 'constants/ApplicationConstants';
import useSaveCartApi from 'hooks/use-save-cart-api';
import PageConfigs from 'pages/PageConfigs';

const ghnLogoPath = 'https://file.hstatic.net/200000472237/file/logo_b8515d08a6d14b09bce4e39221712e15.png';

function ClientCart() {
  useTitle();

  const theme = useMantineTheme();

  const { user, currentPaymentMethod, updateCurrentPaymentMethod } = useAuthStore();

  const { cartResponse, isLoadingCartResponse, isErrorCartResponse } = useGetCartApi();
  const {
    paymentMethodResponses,
    isLoadingPaymentMethodResponses,
    isErrorPaymentMethodResponses,
  } = useGetAllPaymentMethodsApi();

  const isLoading = isLoadingCartResponse || isLoadingPaymentMethodResponses;
  const isError = isErrorCartResponse || isErrorPaymentMethodResponses;

  let cartContentFragment;

  if (isLoading) {
    cartContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isError) {
    cartContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (cartResponse && paymentMethodResponses) {
    let cart: ClientCartResponse;

    if (Object.hasOwn(cartResponse, 'cartId')) {
      cart = cartResponse as ClientCartResponse;
    } else {
      cart = { cartId: 0, cartItems: [] };
    }

    const totalAmount = cart.cartItems
      .map(cartItem => cartItem.cartItemQuantity * cartItem.cartItemVariant.variantPrice)
      .reduce((partialSum, a) => partialSum + a, 0);

    const taxCost = Number((totalAmount * ApplicationConstants.DEFAULT_TAX).toFixed(0));

    const shippingCost = ApplicationConstants.DEFAULT_SHIPPING_COST;

    const totalPay = totalAmount + taxCost + shippingCost;

    cartContentFragment = (
      <Grid>
        <Grid.Col md={9}>
          <Card radius="md" shadow="sm" p={0}>
            <ScrollArea>
              <Table verticalSpacing="md" horizontalSpacing="lg">
                <thead>
                  <tr>
                    <th style={{ minWidth: 325 }}><Text weight="initial" size="sm" color="dimmed">Mặt hàng</Text></th>
                    <th style={{ minWidth: 125 }}><Text weight="initial" size="sm" color="dimmed">Đơn giá</Text></th>
                    <th style={{ minWidth: 150 }}><Text weight="initial" size="sm" color="dimmed">Số lượng</Text></th>
                    <th style={{ minWidth: 125 }}><Text weight="initial" size="sm" color="dimmed">Thành tiền</Text></th>
                    <th style={{ textAlign: 'center', minWidth: 80 }}>
                      <Text weight="initial" size="sm" color="dimmed">Thao tác</Text>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems
                    .map(cartItem => <CartItemTableRow key={cartItem.cartItemVariant.variantId} cartItem={cartItem}/>)}
                  {cart.cartItems.length === 0 && (
                    <tr>
                      <td colSpan={5}>
                        <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
                          <Marquee size={125} strokeWidth={1}/>
                          <Text size="xl" weight={500}>Chưa thêm mặt hàng nào</Text>
                        </Stack>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>
        </Grid.Col>

        <Grid.Col md={3}>
          <Stack>
            <Card radius="md" shadow="sm" px="lg" pt="md" pb="lg">
              <Stack spacing="xs">
                <Group position="apart">
                  <Text weight={500} color="dimmed">Giao tới</Text>
                  <Button size="xs" variant="light" compact component={Link} to="/user/setting/personal">
                    Thay đổi
                  </Button>
                </Group>
                <Stack spacing={3.5}>
                  <Text weight={500} size="sm">
                    {user?.fullname}
                    <ThemeIcon size="xs" ml="xs" color="teal" title="Địa chỉ của người dùng đặt mua">
                      <Home size={12}/>
                    </ThemeIcon>
                  </Text>
                  <Text weight={500} size="sm">{user?.phone}</Text>
                  <Text size="sm" color="dimmed">
                    {[user?.address.line, user?.address.ward?.name, user?.address.district?.name, user?.address.province?.name]
                      .filter(Boolean)
                      .join(', ')}
                  </Text>
                </Stack>
              </Stack>
            </Card>

            <Card radius="md" shadow="sm" px="lg" pt="md" pb="lg">
              <Stack spacing="xs">
                <Text weight={500} color="dimmed">Hình thức giao hàng</Text>
                <RadioGroup value="ghn" orientation="vertical" size="sm">
                  <Radio
                    value="ghn"
                    label={<Image src={ghnLogoPath} styles={{ image: { maxWidth: 170 } }}/>}
                  />
                </RadioGroup>
              </Stack>
            </Card>

            <Card radius="md" shadow="sm" px="lg" pt="md" pb="lg">
              <Stack spacing="xs">
                <Text weight={500} color="dimmed">Hình thức thanh toán</Text>
                <RadioGroup
                  value={currentPaymentMethod}
                  onChange={updateCurrentPaymentMethod}
                  orientation="vertical"
                  size="sm"
                >
                  {paymentMethodResponses.content.map(paymentMethod => {
                    const PaymentMethodIcon = PageConfigs.paymentMethodIconMap[paymentMethod.paymentMethodCode];

                    return (
                      <Radio
                        key={paymentMethod.paymentMethodId}
                        value={paymentMethod.paymentMethodCode}
                        label={(
                          <Group spacing="xs">
                            <PaymentMethodIcon size={24}/>
                            <Text size="sm">{paymentMethod.paymentMethodName}</Text>
                          </Group>
                        )}
                      />
                    );
                  })}
                </RadioGroup>
              </Stack>
            </Card>

            <Card radius="md" shadow="sm" p="lg">
              <Stack spacing="xs">
                <Stack spacing="sm">
                  <Group position="apart">
                    <Text size="sm" color="dimmed">Tạm tính</Text>
                    <Text size="sm" sx={{ textAlign: 'right' }}>{MiscUtils.formatPrice(totalAmount) + '\u00A0₫'}</Text>
                  </Group>
                  <Group position="apart">
                    <Text size="sm" color="dimmed">Thuế (10%)</Text>
                    <Text size="sm" sx={{ textAlign: 'right' }}>{MiscUtils.formatPrice(taxCost) + '\u00A0₫'}</Text>
                  </Group>
                  <Group position="apart">
                    <Group spacing="xs">
                      <Text size="sm" weight={500}>Tổng tiền</Text>
                      <Tooltip label="Chưa tính phí vận chuyển" withArrow sx={{ height: 20 }}>
                        <ThemeIcon variant="light" color="blue" size="sm">
                          <InfoCircle size={14}/>
                        </ThemeIcon>
                      </Tooltip>
                    </Group>
                    <Text size="lg" weight={700} color="blue" sx={{ textAlign: 'right' }}>
                      {MiscUtils.formatPrice(totalPay) + '\u00A0₫'}
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>

            <Button
              size="lg"
              leftIcon={<ShoppingCart/>}
              disabled={cart.cartItems.length === 0}
            >
              Đặt mua
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <main>
      <Container size="xl">
        <Stack spacing="lg">
          <Group spacing="xs">
            <ShoppingCart/>
            <Title order={2}>Giỏ hàng</Title>
          </Group>

          {cartContentFragment}
        </Stack>
      </Container>
    </main>
  );
}

function CartItemTableRow({ cartItem }: { cartItem: ClientCartVariantResponse }) {
  const theme = useMantineTheme();
  const modals = useModals();

  const cartItemQuantityInputHandlers = useRef<NumberInputHandlers>();

  const { currentCartId, user } = useAuthStore();

  const saveCartApi = useSaveCartApi();
  const deleteCartItemsApi = useDeleteCartItemsApi();

  const handleCartItemQuantityInput = (cartItemQuantity: number) => {
    if (user
      && cartItemQuantity !== cartItem.cartItemQuantity
      && cartItemQuantity <= cartItem.cartItemVariant.variantInventory) {
      const cartRequest: ClientCartRequest = {
        cartId: currentCartId,
        userId: user.id,
        cartItems: [
          {
            variantId: cartItem.cartItemVariant.variantId,
            quantity: cartItemQuantity,
          },
        ],
        status: 1,
        updateQuantityType: UpdateQuantityType.OVERRIDE,
      };
      saveCartApi.mutate(cartRequest);
    }
  };

  const handleDeleteCartItemButton = () => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Xóa mặt hàng</strong>,
      children: (
        <Text size="sm">
          Bạn có muốn xóa mặt hàng này?
        </Text>
      ),
      labels: {
        cancel: 'Không xóa',
        confirm: 'Xóa',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteCartItemsApi
        .mutate([{ cartId: currentCartId as number, variantId: cartItem.cartItemVariant.variantId }]),
    });
  };

  return (
    <tr key={cartItem.cartItemVariant.variantId}>
      <td>
        <Group spacing="xs">
          <Image
            radius="md"
            width={65}
            height={65}
            src={cartItem.cartItemVariant.variantProduct.productThumbnail || undefined}
            alt={cartItem.cartItemVariant.variantProduct.productName}
          />
          <Stack spacing={3.5}>
            <Anchor
              component={Link}
              to={'/product/' + cartItem.cartItemVariant.variantProduct.productSlug}
              size="sm"
            >
              {cartItem.cartItemVariant.variantProduct.productName}
            </Anchor>
            {cartItem.cartItemVariant.variantProperties && (
              <Stack spacing={1.5}>
                {cartItem.cartItemVariant.variantProperties.content.map(variantProperty => (
                  <Text key={variantProperty.id} size="xs" color="dimmed">
                    {variantProperty.name}: {variantProperty.value}
                  </Text>
                ))}
              </Stack>
            )}
          </Stack>
        </Group>
      </td>
      <td>
        <Text weight={500} size="sm">
          {MiscUtils.formatPrice(cartItem.cartItemVariant.variantPrice) + ' ₫'}
        </Text>
      </td>
      <td>
        <Stack spacing={3.5}>
          <Group spacing={5}>
            <ActionIcon size={30} variant="default" onClick={() => cartItemQuantityInputHandlers.current?.decrement()}>
              –
            </ActionIcon>

            <NumberInput
              hideControls
              value={cartItem.cartItemQuantity}
              onChange={(value) => handleCartItemQuantityInput(value || 1)}
              handlersRef={cartItemQuantityInputHandlers}
              max={cartItem.cartItemVariant.variantInventory}
              min={1}
              size="xs"
              styles={{ input: { width: 45, textAlign: 'center' } }}
            />

            <ActionIcon size={30} variant="default" onClick={() => cartItemQuantityInputHandlers.current?.increment()}>
              +
            </ActionIcon>
          </Group>
          <Text size="xs" color="dimmed">Tồn kho: {cartItem.cartItemVariant.variantInventory}</Text>
        </Stack>
      </td>
      <td>
        <Text weight={500} size="sm" color="blue">
          {MiscUtils.formatPrice(cartItem.cartItemQuantity * cartItem.cartItemVariant.variantPrice) + ' ₫'}
        </Text>
      </td>
      <td>
        <ActionIcon
          color="red"
          variant="outline"
          size={24}
          title="Xóa"
          onClick={handleDeleteCartItemButton}
          sx={{ margin: 'auto' }}
        >
          <Trash size={16}/>
        </ActionIcon>
      </td>
    </tr>
  );
}

function useGetCartApi() {
  const {
    data: cartResponse,
    isLoading: isLoadingCartResponse,
    isError: isErrorCartResponse,
  } = useQuery<ClientCartResponse | Empty, ErrorMessage>(
    ['client-api', 'carts', 'getCart'],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_CART),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      keepPreviousData: true,
    }
  );

  return { cartResponse, isLoadingCartResponse, isErrorCartResponse };
}

function useGetAllPaymentMethodsApi() {
  const {
    data: paymentMethodResponses,
    isLoading: isLoadingPaymentMethodResponses,
    isError: isErrorPaymentMethodResponses,
  } = useQuery<CollectionWrapper<ClientPaymentMethodResponse>, ErrorMessage>(
    ['client-api', 'payment-methods', 'getAllPaymentMethods'],
    () => FetchUtils.get(ResourceURL.CLIENT_PAYMENT_METHOD),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return { paymentMethodResponses, isLoadingPaymentMethodResponses, isErrorPaymentMethodResponses };
}

function useDeleteCartItemsApi() {
  const queryClient = useQueryClient();

  const { currentTotalCartItems, updateCurrentTotalCartItems } = useAuthStore();

  return useMutation<void, ErrorMessage, ClientCartVariantKeyRequest[]>(
    (requestBody) => FetchUtils.deleteWithToken(ResourceURL.CLIENT_CART, requestBody),
    {
      onSuccess: (_, requestBody) => {
        void queryClient.invalidateQueries(['client-api', 'carts', 'getCart']);
        updateCurrentTotalCartItems(currentTotalCartItems - requestBody.length);
      },
      onError: () => NotifyUtils.simpleFailed('Không xóa được mặt hàng khỏi giỏ hàng'),
    }
  );
}

export default ClientCart;
