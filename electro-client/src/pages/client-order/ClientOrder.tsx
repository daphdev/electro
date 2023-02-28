import React, { useState } from 'react';
import {
  Anchor,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Pagination,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { ClientUserNavbar } from 'components';
import ApplicationConstants from 'constants/ApplicationConstants';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import { ClientSimpleOrderResponse } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import useTitle from 'hooks/use-title';
import { AlertTriangle, Marquee } from 'tabler-icons-react';
import DateUtils from 'utils/DateUtils';
import { Link } from 'react-router-dom';
import MiscUtils from 'utils/MiscUtils';

function ClientOrder() {
  useTitle();

  const theme = useMantineTheme();

  const [activePage, setActivePage] = useState(1);

  const {
    orderResponses,
    isLoadingOrderResponses,
    isErrorOrderResponses,
  } = useGetAllOrdersApi(activePage);
  const orders = orderResponses as ListResponse<ClientSimpleOrderResponse>;

  let ordersContentFragment;

  if (isLoadingOrderResponses) {
    ordersContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorOrderResponses) {
    ordersContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (orders && orders.totalElements === 0) {
    ordersContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
        <Marquee size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Chưa có đơn hàng nào</Text>
      </Stack>
    );
  }

  if (orders && orders.totalElements > 0) {
    ordersContentFragment = (
      <>
        <Stack spacing="xs">
          {orders.content.map(order => <ClientOrderCard key={order.orderId} order={order}/>)}
        </Stack>

        <Group position="apart" mt={theme.spacing.lg}>
          <Pagination
            page={activePage}
            total={orders.totalPages}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          />
          <Text>
            <Text component="span" weight={500}>Trang {activePage}</Text>
            <span> / {orders.totalPages}</span>
          </Text>
        </Group>
      </>
    );
  }

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col md={3}>
            <ClientUserNavbar/>
          </Grid.Col>

          <Grid.Col md={9}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>
                  Đơn hàng của tôi
                </Title>

                {ordersContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

function ClientOrderCard({ order }: { order: ClientSimpleOrderResponse }) {
  const theme = useMantineTheme();

  const orderStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="filled" size="sm">Đơn hàng mới</Badge>;
    case 2:
      return <Badge color="blue" variant="filled" size="sm">Đang xử lý</Badge>;
    case 3:
      return <Badge color="violet" variant="filled" size="sm">Đang giao hàng</Badge>;
    case 4:
      return <Badge color="green" variant="filled" size="sm">Đã giao hàng</Badge>;
    case 5:
      return <Badge color="red" variant="filled" size="sm">Hủy bỏ</Badge>;
    }
  };

  const orderPaymentStatusBadgeFragment = (paymentStatus: number) => {
    switch (paymentStatus) {
    case 1:
      return <Badge color="gray" variant="filled" size="sm">Chưa thanh toán</Badge>;
    case 2:
      return <Badge color="green" variant="filled" size="sm">Đã thanh toán</Badge>;
    }
  };

  return (
    <Card
      p="md"
      radius="md"
      sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0] }}
    >
      <Stack>
        <Group position="apart">
          <Group>
            <Text weight={500}>Mã đơn hàng: {order.orderCode}</Text>
            <Text color="dimmed">
              Ngày tạo: {DateUtils.isoDateToString(order.orderCreatedAt, 'DD/MM/YYYY')}
            </Text>
          </Group>
          <Group spacing="xs">
            {orderStatusBadgeFragment(order.orderStatus)}
            {orderPaymentStatusBadgeFragment(order.orderPaymentStatus)}
          </Group>
        </Group>

        <Divider/>

        {order.orderItems.map(orderItem => (
          <Group key={orderItem.orderItemVariant.variantId} position="apart">
            <Group>
              <Image
                radius="md"
                width={55}
                height={55}
                src={orderItem.orderItemVariant.variantProduct.productThumbnail || undefined}
                alt={orderItem.orderItemVariant.variantProduct.productName}
                withPlaceholder
              />
              <Stack spacing={3.5}>
                <Anchor
                  component={Link}
                  to={'/product/' + orderItem.orderItemVariant.variantProduct.productSlug}
                  weight={500}
                  size="sm"
                >
                  {orderItem.orderItemVariant.variantProduct.productName}
                </Anchor>
                {orderItem.orderItemVariant.variantProperties && (
                  <Stack spacing={1.5}>
                    {orderItem.orderItemVariant.variantProperties.content.map(variantProperty => (
                      <Text key={variantProperty.id} size="xs" color="dimmed">
                        {variantProperty.name}: {variantProperty.value}
                      </Text>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Group>

            <Group spacing="xs">
              <Text>{MiscUtils.formatPrice(orderItem.orderItemPrice) + '\u00A0₫'}</Text>
              <Text color="blue" size="lg" sx={{ fontFamily: theme.fontFamilyMonospace }}>
                ×{orderItem.orderItemQuantity}
              </Text>
            </Group>
          </Group>
        ))}

        <Divider/>

        <Group position="apart">
          <Button
            radius="md"
            variant="outline"
            component={Link}
            to={'/order/detail/' + order.orderCode}
          >
            Xem chi tiết
          </Button>
          <Group spacing={5}>
            <Text>Tổng tiền: </Text>
            <Text weight={500} size="lg">{MiscUtils.formatPrice(order.orderTotalPay) + '\u00A0₫'}</Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

function useGetAllOrdersApi(activePage: number) {
  const requestParams = {
    page: activePage,
    size: ApplicationConstants.DEFAULT_CLIENT_ORDER_PAGE_SIZE,
  };

  const {
    data: orderResponses,
    isLoading: isLoadingOrderResponses,
    isError: isErrorOrderResponses,
  } = useQuery<ListResponse<ClientSimpleOrderResponse>, ErrorMessage>(
    ['client-api', 'orders', 'getAllOrders', requestParams],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_ORDER, requestParams),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      keepPreviousData: true,
    }
  );

  return { orderResponses, isLoadingOrderResponses, isErrorOrderResponses };
}

export default ClientOrder;
