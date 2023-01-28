import { Anchor, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import useAuthStore from 'stores/use-auth-store';
import { Link } from 'react-router-dom';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <main>
        <Container size="xl">
          <Stack spacing="xl" sx={{ textAlign: 'center' }}>
            <Text
              weight={700}
              sx={theme => ({
                fontSize: 120,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
              })}
            >
              401
            </Text>
            <Title>Vui lòng <Anchor component={Link} to="/signin" inherit>đăng nhập</Anchor> để truy cập</Title>
            <Group position="center">
              <Button component={Link} to="/" variant="subtle" size="md">
                Trở về Trang chủ
              </Button>
            </Group>
          </Stack>
        </Container>
      </main>
    );
  }

  return children;
}

export default ProtectedRoute;
