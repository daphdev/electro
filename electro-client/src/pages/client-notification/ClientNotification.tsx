import useTitle from 'hooks/use-title';
import {
  Anchor,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  MantineColor,
  Pagination,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';
import React, { useState } from 'react';
import ApplicationConstants from 'constants/ApplicationConstants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { NotificationRequest, NotificationResponse, NotificationType } from 'models/Notification';
import {
  Alarm,
  AlertCircle,
  AlertTriangle,
  Bell,
  BrandPaypal,
  FileBarcode,
  Icon,
  Marquee,
  Message
} from 'tabler-icons-react';
import { ClientUserNavbar } from 'components';
import DateUtils from 'utils/DateUtils';
import { Link } from 'react-router-dom';
import useAuthStore from 'stores/use-auth-store';
import useClientSiteStore from 'stores/use-client-site-store';
import dayjs from 'dayjs';

function ClientNotification() {
  useTitle();

  const theme = useMantineTheme();

  const [activePage, setActivePage] = useState(1);

  const {
    notificationResponses,
    isLoadingNotificationResponses,
    isErrorNotificationResponses,
  } = useGetAllNotificationsApi(activePage);
  const notifications = notificationResponses as ListResponse<NotificationResponse>;

  let notificationContentFragment;

  if (isLoadingNotificationResponses) {
    notificationContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorNotificationResponses) {
    notificationContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (notifications && notifications.totalElements === 0) {
    notificationContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
        <Marquee size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Chưa có thông báo nào</Text>
      </Stack>
    );
  }

  if (notifications && notifications.totalElements > 0) {
    notificationContentFragment = (
      <>
        <Stack spacing="xs">
          {notifications.content
            .map(notification => <ClientNotificationCard key={notification.id} notification={notification}/>)}
        </Stack>

        <Group position="apart" mt={theme.spacing.lg}>
          <Pagination
            page={activePage}
            total={notifications.totalPages}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          />
          <Text>
            <Text component="span" weight={500}>Trang {activePage}</Text>
            <span> / {notifications.totalPages}</span>
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
                  Thông báo
                </Title>

                {notificationContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

interface NotificationFigure {
  icon: Icon;
  color: MantineColor;
}

const notificationIconMap: Record<NotificationType, NotificationFigure> = {
  [NotificationType.GENERAL]: {
    icon: Bell,
    color: 'blue',
  },
  [NotificationType.ERROR]: {
    icon: AlertCircle,
    color: 'red',
  },
  [NotificationType.WARNING]: {
    icon: AlertTriangle,
    color: 'yellow',
  },
  [NotificationType.PREORDER]: {
    icon: Alarm,
    color: 'teal',
  },
  [NotificationType.REVIEW]: {
    icon: Message,
    color: 'violet',
  },
  [NotificationType.ORDER]: {
    icon: FileBarcode,
    color: 'indigo',
  },
  [NotificationType.CHECKOUT_PAYPAL_SUCCESS]: {
    icon: BrandPaypal,
    color: 'cyan',
  },
  [NotificationType.CHECKOUT_PAYPAL_CANCEL]: {
    icon: BrandPaypal,
    color: 'pink',
  },
};

function ClientNotificationCard({ notification }: { notification: NotificationResponse }) {
  const theme = useMantineTheme();

  const updateNotificationApi = useUpdateNotificationApi(notification.id);

  const { user } = useAuthStore();

  const handleMarkAsReadButton = () => {
    if (user) {
      const notificationRequest: NotificationRequest = {
        userId: user.id,
        type: notification.type,
        message: notification.message,
        anchor: notification.anchor,
        status: 2,
      };

      updateNotificationApi.mutate(notificationRequest);
    }
  };

  const LeftIcon = notificationIconMap[notification.type].icon;

  const isRecent = dayjs().diff(notification.createdAt, 'minute') <= 5;

  return (
    <Card
      px="md"
      py="sm"
      radius="md"
      sx={{
        backgroundColor: notification.status === 1
          ? (theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[isRecent ? 'orange' : 'blue'][8], 0.25)
            : theme.fn.rgba(theme.colors[isRecent ? 'orange' : 'blue'][1], 0.5))
          : theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      }}
    >
      <Group position="apart" sx={{ flexWrap: 'nowrap' }}>
        <Group sx={{ flexWrap: 'nowrap' }}>
          <ThemeIcon
            variant="filled"
            radius="xl"
            size="xl"
            color={notificationIconMap[notification.type].color}
          >
            <LeftIcon/>
          </ThemeIcon>
          <Stack spacing={3.5}>
            <Group spacing={7.5}>
              {notification.status === 1 && (
                <Box sx={{
                  width: 6.5,
                  height: 6.5,
                  backgroundColor: theme.colors[isRecent ? 'orange' : 'blue'][theme.colorScheme === 'dark' ? 5 : 7],
                  borderRadius: '50%',
                }}/>
              )}
              <Text size="xs" color="dimmed">
                {DateUtils.isoDateToString(notification.createdAt)}
              </Text>
            </Group>
            <Text size="sm">
              {notification.message}
              {notification.anchor &&
                <Anchor component={Link} to={notification.anchor} ml={5} inherit>Chi tiết</Anchor>}
            </Text>
          </Stack>
        </Group>
        {notification.status === 1 && (
          <Button
            variant={isRecent ? 'filled' : 'outline'}
            color={isRecent ? 'orange' : 'blue'}
            compact
            onClick={handleMarkAsReadButton}
          >
            Đánh dấu đã đọc
          </Button>
        )}
      </Group>
    </Card>
  );
}

function useGetAllNotificationsApi(activePage: number) {
  const requestParams = {
    page: activePage,
    size: ApplicationConstants.DEFAULT_CLIENT_NOTIFICATION_PAGE_SIZE,
  };

  const { newNotifications } = useClientSiteStore();

  const {
    data: notificationResponses,
    isLoading: isLoadingNotificationResponses,
    isError: isErrorNotificationResponses,
  } = useQuery<ListResponse<NotificationResponse>, ErrorMessage>(
    ['client-api', 'notifications', 'getAllNotifications', requestParams, newNotifications.length],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_NOTIFICATION, requestParams),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return { notificationResponses, isLoadingNotificationResponses, isErrorNotificationResponses };
}

function useUpdateNotificationApi(id: number) {
  const queryClient = useQueryClient();

  return useMutation<NotificationResponse, ErrorMessage, NotificationRequest>(
    (requestBody) => FetchUtils.putWithToken(ResourceURL.CLIENT_NOTIFICATION + '/' + id, requestBody),
    {
      onSuccess: () => queryClient.invalidateQueries(['client-api', 'notifications', 'getAllNotifications']),
      onError: () => NotifyUtils.simpleFailed('Cập nhật không thành công'),
    }
  );
}

export default ClientNotification;
