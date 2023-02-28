import React from 'react';
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
  MantineColor,
  ScrollArea,
  Skeleton,
  Stack,
  Table,
  Text,
  Textarea,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import { ClientUserNavbar } from 'components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ClientOrderDetailResponse,
  ClientOrderVariantResponse,
  ClientReviewRequest,
  ClientReviewResponse,
  ClientWaybillLogResponse,
  Empty
} from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Link, useParams } from 'react-router-dom';
import useTitle from 'hooks/use-title';
import { AlertTriangle, ArrowRight, Check, Circle, Icon, InfoCircle, Plus, X } from 'tabler-icons-react';
import DateUtils from 'utils/DateUtils';
import MiscUtils from 'utils/MiscUtils';
import PageConfigs from 'pages/PageConfigs';
import { useModals } from '@mantine/modals';
import ApplicationConstants from 'constants/ApplicationConstants';
import { Rating } from '@smastrom/react-rating';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import useAuthStore from 'stores/use-auth-store';

function ClientOrderDetail() {
  useTitle();

  const theme = useMantineTheme();
  const modals = useModals();

  const { code } = useParams();

  const { orderResponse, isLoadingOrderResponse, isErrorOrderResponse } = useGetOrderApi(code as string);
  const order = orderResponse as ClientOrderDetailResponse;

  const cancelOrderApi = useCancelOrderApi(code as string);

  const handleCancelOrderButton = () => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Xác nhận hủy</strong>,
      children: <Text size="sm">Bạn có muốn hủy đơn hàng này, không thể hoàn tác?</Text>,
      labels: {
        cancel: 'Không hủy',
        confirm: 'Hủy',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => cancelOrderApi.mutate(),
    });
  };

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

  const getWaybillLogInfo = (waybillLog: ClientWaybillLogResponse) => {
    type WaybillLogInfo = {
      icon: Icon,
      color: MantineColor,
      text: string,
    };

    const waybillLogMap: Record<number, WaybillLogInfo> = {
      0: {
        icon: Circle,
        color: 'gray',
        text: 'Trạng thái vận đơn không rõ',
      },
      1: {
        icon: Plus,
        color: 'blue',
        text: 'Đơn hàng được duyệt và vận đơn được tạo',
      },
      2: {
        icon: ArrowRight,
        color: 'orange',
        text: 'Đang giao hàng',
      },
      3: {
        icon: Check,
        color: 'teal',
        text: 'Giao hàng thành công',
      },
      4: {
        icon: X,
        color: 'pink',
        text: 'Vận đơn bị hủy',
      },
    };

    return waybillLogMap[waybillLog.waybillLogCurrentStatus || 0];
  };

  let orderContentFragment;

  if (isLoadingOrderResponse) {
    orderContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorOrderResponse) {
    orderContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  const cardStyles = {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    height: '100%',
  };

  if (order) {
    const PaymentMethodIcon = PageConfigs.paymentMethodIconMap[order.orderPaymentMethodType];

    orderContentFragment = (
      <Stack>
        <Card p="md" radius="md" sx={cardStyles}>
          <Group position="apart">
            <Group>
              <Text weight={500}>Mã đơn hàng: {order.orderCode}</Text>
              <Text color="dimmed">
                Ngày tạo: {DateUtils.isoDateToString(order.orderCreatedAt)}
              </Text>
            </Group>
            <Group spacing="xs">
              {orderStatusBadgeFragment(order.orderStatus)}
              {orderPaymentStatusBadgeFragment(order.orderPaymentStatus)}
            </Group>
          </Group>
        </Card>

        <Grid>
          <Grid.Col md={4}>
            <Card p="md" radius="md" sx={cardStyles}>
              <Stack spacing="xs">
                <Text weight={500} color="dimmed">Thông tin người nhận</Text>
                <Stack spacing={5}>
                  <Text size="sm" weight={500}>{order.orderToName}</Text>
                  <Text size="sm">{order.orderToPhone}</Text>
                  <Text size="sm">
                    {[order.orderToAddress, order.orderToWardName, order.orderToDistrictName, order.orderToProvinceName]
                      .filter(Boolean)
                      .join(', ')}
                  </Text>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col md={4}>
            <Card p="md" radius="md" sx={cardStyles}>
              <Stack spacing="xs">
                <Text weight={500} color="dimmed">Hình thức giao hàng</Text>
                <Image src={MiscUtils.ghnLogoPath} styles={{ image: { maxWidth: 170 } }}/>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col md={4}>
            <Card p="md" radius="md" sx={cardStyles}>
              <Stack spacing="xs">
                <Text weight={500} color="dimmed">Hình thức thanh toán</Text>
                <Group spacing="xs">
                  <PaymentMethodIcon color={theme.colors.gray[5]}/>
                  <Text size="sm">{PageConfigs.paymentMethodNameMap[order.orderPaymentMethodType]}</Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Card p="md" radius="md" sx={cardStyles}>
          <Stack spacing="xs">
            <Text weight={500} color="dimmed">Theo dõi vận đơn</Text>
            {order.orderWaybill
              ? (
                <Grid>
                  <Grid.Col sm={3}>
                    <Stack>
                      <Stack align="flex-start" spacing={5}>
                        <Text size="sm" weight={500}>Mã vận đơn</Text>
                        <Badge radius="md" size="lg" variant="filled" color="grape">
                          {order.orderWaybill.waybillCode}
                        </Badge>
                      </Stack>

                      <Stack align="flex-start" spacing={5}>
                        <Text size="sm" weight={500}>Dự kiến giao hàng</Text>
                        <Text size="sm">
                          {DateUtils.isoDateToString(order.orderWaybill.waybillExpectedDeliveryTime, 'DD/MM/YYYY')}
                        </Text>
                      </Stack>
                    </Stack>
                  </Grid.Col>

                  <Grid.Col sm={9}>
                    <Stack align="flex-start" spacing="xs">
                      <Text size="sm" weight={500}>Lịch sử vận đơn</Text>
                      <Stack spacing={5}>
                        {[...order.orderWaybill.waybillLogs]
                          .reverse()
                          .map(waybillLog => {
                            const waybillLogInfo = getWaybillLogInfo(waybillLog);

                            return (
                              <Group key={waybillLog.waybillLogId} spacing="sm" sx={{ flexWrap: 'nowrap' }}>
                                <ThemeIcon color={waybillLogInfo.color} size="sm" variant="filled" radius="xl">
                                  <waybillLogInfo.icon size={12}/>
                                </ThemeIcon>
                                <Text size="xs" color="dimmed">
                                  {DateUtils.isoDateToString(waybillLog.waybillLogCreatedAt)}
                                </Text>
                                <Text size="xs">
                                  {waybillLogInfo.text}
                                </Text>
                              </Group>
                            );
                          })}
                      </Stack>
                    </Stack>
                  </Grid.Col>
                </Grid>
              )
              : <Text size="sm">Hiện đơn hàng chưa có vận đơn</Text>}
          </Stack>
        </Card>

        <Card p={0} radius="md" sx={cardStyles}>
          <ScrollArea>
            <Table verticalSpacing="sm" horizontalSpacing="lg">
              <thead>
                <tr>
                  <th style={{ minWidth: 325 }}><Text weight="initial" size="sm" color="dimmed">Mặt hàng</Text></th>
                  <th style={{ minWidth: 125 }}><Text weight="initial" size="sm" color="dimmed">Đơn giá</Text></th>
                  <th style={{ minWidth: 150 }}><Text weight="initial" size="sm" color="dimmed">Số lượng</Text></th>
                  {/* TODO: Thêm discountPercent cho OrderVariant */}
                  {/*<th style={{ minWidth: 125 }}><Text weight="initial" size="sm" color="dimmed">Giảm giá</Text></th>*/}
                  <th style={{ minWidth: 125 }}><Text weight="initial" size="sm" color="dimmed">Thành tiền</Text></th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems
                  .map(orderItem => (
                    <OrderItemTableRow
                      key={orderItem.orderItemVariant.variantId}
                      orderItem={orderItem}
                      canReview={order.orderStatus === 4 && order.orderPaymentStatus === 2}
                    />
                  ))}
              </tbody>
            </Table>
          </ScrollArea>
        </Card>

        <Grid>
          <Grid.Col sm={7} md={8} lg={9}/>
          <Grid.Col sm={5} md={4} lg={3}>
            <Stack spacing="xs">
              <Group position="apart">
                <Text size="sm" color="dimmed">Tạm tính</Text>
                <Text size="sm" sx={{ textAlign: 'right' }}>
                  {MiscUtils.formatPrice(order.orderTotalAmount) + '\u00A0₫'}
                </Text>
              </Group>
              <Group position="apart">
                <Text size="sm" color="dimmed">Thuế (10%)</Text>
                <Text size="sm" sx={{ textAlign: 'right' }}>
                  {MiscUtils.formatPrice(Number(
                    (order.orderTotalAmount * ApplicationConstants.DEFAULT_TAX).toFixed(0))) + '\u00A0₫'}
                </Text>
              </Group>
              <Group position="apart">
                <Group spacing="xs">
                  <Text size="sm" color="dimmed">Phí vận chuyển</Text>
                  {order.orderStatus === 1 && (
                    <Tooltip
                      label="Phí vận chuyển có thể chưa được tính và sẽ còn cập nhật"
                      withArrow
                      sx={{ height: 20 }}
                    >
                      <ThemeIcon variant="light" color="blue" size="sm">
                        <InfoCircle size={14}/>
                      </ThemeIcon>
                    </Tooltip>
                  )}
                </Group>
                <Text size="sm" sx={{ textAlign: 'right' }}>
                  {MiscUtils.formatPrice(order.orderShippingCost) + '\u00A0₫'}
                </Text>
              </Group>
              <Group position="apart">
                <Text size="sm" weight={500}>Tổng tiền</Text>
                <Text size="lg" weight={700} color="blue" sx={{ textAlign: 'right' }}>
                  {MiscUtils.formatPrice(order.orderTotalPay) + '\u00A0₫'}
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider/>

        <Button
          color="pink"
          radius="md"
          sx={{ width: 'fit-content' }}
          onClick={handleCancelOrderButton}
          disabled={![1, 2].includes(order.orderStatus)}
        >
          Hủy đơn hàng
        </Button>
      </Stack>
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
                  Chi tiết đơn hàng
                </Title>

                {orderContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

function OrderItemTableRow({ orderItem, canReview }: { orderItem: ClientOrderVariantResponse, canReview: boolean }) {
  const theme = useMantineTheme();
  const modals = useModals();

  const handleOpenReviewModalButton = () => {
    modals.openModal({
      size: 'lg',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Đánh giá sản phẩm</strong>,
      children: <ReviewProductModal orderItem={orderItem}/>,
    });
  };

  return (
    <tr key={orderItem.orderItemVariant.variantId}>
      <td>
        <Group spacing="xs">
          <Image
            radius="md"
            width={65}
            height={65}
            src={orderItem.orderItemVariant.variantProduct.productThumbnail || undefined}
            alt={orderItem.orderItemVariant.variantProduct.productName}
          />
          <Stack spacing={3.5}>
            <Anchor
              component={Link}
              to={'/product/' + orderItem.orderItemVariant.variantProduct.productSlug}
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
            {canReview && (
              <Button
                size="xs"
                radius="md"
                variant="outline"
                mt={5}
                sx={{ width: 'fit-content' }}
                onClick={handleOpenReviewModalButton}
                disabled={orderItem.orderItemVariant.variantProduct.productIsReviewed}
                title={orderItem.orderItemVariant.variantProduct.productIsReviewed ? 'Sản phẩm đã được bạn đánh giá' : ''}
              >
                Đánh giá
              </Button>
            )}
          </Stack>
        </Group>
      </td>
      <td>
        <Text size="sm">
          {MiscUtils.formatPrice(orderItem.orderItemPrice) + ' ₫'}
        </Text>
      </td>
      <td>
        <Text size="sm">
          {orderItem.orderItemQuantity}
        </Text>
      </td>
      {/* TODO: Thêm discountPercent cho OrderVariant */}
      {/*<td>*/}
      {/*  <Text size="sm">*/}
      {/*    {MiscUtils.formatPrice(0) + ' ₫'}*/}
      {/*  </Text>*/}
      {/*</td>*/}
      <td>
        <Text weight={500} size="sm" color="blue">
          {MiscUtils.formatPrice(orderItem.orderItemAmount) + ' ₫'}
        </Text>
      </td>
    </tr>
  );
}

const ratingNameMap: Record<number, string> = {
  1: 'Rất không hài lòng',
  2: 'Không hài lòng',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Cực kỳ hài lòng',
};

function ReviewProductModal({ orderItem }: { orderItem: ClientOrderVariantResponse }) {
  const modals = useModals();

  const { user } = useAuthStore();

  const form = useForm({
    initialValues: {
      rating: 5,
      review: '',
    },
    schema: zodResolver(z.object({
      rating: z.number().min(1).max(5),
      review: z.string().min(3, { message: 'Vui lòng nhập ít nhất 3 ký tự' }),
    })),
  });

  const createReviewApi = useCreateReviewApi();

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (user) {
      const reviewRequest: ClientReviewRequest = {
        userId: user.id,
        productId: orderItem.orderItemVariant.variantProduct.productId,
        ratingScore: formValues.rating,
        content: formValues.review,
        status: 1,
      };
      createReviewApi.mutate(reviewRequest);
      modals.closeAll();
    }
  });

  return (
    <Stack>
      <Group spacing="xs">
        <Image
          radius="md"
          width={40}
          height={40}
          src={orderItem.orderItemVariant.variantProduct.productThumbnail || undefined}
          alt={orderItem.orderItemVariant.variantProduct.productName}
        />
        <Text size="sm">
          {orderItem.orderItemVariant.variantProduct.productName}
        </Text>
      </Group>

      <Stack spacing="xs" align="center" mb="md">
        <Text size="lg" weight={500}>Vui lòng đánh giá</Text>
        <Rating
          style={{ maxWidth: 180 }}
          {...form.getInputProps('rating')}
          isRequired
        />
        <Text size="sm" color="dimmed">{ratingNameMap[form.values.rating]}</Text>
      </Stack>

      <Textarea
        required
        data-autofocus
        placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé."
        autosize
        minRows={4}
        radius="md"
        {...form.getInputProps('review')}
      />

      <Group position="right">
        <Button variant="default" radius="md" onClick={modals.closeAll}>
          Đóng
        </Button>
        <Button type="submit" radius="md" onClick={handleFormSubmit}>
          Gửi đánh giá
        </Button>
      </Group>
    </Stack>
  );
}

function useGetOrderApi(orderCode: string) {
  const {
    data: orderResponse,
    isLoading: isLoadingOrderResponse,
    isError: isErrorOrderResponse,
  } = useQuery<ClientOrderDetailResponse, ErrorMessage>(
    ['client-api', 'orders', 'getOrder', orderCode],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_ORDER + '/' + orderCode),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      keepPreviousData: true,
    }
  );

  return { orderResponse, isLoadingOrderResponse, isErrorOrderResponse };
}

