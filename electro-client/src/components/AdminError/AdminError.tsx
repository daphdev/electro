import React from 'react';
import { Stack, Text, Title } from '@mantine/core';

function AdminError() {
  return (
    <Stack spacing="xl" sx={{ textAlign: 'center' }}>
      <Text
        weight={700}
        sx={theme => ({
          fontSize: 120,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
        })}
      >
        Oops...
      </Text>
      <Title>Đã có lỗi xảy ra</Title>
    </Stack>
  );
}

export default AdminError;
