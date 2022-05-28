import React from 'react';
import { Button, Divider, Group, Paper, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { Check, X } from 'tabler-icons-react';
import FetchUtils from '../utils/FetchUtils';

interface SimpleCreateFormProps<F> {
  form: UseFormReturnType<F>;
  resourceUrl: string;
  children: React.ReactNode;
}

export default function SimpleCreateForm<F, I, O>({ form, resourceUrl, children }: SimpleCreateFormProps<F>) {

  const handleFormSubmit = form.onSubmit(requestBody => {
    FetchUtils.create<I, O>(resourceUrl, requestBody as unknown as I)
      .then(([responseStatus, responseBody]) => {
        if (responseStatus === 201) {
          showNotification({
            title: 'Thông báo',
            message: 'Tạo thành công',
            autoClose: 5000,
            icon: <Check size={18}/>,
            color: 'teal',
          });
        }
        if (responseStatus === 500) {
          showNotification({
            title: 'Thông báo',
            message: 'Tạo không thành công',
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

          <Divider/>

          <Group position="apart" p="sm">
            <Button variant="default" onClick={form.reset}>Tẩy trống</Button>
            <Button type="submit">Thêm</Button>
          </Group>
        </Stack>
      </Paper>
    </form>
  )
}
