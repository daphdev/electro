import React from 'react';
import { Button, Card, Container, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import useTitle from 'hooks/use-title';
import { ClientUserNavbar } from 'components';
import { Lock, Mail, Phone, User } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

function ClientSetting() {
  useTitle();

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
                  Thiết đặt
                </Title>

                <Group position="apart">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <User strokeWidth={1.5}/>
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Thông tin cá nhân</Text>
                      <Text color="dimmed" size="sm">Cập nhật họ và tên, giới tính, địa chỉ...</Text>
                    </Stack>
                  </Group>
                  <Button
                    component={Link}
                    to="/user/setting/personal"
                    variant="outline"
                    radius="md"
                  >
                    Cập nhật
                  </Button>
                </Group>

                <Group position="apart">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <Phone strokeWidth={1.5}/>
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Số điện thoại</Text>
                      <Text color="dimmed" size="sm">Thay đổi số điện thoại hiện tại bằng số mới</Text>
                    </Stack>
                  </Group>
                  <Button
                    component={Link}
                    to="/user/setting/phone"
                    variant="outline"
                    radius="md"
                  >
                    Cập nhật
                  </Button>
                </Group>

                <Group position="apart">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <Mail strokeWidth={1.5}/>
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Email</Text>
                      <Text color="dimmed" size="sm">Thay đổi email hiện tại bằng email mới</Text>
                    </Stack>
                  </Group>
                  <Button
                    component={Link}
                    to="/user/setting/email"
                    variant="outline"
                    radius="md"
                  >
                    Cập nhật
                  </Button>
                </Group>

                <Group position="apart">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <Lock strokeWidth={1.5}/>
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Mật khẩu</Text>
                      <Text color="dimmed" size="sm">Thay đổi mật khẩu hiện tại</Text>
                    </Stack>
                  </Group>
                  <Button
                    component={Link}
                    to="/user/setting/password"
                    variant="outline"
                    radius="md"
                  >
                    Cập nhật
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientSetting;
