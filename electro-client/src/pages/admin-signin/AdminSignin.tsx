import React from 'react';
import { Box, Button, Container, Paper, PasswordInput, Stack, TextInput, useMantineTheme } from '@mantine/core';
import { ElectroLogo } from 'components';
import { z } from 'zod';
import MessageUtils from 'utils/MessageUtils';
import useTitle from 'hooks/use-title';
import useAdminAuthStore from 'stores/use-admin-auth-store';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from 'react-query';
import { JwtResponse, LoginRequest } from 'models/Authentication';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import { UserResponse } from 'models/User';
import NotifyUtils from 'utils/NotifyUtils';
import { useNavigate } from 'react-router-dom';

const initialFormValues = {
  username: '',
  password: '',
};

const formSchema = z.object({
  username: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
    .min(2, MessageUtils.min('Tên tài khoản', 2)),
  password: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
    .min(1, MessageUtils.min('Mật khẩu', 1)),
});

function AdminSignin() {
  useTitle('Đăng nhập Admin');

  const theme = useMantineTheme();

  const navigate = useNavigate();

  const {
    user,
    updateJwtToken,
    updateUser,
    resetAdminAuthState,
  } = useAdminAuthStore();

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const loginApi = useMutation<JwtResponse, ErrorMessage, LoginRequest>(
    (requestBody) => FetchUtils.post(ResourceURL.LOGIN, requestBody)
  );

  const userInfoApi = useMutation<UserResponse, ErrorMessage>(
    _ => FetchUtils.getWithToken(ResourceURL.ADMIN_USER_INFO, undefined, true)
  );

  const handleFormSubmit = form.onSubmit(async (formValues) => {
    if (!user) {
      const loginRequest: LoginRequest = {
        username: formValues.username,
        password: formValues.password,
      };

      try {
        const jwtResponse = await loginApi.mutateAsync(loginRequest);
        updateJwtToken(jwtResponse.token);

        const userResponse = await userInfoApi.mutateAsync();
        updateUser(userResponse);

        navigate('/admin');

        NotifyUtils.simpleSuccess('Đăng nhập thành công');
      } catch (e) {
        resetAdminAuthState();
        NotifyUtils.simpleFailed('Đăng nhập thất bại');
      }
    }
  });

  return (
    <Box sx={{ backgroundColor: theme.colors.gray[1], height: '100vh' }}>
      <Container size={375} py={40}>
        <Stack align="center">
          <ElectroLogo width={150}/>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md" sx={{ width: '100%' }}>
            <form onSubmit={handleFormSubmit}>
              <TextInput
                required
                label="Tên tài khoản"
                placeholder="Nhập tên tài khoản của bạn"
                disabled={!!user}
                {...form.getInputProps('username')}
              />
              <PasswordInput
                required
                label="Mật khẩu"
                placeholder="Nhập mật khẩu của bạn"
                mt="md"
                disabled={!!user}
                {...form.getInputProps('password')}
              />
              <Button type="submit" fullWidth mt="xl" disabled={!!user}>
                Đăng nhập
              </Button>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export default AdminSignin;
