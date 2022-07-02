import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import GuaranteeConfigs from 'pages/guarantee/GuaranteeConfigs';
import useGuaranteeCreateViewModel from 'pages/guarantee/GuaranteeCreate.vm';

function GuaranteeCreate() {
  const {
    form,
    handleFormSubmit,
    statusSelectList,
  } = useGuaranteeCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={GuaranteeConfigs.managerPath}
        title={GuaranteeConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

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
              <Button type="submit">Thêm</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default GuaranteeCreate;
