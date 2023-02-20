import React, { useEffect, useState } from 'react';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import {
  ActionIcon,
  Anchor,
  Badge,
  Blockquote,
  Button,
  Group,
  Highlight,
  Paper,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  useMantineTheme
} from '@mantine/core';
import { ManageHeader, ManageHeaderTitle, ManageMain, ManagePagination, ReviewStarGroup } from 'components';
import ReviewConfigs from 'pages/review/ReviewConfigs';
import { useModals } from '@mantine/modals';
import useGetAllApi from 'hooks/use-get-all-api';
import { ReviewRequest, ReviewResponse } from 'models/Review';
import PageConfigs from 'pages/PageConfigs';
import { ListResponse } from 'utils/FetchUtils';
import { Box, Check, Clock, Message2, Search, Star, Trash, User } from 'tabler-icons-react';
import DateUtils from 'utils/DateUtils';
import useAppStore from 'stores/use-app-store';
import { useDebouncedValue } from '@mantine/hooks';
import useDeleteByIdApi from 'hooks/use-delete-by-id-api';
import useUpdateApi from 'hooks/use-update-api';

function ReviewManage() {
  useResetManagePageState();

  const theme = useMantineTheme();
  const modals = useModals();

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<ReviewResponse>,
  } = useGetAllApi<ReviewResponse>(ReviewConfigs.resourceUrl, ReviewConfigs.resourceKey);

  const deleteByIdApi = useDeleteByIdApi(ReviewConfigs.resourceUrl, ReviewConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const handleDeleteEntityButton = (entityId: number) => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Xác nhận xóa</strong>,
      children: <Text size="sm">Xóa phần tử có ID {entityId}?</Text>,
      labels: {
        cancel: 'Không xóa',
        confirm: 'Xóa',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteByIdApi.mutate(entityId),
    });
  };

  const handleCheckReviewButton = (review: ReviewResponse) => {
    modals.openModal({
      size: 'xl',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      title: <strong>Xem xét Đánh giá ID {review.id}</strong>,
      children: <CheckReviewModal review={review}/>,
    });
  };

  const handleReplyReviewButton = (review: ReviewResponse) => {
    modals.openModal({
      size: 'xl',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      title: <strong>Phản hồi Đánh giá ID {review.id}</strong>,
      children: <ReplyReviewModal review={review}/>,
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

  const entitiesTableHeadsFragment = (
    <tr>
      <th>ID</th>
      <th>Ngày tạo</th>
      <th>Người dùng</th>
      <th>Sản phẩm</th>
      <th>Số sao</th>
      <th>Tóm lược nội dung</th>
      <th>Có phản hồi?</th>
      <th>Trạng thái</th>
      <th style={{ width: 120 }}>Thao tác</th>
    </tr>
  );

  const entitiesTableRowsFragment = listResponse.content.map((entity) => (
    <tr key={entity.id}>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>
        <Stack spacing={0}>
          <Highlight highlight={searchToken} inherit>
            {entity.user.fullname}
          </Highlight>
          <Highlight highlight={searchToken} size="xs" color="dimmed">
            {entity.user.username}
          </Highlight>
        </Stack>
      </td>
      <td>
        <Anchor href={'/product/' + entity.product.slug} target="_blank" inherit>
          <Highlight highlight={searchToken} inherit>
            {entity.product.name}
          </Highlight>
        </Anchor>
      </td>
      <td>
        <ReviewStarGroup ratingScore={entity.ratingScore}/>
      </td>
      <td style={{ maxWidth: 300 }}>
        <Highlight highlight={searchToken} inherit>
          {entity.content.length > 120 ? entity.content.substring(0, 120).concat('...') : entity.content}
        </Highlight>
      </td>
      <td>{entity.reply && <Check color={theme.colors.teal[5]}/>}</td>
      <td>{reviewStatusBadgeFragment(entity.status)}</td>
      <td>
        <Group spacing="xs">
          <ActionIcon
            color="blue"
            variant="outline"
            size={24}
            title="Xem xét"
            onClick={() => handleCheckReviewButton(entity)}
          >
            <Search size={16}/>
          </ActionIcon>
          <ActionIcon
            color="grape"
            variant="outline"
            size={24}
            title="Phản hồi"
            onClick={() => handleReplyReviewButton(entity)}
            disabled={entity.status === 1}
          >
            <Message2 size={16}/>
          </ActionIcon>
          <ActionIcon
            color="pink"
            variant="outline"
            size={24}
            title="Xóa"
            onClick={() => handleDeleteEntityButton(entity.id)}
          >
            <Trash size={16}/>
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={ReviewConfigs.manageTitleLinks}
          title={ReviewConfigs.manageTitle}
        />
      </ManageHeader>

      <ReviewSearchPanel/>

      <ManageMain
        listResponse={listResponse}
        isLoading={isLoading}
      >
        <Table
          horizontalSpacing="sm"
          verticalSpacing="sm"
          highlightOnHover
          striped
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            overflow: 'hidden',
          })}
        >
          <thead>{entitiesTableHeadsFragment}</thead>
          <tbody>{entitiesTableRowsFragment}</tbody>
        </Table>
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

function ReviewSearchPanel() {
  const { setSearchToken } = useAppStore();

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 400);

  useEffect(() => setSearchToken(debouncedSearch), [debouncedSearch, setSearchToken]);

  return (
    <Paper shadow="xs" p="sm">
      <TextInput
        placeholder="Từ khóa"
        icon={<Search size={14}/>}
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
    </Paper>
  );
}

function CheckReviewModal({ review }: { review: ReviewResponse }) {
  const theme = useMantineTheme();
  const modals = useModals();

  const updateReviewApi = useUpdateApi<ReviewRequest, ReviewResponse>(ReviewConfigs.resourceUrl, ReviewConfigs.resourceKey, review.id);

  const handleCheckReviewButton = () => {
    const requestBody: ReviewRequest = {
      userId: review.user.id,
      productId: review.product.id,
      ratingScore: review.ratingScore,
      content: review.content,
      reply: review.reply,
      status: 2,
    };
    updateReviewApi.mutate(requestBody);
    modals.closeAll();
  };

  const handleUncheckReviewButton = () => {
    const requestBody: ReviewRequest = {
      userId: review.user.id,
      productId: review.product.id,
      ratingScore: review.ratingScore,
      content: review.content,
      reply: review.reply,
      status: 3,
    };
    updateReviewApi.mutate(requestBody);
    modals.closeAll();
  };

  return (
    <Stack>
      <Group>
        <Group spacing="xs">
          <ThemeIcon>
            <Clock size={16}/>
          </ThemeIcon>
          <Text size="sm">{DateUtils.isoDateToString(review.createdAt)}</Text>
        </Group>
        <Group spacing="xs">
          <ThemeIcon>
            <User size={16}/>
          </ThemeIcon>
          <Text size="sm">{review.user.fullname}</Text>
        </Group>
        <Group spacing="xs">
          <ThemeIcon>
            <Box size={16}/>
          </ThemeIcon>
          <Text size="sm">{review.product.name}</Text>
        </Group>
        <Group spacing="xs">
          <ThemeIcon>
            <Star size={16}/>
          </ThemeIcon>
          <ReviewStarGroup ratingScore={review.ratingScore}/>
        </Group>
      </Group>
      <Blockquote sx={{ fontSize: theme.fontSizes.sm }}>
        {review.content}
      </Blockquote>
      <Group position="right">
        <Button variant="default" onClick={modals.closeAll}>
          Đóng
        </Button>
        <Button color="teal" onClick={handleCheckReviewButton} disabled={review.status === 2}>
          Duyệt
        </Button>
        <Button color="pink" onClick={handleUncheckReviewButton} disabled={review.status === 3}>
          Không duyệt
        </Button>
      </Group>
    </Stack>
  );
}

function ReplyReviewModal({ review }: { review: ReviewResponse }) {
  const modals = useModals();

  const [reply, setReply] = useState(review.reply || '');

  const updateReviewApi = useUpdateApi<ReviewRequest, ReviewResponse>(ReviewConfigs.resourceUrl, ReviewConfigs.resourceKey, review.id);

  const handleReplyReviewButton = () => {
    const requestBody: ReviewRequest = {
      userId: review.user.id,
      productId: review.product.id,
      ratingScore: review.ratingScore,
      content: review.content,
      reply: reply.trim() || null,
      status: review.status,
    };
    updateReviewApi.mutate(requestBody);
    modals.closeAll();
  };

  return (
    <Stack>
      <Group>
        <Group spacing="xs">
          <ThemeIcon>
            <Clock size={16}/>
          </ThemeIcon>
          <Text size="sm">{DateUtils.isoDateToString(review.createdAt)}</Text>
        </Group>
        <Group spacing="xs">
          <ThemeIcon>
            <User size={16}/>
          </ThemeIcon>
          <Text size="sm">{review.user.fullname}</Text>
        </Group>
        <Group spacing="xs">
          <ThemeIcon>
            <Box size={16}/>
          </ThemeIcon>
          <Text size="sm">{review.product.name}</Text>
        </Group>
      </Group>
      <Textarea
        data-autofocus
        placeholder="Nhập nội dung phản hồi"
        autosize
        minRows={4}
        value={reply}
        onChange={(event) => setReply(event.currentTarget.value)}
      />
      <Group position="right">
        <Button variant="default" onClick={modals.closeAll}>
          Đóng
        </Button>
        <Button
          color="grape"
          onClick={handleReplyReviewButton}
          disabled={(!review.reply && reply.length === 0) || (!!review.reply && review.reply === reply)}
        >
          {!review.reply ? 'Thêm phản hồi' : (reply.length === 0 ? 'Xóa phản hồi' : 'Sửa phản hồi')}
        </Button>
      </Group>
    </Stack>
  );
}

export default ReviewManage;
