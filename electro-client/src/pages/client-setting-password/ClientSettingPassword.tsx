import React from 'react';
import useTitle from 'hooks/use-title';
import { z } from 'zod';
import MessageUtils from 'utils/MessageUtils';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import { ClientPasswordSettingUserRequest } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Button, Card, Container, Grid, PasswordInput, Stack, Title } from '@mantine/core';
import { ClientUserNavbar } from 'components';
import MiscUtils from 'utils/MiscUtils';

const formSchema = z.object({
  oldPassword: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
    .min(1, MessageUtils.min('Mật khẩu', 1)),
  newPassword: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
    .min(1, MessageUtils.min('Mật khẩu', 1)),
  newPasswordAgain: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
    .min(1, MessageUtils.min('Mật khẩu', 1)),
});

function ClientSettingPassword() {
  useTitle();

  const initialFormValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  };

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const updatePasswordSettingApi = useMutation<never, ErrorMessage, ClientPasswordSettingUserRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_USER_PASSWORD_SETTING, requestBody),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Cập nhật thành công'),
      onError: () => NotifyUtils.simpleFailed('Cập nhật không thành công'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (formValues.newPassword !== formValues.newPasswordAgain) {
      form.setFieldError('newPasswordAgain', 'Mật khẩu không trùng khớp');
    } else {
      const requestBody: ClientPasswordSettingUserRequest = {
        oldPassword: formValues.oldPassword,
        newPassword: formValues.newPassword,
      };

      updatePasswordSettingApi.mutate(requestBody);
    }
  });

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col md={3}>
            <ClientUserNavbar/>
          </Grid.Col>

          <Grid.Col md={9}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>
                  Đổi mật khẩu
                </Title>
                <Grid>
                  <Grid.Col lg={6}>
                    <form onSubmit={handleFormSubmit}>
                      <Stack>
                        <PasswordInput
                          required
                          radius="md"
                          label="Mật khẩu hiện tại"
                          placeholder="Nhập mật khẩu hiện tại"
                          {...form.getInputProps('oldPassword')}
                        />
                        <PasswordInput
                          required
                          radius="md"
                          label="Mật khẩu mới"
                          placeholder="Nhập mật khẩu mới"
                          {...form.getInputProps('newPassword')}
                        />
                        <PasswordInput
                          required
                          radius="md"
                          label="Nhập lại mật khẩu mới"
                          placeholder="Nhập lại mật khẩu mới"
                          {...form.getInputProps('newPasswordAgain')}
                        />
                        <Button
                          radius="md"
                          type="submit"
                          disabled={MiscUtils.isEquals(initialFormValues, form.values)}
                        >
                          Cập nhật
                        </Button>
                      </Stack>
                    </form>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientSettingPassword;
