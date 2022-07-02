import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import SpecificationConfigs from 'pages/specification/SpecificationConfigs';
import useSpecificationUpdateViewModel from 'pages/specification/SpecificationUpdate.vm';

function SpecificationUpdate() {
  const { id } = useParams();
  const {
    specification,
    form,
    handleFormSubmit,
    statusSelectList,
  } = useSpecificationUpdateViewModel(Number(id));

  if (!specification) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={SpecificationConfigs.managerPath}
        title={SpecificationConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={specification.id}
        createdAt={specification.createdAt}
        updatedAt={specification.updatedAt}
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
                  label={SpecificationConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={SpecificationConfigs.properties.code.label}
                  {...form.getInputProps('code')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={SpecificationConfigs.properties.description.label}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={SpecificationConfigs.properties.status.label}
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

export default SpecificationUpdate;
