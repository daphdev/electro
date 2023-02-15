import useTitle from 'hooks/use-title';
import {
  Anchor,
  Badge,
  Blockquote,
  Button,
  Card,
  ColorSwatch,
  Container,
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
import React, { useState } from 'react';
import { ClientReviewResponse } from 'types';
import { useModals } from '@mantine/modals';
import { Link } from 'react-router-dom';
import DateUtils from 'utils/DateUtils';
import { AlertTriangle, Marquee, Star, Trash } from 'tabler-icons-react';
import ApplicationConstants from 'constants/ApplicationConstants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { ClientUserNavbar } from 'components';

function ClientReview() {
  useTitle();

  const theme = useMantineTheme();

  const [activePage, setActivePage] = useState(1);

  const {
    reviewResponses,
    isLoadingReviewResponses,
    isErrorReviewResponses,
  } = useGetAllReviewsByUserApi(activePage);
  const reviews = reviewResponses as ListResponse<ClientReviewResponse>;

  let reviewContentFragment;

  if (isLoadingReviewResponses) {
    reviewContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorReviewResponses) {
    reviewContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (reviews && reviews.totalElements === 0) {
    reviewContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
        <Marquee size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Chưa có đánh giá sản phẩm nào</Text>
      </Stack>
    );
  }

  if (reviews && reviews.totalElements > 0) {
    reviewContentFragment = (
      <>
        <Stack spacing="xs">
          {reviews.content.map(review => <ClientReviewCard key={review.reviewId} review={review}/>)}
        </Stack>

        <Group position="apart" mt={theme.spacing.lg}>
          <Pagination
            page={activePage}
            total={reviews.totalPages}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          />
          <Text>
            <Text component="span" weight={500}>Trang {activePage}</Text>
            <span> / {reviews.totalPages}</span>
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
                  Đánh giá sản phẩm
                </Title>

                <Card
                  p="sm"
                  radius="md"
                  withBorder
                  sx={{
                    maxWidth: 'fit-content',
                    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
                  }}
                >
                  <Group spacing="lg">
                    <Group spacing="xs">
                      <ColorSwatch color={theme.colors.gray[5]} size={20}/>
                      <Text size="sm">Chưa duyệt</Text>
                    </Group>
                    <Group spacing="xs">
                      <ColorSwatch color={theme.colors.teal[5]} size={20}/>
                      <Text size="sm">Đã duyệt</Text>
                    </Group>
                    <Group spacing="xs">
                      <ColorSwatch color={theme.colors.pink[5]} size={20}/>
                      <Text size="sm">Không duyệt</Text>
                    </Group>
                  </Group>
                </Card>

                {reviewContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

function ClientReviewCard({ review }: { review: ClientReviewResponse }) {
  const theme = useMantineTheme();
  const modals = useModals();

  const deleteReviewsApi = useDeleteReviewsApi();

  const handleDeleteReviewButton = () => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Xác nhận xóa</strong>,
      children: (
        <Text size="sm">
          Xóa đánh giá ở sản phẩm <strong>{review.reviewProduct.productName}</strong>?
        </Text>
      ),
      labels: {
        cancel: 'Không xóa',
        confirm: 'Xóa',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteReviewsApi.mutate([review.reviewId]),
    });
  };

  const reviewStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="filled" size="sm">Chưa duyệt</Badge>;
    case 2:
      return <Badge color="teal" variant="filled" size="sm">Đã duyệt</Badge>;
    case 3:
      return <Badge color="pink" variant="filled" size="sm">Không duyệt</Badge>;
    }
  };

  return (
    <Card
      p="sm"
      radius="md"
      sx={{
        backgroundColor: review.reviewStatus === 1
          ? theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[0]
          : theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[review.reviewStatus === 2 ? 'teal' : 'pink'][8], 0.25)
            : theme.fn.rgba(theme.colors[review.reviewStatus === 2 ? 'teal' : 'pink'][1], 0.5),
      }}
    >
      <Stack spacing={3.5}>
        <Group position="apart">
          <Group>
            <Group spacing="xs">
              <Image
                radius="md"
                width={22}
                height={22}
                src={review.reviewProduct.productThumbnail || undefined}
                alt={review.reviewProduct.productName}
                withPlaceholder
              />
              <Anchor component={Link} to={'/product/' + review.reviewProduct.productSlug} weight={500} size="sm">
                {review.reviewProduct.productName}
              </Anchor>
            </Group>

            <Text size="sm" color="dimmed">
              {DateUtils.isoDateToString(review.reviewCreatedAt)}
            </Text>

            {/* TODO: Gom thành component */}
            <Group spacing={5}>
              {Array(5).fill(0).map((_, index) => (
                <Star
                  key={index}
                  color={index < review.reviewRatingScore ? theme.colors.yellow[5] : theme.colors.gray[5]}
                  fill={index < review.reviewRatingScore ? theme.colors.yellow[5] : theme.colors.gray[5]}
                  size={14}
                />
              ))}
            </Group>

            {reviewStatusBadgeFragment(review.reviewStatus)}
          </Group>

          <Button
            variant="outline"
            color="red"
            leftIcon={<Trash size={18} strokeWidth={1.5}/>}
            compact
            onClick={handleDeleteReviewButton}
          >
            Xóa
          </Button>
        </Group>

        <Blockquote
          color={review.reviewStatus === 1 ? 'gray' : (review.reviewStatus === 2 ? 'teal' : 'pink')}
          sx={{ fontSize: theme.fontSizes.sm }}
        >
          {review.reviewContent}
        </Blockquote>

        {review.reviewReply && (
          <Card
            p="sm"
            radius="md"
            sx={{
              backgroundColor: review.reviewStatus === 1
                ? theme.colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.colors.gray[0]
                : theme.colorScheme === 'dark'
                  ? theme.fn.rgba(theme.colors[review.reviewStatus === 2 ? 'teal' : 'pink'][8], 0.25)
                  : theme.fn.rgba(theme.colors[review.reviewStatus === 2 ? 'teal' : 'pink'][1], 0.5),
            }}
          >
            <Stack spacing="xs">
              <Text size="sm" weight={500}>Phản hồi từ cửa hàng</Text>
              <Text size="sm">{review.reviewReply}</Text>
            </Stack>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

function useGetAllReviewsByUserApi(activePage: number) {
  const requestParams = {
    page: activePage,
    size: ApplicationConstants.DEFAULT_CLIENT_USER_REVIEW_PAGE_SIZE,
  };

  const {
    data: reviewResponses,
    isLoading: isLoadingReviewResponses,
    isError: isErrorReviewResponses,
  } = useQuery<ListResponse<ClientReviewResponse>, ErrorMessage>(
    ['client-api', 'reviews', 'getAllReviewsByUser', requestParams],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_REVIEW, requestParams),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return { reviewResponses, isLoadingReviewResponses, isErrorReviewResponses };
}

function useDeleteReviewsApi() {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorMessage, number[]>(
    (entityIds) => FetchUtils.deleteWithToken(ResourceURL.CLIENT_REVIEW, entityIds),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Xóa đánh giá thành công');
        void queryClient.invalidateQueries(['client-api', 'reviews', 'getAllReviewsByUser']);
      },
      onError: () => NotifyUtils.simpleFailed('Xóa đánh giá thất bại'),
    }
  );
}

export default ClientReview;
