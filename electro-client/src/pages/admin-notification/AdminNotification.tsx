import React from 'react';
import { Center, Stack, Text, useMantineTheme } from '@mantine/core';
import { Bell } from 'tabler-icons-react';

function AdminNotification() {
  const theme = useMantineTheme();

  return (
    <Center>
      <Stack align="center">
        <Bell size={200} strokeWidth={1} color={theme.colors.gray[5]}/>
        <Text size="lg">Chức năng Thông báo của Admin hiện chưa được triển khai</Text>
      </Stack>
    </Center>
  );
}

export default AdminNotification;
