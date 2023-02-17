import React from 'react';
import { Anchor, Center, Stack, Text, useMantineTheme } from '@mantine/core';
import { CurrencyDollar } from 'tabler-icons-react';

function VoucherManage() {
  const theme = useMantineTheme();

  return (
    <Center>
      <Stack align="center">
        <CurrencyDollar size={200} strokeWidth={1} color={theme.colors.gray[5]}/>
        <Text size="lg">Sổ quỹ là chức năng quản lý dòng tiền của hệ thống</Text>
        <Text>
          Tham khảo: <Anchor href="https://www.teamcrop.com/ho-tro/module-so-quy" target="_blank">Module sổ quỹ của
          Teamcrop</Anchor>
        </Text>
      </Stack>
    </Center>
  );
}

export default VoucherManage;
