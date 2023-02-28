import React from 'react';
import useTitle from 'hooks/use-title';
import { Button, Stack, Text, useMantineTheme } from '@mantine/core';
import { ElectroLogo } from 'components';
import { X } from 'tabler-icons-react';

function ClientPaymentCancel() {
  useTitle();

  const theme = useMantineTheme();

  const handleCloseWindow = () => {
    // eslint-disable-next-line no-restricted-globals,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    window.open(location, '_self')?.close();
  };

  return (
    <Stack align="center" my="xl">
      <ElectroLogo/>
      <Stack align="center" sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <X size={100} strokeWidth={1}/>
        <Text weight={500}>Đã hủy thanh toán PayPal</Text>
      </Stack>
      <Button size="lg" mt="xl" onClick={handleCloseWindow}>
        Đóng cửa sổ này
      </Button>
    </Stack>
  );
}

export default ClientPaymentCancel;
