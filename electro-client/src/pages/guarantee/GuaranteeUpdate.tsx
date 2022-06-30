import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import GuaranteeConfigs from 'pages/guarantee/GuaranteeConfigs';
import useGuaranteeUpdateViewModel from 'pages/guarantee/GuaranteeUpdate.vm';

function GuaranteeUpdate() {
  const { id } = useParams();
  const {
    guarantee,
    form,
    handleFormSubmit,
    statusSelectList,
  } = useGuaranteeUpdateViewModel(Number(id));

  if (!guarantee) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={GuaranteeConfigs.managerPath}
        title={GuaranteeConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={guarantee.id}
        createdAt={guarantee.createdAt}
        updatedAt={guarantee.updatedAt}
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
                  label={GuaranteeConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={GuaranteeConfigs.properties.description.label}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={GuaranteeConfigs.properties.status.label}
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

export default GuaranteeUpdate;
