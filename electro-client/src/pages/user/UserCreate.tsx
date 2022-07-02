import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Group,
  MultiSelect,
  Paper,
  PasswordInput,
  Select,
  Stack,
  TextInput
} from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import UserConfigs from 'pages/user/UserConfigs';
import useUserCreateViewModel from 'pages/user/UserCreate.vm';

function UserCreate() {
  const {
    form,
    handleFormSubmit,
    genderSelectList,
    provinceSelectList,
    districtSelectList,
    statusSelectList,
    roleSelectList,
  } = useUserCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={UserConfigs.managerPath}
        title={UserConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={UserConfigs.properties.username.label}
                  {...form.getInputProps('username')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <PasswordInput
                  required
                  label={UserConfigs.properties.password.label}
                  {...form.getInputProps('password')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={UserConfigs.properties.fullname.label}
                  {...form.getInputProps('fullname')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={UserConfigs.properties.email.label}
                  type="email"
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={UserConfigs.properties.phone.label}
                  {...form.getInputProps('phone')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={UserConfigs.properties.gender.label}
                  placeholder="--"
                  data={genderSelectList}
                  {...form.getInputProps('gender')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  required
                  label={UserConfigs.properties['address.line'].label}
                  {...form.getInputProps('address.line')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={UserConfigs.properties['address.provinceId'].label}
                  placeholder="--"
                  searchable
                  data={provinceSelectList}
                  {...form.getInputProps('address.provinceId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={UserConfigs.properties['address.districtId'].label}
                  placeholder="--"
                  searchable
                  data={districtSelectList}
                  {...form.getInputProps('address.districtId')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={UserConfigs.properties.avatar.label}
                  {...form.getInputProps('avatar')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={UserConfigs.properties.status.label}
                  placeholder="--"
                  data={statusSelectList}
                  {...form.getInputProps('status')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <MultiSelect
                  required
                  label={UserConfigs.properties.roles.label}
                  placeholder="--"
                  data={roleSelectList}
                  {...form.getInputProps('roles')}
                />
              </Grid.Col>
            </Grid>

            <Divider mt="xs"/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={form.reset}>Mặc định</Button>
              <Button type="submit">Thêm</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default UserCreate;
