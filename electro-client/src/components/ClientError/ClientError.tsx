import React from 'react';
import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

function ClientError() {
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
            Oops...
          </Text>
          <Title>Đã có lỗi xảy ra</Title>
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

export default ClientError;
