import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import JobTypeConfigs from 'pages/job-type/JobTypeConfigs';
import useJobTypeUpdateViewModel from 'pages/job-type/JobTypeUpdate.vm';

function JobTypeUpdate() {
  const { id } = useParams();
  const {
    jobType,
    form,
    handleFormSubmit,
    statusSelectList,
  } = useJobTypeUpdateViewModel(Number(id));

  if (!jobType) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={JobTypeConfigs.managerPath}
        title={JobTypeConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={jobType.id}
        createdAt={jobType.createdAt}
        updatedAt={jobType.updatedAt}
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
                  label={JobTypeConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={JobTypeConfigs.properties.status.label}
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

export default JobTypeUpdate;
