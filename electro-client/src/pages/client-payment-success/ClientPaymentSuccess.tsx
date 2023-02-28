import React from 'react';
import { Button, Stack, Text, useMantineTheme } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { ElectroLogo } from 'components';
import useTitle from 'hooks/use-title';

function ClientPaymentSuccess() {
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
      <Stack align="center" sx={{ alignItems: 'center', color: theme.colors.teal[6] }}>
        <Check size={100} strokeWidth={1}/>
        <Text weight={500}>Thanh toán PayPal thành công</Text>
      </Stack>
      <Button size="lg" mt="xl" onClick={handleCloseWindow}>
        Đóng cửa sổ này
      </Button>
    </Stack>
  );
}

export default ClientPaymentSuccess;
