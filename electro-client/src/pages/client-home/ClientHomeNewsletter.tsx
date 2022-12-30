import React from 'react';
import { Card, Group, Text, TextInput, useMantineTheme } from '@mantine/core';
import { At, Mailbox } from 'tabler-icons-react';

function ClientHomeNewsletter() {
  const theme = useMantineTheme();

  return (
    <Card
      radius="md"
      shadow="sm"
      p="lg"
      sx={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[9] : theme.colors.blue[6],
        color: theme.white,
      }}
    >
      <Group position="apart">
        <Group>
          <Mailbox size={40} strokeWidth={1}/>
          <Text weight={500} sx={{ fontSize: theme.fontSizes.xl }}>
            Đăng ký nhận tin
          </Text>
          <Text sx={{ fontSize: theme.fontSizes.md }}>
            và cập nhật khuyến mãi liên tục...
          </Text>
        </Group>
        <TextInput
          styles={{
            root: { width: 450 },
            icon: { color: theme.white },
            input: {
              color: theme.white,
              border: 'none',
              backgroundColor: theme.fn.rgba(theme.colors.blue[1], 0.25),

              '&::placeholder': {
                color: theme.fn.rgba(theme.colors.gray[0], 0.5),
              },
            },
          }}
          placeholder="Địa chỉ email"
          radius="md"
          size="md"
          icon={<At size={16}/>}
        />
      </Group>
    </Card>
  );
}

export default ClientHomeNewsletter;
