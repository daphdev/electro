import React, { useState } from 'react';
import useTitle from 'hooks/use-title';
import {
  Anchor,
  Button,
  Card,
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
import { ClientUserNavbar } from 'components';
import { ClientWishResponse } from 'types';
import { AlertTriangle, HeartBroken, Trash } from 'tabler-icons-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Link } from 'react-router-dom';
import DateUtils from 'utils/DateUtils';
import ApplicationConstants from 'constants/ApplicationConstants';
import { useModals } from '@mantine/modals';

function ClientWishlist() {
  useTitle();

  const theme = useMantineTheme();

  const [activePage, setActivePage] = useState(1);

  const {
    wishResponses,
    isLoadingWishResponses,
    isErrorWishResponses,
  } = useGetAllWishesApi(activePage);
  const wishes = wishResponses as ListResponse<ClientWishResponse>;

  let wishlistContentFragment;

  if (isLoadingWishResponses) {
    wishlistContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorWishResponses) {
    wishlistContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (wishes && wishes.totalElements === 0) {
    wishlistContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
        <HeartBroken size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Chưa có sản phẩm yêu thích</Text>
      </Stack>
    );
  }

  if (wishes && wishes.totalElements > 0) {
    wishlistContentFragment = (
      <>
        <Stack>
          {wishes.content.map(wish => <ClientWishCard key={wish.wishId} wish={wish}/>)}
        </Stack>

        <Group position="apart" mt={theme.spacing.lg}>
          <Pagination
            page={activePage}
            total={wishes.totalPages}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          />
          <Text>
            <Text component="span" weight={500}>Trang {activePage}</Text>
            <span> / {wishes.totalPages}</span>
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
                  Sản phẩm yêu thích
                </Title>

                {wishlistContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

function ClientWishCard({ wish }: { wish: ClientWishResponse }) {
  const theme = useMantineTheme();
  const modals = useModals();

  const deleteWishesApi = useDeleteWishesApi();

  const handleDeleteWishButton = () => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Xác nhận xóa</strong>,
      children: (
        <Text size="sm">
          Xóa sản phẩm <strong>{wish.wishProduct.productName}</strong> khỏi danh sách yêu thích?
        </Text>
      ),
      labels: {
        cancel: 'Không xóa',
        confirm: 'Xóa',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteWishesApi.mutate([wish.wishId]),
    });
  };

  return (
    <Group position="apart">
      <Group>
        <Image
          radius="md"
          width={55}
          height={55}
          src={wish.wishProduct.productThumbnail || undefined}
          alt={wish.wishProduct.productName}
          withPlaceholder
        />
        <Stack spacing={3.5}>
          <Anchor component={Link} to={'/product/' + wish.wishProduct.productSlug} weight={500}>
            {wish.wishProduct.productName}
          </Anchor>
          <Text size="sm" color="dimmed">
            Thêm vào lúc {DateUtils.isoDateToString(wish.wishCreatedAt)}
          </Text>
        </Stack>
      </Group>
      <Button
        variant="outline"
        color="red"
        leftIcon={<Trash size={18} strokeWidth={1.5}/>}
        compact
        onClick={handleDeleteWishButton}
      >
        Xóa
      </Button>
    </Group>
  );
}

function useGetAllWishesApi(activePage: number) {
  const requestParams = {
    page: activePage,
    size: ApplicationConstants.DEFAULT_CLIENT_WISHLIST_PAGE_SIZE,
  };

  const {
    data: wishResponses,
    isLoading: isLoadingWishResponses,
    isError: isErrorWishResponses,
  } = useQuery<ListResponse<ClientWishResponse>, ErrorMessage>(
    ['client-api', 'wishes', 'getAllWishes', requestParams],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_WISH, requestParams),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return { wishResponses, isLoadingWishResponses, isErrorWishResponses };
}

function useDeleteWishesApi() {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorMessage, number[]>(
    (entityIds) => FetchUtils.deleteWithToken(ResourceURL.CLIENT_WISH, entityIds),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Xóa sản phẩm yêu thích thành công');
        void queryClient.invalidateQueries(['client-api', 'wishes', 'getAllWishes']);
      },
      onError: () => NotifyUtils.simpleFailed('Xóa sản phẩm yêu thích thất bại'),
    }
  );
}

export default ClientWishlist;
