import React from 'react';
import { Center, Stack, Text, useMantineTheme } from '@mantine/core';
import { Bulldozer } from 'tabler-icons-react';

function VoucherManage() {
  const theme = useMantineTheme();

  return (
    <Center>
      <Stack>
        <Bulldozer size={200} strokeWidth={1} color={theme.colors.gray[5]}/>
        <Text size="lg">Chưa được triển khai</Text>
      </Stack>
    </Center>
  );
}

export default VoucherManage;
