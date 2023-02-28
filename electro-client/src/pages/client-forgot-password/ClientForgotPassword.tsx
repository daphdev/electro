import React from 'react';
import useTitle from 'hooks/use-title';
import { Button, Card, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import MiscUtils from 'utils/MiscUtils';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from 'react-query';
import { Empty } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';

function ClientForgotPassword() {
  useTitle();

  const initialFormValues = {
    email: '',
  };

  const formSchema = z.object({
    email: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
      .email({ message: 'Nhập email đúng định dạng' }),
  });

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const forgotPasswordApi = useMutation<Empty, ErrorMessage, { email: string }>(
    (request) => FetchUtils.get(ResourceURL.CLIENT_FORGOT_PASSWORD, { email: request.email }),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Đã gửi email đổi mật khẩu thành công'),
      onError: () => NotifyUtils.simpleFailed('Gửi email không thành công'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    forgotPasswordApi.mutate({ email: formValues.email });
  });

  return (
    <main>
      <Container size="xl">
        <Stack align="center">
          <Title order={2}>Yêu cầu cấp lại mật khẩu</Title>

          <Text size="sm" color="dimmed">Nhập email của bạn để nhận thư chứa đường dẫn thay đổi mật khẩu</Text>

          <Card withBorder shadow="md" mt={20} p={30} radius="md" sx={{ width: '100%', maxWidth: 400 }}>
            <form onSubmit={handleFormSubmit}>
              <Stack>
                <TextInput
                  required
                  radius="md"
                  label="Email"
                  placeholder="Nhập email của bạn"
                  {...form.getInputProps('email')}
                />
                <Button
                  radius="md"
                  type="submit"
                  disabled={MiscUtils.isEquals(initialFormValues, form.values) || forgotPasswordApi.isLoading}
                >
                  Yêu cầu
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Container>
    </main>
  );
}

export default ClientForgotPassword;