function useCancelOrderApi(orderCode: string) {
  const queryClient = useQueryClient();

  return useMutation<Empty, ErrorMessage, void>(
    () => FetchUtils.putWithToken(ResourceURL.CLIENT_ORDER_CANCEL + '/' + orderCode, {}),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Hủy đơn hàng thành công');
        void queryClient.invalidateQueries(['client-api', 'orders', 'getOrder', orderCode]);
      },
      onError: () => NotifyUtils.simpleFailed('Hủy đơn hàng không thành công'),
    }
  );
}

function useCreateReviewApi() {
  const queryClient = useQueryClient();

  return useMutation<ClientReviewResponse, ErrorMessage, ClientReviewRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_REVIEW, requestBody),
    {
      onSuccess: (response) => {
        NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>Đã thêm đánh giá cho sản phẩm </span>
            <Anchor component={Link} to={'/product/' + response.reviewProduct.productSlug} inherit>
              {response.reviewProduct.productName}
            </Anchor>
            <span>. Vui lòng đợi duyệt để hiển thị.</span>
          </Text>
        );
        void queryClient.invalidateQueries(['client-api', 'orders', 'getOrder']);
      },
      onError: () => NotifyUtils.simpleFailed('Không thêm được đánh giá cho sản phẩm'),
    }
  );
}

export default ClientOrderDetail;
