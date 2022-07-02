import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import JobLevelConfigs from 'pages/job-level/JobLevelConfigs';
import useJobLevelUpdateViewModel from 'pages/job-level/JobLevelUpdate.vm';

function JobLevelUpdate() {
  const { id } = useParams();
  const {
    jobType,
    form,
    handleFormSubmit,
    statusSelectList,
  } = useJobLevelUpdateViewModel(Number(id));

  if (!jobType) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={JobLevelConfigs.managerPath}
        title={JobLevelConfigs.updateTitle}
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
                  label={JobLevelConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={JobLevelConfigs.properties.status.label}
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

export default JobLevelUpdate;
