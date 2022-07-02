import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import DepartmentConfigs from 'pages/department/DepartmentConfigs';
import useDepartmentUpdateViewModel from 'pages/department/DepartmentUpdate.vm';

function DepartmentUpdate() {
  const { id } = useParams();
  const {
    department,
    form,
    handleFormSubmit,
    statusSelectList,
  } = useDepartmentUpdateViewModel(Number(id));

  if (!department) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={DepartmentConfigs.managerPath}
        title={DepartmentConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={department.id}
        createdAt={department.createdAt}
        updatedAt={department.updatedAt}
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
                  label={DepartmentConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={DepartmentConfigs.properties.status.label}
                  placeholder="--"
                  data={statusSelectList}
                  {...form.getInputProps('status')}
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

export default DepartmentUpdate;
