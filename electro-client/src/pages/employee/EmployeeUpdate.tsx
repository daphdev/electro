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
import EmployeeConfigs from 'pages/employee/EmployeeConfigs';
import useEmployeeUpdateViewModel from 'pages/employee/EmployeeUpdate.vm';

function EmployeeUpdate() {
  const { id } = useParams();
  const {
    employee,
    form,
    handleFormSubmit,
    userGenderSelectList,
    provinceSelectList,
    districtSelectList,
    userStatusSelectList,
    userRoleSelectList,
    officeSelectList,
    departmentSelectList,
    jobTypeSelectList,
    jobLevelSelectList,
    jobTitleSelectList,
  } = useEmployeeUpdateViewModel(Number(id));

  if (!employee) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={EmployeeConfigs.managerPath}
        title={EmployeeConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={employee.id}
        createdAt={employee.createdAt}
        updatedAt={employee.updatedAt}
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
                  label={EmployeeConfigs.properties['user.username'].label}
                  {...form.getInputProps('user.username')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <PasswordInput
                  label={EmployeeConfigs.properties['user.password'].label}
                  {...form.getInputProps('user.password')}
                  placeholder="Nhập mật khẩu mới hoặc để trống"
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={EmployeeConfigs.properties['user.fullname'].label}
                  {...form.getInputProps('user.fullname')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={EmployeeConfigs.properties['user.email'].label}
                  type="email"
                  {...form.getInputProps('user.email')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={EmployeeConfigs.properties['user.phone'].label}
                  {...form.getInputProps('user.phone')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties['user.gender'].label}
                  placeholder="--"
                  data={userGenderSelectList}
                  {...form.getInputProps('user.gender')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  required
                  label={EmployeeConfigs.properties['user.address.line'].label}
                  {...form.getInputProps('user.address.line')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties['user.address.provinceId'].label}
                  placeholder="--"
                  searchable
                  data={provinceSelectList}
                  {...form.getInputProps('user.address.provinceId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties['user.address.districtId'].label}
                  placeholder="--"
                  searchable
                  data={districtSelectList}
                  {...form.getInputProps('user.address.districtId')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={EmployeeConfigs.properties['user.avatar'].label}
                  {...form.getInputProps('user.avatar')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties['user.status'].label}
                  placeholder="--"
                  data={userStatusSelectList}
                  {...form.getInputProps('user.status')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <MultiSelect
                  disabled
                  required
                  label={EmployeeConfigs.properties['user.roles'].label}
                  placeholder="--"
                  data={userRoleSelectList}
                  {...form.getInputProps('user.roles')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties.officeId.label}
                  placeholder="--"
                  data={officeSelectList}
                  {...form.getInputProps('officeId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties.departmentId.label}
                  placeholder="--"
                  data={departmentSelectList}
                  {...form.getInputProps('departmentId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties.jobTypeId.label}
                  placeholder="--"
                  data={jobTypeSelectList}
                  {...form.getInputProps('jobTypeId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties.jobLevelId.label}
                  placeholder="--"
                  data={jobLevelSelectList}
                  {...form.getInputProps('jobLevelId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={EmployeeConfigs.properties.jobTitleId.label}
                  placeholder="--"
                  data={jobTitleSelectList}
                  {...form.getInputProps('jobTitleId')}
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

export default EmployeeUpdate;
