import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Card,
  Grid,
  Group,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import useGetAllApi from 'hooks/use-get-all-api';
import { RoomResponse } from 'models/Room';
import ResourceURL from 'constants/ResourceURL';
import PageConfigs from 'pages/PageConfigs';
import { ListResponse } from 'utils/FetchUtils';
import DateUtils from 'utils/DateUtils';
import { MessageResponse } from 'models/Message';
import { FromMessage, MessageInput, ToMessage } from 'pages/client-chat/ClientChat';
import { useSubscription } from 'react-stomp-hooks';
import { Refresh } from 'tabler-icons-react';
import useAdminAuthStore from 'stores/use-admin-auth-store';

function ChatDashboard() {
  const [activeRoomId, setActiveRoomId] = useState(0);

  const {
    data: roomResponses = PageConfigs.initialListResponse as ListResponse<RoomResponse>,
    isLoading: isLoadingRoomResponses,
    refetch: refetchRoomResponses,
  } = useGetAllApi<RoomResponse>(
    ResourceURL.ROOM,
    'rooms',
    { sort: 'updatedAt,desc', all: 1 },
    (roomResponses) => {
      if (roomResponses.totalElements > 0) {
        setActiveRoomId(roomResponses.content[0].id);
      }
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <Grid sx={{ height: '100%' }}>
      <Grid.Col xs={4} lg={3} sx={{ height: '100%' }}>
        <Paper shadow="xs" p="sm" sx={{ height: '100%' }}>
          <Stack spacing="xs">
            <Group position="apart">
              <Text size="lg" weight={500}>Khách hàng</Text>
              <ActionIcon variant="light" color="blue" size="sm" onClick={() => refetchRoomResponses()}>
                <Refresh size={16}/>
              </ActionIcon>
            </Group>
            <Box sx={{ position: 'relative' }}>
              <LoadingOverlay visible={isLoadingRoomResponses}/>
              <ScrollArea sx={{ height: 'calc(100vh - 174px)' }}>
                <Stack spacing="xs">
                  {roomResponses.content.map((roomResponse, index) => (
                    <UnstyledButton key={roomResponse.id} onClick={() => setActiveRoomId(roomResponse.id)}>
                      <RoomCard roomResponse={roomResponse} active={roomResponse.id === activeRoomId}/>
                    </UnstyledButton>
                  ))}
                </Stack>
              </ScrollArea>
            </Box>
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col xs={8} lg={9} sx={{ height: '100%' }}>
        <Paper shadow="xs" sx={{ height: '100%', overflow: 'hidden' }}>
          {roomResponses.content.length > 0 && <ChatPanel roomId={activeRoomId}/>}
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

function RoomCard({ roomResponse, active }: { roomResponse: RoomResponse, active: boolean }) {
  const theme = useMantineTheme();

  const { user: adminUser } = useAdminAuthStore();

  const [newMessagesNumber, setNewMessagesNumber] = useState(0);

  useSubscription(
    ['/chat/receive/' + roomResponse.id],
    (message) => {
      const messageResponse: MessageResponse = JSON.parse(message.body);
      if (adminUser && messageResponse.user.id !== adminUser.id) {
        setNewMessagesNumber(newMessagesNumber + 1);
      }
    }
  );

  return (
    <Card
      radius="sm"
      p="sm"
      sx={{
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        backgroundColor: active ? theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0] : 'unset',
        '&:hover': { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0] },
      }}
    >
      <Group>
        <Avatar color="cyan" size="md" radius="md">
          {roomResponse.user.username.toUpperCase().charAt(0)}
        </Avatar>
        <Stack spacing={2}>
          <Group>
            <Text size="xs" color="dimmed">
              Room ID: {roomResponse.id} – {DateUtils.isoDateToString(roomResponse.updatedAt)}
            </Text>
          </Group>
          <Group spacing="xs">
            <Text size="sm">{roomResponse.user.fullname}</Text>
            {newMessagesNumber > 0 && <Badge variant="filled" size="sm">{newMessagesNumber}</Badge>}
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}

function ChatPanel({ roomId }: { roomId: number }) {
  const theme = useMantineTheme();

  const { user: adminUser } = useAdminAuthStore();

  const viewport = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<MessageResponse[]>([]);

  const { isSuccess: isSuccessMessageResponses, isLoading: isLoadingMessageResponses } = useGetAllApi<MessageResponse>(
    ResourceURL.MESSAGE,
    'messages',
    { filter: 'room.id==' + roomId },
    (messageResponses) => setMessages(messageResponses.content.sort((a, b) => a.id - b.id)), // TODO
    { refetchOnWindowFocus: false }
  );

  useSubscription(
    isSuccessMessageResponses
      ? ['/chat/receive/' + roomId]
      : [],
    (message) => setMessages(messages => [...messages, JSON.parse(message.body)])
  );

  useEffect(() => {
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  return (
    <Stack spacing={0} sx={{ position: 'relative', height: '100%' }}>
      <LoadingOverlay visible={isLoadingMessageResponses}/>
      <ScrollArea
        viewportRef={viewport}
        sx={{ height: 'calc(100vh - 172px)' }}
      >
        <Stack spacing={0} sx={{ paddingTop: theme.spacing.md }}>
          {messages.map((message: MessageResponse) => (
            (adminUser && message.user.id === adminUser.id)
              ? <ToMessage key={message.id} message={message}/>
              : <FromMessage key={message.id} message={message}/>
          ))}
        </Stack>
      </ScrollArea>
      <MessageInput
        roomId={roomId}
        userId={adminUser?.id || 0}
      />
    </Stack>
  );
}

export default ChatDashboard;
