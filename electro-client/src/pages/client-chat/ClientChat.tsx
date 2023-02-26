import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Overlay,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core';
import { ClientUserNavbar } from 'components';
import useTitle from 'hooks/use-title';
import { AlertTriangle, Send } from 'tabler-icons-react';
import { MessageResponse } from 'models/Message';
import useAuthStore from 'stores/use-auth-store';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { ClientRoomExistenceResponse } from 'types';
import { RoomResponse } from 'models/Room';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import DateUtils from 'utils/DateUtils';

function ClientChat() {
  useTitle();

  const theme = useMantineTheme();

  const viewport = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<MessageResponse[]>([]);

  const { user } = useAuthStore();

  const { roomExistenceResponse, isLoadingRoomExistenceResponse, isErrorRoomExistenceResponse } = useGetRoomApi();

  const createRoomApi = useCreateRoomApi();

  useSubscription(
    roomExistenceResponse && roomExistenceResponse.roomExistence
      ? ['/chat/receive/' + roomExistenceResponse.roomResponse.id]
      : [],
    (message) => setMessages(messages => [...messages, JSON.parse(message.body)])
  );

  useEffect(() => {
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    if (roomExistenceResponse) {
      setMessages(roomExistenceResponse.roomRecentMessages);
    }
  }, [roomExistenceResponse]);

  const handleCreateRoomButton = () => createRoomApi.mutate();

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
                  Yêu cầu tư vấn
                </Title>

                <Card
                  p={0}
                  radius="md"
                  sx={{
                    height: 550,
                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                  }}
                >
                  {<LoadingOverlay visible={isLoadingRoomExistenceResponse}/>}
                  {(isErrorRoomExistenceResponse || (roomExistenceResponse && !roomExistenceResponse.roomExistence)) && (
                    <>
                      <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                      }}>
                        {isErrorRoomExistenceResponse && (
                          <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
                            <AlertTriangle size={125} strokeWidth={1}/>
                            <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
                          </Stack>
                        )}
                        {roomExistenceResponse && !roomExistenceResponse.roomExistence && (
                          <Button size="lg" onClick={handleCreateRoomButton}>
                            Gửi yêu cầu tư vấn!
                          </Button>
                        )}
                      </Box>
                      <Overlay
                        color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                        opacity={0.55}
                        blur={3}
                        zIndex={5}
                      />
                    </>
                  )}
                  {roomExistenceResponse && roomExistenceResponse.roomResponse && user && (
                    <Stack spacing={0} sx={{ position: 'relative', height: '100%' }}>
                      <ScrollArea
                        viewportRef={viewport}
                        sx={{ height: 'calc(100% - 68px)' }}
                      >
                        <Stack spacing={0} sx={{ paddingTop: theme.spacing.md }}>
                          {messages.map((message: MessageResponse) => (
                            message.user.id === user?.id
                              ? <ToMessage key={message.id} message={message}/>
                              : <FromMessage key={message.id} message={message}/>
                          ))}
                        </Stack>
                      </ScrollArea>
                      <MessageInput
                        roomId={roomExistenceResponse.roomResponse.id}
                        userId={user.id}
                      />
                    </Stack>
                  )}
                </Card>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export function FromMessage({ message }: { message: MessageResponse }) {
  const theme = useMantineTheme();

  return (
    <Group spacing="xs" px="md" pb="md" sx={{ flexWrap: 'nowrap', alignItems: 'end' }}>
      <Avatar
        color="cyan"
        size="sm"
        radius="md"
      >
        {message.user.username.toUpperCase().charAt(0)}
      </Avatar>
      <Stack spacing={2.5}>
        <Text size="xs" weight={500}>{message.user.fullname}</Text>
        <Group spacing="xs" sx={{ alignItems: 'end' }}>
          <Card
            radius="md"
            px="md"
            py="xs"
            sx={{
              maxWidth: 500,
              backgroundColor: theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[0],
            }}
          >
            <Text size="sm">{message.content}</Text>
          </Card>
          <Text size="xs" color="dimmed">{DateUtils.isoDateToString(message.createdAt)}</Text>
        </Group>
      </Stack>
    </Group>
  );
}

export function ToMessage({ message }: { message: MessageResponse }) {
  const theme = useMantineTheme();

  return (
    <Group spacing="xs" px="md" pb="md" position="right" sx={{ alignItems: 'end' }}>
      <Text size="xs" color="dimmed">{DateUtils.isoDateToString(message.createdAt)}</Text>
      <Card
        radius="md"
        px="md"
        py="xs"
        sx={{
          maxWidth: 500,
          backgroundColor: theme.colorScheme === 'dark'
            ? theme.colors.blue[9]
            : theme.colors.blue[5],
        }}
      >
        <Text size="sm" color={theme.white}>{message.content}</Text>
      </Card>
    </Group>
  );
}

export function MessageInput({ roomId, userId }: { roomId: number, userId: number }) {
  const theme = useMantineTheme();

  const [message, setMessage] = useState('');

  const stompClient = useStompClient();

  const handleSendMessageButton = () => {
    if (message.trim() !== '' && stompClient) {
      stompClient.publish({
        destination: '/chat/send/' + roomId,
        body: JSON.stringify({
          content: message.trim(),
          status: 1,
          userId: userId,
          roomId: roomId,
        }),
      });
      setMessage('');
    }
  };

  const handleSendMessageInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessageButton();
    }
  };

  return (
    <Group spacing="xs" sx={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    }}>
      <TextInput
        placeholder="Nhập tin nhắn"
        variant="filled"
        radius="md"
        sx={{ flexGrow: 1 }}
        value={message}
        onChange={event => setMessage(event.currentTarget.value)}
        onKeyDown={handleSendMessageInput}
      />
      <ActionIcon
        color="blue"
        radius="md"
        variant="light"
        size="lg"
        title="Gửi tin nhắn"
        onClick={handleSendMessageButton}
      >
        <Send size={18}/>
      </ActionIcon>
    </Group>
  );
}

function useGetRoomApi() {
  const {
    data: roomExistenceResponse,
    isLoading: isLoadingRoomExistenceResponse,
    isError: isErrorRoomExistenceResponse,
  } = useQuery<ClientRoomExistenceResponse, ErrorMessage>(
    ['client-api', 'chat', 'getRoom'],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_CHAT_GET_ROOM),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return { roomExistenceResponse, isLoadingRoomExistenceResponse, isErrorRoomExistenceResponse };
}

function useCreateRoomApi() {
  const queryClient = useQueryClient();

  return useMutation<RoomResponse, ErrorMessage, void>(
    () => FetchUtils.postWithToken(ResourceURL.CLIENT_CHAT_CREATE_ROOM, {}),
    {
      onSuccess: () => queryClient.invalidateQueries(['client-api', 'chat', 'getRoom']),
      onError: () => NotifyUtils.simpleFailed('Khởi tạo yêu cầu tư vấn không thành công'),
    }
  );
}

export default ClientChat;
