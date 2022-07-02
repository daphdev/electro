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
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import CustomerConfigs from 'pages/customer/CustomerConfigs';
import useCustomerUpdateViewModel from 'pages/customer/CustomerUpdate.vm';

function CustomerUpdate() {
  const { id } = useParams();
  const {
    customer,
    form,
    handleFormSubmit,
    userGenderSelectList,
    provinceSelectList,
    districtSelectList,
    userStatusSelectList,
    userRoleSelectList,
    customerGroupSelectList,
    customerStatusSelectList,
    customerResourceSelectList,
  } = useCustomerUpdateViewModel(Number(id));

  if (!customer) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CustomerConfigs.managerPath}
        title={CustomerConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={customer.id}
        createdAt={customer.createdAt}
        updatedAt={customer.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CustomerConfigs.properties['user.username'].label}
                  {...form.getInputProps('user.username')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <PasswordInput
                  label={CustomerConfigs.properties['user.password'].label}
                  {...form.getInputProps('user.password')}
                  placeholder="Nhập mật khẩu mới hoặc để trống"
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CustomerConfigs.properties['user.fullname'].label}
                  {...form.getInputProps('user.fullname')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CustomerConfigs.properties['user.email'].label}
                  type="email"
                  {...form.getInputProps('user.email')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CustomerConfigs.properties['user.phone'].label}
                  {...form.getInputProps('user.phone')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CustomerConfigs.properties['user.gender'].label}
                  placeholder="--"
                  data={userGenderSelectList}
                  {...form.getInputProps('user.gender')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  required
                  label={CustomerConfigs.properties['user.address.line'].label}
                  {...form.getInputProps('user.address.line')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CustomerConfigs.properties['user.address.provinceId'].label}
                  placeholder="--"
                  searchable
                  data={provinceSelectList}
                  {...form.getInputProps('user.address.provinceId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CustomerConfigs.properties['user.address.districtId'].label}
                  placeholder="--"
                  searchable
                  data={districtSelectList}
                  {...form.getInputProps('user.address.districtId')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={CustomerConfigs.properties['user.avatar'].label}
                  {...form.getInputProps('user.avatar')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CustomerConfigs.properties['user.status'].label}
                  placeholder="--"
                  data={userStatusSelectList}
                  {...form.getInputProps('user.status')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <MultiSelect
                  disabled
                  required
                  label={CustomerConfigs.properties['user.roles'].label}
                  placeholder="--"
                  data={userRoleSelectList}
                  {...form.getInputProps('user.roles')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CustomerConfigs.properties.customerGroupId.label}
                  placeholder="--"
                  data={customerGroupSelectList}
                  {...form.getInputProps('customerGroupId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CustomerConfigs.properties.customerStatusId.label}
                  placeholder="--"
                  data={customerStatusSelectList}
                  {...form.getInputProps('customerStatusId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CustomerConfigs.properties.customerResourceId.label}
                  placeholder="--"
                  data={customerResourceSelectList}
                  {...form.getInputProps('customerResourceId')}
                />
              </Grid.Col>
            </Grid>

            <Divider mt="xs"/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={form.reset}>Mặc định</Button>
              <Button type="submit">Cập nhật</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default CustomerUpdate;
