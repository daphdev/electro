import React from 'react';
import { Button, Divider, Group, Paper, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { Check, X } from 'tabler-icons-react';
import FetchUtils from '../utils/FetchUtils';

interface SimpleUpdateFormProps<F> {
  form: UseFormReturnType<F>;
  resourceUrl: string;
  entityId: number;
  children: React.ReactNode;
}

export default function SimpleUpdateForm<F, I, O>({ form, resourceUrl, entityId, children }: SimpleUpdateFormProps<F>) {

  const handleFormSubmit = form.onSubmit(requestBody => {
    FetchUtils.update<I, O>(resourceUrl, entityId, requestBody as unknown as I)
      .then(([responseStatus, responseBody]) => {
        if (responseStatus === 200) {
          showNotification({
            title: 'Thông báo',
            message: 'Cập nhật thành công',
            autoClose: 5000,
            icon: <Check size={18}/>,
            color: 'teal',
          });
        }
        if (responseStatus === 500) {
          showNotification({
            title: 'Thông báo',
            message: 'Cập nhật không thành công',
            autoClose: 5000,
            icon: <X size={18}/>,
            color: 'red',
          });
        }
      });
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Paper shadow="xs">
        <Stack spacing={0}>
          {children}

          <Divider mt="xs"/>

          <Group position="apart" p="sm">
            <Button variant="default" onClick={form.reset}>Tẩy trống</Button>
            <Button type="submit">Cập nhật</Button>
          </Group>
        </Stack>
      </Paper>
    </form>
  )
}
